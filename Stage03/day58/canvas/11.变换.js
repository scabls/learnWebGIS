const ctx = document.querySelector('#canvas').getContext('2d')

ctx.translate(100, 100) /* 改变坐标原点 */
ctx.rotate(-Math.PI / 2) /* 旋转坐标系,正值顺时针,负值逆时针 */
ctx.scale(0.5, 0.5) /* 缩放坐标系 */
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()

ctx.rotate(-Math.PI / 2)
ctx.moveTo(0, 0)
ctx.lineTo(100, 0)
ctx.stroke()
