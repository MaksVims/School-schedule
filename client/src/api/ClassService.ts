import { CourseClass } from "../types";
import { routesClasses } from './routesClasses'
import { axiosApp } from './axiosApp'

export class ClassService {

  static async getAll() {
    const response = await axiosApp.get<{ message: CourseClass[] }>(routesClasses.getAll)
    return response.data.message
  }

  static async loadSchedule(data: FormData) {
    const response = await axiosApp.post<{ message: string }>(routesClasses.loadData, data)
    return response.data
  }

  static async subscribeUpdateData() {
    const response = await axiosApp.get<{ message: CourseClass[] }>(routesClasses.updateData)
    return response.data.message
  }
}