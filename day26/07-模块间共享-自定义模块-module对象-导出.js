console.log('你若安好，便是晴天')
const a = 10
function eat() {
  console.log('干饭')
}

/* 使用module中的exports属性导出模块中定义的变量和方法 */
module.exports.a = a
module.exports.eat = eat

/* 当前的模块对象:存储了当前模块的信息 */
console.log(module) // exports: { a: 10, eat: [Function: eat] }
