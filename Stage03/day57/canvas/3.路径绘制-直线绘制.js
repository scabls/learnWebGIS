// 二. 路径绘制
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')

// 落笔
ctx.beginPath()
// 确认开始绘图的位置
ctx.moveTo(100, 30)
// 移动画笔
ctx.lineTo(200, 30)
ctx.lineTo(200, 130)
ctx.lineTo(100, 130)
ctx.closePath()
// 加上描边(渲染路径)
ctx.stroke()
// 填充
ctx.fillStyle = 'lightblue'
ctx.fill()
