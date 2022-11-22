const { Router } = require('express')
const ClassController = require('../controllers/class')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')
const storageConfig = require('../helpers/storageConfig')

const route = new Router()

route.get('/', ClassController.getAll)
route.get('/updateData', ClassController.updateData)
route.post('/loadData', authMiddleware, multer({ storage: storageConfig }).single('file'), ClassController.loadData)

module.exports = route