console.log('你若安好，便是晴天')
const a = 10
function eat() {
  console.log('干饭')
}

/* 使用exports对象导出模块中定义的变量和方法 */
exports.a = a
exports.eat = eat

/* 验证module.exports和exports是不是一开始就指向同一个对象 */
console.log(module.exports == exports) // true 说明它们一开始指向同一个空间
