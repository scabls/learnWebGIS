import { Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center: [114.24, 30.59],
  zoom: 10,
})
const vetorLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const satelliteLayer = new TileLayer({
  source: new XYZ({
    // 影像图层
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const markLayer = new TileLayer({
  source: new XYZ({
    // 标记图层
    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    wrapX: false,
  }),
})
map.setView(view)
map.addLayer(vetorLayer)
map.addLayer(satelliteLayer)
map.addLayer(markLayer)
const btns = document.querySelectorAll('.btns button')
const btn1 = btns[0]
const btn2 = btns[1]
btn1.addEventListener('click', () => {
  vetorLayer.setZIndex(1)
  satelliteLayer.setZIndex(0)
  markLayer.setZIndex(0)
})
btn2.addEventListener('click', () => {
  vetorLayer.setZIndex(0)
  satelliteLayer.setZIndex(1)
  markLayer.setZIndex(2)
})
