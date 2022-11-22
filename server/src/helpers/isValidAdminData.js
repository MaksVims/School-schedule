const config = require('config')

const isValidAdminData = (login, password) => {
  return login === config.get('LOGIN') && password === config.get('PASSWORD')
}

module.exports = isValidAdminData