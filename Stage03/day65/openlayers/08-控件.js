import { Feature, Map, Overlay, View } from 'ol'
import './style.css'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Circle } from 'ol/geom'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Select from 'ol/interaction/Select.js'
import Draw from 'ol/interaction/Draw.js'
import Stroke from 'ol/style/Stroke'
import FullScreen from 'ol/control/FullScreen.js'

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
map.addLayer(vectorLayer)

const vectorSource = vectorLayer.getSource()

// 地图控件
map.addLayer(vecLayer)
//默认会添加3个控件 zoom rotate atribution(默认是隐藏的)
const arrtributionControl = new Attribution({
  label: '展开',
  collapseLabel: '版权新中地所有 收起',
})
map.addControl(arrtributionControl)
const fullscreenControl = new FullScreen()
map.addControl(fullscreenControl)
const mousePositionControl = new MousePosition()
map.addControl(mousePositionControl)
const scaleLineControl = new ScaleLine()
map.addControl(scaleLineControl)
const overviewMapControl = new OverviewMap()
map.addControl(overviewMapControl)
/*  
map 地图实例 (view target layers controls interactions overlays)
view 视图实例 (center zoom ...)
layer 图层实例(tile image vector)
source 数据源实例(xyz staticImage vectorSource(geojson geometry))
feature 要素信息 (geometry style)
overlay 覆盖物实例(element)
interaction 交互实例(select draw)
controls 控件实例(zoom rotate attribution fullscreen mouseposition scaleline overviewmap)   
*/
