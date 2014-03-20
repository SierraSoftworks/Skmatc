var _ = require('lodash');
var Validation = require('./Failure.js');

module.exports = Result;

function Result(failures) {
    /// <summary>Creates a new validation result object</summary>
    /// <param name="failures" type="Array" elementType="Failure">The validations which failed to complete successfully</param>
    
    if(!Array.isArray(failures)) failures = [failures];
    _.remove(failures, function(x) { return x === null || x === undefined });

    /// <field name="failures" type="Array" elementType="Failure">The validations which failed to complete successfully</field>
    this.failures = failures;
}

Result.compound = function(results) {
    /// <signature>
    /// <summary>Compounds a number of result objects into a single one</summary>
    /// <param name="results" type="Array" elementType="Result">The result objects to compact</param>
    /// <returns type="Result"/>
    /// </signature>
    /// <signature>
    /// <summary>Compounds a number of result objects into a single one</summary>
    /// <param name="results" type="Array" elementType="Result" parameterArray="true">The result objects to compact</param>
    /// <returns type="Result"/>
    /// </signature>
        
    if(!Array.isArray(results)) results = Array.prototype.slice.call(arguments, 0);
    
    var failures = [];
    for(var i = 0; i < results.length; i++) {
        Array.prototype.push.apply(failures, results[i].failures);
    }
    return new Result(failures);
};

Result.prototype = {
    get success() {
        /// <summary>True if the data passed validation</summary>
        /// <returns type="Boolean"/>
        return this.failures.length === 0;
    },

    get failed() {
        /// <summary>True if the data failed validation</summary>
        /// <returns value="!this.success"/>
        return this.failures.length > 0;
    },

    get message() {
        /// <summary>The message used to describe the result of this validation</summary>
        /// <returns type="String"/>

        if(this.success) return "Validation Succeeded";
        return 'Validation Failed: \n' + _.map(this.failures, function(failure) { return failure.message; }).join('\n');
    },

    get error() {
        /// <summary>Gets an error representation of this result</summary>
        /// <returns type="Error"/>

        if(this.success) return;

        var e = new Error(this.message);

        e.isValidationError = true;
        e.failures = this.failures;
        e.messages = _.map(this.failures, function(failure) { return failure.message; });

        return e;
    }
};