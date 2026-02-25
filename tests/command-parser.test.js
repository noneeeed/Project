import { test, expect } from 'vitest';
import { parseCommand } from '../src/command-parser.js';

test('parseCommand correctly splits main, sub, and arguments', () => {
  const input = 'TRAINEE ADD John Doe';

  const result = parseCommand(input);

  expect(result.mainCommand).toBe('TRAINEE');
  expect(result.subCommand).toBe('ADD');
  expect(result.args).toEqual(['John', 'Doe']);
});
