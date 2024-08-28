### 伪元素

#### 概念

```html
伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。

在html骨架中，不是通过HTML标签创建，而是css模拟出来的标签效果
```

#### 作用

```
模拟标签效果，对被选择元素的特定部分修改样式

一般用在页面的非主体部分,实现某些辅助效果(外卖网按钮动画),某些情况下还可以简化代码
```

#### 写法

```css
selector::pseudo-element {
  property: value;
}
一个选择器中只能使用一个伪元素。伪元素必须紧跟在语句中的简单选择器/基础选择器之后。
```

```css
::before 在父元素内容位置的最前面添加一个伪元素
::after 在父元素内容位置的最后面添加一个伪元素
```

#### 注意

```css
1.必须设置content才能生效，哪怕是空的content: ""
2.默认行级元素
```



### 浮动

#### 特点

```
1.脱标，在标准流中不占位置
2.比标准流层级高，会覆盖标准流的元素
3.下一个浮动元素会在上一个浮动元素后面进行左右排布（用来实现块元素水平排布）
```

#### 注意点

```
1.浮动元素会受到上面非浮动元素边界的影响，不会浮上去，只会左右平移。一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。浮动元素之前的元素不会受到影响。允许浮动元素之后的文本和内联元素环绕它。
```

```css
2.行级元素浮动后可以设置宽高
	因为浮动之后会脱标，脱标后会不受标准流约束，inline等行级元素display自动变为block，可以设置宽高
	但是不限于浮动，只要是脱标，比如定位（绝对定位、固定定位）导致的行级元素脱标，都会块级化，可以设置宽高，但初始宽高由内容决定。
好处
	将来无需给脱标的行级元素添加display: block这个属性,就可以给行级元素设置宽高。
```

```
3.块级元素脱标后
	若宽高都未设置，宽高变为由内容决定
```



#### 弊端

```
浮动导致脱标，无法撑起标准流中父元素的高度，导致父元素高度塌陷，影响之后的布局
```

#### 清除浮动

```
方案一：给父元素设置高度

弊端：某些布局，需求父元素高度由内容决定，不能设置固定高度
```

```css
方案二：额外标签法
    1.在父元素内容的最后面添加一个块元素
    2.给这个块元素设置clear：both属性
弊端
	影响代码阅读
```

```css
方案三：单伪元素法
	使用伪元素替代额外标签,且伪元素为块元素
    selector::after {
        content: "";
        display: block;
        /* 块级表格元素也可以 */
        /* dispaly: table */
        clear: both;
    }

弊端：使用次数多，麻烦

改进：
	将清除浮动抽取到一个公共的类中，将来需要清除浮动时，只需要在元素标签添加这个类即可。（层叠性思想）
    类名一般设置为clearfix。
    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }
```

```css
方案四：双伪元素清除法（小米公司做法）
	在单伪元素基础上再添加一个伪元素，这个伪元素在父元素内容的最前面，用来解决margin塌陷问题
	（本质：添加前后两个伪元素，before用来解决margin塌陷，after用来清除浮动）
 	/* 解决塌陷 */
    .clearfix::before {
        content: "";
        /* 使用block不行，仍会出现margin塌陷，必须使用table */
        display: table;
    }
	 /* 清除浮动 */
    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

改进：将前后伪元素相同的部分抽取处理（css层叠性）
    .clearfix::before,
    .clearfix::after {
        content: "";
        /* 使用block不行，仍会出现margin塌陷，必须使用table */
        display: table;

    }
    .clearfix::after {
        clear: both;
    }
```

### 定位

#### 简介

```css
概念
	布局方式，让元素自由摆放在任意位置，实现元素的叠加效果
		可以理解为定位给box外的margin外又套了一层position
应用场景
	1.盒子之间的层叠效果。定位之后，元素的层级是最高的，可以叠加在其它盒子上面
	2.让盒子始终固定在某一位置
使用
	1.设置定位方式：position属性
	2.设置偏移值：水平和垂直方向就近各取一个
			注意：就近取！
		水平：left reght
			当left和right 同时指定时，元素的位置会被重复指定。当容器是从左到右时，left的值会被优先设定；当容器是从右到左时，					right的值会被优先设定。
		垂直：top bottom
			当top和bottom同时指定时，并且 height没有被指定或者指定为auto的时候，top和bottom 都会生效，在其他情况下，如果				height被限制，则top属性会优先设置，bottom属性则会被忽略。
默认
	默认position: static
	该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
```

#### 相对定位

```css
概念
	相对于自身默认位置
语法
	position: relative
```

```
特点 
	没有脱标，占据空间
参照原点：
	元素默认位置的四个角，取决于偏移量的方位属性名
应用场景
    1.用于小范围内的移动
    2.子绝父相(常见的布局技巧,子元素绝对定位,父元素相对定位,可以让子元素在父元素任意位置上移动)
```

#### 绝对定位

```css
概念
	绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<html>
语法
	position: absolute
```

```css
特点：
	脱标，不占位
		注意：脱标会使行级元素变成块级元素
参照原点：定位方式非static的祖先元素的border内的四个角，取决于偏移量的方位属性名，
	如果没有符合条件的祖先元素，则以body的border内的四个角为参照
应用场景：
	子绝父相 
		1.设置子元素position: absolute
		2.设置父元素position: relative
```

#### 子绝父相

```
概念
	常见的布局技巧,子元素绝对定位,父元素相对定位,
作用
	可以让子元素在父元素任意位置上移动
注意
	父元素最好使用相对定位，不会脱标，对页面布局影响小
```

##### 元素居中

```css
/*
居中
	居中就是把子元素的50%标记处和父元素的50%标记处对齐
方式一：固定值
    偏移量计算：(container width) * (position x%) - (image width) * (position x%) = s = (x offset value)
            (container width) * (position y%) - (image width) * (position y%) = s = (y offset value)         
*/
top: 150px;
left: 150px;
/* 弊端：写死偏移值，如果父元素或子元素的尺寸发生变化，需要重新计算偏移值 */
```

```css
/* 方案二：百分比偏移+margin
偏移量等于父空间border内长宽乘以百分比
margin是子元素盒子宽高的一半负值*/
top: 50%;
left: 50%;
margin-left: -50px;
margin-top: -50px;
/* 弊端：margin的值也是固定值，子元素宽高改变时要重新计算 */


margin-top: -50%;
margin-left: -50%;
/* 发现回到了原点，因为margin的百分比是相对于父元素border内的宽设置的，而此时父元素宽高相等 */
```

```css
/* 方案三：百分比偏移+transform */
transform: translate(-50%, -50%);

/* 或者分开写： */
transform: translateX(-50%) translateY(-50%);

/* 但是
transform: translateX(-50%);
transform: translateY(-50%);
后者会覆盖前者，导致子元素位置不准确
*/

注意 tanslate的百分比计算方式是，box宽高（content+padding+border）*百分比
	偏移值参照原点是偏移元素左上角
```

#### 固定定位

```css
概念：相对于浏览器窗口进行的定位
语法
	position: fixed
特点
	脱标，不占位置
		注意脱标会使行级元素块级化
参照原点
	body的border内的四个角，取决于偏移量的方位属性名
应用场景
	让盒子固定在屏幕的某一位置上
```

#### 粘性定位

```
粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。
```



#### 层级关系

```css
不同布局之间的层级关系
	标准流 < 浮动 < 定位（定位的层级最高，可浮在其他元素之上）
	
不同定位之间的层级关系
	同级别，但是后出现的元素在上层
	
z-index
	可以设置元素的堆叠顺序，值越大，层级越高
		注意：position为默认值static时，z-index无效，若要定位且不修改位置，建议设置position为relative
```

### 字体图标

```
概念
	本质是一个字符，可以灵活的修改它的样式，降低服务器请求次数
```

```html
iconfont展示
	概念
		阿里巴巴提供的一套字体库,用于展示图标(使用之前需要下载字体包)
	使用
		1,将下载好的字体包拖到项目中
		2,引入字体包中的css样式
		3,挑选对应的图标,并获取类名,展示到页面
<head>
	<link rel="stylesheet" href="./iconfont/iconfont.css">
</head>
<body>
    <span class="iconfont icon-computer"></span>
    <span class="iconfont icon-phone"></span>
</body>
```

```html
font-awesome展示		
    概念
        在线的字体库(可以不下载字体包,直接在线引入)
    使用
        1,将font-awesome的环境文件拖到项目中
        2,引入项目环境中的css样式
        3,在网站中查找对应的图标,直接复制过来即可
<head>
    <link rel="stylesheet" href="./fontawesome/css/all.min.css">
</head>
<body>
	<i class="fa-brands fa-github"></i>
</body>
```

```css
原理
	图标都是用类+伪元素插入的，可以用font-size调整大小，color调整颜色，但要注意选择器优先级
修改样式
    可以使用类选择器来修改样式，优先级一定要大于引入的默认选择器优先级
    建议只选择要修改的图标的类，不要选择所有图标的类
.icon-computer,
.icon-phone {
    font-size: 2rem;
}
```

