const ctx = document.querySelector('#canvas').getContext('2d')
//设置虚线样式
ctx.setLineDash([10, 2]) //实线长度,空白长度

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(300, 50)
ctx.stroke()

ctx.beginPath()
ctx.strokeStyle = 'red'
ctx.lineDashOffset = 9 //虚线偏移量(逆时针偏移)
ctx.moveTo(50, 100)
ctx.lineTo(300, 100)
ctx.stroke()
