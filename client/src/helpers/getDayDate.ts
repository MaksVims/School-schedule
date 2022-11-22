import moment from "moment";

export function getDayDate(offset: number) {
  const startDayWeek = new Date(moment().startOf('isoWeek').toDate())
  const currentDate = new Date(startDayWeek.getFullYear(), startDayWeek.getMonth(), startDayWeek.getDate() + offset)
  return Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'short'
  }).format(currentDate)
}