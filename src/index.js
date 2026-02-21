import { parseCommand } from './command-parser.js';
import promptSync from 'prompt-sync';
import { handleCourseCommand } from './courseCommands.js';
import { handleTraineeCommand } from './traineeCommands.js';

const prompt = promptSync();

while (true) {
  let userInput = prompt(
    "System initialized. Enter commands (or 'QUIT'/'q' to exit): "
  );
  if (userInput === 'QUIT' || userInput === 'q') {
    console.log('Exiting program...');
    break;
  }
  const { command, subcommand, args } = parseCommand(userInput);
  if (command === 'course') {
    // Call the appropriate function from courseCommands.js based on the subcommand and args
  } else if (command === 'trainee') {
    // Call the appropriate function from traineeCommands.js based on the subcommand and args
  } else {
    console.log(
      "Invalid command. Please enter 'course' or 'trainee' followed by a subcommand and arguments."
    );
  }
}

// Call the appropriate function from courseCommands.js based on the subcommand and args
// This is the entry point of your application.
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.
