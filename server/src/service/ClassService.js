const { classModelMainDB, classModelDataProtectorDB } = require('../connections')

class ClassService {

  // Получение всех курсов
  static async getAll() {
    return await classModelMainDB.find({})
  }

  // Удаление class модели из main db
  static async cleanClassesMain() {
    console.log('Clean main base');
    return await classModelMainDB.deleteMany({})
  }

  // Удаление class модели из data protector db
  static async cleanClassesProtector() {
    console.log('Clean backup base');
    return await classModelDataProtectorDB.deleteMany({})
  }

  // Создание курса
  static async createCourse(course, children) {
    const newCourse = new classModelMainDB({ course, children })
    await newCourse.save()
    console.log('create main Course');
    return newCourse
  }

  // Получение указанного курса
  static async getOne(course) {
    return await classModelMainDB.findOne({ course })
  }

  // сохранение переданных данных в protector DB
  static async checkClassDataProtector(result) {
    return await Promise.all(result.map(async ({ course, children }) => {
      const newCourse = new classModelDataProtectorDB({ course, children })
      await newCourse.save()
      console.log('Create data protector course');
      return newCourse
    }))
  }

  // обновление всех уроков по указанным дням weekDays
  static async updateDataEveryLesson(callback, weekDays) {
    const allClasses = await ClassService.getAll()

    allClasses.forEach(course => {
      course.children.forEach(learnClass => {
        learnClass.schedule.forEach(({ dayOfWeek, lessons }) => {
          if (weekDays.includes(dayOfWeek)) {
            lessons.forEach(callback)
          }
        })
      })
    })

    return await Promise.all(allClasses.map(async (course) => {
      return await course.save()
    }))
  }

}

module.exports = ClassService