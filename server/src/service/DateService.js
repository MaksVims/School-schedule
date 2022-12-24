const { dateUpdateDB } = require('../connections')

class DateService {

  static async createDate() {
    const newDate = new dateUpdateDB({
      lastUpdate: Number(new Date())
    })
    await newDate.save()
    return newDate
  }

  static async getDateLastUpdate() {
    const date = await dateUpdateDB.findOne({})
    return date
  }
  
  static async updateDate() {
    const lastDateUpdate = await dateUpdateDB.findOne({})
    lastDateUpdate.lastUpdate = Number(new Date())
    await lastDateUpdate.save()
    return lastDateUpdate
  }

  static async removeDate() {
    await dateUpdateDB.deleteMany({})
  }
}

module.exports = DateService