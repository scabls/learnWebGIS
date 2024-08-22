// 导入fs
const fs = require('fs')
// 调用readFile()方法
fs.readFile('./file/12.txt', 'utf-8', (err, data) => {
  console.log(err) // null表示代码没有异常，如果有异常，err有指
  console.log(data) // data表示读到的数据
})
