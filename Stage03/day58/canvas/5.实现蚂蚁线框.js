const ctx = document.querySelector('#canvas').getContext('2d')
// 实现蚂蚁线框
let offset = 0
const draw = () => {
  offset += 0.1
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.setLineDash([4, 2])
  ctx.lineDashOffset = -offset
  ctx.strokeRect(30, 30, 100, 100)
  requestAnimationFrame(draw)
}
draw()
