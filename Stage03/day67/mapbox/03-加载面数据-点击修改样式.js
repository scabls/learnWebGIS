import { Map } from 'mapbox-gl'
import './style.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA'

const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.396119, 39.910796],
            [116.401041, 39.910674],
            [116.401176, 39.907511],
            [116.389249, 39.905694],
            [116.380859, 39.913228],
            [116.396119, 39.910796],
          ],
        ],
      },
    },
  ],
}

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
  center: [116.407413, 39.904211],
  zoom: 10,
})

map.on('style.load', function () {
  map.addSource('polygon-source', {
    type: 'geojson',
    data,
  })
  map.addLayer({
    id: 'polygon-layer',
    type: 'fill',
    source: 'polygon-source',
    paint: {
      'fill-color': 'rgb(255, 0, 0)',
      'fill-opacity': 0.5,
    },
  })
  map.on('click', function () {
    map.setPaintProperty('polygon-layer', 'fill-opacity', 1)
  })
})
