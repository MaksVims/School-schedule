import moment from "moment";
import { TIME_LESSON } from '../consts/time_lesson'

// Возвращает номер текущего урока
export function getCurrentOrderLesson(date: Date) {
  let order = 0
  let count = 0

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // Перебор массива с временем уроков, номером урока является позиция в массиве
  while (count < TIME_LESSON.length) {
    // Определяем даты начала урока и конца
    const start = new Date(year, month, day, +TIME_LESSON[count].start.hour, +TIME_LESSON[count].start.min)
    const end = new Date(year, month, day, +TIME_LESSON[count].end.hour, +TIME_LESSON[count].end.min)

    // Проверяем находиться ли текущее время в интервале между началом или концом урока
    if (moment(date).isBetween(start, end)) {
      order = count + 1
      break
    }
    count++
  }

  return order
} 