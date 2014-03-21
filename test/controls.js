var should = require('should');
var skmatc = require('../index.js');

describe('control codes', function() {
    it('should handle $type correctly', function() {
        var s = new skmatc({ $type: Number });
        s.validate(1.0).success.should.be.true;
        s.validate(1).success.should.be.true;
        s.validate('string').failed.should.be.true;
    });

    it('should handle $propertyType correctly', function() {
        var s = new skmatc({ $propertyType: Number });
        s.validate({ a: 1 }).success.should.be.true;
        s.validate({ a: 1.0, b: 1 }).success.should.be.true;
        s.validate({ a: 'fail' }).failed.should.be.true;
        s.validate(1).failed.should.be.true;
    });


    it('should handle $required correctly', function() {
        var s = new skmatc({ $required: false, $type: Number });
        s.validate().success.should.be.true;
        s.validate(null).success.should.be.true;
        s.validate(1.0).success.should.be.true;
        s.validate('string').failed.should.be.true;
    });

    it('should handle $message correctly', function() {
        var s = new skmatc({ $required: false, $type: Number, $message: 'Failed' });
        s.validate('fail').messages.should.eql(['Failed']);
    });
});