const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const drawClock = () => {
  ctx.save()
  // 准备基本的预设
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(0.4, 0.4)
  ctx.rotate(-Math.PI / 2)
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  // 绘制小时刻度线
  ctx.save() // 存储状态, 绘制完后取出状态, 不让绘制过程中的状态改变影响后续绘制
  for (let i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.moveTo(100, 0)
    ctx.lineTo(120, 0)
    ctx.stroke()
    ctx.rotate(Math.PI / 6)
  }
  ctx.restore()
  // 绘制分钟刻度线
  ctx.save()
  ctx.lineWidth = 5
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath()
      ctx.moveTo(115, 0)
      ctx.lineTo(120, 0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()
  //绘制动态的三根针
  // 获取时分秒
  const time = new Date()
  const sec = time.getSeconds()
  const min = time.getMinutes()
  const hour = time.getHours() % 12
  // 绘制时针
  ctx.save()
  ctx.rotate((hour + min / 60 + sec / 60 / 60) * (Math.PI / 6))
  ctx.beginPath()
  ctx.lineWidth = 14
  ctx.moveTo(-20, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()
  ctx.restore()
  // 绘制分针
  ctx.save()
  ctx.rotate((min + sec / 60) * (Math.PI / 30))
  ctx.beginPath()
  ctx.lineWidth = 10
  ctx.moveTo(-25, 0)
  ctx.lineTo(112, 0)
  ctx.stroke()
  ctx.restore()
  // 绘制秒针
  ctx.save()
  ctx.rotate(sec * (Math.PI / 30))
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.strokeStyle = 'red'
  ctx.moveTo(-30, 0)
  ctx.lineTo(84, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 10, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(92, 0, 10, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
  ctx.restore()
  requestAnimationFrame(drawClock)
}
requestAnimationFrame(drawClock)
