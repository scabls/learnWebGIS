const { Book } = require('../models/Book')
async function addBook(bookObj) {
  const res = await Book.create(bookObj)
  return res.toJSON()
}
async function updateBook(id, bookObj) {
  const res = await Book.update(bookObj, {
    where: {
      id,
    },
  })
  return res
}
async function deleteBook(id) {
  const res = await Book.destroy({
    where: {
      id,
    },
  })
  return res
}
module.exports = { addBook, updateBook, deleteBook }
