// 导入安装好的包
const moment = require('moment')
// 获取当前时间
console.log(moment())
console.log(moment().format())

console.log(moment().format('YYYY-MM-DD'))
console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
console.log(moment().format('YYYY年MM月DD日 HH时mm分ss秒'))

console.log('周' + moment().weekday())
