const findLesson = require('./findLesson')
const addDiffLessons = require('./addDiffLessons')

function getUpdatedTempCourse({ children: tempChildren }, parent) {
  tempChildren.forEach(learnClass => {
    learnClass.schedule.forEach(learnClassDay => {
      const diffLessons = []
      learnClassDay.lessons.forEach(tempLesson => {
        const lesson = findLesson(parent.children, learnClass.number, learnClassDay.dayOfWeek, tempLesson.order)
        if (!lesson) {
          if (tempLesson.tempName === '') {
            tempLesson.isTemp = false
          }
          diffLessons.push(tempLesson)
          return
        }

        if (lesson && tempLesson.tempName !== lesson?.name) {
          lesson.isTemp = true
          lesson.tempName = tempLesson.tempName
        }
      })
      if (diffLessons.length) {
        addDiffLessons(parent.children, learnClass.number, learnClassDay.dayOfWeek, diffLessons)
      }
    })
  })
  return parent
}

module.exports = getUpdatedTempCourse