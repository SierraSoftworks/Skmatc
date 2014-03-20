/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js');

module.exports = skmatc.create(function(schema) {
    return schema instanceof RegExp;
}, function(schema, data, path) {
    if(data === null || data === undefined) return this.fail('Expected ' + path + ' to be a defined non-null value but got ' + data + ' instead');
    return this.assert(schema.test(data), 'Expected ' + path + ' to match the regular expression "' + schema.toString() + '" but got ' + JSON.stringify(data) + ' instead');
});