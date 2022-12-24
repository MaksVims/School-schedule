const ClassService = require('../service/ClassService')
const DateService = require('../service/DateService')
const emitter = require('../emitter')
const { eventsName } = require('../consts/literals')
const fileMainSchedule = require('../temp/fileMainSchedule')
const parseExcelFile = require('../helpers/parseExcelFile')
const removeFile = require('../helpers/removeFile')
const formatData = require('../helpers/formatData')
const getUpdatedTempCourse = require('../helpers/classService/getUpdatedTempCourse')
const getCourse = require('../helpers/classService/getCourse')

class ClassController {
  static async getAll(req, res) {
    try {
      let allClasses = await ClassService.getAll()
      res.status(200).json({ message: allClasses })
    } catch (e) {
      console.log(`ClassController: ${e}`);
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  }

  static async loadData(req, res) {
    try {
      // Удаляем старый файл
      if (fileMainSchedule.filename) {
        removeFile(fileMainSchedule.filename)
      }
      fileMainSchedule.filename = req.file.filename

      // Парсинг и форматирование данных из полученного файла
      const shuffleData = await parseExcelFile(fileMainSchedule.filename, false)
      const result = formatData(shuffleData)

      // Очистка backup db от старых данных
      await ClassService.cleanClassesProtector()

      // Создание моделей из во protector db, если ошибок не будет, обновится main db
      await ClassService.checkClassDataProtector(result)

      //Удаляем дату последнего обновления
      await DateService.removeDate()

      // Очистка main db от старых данных
      await ClassService.cleanClassesMain()

      // Создание моделей в main db
      const allClasses = await Promise.all(result.map(async ({ course, children }) => {
        return await ClassService.createCourse(course, children)
      }))

      // вызываем emit события для обновления данных на всех подключенных клиентах
      // let allClasses = await ClassService.getAll()
      emitter.emit(eventsName.updateData, allClasses)

      res.status(200).json({ message: 'Успешно!' })
    } catch (e) {
      console.log(`ClassController: ${e}`);
      res.status(500).json({ message: 'Ошибка при загрузке файла' })
    }
  }

  static async loadTempData(req, res) {
    try {
      // чтение и форматирование данных из temp файла
      const shuffleTempData = await parseExcelFile(req.file.filename, true)
      const resultTemp = formatData(shuffleTempData)

      // чтение и форматирование данных из основного файла расписания
      // const shuffleMainData = await parseExcelFile(fileMainSchedule.filename, false)
      // const result = formatData(shuffleMainData)

      const mainData = await ClassService.getAll()

      // сравнение и аккумулирование данных двух файлов
      const updatedCourses = resultTemp.map(tempCourse => {
        return getUpdatedTempCourse(tempCourse, getCourse(mainData, tempCourse.course))
      })

      // Очистка backup db от старых данных
      await ClassService.cleanClassesProtector()

      // Создание моделей из во protector db, если ошибок не будет, обновится main db
      await ClassService.checkClassDataProtector(updatedCourses)

       //Обновить дату последнего обновления временного расписания
      let dateLastUpdate = await DateService.getDateLastUpdate()

      if(!dateLastUpdate) {
        dateLastUpdate = await DateService.createDate()
      }
      dateLastUpdate = await DateService.updateDate()

      // Очистка main db от старых данных
      // await ClassService.cleanClassesMain()

      // Создание моделей в main db
      await Promise.all(updatedCourses.map(async (course) => {
        return await course.save()
      }))

      const allCourses = await ClassService.getAll()

      // let allClasses = await ClassService.getAll()
      emitter.emit(eventsName.updateData, allCourses)
      emitter.emit(eventsName.updateDateLastUpdate, dateLastUpdate)

      res.status(200).json({ message: 'Успешно!' })
    } catch (e) {
      console.log(`ClassController: ${e}`);
      res.status(500).json({ message: 'Ошибка при загрузке файла с временными данными' })
    } finally {
      removeFile(req.file.filename)
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