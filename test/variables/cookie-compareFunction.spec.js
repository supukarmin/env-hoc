const compareFunction = require('../../src/variables/cookies/compareFunction');

describe('returns true', () => {
  it('with equal object', () => {
    const object1 = {
      a: 'b',
    };
    const object2 = {
      ...object1,
    };
    expect(compareFunction(object1, object2)).toBe(true);
  });
  it('with null server object', () => {
    const object1 = {
      a: 'b',
    };
    expect(compareFunction(object1, null)).toBe(true);
  });
});

describe('returns false', () => {
  it('with unequal object', () => {
    const object1 = {
      a: 'b',
    };
    const object2 = {
      b: 'c',
    };
    expect(compareFunction(object1, object2)).toBe(false);
  });
});
