const getCurrentClassDay = require('./getCurrentClassDay')

function addDiffLessons(courseChildren, classNumber, dayOfWeek, diffLessons) {
  const currentDay = getCurrentClassDay(courseChildren, classNumber, dayOfWeek)
  if (currentDay) {
    currentDay.lessons = [...currentDay.lessons, ...diffLessons].sort((a, b) => a.order - b.order)
  }
}

module.exports = addDiffLessons