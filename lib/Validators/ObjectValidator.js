/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js'),
    Validator = skmatc.Validator,
    Result = skmatc.Result;

module.exports = skmatc.create(function(schema) {
    return _.isPlainObject(schema);
}, function(schema, data, path) {    
    if(data === null || data === undefined) return this.fail('Expected ' + (path || 'value') + ' to be a defined non-null value but got ' + data + ' instead');

    var result = Result.compound(_.map(schema, function(schemaType, key) {
        var newPath = (path ? path + '.' : '') + key;
        return skmatc.validate(this.skmatc.validators, schema[key], data[key], newPath);
    }, this));
    
    return result.failures;
}, {
    name: 'object validation'
});