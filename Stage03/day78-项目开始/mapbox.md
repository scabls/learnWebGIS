# MapBox

学习完openLayers,接下来我们要学习的是另一个热门的框架mapbox,比起openLayers,mapbox提供给开发者的能力要强大得多,除开基础的地图展示交互功能,它还能提供其他的导航,搜索,数据服务等一些强大的功能,所以掌握这个框架也是gis开发人员必备的技能.

注意:如果希望在自己的项目中引入mapbox的地图服务,需要注册一个token,但是现在mapbox无法注册,所以可以直接使用这里提供的token:

```
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmdjaGFvY2hhbyIsImEiOiJjbGU1aDZ2eWUwMXp4M29udmFnNnNyZjBhIn0.2Kd0ZX06ReEdBnZ9XU4XUA';
```

还需要注意,如果你需要商用一些地图服务,务必要确认它是否有在当地运营的资质.

## 初体验

我们构建一个工程化的本地项目,然后快速引入mapbox:

先安装依赖`pnpm i mapbox-gl`,然后引入下面的代码:

```js
//引入mapxbox样式
import "mapbox-gl/dist/mapbox-gl.css";
//引入自定义样式
import "./style.css";
import mapboxgl from "mapbox-gl";
//引入token
mapboxgl.accessToken =
  "pk.eyJ1IjoiemhvbmdkaXNodW1hIiwiYSI6ImNsNXJoYXR5eTI2bGgzZW53d2didWF1c3AifQ.6vOplM2NQc_xnJW3aA5ZBA";
//创建地图实例
const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v9", //设置底图样式
  projection: "globe", //设置投影方式为球面 默认为平面 mapbox默认投影方式为墨卡托投影
  zoom: 2, // 缩放级别
  center: [0,0], // 初始中心点
  scrollZoom: false, //禁用滚轮缩放
});
map.on("load", function () {
  map.setFog({}); //添加雾霾效果
});
let urserInteracted = false; //用户是否交互过地图
//实现一个地球自转的效果
function spinGlobe() {
  if (urserInteracted) {
    return false; //用户已经交互过地图，则不再自转
  }
  const center = map.getCenter();
  center.lng -= 2;
  map.easeTo({ center, duration: 1000, easing: (e) => e });
}
spinGlobe();
map.on("moveend", () => {
  spinGlobe();
}); //地图移动结束后，调用spinGlobe函数实现自转
map.on("dragstart", () => {
  urserInteracted = true; //用户开始拖拽地图
});
map.on("mousedown", () => {
  urserInteracted = true; //用户开始点击地图
});

```

打开页面后,我们看到了一个自转的地球,当我们添加一些交互行为的时候,地球的自转停止了,有了ol的基础,理解上述的代码比较简单,mapbox同样是基本面向对象来设置api的,通过各种事件的回调来处理相应的逻辑.我们把焦点放到map上,进一步理解一下其中的核心概念:

* Container :指定挂载的容器
* Style:指定底图的样式
* Projection:指定投影形式,不同于ol,mapbox可以实现3D效果
* Zoom:缩放级别
* center:中心点位置 这里使用的是经纬度
* ....

这里面的绝大部分概念我们都很熟悉,除了这个style,它看起来对应的就是ol中的layer图层,现在我们来深入了解一下这里的Style.

## Style

在整个 Mapbox 生态系统中，地图的外观由地图样式决定。 Mapbox 样式是一个 JSON 对象，它准确定义了如何绘制地图。它定义了与地图外观相关的几乎所有内容。在 Mapbox GL JS 中，您可以在创建地图实例时或之后的任何时候设置地图的样式。

### 内置底图

Mapbox内部预设好了一批地图样式 :

- `mapbox://styles/mapbox/standard`
- `mapbox://styles/mapbox/standard-satellite`
- `mapbox://styles/mapbox/streets-v12`
- `mapbox://styles/mapbox/outdoors-v12`
- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/dark-v11`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/satellite-streets-v12`
- `mapbox://styles/mapbox/navigation-day-v1`
- `mapbox://styles/mapbox/navigation-night-v1`

默认会采用standard的样式风格,你可以在初始化的时候指定喜欢的样式,也可以在代码运行的时候切换样式,实现一个下拉框来切换地图样式

```js
const select = document.querySelector('select')
select.onchange =function(){
  const value = this.value
  map.setStyle(`mapbox://styles/mapbox/${value}`)
}
```

### 第三方底图

除了加载内置的底图外,mapbox同样可以加载其他的底图服务,比如加载高德地图:

```js
const map = new mapboxgl.Map({
  container: "map", // container id
  // style: `mapbox://styles/mapbox/streets-v12`, //设置底图样式
  style: {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [
          "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        ],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: "my-tiles", 
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  projection: "globe", //设置投影方式为球面 默认为平面 mapbox默认投影方式为墨卡托投影
  zoom: 6, // 缩放级别
  center: [114.305469, 30.59375], // 初始中心点
  // scrollZoom: false, //禁用滚轮缩放
});
```

mapbox和ol在本质上的逻辑是类似的,仍然是设置瓦片数据源然后加载到图层上.

### 样式修改

通过对图层的指定操作,我们可以实现对样式的修改,一起来试试,在Mapbox中可以通过`map.getStyle()`方法来获取图层:

```js
map.on("click", () => {
  let layers = map.getStyle().layers;
  console.log(layers) //可以获取默认底图的所有图层信息 继而可以修改
  //将water图层的填充色修改为金色
  map.setPaintProperty('water','fill-color','gold')
  //除了修改图层的绘制样式 还可以setLayoutProperty来控制图层的显示隐藏
})
```

### 设置大气层

当将projection设置为globe的时候,我们可以在网页上看到一个3D效果的地球,mapbox提供了一个专门的api来设置大气层相关样式:

```js
map.on('style.load', () => {
  map.setFog({
    color: 'rgb(186, 210, 235)', // Lower atmosphere
    'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
    'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    'space-color': 'rgb(255,0,0)', // Background color
    'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
  });
});
```

## camera

mapbox和ol最大的一个区别就在于mapbox中存在一个相机的概念,mapbox能展示不同角度的3D效果,通过相机便能实现这些角度的控制变换:

在初始化地图实例的时候可以来设置这些参数:

```js
const map = new mapboxgl.Map({
  container: "map", // container id
  style: `mapbox://styles/mapbox/streets-v12`, //设置底图样式
  projection: "globe", //设置投影方式为球面 默认为平面 mapbox默认投影方式为墨卡托投影
  zoom: 6, // 缩放级别
  center: [114.305469, 30.59375], // 初始中心点
  //这2个相机参数都是默认为0
  pitch:0, // 俯仰角度
  bearing:0 // 方位角度
});
//在页面上绑定2个button来调整这2个角度
const pitchBtn = document.querySelectorAll(".buttons button")[0];
const bearingBtn = document.querySelectorAll(".buttons button")[1];
pitchBtn.addEventListener("click", () => {
  let pitch = map.getPitch();
  pitch += 10;
  map.setPitch(pitch);
});
bearingBtn.addEventListener("click", () => {
  let bearing = map.getBearing();
  bearing += 10;
  map.setBearing(bearing);
});
```

再来介绍一些和相机视角相关的api:

* flyTo 可以实现视图的飞行效果

  ```js
  map.on("click", () => {
    map.flyTo({
      //飞行的中心点
      center: [112.93, 28.23],
      //飞行之后地图的放大级别
      zoom: 13,
      //控制飞行的速度 0~1 值越小,速度越慢
      speed: 0.2,
      /* 俯仰角0-90 */
      pitch: 80,
    });
  });
  ```

* easeTo 可以实现视图的平移效果 它和flyTo的区别就在于flyTo实现的是类似飞机曲线移动的效果

  ```js
  map.on("click", (evt) => {
    map.easeTo({
      center: evt.lngLat,
      duration: 3000
    })
  })
  ```

* jumpTo 实现地图的跳转 没有动画效果

* panTo 实现平移效果 api用法和easeTo略有区别:

  ```js
  map.on("click", (evt) => {
    map.panTo(evt.lngLat, { duration: 2000 })
  })
  ```

* rotateTo 实现旋转效果

  ```js
  map.on("click", (evt) => {
   map.rotateTo(180, { duration: 2000 });
  })
  ```

* setMaxbounds 可以设置视图的显示范围

  ```js
    // set the bounds of the map
    const bounds = [
      [114, 30],
      [115, 32],
    ];
    /* 设置最大显示范围 */
    map.setMaxBounds(bounds);
  ```

## Source

在style中我们介绍了一下mapbox中内置的地图样式,除此之外,和ol类似,它也可以加载不同种类的数据源,下面来逐一介绍:

### Canvas

回忆完毕如何在ol中绘制canvas之后,我们再来看看mapbox中是如何做的,基本思路仍然一样,添加一个图层,这个图层中添加一个数据源,这个数据源在地图指定位置绘制canvas即可:

```js
//先在页面上准备好一个canvas 这里可以将其隐藏掉 隐藏了怎么显示内容?这里mapbox做了特殊处理 所以不用担心
<canvas id="canvas" width="300" height="300" style="display: none"
      >canvas not supported</canvas
    >
//然后绘制一个图形
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
  ctx.strokeStyle = "blue";
  ctx.stroke();
}
drawCircle();
//底图加载完毕后 将canvas和mapbox关联起来
map.on("load", () => {
  map.addSource("canvas-source", {
    type: "canvas",
    canvas: "canvas",
    coordinates: [
      //分别是左上 右上 右下 左下4个角
      [91.4461, 21.5006],
      [100.3541, 21.5006],
      [100.3541, 13.9706],
      [91.4461, 13.9706],
    ],
  });
  map.addLayer({
    id: "canvas-layer",
    type: "raster",
    source: "canvas-source",
  });
});
```

### GeoJson

GeoJson作为最重要的gis数据格式,mapbox同样提供了很好的支持,现在详细介绍一下各种GeoJson数据的加载

#### 点数据

首先准备一个点数据的GeoJson:

```js
{
    'type': 'FeatureCollection',
    'features': [
        {
            // feature for Mapbox DC
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    -77.03238901390978, 38.913188059745586
                ]
            },
            'properties': {
                'title': 'Mapbox DC'
            }
        },
        {
            // feature for Mapbox SF
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-122.414, 37.776]
            },
            'properties': {
                'title': 'Mapbox SF'
            }
        }
    ]
}
```

通常情况下,我们需要在点数据的位置展示一些内容,例如下面的示例我们展示一个logo:

```js
map.loadImage(
    "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    (e, image) => {
      if (e) throw e;
      map.addImage("custom-marker", image);
      map.addSource("points", {
        type: "geojson",
        data: pointsData,
      });
      map.addLayer({
        id: "points-layer",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "custom-marker",
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    }
  );
```

在mapbox中图层layer被细分成了很多类别用于展示不同的数据:

1. **`fill`**：用于渲染多边形区域，通常用于显示地理区域的轮廓或填充颜色。
2. **`line`**：用于渲染线性要素，如道路、河流等。
3. **`symbol`**：用于渲染图标和文本标签，通常用于显示地名、POI（兴趣点）等。
4. **`circle`**：用于渲染圆形要素，通常用于显示点数据，如位置标记。
5. **`heatmap`**：用于渲染热力图，通常用于显示数据密度分布。
6. **`fill-extrusion`**：用于渲染3D立体多边形，通常用于显示建筑物等立体要素。
7. **`raster`**：用于渲染栅格数据，如卫星图像、地形图等。
8. **`background`**：用于渲染地图背景，通常用于设置地图的背景颜色或图案。
9. **`hillshade`**：用于渲染地形阴影，通常用于显示地形的高低起伏。
10. **`custom`**：用于自定义渲染逻辑，通常用于实现复杂的渲染效果。

我们这里用作图标展示对应的类型即是symbol,之前展示canvas使用的是raster

#### 线数据

在一些情景下,GeoJson记录的是线数据的时候,也可以使用对应的图层来加载这些数据:

先准备一个线数据,这里提供一个获取数据来源的[网站](https://geojson.io/#map=15.43/30.467581/114.397506),我们在武汉市关山大道上绘制了一条红线:

```js
map.on("load", () => {
  map.addSource("line", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [114.40298203993285, 30.469448842057616],
          [114.4027749862031, 30.466689543911514],
        ],
        type: "LineString",
      },
    },
  });
  map.addLayer({
    id: "line-layer",
    type: "line",
    source: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "rgb(255, 0, 0)",
      "line-width": 10,
    },
  });
});
```

如果我们想修改数据源,例如在页面上设置一个按钮,点击按钮后去掉之前的线,画一条新的线,可以这么做:

```js
btn.addEventListener("click", () => {
  const lineSource = map.getSource("line");
  lineSource.setData({
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [114.39718453548784, 30.46439693325904],
        [114.4005929584307, 30.465000979624875],
      ],
      type: "LineString",
    },
  });
});
```

#### 面数据

加载面数据只需要修改layer的图层类型即可:

```js
map.on("load", () => {
  map.addSource("polygon", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [
              [
                [114.40085477088962, 30.46737251995451],
                [114.40085477088962, 30.46618369727986],
                [114.40140006263454, 30.466031637518668],
                [114.4016406325232, 30.467013109978453],
                [114.40220196226056, 30.467068403907163],
                [114.40223403824564, 30.46737251995451],
                [114.40085477088962, 30.46737251995451],
              ],
            ],
            type: "Polygon",
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "polygon-layer",
    type: "fill",
    source: "polygon",
    paint: {
      "fill-color": "red",
      "fill-opacity": 0.5,
    },
  });
});
```

### 静态图片

还可以向底图上添加静态图片:

```js
map.on("load", () => {
  map.addSource("image", {
    type: "image",
    url: "/peiqi.jpeg",
    coordinates: [
      [113.65456584538595, 31.177440937797513],
      [115.42344469914298, 31.177440937797513],
      [115.42344469914298, 29.606141171103843],
      [113.65456584538595, 29.606141171103843],
    ],
  });
  map.addLayer({
    id: "image-layer",
    type: "raster",
    source: "image",
  });
});
```

### 栅格瓦片

通常我们在使用mapbox的时候会使用它内置的底图样式,但是这个也是可以调整的,比如我们完全可以在mapbox中加载高德底图:

```js
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        //高德矢量底图瓦片
        tiles: [
          "http://webst01.is.autonavi.com/appmaptile?style=9&x={x}&y={y}&z={z}"
        ],
        tileSize: 256,
        attribution:
          "Tiles &copy; <a href='http://www.autonavi.com/' target='_blank'>AutoNavi</a>",
      },
    },
    layers: [
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  center: [114.40298203993285, 30.469448842057616],
  zoom: 6,
});
```

## controls and markers

接下来我们学习一下mapbox中的控件和标记:

先来看一下内置的常用控件:

#### Attribution Control

可以给地图添加一些贡献信息:

```js
const attribution = new AttributionControl({
  compact: true,
  customAttribution: "&copy;hello world",
});
map.addControl(attribution);
```

#### FullScreen Control

全屏显示地图,可以指定哪个元素全屏显示,默认情况下即是地图:

```js
const fullscreenControl = new FullscreenControl({
  container: document.querySelector("#map"),
});
map.addControl(fullscreenControl);
```

#### Geolocate Control

可以快速定位到当前设备的位置,但通常情况下这个定位往往可能并不准确.

```js
const geolocate = new GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
  showUserHeading: true,
});
map.addControl(geolocate);
```

#### Navigation Control

缩放和旋转控件:

```js
const navigation = new NavigationControl({
  // visualizePitch: true,
});
map.addControl(navigation);
```

#### Scale Control

地图标尺控件:

```js
const scale = new ScaleControl();
map.addControl(scale);
```

### Marker

mapbox中提供了Marker类可以快速让开发者在地图上添加标记,通过设置位置可以在地图上添加一个标记,可以查询官网上的更多配置项来进一步调整marker

```js
const marker = new Marker()
  .setLngLat([114.40298203993285, 30.469448842057616])
  .addTo(map);
```

### Popup

Popup弹窗同样必不可少,而且popup还可以和marker结合来使用:

```js
map.on("click", (e) => {
  const popup = new Popup();
  popup.setLngLat(e.lngLat).setHTML("<h1>Hello World</h1>").addTo(map);
});
```

```js
const marker = new Marker()
  .setLngLat([114.40298203993285, 30.469448842057616])
  .setPopup(new Popup().setHTML("<h1>Hello World</h1>"))
  .addTo(map);
```

## Events

mapbox中对于常见的交互操作都封装了对应的交互事件,事件源通常包括`map` `popup` `marker` 等,绑定事件使用`on`方法,解除绑定使用`off`方法.

#### MapBoxZoomEvent

当通过鼠标或者键盘操作改变缩放级别的时候,会触发对应的zoom事件,共包括:

```js
"boxzoomstart" | "boxzoomend"|"boxzoomcancel"
```

#### MapDataEvent

地图数据加载的时候,会触发对应的数据加载事件:

```js
"data"` | `"dataloading"` | `"styledata"` | `"styledataloading"` | `"sourcedata"` | `"sourcedataloading"
```

#### MapMouseEvent

常见的鼠标事件在map上也都有实现,具体事件名可以查询官方文档.

## plugins

Mapbox是一个生态比ol更强大的库,除开核心的功能之外,它还提供了丰富的插件系统,这些插件能够帮助我们实现更复杂的功能需求,介绍一下最常用的一批插件:

### 导航插件

导航插件可以让用户在地图上实现多种导航功能:

注意,如果你的项目使用vite构建的工程化项目,引入插件最好使用cdn的形式,用模块化引入存在一些环境问题:

```html
 <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js"></script>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css"
    type="text/css"
  />
```

```js
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  }),
  "top-left"
);
```

### 绘图插件

在mapbox中如果想在地图上实现绘图交互需要借助相关插件来实现:

```js
//安装插件
pnpm i @mapbox/mapbox-gl-draw
//引入插件和样式
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
//添加插件
const draw = new MapboxDraw()
map.addControl(draw,'top-left')
```

此时在浏览器上就可以利用插件来实现要素的绘制了,如果想做一些起始的修改,可以在实例化的时候传入指定的配置选项

还有更多的插件都可以在官方文档和社区找到,根据实际的业务开发需求去匹配.

我们上面介绍的基本都是Mapbox作为一个地图框架提供的能力,但是Mapbox的强大之处远不止此,它还能提供强大的接口服务,但是受限于网络访问,中国开发者更推荐使用一些国内的地图服务,例如高德地图 百度地图等,下一章节我们会以高德地图为例来学习一下国内的地图服务开发知识.

