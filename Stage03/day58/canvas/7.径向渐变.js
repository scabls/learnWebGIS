const ctx = document.querySelector('#canvas').getContext('2d')

// 在矩形中填充一个径向渐变的颜色

const radialGradient = ctx.createRadialGradient(0, 0, 20, 50, 50, 30)
// 设置渐变的颜色
radialGradient.addColorStop(0, 'gold')
radialGradient.addColorStop(0.5, 'blue')
radialGradient.addColorStop(1, 'green')

ctx.fillStyle = radialGradient
ctx.fillRect(0, 0, 100, 100)
