/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js');

module.exports = skmatc.create(function(schema) {
    return schema === String || schema === Boolean || schema === Number || schema === Object || schema === Date || schema == Function || schema === Array;
}, function(schema, data, path) {
    if(data === null || data === undefined) return this.fail('Expected ' + path + ' to be a defined non-null value but got ' + data + ' instead');
    if(schema === String) return this.assert(_.isString(data), "Expected " + path + " to be a string, but got " + JSON.stringify(data) + " instead");
    if(schema === Number) return this.assert(_.isNumber(data), "Expected " + path + " to be a number, but got " + JSON.stringify(data) + " instead");
    if(schema === Boolean) return this.assert(_.isBoolean(data), "Expected " + path + " to be a boolean, but got " + JSON.stringify(data) + " instead");
    if(schema === Object) return this.assert(_.isPlainObject(data), "Expected " + path + " to be an object, but got " + JSON.stringify(data) + " instead");
    if(schema === Date) return this.assert(_.isDate(data), "Expected " + path + " to be a date, but got " + JSON.stringify(data) + " instead");
    if(schema === Function) return this.assert(_.isFunction(data), "Expected " + path + " to be a function, but got " + JSON.stringify(data) + " instead");
    if(schema === Array) return this.assert(_.isArray(data), "Expected " + path + " to be an array, but got " + JSON.stringify(data) + " instead");
});