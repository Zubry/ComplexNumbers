import { Record as record } from 'immutable';
import { assert } from 'check-types';

const ComplexNumberRecord = record({
  real: 0,
  imaginary: 0,
});

export default class ComplexNumber extends ComplexNumberRecord {
  constructor({ real, imaginary }) {
    assert.number(real);
    assert.number(imaginary);

    super({ real, imaginary });
  }

  scale(scalar) {
    return this
      .update('real', (real) => real * scalar)
      .update('imaginary', (i) => i * scalar);
  }

  negate() {
    return this
      .scale(-1);
  }

  multiply(complex) {
    const { real: c, imaginary: d } = complex.toObject();

    return this
      .set('real', this.real * c - this.imaginary * d)
      .set('imaginary', c * this.imaginary + this.real * d);
  }

  add(complex) {
    const { real: a, imaginary: b } = complex.toObject();

    return this
      .update('real', (real) => real + a)
      .update('imaginary', (i) => i + b);
  }

  subtract(complex) {
    return this.add(complex.negate());
  }

  modulusSquared() {
    const { real: a, imaginary: b } = this.toObject();
    return a * a + b * b;
  }

  modulus() {
    return Math.sqrt(this.modulusSquared());
  }

  argument() {
    const { real: a, imaginary: b } = this.toObject();
    return Math.atan2(b, a);
  }

  conjugate() {
    return this
      .update('imaginary', (i) => -i);
  }

  divide(complex) {
    const { real: a, imaginary: b } = this.toObject();
    const { real: c, imaginary: d } = complex.toObject();

    const denominator = complex.modulusSquared();

    return this
      .set('real', (a * c + b * d) / denominator)
      .set('imaginary', (b * c - a * d) / denominator);
  }

  normalize() {
    const mod = this.modulus();

    return this.scale(1 / mod);
  }

  times(...args) {
    return this.multiply.apply(this, args);
  }

  plus(...args) {
    return this.add.apply(this, args);
  }

  minus(...args) {
    return this.subtract.apply(this, args);
  }

  over(...args) {
    return this.divide.apply(this, args);
  }

  dividedBy(...args) {
    return this.divide.apply(this, args);
  }

  phase(...args) {
    return this.argument.apply(this, args);
  }

  abs(...args) {
    return this.modulus.apply(this, args);
  }

  absSquared(...args) {
    return this.modulusSquared.apply(this, args);
  }
}
