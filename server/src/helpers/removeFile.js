const fs = require('fs')
const path = require('path')

// Синхронное удаление файла 
function removeFile(file) {
  fs.unlinkSync(path.resolve(__dirname, '..', '..', file.destination, file.filename))
}

module.exports = removeFile