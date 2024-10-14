// 二. 路径绘制
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')

// 3. 绘制笑脸
ctx.beginPath()
ctx.arc(100, 100, 50, 0, 2 * Math.PI)
ctx.moveTo(90, 90)
ctx.arc(85, 90, 5, 0, 2 * Math.PI)
ctx.moveTo(120, 90)
ctx.arc(115, 90, 5, 0, 2 * Math.PI)
ctx.moveTo(135, 100)
ctx.arc(100, 100, 35, 0, Math.PI)
ctx.stroke()
