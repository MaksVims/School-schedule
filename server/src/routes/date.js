const { Router } = require('express')
const DateController = require('../controllers/date')

const route = new Router()

route.get('/dateLastUpdate', DateController.getDateLastUpdate)
route.get('/updateDateLastUpdate', DateController.updateDateLastUpdate)

module.exports = route