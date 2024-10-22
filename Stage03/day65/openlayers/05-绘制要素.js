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
// 绘制
// 停止绘制: 左键双击 右键 滚轮
// const draw = new Draw({
//   type: 'LineString',
//   source: vectorSource,
//   style: new Style({
//     stroke: new Stroke({
//       color: 'rgba(255, 0, 0, 0.5)',
//       width: 4,
//     }),
//   }),
// })
const draw = new Draw({
  // type: 'Polygon',
  type: 'Circle',
  source: vectorSource,
  // 绘制时的样式
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.5)',
    }),
  }),
})
map.addInteraction(draw)
// 绘制结束时, 拿到绘制的feature
draw.on('drawend', function (e) {
  // 绘制结束后的样式
  e.feature.setStyle(
    new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 0, 0.5)',
      }),
    })
  )
})
