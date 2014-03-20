var should = require('should');
var skmatc = require('../index.js');

describe('type validation', function() {
    it('should correctly validate booleans', function() {
        var s = new skmatc(Boolean);
        s.validate(true).success.should.be.true;
        s.validate(false).success.should.be.true;
        s.validate(1).success.should.be.false;
        s.validate('true').success.should.be.false;
    });

    it('should correctly validate strings', function() {
        var s = new skmatc(String);
        s.validate('s').success.should.be.true;
        s.validate('').success.should.be.true;
        s.validate(1).failed.should.be.true;
        s.validate(String).failed.should.be.true;
    });

    it('should correctly validate numbers', function() {
        var s = new skmatc(Number);
        s.validate(1).success.should.be.true;
        s.validate(10.1).success.should.be.true;
        s.validate('1').failed.should.be.true;
        s.validate(Number).failed.should.be.true;
    });

    it('should correctly validate dates', function() {
        var s = new skmatc(Date);
        s.validate(new Date()).success.should.be.true;
        s.validate(new Date(123456)).success.should.be.true;
        s.validate(new Date().toString()).failed.should.be.true;
        s.validate(Date).failed.should.be.true;
    });

    it('should correctly validate objects', function() {
        var s = new skmatc(Object);
        s.validate({}).success.should.be.true;
        s.validate({ a: 1 }).success.should.be.true;
        s.validate('1').failed.should.be.true;
        s.validate(Object).failed.should.be.true;
    });

    it('should correctly validate functions', function() {
        var s = new skmatc(Function);
        s.validate(function() { }).success.should.be.true;
        s.validate(Function).success.should.be.true;
        s.validate('string').failed.should.be.true;
        s.validate(123).failed.should.be.true;
    });
});