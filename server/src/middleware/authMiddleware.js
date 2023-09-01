const jwt = require('jsonwebtoken')
const config = require('config')
const isValidAdminData = require('../helpers/isValidAdminData')

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const { token } = req.body

    if (!token) {
      return res.status(403).json({ message: 'Вы не можете осуществить данную операцию,вы не являетесь администратором' })
    }

    const { login, password } = jwt.verify(token, config.get('SECRET_JWT'))

    if (!isValidAdminData(login, password)) {
      return res.status(403).json({ message: 'Вы не можете осуществить данную операцию,вы не являетесь администратором' })
    }

    next()
  } catch (e) {
    res.status(403).json({ message: 'Вы не можете осуществить данную операцию, вы не являетесь администратором' })
  }
}

module.exports = authMiddleware