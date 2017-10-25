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
 * Set module global variables.
 */
let rootConfPath,
    cachePath,
    confCache;

/**
 * Casting of an object to an array.
 * @param {Object} items
 * @return {array|*}
 */
let castArr = function (items) {
    return Array.prototype.slice.call(items);
};

/**
 * Setter for configuration path.
 * @since 1.0.0
 * @param {...string} [arguments] - Multi-params for generating path for conf/ directory.
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
 * @param {...string} [arguments] - Multi-params for generating path for conf/ directory.
 * @returns {string|*}
 */
let getConfPath = function () {
    if (typeof rootConfPath === 'undefined') {
        setConfPath.apply(null, castArr(arguments));
    }
    return rootConfPath;
};

/**
 * Get the path to the level directory.
 * @param {string} levelName - The name of the level directory in the conf/ directory.
 * @return {string}
 */
let getLevelPath = function (levelName) {
    return path.join(getConfPath(), levelName);
};

let getLevelsPaths = function () {

};

/**
 * Get a list of all the configuration levels name.
 * @since 1.0.0
 * @return {array}
 */
let getLevelsNames = function () {
    let confPath = getConfPath();
    return fs.readdirSync(confPath);
};

/**
 * Get configuration list.
 * @since 1.0.0
 * @param {string} levelName - The configuration specific level path.
 * @return {string|array|*}
 */
let getConfList = function (levelName) {
    return fs.readdirSync(getLevelPath(levelName));
};

/**
 * Get configuration file content.
 * @since 1.0.0
 * @param {...string} [arguments] - Multi-params for generating path for conf/ directory.
 * @return {object}
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
console.log(getConfList());

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