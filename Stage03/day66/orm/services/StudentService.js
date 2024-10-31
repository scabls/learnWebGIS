const { Student } = require('../models/Student')
async function addStudent(studentObj) {
  const res = await Student.create(studentObj)
  return res.toJSON()
}
async function updateStudent(id, studentObj) {
  const res = Student.update(studentObj, {
    where: {
      id,
    },
  })
  return res
}
async function deleteStudent(id) {
  const res = Student.destroy({
    where: {
      id,
    },
  })
  return res
}
module.exports = { addStudent, updateStudent, deleteStudent }
