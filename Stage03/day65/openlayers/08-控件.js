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
import FullScreen from 'ol/control/FullScreen.js'

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

// 地图控件
const fullScreenControl = new FullScreen()
map.addControl(fullScreenControl)
