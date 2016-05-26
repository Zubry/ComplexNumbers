import {assert} from 'chai';
import should from 'should';

import ComplexNumber from './../lib/';

describe('ComplexNumbers', function() {
  describe('#constructor({real, imaginary})', function () {
    it('should not allow non-numbers', function () {
      (function(){
        new ComplexNumber({ real: NaN, imaginary: 5 });
      }).should.throw();

      (function(){
        new ComplexNumber({ real: 5, imaginary: NaN });
      }).should.throw();
    });
  });

  describe('#scale(scalar)', function () {
    it('should scale the complex number', function () {
      const c = new ComplexNumber({ real: 3, imaginary:  5});

      const scaled = c.scale(5);

      scaled.get('real').should.equal(15);
      scaled.get('imaginary').should.equal(25);
    });
  });

  describe('#negate()', function () {
    it('negate the complex number', function () {
      const c = new ComplexNumber({ real: 3, imaginary: 5 });

      const negated = c.negate();

      negated.real.should.equal(-3);
      negated.imaginary.should.equal(-5);
    });
  });

  describe('#multiply(c)', function () {
    it('should multiply two complex numbers', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test = c1.multiply(c2);

      test.real.should.equal(-7);
      test.imaginary.should.equal(22);
    });

    it('should be commutative', function() {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test1 = c1.multiply(c2);
      const test2 = c2.multiply(c1);

      test1.real.should.equal(test2.real);
      test1.imaginary.should.equal(test2.imaginary);
    });
  });

  describe('#add(c)', function () {
    it('should add two complex numbers', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test = c1.add(c2);

      test.real.should.equal(6);
      test.imaginary.should.equal(8);
    });

    it('should be commutative', function() {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test1 = c1.add(c2);
      const test2 = c2.add(c1);

      test1.real.should.equal(test2.real);
      test1.imaginary.should.equal(test2.imaginary);
    });
  });

  describe('#subtract(c)', function () {
    it('should subtract two complex numbers', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test = c2.subtract(c1);

      test.real.should.equal(2);
      test.imaginary.should.equal(2);
    });

    it('should return the additive identity when it subtracts a complex from itself', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c1.subtract(c1);

      test.real.should.equal(0);
      test.imaginary.should.equal(0);
    });
  });

  describe('#modulusSquared()', function () {
    it('should return the squared 2-norm of the complex number', function () {
      const c = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c.modulusSquared();

      test.should.equal(13);
    });
  });

  describe('#modulus()', function () {
    it('should return the 2-norm of the complex number', function () {
      const c = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c.modulus();

      test.should.equal(Math.sqrt(13));
    });
  });

  describe('#argument()', function () {
    it('should return the argument of the complex number', function () {
      const c = new ComplexNumber({ real: 1, imaginary: 1});

      const test = c.argument();

      test.should.equal(45 * Math.PI / 180);
    });
  });

  describe('#conjugate()', function () {
    it('should conjugate the complex number', function () {
      const c = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c.conjugate();

      test.real.should.equal(2);
      test.imaginary.should.equal(-3);
    });

    it('should "project" a complex into the reals when multiplying a complex by its conjugate', function(){
      const c = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c.conjugate().multiply(c);

      test.real.should.equal(13);
      test.imaginary.should.equal(0);
    });
  });

  describe('#divide(c)', function () {
    it('should divide two complex numbers', function () {
      const c1 = new ComplexNumber({ real: 4, imaginary: 2});
      const c2 = new ComplexNumber({ real: 3, imaginary: -1});

      const test = c1.divide(c2);

      test.real.should.equal(1);
      test.imaginary.should.equal(1);
    });

    it('should return the multiplicative identity when it divides a complex by itself', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c1.divide(c1);

      test.real.should.equal(1);
      test.imaginary.should.equal(0);
    });
  });

  describe('#normalize()', function () {
    it('should return a unit complex number', function () {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});

      const test = c1.normalize();

      test.modulusSquared().should.equal(1);
    });
  });

  describe('#times(c)', function() {
    it('should alias ComplexNumber.multiply(c)', function() {
      const c1 = new ComplexNumber({ real: 2, imaginary: 3});
      const c2 = new ComplexNumber({ real: 4, imaginary: 5});

      const test = c1.times(c2);

      test.real.should.equal(-7);
      test.imaginary.should.equal(22);

    })
  })
});
