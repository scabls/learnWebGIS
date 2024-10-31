import { Map } from 'mapbox-gl'
import './style.css'
import mapboxgl from 'mapbox-gl'
import { Marker } from 'mapbox-gl'
import { Popup } from 'mapbox-gl'
import { AttributionControl } from 'mapbox-gl'
import { FullscreenControl } from 'mapbox-gl'
import { GeolocateControl } from 'mapbox-gl'
import { NavigationControl } from 'mapbox-gl'
import { ScaleControl } from 'mapbox-gl'

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
  // 添加属性控件
  const attributionControl = new AttributionControl({
    compact: true,
    customAttribution: 'my-map',
  })
  map.addControl(attributionControl, 'top-left')
  // 添加全屏化控件
  const fullScreenControl = new FullscreenControl({
    container: document.querySelector('#map'),
  })
  map.addControl(fullScreenControl, 'top-right')
  // 添加定位控件
  const geolocateControl = new GeolocateControl()
  map.addControl(geolocateControl, 'top-right')
  // 添加缩放控件
  const zoomControl = new NavigationControl()
  map.addControl(zoomControl, 'top-left')
  // 添加比例尺控件
  const scaleControl = new ScaleControl()
  map.addControl(scaleControl, 'bottom-left')
})
