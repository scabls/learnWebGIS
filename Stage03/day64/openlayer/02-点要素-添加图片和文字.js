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
import { Point } from 'ol/geom'
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
  // 尝试加载地图矢量数据 GeoJSON格式
  source: new VectorSource({
    url() {
      // 从本地json文件中获取数据
      return './data.json'
    },
    // 设置数据格式为GeoJSON,方法要先导入
    format: new GeoJSON(),
  }),
  // 设置样式(无论做什么都要使用面向对象的方式)
  style: new Style({
    // 设置填充
    fill: new Fill({
      color: 'red',
    }),
    // 设置描边
    stroke: new Stroke({
      color: 'gold',
    }),
  }),
})
map.setView(view)
map.addLayer(firstLayer)
map.addLayer(secondLayer)
// 在中心点位置插入一个图标: 在center位置添加一个点要素
const iconFeature = new Feature({
  geometry: new Point(center),
})
// 给点要素添加图片
iconFeature.setStyle(
  new Style({
    image: new Icon({
      // 也可以添加canvas(通过img属性设置?)或者svg(通过src属性设置?)
      // img属性设置dom对象, src属性设置图片路径
      src: './地点.png',
      width: 40,
      height: 40,
    }),
    text: new Text({
      text: '中心点',
      font: '16px sans-serif',
      fill: new Fill({
        color: 'black',
      }),
      offsetY: 30,
    }),
  })
)
// 将feature(要素)添加到矢量图层中
secondLayer.getSource().addFeature(iconFeature)
