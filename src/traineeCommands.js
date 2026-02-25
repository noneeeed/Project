import { saveTraineeData, loadTraineeData, loadCourseData } from './storage.js';
import chalk from 'chalk';

function addTrainee(args) {
  const [firstName, lastName] = args;
  if (!firstName || !lastName)
    return console.log(chalk.red('ERROR: Must provide first and last name'));

  const trainees = loadTraineeData();
  // Using random ID for simplicity; consider UUID for production
  const id = Math.floor(Math.random() * 100000);

  trainees.push({ id, firstName, lastName });
  saveTraineeData(trainees);
  console.log(chalk.green(`CREATED: ${id} ${firstName} ${lastName}`));
}

function updateTrainee(args) {
  const id = parseInt(args[0]);
  const [_, firstName, lastName] = args;

  if (isNaN(id) || !firstName || !lastName) {
    return console.log(
      chalk.red('ERROR: Must provide ID, first name and last name')
    );
  }

  const trainees = loadTraineeData();
  const trainee = trainees.find((t) => t.id === id);

  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${id} does not exist`)
    );

  trainee.firstName = firstName;
  trainee.lastName = lastName;
  saveTraineeData(trainees);
  console.log(chalk.blue(`UPDATED: ${id} ${firstName} ${lastName}`));
}

function fetchTrainee(args) {
  const id = parseInt(args[0]);
  const trainees = loadTraineeData();
  const trainee = trainees.find((t) => t.id === id);

  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );

  console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);

  // Cross-reference trainee ID against course participant lists
  const courses = loadCourseData();
  const enrolled = courses
    .filter((c) => c.participants.includes(id))
    .map((c) => c.name);

  console.log(`Courses: ${enrolled.length > 0 ? enrolled.join(', ') : 'None'}`);
}

function fetchAllTrainees() {
  const trainees = loadTraineeData();
  // Sort by lastName without mutating the original array
  const sorted = [...trainees].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  console.log(chalk.bold('Trainees:'));
  sorted.forEach((t) => console.log(`${t.id} ${t.firstName} ${t.lastName}`));
  console.log(`\nTotal: ${trainees.length}`);
}

// Added missing logic for the DELETE subcommand referenced below
function deleteTrainee(args) {
  const id = parseInt(args[0]);
  const trainees = loadTraineeData().filter((t) => t.id !== id);
  saveTraineeData(trainees);
  console.log(chalk.yellow(`DELETED: Trainee ${id}`));
}

export function handleTraineeCommand(subcommand, args) {
  switch (subcommand?.toUpperCase()) {
    case 'ADD':
      return addTrainee(args);
    case 'UPDATE':
      return updateTrainee(args);
    case 'DELETE':
      return deleteTrainee(args);
    case 'GET':
      return fetchTrainee(args);
    case 'GETALL':
      return fetchAllTrainees();
    default:
      console.log(
        chalk.red(`ERROR: Invalid sub-command ${subcommand} for TRAINEE`)
      );
  }
}
