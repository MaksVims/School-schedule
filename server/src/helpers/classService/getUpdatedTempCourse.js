const findLesson = require('./findLesson')
const addDiffLessons = require('./addDiffLessons')
const getCurrentClassDay = require('../classService/getCurrentClassDay')
const removeLessons = require('../classService/removeLessons')

// Обновление путем сравнения текущего расписания в базе и загруженного временного
function getUpdatedTempCourse({ children: tempChildren }, parent) {
  tempChildren.forEach(learnClass => {
    learnClass.schedule.forEach(learnClassDay => {
      const diffLessons = []
      const lessonsForRemoved = []
      
      const mainClassDay = getCurrentClassDay(parent.children, learnClass.number, learnClassDay.dayOfWeek)

      // Перебор всех уроков конкретного дня и сравнение их с уроками из файла временного расписания
      // Если конкретного урока не найдено и name === '' => удаление урока из массива lessons
      // Необходимо для удаления ненужных уроков, которых нет в обновленном расписании
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

      // Перебор всех обновленных уроков с основными, для их изменения на временные если parent.name !== children.tempName
      // и добавление новых временных уроков в массив lessons
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