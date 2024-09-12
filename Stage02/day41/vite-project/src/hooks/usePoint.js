import { ref, onMounted, onUnmounted } from 'vue'

export default function usePoint() {
  const point = ref({ x: 0, y: 0 })

  function handleClick(event) {
    point.value.x = event.clientX
    point.value.y = event.clientY
    console.log(point.value)
  }
  onMounted(() => {
    window.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handleClick)
  })
  return point
}
