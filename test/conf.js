/**
 * @file Test script for the index.js.
 * @version 1.0.0
 * @author Jean-Nicolas Boulay <jn@yaloub.com>
 */

'use strict';

let rewire  = require('rewire');
let path    = require('path');
let chai    = require('chai');
let expect  = chai.expect;

let confModule  = require('../index');
let conf        = rewire('../index');

let castArr = conf.__get__('castArr'),
    ObjectSize = conf.__get__('Object.size');

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
let typeStr = function(obj) {
    return isArray(obj) ? 'array' : typeof obj;
};

describe('Test basic functions', () => {

    it('Casting of an Object to an array type', () => {
        expect(castArr({0: 'foo', 1: 'bar'}))
            .to
            .include
            .members(['foo', 'bar'])
    });

    it('Object size', () => {
        expect(ObjectSize({0: 'foo', 1: 'bar'}))
            .to
            .equal(2)
    });

    it('Setter for Application Env - Set APPLICATION ENV with param', () => {
        confModule.setApplicationEnv('bob');
        expect(confModule.getApplicationEnv())
            .to
            .equal('bob')
    });

    it('Setter for Application Env - Without param - Default is `dev`', () => {
        confModule.setApplicationEnv();
        expect(confModule.getApplicationEnv())
            .to
            .equal('dev')
    });

    it('Setter for Application Env - Without param - Using a different APPLICATION_ENV variable value', () => {
        process.env.APPLICATION_ENV = 'alex';
        confModule.setApplicationEnv();
        expect(confModule.getApplicationEnv())
            .to
            .equal('alex');
        process.env.APPLICATION_ENV = 'dev';
    });

    it('Setter for Application Env - Get error thrown for wrong type from the param (TypeError)', () => {
        let catchTypeError = function () {
            confModule.setApplicationEnv({0: "foo"});
        };
        expect(catchTypeError)
            .to
            .throw(TypeError)
    });

    it('Get configuration path - setting it without starting with using setConfPath', () => {
        expect(confModule.getConfPath(__dirname, '../'))
            .to
            .equal(path.join(__dirname, '../', 'conf'));
    });

    /*it('Set configuration path using default path', () => {
        conf.setConfPath();
        expect(conf._rootConfPath)
            .to
            .equal(path.join(__dirname, 'conf'))
    });

   /* it('Set configuration path using set with param path', () => {
        conf.setConfPath('../conf');
        expect(conf._rootConfPath)
            .to
            .equal(path.join(__dirname, '../conf'))
    });

    it('Get configuration path using set by default', () => {
        conf._rootConfPath = undefined;
        expect(conf.getConfPath())
            .to
            .equal(path.join(__dirname, 'conf'))
    });

    it('Get configuration path using set by using param path', () => {
        conf._rootConfPath = undefined;
        expect(conf.getConfPath('../conf'))
            .to
            .equal(path.join(__dirname, '../conf'))
    });

    it('List all the conf levels using directory names without specific conf/ path', () => {
        expect(conf.getLevels())
            .to
            .equal(['common', 'default', 'dev', 'production', 'staging'])
    });

    it('List all the conf levels using directory names with specific conf/ path', () => {
        expect(conf.getLevels(confDir))
            .to
            .equal(['common', 'default', 'dev', 'production', 'staging'])
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConfList())
            .to
            .equal(['main.json', 'other.json', 'default-extra.json'])
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConfList(confDevDir))
            .to
            .equal(['main.json', 'other.json', 'default-extra.json'])
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConf('main'))
            .to
            .equal({"level": "dev", "name": "main"})
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConf('main', 'other'))
            .to
            .equal({"main": {"level": "dev", "name": "main"}, "other": {"level": "dev", "name": "other"}})
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConf('main', 'other', 'default-extra'))
            .to
            .equal({
                "main": {"level": "dev", "name": "main"},
                "other": {"level": "dev", "name": "other"},
                "default-extra": {"level": "default", "name": "default-extra"}
            })
    });

    it('List all the config files inside conf level directories', () => {
        expect(conf.getConf('main', 'other', 'default-extra', 'common-extra'))
            .to
            .equal({
                "main": {"level": "dev", "name": "main"},
                "other": {"level": "dev", "name": "other"},
                "default-extra": {"level": "default", "name": "default-extra"},
                "common-extra": {"level": "common", "name": "common-extra"}
            })
    });
*/
});

describe('Test conf methods with test configurations files', () => {

    beforeEach(function () {
        // Set configuration path for the rest of the tests
        confModule.setConfPath(__dirname);
    });

    it('Get configuration path', () => {
        expect(confModule.getConfPath())
            .to
            .equal(path.join(__dirname, 'conf'));
    });

    it('List of all the conf/* directories also named levels', () => {
        expect(confModule.getLevelNames())
            .to
            .include
            .members(["cache", "common", "default", "dev", "production", "staging"])
    });

    it('Get levels names - Is true - For found', () => {
        expect(confModule.levelExist('dev'))
            .to
            .equal(true)
    });

    it('Get levels names - Is false - For not found', () => {
        expect(confModule.levelExist('foo'))
            .to
            .equal(false)
    });

    it('List of all the conf/* directory paths', () => {
        expect(confModule.getLevelPaths())
            .to
            .include
            .members([
                path.join(__dirname, "conf", "cache"),
                path.join(__dirname, "conf", "common"),
                path.join(__dirname, "conf", "default"),
                path.join(__dirname, "conf", "dev"),
                path.join(__dirname, "conf", "production"),
                path.join(__dirname, "conf", "staging")
            ])
    });


});