import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';
import chalk from 'chalk';

function addCourse(args) {
  const [name, startDate] = args;
  if (!name || !startDate) {
    return console.log(
      chalk.red('ERROR: Must provide course name and start date')
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return console.log(
      chalk.red('ERROR: Invalid start date. Must be in yyyy-MM-dd format')
    );
  }

  const courses = loadCourseData();
  const id = Math.floor(Math.random() * 100000);

  courses.push({ id, name, startDate, participants: [] });
  saveCourseData(courses);
  console.log(`CREATED: ${id} ${name} ${startDate}`);
}

function deleteCourse(args) {
  const id = parseInt(args[0]);
  const courses = loadCourseData();
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return console.log(
      chalk.red(`ERROR: Course with ID ${args[0]} does not exist`)
    );
  }

  const [deleted] = courses.splice(index, 1);
  saveCourseData(courses);
  console.log(`DELETED: ${id} ${deleted.name}`);
}

function joinCourse(args) {
  const courseID = parseInt(args[0]);
  const traineeID = parseInt(args[1]);

  if (isNaN(courseID) || isNaN(traineeID)) {
    return console.log(
      chalk.red('ERROR: Must provide course ID and trainee ID')
    );
  }

  const courses = loadCourseData();
  const trainees = loadTraineeData();

  const course = courses.find((c) => c.id === courseID);
  const trainee = trainees.find((t) => t.id === traineeID);

  if (!course)
    return console.log(
      chalk.red(`ERROR: Course with ID ${courseID} does not exist`)
    );
  if (!trainee)
    return console.log(
      chalk.red(`ERROR: Trainee with ID ${traineeID} does not exist`)
    );

  if (course.participants.includes(traineeID)) {
    return console.log(
      chalk.red('ERROR: The Trainee has already joined this course')
    );
  }
  if (course.participants.length >= 20) {
    return console.log(chalk.red('ERROR: The course is full.'));
  }

  const enrollmentCount = courses.filter((c) =>
    c.participants.includes(traineeID)
  ).length;
  if (enrollmentCount >= 5) {
    return console.log(
      chalk.red('ERROR: A trainee is not allowed to join more than 5 courses.')
    );
  }

  course.participants.push(traineeID);
  saveCourseData(courses);
  console.log(`${trainee.firstName} Joined ${course.name}`);
}

function getAllCourses() {
  const courses = loadCourseData();
  const sorted = [...courses].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  console.log('Courses:');
  sorted.forEach((c) => {
    const fullLabel = c.participants.length >= 20 ? ' FULL' : '';
    console.log(
      `${c.id} ${c.name} ${c.startDate} ${c.participants.length}${fullLabel}`
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
