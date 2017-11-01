/**
 * @file Module object for getting configuration files.
 * @module conf
 * @version 1.0.0
 * @author Jean-Nicolas Boulay <jn@yaloub.com>
 * {@link https://github.com/PropolisFramework/ GitHub}
 */

'use strict';

/**
 * Module dependencies.
 */
let fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml');

const _ = require('lodash');

/**
 * Other Vars.
 * @private
 */
let applicationEnv,
    cascadeLevelNames = [],
    cascadeLevelsPaths = [],
    readFileOptions = {
        encoding: "utf-8"
    };

/**
 * Set module global variables.
 */
let rootConfPath;

/**
 * Is param an type object?
 * @private
 * @param obj
 * @return {Boolean}
 */
let isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
};

/**
 * Get object size.
 * @private
 * @param obj
 * @return {Number}
 */
Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * Casting of an object to an array.
 * @since 1.0.0
 * @private
 * @param {Object} items
 * @return {Array|*}
 */
let castArr = function (items) {
    return Object.keys(items).map(function(key) {
        return items[key];
    });
};

/**
 * Setter for applicationEnv module global variable.
 * @since 1.0.0
 * @throws {TypeError} Will throw type error if the param is not a string.
 * @param {String} [appEnv] - Application Environment name, also known in this context has a `level`.
 */
let setApplicationEnv = function (appEnv) {
    if (typeof appEnv === 'undefined' || !appEnv) {
        applicationEnv = process.env.APPLICATION_ENV;
    } else {
        if (typeof appEnv !== 'string' && typeof appEnv !== 'undefined') {
            throw TypeError("The `appEnv` param for this method needs to be a string.");
        }
        applicationEnv = appEnv;
    }

    applicationEnv = (!applicationEnv) ? 'dev' : applicationEnv;
};

/**
 * Check if a particular level exists.
 * @since 1.0.0
 * @param {String} levelName - The name of the level.
 * @return {Boolean}
 */
let levelExist = function (levelName) {
    let levelsNames = getLevelNames();
    return (levelsNames.indexOf(levelName) !== -1);
};

/**
 * Getter for the Application Env.
 * @since 1.0.0
 * @return {String}
 */
let getApplicationEnv = function () {
    if (typeof applicationEnv === 'undefined' || !applicationEnv) {
        setApplicationEnv();
    }
    return applicationEnv;
};

/**
 * Setter for configuration path.
 * @since 1.0.0
 * @param {...String} [arguments] - Multi-params for generating path for conf/ directory.
 * @return {void}
 */
let setConfPath = function () {
        if (arguments.length === 0) {
            rootConfPath = path.join(__dirname, 'conf/');
        } else {
            let args = castArr(arguments);
            args.push('conf');
            rootConfPath = path.join.apply(null, args);
        }
};

/**
 * Getter for configuration path.
 * @since 1.0.0
 * @param {...String} [arguments] - Multi-params for generating path for conf/ directory.
 * @returns {String|*}
 */
let getConfPath = function () {
    if (typeof rootConfPath === 'undefined' || !rootConfPath) {
        setConfPath.apply(null, castArr(arguments));
    }
    return rootConfPath;
};

/**
 * Get the path to the level directory.
 * @since 1.0.0
 * @param {String} levelName - The name of the level directory in the conf/ directory.
 * @return {String}
 */
let getLevelPath = function (levelName) {
    return path.join(getConfPath(), levelName);
};

/**
 * Get a list of all the configuration level names.
 * @since 1.0.0
 * @return {Array}
 */
let getLevelNames = function () {
    let confPath = getConfPath();
    return fs.readdirSync(confPath);
};

/**
 * Get level paths.
 * @since 1.0.0
 * @return {Array}
 */
let getLevelPaths = function () {
    let confPath = getConfPath(),
        levelsNames = getLevelNames(),
        result = [];

    for (let i=0; i<levelsNames.length; ++i) {
        result.push(path.join(confPath, levelsNames[i]));
    }

    return result;
};

/**
 * Setter for cascade level names.
 * @throws Will throw an error if the default directory is not found in the conf/ directory.
 * @since 1.0.0
 * @return {void}
 */
let setCascadeLevelNames = function () {
    let env = getApplicationEnv();

    if (levelExist(env)) {
        cascadeLevelNames.push(env);
    }

    if (levelExist('common')) {
        cascadeLevelNames.push('common');
    }

    if (!levelExist('default')) {
        throw Error("You need the default/ directory in the conf/ directory.");
    }

    cascadeLevelNames.push('default');
};

/**
 * Get cascade level names.
 * @since 1.0.0
 * @return {Array}
 */
let getCascadeLevelNames = function () {
    if (cascadeLevelNames.length <= 0) {
        setCascadeLevelNames();
    }

    return cascadeLevelNames;
};

/**
 * Setter for cascade level paths.
 * @since 1.0.0
 * @return {void}
 */
let setCascadeLevelPaths = function () {
    let confPath = getConfPath(),
        casLevelsNames = getCascadeLevelNames();

    for (let i=0; i<casLevelsNames.length; ++i) {
        cascadeLevelsPaths.push(path.join(confPath, casLevelsNames[i]));
    }
};

/**
 * Get cascade level paths.
 * @since 1.0.0
 * @return {Array}
 */
let getCascadeLevelPaths = function () {
    if (cascadeLevelsPaths.length <= 0) {
        setCascadeLevelPaths();
    }

    return cascadeLevelsPaths;
};

/**
 * Get configuration list.
 * @since 1.0.0
 * @param {String} levelName - The configuration specific level path.
 * @return {String|Array|*}
 */
let getConfList = function (levelName) {
    return fs.readdirSync(getLevelPath(levelName));
};

/**
 * Get configuration content.
 * @since 1.0.0
 * @param {String} path - Configuration file path.
 * @return {Object|*}
 */
let getConfContent = function (path) {
    return yaml.safeLoad(fs.readFileSync(path, readFileOptions));
};

/**
 * Merging of settings.
 * {@link https://github.com/alexlafroscia/yaml-merge/blob/master/index.js | Source}
 * @since 1.0.0
 * @private
 * @param {...String} from - Configuration file paths.
 * @return {Object}
 */
let mergeSettings = function (...from) {
    const files = from.map((path) => getConfContent(path));
    return _.merge({}, ...files);
};

/**
 * Get configuration from a specific file.
 * @since 1.0.0
 * @example
 * // return {...}
 * getConf('dev', 'main.yml');
 * @param {...String} [arguments] - Multi-params for generating path for conf/ directory.
 * @return {Object}
 */
let getConf = function () {
    let confPath = getConfPath();

    if (arguments.length === 0) {
        throw Error("What is the config files you are looking for?");
    }

    let args = castArr(arguments),
        arrPath = [confPath].concat(args),
        fullPath = path.join.apply(null, arrPath);

    return getConfContent(fullPath);
};

/**
 * Get configurations.
 * @since 1.0.0
 * @param {Object} [options] - Options for what this method will output.
 * @param {Boolean} [options.merge=true] - If you want the configuration to merge.
 * @param {Boolean} [options.metadata=false] - If you want to get metadata.
 * @return {Object}
 */
let getConfs = function (options) {

    let optionsDefault = {
        'merge': true,
        'metadata': false,
        'useCache': true
    };

    if (typeof options === 'undefined') {
        options = optionsDefault;
    }

    if (typeof options.merge !== 'boolean') {
        options.merge = optionsDefault.merge;
    }

    if (typeof options.metadata !== 'boolean') {
        options.metadata = optionsDefault.metadata;
    }

    if (typeof options.useCache !== 'boolean') {
        options.useCache = optionsDefault.useCache;
    }

    let confPath = getConfPath();

    if (options.useCache) {
        let cacheFilePath = path.join(confPath, 'cache', 'config.json');
        if (fs.existsSync(cacheFilePath)) {
            return getConfContent(cacheFilePath);
        }
    }

    let confLevelsNames = getCascadeLevelNames(),
        confPaths = [],
        conf = {};

    for (let i=0; i<confLevelsNames.length; ++i) {
        let levelName = confLevelsNames[i],
            confList = getConfList(confLevelsNames[i]);

        conf[levelName] = {};

        for (let x=0; x<confList.length; ++x) {
            let confFilePath = path.join(confPath, levelName, confList[x]);

            if (!options.merge) {
                let content = getConfContent(confFilePath),
                    regexConfFile = /(.*)\.[^.]+$/.exec(confList[x]),
                    confFileName = regexConfFile[1];

                conf[levelName][confFileName] = (typeof content === 'object') ? content : {};
            }

            confPaths.push(confFilePath);
        }
    }

    if (options.merge) {
        confPaths.reverse();
        conf = mergeSettings.apply(null, confPaths);
    }

    if (options.metadata) {
        let newConf = {};
        newConf['metadata'] = {
            'confPath': confPath,
            'confPaths': confPaths,
            'confLevelsNames': confLevelsNames
        };
        newConf['conf'] = conf;
        conf = newConf;
    }

    return conf;
};

/**
 * Creates a cache version of the configurations.
 */
let saveCache = function () {
    let confPath = getConfPath(),
        cachePath = path.join(confPath, 'cache'),
        cacheFilePath = path.join(cachePath, 'config.json');

    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath);
    }

    fs.writeFileSync(cacheFilePath, JSON.stringify(getConfs()));
};

/**
 * Remove cache directory.
 */
let rmCache = function () {
    let confPath = getConfPath(),
        cachePath = path.join(confPath, 'cache');

    fs.rmdir(cachePath);
};

/**
 * Set methods.
 * @type {{setApplicationEnv: setApplicationEnv, levelExist: levelExist, getApplicationEnv: getApplicationEnv, setConfPath: setConfPath, getConfPath: getConfPath, getLevelPath: getLevelPath, getLevelNames: getLevelNames, getLevelPaths: getLevelPaths, setCascadeLevelNames: setCascadeLevelNames, getCascadeLevelNames: getCascadeLevelNames, setCascadeLevelPaths: setCascadeLevelPaths, getCascadeLevelPaths: getCascadeLevelPaths, getConfList: getConfList, getConfContent: getConfContent, getConf: getConf, getConfs: getConfs, saveCache: saveCache}}
 */
const methods = {
    "setApplicationEnv": setApplicationEnv,
    "levelExist": levelExist,
    "getApplicationEnv": getApplicationEnv,
    "setConfPath": setConfPath,
    "getConfPath": getConfPath,
    "getLevelPath": getLevelPath,
    "getLevelNames": getLevelNames,
    "getLevelPaths": getLevelPaths,
    "setCascadeLevelNames": setCascadeLevelNames,
    "getCascadeLevelNames": getCascadeLevelNames,
    "setCascadeLevelPaths": setCascadeLevelPaths,
    "getCascadeLevelPaths": getCascadeLevelPaths,
    "getConfList": getConfList,
    "getConfContent": getConfContent,
    "getConf": getConf,
    "getConfs": getConfs,
    "saveCache": saveCache,
    "rmCache": rmCache
};

module.exports = methods;