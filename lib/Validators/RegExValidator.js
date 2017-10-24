/// <reference path="../skmatc.js"/>

var _ = require('lodash');
var skmatc = require('../skmatc.js');

module.exports = skmatc.create(function(schema) {
    return schema instanceof RegExp;
}, function(schema, data, path) {
    if(typeof data !== 'string') return this.fail('Expected ' + (path || 'value') + ' to be a defined string value but got ' + JSON.stringify(data) + ' instead');
    return this.assert(schema.test(data), 'Expected ' + (path || 'value') + ' to match the regular expression "' + schema.toString() + '" but got ' + JSON.stringify(data) + ' instead');
}, {
    name: 'regexp validation'
});
