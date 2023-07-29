const { Router } = require('express')
const AuthController = require('../controllers/auth')
const authMiddleware = require('../middleware/authMiddleware')

const route = new Router()

route.post('/checkAccess', authMiddleware, AuthController.checkAccess)
route.post('/login', AuthController.login)

module.exports = route