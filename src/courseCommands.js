import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';
import chalk from 'chalk';
let courses = loadCourseData();
let trainees = loadTraineeData();

function addCourse(args) {
  const [name, startDate] = args;
  if (!name || !startDate) {
    console.log(chalk.red('ERROR: Must provide course name and start date'));
    return;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    console.log(
      chalk.red('ERROR: Invalid date format. Please use YYYY-MM-DD.')
    );
    return;
  }
  const id = Math.floor(Math.random() * 100000);
  const newCourse = { id, name, startDate, participants: [] };
  courses.push(newCourse);
  saveCourseData(courses);
  console.log(`CREATED: ${id} ${name} ${startDate}`);
}
function updateCourse(args) {
  const id = parseInt(args[0]);
  const name = args[1];
  const startDate = args[2];

  if (isNaN(id) || !name || !startDate) {
    return console.log(
      chalk.red('ERROR: Must provide ID, name and start date.')
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return console.log(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
  }

  const courses = loadCourseData();
  const course = courses.find((c) => c.id === id);

  if (!course)
    return console.log(chalk.red(`ERROR: Course with ID ${id} does not exist`));

  course.name = name;
  course.startDate = startDate;
  saveCourseData(courses);
  console.log(`UPDATED: ${id} ${name} ${startDate}`);
}

function deleteCourse(args) {
  const id = parseInt(args[0]);
  if (isNaN(id))
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1)
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );

  const [deleted] = courses.splice(index, 1);
  saveCourseData(courses);
  console.log(`DELETED: ${id} ${deleted.name}`);
}

function joinCourse(args) {
  const courseID = parseInt(args[0]);
  const traineeID = parseInt(args[1]);

  if (isNaN(courseID) || isNaN(traineeID))
    return console.log(
      chalk.red('ERROR: Must provide course ID and trainee ID')
    );

  const course = courses.find((c) => c.id === courseID);
  const trainee = trainees.find((t) => t.id === traineeID);

  if (!course)
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[1]} does not exist`)
    );
  if (course.participants.includes(traineeID))
    return console.log(
      chalk.red('ERROR: The Trainee has already joined this course')
    );
  if (course.participants.length >= 20)
    return console.log(chalk.red('ERROR: The course is full.'));

  const enrollmentCount = courses.filter((c) =>
    c.participants.includes(traineeID)
  ).length;
  if (enrollmentCount >= 5)
    return console.log(
      chalk.red('ERROR: A trainee is not allowed to join more than 5 courses.')
    );

  course.participants.push(traineeID);
  saveCourseData(courses);
  console.log(`${trainee.firstName} Joined ${course.name}`);
}

function leaveCourse(args) {
  const courseID = parseInt(args[0]);
  const traineeID = parseInt(args[1]);

  if (isNaN(courseID) || isNaN(traineeID))
    return console.log(
      chalk.red('ERROR: Must provide course ID and trainee ID')
    );

  const course = courses.find((c) => c.id === courseID);
  const trainee = trainees.find((t) => t.id === traineeID);

  if (!course)
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${args[1]} does not exist`)
    );

  const pIndex = course.participants.indexOf(traineeID);
  if (pIndex === -1)
    return console.log(chalk.red('ERROR: The Trainee did not join the course'));

  course.participants.splice(pIndex, 1);
  saveCourseData(courses);
  console.log(`${trainee.firstName} Left ${course.name}`);
}

function getCourse(args) {
  const id = parseInt(args[0]);
  if (isNaN(id))
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );

  const courses = loadCourseData();
  const trainees = loadTraineeData();
  const course = courses.find((c) => c.id === id);

  if (!course)
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );

  console.log(`${course.id} ${course.name} ${course.startDate}`);
  console.log(`Participants (${course.participants.length}):`);

  course.participants.forEach((participantId) => {
    const t = trainees.find((tr) => tr.id === participantId);
    if (t) console.log(`- ${t.id} ${t.firstName} ${t.lastName}`);
  });
}

function getAllCourses() {
  console.log('Courses:');
  sorted.forEach((c) => {
    const fullOrNot = c.participants.length >= 20 ? ' FULL' : '';
    console.log(
      `${c.id} ${c.name} ${c.startDate} ${c.participants.length}${fullOrNot}`
    );
  });
  console.log(`\nTotal: ${courses.length}`);
}

export function handleCourseCommand(subcommand, args) {
  if (subcommand === 'ADD') addCourse(args);
  else if (subcommand === 'UPDATE') updateCourse(args);
  else if (subcommand === 'DELETE') deleteCourse(args);
  else if (subcommand === 'JOIN') joinCourse(args);
  else if (subcommand === 'LEAVE') leaveCourse(args);
  else if (subcommand === 'GET') getCourse(args);
  else if (subcommand === 'GETALL') getAllCourses();
  else
    console.log(
      chalk.red(`ERROR: Invalid sub-command ${subcommand} for COURSE`)
    );
}
