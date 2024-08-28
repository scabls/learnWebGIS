// 导入fs
const fs = require('fs')
// 调用writeFile()方法
// 如果文件不存在，会先创建文件
fs.writeFile('./file/14.txt', '我很好', 'utf-8', err => {
  //根据err的值进行判断
  if (err) return console.log('写入失败：' + err)
  console.log('写入成功')
})
