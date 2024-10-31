const { Student } = require('./Student')
const { Class } = require('./Class')
Class.hasMany(Student)
Student.belongsTo(Class, {
  // 指定关联外键
  foreignKey: 'classId',
})
