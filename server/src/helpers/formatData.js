
function formatData(shuffleData) {
  const courses = [...new Set(shuffleData.map(el => el.course))]

  return courses.map(courseNumber => {
    const children = shuffleData.filter(el => el.course === courseNumber).map(el => ({
      number: el.number,
      schedule: el.schedule
    }))
  
    return {
      course: courseNumber,
      children,
    }
  })
}

module.exports = formatData