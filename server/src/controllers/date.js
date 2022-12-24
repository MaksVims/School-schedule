const DateService = require('../service/DateService')
const emitter = require('../emitter')
const { eventsName } = require('../consts/literals')

class DateController {

  static async getDateLastUpdate(req, res) {
    try {
      const date = await DateService.getDateLastUpdate()

      res.status(200).json({ message: date })
    } catch (e) {
      console.log(`DateController: ${e}`)
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  }

  static async updateDateLastUpdate(req, res) {
    try {
      emitter.once(eventsName.updateDateLastUpdate, updatedDate => {
        res.status(200).json({ message: updatedDate })
      })
    }
    catch (e) {
      console.log(`DateController: ${e}`)
      res.status(400).json({ message: 'Ошибка запроса' })
    }
  }
}

module.exports = DateController