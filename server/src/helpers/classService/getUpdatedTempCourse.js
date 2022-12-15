const findLesson = require('./findLesson')
const addDiffLessons = require('./addDiffLessons')
const getCurrentClassDay = require('../classService/getCurrentClassDay')
const removeLessons = require('../classService/removeLessons')

function getUpdatedTempCourse({ children: tempChildren }, parent) {
  tempChildren.forEach(learnClass => {
    learnClass.schedule.forEach(learnClassDay => {
      const diffLessons = []
      const lessonsForRemoved = []

      const mainClassDay = getCurrentClassDay(parent.children, learnClass.number, learnClassDay.dayOfWeek)

      mainClassDay.lessons.forEach((lesson, idx) => {
        if (lesson.name === '') {
          const tempLesson = findLesson(tempChildren, learnClass.number, learnClassDay.dayOfWeek, lesson.order)
          if (!tempLesson) {
            lessonsForRemoved.push({ order: idx })
          }
        }
      })
      if(lessonsForRemoved.length) {
        removeLessons(mainClassDay, lessonsForRemoved)
      }

      learnClassDay.lessons.forEach(tempLesson => {
        const lesson = findLesson(parent.children, learnClass.number, learnClassDay.dayOfWeek, tempLesson.order)
        if (!lesson) {
          diffLessons.push(tempLesson)
          return
        }

        if (lesson && tempLesson.tempName !== lesson?.name) {
          lesson.isTemp = true
          lesson.tempName = tempLesson.tempName
        } else if (lesson && tempLesson.tempName === lesson.name) {
          lesson.isTemp = false
          lesson.tempName = ''
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