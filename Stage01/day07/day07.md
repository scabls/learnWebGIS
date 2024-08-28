### flex布局

#### 简介

```css
概念
	弹性盒子是CSS3的一种新的布局模式
    弹性盒子是一种当页面需要适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为的布局方式
作用
    提供一种更加有效的方式对一个容器中的子元素进行排列、对齐和分配空白空间
语法
	父元素：display: flex
```

#### 与float区别

```css
1.浮动布局的弊端，子元素浮动之后会脱标，父元素高度无法被撑开，影响布局。flex不会
2.float写在要浮动的子元素上， flex写在父元素上控制子元素布局
```

#### 组成

```css
弹性容器：父元素	flex容器/弹性容器
弹性盒子：子元素	弹性子元素/弹性元素/flex子项/弹性盒子
主轴：默认水平方向，即x轴。flex子项默认沿着水平方向排布（和主轴方向保持一致）
侧轴：默认与主轴垂直交叉，即y轴，跟主轴是相对的
```

##### 主轴方向

```css
flex-direction属性：在flex容器设置，该属性通过定义 flex 容器的主轴方向来决定 flex 子项在 flex 容器中的位置。
    row				默认值。灵活的项目将水平显示，正如一个行一样。	
    row-reverse		与 row 相同，但是以相反的顺序。	
    column			灵活的项目将垂直显示，正如一个列一样。	
    column-reverse	与 column 相同，但是以相反的顺序。
```



#### 主轴对齐方式

```css
justify-content属性：在flex容器设置，设置或检索弹性盒子在主轴方向上的对齐方式。
    flex-start	默认值。从行首起始位置开始排列。	
    flex-end	从行尾位置开始排列。	
    center	居中排列。	
    space-between	均匀排列每个元素，首个元素放置于起点，末尾元素放置于终点。	
    				（间隙在子元素中间，两端没间隙，中间间隙等分）
    space-evenly	均匀排列每个元素，每个元素之间的间隔相等。	
    				（所有间隙等分，两端有间隙，中间有间隙）
    space-around	均匀排列每个元素，每个元素周围分配相同的空间。
    				（间隙环绕在子元素两边，两端有间隙，中间间隙是两端的两倍）
```

#### 侧轴对齐方式

```css
align-items	在flex容器设置，定义flex子项在flex容器的当前行的侧轴方向上的对齐方式。
		注意：当前行，单行喽~
    stretch     默认值。元素被拉伸以适应容器在侧轴的尺寸。
				（在子元素没有设置侧轴方向的尺寸时有效）
    center      元素位于容器的中心。
    flex-start	元素位于容器的开头。
				（顶部对齐）
    flex-end    元素位于容器的结尾。
				（底部对齐）
    注意：align-items属性有两个默认
    1.元素默认沿着容器的顶部排布
    2.默认是拉伸效果，（在子元素没有设置侧轴方向的尺寸时有效）
```

##### 子项单独设置侧轴对齐

```css
align-self	在flex子项设置，定义flex子项单独在侧轴（纵轴）方向上的对齐方式。
		注意：需要写在flex子项上
	auto		默认值。元素继承了它的父容器的 align-items 属性。
	stretch     元素被拉伸以适应容器。
				（在子元素没有设置侧轴方向的尺寸时有效）
    center      元素位于容器的中心。
    flex-start	元素位于容器的开头。
				（顶部对齐）
    flex-end    元素位于容器的结尾。
				（底部对齐）
```

#### flex子项

##### flex子项尺寸的特点

```css
flex子项尺寸的特点总结：弹性
	初始宽高由内容决定，但是可以设置宽高；未设置高度的情况下，设置拉伸就会和父类一样高
```

##### flex子项空间的动态分配

```css
flex 复合属性。设置或检索弹性盒模型对象的子元素如何分配空间。
		注意：需要写在flex子项上
	number	代表分配剩余空间的相对比例

/* 需求：让子项宽度按照1：2：3灵活分配
flex 复合属性。设置或检索弹性盒模型对象的子元素如何分配空间。
*/
.son:nth-child(1) {
    flex: 1;
    /* 数字代表分配剩余空间的相对比例 */
}

.son:nth-child(2) {
    flex: 2;
    /* 数字代表分配剩余空间的相对比例 */
}

.son:nth-child(3) {
    flex: 3;
    /* 数字代表分配剩余空间的相对比例 */
}
```

##### gap

```
gap：设置flex子项之间的间隔，行间列间
```



#### flex容器多行显示

##### flex容器内flex子项换行

```css
flex-wrap	在flex容器设置，该属性控制flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。
                
    nowrap	默认值。规定灵活的项目不拆行或不拆列。
    wrap	规定灵活的项目在必要的时候拆行或拆列。

flex-wrap: wrap;	/* 允许子项换行 */
```

##### flex容器内行的对齐方式

```css
align-content	在flex容器设置，在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（侧轴方向）。
        说人话：设置子元素换行之后行的对齐方式
        注意：弹性容器内必须有多行的项目，该属性才会生效。
    stretch 默认值。行被拉伸以适应容器。
    center  行位于容器的中心，中间无间隙。
    flex-start  行位于容器的开头。
    flex-end    行位于容器的结尾。
    space-between   元素位于各行之间留有空白的容器内。
					（间隙在行间，两端没间隙，中间间隙等分）
    space-around    元素位于各行之前、之间、之后都留有空白的容器内。
					（间隙环绕在行周围，两端有间隙，中间间隙是两端的两倍）
    space-evenly    元素位于各行之前、之间、之后都平均分布的容器内。
					（所有间隙等分，两端有间隙，中间有间隙）
```

### CSS新特性

#### 过渡

```css
transition
作用
	它可以让你在元素从一种样式变换到另一种样式时产生平滑的过渡效果
	比如从一种颜色渐变到另一种颜色，或者从隐藏到显示。
使用
	transition:要过渡的属性名/all(所有的属性) 过渡的时长
注意
	transition属性一般写在过渡元素的本身上面
```

#### 溢出

```css
overflow属性指定如果内容溢出一个元素的框，会发生什么。
    visible	默认值。内容不会被修剪，会呈现在元素框之外。
    hidden	内容会被修剪，并且其余内容是不可见的。
    scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
    auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
```

#### 位移

```css
transform
	允许你将元素旋转，缩放，移动，倾斜等
位移相关的属性取值	
	translateX(x)	定义移动，只是用 X 轴的值。
	translateY(y)	定义移动，只是用 Y 轴的值。
	translate(x,y)	定义 2D 转换。
注意
	可以传像素值或者百分比(百分比是相对于它自身的尺寸)

transform：
	如果属性的值不是 none，则将创建一个层叠上下文。在这种情况下，该元素将作为任何包含的 position: fixed; 或 position: absolute; 元素的包含块。可能会影响层级覆盖，建议被覆盖元素使用position和z-index调整层级
```

#### 旋转

```css
语法
	transform:rotate(角度)
取值
	正数:顺时针旋转
	负数:逆时针旋转
```

##### 旋转基点问题

```css
transform-origin
	设置旋转元素的基点位置
语法		transform-origin: x-axis y-axis z-axis;
默认值		50% 50% 0
```

```css
transform-origin属性可以使用一个，两个或三个值来指定，其中每个值都表示一个偏移量。没有明确定义的偏移将重置为其对应的初始值。

如果定义了两个或更多值，并且没有值是关键字，或者唯一使用的关键字是center，则第一个值表示水平偏移量，第二个值表示垂直偏移量。

一个值：
	必须是<length>，<percentage>，或 left, center, right, top, bottom关键字中的一个。
两个值：
    其中一个必须是<length>，<percentage>，或left, center, right关键字中的一个。
    另一个必须是<length>，<percentage>，或top, center, bottom关键字中的一个。
三个值：
    前两个值和只有两个值时的用法相同。
    第三个值必须是<length>。它始终代表 Z 轴偏移量。
```

```css
x-offset
    定义变形中心距离盒模型的左侧的<length>或<percentage>偏移值。

offset-keyword
    left，right，top，bottom 或 center 中之一，定义相对应的变形中心偏移。

y-offset
    定义变形中心距离盒模型的顶的<length>或<percentage>偏移值。

x-offset-keyword
    left，right 或 center 中之一，定义相对应的变形中心偏移。

y-offset-keyword
    top，bottom 或 center 中之一，定义相对应的变形中心偏移。

z-offset
    定义变形中心距离用户视线（z=0 处）的<length>（不能是<percentage>）偏移值。
```

```css
keyword		value
left		0%
center		50%
right		100%
top			0%
bottom		100%
```



#### 倾斜

```css
transform: skew(x,y)
transform: skewX()
    定义沿着x轴的2D倾斜转换
transform: skewY()
    定义沿着y轴的2D倾斜转换
```

#### 渐变

```css
background-image的值
linear-gradient()	创建一个线性渐变的 "图像"(从上到下)
	函数用于创建一个表示两种或多种颜色线性渐变的图片。
    创建一个线性渐变，需要指定两种颜色，
    还可以实现不同方向（指定为一个角度）的渐变效果，如果不指定方向，默认从上到下渐变
radial-gradient()	用径向渐变创建 "图像"。 (center to edges)
	径向渐变由中心点定义。
	为了创建径向渐变你必须设置两个终止色。
```

#### 动画

```css
概念
	创建动画是通过逐步改变从一个CSS样式设定到另一个。
	在动画过程中，您可以更改CSS样式的设定多次
使用
	1,定义动画
		@keyframes 动画名称{
			from{动画开始状态}
			to{动画结束状态}
		}
		或者
		@keyframes 动画名称{
			0%{动画开始状态}
			100%{动画结束状态}
		}
    2,使用动画
    	animation:动画名称 动画时长
```

```css
animation是复合属性
    	未写值会自动插入默认值 
    animation-name	指定要绑定到选择器的关键帧的名称
    animation-duration	动画指定需要多少秒或毫秒完成
    animation-timing-function	设置动画将如何完成一个周期
        linear	动画从头到尾的速度是相同的。	
        ease	默认。动画以低速开始，然后加快，在结束前变慢。	
        ease-in	动画以低速开始。	
        ease-out	动画以低速结束。	
        ease-in-out	动画以低速开始和结束。
		steps(int,start|end)
			指定了时间函数中的间隔数量（步长）。有两个参数，第一个参数指定函数的间隔数，该参数是一个正整数（大于 0）。 第二个参数是可选的，表示动画是从时间段的开头连续还是末尾连续。含义分别如下：
            start：表示直接开始。
            end：默认值，表示戛然而止。
    animation-delay	设置动画在启动前的延迟间隔。
    animation-iteration-count	定义动画的播放次数。
	animation-play-state	指定动画是否正在运行或已暂停。
		paused	指定暂停动画
        running	指定正在运行的动画（默认）
```

```css
animation-timing-function
	steps(n, <jumpterm>)
    按照 n 个定格在过渡中显示动画迭代，每个定格等长时间显示。例如，如果 n 为 5，则有 5 个步骤。动画是否在 0%、20%、40%、60% 和 80% 处或 20%、40%、60%、80% 和 100% 处暂停，或者在动画的 0% 和 100% 之间设置 5 个定格，又或是在包括 0% 和 100% 的情况下设置 5 个定格（在 0%、25%、50%、75% 和 100% 处）取决于使用以下跳跃项之一：
        jump-start
            表示一个左连续函数，因此第一个跳跃发生在动画开始时。
        jump-end
            表示一个右连续函数，因此最后一个跳跃发生在动画结束时。
        jump-none
            两端都没有跳跃。相反，在 0% 和 100% 标记处分别停留，每个停留点的持续时间为总动画时间的 1/n。
        jump-both
            在 0% 和 100% 标记处停留，有效地在动画迭代过程中添加一个步骤。
        start
            等同于 jump-start。
        end
            等同于 jump-end。
        step-start
            等同于 steps(1, jump-start)。
        step-end
            等同于 steps(1, jump-end)。
```



#### 缩放

```css
语法
	transform:scale(倍数)
```

