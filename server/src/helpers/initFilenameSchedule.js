const fs = require('fs');
const path = require('path')
const util = require('util');
const readdir = util.promisify(fs.readdir);
const fileMainSchedule = require('../temp/fileMainSchedule')

const initFilenameSchedule = async () => {
  try {
    const dir = path.resolve(__dirname, '..', '..', 'uploads')
    const files = await readdir(dir)
    fileMainSchedule.filename = files[0]
  } catch (e) {
    new Error('Нет файла основного расписания')
  }
}

module.exports = initFilenameSchedule