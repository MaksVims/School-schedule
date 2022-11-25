
function getCurrentClassDay(courseChildren, classNumber, dayOfWeek) {
  const currentClass = courseChildren.find(cl => cl.number === classNumber)
  if (currentClass) {
    return currentClass.schedule.find(sch => sch.dayOfWeek === dayOfWeek)
  }
  return null
}

module.exports = getCurrentClassDay