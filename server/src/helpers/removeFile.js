const fs = require('fs')
const path = require('path')

// Синхронное удаление файла 
function removeFile(filename) {
  fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', filename))
}

module.exports = removeFile