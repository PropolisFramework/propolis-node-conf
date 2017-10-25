/**
 * @file Module object for getting configuration files.
 * @module conf
 * @version 1.0.0
 * @author Jean-Nicolas Boulay <jn@yaloub.com>
 */

'use strict';

/**
 * Module dependencies.
 */
let fs = require('fs'),
    path = require('path');

/**
 * Other Vars.
 */
let applicationEnv,
    ArraySlice = Array.prototype.slice;

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
 * @param {String} [appEnv] - Application Environment name, also known in this context has a `level`.
 */
let setApplicationEnv = function (appEnv) {
    if (typeof appEnv === 'undefined' || !appEnv) {
        applicationEnv = process.env.APPLICATION_ENV;
    } else {
        applicationEnv = appEnv;
    }

    applicationEnv = (!applicationEnv) ? '' : applicationEnv;

    if (typeof applicationEnv !== 'string') {
        throw Error("The `appEnv` param for this method needs to be a string.");
    }

    if (!levelExist(applicationEnv)) {
        applicationEnv = 'common';
        if (!levelExist(applicationEnv)) {
            applicationEnv = 'default';
            if (!levelExist(applicationEnv)) {
                throw Error("There seems to be missing configuration directories. The `default/` directory should be present at all times.");
            }
        }
    }
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
    rootConfPath = (arguments.length === 0) ?
        path.join(__dirname, 'conf/') :
        path.join.apply(null, castArr(arguments));
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
 * Get configuration list.
 * @since 1.0.0
 * @param {String} levelName - The configuration specific level path.
 * @return {String|Array|*}
 */
let getConfList = function (levelName) {
    return fs.readdirSync(getLevelPath(levelName));
};

/**
 * Get configuration file content.
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

let saveCache = function () {

};

console.log(rootConfPath);
setConfPath();

console.log(rootConfPath);
setConfPath(__dirname, 'test', 'conf');
console.log(rootConfPath);

console.log('getConfPath: ');
console.log(getConfPath());

rootConfPath = undefined;
console.log('[after reset] getConfPath: ');
console.log(getConfPath());

rootConfPath = undefined;
console.log('[after reset and added to args] getConfPath: ');
console.log(getConfPath(__dirname, 'test', 'conf'));

console.log('getLevelsNames');
console.log(getLevelsNames());

console.log('getConfList');
console.log(getConfList('dev'));

console.log('getLevelsPaths');
console.log(getLevelsPaths());

console.log('getApplicationEnv');
console.log(getApplicationEnv());

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