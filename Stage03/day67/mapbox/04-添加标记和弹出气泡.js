import { Map } from 'mapbox-gl'
import './style.css'
import mapboxgl from 'mapbox-gl'
import { Marker } from 'mapbox-gl'
import { Popup } from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA'

const center = [116.407413, 39.904211]

const map = new Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      rasterTiles: {
        type: 'raster',
        tiles: [
          'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'RasterTilesLayer',
        type: 'raster',
        source: 'rasterTiles',
      },
    ],
    // mapbox的glyphs, 字体文件
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  },
  projection: 'globe',
  center,
  zoom: 10,
})

map.on('style.load', function () {
  // 添加地图标记
  const marker = new Marker({
    color: 'red',
    draggable: true,
  })
  // Marker的方法返回当前实例, 因此可以链式调用
  marker.setLngLat(center).addTo(map)
  marker.on('dragend', function (e) {
    console.log(marker.getLngLat())
    marker.setLngLat(center)
    // 添加弹出气泡
    const popup = new Popup()
    popup.setLngLat(center).setHTML('<h1>又回来了!</h1>').addTo(map)
  })
})
