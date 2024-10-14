const ctx = document.querySelector('#canvas').getContext('2d')
// 线条宽度
ctx.beginPath()
ctx.lineWidth = 10
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()

// 线条末端样式
;['butt', 'round', 'square'].forEach((lineCap, i) => {
  ctx.lineWidth = 15
  ctx.lineCap = lineCap
  ctx.beginPath()
  ctx.moveTo(25 + i * 50, 40)
  ctx.lineTo(25 + i * 50, 140)
  ctx.stroke()
})

//路径拐点样式
;['round', 'bevel', 'miter'].forEach((join, i) => {
  ctx.lineJoin = join
  ctx.beginPath()
  ctx.moveTo(200, 45 + i * 40)
  ctx.lineTo(240, 90 + i * 40)
  ctx.lineTo(280, 45 + i * 40)
  ctx.lineTo(320, 90 + i * 40)
  ctx.lineTo(360, 45 + i * 40)
  ctx.stroke()
})
