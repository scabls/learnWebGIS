const { DataTypes } = require('sequelize')
const { sequelize } = require('./db')
const Student = sequelize.define(
  'student',
  {
    studentName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    // 创建作为外键的列
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
)
module.exports = { Student }
