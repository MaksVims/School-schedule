import moment from "moment";

export function getDayDate(offset: number) {
  const startDayWeek = new Date(moment().startOf('isoWeek').toDate())

  // Если суббота или вск, то показываем даты на следующую неделю
  const todayDay = moment().toDate().getDay()
  let currentOffset = 0 + offset
  if(todayDay === 0 || todayDay === 6) {
    currentOffset = 7 + offset
  }

  const currentDate = new Date(startDayWeek.getFullYear(), startDayWeek.getMonth(), startDayWeek.getDate() + currentOffset)
  return Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'short'
  }).format(currentDate)
}