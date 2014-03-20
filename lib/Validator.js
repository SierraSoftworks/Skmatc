var _ = require('lodash');

var Failure = require('./Failure.js');

module.exports = Validator;

function Validator(skmatc, options) {
    /// <summary>Creates a new validator</summary>
    /// <param name="skmatc" type="skmatc">The skmatc instance for which the validator will be created</param>
    /// <param name="options" type="Object" optional="true">The options configuring how this validator behaves</param>

    this.skmatc = skmatc;

    if(options) _.merge(this, options);
}

Validator.module = function(handles, validate, options) {
    /// <summary>Creates a new custom validator module</summary>
    /// <param name="handles" value="new Validator(skmatc).handles">The function which determines which schema objects this validator handles</param>
    /// <param name="validate" value="new Validator(skmatc).validate">The function which performs validation</param>
    /// <param name="options" type="Object" optional="true">The options configuring how this validator behaves</param>

    return function(skmatc) {
        /// <summary>Initializes this validation module</summary>
        /// <param name="skmatc" type="skmatc">The skmatc instance for which the validator will be created</param>
        /// <returns type="Validator"/>

        var validator = new Validator(skmatc, options);
        validator.validator = validate;
        validator.handles = handles.bind(validator);
        return validator;
    };
};

Validator.create = function(skmatc, handles, validate, options) {
    /// <summary>Creates a new custom validator</summary>
    /// <param name="skmatc" type="skmatc">The skmatc instance for which the validator will be created</param>
    /// <param name="handles" value="new Validator(skmatc).handles">The function which determines which schema objects this validator handles</param>
    /// <param name="validate" value="new Validator(skmatc).validate">The function which performs validation</param>
    /// <param name="options" type="Object" optional="true">The options configuring how this validator behaves</param>

    var validator = new Validator(skmatc, options);
    validator.validator = validate;
    validator.handles = handles.bind(validator);
    return validator;
};

Validator.prototype.handles = function(schema) {
    /// <summary>Determines whether this validator can handle the given schema node</summary>
    /// <param name="schema" type="Object">The schema node to check</param>
    /// <returns type="Boolean"/>
    return false;
};

Validator.prototype.validate = function(schema, data, path) {
    /// <summary>Validates the provided data</summary>
    /// <param name="schema" type="Mixed">The schema type being validated against</param>
    /// <param name="data" type="Mixed">The data to validate</param>
    /// <param name="path" type="String">The relative path of the data being validated</param>
    /// <returns type="Array" elementType="Failure">An array of validations which failed for this data</returns>
    
    return this.validator.call({
        validator: this,
        skmatc: this.skmatc,
        fail: this.fail.bind(this, schema, data, path),
        assert: this.assert.bind(this, schema, data, path)
    }, schema, data, path);
};

Validator.prototype.assert = function(schema, data, path, test, message) {
    /// <summary>Creates a failure object describing a failed validation if the test is false</summary>
    /// <param name="schema" type="Mixed">The schema type being validated against</param>
    /// <param name="data" type="Mixed">The data being validated</param>
    /// <param name="path" type="String">The relative path of the data being validated</param>
    /// <param name="test" type="Boolean">A value to test against</param>
    /// <param name="message" type="String" optional="true">The message describing why the failure occured</param>
    /// <returns type="Failure"/>

    if(test) return;
    return this.fail(schema, data, path, message);
};

Validator.prototype.fail = function(schema, data, path, message) {
    /// <summary>Creates a failure object describing a failed validation</summary>
    /// <param name="schema" type="Mixed">The schema type being validated against</param>
    /// <param name="data" type="Mixed">The data being validated</param>
    /// <param name="path" type="String">The relative path of the data being validated</param>
    /// <param name="message" type="String" optional="true">The message describing why the failure occured</param>
    /// <returns type="Failure"/>

    var failure = new Failure(this, data, path);

    if(message) failure.message = message;

    return failure;
};