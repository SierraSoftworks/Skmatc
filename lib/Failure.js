module.exports = Failure

function Failure(validator, schema, data, path) {
    /// <summary>Describes the result of a validation operation</summary>
    /// <param name="validator" type="Validator">The validator which failed</param>
    /// <param name="schema" type="Mixed">The schema agains which validation failed</param>
    /// <param name="data" type="Mixed">The data which failed validation</param>
    /// <param name="path" type="String">The path to the data which failed validation</param>
    
    this.validator = validator;
    this.schema = schema;
    this.data = data;
    this.path = path;
}

Failure.prototype = {
    get message() {
        return 'Expected ' + (this.path || 'value') + ' to pass ' + this.validator.name + ' - ' + JSON.stringify(this.data) + ' should be ' + JSON.stringify(this.schema);
    }
}