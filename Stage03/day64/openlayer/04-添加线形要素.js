import { Feature, Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON.js'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import { Circle, LineString, Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'

const center = [114.964271, 35.935766]
const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center,
  zoom: 9,
})
const firstLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
// 在地图上加载一个矢量图层
const secondLayer = new VectorLayer({
  source: new VectorSource({}),
})
map.setView(view)
map.addLayer(firstLayer)
map.addLayer(secondLayer)
// 鼠标点击时,以添加线
map.on('click', function (e) {
  const coordinate = e.coordinate
  const feature = new Feature({
    geometry: new LineString([coordinate, [coordinate[0] + 0.1, coordinate[1] + 0.1]]),
  })
  feature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'red',
        width: 10,
      }),
    })
  )
  secondLayer.getSource().addFeature(feature)
})
