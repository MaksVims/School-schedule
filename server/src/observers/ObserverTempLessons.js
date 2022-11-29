const moment = require('moment')
const DateService = require('../service/DateService')
const ClassService = require('../service/ClassService')
const { eventsName } = require('../consts/literals')
const emitter = require('../emitter')

class ObserverTempLessons {
  constructor(ms) {
    this.errorDescription = 'Observer Temp Lessons: '
    this.observe(ms)
  }

  // получить прошедшие дни недели после последнего обновления временных уроков
  _getWeekDaysForRemove(dateUpdate, diff) {
    const weekDays = []
    for (let i = 0; i < diff; i++) {
      const weekDay = moment(dateUpdate).add(i, 'days').isoWeekday()
      weekDays.push(weekDay)
    }
    return [...new Set(weekDays)]
  }

  // изменить временный урок на обычный
  _removeTempLessonCallback(lesson) {
    lesson.isTemp = false
    lesson.tempName = ''
  }

  // изменить временные уроки на обычные по указанным дням недели
  async _removeTempLessons(weekDaysForRemove) {
    try {
      return await ClassService.updateDataEveryLesson(this._removeTempLessonCallback, weekDaysForRemove)
    } catch (e) {
      console.log(this.errorDescription + e.message);
    }
  }

  observe(ms) {
    setInterval(async () => {
      try {
        const dateLastUpdateDB = await DateService.getDate()
        if (dateLastUpdateDB) {
          const currentDate = moment()
          const dateLastUpdate = moment(dateLastUpdateDB.lastUpdate)

          // Разница между датами в днях
          const diffDatesInDay = currentDate.diff(dateLastUpdate, 'day')

          if (diffDatesInDay > 0) {
            const weekDaysForRemove = this._getWeekDaysForRemove(dateLastUpdate, diffDatesInDay)
            const updatedDataClasses = await this._removeTempLessons(weekDaysForRemove)
            await DateService.updateDate()
            emitter.emit(eventsName.updateData, updatedDataClasses)
          }
        }
      } catch (e) {
        console.log(this.errorDescription + e.message);
      }
    }, ms)
  }
}

module.exports = ObserverTempLessons