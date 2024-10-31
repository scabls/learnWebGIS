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
  zoom: 5,
  // pitch: 设置俯仰角度
  pitch: 0,
  // bearing: 设置航向角度
  bearing: 0,
})

const btns = document.querySelectorAll('#btns button')
btns[0].addEventListener('click', function () {
  map.setPitch(map.getPitch() + 10)
})
btns[1].addEventListener('click', function () {
  map.setBearing(map.getBearing() + 10)
})
btns[2].addEventListener('click', function () {
  // 实现动画效果
  // 效果1
  map.flyTo({
    // 北京经纬度
    center: [116.46, 39.92],
    zoom: 10,
    pitch: 30,
    bearing: 30,
    // 习惯在flyTo中使用speed
    // speed 0-1 值越大速度越快
    speed: 0.2,
  })
})
btns[3].addEventListener('click', function () {
  // 实现动画效果
  // 效果1
  map.easeTo({
    // 北京经纬度
    center: [116.46, 39.92],
    zoom: 10,
    pitch: 30,
    bearing: 30,
    // 习惯在easeTo中使用duration
    // duraion 动画持续时间，单位毫秒
    duration: 2000,
  })
})
