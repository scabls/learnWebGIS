// 二次贝塞尔曲线
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')

// 3.
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.quadraticCurveTo(120, 160, 200, 200)
ctx.stroke()
