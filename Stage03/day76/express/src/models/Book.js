const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Book = sequelize.define(
  'book',
  {
    bookName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imgurl: {
      type: DataTypes.STRING(100),
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
)
module.exports = Book
