export type FetchClasses = CourseClass[]

export interface CourseClass {
  _id: number,
  course: string,
  children: LearningClass[]
}

export interface LearningClass {
  id: number,
  number: string,
  schedule: DaySchedule[]
}

interface DaySchedule {
  _id: number,
  dayOfWeek: number,
  lessons: Lesson[]
}

interface Lesson {
  _id: number,
  name: string,
  kabinet: number,
  isTemp: boolean,
  order: number
}