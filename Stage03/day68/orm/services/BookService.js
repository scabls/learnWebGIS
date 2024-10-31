const { Book } = require('../models/Book')
const addBook = async bookObj => {
  const res = await Book.create(bookObj)
  return res.toJSON()
}
const updateBook = async (id, bookObj) => {
  const res = await Book.update(bookObj, {
    where: {
      id,
    },
  })
  return res
}
const deleteBook = async id => {
  const res = await Book.destroy({
    where: {
      id,
    },
  })
  return res
}
module.exports = { addBook, updateBook, deleteBook }
