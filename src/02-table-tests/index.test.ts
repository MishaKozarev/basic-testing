import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 4, action: 'x', expected: null },
  { a: '4', b: 4, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct results',
    ({ expected, a, action, b }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});