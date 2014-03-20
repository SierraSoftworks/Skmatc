/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var Validator = require('../Validator.js'),
    Result = require('../Result.js');

module.exports = Validator.module(function(schema) {
    return schema === true || schema === false;
}, function(schema, data, path) {
    if(schema === false) return;
    if(data === null || data === undefined) return this.fail('Expected ' + path + ' to be a defined non-null value but got ' + JSON.stringify(data) + ' instead');
});