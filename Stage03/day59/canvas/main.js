const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

class Point {
  constructor(radius = 10, color = 'white') {
    this.radius = radius
    this.color = color
    // 随机设置点的初始位置
    this.x = getRandom(radius, canvas.width - radius)
    this.y = getRandom(radius, canvas.height - radius)
  }

  // 设置每个点的移动速度
  xSpeed = getRandom(-100, 100)
  ySpeed = getRandom(-100, 100)
  // 保存绘制时的时间戳
  drawTime = null

  draw = () => {
    // 要让绘制的点移动起来, 根据存放的xspeed和yspeed来计算在x轴和y轴的移动距离 从而重新计算点的坐标
    if (this.drawTime) {
      // 此时说明已经绘制过点了, 要计算间隔的时间
      const duration = (Date.now() - this.drawTime) / 1000
      // 根据时间差来计算移动的距离
      const distanceX = this.xSpeed * duration
      const distanceY = this.ySpeed * duration
      // 根据移动的距离重新计算点的坐标
      this.x += distanceX
      this.y += distanceY
      // 当碰撞到边界的时候, 反弹
      // 左边
      if (this.x < this.radius) {
        this.x = this.radius
        this.xSpeed = -this.xSpeed
      }
      // 右边
      if (this.x > canvas.width - this.radius) {
        this.x = canvas.width - this.radius
        this.xSpeed = -this.xSpeed
      }
      // 上边
      if (this.y < this.radius) {
        this.y = this.radius
        this.ySpeed = -this.ySpeed
      }
      // 下边
      if (this.y > canvas.height - this.radius) {
        this.y = canvas.height - this.radius
        this.ySpeed = -this.ySpeed
      }
    }
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    // 保存当前的时间戳
    this.drawTime = Date.now()
  }
}

class View {
  constructor(points = 20, maxDistance = 500) {
    this.points = points
    this.maxDistance = maxDistance
    // 初始化整个视图的时候,要创建数组来存放所有的点
    this.pointsArray = new Array(points).fill().map(() => new Point(10))
  }

  draw = () => {
    // 先清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 遍历所有的点,调用draw方法绘制
    this.pointsArray.forEach((point, index) => {
      point.draw()
      // 对于每个点判断与其余点之间的距离 如果小于限制,则连接起来
      // 注意避免重复判断的处理方式
      this.pointsArray.forEach((otherPoint, otherIndex) => {
        if (otherIndex <= index) return
        const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y)
        if (distance >= this.maxDistance) return
        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineTo(otherPoint.x, otherPoint.y)
        // 根据距离设置连线的颜色透明度
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance / this.maxDistance})`
        ctx.stroke()
      })
    })
    requestAnimationFrame(this.draw)
  }
}

const view = new View()
requestAnimationFrame(view.draw)

/* 不要在公共字段中使用this访问实例属性, 因为公共实例字段会在基类的构造时（**构造函数主体运行之前**）或子类的 `super()` 返回后添加到实例中。当公共字段求值时, 实例还未创建。

若属性求值需要依赖this访问其他属性, 或者可以直接使用构造函数的参数, 则可以将属性定义在构造函数中。

*/
