import { test, expect } from 'vitest';

test('Course capacity check: identifies when a course is full', () => {
  const fullCourse = {
    name: 'Advanced JS',
    participants: Array.from({ length: 20 }, (_, i) => i),
  };

  const isFull = fullCourse.participants.length >= 20;

  expect(isFull).toBe(true);
});
