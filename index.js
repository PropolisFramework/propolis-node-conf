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

/**
 * Other Vars.
 * @private
 */
let applicationEnv,
    cascadeLevelNames = [],
    cascadeLevelsPaths = [],
    ArraySlice = Array.prototype.slice,
    readFileOptions = {
        encoding: "utf-8"
    };

/**
 * Set module global variables.
 */
let rootConfPath,
    cachePath,
    confCache;

/**
 * Casting of an object to an array.
 * @since 1.0.0
 * @param {Object} items
 * @return {Array|*}
 */
let castArr = function (items) {
    return ArraySlice.call(items);
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
    let levelsNames = getLevelsNames();
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
 * Get a list of all the configuration levels name.
 * @since 1.0.0
 * @return {Array}
 */
let getLevelsNames = function () {
    let confPath = getConfPath();
    return fs.readdirSync(confPath);
};

/**
 * Get levels paths.
 * @since 1.0.0
 * @return {Array}
 */
let getLevelsPaths = function () {
    let confPath = getConfPath(),
        levelsNames = getLevelsNames(),
        result = [];

    for (let i=0; i<levelsNames.length; ++i) {
        result.push(path.join(confPath, levelsNames[i]));
    }

    return result;
};

/**
 * Setter for cascade levels names.
 * @throws Will throw an error if the default directory is not found in the conf/ directory.
 * @since 1.0.0
 * @return {void}
 */
let setCascadeLevelsNames = function () {
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
 * Get cascade levels names.
 * @since 1.0.0
 * @return {Array}
 */
let getCascadeLevelsNames = function () {
    if (cascadeLevelNames.length <= 0) {
        setCascadeLevelsNames();
    }

    return cascadeLevelNames;
};

/**
 * Setter for cascade levels paths.
 * @since 1.0.0
 * @return {void}
 */
let setCascadeLevelsPaths = function () {
    let confPath = getConfPath(),
        casLevelsNames = getCascadeLevelsNames();

    for (let i=0; i<casLevelsNames.length; ++i) {
        cascadeLevelsPaths.push(path.join(confPath, casLevelsNames[i]));
    }
};

/**
 * Get cascade levels paths.
 * @since 1.0.0
 * @return {Array}
 */
let getCascadeLevelsPaths = function () {
    if (cascadeLevelsPaths.length <= 0) {
        setCascadeLevelsPaths();
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
 * @param path
 * @throws {Error} Will throw type error if there was an issue with safeLoad from js-yaml.
 * @return {Object|*}
 */
let getConfContent = function (path) {
    try {
        return yaml.safeLoad(fs.readFileSync(path, readFileOptions));
    } catch (e) {
        throw Error(e.message);
    }
};

/**
 * Get configuration from a specific file.
 * @since 1.0.0
 * @param {...String} [arguments] - Multi-params for generating path for conf/ directory.
 * @return {Object}
 */
let getConf = function () {
    let confPath = getConfPath();

    if (arguments.length === 0) {
        // All
    }

    let confs={};
    for (let i = 0; i < arguments.length; ++i) {
        let arg = arguments[i];
    }
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
        'metadata': false
    };

    if (typeof options === 'undefined') {
        options = optionsDefault;
    } else if (typeof options.merge !== 'boolean') {
        options.merge = optionsDefault.merge;
    } else if (typeof options.metadata !== 'boolean') {
        options.metadata = optionsDefault.metadata;
    }

    let confPath = getConfPath(),
        confLevelsNames = getCascadeLevelsNames(),
        confPaths = [],
        conf = {};

    for (let i=0; i<confLevelsNames.length; ++i) {
        let levelName = confLevelsNames[i],
            confList = getConfList(confLevelsNames[i]);

        conf[levelName] = {};

        for (let x=0; x<confList.length; ++x) {
            let confFilePath = path.join(confPath, levelName, confList[x]),
                content = getConfContent(confFilePath),
                regexConfFile = /(.*)\.[^.]+$/.exec(confList[x]),
                confFileName = regexConfFile[1];

            conf[levelName][confFileName] = (typeof content === 'object') ? content : {};
            confPaths.push(confFilePath);
        }
    }

    console.log(conf);
    console.log(options.merge);

    if (options.merge) {
        console.log('merge');
        let mergeResult = {};
        for (let level in conf) {
            console.log(level);
            for (let settings in level) {
                console.log(settings);
                mergeResult = Object.assign(mergeResult, settings);
            }
        }
        console.log(mergeResult);
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

let saveCache = function () {

};

console.log(rootConfPath);
setConfPath();

console.log(rootConfPath);
setConfPath(__dirname, 'test');
console.log(rootConfPath);

console.log('getConfPath: ');
console.log(getConfPath());

rootConfPath = undefined;
console.log('[after reset] getConfPath: ');
console.log(getConfPath());

rootConfPath = undefined;
console.log('[after reset and added to args] getConfPath: ');
console.log(getConfPath(__dirname, 'test'));

console.log('getLevelsNames');
console.log(getLevelsNames());

console.log('getConfList');
console.log(getConfList('dev'));

console.log('getLevelsPaths');
console.log(getLevelsPaths());

console.log('getApplicationEnv');
console.log(getApplicationEnv());

console.log('getCascadeLevelsPaths');
console.log(getCascadeLevelsPaths());

console.log('getConfs');
getConfs();

/**
 * @constant
 * @type {{getConfPath: (function(*=)), getLevels: (function()), getConfList: (function(string)), getConf: (function())}}
 */
/*const methods = {
    "_rootConfPath": rootConfPath,
    "_confCache": confCache,
    "_castArr": castArr,
    "getConfPath": getConfPath,
    "getLevels": getLevels,
    "getConfList": getConfList,
    "getConf": getConf
};

module.exports = methods;*/