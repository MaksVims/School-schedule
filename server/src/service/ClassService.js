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

  // Получение переданного курса
  static async getOne(course) {
    return await classModelMainDB.findOne({ course })
  }

  // Создание класса по переданным данным
  static async createClass(course, number, schedule) {
    let parent = await ClassService.getOne(course)
    parent.children.push({ number, schedule })
    await parent.save()
    return parent
  }

  static async checkClassDataProtector(result) {
    return await Promise.all(result.map(async ({ course, children }) => {
      const newCourse = new classModelDataProtectorDB({ course, children })
      await newCourse.save()
      console.log('Create data protector course');
      return newCourse
    }))
  }
}

module.exports = ClassService