# svg

- svg是一门标记语言(html和svg都是xml(标记语言)的方言, 通过在页面中添加标签的形式来实现绘图
  - 在绘图性能上canvas优于svg 
- svg绘制的是矢量图形,不会因为放大失真;canvas绘制的是位图,放大后会失真;所以svg适合绘制一些图标
- svg的标签绘制到页面上是dom形式存在,所以svg可以方便地添加dom操作和动画效果

```svg
<svg width="300" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="150 150 300 300">
    <rect width="100%" height="100%" fill="red"></rect>
    <circle cx="150" cy="150" r="50" fill="blue"></circle>
    <text x="150" y="150" fill="white" font-size="30" text-anchor="middle" dominant-baseline="middle">SVG</text>
</svg>
```

- svg放到了一个单独的.svg文件中需要在标签上添加命名空间 `xmlns="http://www.w3.org/2000/svg"`
- viewBox可以指定svg显示的区域 然后将这块区域内容对应的显示到svg的宽高上

> viewBox 属性允许指定一个给定的一组图形伸展以适应特定的容器元素。
>
> viewBox 属性的值是一个包含 4 个参数的列表 min-x, min-y, width and height，以空格或者逗号分隔开，在用户空间中指定一个矩形区域映射到给定的元素，
>
> 不允许宽度和高度为负值，0 则禁用元素的呈现。

## 常见svg标签

```html
    <style>
      svg {
        background-color: pink;
      }
    </style>
```

```html
    <!-- rect 绘制矩形 x 起始x坐标 y 起始y坐标 width 矩形宽度 height 矩形高度 stroke 边框颜色 fill 填充颜色 stroke-width 边框宽度 rx 圆角半径 ry 圆角半径 -->
    <!-- circle 绘制圆形 cx 圆心x坐标 cy 圆心y坐标 r 半径  -->
    <!-- ellipse 绘制椭圆 cx 圆心x坐标 cy 圆心y坐标 rx 水平半径 ry 垂直半径 -->
    <!-- line 绘制直线 x1 起始x坐标 y1 起始y坐标 x2 终止x坐标 y2 终止y坐标 stroke 边框颜色 stroke-width 边框宽度 -->
    <!-- polyline 绘制折线 points 可以传入多个点 -->
    <!-- polygon 绘制多边形 points  -->
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- 
      填充默认黑色
      可以手动设置fill='none'或者fill='transparent'来取消填充
      -->
      <rect
        x="10"
        y="10"
        rx="2"
        ry="2"
        width="30"
        height="30"
        stroke="blue"
        fill="transparent"
        stroke-width="5"
      />
      <circle
        cx="30"
        cy="80"
        r="20"
        stroke="skyblue"
        fill="transparent"
        stroke-width="5"
      />
      <ellipse
        cx="80"
        cy="80"
        rx="20"
        ry="10"
        stroke="red"
        fill="transparent"
        stroke-width="5"
      />
      <ellipse
        cx="130"
        cy="80"
        rx="10"
        ry="20"
        stroke="red"
        fill="transparent"
        stroke-width="5"
      />
      <line
        x1="20"
        y1="120"
        x2="200"
        y2="120"
        stroke="green"
        stroke-width="5"
      />
      <polyline
        points="20 150 20 200 30 200 50 120"
        stroke="purple"
        fill="transparent"
        stroke-width="5"
      />
      <polygon
        points="20 150 20 200 30 200 50 120"
        stroke="purple"
        fill="transparent"
        stroke-width="5"
      />
    </svg>
```

## svg中的路径

```svg
    <svg width="300" height="200">
      <!-- path标签的d属性用于定义路径的形状，它的值是一个描述路径的命令序列。 -->
      <!-- 
        M x y 表示将画笔移动到坐标（x，y）处
        L x y 表示从当前位置画一条直线到坐标（x，y）处
        l dx dy 表示从当前位置画一条相对直线到坐标（x+dx，y+dy）处
        Z 表示闭合路径
        建议L和l不要混合使用
      -->
      <path d="M 50 50 L 100 50 l 0 50 Z" stroke="black" fill="none"></path>
      <!-- 绘制二次贝塞尔曲线 三次贝塞尔曲线 异形圆弧都有对应的命令序列 -->
    </svg>
```

## svg的样式

```svg
    <svg>
      <!-- 样式可以通过标签上的属性设置，也可以通过css样式设置 -->
      <!-- 为了把svg的样式和普通css样式分离，可以把样式定义在defs标签中 -->
      <!-- 
        stroke-opacity 控制描边的透明度
        stroke-linecap 控制描边的端点形状
        stroke-linejoin 控制描边的拐角形状
        stroke-dasharray 控制描边的虚线样式
       -->
      <defs>
        <style>
          rect {
            width: 80px;
            height: 80px;
            fill: red;
            fill-opacity: 0.5;
            stroke: blueviolet;
          }
          line {
            stroke: green;
            stroke-width: 5;
            stroke-opacity: 0.5; /* 描边透明度 */
            stroke-linecap: round; /* 描边的端点类型 */
            stroke-linejoin: round; /* 描边的连接类型 */
            stroke-dasharray: 10; /* 描边的虚线间隔 */
          }
        </style>
      </defs>
      <rect x="10" y="10"></rect>
      <line x1="10" y1="10" x2="80" y2="80"></line>
    </svg>
```

### 渐变

```svg
    <svg>
      <defs>
        <!-- 
        渐变标签上的坐标属性设置渐变的起点和终点 
        x1="0" y1="0" x2="1" y2="1"表示从左上角到右下角
        -->
        <linearGradient id="linearGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="red"></stop>
          <stop offset="100%" stop-color="blue"></stop>
        </linearGradient>
        <style>
          rect {
            width: 80px;
            height: 80px;
            fill: url(#linearGradient);
            fill-opacity: 0.5;
            stroke: blueviolet;
          }
        </style>
      </defs>
      <rect x="10" y="10"></rect>
    </svg>
```

### 变形

```svg
    <svg>
      <defs>
        <linearGradient id="linearGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="red"></stop>
          <stop offset="100%" stop-color="blue"></stop>
        </linearGradient>
        <style>
          rect {
            width: 100px;
            height: 100px;
            fill: url(#linearGradient);
            fill-opacity: 0.5;
            stroke: blueviolet;
          }
        </style>
      </defs>
      <!-- 
      svg的transform属性可以对元素进行变形
      这个样式只能在标签上的transform属性中使用
      -->
      <!-- 
        translate 可以平移坐标原点 
        rotate 可以旋转坐标系
        scale 可以缩放坐标系
			-->
      <rect x="10" y="10" transform="translate(100, 100)"></rect>
      <g transform="rotate(45) scale(2, 2)">
        <!-- g元素将其内的元素进行分组，并对其进行统一变形 -->
        <rect x="10" y="10"></rect>
        <rect x="0" y="0"></rect>
      </g>
    </svg>
```

### 过渡

```html
    <svg>
      <defs>
        <style>
          rect {
            width: 100px;
            height: 100px;
            fill-opacity: 0.5;
            stroke: blueviolet;
            transition: all 0.5s; /* 过渡效果 */
          }
        </style>
      </defs>
      <rect x="10" y="10" transform="translate(100, 100)"></rect>
    </svg>
    <button class="green">绿色</button>
    <button class="red">红色</button>
    <script>
      const greenButton = document.querySelector('.green')
      const redButton = document.querySelector('.red')
      const rect = document.querySelector('rect')
      greenButton.addEventListener('click', () => {
        rect.setAttribute('fill', 'green')
      })
      redButton.addEventListener('click', () => {
        rect.style.fill = 'red'
      })
    </script>
```

## 描边动画

```html
    <svg>
      <defs>
        <style>
          .circle,
          .rect {
            fill: none;
            stroke: green;
            stroke-width: 5;
            stroke-opacity: 0.5;
            /* 
            troke-dasharray: 252;  大于等于周长 
            stroke-dashoffset: 252; 与dasharray相等 
            */
          }
          @keyframes dash {
            100% {
              stroke-dashoffset: 0;
            }
          }
        </style>
      </defs>
      <circle cx="50" cy="50" r="40" class="circle"></circle>
      <rect x="100" y="100" width="80" height="80" class="rect"></rect>
    </svg>
    <script>
      const circle = document.querySelector('.circle')
      const rect = document.querySelector('.rect')
      const circleLength = circle.getTotalLength()
      const rectLength = rect.getTotalLength()
      circle.setAttribute('stroke-dasharray', circleLength)
      circle.setAttribute('stroke-dashoffset', circleLength)
      circle.style.animation = 'dash 2s linear forwards'
      rect.setAttribute('stroke-dasharray', rectLength)
      rect.setAttribute('stroke-dashoffset', rectLength)
      rect.style.animation = 'dash 2s linear forwards'
    </script>
```

