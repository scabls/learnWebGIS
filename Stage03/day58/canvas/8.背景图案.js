const ctx = document.querySelector('#canvas').getContext('2d')

const img = new Image()
img.src =
  'https://img0.baidu.com/it/u=4029422113,1235624534&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=450'
img.addEventListener('load', function () {
  // 向ctx中添加图案
  const pattern = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 200, 110)
})
