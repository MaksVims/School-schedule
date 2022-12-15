
function removeLessons(classDay, rmvLessons) {
  rmvLessons.forEach(removeLesson => {
    classDay.lessons.splice(removeLesson.order, 1)
  })
}

module.exports = removeLessons