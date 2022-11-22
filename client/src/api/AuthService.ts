import axios from "axios";
import { routesClasses } from '../api/routesClasses'

export class AuthService {

  static async login(login: string, password: string) {
    const response = await axios.post<{ token: string }>(routesClasses.authenticate, { login, password })
    return response.data
  }

  static async checkAccess() {
    axios.defaults.withCredentials = true
    const response = await axios.get<{ message: boolean }>(routesClasses.checkAccess)
    return response.data.message
  }
}