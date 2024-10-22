import { Feature, Map, Overlay, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Circle } from 'ol/geom'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
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
const circle = new Feature({
  geometry: new Circle(center, 0.01),
})
circle.setStyle(
  new Style({
    fill: new Fill({
      color: 'red',
    }),
  })
)
vectorLayer.getSource().addFeature(circle)
map.addLayer(vectorLayer)

circle.on('mouseover', function () {
  this.setStyle(
    new Style({
      fill: new Fill({
        color: 'blue',
      }),
    })
  )
})
// 自定义事件
// map.on('pointermove', function (e) {
//   // 给circle派发一个自定义事件
//   map.forEachFeatureAtPixel(e.pixel, function (feature) {
//     feature.dispatchEvent({ type: 'mouseover', event: e })
//   })
// })
map.on('pointermove', function (e) {
  // 给circle派发一个自定义事件
  const features = map.getFeaturesAtPixel(e.pixel)
  if (features.length === 0) return
  features[0].dispatchEvent({ type: 'mouseover', event: e })
})
