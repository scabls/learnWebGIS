### 其他属性

#### vertical-align

```css
用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式

该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值，这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。
```

```css
vertical-align 属性可被用于两种环境：
    使行内元素盒模型与其行内元素容器垂直对齐。例如，用于垂直对齐一行文本内的图片<img>：
    垂直对齐表格单元内容。
注意 vertical-align 只对行内元素、行内块元素和表格单元格元素生效：不能用它垂直对齐块级元素。
```

##### 行内元素的值

```css
相对父元素的值
这些值使元素相对其父元素垂直对齐：

baseline
使元素的基线与父元素的基线对齐。HTML 规范没有详细说明部分可替换元素的基线，如<textarea> ，这意味着这些元素使用此值的表现因浏览器而异。

sub
使元素的基线与父元素的下标基线对齐。

super
使元素的基线与父元素的上标基线对齐。

text-top
使元素的顶部与父元素的字体顶部对齐。

text-bottom
使元素的底部与父元素的字体底部对齐。

middle
使元素的中部与父元素的基线加上父元素 x-height（译注：x 高度）的一半对齐。
	/*x-height有点意思，MDN的vertical-align界面能找到解释链接*/

<length>
使元素的基线对齐到父元素的基线之上的给定长度。可以是负数。

<percentage>
使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是line-height属性的百分比。可以是负数。
```

```css
相对行的值
下列值使元素相对整行垂直对齐：

top
使元素及其后代元素的顶部与整行的顶部对齐。

bottom
使元素及其后代元素的底部与整行的底部对齐。

没有基线的元素，使用外边距的下边缘替代。
	img
```

##### 图片撑开块级元素产生下间隙

```css
现象：
    图片撑开div时，发现图片和Div底部存在间隙
原因：
    div是一个块级元素,独占一行，图片和文字默认沿着这一行的基线对齐，基线和底线中间有间隙
解决：
    设置vertical-align: bottom;使元素及其后代元素的底部与整行的底部对齐
```

##### 图片垂直居中问题

```css
现象：
    给Div设置内容的高度发现文字会居中但是图片没有居中
原因：
    图片仍沿着基线对齐
解决：
    设置vertical-align: middle;把此元素放置在父元素的中部
```



#### 隐藏效果

```css
/* 不显示，不占位置，在设置动画效果时会出问题 */
display: none;
```

```css
/* 不可见，占位置 */
visibility: hidden;
```

```css
/* 透明化，占位置，更适合淡入淡出效果 */
opacity: 0;
```

```css
/* 缩放大小为0，占原本大小的位置 */
transform:scale(0)
```



### flex属性详解

#### 修改轴向

```css
flex-direction属性：在flex容器设置，该属性通过定义 flex 容器的主轴方向来决定 flex 子项在 flex 容器中的位置。
    row				默认值。灵活的项目将水平显示，正如一个行一样。	
    row-reverse		与 row 相同，但是以相反的顺序。	
    column			灵活的项目将垂直显示，正如一个列一样。	
    column-reverse	与 column 相同，但是以相反的顺序。
```

```css
请注意，值 row 和 row-reverse 受 flex 容器的方向性的影响。如果它的 dir 属性是 ltr，row 表示从左到右定向的水平轴，而 row-reverse 表示从右到左; 如果 dir 属性是 rtl，row 表示从右到左定向的轴，而 row-reverse 表示从左到右。
```

#### 修改轴向之后对齐

##### flex-direction: column;

```css
现在修改了轴向,水平方向是侧轴，垂直方向是主轴

想实现元素水平居中，现在水平方向是侧轴，使用align-items设置

align-items	在flex容器设置，定义flex子项在flex容器的当前行的侧轴方向上的对齐方式。
		注意：当前行，单行喽~
    stretch     默认值。元素被拉伸以适应容器侧轴尺寸。
				（在子元素没有设置侧轴方向的尺寸时有效）
    center      元素位于容器的中心。
    flex-start	将元素与flex容器的侧轴起点对齐
				（一般左部对齐）
    flex-end    将元素与flex容器的侧轴末端对齐
				（一般右部对齐）
    注意：align-items属性有两个默认
    1.元素默认沿着容器的侧轴起点排布
    2.默认是拉伸效果，（在子元素没有设置侧轴方向的尺寸时有效）

注意，主轴垂直后，align-items默认值stretch是否会触发变成了判断子元素有没有设置宽度
```

```css
想实现元素垂直居中，现在垂直方向是主轴，使用justify-content设置

justify-content属性：在flex容器设置，设置或检索弹性盒子在主轴方向上的对齐方式。
    flex-start	默认值。元素紧密地排列在弹性容器的主轴起始侧。
				（一般是顶部）
    flex-end	元素紧密地排列在弹性容器的主轴结束侧。
				（一般是底部）
    center	居中排列。	
    space-between	均匀排列每个元素，首个元素放置于起点，末尾元素放置于终点。	
    				（间隙在子元素中间，两端没间隙，中间间隙等分）
    space-evenly	均匀排列每个元素，每个元素之间的间隔相等。	
    				（所有间隙等分，两端有间隙，中间有间隙）
    space-around	均匀排列每个元素，每个元素周围分配相同的空间。
    				（间隙环绕在子元素中间，两端有间隙，中间间隙是两端的两倍）
```

#### flex复合属性

```css
flex	简写属性设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。
此属性是以下 CSS 属性的简写：
    flex-grow
    flex-shrink
    flex-basis
```

##### flex-grow

```css
flex-grow	设置flex子项主尺寸的flex增长系数
	主尺寸：理解为在主轴方向上的尺寸，主轴水平时为宽度，主轴垂直时是高度
取值
	number	规定了 flex-grow 项在 flex 容器中分配剩余空间的相对比例。负值无效
		剩余空间：剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。
				如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。
	
	默认值：0	不分配剩余空间
```

##### flex-shrink

```css
flex-shrink	指定了flex子项的收缩规则
	flex元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值
取值
	number	规定了 flex-shrink 项在 flex 容器中收缩溢出空间的相对比例。负值无效
		溢出空间：所有 flex 项的大小加起来的大小减去flex容器的大小。
				如果所有的兄弟项目都有相同的 flex-shrink 系数，那么所有的项目将溢出空间按相同比例收缩，否则将根据不同的 flex-grow 定义的比例进行收缩。

	默认值：1	子项等比例收缩溢出空间
```

##### flex-basis

```css
flex-basis 指定了 flex子项在主轴方向上的初始大小。
	如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。
	当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了height) , flex-basis 具有更高的优先级
	注意，是在进行grow和shrink之前的初始大小


取值

	<'width'>	
		width 值可以是 <length>; 该值也可以是一个相对于其父弹性盒容器主轴尺寸的百分数。负值是不被允许的。默认为 auto。
			auto	默认值	参照子项设置的width或height属性，若子项在主轴方向上没有设置尺寸，效果同content
			<length>	必须有单位
			0	不带单位，效果同content
			0%	效果同content

	content
		基于 flex 的元素的内容自动调整在主轴方向的大小。
```

##### flex

```css
flex	简写属性，设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。
此属性是以下 CSS 属性的简写：
    flex-grow
    flex-shrink
    flex-basis
语法	flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
初始值	0 1 auto
	缺值插入的默认值按顺序是 1 1 0
```

###### 语法

```css
可以使用一个，两个或三个值来指定 flex 属性。

单值语法：值必须是以下之一：
    一个 <flex-grow> 的有效值：此时简写会扩展为 flex: <flex-grow> 1 0。
    一个 <flex-basis> 的有效值：此时简写会扩展为 flex: 1 1 <flex-basis>。
    关键字 none 或者全局关键字之一。
双值语法：
	第一个值必须是一个 flex-grow 的有效值。
	第二个值必须是以下之一：
        一个 flex-shrink 的有效值：此时简写会扩展为 flex: <flex-grow> <flex-shrink> 0。
        一个 flex-basis 的有效值：此时简写会扩展为 flex: <flex-grow> 1 <flex-basis>。
三值语法：值必须按照以下顺序指定：
    一个 flex-grow 的有效值。
    一个 flex-shrink 的有效值。
    一个 flex-basis 的有效值。
```

###### 取值

```css
initial
元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"。

auto
元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto".

none
元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。

<'flex-grow'>
定义 flex 项目的 flex-grow 。负值无效。省略时默认值为 1。 (初始值为 0)

<'flex-shrink'>
定义 flex 元素的 flex-shrink 。负值无效。省略时默认值为1。 (初始值为 1)

<'flex-basis'>
定义 flex 元素的 flex-basis 属性。若值为0长度，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)
```

### 个人简历项目

#### CSS书写顺序

```
顺序的重要性
	1.顺序不对可能影响布局（简写属性的默认值插入）
	2.方便维护，一般把布局等重要属性放在最前面，点缀属性等放在最后面

一般顺序
	整个页面书写顺序
		从外向里、从上往下、从左往右
	CSS属性的书写顺序
		1.布局属性
			display、float、position
		2.尺寸、背景、盒子模型
			width、height、backgroud、margin、padding、border
		3.文本等内容属性
			Color font text-align line-height vertical-align
		4.点缀属性
			border-radius，阴影（box-shadow text-shadow）、光标小手（cursor）
```

#### 选择器选用

```
推荐使用类+后代	一般选择器层级不超过5个

id选择器：一般用在锚链接、表单元素（锚链接根据标签的ID跳转；label的for属性要跟表单元素的id值相同）
类选择器，元素选择器：一般用于调整样式，如果一个容器下有多个相同的标签，一般添加class属性来区分
属性选择器：做一些动画效果的时候，或者传递一些数据的时候可以使用（自定义属性）
```

#### CSS单位

```
em
	相对长度，em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸16px。会继承父级元素的字体尺寸
rem
	相对长度，但相对的只是HTML根元素的字体尺寸，若未对HTML根元素的字体尺寸的大小进行设置，则是浏览器默认字体大小。不会继承父级元素的字体尺寸。
vw
	Viewport Width，视窗宽度，1vw=视窗宽度的1%
vh
	Viewport Height，视窗高度，1vh=视窗高度的1%
```

#### 元素属性动态设置

```
根选择器	<html>或:root
	在根选择器中定义自定义的属性，这样整个文档都能使用
	
var() 函数
	var() 函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用。
	
使用步骤
	1.在根选择器中定义一个自定义的属性
	2.在页面中选择不同的元素，使用var()插入自定义属性的值
```

#### 项目环境的搭建

```html
1.创建一个文件夹（self-intro-main），代表项目名，尽量不要出现中文、空格或“.”
2.在项目下创建css文件夹（存放css文件），images文件夹（存放图片），index.html（书写首页页面）
3.将css文件、图片复制到对应的文件夹内，把favicon.icon和font-awesome字体库文件夹拷贝到根文件夹内
4.引入fav图标，css文件夹，font-awesome字体库中的css文件
```

