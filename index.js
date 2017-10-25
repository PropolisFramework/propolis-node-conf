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
    confCache;

/**
 * Setter for configuration path.
 * @since 1.0.0
 * @param {string} arguments - Multi-params for generating path for conf/ directory.
 * @return {string|*}
 */
let setConfPath = () => {
    rootConfPath = (arguments.length === 0) ?
                    path.join(__dirname, 'conf/') :
                    path.join(__dirname, arguments);
};

/**
 * Getter for configuration path.
 * @since 1.0.0
 * @param {string} arguments - Multi-params for generating path for conf/ directory.
 * @returns {string|*}
 */
let getConfPath = () => {
    if (typeof rootConfPath === 'undefined') {
        setConfPath(arguments);
    }
    return rootConfPath;
};

/**
 * Get a list of all the configuration levels.
 * @since 1.0.0
 * @return {array}
 */
let getLevels = () => {
    let confPath = getConfPath();
    return fs.readdirSync(confPath);
};

/**
 * Get configuration list.
 * @since 1.0.0
 * @param {string} confLevelPath - The configuration specific level path.
 * @return {string|array|*}
 */
let getConfList = (confLevelPath) => {
    let confPath = getConfPath(confLevelPath);
    return fs.readdirSync(confPath);
};

/**
 * Get configuration file content.
 * @since 1.0.0
 * @param {string} arguments - Multi-params for generating path for conf/ directory.
 * @return {object}
 */
let getConf = () => {
    let confPath = getConfPath();

    if (arguments.length === 0) {
        // All
    }

    let confs={};
    for (let i = 0; i < arguments.length; ++i) {
        let arg = arguments[i];
    }
};

getLevels();

/**
 * @constant
 * @type {{getConfPath: (function(*=)), getLevels: (function()), getConfList: (function(string)), getConf: (function())}}
 */
/*const methods = {
    "_rootConfPath": rootConfPath,
    "_confCache": confCache,
    "getConfPath": getConfPath,
    "getLevels": getLevels,
    "getConfList": getConfList,
    "getConf": getConf
};

module.exports = methods;*/