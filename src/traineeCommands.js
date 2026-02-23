import {
  saveTraineeData,
  loadTraineeData,
  loadCourseData,
  saveCourseData,
} from './storage.js';
import chalk from 'chalk';

function addTrainee(args) {
  const [firstName, lastName] = args;
  if (!firstName || !lastName)
    return console.log(chalk.red('ERROR: Must provide first and last name'));

  const trainees = loadTraineeData();
  const id = Math.floor(Math.random() * 100000);

  trainees.push({ id, firstName, lastName });
  saveTraineeData(trainees);
  console.log(`CREATED: ${id} ${firstName} ${lastName}`);
}

function updateTrainee(args) {
  const id = parseInt(args[0]);
  const [_, firstName, lastName] = args;

  if (isNaN(id) || !firstName || !lastName) {
    return console.log(
      chalk.red('ERROR: Must provide ID, first name and last name')
    );
  }
  const trainee = trainees.find((t) => t.id === id);

  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );

  trainee.firstName = firstName;
  trainee.lastName = lastName;
  saveTraineeData(trainees);
  console.log(`UPDATED: ${id} ${firstName} ${lastName}`);
}

function deleteTrainee(args) {
  const id = parseInt(args[0]);
  if (isNaN(id))
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );

  const trainees = loadTraineeData();
  const index = trainees.findIndex((t) => t.id === id);

  if (index === -1)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );

  const [deleted] = trainees.splice(index, 1);
  saveTraineeData(trainees);

  const courses = loadCourseData();
  courses.forEach((c) => {
    c.participants = c.participants.filter((pId) => pId !== id);
  });
  saveCourseData(courses);

  console.log(`DELETED: ${id} ${deleted.firstName} ${deleted.lastName}`);
}

function fetchTrainee(args) {
  const id = parseInt(args[0]);
  const trainees = loadTraineeData();
  if (isNaN(id))
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );
  const trainee = trainees.find((t) => t.id === id);

  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[0]} does not exist`)
    );

  console.log(`${trainee.id} ${trainee.firstName} ${trainee.lastName}`);
}
function fetchAllTrainees() {
  const trainees = loadTraineeData();
  const sorted = [...trainees].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  console.log('Trainees:');
  sorted.forEach((t) => console.log(`${t.id} ${t.firstName} ${t.lastName}`));
  console.log(`\nTotal: ${trainees.length}`);
}

export function handleTraineeCommand(subcommand, args) {
  if (subcommand === 'ADD') addTrainee(args);
  else if (subcommand === 'UPDATE') updateTrainee(args);
  else if (subcommand === 'DELETE') deleteTrainee(args);
  else if (subcommand === 'GET') fetchTrainee(args);
  else if (subcommand === 'GETALL') fetchAllTrainees();
  else
    console.log(
      chalk.red(`ERROR: Invalid sub-command ${subcommand} for TRAINEE`)
    );
}
