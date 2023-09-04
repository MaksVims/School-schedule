import { routesClasses } from '../api/routesClasses'
import { axiosApp } from './axiosApp'
import { DateLastUpdate } from '../types'
import { TIMEOUT_FETCH } from '../consts'

export class DateService {

  static async getLastUpdateDate() {
    const response = await axiosApp.get<{ message: DateLastUpdate }>(routesClasses.dateLastUpdate)
    return response.data.message
  }

  static async subscribeLastUpdateDate() {
    const response = await axiosApp.get<{ message: DateLastUpdate }>(routesClasses.updateDateLastUpdate, {timeout: TIMEOUT_FETCH})
    return response.data.message
  }
}