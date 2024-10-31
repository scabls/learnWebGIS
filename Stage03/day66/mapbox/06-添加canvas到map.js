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
  zoom: 10,
})
// 绘制一个canvas到mapbox底图上
const canvas = document.createElement('canvas')
canvas.width = 256
canvas.height = 256
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.arc(128, 128, 100, 0, 2 * Math.PI)
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
ctx.fill()
map.on('style.load', function () {
  // 在style加载完成后，将canvas添加到底图
  map.addSource('canvas-source', {
    type: 'canvas',
    canvas, // canvas:canvas,
    // 写入四个位置坐标，分别对应左上角、右上角、右下角、左下角
    coordinates: [
      [114.27, 30.59],
      [114.27 + 10, 30.59],
      [114.27 + 10, 30.59 - 10],
      [114.27, 30.59 - 10],
    ],
  })
  // 将数据源添加到底图
  map.addLayer({
    id: 'canvas-layer',
    type: 'raster',
    source: 'canvas-source',
  })
})
