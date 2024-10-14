// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')
// 3.绘制一个红色矩形
ctx.fillStyle = 'lightblue'
ctx.fillRect(50, 20, 100, 100)
