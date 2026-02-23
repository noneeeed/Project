import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/Courses.json';

export function loadTraineeData() {
  try {
    const traineeData = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
    return JSON.parse(traineeData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('trainees.json not found. Creating an empty array.');
      return [];
    } else {
      console.log('Error reading trainees.json:', error.message);
      return [];
    }
  }
}

export function saveTraineeData(trainees) {
  try {
    const traineesArray = JSON.stringify(trainees, null, 2);
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH, traineesArray, 'utf8');
  } catch (error) {
    console.log('Error saving trainees.json:', error.message);
  }
}

export function loadCourseData() {
  try {
    const courseData = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');
    return JSON.parse(courseData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('courses.json not found. Creating an empty array.');
      return [];
    } else {
      console.log('Error reading courses.json:', error.message);
      return [];
    }
  }
}

export function saveCourseData(courses) {
  try {
    const coursesArray = JSON.stringify(courses, null, 2);
    fs.writeFileSync(COURSE_DATA_FILE_PATH, coursesArray, 'utf8');
  } catch (error) {
    console.log('Error saving courses.json:', error.message);
  }
}
