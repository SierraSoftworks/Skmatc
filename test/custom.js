var should = require('should');
var skmatc = require('../index.js');

describe('custom validation', function() {
    it('should allow instance specific registrations', function() {
        var s = new skmatc('positive');
        s.register(skmatc.create(function(schema) { return schema == 'positive'; }, function(schema, data) { return this.assert(data >= 0); }));
        s.validate(1).success.should.be.true;
        s.validate(-1).failed.should.be.true;
    });
});