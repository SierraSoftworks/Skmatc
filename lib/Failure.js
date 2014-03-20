/// <reference path="./Failure.js"/>s

module.exports = Failure

function Failure(validator, data, path) {
    /// <summary>Describes the result of a validation operation</summary>
    /// <param name="validator" type="Validator">The validator which failed</param>
    /// <param name="data" type="Mixed">The data which failed validation</param>
    /// <param name="path" type="String">The path to the data which failed validation</param>
    
}

Failure.prototype = {
    get message() {
        
    }
}