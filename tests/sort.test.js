import { test, expect } from 'vitest';

test('Trainee list is sorted alphabetically by last name', () => {
  const trainees = [
    { firstName: 'Zoe', lastName: 'Zebra' },
    { firstName: 'Adam', lastName: 'Apple' },
  ];

  const result = trainees.sort((a, b) => a.lastName.localeCompare(b.lastName));

  expect(result[0].lastName).toBe('Apple');
  expect(result[1].lastName).toBe('Zebra');
});
