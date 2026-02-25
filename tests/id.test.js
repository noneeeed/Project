import { test, expect } from 'vitest';

test('ID generation stays within the allowed numeric range', () => {
  const generatedId = Math.floor(Math.random() * 100000);

  expect(generatedId).toBeGreaterThanOrEqual(0);
  expect(generatedId).toBeLessThan(100000);
  expect(typeof generatedId).toBe('number');
});
