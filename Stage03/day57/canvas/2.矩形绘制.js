// 一. 矩形绘制
// 1.拿到画布dom
const canvas = document.querySelector('#canvas')
// 2. 拿到canvas的上下文
const ctx = canvas.getContext('2d')

// 1.1 绘制填充矩形
// ctx.fillStyle = 'lightblue'
// ctx.fillRect(50, 20, 100, 100)

// 1.2 绘制描边矩形
ctx.strokeStyle = 'green'
ctx.lineWidth = 5
ctx.strokeRect(50, 20, 100, 100)

// 1.3 清除画布
const button = document.querySelector('button')
button.addEventListener('click', function () {
  ctx.clearRect(0, 0, 1000, 600) //(起始x,起始y,宽,高)
})
