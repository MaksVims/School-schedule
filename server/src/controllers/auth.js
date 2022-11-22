const config = require('config')
const jwt = require('jsonwebtoken')
const isValidAdminData = require('../helpers/isValidAdminData')

class AuthController {

  static async login(req, res) {
    try {
      const { login, password } = req.body

      if (!isValidAdminData(login, password)) {
        return res.status(403).json({ message: 'Ошибка авторизации' })
      }

      const token = jwt.sign(
        { login, password },
        config.get('SECRET_JWT'),
        { expiresIn: '1h' }
      )
      res.cookie('token', token, {
        maxAge: 3600 * 24 * 1000,
        httpOnly: true
      })

      res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  }

  static async checkAccess(req, res) {
    try {
      res.status(200).json({ message: true })
    } catch (e) {
      return res.status(403).json({ message: 'Осутствует авторизация или время сессии истекло' })
    }
  }
}

module.exports = AuthController