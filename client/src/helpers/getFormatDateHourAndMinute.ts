
export const getFormatDateHourAndMinute = (date: Date) => {
    return Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }