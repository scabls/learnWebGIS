const { now } = require('./15-时间模块')
const time = now()
const fs = require('fs')
fs.writeFile('./file/16.txt', time, 'utf-8', err => {
  if (err) return console.log('写入失败：' + err)
  console.log(time + ' 写入成功')
})
