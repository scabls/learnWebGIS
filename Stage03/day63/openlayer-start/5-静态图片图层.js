import { Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { ImageStatic, XYZ } from 'ol/source'
import ImageLayer from 'ol/layer/Image'
const map = new Map({})
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
const center = view.getCenter()
const imageLayer = new ImageLayer({
  source: new ImageStatic({
    url: 'https://fastly.picsum.photos/id/407/200/200.jpg?hmac=PV4bwPN59Y3_R4kbqnn8kxRsVzwUMQZn3BMu85CUPlA',
    imageExtent: [center[0] - 1, center[1] - 1, center[0] + 1, center[1] + 1],
  }),
})
map.setTarget('map')
map.setView(view)
map.addLayer(vetorLayer)
map.addLayer(imageLayer)
