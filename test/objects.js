var should = require('should');
var skmatc = require('../index.js');

describe('object validation', function() {
    it('should fail validation of null objects', function() {
        var s = new skmatc({ });
        s.validate().success.should.be.false;
    });

    it('should handoff sub-validation', function() {
        var s = new skmatc({ req: true, opt: false });
        s.validate({ req: 1 }).success.should.be.true;
        s.validate().failed.should.be.true;
        s.validate({ opt: 1 }).failed.should.be.true;
    });

    it('should not care about unspecified properties', function() {
        var s = new skmatc({ req: true, opt: false });
        s.validate({ req: 1, extra: 2 }).success.should.be.true;
        s.validate({ extra: 2 }).failed.should.be.true;
        s.validate({ opt: 1, extra: 2 }).failed.should.be.true;
    });
});