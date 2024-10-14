<template>
  <article class="rect-progress">
    <canvas id="canvas" ref="canvasRef"></canvas>
    <section class="list-area">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <span :style="{ backgroundColor: item.color }"></span>
        <span>{{ item.title }}</span>
        <span>{{ item.number }} $</span>
      </div>
    </section>
  </article>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue'

const { list } = defineProps({
  list: {
    type: Array,
    required: true,
  },
})

const canvas = useTemplateRef('canvasRef')

onMounted(() => {
  // 定义canvas画布的宽高
  canvas.value.width = canvas.value.offsetWidth
  canvas.value.height = canvas.value.offsetHeight
  // 定义一下边的长度
  const length = canvas.value.height - 40
  // 定义起始点的位置
  const startX = (canvas.value.width - length) / 2
  const startY = 20
  // 1 2 3 4分别表示上右下左
  const position = { x: startX, y: startY, p: 1 }
  // 记录一下4个拐点的位置
  const inflectionPoint = [
    { x: startX, y: startY },
    { x: startX + length, y: startY },
    { x: startX + length, y: startY + length },
    { x: startX, y: startY + length },
  ]
  // 计算出要绘制的线段总长度
  const totalLength = length * 4
  // 计算出每项的长度
  const totalNumber = list.reduce((acc, cur) => acc + +cur.number, 0) /* 总份数 */
  list.map(item => {
    item.lineLength = (item.number / totalNumber) * totalLength
    return item
  })
  const ctx = canvas.value.getContext('2d')
  const drawLine = (position, inflectionPoint, ctx, item) => {
    // 将当前画笔位置信息取出来
    const { x, y, p } = position
    const { color, lineLength } = item
    // 根据位置绘制
    ctx.strokeStyle = color
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y)
    switch (p) {
      case 1: {
        // 画笔在上方 计算起始点距离右上角的距离
        const distance = inflectionPoint[1].x - x
        if (lineLength <= distance) {
          ctx.lineTo(x + lineLength, y)
          ctx.stroke()
          position.x += lineLength
        } else {
          ctx.moveTo(x, y)
          ctx.lineTo(inflectionPoint[1].x, y)
          ctx.stroke()
          position.x = inflectionPoint[1].x
          item.lineLength -= distance
          position.p++
          drawLine(position, inflectionPoint, ctx, item)
        }
        break
      }
      case 2:
        {
          // 画笔在右方 计算起始点距离右下角的距离
          const distance = inflectionPoint[2].y - y
          if (lineLength <= distance) {
            ctx.lineTo(x, y + lineLength)
            ctx.stroke()
            position.y += lineLength
          } else {
            ctx.lineTo(x, inflectionPoint[2].y)
            ctx.stroke()
            position.y = inflectionPoint[2].y
            item.lineLength -= distance
            position.p++
            drawLine(position, inflectionPoint, ctx, item)
          }
        }
        break
      case 3:
        {
          // 画笔在下方 计算起始点距离左下角的距离
          const distance = x - inflectionPoint[3].x
          if (lineLength <= distance) {
            ctx.lineTo(x - lineLength, y)
            ctx.stroke()
            position.x -= lineLength
          } else {
            ctx.lineTo(inflectionPoint[3].x, y)
            ctx.stroke()
            position.x = inflectionPoint[3].x
            item.lineLength -= distance
            position.p++
            drawLine(position, inflectionPoint, ctx, item)
          }
        }
        break
      case 4:
        {
          // 画笔在左方 计算起始点距离左上角的距离
          const distance = y - inflectionPoint[0].y
          if (lineLength <= distance) {
            ctx.lineTo(x, y - lineLength)
            ctx.stroke()
            position.y -= lineLength
          } else {
            ctx.lineTo(x, inflectionPoint[0].y)
            ctx.stroke()
            position.y = inflectionPoint[0].y
            item.lineLength -= distance
          }
        }
        break
    }
  }
  list.forEach(item => drawLine(position, inflectionPoint, ctx, item))
})
</script>

<style lang="scss" scoped>
.rect-progress {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  .list-area {
    .list-item {
      display: flex;
      align-items: center;
      span {
        &:first-child {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        &:nth-child(2) {
          flex: 1;
        }
      }
    }
  }
}
</style>
