
function getCourse(courses, numberCourse) {
  return courses.find(el => el.course === numberCourse)
}

module.exports = getCourse