/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js'),
    Validator = skmatc.Validator,
    Result = skmatc.Result;

module.exports = Validator.module(function(schema) {
    return _.isObject(schema) && _.all(Object.keys(schema), function(property) {
        return property[0] === '$';
    }, this) && Object.keys(schema).length;
}, function(schema, data, path) {
    var message = schema.$message;

    if(schema.$required === false && data === null) return [];
    if(schema.$required === false && data === undefined) return [];
    if(data === null || data === undefined) return this.fail(message || "Value of " + path + " must be defined and non-null");

    if(schema.$type) {
        var result = skmatc.validate(this.skmatc.validators, schema, data, newPath);
        return result.failures;
    }

    if(schema.$propertyType) {
        var result = Result.compound(_.map(data, function(value, key) {
            var newPath = (path ? path + '.' : '') + key;
            skmatc.validate(this.skmatc.validators, schema, data, newPath);
        }, this));

        if(message) _.map(result.failures, function(value) {
            value.message = message;
        });

        return result.failures;
    }

    return this.fail("Expected either a $type or $propertyType command code, found neither.");
});