import TileLayer from 'ol/layer/Tile'
import './style.css'
import { Feature, Map, View } from 'ol'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import { LineString, Point } from 'ol/geom'
import Icon from 'ol/style/Icon'
import Stroke from 'ol/style/Stroke'

const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  center: [116.46, 39.92],
  zoom: 10,
})
const tileLayer = new TileLayer({
  source: new XYZ({
    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    wrapX: false,
  }),
})
const vectorLayer = new VectorLayer({})
const source = new VectorSource()
map.setView(view)
map.addLayer(tileLayer)
map.addLayer(vectorLayer)
vectorLayer.setSource(source)

let doNotClear = 0
const coordinates = []
const pointStyle = new Style({
  image: new Icon({
    src: './地点.png',
    width: 32,
    height: 32,
    anchor: [0.5, 1],
  }),
})
const lineStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 3,
  }),
})

map.on('click', function (e) {
  doNotClear = (doNotClear + 1) % 3
  if (!doNotClear) {
    source.clear()
    return
  }
  const iconFeature = new Feature({
    geometry: new Point(e.coordinate),
  })
  iconFeature.setStyle(pointStyle)
  source.addFeature(iconFeature)
  switch (doNotClear) {
    case 1:
      coordinates[0] = e.coordinate
      break
    case 2:
      coordinates[1] = e.coordinate
      const lineFeature = new Feature({
        geometry: new LineString(coordinates),
      })
      lineFeature.setStyle(lineStyle)
      source.addFeature(lineFeature)
      break
  }
})
