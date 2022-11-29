const mongoose = require('mongoose')
const config = require('config')

// Основное подключение
const mainConnect = mongoose.createConnection(config.get('MONGO_URL_MAIN'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Main db connect'))

const classModelMainDB = mainConnect.model('Class', require('./models/Class'))


// Подключение для тестирования переданных данных
const dataProtectorConnect = mongoose.createConnection(config.get('MONGO_URL_DATA_PROTECTOR'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Data protector db connect'))

const classModelDataProtectorDB = dataProtectorConnect.model('Class', require('./models/Class'))


// Подключение с date DB
// В date храним дату последней загрузки временного расписания
const dateConnect = mongoose.createConnection(config.get('MONGO_DATE'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('Date db connect'))

const dateUpdateDB = dateConnect.model('DateUpdate', require('./models/DateUpdate'))

module.exports = { classModelMainDB, classModelDataProtectorDB, dateUpdateDB }