<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script setup>
import { computed, useTemplateRef, onMounted } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  lineWidth: {
    type: Number,
    requird: true,
    default: 1,
  },
  gap: {
    type: Number,
    required: true,
  },
  list: {
    type: Array,
    required: true,
  },
})

const canvas = useTemplateRef('canvas')

const altLineWidth = computed(() => props.lineWidth * 2)
const totalLength = computed(() => (props.width + props.height) * 2)

const totalNumber = computed(() => props.list.reduce((acc, cur) => acc + cur.number, 0))
const altList = computed(() =>
  props.list.map(item => ({
    ...item,
    allocatedLength:
      (item.number / totalNumber.value) * (totalLength.value - props.gap * props.list.length),
  }))
)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const drawLine = (x, y, axis, offset, color) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    switch (axis) {
      case 'x':
        ctx.lineTo(x + offset, y)
        break
      case 'y':
        ctx.lineTo(x, y + offset)
        break
    }
    ctx.strokeStyle = color
    ctx.stroke()
  }
  ctx.lineWidth = altLineWidth.value
  altList.value.reduce((acc, cur) => {
    const endLength = acc + cur.allocatedLength
    if (acc <= props.width) {
      if (endLength <= props.width) {
        drawLine(acc, 0, 'x', cur.allocatedLength, cur.color)
      } else if (endLength <= props.width + props.height) {
        drawLine(acc, 0, 'x', props.width - acc, cur.color)
        drawLine(props.width, 0, 'y', endLength - props.width, cur.color)
      } else if (endLength <= props.width * 2 + props.height) {
        drawLine(acc, 0, 'x', props.width - acc, cur.color)
        drawLine(props.width, 0, 'y', props.height, cur.color)
        drawLine(
          props.width,
          props.height,
          'x',
          -(endLength - props.width - props.height),
          cur.color
        )
      } else if (endLength <= props.width * 2 + props.height * 2) {
        drawLine(acc, 0, 'x', props.width - acc, cur.color)
        drawLine(props.width, 0, 'y', props.height, cur.color)
        drawLine(props.width, props.height, 'x', -props.width, cur.color)
        drawLine(0, props.height, 'y', -(endLength - props.width * 2 - props.height), cur.color)
      }
    } else if (acc <= props.width + props.height) {
      if (endLength <= props.width + props.height) {
        drawLine(props.width, acc - props.width, 'y', cur.allocatedLength, cur.color)
      } else if (endLength <= props.width * 2 + props.height) {
        drawLine(props.width, acc - props.width, 'y', props.height + props.width - acc, cur.color)
        drawLine(
          props.width,
          props.height,
          'x',
          -(endLength - props.width - props.height),
          cur.color
        )
      } else if (endLength <= props.width * 2 + props.height * 2) {
        drawLine(props.width, acc - props.width, 'y', props.height + props.width - acc, cur.color)
        drawLine(props.width, props.height, 'x', -props.width, cur.color)
        drawLine(0, props.height, 'y', -(endLength - props.width * 2 - props.height), cur.color)
      }
    } else if (acc <= props.width * 2 + props.height) {
      if (endLength <= props.width * 2 + props.height) {
        drawLine(
          props.width - (acc - props.width - props.height),
          props.height,
          'x',
          -cur.allocatedLength,
          cur.color
        )
      } else if (endLength <= props.width * 2 + props.height * 2) {
        drawLine(
          props.width - (acc - props.width - props.height),
          props.height,
          'x',
          acc - props.width - props.height - props.width,
          cur.color
        )
        drawLine(0, props.height, 'y', -(endLength - props.width * 2 - props.height), cur.color)
      }
    } else {
      drawLine(
        0,
        props.height - (acc - props.width * 2 - props.height),
        'y',
        -(endLength - props.width * 2 - props.height),
        cur.color
      )
    }
    return endLength + props.gap
  }, 0)
})
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  margin: 0 auto;
  padding: 2rem;
}
</style>
