const { mock } = require('mockjs')
const { Student } = require('../models/Student')

const { student } = mock({
  'student|20-30': [
    {
      studentName: '@cname',
      birthday: '@date()',
      'isMale|1': true,
      phoneNumber: /^1[34578]\d{9}$/,
      'classId|1-8': 1,
    },
  ],
})
console.log(student)
Student.bulkCreate(student)
