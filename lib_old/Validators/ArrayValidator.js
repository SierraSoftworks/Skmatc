/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js'),
    Validator = skmatc.Validator,
    Result = skmatc.Result;

module.exports = skmatc.create(function(schema) {
    return Array.isArray(schema);
}, function(schema, data, path) {
    var elementType = schema[0];
    var min = schema.length > 1 ? schema[1] : 0;
    var max = schema.length > 2 ? schema[2] : -1;
    
    if(data === null || data === undefined) return this.fail('Expected ' + (path || 'value') + ' to be a defined non-null value but got ' + data + ' instead');
    if(!Array.isArray(data)) return this.fail('Expected ' + (path || 'value') + ' to be an array but got ' + JSON.stringify(data) + ' instead');

    if(data.length < min) return this.fail('Expected ' + (path || 'value') + ' to have a length of at least ' + min + ' but got ' + data.length + ' instead'); 
    if(max >= 0 && data.length > max) return this.fail('Expected ' + (path || 'value') + ' to have a length of less than ' + min + ' but got ' + data.length + ' instead');

    var result = Result.compound(data.map(function(value, index) {
        var newPath = path + '[' + index + ']';
        return skmatc.validate(this.skmatc.validators, elementType, value, newPath);
    }, this));
    return result.failures;
}, {
    name: 'array validation'
});