const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const canvas2 = document.querySelector('#canvas2')
const ctx2 = canvas2.getContext('2d')
canvas2.width = canvas2.offsetWidth
canvas2.height = canvas2.offsetHeight

const btn = document.querySelector('#copyBtn')

const img = new Image()
img.src = './nanoha.png'

let ImageData

img.addEventListener('load', function () {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = canvas.width / canvas.height
  let sx, sy, sWidth, sHeight
  // 计算裁剪的起始位置和尺寸
  // 实现css的 object-fit: cover 效果
  if (imgRatio > canvasRatio) {
    sHeight = img.naturalHeight
    sWidth = sHeight * canvasRatio
    sx = (img.naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = img.naturalWidth
    sHeight = sWidth / canvasRatio
    sx = 0
    sy = (img.naturalHeight - sHeight) / 2
  }
  // 通过canvas绘制图片
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height)
  // 获取canvas的像素信息
  ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log('🚀 ~ ImageData:', ImageData)
  // 60000条,每四条对应一个像素的rgba
})

btn.addEventListener('click', function () {
  ctx2.putImageData(ImageData, 0, 0)
})
