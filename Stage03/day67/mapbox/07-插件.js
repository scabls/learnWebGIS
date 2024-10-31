import { Map } from 'mapbox-gl'
import './style.css'
import mapboxgl from 'mapbox-gl'

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
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  })
  map.addControl(directions, 'top-right')
})
