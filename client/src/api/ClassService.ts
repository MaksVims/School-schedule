import axios from "axios";
import { CourseClass } from "../types";
import { routesClasses } from './routesClasses'

export class ClassService {

  static async getAll() {
    const response = await axios.get<{ message: CourseClass[] }>(routesClasses.getAll)
    return response.data.message
  }

  static async loadSchedule(data: FormData) {
    const response = await axios.post<{message: string}>(routesClasses.loadData, data)
    return response.data
  }

  static async subscribeUpdateData() {
    const response = await axios.get<{message: CourseClass[]}>(routesClasses.updateData)
    return response.data.message
  }
}