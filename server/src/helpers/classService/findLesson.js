const getCurrentClassDay = require('./getCurrentClassDay')

function findLesson(courseChildren, classNumber, dayOfWeek, order) {
  const currentDay = getCurrentClassDay(courseChildren, classNumber, dayOfWeek)
  if (currentDay) {
    return currentDay.lessons.find(lesson => lesson.order === order)
  }
}

module.exports = findLesson