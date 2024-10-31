import './style.css'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken =
  'pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA'

const map = new mapboxgl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'base-layer',
        type: 'raster',
        source: 'raster-tiles',
      },
    ],
  },
  projection: 'globe',
  center: [114.27, 30.59],
  zoom: 2,
  // pitch: 设置俯仰角度
  pitch: 0,
  // bearing: 设置航向角度
  bearing: 0,
})
// 实现地球自转
// function rotateWorld() {
//   const center = map.getCenter()
//   console.log(center)
//   center.lng += 100
//   map.setCenter(center)
//   requestAnimationFrame(rotateWorld)
// }
// requestAnimationFrame(rotateWorld)
let isSpinning = true
function rotateWorld() {
  if (!isSpinning) return
  const center = map.getCenter()
  console.log(center)
  center.lng += 100
  map.easeTo({
    center,
    duration: 2000,
    // easing: t => t,表示匀速运动
    easing: t => t,
  })
}
rotateWorld()
map.on('moveend', function () {
  rotateWorld()
})
map.on('drag', function () {
  isSpinning = false
})
map.on('dblclick', function () {
  isSpinning = true
})
