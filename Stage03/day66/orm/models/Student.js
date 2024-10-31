const { DataTypes } = require('sequelize')
const { sequelize } = require('./db')
const Student = sequelize.define(
  'student',
  {
    studentName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    studentAge: {
      type: DataTypes.INTEGER,
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
  },
  {
    paranoid: true,
  }
)
module.exports = { Student }
