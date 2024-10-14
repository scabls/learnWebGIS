// 二. 路径绘制
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')

// 3. 绘制圆弧路径
ctx.beginPath()
ctx.arc(100, 160, 50, 0, Math.PI, true)
ctx.closePath()

ctx.stroke()
ctx.fillStyle = 'lightblue'
ctx.fill()
