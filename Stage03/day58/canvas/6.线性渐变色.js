const ctx = document.querySelector('#canvas').getContext('2d')

// 在矩形中填充一个渐变的颜色

const linearGradient = ctx.createLinearGradient(0, 0, 100, 100) //起点x,起点y,终点x,终点y
// 设置渐变的颜色
linearGradient.addColorStop(0, 'gold')
linearGradient.addColorStop(0.5, 'blue')
linearGradient.addColorStop(1, 'green')

ctx.fillStyle = linearGradient
ctx.fillRect(0, 0, 100, 100)
