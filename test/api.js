var should = require('should');
var skmatc = require('../index.js');

describe('api', function() {
    it('constructor should present correct properties', function() {
        skmatc.should.have.ownProperty('Failure').of.type.Function;
        skmatc.should.have.ownProperty('Result').of.type.Function;
        skmatc.should.have.ownProperty('Validator').of.type.Function;
        skmatc.should.have.ownProperty('validators').of.type.Array;
    });

    it('instance should present correct functions and properties', function() {
        var s = new skmatc({ test: true });
        s.should.have.ownProperty('schema').and.eql({ test: true });
        s.should.have.ownProperty('validators').of.type.Array;
        s.should.have.property('validate').of.type.Function;
    });
});