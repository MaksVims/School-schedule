const { Schema } = require('mongoose')

const classSchema = new Schema({
  course: { type: Number, required: true, unique: true },
  children: [
    {
      number: { type: String, required: true },
      schedule: [
        {
          dayOfWeek: { type: Number, required: true },
          lessons: [
            {
              name: { type: String },
              // kabinet: { type: Number, required: true },
              isTemp: { type: Boolean, default: false },
              order: { type: Number, required: true }
            }
          ]
        }
      ]
    }
  ]
})

module.exports = classSchema

