/* node提供了一些获取文件路径的简单写法（不需要通过path模块） */
// 获取当前文件所在的路径
console.log('绝对路径：' + __filename) //绝对路径：D:\Documents\WebGIS\New Zondy - 2405\00_Mine\day26\17-内置模块-path-使用.js

// 获取当前文件所在的目录
console.log('所在目录：' + __dirname) // 所在目录：D:\Documents\WebGIS\New Zondy - 2405\00_Mine\day26

/* 导入path模块 */
const path = require('path')

//path.dirname(path) //返回路径中代表文件夹的部分
console.log('所在目录：' + path.dirname(__filename))

// path.join([...paths]) // 用于连接路径
console.log('拼接的路径：' + path.join(__dirname, 'file/16.txt'))

// path.extname(path) // 返回文件的后缀名
console.log('当前文件后缀名：' + path.extname(__filename))

// path.basename(path[, ext]) // 返回文件路径的最后一个部分；如果第二个参数传后缀名，获取出来的路径就没有后缀名
console.log('文件路径的最后一部分：' + path.basename(__filename))
console.log('文件路径的最后一部分，去除扩展名：' + path.basename(__filename, '.js'))
