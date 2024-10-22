import './style.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
const map = new Map({
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [114.305469, 30.593025],
    zoom: 10,
    // extent:限制地图的显示范围[左下角经纬度，右上角经纬度]
    // extent: [114.305469, 30.593025, 116.407394, 39.904211],
  }),
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false,
      }),
    }),
  ],
})
const btns = document.querySelectorAll('.btns button')
btns.forEach((btn, index) => {
  btn.addEventListener('click', function () {
    // 移动地图的本质就是移动中心点位置
    const view = map.getView() //获取视图对象
    const center = view.getCenter() //获取视图的中心点坐标
    console.log(center, index)
    switch (index) {
      case 0: // 上
        // 上下移动改变维度
        center[1] += 1
        break
      case 1: // 右
        // 左右移动改变经度
        center[0] += 1
        break
      case 2: // 下
        center[1] -= 1
        break
      case 3: // 左
        center[0] -= 1
        break
    }
    // // 重新设置中心点
    // view.setCenter(center)
    // // 重新渲染地图
    // map.render()

    // 动画效果
    view.animate({
      center,
      duration: 200,
    })
  })
})
const goBeijing = btns[4]
goBeijing.addEventListener('click', function () {
  const view = map.getView()
  // view.setCenter([116.407394, 39.904211])
  // view.setZoom(12)
  // 动画效果
  view.animate({
    center: [116.407394, 39.904211],
    zoom: view.getZoom() + 2,
    duration: 1000,
  })
})
const zoomIn = btns[5]
const zoomOut = btns[6]
zoomIn.addEventListener('click', function () {
  const view = map.getView()
  view.animate({
    zoom: view.getZoom() + 1,
    duration: 200,
  })
})
zoomOut.addEventListener('click', function () {
  const view = map.getView()
  // const currentZoom = view.getZoom()
  // view.setZoom(currentZoom - 1)
  view.setZoom(view.getZoom() - 1)
})
