export function parseCommand(userInput) {
  const parts = userInput.trim().split(' ');

  return {
    mainCommand: parts[0] || '',
    subCommand: parts[1] || '',
    args: parts.slice(2),
  };
}
