const { Router } = require('express')
const multer = require('multer')
const ClassController = require('../controllers/class')
const authMiddleware = require('../middleware/authMiddleware')
const storageConfig = require('../helpers/storageConfig')

const route = new Router()

route.get('/', ClassController.getAll)
route.get('/updateData', ClassController.updateData)
route.post('/loadData', multer({ storage: storageConfig }).single('file'), ClassController.loadData)
route.post('/loadTempData', multer({ storage: storageConfig }).single('file'), ClassController.loadTempData)

module.exports = route