const emitter = require('../emitter')
const { eventsName } = require('../consts/literals')
const ClassService = require('../service/ClassService')
const DateService = require('../service/DateService')

function observerResetEmitterListeners(ms) {

  setInterval(async () => {
    try {
      const allCourses = await ClassService.getAll()
      const dateLastUpdate = await DateService.getDateLastUpdate()

      emitter.eventNames().forEach(name => {
        switch (name) {
          case eventsName.updateData: {
            emitter.listeners(name).forEach(l => l(allCourses))
            break;
          }

          case eventsName.updateDateLastUpdate: {
            emitter.listeners(name).forEach(l => l(dateLastUpdate))
            break;
          }
        }
      })

      emitter.removeAllListeners()
    } catch (e) {
      console.log(e.message);
    }
  }, ms);
}

module.exports = observerResetEmitterListeners