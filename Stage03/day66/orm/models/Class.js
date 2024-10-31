const { DataTypes } = require('sequelize')
const { sequelize } = require('./db')
const { Student } = require('./Student')
const Class = sequelize.define(
  'class',
  {
    className: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    classStartTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
)
// 设置班级和学生的关系
Class.hasMany(Student)
module.exports = { Class }
