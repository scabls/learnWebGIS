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
    // 加载本地瓦片地图
    url: '{x}-{y}-{z}.png',
    wrapX: false,
  }),
})
const center = view.getCenter()
map.setTarget('map')
map.setView(view)
map.addLayer(vetorLayer)
