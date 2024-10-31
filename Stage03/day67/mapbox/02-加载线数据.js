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
        type: 'LineString',
        coordinates: [
          [116.39608, 39.909172],
          [116.398546, 39.911704],
          [116.400457, 39.908918],
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
    // mapbox的glyphs
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  },
  projection: 'globe',
  center: [116.407413, 39.904211],
  zoom: 10,
})

map.on('style.load', function () {
  map.addSource('line-source', {
    type: 'geojson',
    data,
  })
  map.addLayer({
    id: 'line-layer',
    type: 'line',
    source: 'line-source',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#FF0000',
      'line-width': 10,
    },
  })
})
