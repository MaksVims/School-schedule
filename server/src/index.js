const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))

app.use(cookieParser('cookie'))
app.use(express.static(__dirname))
app.use(express.json({ extends: true }))

app.use('/api/class', require('./routes/class'))
app.use('/auth', require('./routes/auth'))

const PORT = config.get('PORT') || 5000

async function start() {
  try {
    require('./connections')

    app.listen(PORT, () => console.log(`Server run, port: ${PORT}`))
  } catch (e) {
    console.log(e);
    process.exit(1)
  }
}

start()