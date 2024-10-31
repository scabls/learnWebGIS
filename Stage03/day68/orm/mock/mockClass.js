const Mock = require('mockjs')
const { Class } = require('../models/Class')

const data = Mock.mock({
  'class|8': [
    {
      'id|+1': 1,
      className: 'xzd第240@id()期',
      classStartTime: '@date("2024-MM-dd")',
    },
  ],
})
console.log(data.class)
Class.bulkCreate(data.class)
