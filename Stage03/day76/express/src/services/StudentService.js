const { Op } = require('sequelize')
const Student = require('../models/Student')

const addStudent = async studentObj => {
  const res = await Student.create(studentObj)
  return res.toJSON()
}
const updateStudent = async (id, studentObj) => {
  const res = await Student.update(studentObj, {
    where: {
      id,
    },
  })
  return res
}
const deleteStudent = async id => {
  const res = await Student.destroy({
    where: {
      id,
    },
  })
  return res
}
// 通过主键id查找学生
const getStudentById = async id => {
  const res = await Student.findByPk(id)
  return res.toJSON()
}
// 通过姓名或性别查找学生
const getStudent = async (name, gender, limit = 10, page = 1) => {
  const where = {}
  if (name)
    where.studentName = {
      [Op.like]: `%${name}%`,
    }
  if (gender !== undefined) where.isMale = !!gender //双非运算符，转换为布尔值
  const { count, rows: result } = await Student.findAndCountAll({
    attributes: ['id', 'studentName', 'birthday', 'isMale', 'phoneNumber'],
    where,
    limit,
    offset: (page - 1) * limit,
  })
  console.log(count)
  console.log(JSON.parse(JSON.stringify(result)))
}
getStudent('英', 1, 10, 1)
module.exports = { addStudent, updateStudent, deleteStudent, getStudentById, getStudent }
