#### HTML概念

##### 简介

超文本标记语言，主要用于描述一个页面（页面的骨架）

##### 思想

页面中有很多数据，不同的数据可能需要不同的显示效果，使用标签包含数据，修改标签的属性，以标签内数据显示不同样式

```html
将来的你会感谢<font color="red" size="6">努力奋斗</font>的自己
```

一个标签相当于一个容器，想要修改标签内数据的样式，只要修改容器的属性值

##### 特点

- 与xml相比，语法宽松（主要因为浏览器纠错能力强）
- 标签名不区分大小写（建议小写，符合html5规范）
- 标签名是预设好的，每一个标签都有特定含义

##### 语法

标签：一对尖括号括起来的关键字组成，如果标签中没有内容，可以自闭和

属性：为标签体提供更多消息，可以改变标签体样式，以名称和值的形式出现（类似键值对）

标签体：开始标签和结束标签之间的所有内容，叫做标签体，可以是普通文本，也可以是其他标签

```html
<p><font color="blue">g</font><font color="red">o</font><font color="yellow">o</font><font color="blue">g</font><font color="green">l</font><font color="red">e</font></p>
```

元素：开始标签、结束标签与内容相结合，便是一个完整的元素

注释：用于解释说明程序，主要给程序员看，分为行注释和块注释

特殊字符：

```html
空格 &nbsp;		小于号	&lt;	大于号&gt;		版权&copy;
```



#### HTML常见标签

##### 文档相关标签

```html
<html>							----文档的根标签
	<head>						----文档的头部
		<meta></meta>			----文档的元数据
		<title></title>			----文档的标题
	</head>
	<body></body>				----文档的正文
</html>
```

##### 文本相关标签

```html
字体标签：<font color="" size="" face="" >字体标签</font>
标题标签：h1--h6
				<h1 align=""></h1>
段落标签：<p align=""></p>				

```

##### 格式相关标签

```html
水平线:<hr/>
换行:<br/>
粗体:<b></b>或者<strong></strong>
斜体:<i></i>或者<em></em>
下划线:<u></u>
标记:<mark></mark>
```

```html
我们无法确定 HTML 被显示的确切效果。屏幕的大小，以及对窗口的调整都可能导致不同的结果。

对于 HTML，您无法通过在 HTML 代码中添加额外的空格或换行来改变输出的效果。

当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格。需要注意的是，HTML 代码中的所有连续的空行（换行）也被显示为一个空格。
```

