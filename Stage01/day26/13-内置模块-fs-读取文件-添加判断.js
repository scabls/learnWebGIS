// 导入fs
const fs = require('fs')
// 调用readFile()方法
fs.readFile('./file/12.txt', 'utf-8', (err, data) => {
  if (err) console.log('读取文件失败：' + err)
  else console.log('读取到的数据：' + data)
})
