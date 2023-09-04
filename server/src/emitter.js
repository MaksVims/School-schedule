const events = require('events')
const emitter = new events.EventEmitter()

emitter.setMaxListeners(0)

module.exports = emitter