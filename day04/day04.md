### 常见属性入门

```css
尺寸
	width
	height
	/*缩写：w100+h200*/
	aspect-ratio 首选纵横比
字体属性
	font-size 字体大小
	
文本属性
	color
	
背景属性
	background-color
		缩写：bgc
	background-image
		缩写：bgi
	background-size:
		缩写：bgs
		
边框属性
缩写：bd	            
	border: 1px solid #000;
	
盒子模型
	margin 外边距
		缩写：m
		margin: 0 auto;
```

### 字体（font）相关属性

#### 分开写

```
font-style  规定文本的字体样式
缩写：fsi	font-style: italic;
	fs通常指向fsi

font-weight 规定字体的粗细
缩写：fw指向fwn	font-weight: normal;

font-size  规定文本的字体尺寸
缩写：fz
	取值：像素值，相对值（如em），百分比(相对于父类)

font-family 规定文本的字体系列 
缩写：ff指向ffs	font-family: serif;
	默认值：取决于浏览器（Google默认微软雅黑）
```



#### 连写

```
顺序："font-style font-variant font-weight font-size/line-height font-family"
	中间空格隔开
	font-size和font-family的值是必需的。如果缺少了其他值，默认值将被插入，如果有默认值的话。
		需要注意样式覆盖问题

技巧：取首字母swsf：稍微舒服

注意：line-height属性每行文本的高度。
```



### 文本（text）相关属性

#### 文本基本属性

```
color  设置文本的颜色
缩写：cr coo(更好用)

text-align  规定文本的水平对齐方式
缩写：ta	
	left   把文本排列到左边。默认值：由浏览器决定。
	right  把文本排列到右边。
	center  把文本排列到中间。
	justify 实现两端对齐文本效果。
	inherit 规定应该从父元素继承 text-align 属性的值。

text-decoration 规定添加到文本的装饰效果
缩写：td
	none   默认。定义标准的文本。
	underline  定义文下的一条线。
	overline   定义文本上的一条线。
	line-through   定义穿过文本下的一条线。
	blink  定义闪烁的文本。
	inherit 规定应该从父元素继承 text-decoration 属性的值。

line-height
缩写 lh
    normal	默认。设置合理的行间距。
    number	设置数字，此数字会与当前的字体尺寸相乘来设置行间距。
    length	设置固定的行间距。
    %	基于当前字体尺寸的百分比行间距。
    inherit	规定应该从父元素继承 line-height 属性的值。
    
text-indent
缩写 ti
    length	定义固定的缩进。默认值：0。
    %	定义基于父元素宽度的百分比的缩进。
    inherit	规定应该从父元素继承 text-indent 属性的值。 

```

#### 元素居中

##### 行级元素

```
为什么在span和div元素中设置text-align:center;属性后，对行级元素不起作用？
原因：
    给行级元素和块级元素添加背景颜色，设置宽度和高度，发现发现行级元素的宽高没有变化，因为行级元素宽度和高度都是仅由内容决定的，
    而块级元素独占一行，宽度默认跟父元素body的宽度一样，所以设置text-align:center;有效果。
需求：
    让行级元素在页面居中就是设置span标签相对于父控件body居中
实现：
	给body设置text-align:center;属性，可以让body下的行级元素相对于页面居中
```

##### 块级元素

```
操作
    给行级元素和块级元素都设置宽度和高度
    发现行级元素的宽高没有变化,因为它的宽高是由内容决定的
    块级元素的宽高可以控制，但现在不相对于父空间居中
需求
    想让块元素相对于父空间居中只能使用margin属性
总结
    对于行级元素
        因为它的宽高是由内容决定的，设置居中一般是通过它的父空间text align实现，
        margin: 0 auto;行级元素不能通过margin来实现对于父空间驱动
    对于块级元素
        因为它的宽高是可以设置的，并且默认独占一行，想让它的内容居中，通过自身text align实现
        想让它相对于父空间居中，通过自身的margin来实现
```

#### line-height

```css
实现垂直居中
    div {
        width: 300px;
        height: 600px;
        background-color: lightblue;
        /* 可以实现单行文本垂直居中,确保行高等于元素的高度*/
        line-height: 600px;
        text-indent: 2em;
    }
```

```
精确布局
    网页精准布局的时候，设置行高为1（line-height: 1;），可以取消行高的默认间隙（默认属性为normal会自动添加合适的间隙）
    1代表字体尺寸的一倍，行高等于字体尺寸的大小,后续可结合padding来更精确的设置

    line-height: 1;
    padding: 1em;
```

```css
样式覆盖
    line-height: 1;
    padding: 1em;

    font: italic bold 1em "仿宋", sans-serif;
    /* 
    因为字体连写如果缺少了其他值，默认值将被插入，如果有默认值的话。
    因为缺少了line-height，所以插入了默认值覆盖了之前单独设置的line-height。
    */
    /* 
    解决方式一：
    仅在在字体连写里设置行高

    解决方式二（推荐）：
    将单独行高设置放在字体连写后
    */
```

```
连写样式都会自动为缺少值插入默认值！！一定要注意样式覆盖问题！感觉这个方式有点坑
```



### 背景（background）

#### background-position

```
background-position	(bgp) 设置或检索对象的背景图像位置。必须先指定background-image属性。
    left top (默认)
    left center
    left bottom
    right top
    right center
    right bottom
    center top
    center center
    center bottom	如果仅指定一个关键字，其他值将会是"center"
    
	x% y%	第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 。默认值为：0％0％
                    
	xpos ypos	第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）或任何其他 CSS单位。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions
	
	inherit	指定background-position属性设置应该从父元素继承
```

```
一个值的语法： 值可能是：

    关键字 center，用来居中背景图片。
    关键字 top、left、bottom、right 中的一个。用来指定把这个项目（原文为 item）放在哪一个边界。另一个维度被设置成 50%，所以这个项目（原文为 item）被放在指定边界的中间位置。
    <length> 或 <percentage>。指定相对于左边界的 x 坐标，y 坐标被设置成 50%。
    
    
两个值的语法： 一个定义 x 坐标，另一个定义 y 坐标。每个值可以是：

    关键字 top、left、bottom、right 中的一个。
    	如果这里给出 left 或 right，那么这个值定义 x 轴位置，另一个值定义 y 轴位置。如果这里给出 top 或 bottom，那么这个值定义 y 轴位置，另一个值定义 x 轴位置。
    <length> 或 <percentage>。
    	如果另一个值是 left 或 right，则该值定义相对于顶部边界的 Y。如果另一个值是 top 或 bottom，则该值定义相对于左边界的 X。如果两个值都是 <length> 或 <percentage> 值，则第一个定义 X，第二个定义 Y。
    注意：如果一个值是 top 或 bottom，那么另一个值不可能是 top 或 bottom。如果一个值是 left 或 right，那么另一个值不可能是 left 或 right。也就是说，例如，top top 和 left right 是无效的。
    排序：配对关键字时，位置并不重要，因为浏览器可以重新排序，写成 top left 或 left top 其产生的效果是相同的。使用 <length> 或 <percentage> 与关键字配对时顺序非常重要，定义 X 的值放在前面，然后是定义 Y 的值， right 20px 和 20px right 的效果是不相同的，前者有效但后者无效。left 20% 或 20% bottom 是有效的，因为 X 和 Y 值已明确定义且位置正确。
    默认值是 left top 或者 0% 0%。
    
    
三个值的语法： 两个值是关键字值，第三个是前面值的偏移量：

第一个值是关键字 top、left、bottom、right，或者 center。如果设置为 left 或 right，则定义了 X。如果设置为 top 或 bottom，则定义了 Y，另一个关键字值定义了 X。
<length> 或 <percentage>，如果是第二个值，则是第一个值的偏移量。如果是第三个值，则是第二个值的偏移量。
单个长度或百分比值是其前面的关键字值的偏移量。一个关键字与两个 <length> 或 <percentage> 值的组合无效。


四个值的语法： 第一个和第三个值是定义 X 和 Y 的关键字值。第二个和第四个值是前面 X 和 Y 关键字值的偏移量：

    第一个值和第三个值是关键字值 top、left、bottom、 right 之一。如果设置为 left 或 right，则定义了 X。如果设置为 top 或 bottom，则定义了 Y，另一个关键字值定义了 X。
    第二个和第四个值是 <length> 或 <percentage>。第二个值是第一个关键字的偏移量。第四个值是第二个关键字的偏移量。
```

```
关于百分比：

    给定背景图像位置的百分比偏移量是相对于容器的。值 0% 表示背景图像的左（或上）边界与容器的相应左（或上）边界对齐，或者说图像的 0% 标记将位于容器的 0% 标记上。值为 100% 表示背景图像的 右（或 下）边界与容器的 右（或 下）边界对齐，或者说图像的 100% 标记将位于容器的 100% 标记上。因此 50% 的值表示水平或垂直居中背景图像，因为图像的 50% 将位于容器的 50% 标记处。类似的，background-position: 25% 75% 表示图像上的左侧 25% 和顶部 75% 的位置将放置在距容器左侧 25% 和距容器顶部 75% 的容器位置。

    基本上发生的情况是从相应的容器尺寸中减去背景图像尺寸，然后将结果值的百分比用作从左（或顶部）边界的直接偏移量。

    (container width - image width) * (position x%) = (x offset value)
    (container height - image height) * (position y%) = (y offset value)
    
    以 X 轴为例，偏移量等于左上角初始位置时容器的x%处标记与图片的x%处标记的距离，
    (container width) * (position x%) - (image width) * (position x%) = s = (x offset value)
    所以说偏移后，图像的x%处标记将位于容器的x%处标记

	以 X 轴为例，假设我们有一个 300px 宽的图像，我们在一个 100px 宽的容器中使用它，background-size 设置为 auto：

    100px - 300px = -200px (container & image difference)
    
	因此，位置百分比为 -25%、0%、50%、100%、125%，我们得到这些图像到容器边界偏移值：

    -200px * -25% = 50px
    -200px * 0% = 0px
    -200px * 50% = -100px
    -200px * 100% = -200px
    -200px * 125% = -250px
    
	因此，对于我们的示例，使用这些结果值，让图像的左边界从容器的左边界偏移：

    +50px（将图像左边界放在 100px 宽容器的中心）
    0px（图像左边界与容器左边界重合）
    -100px (将图片相对容器左移 100px，这意味着图片中部的 100px 内容将出现在容器中)
    -200px (将图片相对容器左移 200px，这意味着图片右部分的 100px 内容将出现在容器中)
    -250px (将图片相对容器左移 250px，这意味着图片的右边界对齐容器的中线)
    
	值得一提的是，如果你的 background-size 等于给定轴的容器大小，那么该轴的 百分比 位置将不起作用，因为“容器图像差异”将为零。你将需要使用绝对值进行偏移。
```

```
觉得百分比也就居中有用
```

#### background-repeat

```
background-repeat	(bgr) 设置或检索对象的背景图像如何铺排填充。必须先指定background-image属性。
    repeat	背景图像将向垂直和水平方向重复。这是默认
    repeat-x	只有水平位置会重复背景图像
    repeat-y	只有垂直位置会重复背景图像
    no-repeat	background-image 不会重复
    inherit	指定 background-repeat 属性设置应该从父元素继承
```

#### background-size

```
background-size	    (bgs) 检索或设置对象的背景图像的尺寸大小。
    给一个值：这个值指定图片的宽度，图片的高度隐式的为 auto
    给两个值：第一个值指定图片的宽度，第二个值指定图片的高度。
    可以使用百分比，表示表示占据父元素宽高的百分比
    cover：   此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小尺寸。
    contain： 此时会保持图像的纵横比并将图像缩放成完全装入背景定位区域的最大尺寸。 
```

```
auto
    auto 或 auto auto:
    图像如果有两个长度，则按这个尺寸。如果没有固有尺寸与固有比例，则按背景区的大小。如果没有固有尺寸但是有固有比例，效果同 contain。如果有一个长度与比例，则由此长度与比例计算大小。如果有一个长度但是没有比例，则使用此长度与背景区相应的长度。
	一个为 auto 另一个不是 auto:
    如果图像有固有比例，则指定的长度使用指定值，未指定的长度由指定值与固有比例计算。如果图像没有固有比例，则指定的长度使用指定值，未指定的长度使用图像相应的固有长度，若没有固有长度，则使用背景区相应的长度。
```

#### background

**连写，注意样式覆盖！**

```
background
	背景缩写属性可以在一个声明中设置所有的背景属性。

    可以设置的属性分别是：background-color、background-position、background-size、background-repeat、
    background-origin、background-clip、background-attachment 和 background-image。

    各值之间用空格分隔，不分先后顺序。

    可以只有其中的某些值，例如 background：＃FF0000 URL（smiley.gif); 是允许的。

	具体语法：
	background:bg-color bg-image bg-position/bg-size bg-repeat
	
	注意未写的属性值会被设置为默认值,如果有默认值
        
```

#### 颜色取值

```
关键字
rgb方式
rgba方式
	a代表透明度
十六进制
```

#### 精灵图

```
概念
    将项目中用到的多张小图,合成一张大图,大图就是精灵图
好处
    减少服务器请求图片的次数,提高网页的加载效率
步骤
    1.创建一个div,(将来用于展示小图标)
    2.设置div的大小为要展示图标的大小(使用pxCook量取)
    3.设置精灵图作为Div的background-image
    4.获取要展示的图标左上角在精灵图的坐标，取负值，设置为background-position
    	思考一下为什么要把图表在精灵图上的坐标取负值作为偏移量？
    	因为初始位置下，把图标当成一个独立图片，它就相当于容器偏移了那个数值，我们想让它回到偏移量为零，就减去偏移量！
```

### CSS三大特性

#### 层叠性

```
样式表层叠——简单的说，就是 CSS 规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。
```

```
特点
    相同的样式会把前面覆盖,不同的样式会被叠加
应用
    可以将一些相同的样式放到一起,简化代码
```

#### 继承性

```
概念
	子元素可以继承父元素的相关属性,可以在一定程度上减少代码
应用
	1,给body设置font等属性,可以统一页面默认的字体等样式
	2,给ul设置list-style: none,就可以去掉无序列表前面的小圆点
```

```html
    <style>
        .father{
            /* 并不是父类中所有的属性,子类都可以继承,只有部分属性:字体,文本,对齐 */
            color: red;
            font-size: 50px;
            text-align: center;

            /* 父类的高度,子类无法继承 */
            height: 200px;
        }
    </style>

    <div class="father">父亲
        <div class="son">儿子</div>
    </div>

```



#### 优先级

```
概念
	不同选择器具有不同的优先级,优先级高的选择器会覆盖优先级低的选择器(通过权重公式)
规律
	继承 < 元素选择器 < 类选择器 < id选择器 < 行内样式 < !important
注意
	1.!important写在属性后面,分号的前面
	2,!important不能提高继承的优先级,只要是继承,优先级是最低的
		指即使被提权了，但继承到子元素后优先级依旧是继承的优先级，0
	3,实际开发中很少使用!important,!important一般用在调试当中
```

```
权重
	继承 0
	元素 1
	类 10
	id 100
	内联 1000
	!important 无穷大
组合
	对于组合选择器，将包含的选择器对应的值相加，大的覆盖小的
```

