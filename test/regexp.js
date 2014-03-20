var should = require('should');
var skmatc = require('../index.js');

describe('regexp validation', function() {
    it('should fail validation for null values', function() {
        var s = new skmatc(/a/);
        s.validate('a').success.should.be.true;
        s.validate(null).failed.should.be.true;
    });

    it('should correctly validate regexps', function() {
        var s = new skmatc(/^abc$/);
        s.validate('abc').success.should.be.true;
        s.validate('abd').failed.should.be.true;
        s.validate('abcd').failed.should.be.true;
    });
});