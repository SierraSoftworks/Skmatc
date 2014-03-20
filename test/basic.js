var should = require('should');
var skmatc = require('../index.js');

describe('basic validation', function() {
    it('should not care about missing "false" values', function() {
        var s = new skmatc(false);
        s.validate().success.should.be.true;
        s.validate(null).success.should.be.true;
    });

    it('should require "true" values', function() {
        var s = new skmatc(true);
        s.validate('something').success.should.be.true;
        s.validate().failed.should.be.true;
        s.validate(null).failed.should.be.true;
    });
});