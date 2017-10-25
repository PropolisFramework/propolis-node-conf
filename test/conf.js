/**
 * @file Test script for the index.js.
 * @version 1.0.0
 * @author Jean-Nicolas Boulay <jn@yaloub.com>
 */

'use strict';

let conf = require('../index');

let path    = require('path');
let chai    = require('chai');
let expect  = chai.expect;

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
let typeStr = function(obj) {
    return isArray(obj) ? 'array' : typeof obj;
};

describe('conf', () => {

    let confDir = path.join(__dirname, 'conf/');
    let confDefaultDir = path.join(confDir, 'default/');
    let confCommonDir = path.join(confDir, 'common/');
    let confDevDir = path.join(confDir, 'dev/');
    let confStagingDir = path.join(confDir, 'staging/');
    let confProductionDir = path.join(confDir, 'production/');

    it('Casting of an Object to an array type', () => {
        expect(conf._castArr({0: 'foo', 1: 'bar'}))
            .to
            .equal(['foo', 'bar'])
    });

    it('Set configuration path using default path', () => {
        conf.setConfPath();
        expect(conf._rootConfPath)
            .to
            .equal(path.join(__dirname, 'conf'))
    });

    it('Set configuration path using set with param path', () => {
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

});