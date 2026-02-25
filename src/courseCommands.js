import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';
import chalk from 'chalk';

function addCourse(args) {
  const [name, startDate] = args;
  if (!name || !startDate) {
    return console.log(
      chalk.red('ERROR: Must provide course name and start date')
    );
  }

  // Ensure ISO 8601 format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return console.log(
      chalk.red('ERROR: Invalid start date format (yyyy-MM-dd)')
    );
  }

  const courses = loadCourseData();
  const id = Math.floor(Math.random() * 100000);

  courses.push({ id, name, startDate, participants: [] });
  saveCourseData(courses);
  console.log(chalk.green(`CREATED: ${id} ${name} ${startDate}`));
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
  console.log(chalk.yellow(`DELETED: ${id} ${deleted.name}`));
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

  if (!course || !trainee) {
    return console.log(chalk.red('ERROR: Course or Trainee ID not found'));
  }

  // Validate enrollment: Check for duplicates, capacity, and trainee workload
  if (course.participants.includes(traineeID)) {
    return console.log(chalk.red('ERROR: Trainee already enrolled'));
  }
  if (course.participants.length >= 20) {
    return console.log(chalk.red('ERROR: Course capacity reached (20)'));
  }

  // Cross-reference: Count how many other courses this specific trainee is already in
  const enrollmentCount = courses.filter((c) =>
    c.participants.includes(traineeID)
  ).length;
  if (enrollmentCount >= 5) {
    return console.log(
      chalk.red('ERROR: Max enrollment limit reached (5 courses per trainee)')
    );
  }

  course.participants.push(traineeID);
  saveCourseData(courses);
  console.log(chalk.green(`${trainee.firstName} joined ${course.name}`));
}

function getAllCourses() {
  const courses = loadCourseData();

  // Create a copy to sort so we don't accidentally mutate the original data order in storage
  const sorted = [...courses].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  console.log(chalk.bold('Courses:'));
  sorted.forEach((c) => {
    const isFull = c.participants.length >= 20;
    const label = isFull ? chalk.red(' [FULL]') : '';
    console.log(
      `${c.id} ${c.name} (${c.startDate}) - Enrolled: ${c.participants.length}${label}`
    );
  });
  console.log(`\nTotal: ${courses.length}`);
}

// Main entry point for course logic; maps CLI sub-commands to functions
export function handleCourseCommand(subcommand, args) {
  switch (subcommand?.toUpperCase()) {
    case 'ADD':
      return addCourse(args);
    case 'DELETE':
      return deleteCourse(args);
    case 'JOIN':
      return joinCourse(args);
    case 'GETALL':
      return getAllCourses();
    default:
      console.log(
        chalk.red(`ERROR: Invalid sub-command "${subcommand}" for COURSE`)
      );
  }
}
