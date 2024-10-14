const ctx = document.querySelector('#canvas').getContext('2d')
// 在每一个渲染关键帧中绘制canvas,并清除上一次绘制
let step = 1
let startX = 0
let startY = 100
const lineLength = 100
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(startX + lineLength, startY)
  ctx.stroke()
  startX = startX + step
  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
