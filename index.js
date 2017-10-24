'use strict';

/**
 * Module dependencies.
 */
let fs = require('fs');
let path = require('path');

/**
 * Get the configuration path.
 * @param path
 * @returns {string|*}
 */
let getConfPath = (path) => {
    let extraPath = (typeof path === 'undefined') ? '' : path;
    return path.join(__dirname, 'test/conf/', extraPath);
};

/**
 * Get a list of all the configuration levels.
 * @return {array}
 */
let getLevels = () => {
    let confPath = getConfPath();
    return fs.readdirSync(confPath);
};

/**
 * Get configuration list.
 * @param {string} confLevelPath - The configuration specific level path.
 * @return {string|array|*}
 */
let getConfList = (confLevelPath) => {
    let confPath = getConfPath(confLevelPath);
    return fs.readdirSync(confPath);
};
/**
 *
 * @param {string} arguments -
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
 *
 * @type {{getConfPath: (function(*=)), getLevels: (function()), getConfList: (function(string)), getConf: (function())}}
 */
const methods = {
    "getConfPath": getConfPath,
    "getLevels": getLevels,
    "getConfList": getConfList,
    "getConf": getConf
};

module.exports = methods;