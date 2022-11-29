const { Schema } = require('mongoose')

const dateSchema = new Schema({
  lastUpdate: {
    type: Number,
    required: true,
    unique: true,
  }
})

module.exports = dateSchema