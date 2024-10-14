const ctx = document.querySelector('#canvas').getContext('2d')

// 可以通过一系列属性控制阴影
ctx.shadowColor = 'grey'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 10

ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)
