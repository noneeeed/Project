export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
  const parts = userInput.trim().split(' ');

  const mainCommand = parts[0];
  const subCommand = parts[1];
  const args = parts.slice(2);

  return {
    mainCommand: mainCommand,
    subCommand: subCommand,
    args: args,
  };
}
