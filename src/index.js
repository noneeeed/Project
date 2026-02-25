import { parseCommand } from './command-parser.js';
import promptSync from 'prompt-sync';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';
import chalk from 'chalk';

const prompt = promptSync({ sigint: true });

while (true) {
  let userInput = prompt('>ENTER COMMAND OR PRESS QUIT OR q TO EXIT: ').trim();

  if (!userInput || userInput.trim() === '') continue;

  if (userInput === 'QUIT' || userInput === 'q') {
    console.log('Exiting program...');
    break;
  }

  const { mainCommand, subCommand, args } = parseCommand(userInput);

  if (mainCommand === 'COURSE') {
    handleCourseCommand(subCommand, args);
  } else if (mainCommand === 'TRAINEE') {
    handleTraineeCommand(subCommand, args);
  } else {
    console.log(
      chalk.red("ERROR: Invalid command. Please enter 'COURSE' or 'TRAINEE'.")
    );
  }
}
