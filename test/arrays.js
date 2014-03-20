var should = require('should');
var skmatc = require('../index.js');

describe('array validation', function() {
    it('should correctly off-load value validation', function() {
        var s = new skmatc([true]);
        s.validate([]).success.should.be.true;
        s.validate([1]).success.should.be.true;
        s.validate([null]).success.should.be.false;
        s.validate([undefined]).success.should.be.false;
    });

    it('should correctly handle length restrictions', function() {
        var s = new skmatc([true, 2, 4]);
        s.validate([1,2]).success.should.be.true;
        s.validate([1,2,3,4]).success.should.be.true;
        s.validate([1]).failed.should.be.true;
        s.validate([1,2,3,4,5]).failed.should.be.true;
    });
});