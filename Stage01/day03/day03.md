### 表格

```html
    table标签用于创建表格，
        border属性设置边框宽度，
        width和height属性设置表格的宽度和高度，
        cellspacing属性设置单元格之间的间距，
        cellpadding属性设置单元格内容与单元格边框的距离。
        align 规定表格相对周围元素的对齐方式
    tr标签用于创建表格行，
        align属性设置单元格内容的对齐方式，
        bgcolor属性设置单元格背景色。
    th标签用于创建表头单元格，
        比td多了居中和加粗的效果
        align属性设置单元格内容的对齐方式。
        bgcolor属性设置单元格背景色。
    td标签用于创建数据单元格，
        align属性设置单元格内容的对齐方式。
        bgcolor属性设置单元格背景色。
```

```html
    语义化标签
    thead
        加上thead之后,这一行被视为表头,高度由内容决定
    tbody
    	定义表格的主体
    tfoot
    	定义表格的页脚
```

```html
跨行/跨列
    th/td标签的colspan和rowspan属性可以实现表格的跨列跨行功能。
    colspan属性用于横向跨列，rowspan属性用于纵向跨行。
    注意：跨行跨列占据空间，被跨的单元格不要写
```

```html
应用场景
	早期可以用于布局元素(中地旅游网)
	现在可以用于对齐元素(对齐表单元素)
```



### CSS概念及入门

#### 概念

```
层叠样式表
```

#### 组成

```
选择器
	用于选择元素
声明块
	用于设置样式
```

### CSS引入方式

#### 行内样式

```
做法
	使用style属性，直接在html标签上添加，也叫内联样式
特点
	简单，耦合性强，优先级高，不利于代码与样式分离
```

#### 内部样式

```
做法
	使用style标签，结合css选择器
特点
	代码与样式分离，但只能在当前页面重用
```

#### 外部样式

```
做法
	将css抽取到css文件中，通过link标签引用
特点
	代码与样式分离，可以在多个页面使用，统一网站风格
```

#### 优先级

```
行内样式最大
内部样式和外部样式优先级由顺序决定，后者覆盖前者
```

### CSS基本选择器

#### id选择器

```
概念
	通过元素的唯一标识（ID）选择
方法
	#id
	
常在锚链接和表单标签使用
```

#### 类选择器

```
概念
	通过元素的class属性的值选择
方法
	.类名
```

#### 元素选择器

```
概念
	通过元素的标签名选择
方法
	标签名
```

#### 基本选择器的优先级

```
内联>id>class>元素
越具体，优先级越高
```

### CSS扩展选择器

#### 并集选择器

```
作用
	一次性选择多个选择器,设置相同的样式
语法
	选择器a,选择器b
```

#### 交集选择器

```
作用
	选择既满足a选择器,又满足b选择器的元素
语法
	选择器a选择器b
```

#### 后代选择器

```
作用
	选择某一个元素下符合条件的后代元素
语法
 	选择器a 选择器b
```

#### 子代选择器

```
作用
	选择某一个元素下符合条件的子代元素
语法
	选择器a>选择器b
```

#### 相邻兄弟选择器

```
作用
	选择某一个元素后面相邻的另外一个元素
语法
	选择器a+选择器b
```

#### 后续兄弟选择器

```
作用
	选择某一个元素后面的所有兄弟元素
语法
	选择器a+选择器b
```



#### 属性选择器

```css
作用
	通过元素的属性来选择特定的元素
语法
	[属性名] 只通过属性名来选择元素(会忽略属性值,只有属性名一样,就会被选中)
	[属性名=属性值] 必须要满足属性名和属性值都一样,才能被选择(选择特定的某一批元素)
	[attribute~=value]	表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少有一个值为 value
	[attr^=value]	表示带有以 attr 命名的属性，且属性值是以 value 开头的元素。
	/* value不强制使用引号括起来，但在value为符号或者包含空格的时候必须要加引号。所以建议都加 */
```

#### 伪类选择器

```css
伪类
	什么是伪类？
	伪类是选择器的一种，它用于选择处于特定状态的元素，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。
	伪类就是开头为冒号的关键字：

作用
	CSS伪类是用来添加一些选择器的特殊效果。
语法
	a:link {color:#FF0000;} /* 未访问的链接 */
    a:visited {color:#00FF00;} /* 已访问的链接 */
    a:hover {color:#FF00FF;} /* 鼠标划过链接 */
    a:active {color:#0000FF;} /* 已选中的链接 */
    	这个样式可能会被后声明的其他链接相关的伪类覆盖，这些伪类包括 :link，:visited 和 :hover。为保证样式生效，需要把:active 的样式放在所有链接相关的样式之后。这种链接伪类先后顺序被称为 LVHA 顺序：:link — :visited — :hover — :active。
    
    :not(selector)		not(p)——选择每个并非p元素的元素
```

#### 伪类结构选择器

```css
概念
	不需要再html标签中添加额外的属性(id,class),直接根据元素在html中的结构关系来选择元素
区别
	普通选择器:在html结构中有属性,比如id选择器,类选择器,都需要给标签添加额外的属性
	伪类结构选择器:在html中没有标识,根据逻辑上的关系来选择元素
选择一个
	:first-child 匹配其父元素中的第一个子元素。
	:last-child 匹配其父元素中的最后一个子元素。
	:nth-child(n) 匹配父元素中的第 n 个子元素，元素类型没有限制。
	:not(:nth-child(n)) 选择第n个之外的子元素 
选择多个
	n可以是一个数字
		从1开始,代表第n个元素
	n可以是关键字
		odd 奇数  even偶数
	n可以是一个公式
		an+ b 描述：a代表一个循环的大小，N是一个计数器（从0开始），以及b是偏移量（初始值）
		2n+1:代表奇数
		2n:代表偶数
		-n+3 代表前三个
		n+4 代表第4个及以后
		/* an+b顺序不能错！ */
注意
	 :nth-child(n) 选择器匹配父元素中的第 n 个子元素，元素类型没有限制。
     :nth-of-type(n)选择器匹配同类型中的第n个同级兄弟元素。元素类型有限制。
```

#### emmet语法

##### 本质

*选择器*

```css
	/ *ul>li{第$个li元素}*5 */

        <li>第1个li元素</li>
        <li>第2个li元素</li>
        <li>第3个li元素</li>
        <li>第4个li元素</li>
        <li>第5个li元素</li>
```
