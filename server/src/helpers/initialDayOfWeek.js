const ClassService = require('../models/Class')

const initialDayOfWeek = (schedule) => {
  let dayOfWeek = 0
  while (dayOfWeek <= 6) {
    schedule.push({
      dayOfWeek,
      lessons: []
    })
    dayOfWeek++
  }
  return schedule
}

module.exports = initialDayOfWeek
