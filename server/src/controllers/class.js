const ClassService = require('../service/ClassService')
const parseExcelFile = require('../helpers/parseExcelFile')
const removeFile = require('../helpers/removeFile')
const formatData = require('../helpers/formatData')
const emitter = require('../emitter')
const { eventsName } = require('../consts/literals')

class ClassController {

  static async getAll(req, res) {
    try {
      let allClasses = await ClassService.getAll()
      res.status(200).json({ message: allClasses })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  }

  static async loadData(req, res) {
    try {
      // Парсинг данных из файла
      const shuffleData = await parseExcelFile(req.file)

      // Форматирование данных
      const result = formatData(shuffleData)

      // Очистка backup db от старых данных
      await ClassService.cleanClassesProtector()

      // Создаем модели из переданных данных во вторичной db, если ошибок не будет, обновится main db
      await ClassService.checkClassDataProtector(result)

      // Очистка main db от старых данных
      await ClassService.cleanClassesMain()

      // Передаем данные в базу
      await Promise.all(result.map(async ({ course, children }) => {
        return await ClassService.createCourse(course, children)
      }))

      // Удаляем загруженный файл
      removeFile(req.file)

      // вызываем emit события для обновления данных на всех подключенных клиентах
      let allClasses = await ClassService.getAll()
      emitter.emit(eventsName.updateData, allClasses)

      res.status(200).json({ message: 'Успешно!' })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Ошибка при загрузке файла' })
    }
  }

  // создаем одноразовый обработчик события для обновления данных
  static async updateData(req, res) {
    try {
      emitter.once(eventsName.updateData, updatedData => {
        res.status(200).json({ message: updatedData })
      })
    }
    catch (e) {
      res.status(400).json({ message: 'Ошибка запроса' })
    }
  }
}

module.exports = ClassController