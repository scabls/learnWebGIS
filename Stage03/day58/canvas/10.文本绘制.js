const ctx = document.querySelector('#canvas').getContext('2d')

ctx.fillStyle = 'red'
ctx.font = '48px serif'
ctx.fillText('hello world', 100, 100)

ctx.strokeStyle = 'blue'
ctx.font = 'bold 48px serif'
ctx.strokeText('你好 世界', 100, 200)
