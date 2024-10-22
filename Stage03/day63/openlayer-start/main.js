import { Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
const map = new Map({
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [114.24, 30.59],
    zoom: 10,
  }),
  layers: [
    new TileLayer({
      source: new XYZ({
        // 一个source可以有多个url,会依次加载
        // 高德地图有不同的瓦片图层 矢量,卫星影像,标记图层
        // 矢量图层
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        // // 影像图层
        // url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
        // // 标记图层
        // url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
        wrapX: false,
      }),
    }),
    // 叠加多个图层,默认后面的图层会叠在前面的图层之上
    new TileLayer({
      source: new XYZ({
        // 影像图层
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
        wrapX: false,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        // 标记图层
        url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
        wrapX: false,
      }),
    }),
  ],
})
const btns = document.querySelectorAll('.btns button')
const btn1 = btns[0]
const btn2 = btns[1]
btn1.addEventListener('click', () => {
  const layers = map.getAllLayers()
  layers[0].setZIndex(1)
  layers[1].setZIndex(0)
  layers[2].setZIndex(0)
})
btn2.addEventListener('click', () => {
  const layers = map.getLayers()
  const layer3 = layers.getArray()[2]
  layers.item(0).setZIndex(0)
  layers.item(1).setZIndex(1)
  layer3.setZIndex(1)
})
