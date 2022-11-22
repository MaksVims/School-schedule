const multer = require('multer')

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, 'schedule.xlsx')
  }
})

module.exports = storageConfig