require('./models/sync.js')

const {
  addAdmin,
  updateAdmin,
  deleteAdmin,
  addBook,
  updateBook,
  deleteBook,
  addClass,
  updateClass,
  deleteClass,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('./services')

// addAdmin({
//   loginId: 'admin12',
//   loginPwd: 'admin12',
// })
// updateAdmin(10, {
//   loginPwd: 'admin123',
// })
// deleteAdmin(10)

// addBook({
//   bookName: 'test',
//   imgurl: 'test',
//   author: 'test',
//   publishDate: '2022-01-01',
// })
// updateBook(1, {
//   bookName: 'test3',
// })
// deleteBook(1)

// addClass({
//   className: 'test',
//   classStartTime: '2022-01-01',
// })
// updateClass(2, {
//   className: 'test2',
// })
// deleteClass(2)

// addStudent({
//   studentName: 'test',
//   studentAge: 20,
//   isMale: true,
//   phoneNumber: '12345678901',
// })
// updateStudent(1, {
//   isMale: false,
// })
// deleteStudent(1)
