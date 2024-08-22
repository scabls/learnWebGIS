const obj = require('./07-模块间共享-自定义模块-module对象-导出')
console.log(obj) //{ a: 10, eat: [Function: eat] }
// 获取变量
console.log(obj.a)
// 获取方法
console.log(obj.eat)
obj.eat()
