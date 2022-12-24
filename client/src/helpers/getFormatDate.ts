
export const getFormatDate = (date: Date) => {
  return Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}