import { routesClasses } from '../api/routesClasses'
import { axiosApp } from './axiosApp'

export class AuthService {

  static async login(login: string, password: string) {
    const response = await axiosApp.post<{ token: string }>(routesClasses.authenticate, { login, password })
    return response.data
  }

  static async checkAccess() {
    const response = await axiosApp.get<{ message: boolean }>(routesClasses.checkAccess)
    return response.data.message
  }
}