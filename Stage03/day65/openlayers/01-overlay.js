import { Map, Overlay, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
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

const popup = new Overlay({
  element: document.querySelector('.popup'),
})
popup.setPosition(center)
map.addOverlay(popup)

map.on('click', function (e) {
  const position = e.coordinate
  const element = document.createElement('div')
  element.textContent = `此处经纬度为：经度${position[0].toFixed(2)},纬度${position[1].toFixed(2)}`
  element.style.backgroundColor = 'lightblue'
  const popup = new Overlay({
    element, // 或者使用overlay.setElement(element)
    position, // 或者使用overlay.setPosition(position)
  })
  map.addOverlay(popup)
})
