const fs = require('fs')
fs.readFile('./file/成绩.txt', 'utf-8', (err, data) => {
  if (err) return console.log(err)
  const dataArr = data.split(' ')
  const treatedData = dataArr
    .sort((a, b) => b.slice(3) - a.slice(3))
    .map((item, index) => `${index + 1}  ${item.replace('=', ': ')}`)
    .join('\r')
  fs.writeFile('./file/成绩-OK.txt', treatedData, 'utf-8', err => {
    if (err) return console.log('写入错误')
    console.log('数据写入成功')
  })
})
