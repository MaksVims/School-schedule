const path = require('path')
const xlsxFile = require('read-excel-file/node')

async function parseExcelFile(file) {
  const pathExcelFile = path.resolve(__dirname, '..', '..', file.destination, file.filename)

  // Получаем список таблиц
  const sheets = await xlsxFile.readSheetNames(pathExcelFile)
  
  // Перебирая список таблиц наполяем обьект result [{course, number, schedule}]
  const result = sheets.map(async (sheetName) => {
    const [course, number] = String(sheetName).split('-')

    // Данные таблицы класса
    const sheet = await xlsxFile(pathExcelFile, { sheet: sheetName })
    
    // Расписание конкретного класса - 7 дней
    const schedule = new Array(7).fill(null).map((day, dayOfWeek) => ({
      dayOfWeek: dayOfWeek + 1,
      lessons: []
    }))
    
    sheet.slice(1).forEach((rows) => {
      const order = Number(rows[0])
      rows.slice(2).forEach((lesson, dayOfWeek) => {
        const scheduleDay = schedule.find(day => day.dayOfWeek === dayOfWeek + 1)
        scheduleDay.lessons.push({
          name: lesson || '',
          order,
          isTemp: false
        })
      })
    })
    return { course, number, schedule }
  })
  return Promise.all(result)
}

module.exports = parseExcelFile