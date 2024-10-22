import './style.css'
// 在map容器中绘制一个地图
// ol遵循面向对象的开发范式
// ol中默认提供了一些底图服务
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { OSM, XYZ } from 'ol/source'
import { fromLonLat } from 'ol/proj'
const map = new Map({
  target: 'map', // 将当前的实例绑定到指定id的容器中
  // layers表示地图上显示的图层,通常最下层是瓦片底图
  layers: [
    // 绘制一个tile图层(底图)
    new TileLayer({
      // source表示图层对应的数据源, 瓦片图层需要使用数据源,
      // source: new OSM(), // 使用内置OSM底图
      // XYZ通用瓦片图层源
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false, // 不重复加载瓦片
      }),
    }),
  ],
  // view表示视图, 可以配置中心点位置和缩放级别
  view: new View({
    // 武汉经纬度
    // // ol在绘制地图时, 默认使用Web墨卡托投影(EPSG:3857), 需要将经纬度坐标转换到Web墨卡托坐标
    // center: fromLonLat([114.305469, 30.593823]),
    // 或者直接修改投影系统
    projection: 'EPSG:4326', // 4326表示WGS84坐标系
    center: [114.305469, 30.593823],
    // 缩放级别
    zoom: 10,
  }),
})
