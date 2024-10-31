# Mapbox

## 添加点数据

```js
const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: 'marker1',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.394909, 39.910989],
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'marker2',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.400639, 39.907559],
      },
    },
  ],
}
```

```js
map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
  if (error) throw error
  map.addImage('custom-marker', image)
  map.addSource('point-source', {
    type: 'geojson',
    data, // data: data,
  })
  map.addLayer({
    id: 'points-layer',
    type: 'symbol',
    source: 'point-source',
    layout: {
      'icon-image': 'custom-marker',
      'icon-anchor': 'bottom',
      'text-field': ['get', 'title'], // 'text-field': '{title}',
      'text-anchor': 'top',
    },
    paint: {
      'text-color': 'red',
    },
  })
})
```

注意设置text-field需要json的feature的properties有对应属性, 并且map的style对象中设置glyphs属性

```js
const map = new Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      rasterTiles: {
        type: 'raster',
        tiles: [
          'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'RasterTilesLayer',
        type: 'raster',
        source: 'rasterTiles',
      },
    ],
    // mapbox的glyphs
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  },
  projection: 'globe',
  center: [116.407413, 39.904211],
  zoom: 10,
})
```

## 添加线数据

```js
const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [116.39608, 39.909172],
          [116.398546, 39.911704],
          [116.400457, 39.908918],
        ],
      },
    },
  ],
}
```

```js
map.on('style.load', function () {
  map.addSource('line-source', {
    type: 'geojson',
    data,
  })
  map.addLayer({
    id: 'line-layer',
    type: 'line',
    source: 'line-source',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#FF0000',
      'line-width': 10,
    },
  })
})
```

## 添加面数据

```js
const data = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.396119, 39.910796],
            [116.401041, 39.910674],
            [116.401176, 39.907511],
            [116.389249, 39.905694],
            [116.380859, 39.913228],
            [116.396119, 39.910796],
          ],
        ],
      },
    },
  ],
}
```

对map的操作最好放在style.load或load的事件处理器中, 否则可能添加数据时, map的style还未加载完成, 会抛出错误

```js
map.on('style.load', function () {
  map.addSource('polygon-source', {
    type: 'geojson',
    data,
  })
  map.addLayer({
    id: 'polygon-layer',
    type: 'fill',
    source: 'polygon-source',
    paint: {
      'fill-color': 'rgb(255, 0, 0)',
      'fill-opacity': 0.5,
    },
  })
  map.on('click', function () {
    map.setPaintProperty('polygon-layer', 'fill-opacity', 1)
  })
})
```

## 添加标记和弹出气泡

```js
map.on('style.load', function () {
  // 添加地图标记
  const marker = new Marker({
    color: 'red',
    draggable: true,
  })
  // Marker的方法返回当前实例, 因此可以链式调用
  marker.setLngLat(center).addTo(map)
  marker.on('dragend', function (e) {
    console.log(marker.getLngLat())
    marker.setLngLat(center)
    // 添加弹出气泡
    const popup = new Popup()
    popup.setLngLat(center).setHTML('<h1>又回来了!</h1>').addTo(map)
  })
})
```

## 添加地图控件

```js
map.on('style.load', function () {
  // 添加属性控件
  const attributionControl = new AttributionControl({
    compact: true,
    customAttribution: 'my-map',
  })
  map.addControl(attributionControl, 'top-left')
  // 添加全屏化控件
  const fullScreenControl = new FullscreenControl({
    container: document.querySelector('#map'),
  })
  map.addControl(fullScreenControl, 'top-right')
  // 添加定位控件
  const geolocateControl = new GeolocateControl()
  map.addControl(geolocateControl, 'top-right')
  // 添加缩放控件
  const zoomControl = new NavigationControl()
  map.addControl(zoomControl, 'top-left')
  // 添加比例尺控件
  const scaleControl = new ScaleControl()
  map.addControl(scaleControl, 'bottom-left')
})
```

## 自定义控件

```js
class MyPositionControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl myPositionControl'
    this._container.textContent = '定位'
    this._container.addEventListener('click', async () => {
      try {
        const res1 = await getPlaceByIp().then(res => res.city)
        try {
          const res2 = await getAdcode(res1).then(res => res.geocodes[0].location)
          this._map.flyTo({ center: res2.split(',').map(Number), zoom: 10 })
        } catch (error) {}
      } catch (error) {}
    })
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }
}

map.on('style.load', function () {
  // 添加自定义定位控件
  // 注册自定义控件点击事件,点击时,将flyto到指定位置
  const myPositionControl = new MyPositionControl()
  map.addControl(myPositionControl, 'top-right')
})
```

# Mock.js

可以生成随机数据,在vite环境下配合vite-plugin-mock-server拦截请求并返回生成的数据
