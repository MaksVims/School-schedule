const express = require('express')
const config = require('config')
const cookieParser = require('cookie-parser')
const corsMiddleware = require('./middleware/corsMiddleware')
const initFilenameSchedule = require('./helpers/initFilenameSchedule')

const app = express()

app.use(cookieParser('cookie'))
app.use(express.static(__dirname))
app.use(express.json({ extends: true }))

app.use('*', corsMiddleware)
app.use('/api/class', require('./routes/class'))
app.use('/auth', require('./routes/auth'))

const PORT = config.get('PORT') || 5000

async function start() {
  try {
    require('./connections')
    await initFilenameSchedule()
    app.listen(PORT, () => console.log(`Server run, port: ${PORT}`))
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

start()