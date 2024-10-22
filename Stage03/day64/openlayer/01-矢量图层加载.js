import { Map, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON.js'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
const map = new Map({
  target: 'map',
})
const view = new View({
  projection: 'EPSG:4326',
  // 武汉中心点
  center: [114.305469, 30.593024],
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
  // 发送请求获取数据
  source: new VectorSource({
    // url: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    url() {
      return 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
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
// 当GeoJSON数据加载完成后,显示在地图上显示的省份数量
// 获取矢量图层的source :map.getLayers().item(1).getSource()
map
  .getLayers()
  .item(1)
  .getSource()
  .on('change', function () {
    // 当数据请求完毕后
    const length = this.getFeatures().length
    const h1 = document.createElement('h1')
    h1.textContent = `中国一共有${length}个省`
    document.body.appendChild(h1)
    h1.style.position = 'absolute'
    h1.style.width = '100%'
    h1.style.textAlign = 'center'
    h1.style.pointerEvents = 'none'
  })
// 设置点击省份变蓝
const clickStyle = new Style({
  fill: new Fill({
    color: 'blue',
  }),
})
map.on('click', function (e) {
  const source = map.getLayers().item(1).getSource()
  // 将所以省份重置为默认样式
  source.getFeatures().forEach(feature => feature.setStyle())
  // 获取点击的经纬度
  const coordinate = e.coordinate
  // 根据点击的经纬度找到对应的省份feature
  const feature = source.getFeaturesAtCoordinate(coordinate)[0]
  // 设置点击的省份样式
  feature.setStyle(clickStyle)
})
