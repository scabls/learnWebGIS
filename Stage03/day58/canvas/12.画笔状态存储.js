const ctx = document.querySelector('#canvas').getContext('2d')

ctx.save()
ctx.fillStyle = 'red'
ctx.fillRect(50, 50, 100, 100)
ctx.restore()

ctx.fillRect(150, 150, 100, 100)
