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
module.exports = { Class }
