const ctx = document.querySelector('#canvas').getContext('2d')
ctx.globalAlpha = 0.2
ctx.fillStyle = 'lightblue'
for (let i = 0; i < 6; i++) {
  ctx.beginPath()
  ctx.arc(100, 100, 10 + 10 * i, 0, 2 * Math.PI)
  ctx.fill()
}
