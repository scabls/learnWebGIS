<template>
  <article class="screen-shot">
    <div class="input"><input type="file" @change="handleFileChange" /></div>
    <div class="img-container">
      <img class="img" ref="img" />
      <canvas
        class="canvas1"
        ref="canvas1"
        @mousedown="handleMouseDown"
        @mouseup="removeListeners"
        @mouseout="removeListeners"
      ></canvas>
    </div>
    <button v-show="captureWidth || captureHeight" @click="handleCapture">截图</button>
    <div v-show="imageData.data.length">
      <canvas class="canvas2" ref="canvas2"></canvas>
    </div>
  </article>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'

const img = useTemplateRef('img')
const canvas1 = useTemplateRef('canvas1')
const canvas2 = useTemplateRef('canvas2')

const startX = ref(0)
const startY = ref(0)
const captureWidth = ref(0)
const captureHeight = ref(0)
const ctx1 = ref({})
const ctx2 = ref({})
const imageData = ref({
  data: [],
})

const handleFileChange = event => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    img.value.src = reader.result
  }
}
const handleMouseDown = event => {
  canvas1.value.width = img.value.offsetWidth
  canvas1.value.height = img.value.offsetHeight
  ctx1.value = canvas1.value.getContext('2d', { willReadFrequently: true })
  ctx1.value.clearRect(0, 0, canvas1.value.width, canvas1.value.height)
  ctx1.value.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx1.value.fillRect(0, 0, canvas1.value.width, canvas1.value.height)
  startX.value = event.offsetX
  startY.value = event.offsetY
  event.target.addEventListener('mousemove', moving)
}
const removeListeners = event => {
  event.target.removeEventListener('mousemove', moving)
}
const moving = event2 => {
  ctx1.value.clearRect(0, 0, canvas1.value.width, canvas1.value.height)
  ctx1.value.fillRect(0, 0, canvas1.value.width, canvas1.value.height)
  const endX = event2.offsetX
  const endY = event2.offsetY
  captureWidth.value = endX - startX.value
  captureHeight.value = endY - startY.value
  ctx1.value.clearRect(startX.value, startY.value, captureWidth.value, captureHeight.value)
}
const handleCapture = () => {
  ctx1.value.drawImage(
    img.value,
    startX.value,
    startY.value,
    captureWidth.value,
    captureHeight.value,
    startX.value,
    startY.value,
    captureWidth.value,
    captureHeight.value
  )
  imageData.value = ctx1.value.getImageData(
    startX.value,
    startY.value,
    captureWidth.value,
    captureHeight.value
  )
  ctx2.value = canvas2.value.getContext('2d')
  canvas2.value.width = Math.abs(captureWidth.value)
  canvas2.value.height = Math.abs(captureHeight.value)
  ctx2.value.putImageData(imageData.value, 0, 0)
}
</script>

<style lang="scss" scoped>
.screen-shot {
  .img-container {
    position: relative;
    width: min-content;
    .img {
      display: block;
    }
    .canvas1 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: crosshair;
    }
  }
}
</style>
