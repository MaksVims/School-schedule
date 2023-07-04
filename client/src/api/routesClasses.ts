import { SERVER_IP } from "../consts"

export const routesClasses = {
  getAll: `http://${SERVER_IP}/api/class`,
  authenticate: `http://${SERVER_IP}/api/auth/login`,
  checkAccess: `http://${SERVER_IP}/api/auth/checkAccess`,
  loadData: `http://${SERVER_IP}/api/class/loadData`,
  loadTempData: `http://${SERVER_IP}/api/class/loadTempData`,
  updateData: `http://${SERVER_IP}/api/class/updateData`,
  dateLastUpdate: `http://${SERVER_IP}/api/date/dateLastUpdate`,
  updateDateLastUpdate: `http://${SERVER_IP}/api/date/updateDateLastUpdate`
}