const canvas2 = document.querySelector('#canvas2')
canvas2.width = canvas2.offsetWidth
canvas2.height = canvas2.offsetHeight
const ctx2 = canvas2.getContext('2d')

const btn = document.querySelector('#copyBtn')
const img = document.querySelector('#img')

btn.addEventListener('click', function () {
  drawMosaic(img)
})

const drawMosaic = img => {
  const canvas = document.createElement('canvas')
  const { width, height, naturalWidth, naturalHeight } = img
  canvas.width = width
  canvas.height = height
  const imgRatio = naturalWidth / naturalHeight
  const canvasRatio = width / height
  let sx, sy, sWidth, sHeight
  if (imgRatio > canvasRatio) {
    sHeight = naturalHeight
    sWidth = sHeight * canvasRatio
    sx = (naturalWidth - sWidth) / 2
    sy = 0
  } else {
    sWidth = naturalWidth
    sHeight = sWidth / canvasRatio
    sx = 0
    sy = (naturalHeight - sHeight) / 2
  }
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height)
  const imageData = ctx.getImageData(0, 0, width, height)
  createMosaic(ctx2, imageData)
}
const createMosaic = (ctx, imageData) => {
  const { width, height, data } = imageData
  const blockSize = 20
  for (let i = 0; i < width; i += blockSize) {
    for (let j = 0; j < height; j += blockSize) {
      const index = (i + j * width) * 4
      // 当前每个block的第一个索引值就是index [index,index+1,index+2,indx+3]
      const [r, g, b, a] = [
        data[index],
        data[index + 1],
        data[index + 2],
        data[index + 3] / 255 /* 注意a的格式差别 */,
      ]
      // 将当前block内的像素信息都填充为rgba的值
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`
      ctx.fillRect(i, j, blockSize, blockSize)
    }
  }
}
