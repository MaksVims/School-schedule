import { LearningClass } from '../types'

// Возвращает контент урока
export function getLesson(currentClass: LearningClass, dayOfWeek: number, order: number) {
  const scheduleDay = currentClass.schedule.find(item => item.dayOfWeek === dayOfWeek)

  if (scheduleDay) {
    const lesson = scheduleDay.lessons.find(item => item.order === order)
    
    if (lesson) {
      return lesson
    }
  }

  return null
}