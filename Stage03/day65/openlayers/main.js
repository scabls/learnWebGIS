import { Feature, Map, Overlay, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Circle } from 'ol/geom'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Select from 'ol/interaction/Select.js'
import Draw from 'ol/interaction/Draw.js'
import Stroke from 'ol/style/Stroke'

const map = new Map({
  target: 'map',
})
const center = [114.305445, 30.592862]
const view = new View({
  projection: 'EPSG:4326',
  center,
  zoom: 10,
})
const tileLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
map.setView(view)
map.addLayer(tileLayer)

const vectorLayer = new VectorLayer({
  source: new VectorSource(),
})
map.addLayer(vectorLayer)

const vectorSource = vectorLayer.getSource()

const strokeStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(255, 0, 0, 0.5)',
    width: 4,
  }),
})
const fillStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 0, 0, 0.5)',
  }),
})
// 绘制
// 停止绘制: 左键双击 右键 滚轮
const drawLine = new Draw({
  type: 'LineString',
  source: vectorSource,
  // style: strokeStyle,
})
const drawCircle = new Draw({
  type: 'Circle',
  source: vectorSource,
  // 绘制时的样式
  style: fillStyle,
})
const drawPolygon = new Draw({
  type: 'Polygon',
  source: vectorSource,
  // 绘制时的样式
  style: fillStyle,
})
// 绘制结束时, 拿到绘制的feature
drawCircle.on('drawend', function (e) {
  // 绘制结束后的样式
  e.feature.setStyle(fillStyle)
})
drawPolygon.on('drawend', function (e) {
  e.feature.setStyle(fillStyle)
})
drawLine.on('drawend', function (e) {
  e.feature.setStyle(strokeStyle)
})
const interactionArr = [drawLine, drawCircle, drawPolygon]
interactionArr.forEach(draw => map.addInteraction(draw))
const disableDraw = () => interactionArr.forEach(draw => draw.setActive(false))
disableDraw()
const btns = document.querySelectorAll('.btn')
btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    disableDraw()
    interactionArr[i].setActive(true)
  })
})
