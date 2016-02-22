var _ = require('lodash');
var skmatc = require('../skmatc.js'),
    Validator = skmatc.Validator,
    Result = skmatc.Result;

module.exports = skmatc.create(function(schema) {
    return _.isObject(schema) && Object.keys(schema).every(function(property) {
        return property[0] === '$';
    }, this) && Object.keys(schema).length;
}, function(schema, data, path) {
    var message = schema.$message;

    if(schema.$required === false && data === null) return [];
    if(schema.$required === false && data === undefined) return [];
    if(data === null || data === undefined) return this.fail(message || "Value of " + (path || 'value') + " must be defined and non-null");

    if(schema.$type) {
        var result = skmatc.validate(this.skmatc.validators, schema.$type, data, path);

        if(message) _.map(result.failures, function(value) {
            value.message = message;
        });

        return result.failures;
    }
    
    if(schema.$propertyType) {
        if(!_.isPlainObject(data)) return this.fail(message || 'Expected ' + (path || 'value') + ' to be an object but got ' + JSON.stringify(data) + ' instead');

        var result = Result.compound(_.map(data, function(value, key) {
            var newPath = (path ? path + '.' : '') + key;
            return skmatc.validate(this.skmatc.validators, schema.$propertyType, value, newPath);
        }, this));

        if(message) _.map(result.failures, function(value) {
            value.message = message;
        });

        return result.failures;
    }

    return this.fail("Expected either a $type or $propertyType command code, found neither.");
});