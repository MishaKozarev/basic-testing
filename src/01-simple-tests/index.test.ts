import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = { a: 2, b: 3, action: Action.Add };
    const result = simpleCalculator(data);
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const data = { a: 4, b: 3, action: Action.Subtract };
    const result = simpleCalculator(data);
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const data = { a: 2, b: 3, action: Action.Multiply };
    const result = simpleCalculator(data);
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const data = { a: 6, b: 3, action: Action.Divide };
    const result = simpleCalculator(data);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const data = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(data);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const data = { a: 3, b: 4, action: undefined || null };
    const result = simpleCalculator(data);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const data = { a: "4", b: 4, action: Action.Multiply };
    const result = simpleCalculator(data);
    expect(result).toBeNull();
  });
});
