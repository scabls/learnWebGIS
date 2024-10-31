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
      properties: {
        title: 'marker1',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.394909, 39.910989],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'marker2',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.400639, 39.907559],
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

map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
  if (error) throw error
  map.addImage('custom-marker', image)
  map.addSource('point-source', {
    type: 'geojson',
    data, // data: data,
  })
  map.addLayer({
    id: 'points-layer',
    type: 'symbol',
    source: 'point-source',
    layout: {
      'icon-image': 'custom-marker',
      'icon-anchor': 'bottom',
      'text-field': ['get', 'title'], // 'text-field': '{title}',
      'text-anchor': 'top',
    },
    paint: {
      'text-color': 'red',
    },
  })
})
