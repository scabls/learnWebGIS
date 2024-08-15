### 列表相关标签

```
无序列表
	ul
		type属性
有序列表
	ol
		type属性
列表项
	li
```

### 标签分类

#### 块级标签

独占一行

div：纯粹的块级元素，默认无样式

​		划分区域，设置布局	

#### 行级标签

在行内显示，可以多个同行

span：纯粹的行级元素，默认无样式

​			为行内内容设置样式或存储少量数据

### 媒体标签

#### 图片标签

标签名：img

​		**可替换元素**

```
使用 CSS 添加样式

	<img> 是一个可替换元素。它的 display 属性的默认值是 inline，但是它的默认分辨率是由被嵌入的图片的原始宽高来确定的，使得它就像 inline-block 一样。你可以为 <img> 设置 border/border-radius、padding/margin、width、height 等 CSS 属性。

	<img> 没有基线（baseline），这意味着，当在一个内联格式化上下文（inline formatting context）中使用 vertical-align: baseline 时，图像的底部将会与容器的文字基线对齐。

	你可以使用 object-position 属性将图形定位在元素的框内，并使用 object-fit 属性调整框内图像的大小（例如，如果图像需要裁剪，则其是否需要调整以符合框的大小，或填满整个框）。

	根据图像的类型，其可能会有一个原始的宽和高（原始分辨率）。对于一些类型的图像，原始分辨率并不是必要的。比如说，SVG 图像，如果它们的根 <svg> 元素没有 width 或 height 属性，SVG 图像就可以没有原始分辨率。
```

重要属性：

​	路径：src

​	绝对路径：

​	1.绝对路径：以盘符开始，如：C:\Users\Administrator\Desktop\picture.jpg

​		弊端：协议不同无法打开，不能跨平台使用



​	2.相对路径：相对于当前html文件所在的目录。（推荐使用）

​		如：../picture.jpg表示上一级目录的picture.jpg

​		如：./picture.jpg表示当前目录的picture.jpg

​    	如：picture.jpg表示当前目录的picture.jpg

​			./表示访问当前所在目录，/..表示访问所在目录上一级目录，都不加默认访问当前所在目录

其他属性：

​	alt 规定图像的替代文本。在图像无法显示时显示。

​	height  规定图像的高度。

​	width  规定图像的宽度。

​	title  规定图像的标题。在鼠标移到图像上时显示的工具提示。

#### 音视频标签

音频标签名：audio

视频标签名：video

​	src：音频文件路径

​	controls：布尔值，可以显示播放控制按钮

​	autoplay：自动播放

​	muted：静音，视频通常需要静音才能自动播放

### 链接标签

标签名：a

属性：

- ​	href：规定链接的目标 URL

- ​	target：规定在何处打开目标 URL。仅在 href 属性存在时使用

  - _blank：新窗口打开。

  -  _parent：在父窗口中打开链接。
  
  - _self：默认，当前页面跳转。
  
  - _top：在当前窗体打开链接，并替换当前的整个体(框架页)。

#### 链接分类

**站外链接**：跳转至外部网站或应用

```html
	<a href="https://www.baidu.com">百度</a>
    <br>
    <a href="tencent://message/?uin=123456&Site=www.qq.com&Menu=yes">腾讯视频聊天</a>
    <!-- tencent协议: tencent:// -->
    <br>
```

**站内链接**：跳转到本网站（本项目）的另一个页面或资源

```html
    <!-- 浏览器特性：如果能识别要访问资源的格式，则直接打开，否则会提示下载 -->
    <a href="./09-链接标签-基本使用.html">跳转到链接标签-基本使用</a>
    <br>
    <a href="./images/爱心1.svg">跳转到爱心图片</a>
    <br>
    <a href="./audio.mp3">跳转到音频</a>
    <br>
    <a href="./audio.7z">跳转到压缩包</a>
```

**锚链接**：跳转到当前页面的其他部分 

```html
<!-- 根据标签的id跳转 -->
<a href="#p1">
    <h2>第一章</h2>
</a>
<a href="#p2">
    <h2>第二章</h2>
</a>
<h3 id="p1">第一章节内容</h3>
<h3 id="p2">第二章节内容</h3>


    <!-- You can use href="#top" or the empty fragment href="#" to link to the top of the current page. This behavior is specified by HTML5. -->
    <a href="#top">
        <img src="./images/top-icon.png" alt="回到顶部" title="回到顶部">
    </a>
```

#### 扩展知识

```
display: block;
	css属性，将链接变成块状，扩大点击范围，只要点击块内，就相对于点击了链接
```



### 布局相关标签

#### 语义标签

一个语义元素能够清楚的描述其意义给浏览器和开发者。

之前：

```
<div id="nav">, <div class="header">, 或者 <div id="footer">, 来指明导航链接, 头部, 以及尾部
```

html5：

```
<nav>，<header>，<footer>
```

##### 组成

- title
- nav
- aside
- **main**
- article
- section
- footer

```
<header>:
放置网站的标志、标题和导航栏。
可以包含 <nav> 标签，导航菜单通常放在标头部分。
在页面中你可以使用多个<header> 元素

<nav>:
包含页面的导航链接。
通常放在 <header> 内，但也可以根据设计需求放在 <header> 之外。

<main>:
包含页面的主要内容。
一个页面只能有一个 <main> 元素，不能嵌套在 <header>、<footer>、<article>、<aside> 中。
包括 <article> 或 <section> 标签，用于组织主要内容。

<article> 和 <section>:
<article> 用于独立的内容块，如博客文章或新闻报道。
<section> 用于主题区域或内容组。
			W3C HTML5文档: section 包含了一组内容及其标题
可以在 <main> 中组合使用，以组织主要内容。

<aside>:
包含与主要内容相关的次要信息，如侧边栏、广告或附加信息。
通常放在 <main> <article>的旁边。

<footer>:
放置版权信息、联系信息、页脚导航等。
通常是页面的最后一个部分。
文档中你可以使用多个 <footer>元素
```



### 表单标签

#### 组成

```html
form 表单标签
input 输入项标签/表单项标签，id属性用于标识元素，name属性用于提交表单时标识元素的值
select：下拉选择框
textarea：文本域标签
label：标签用于描述表单元素的功能，for属性通过与input标签的id属性关联，用于指定与哪个标签关联
```

```html
form 表单标签：用于限定表单的提交范围，
	action属性 指定提交的地址，默认提交到当前页面
	method属性 指定提交的方式，默认是GET方式，另一种是post方式
		get：将表单数据以名称/值对的形式附加到 URL 中；请求体中无数据
			特点：方便，相对不安全，只能提交少量数据
		post：将表单数据附加到 HTTP 请求的 body 内（数据不显示在 URL 中）
			特点：安全，可以提交大量数据，主要用于文件上传和提交敏感信息

```

```
通用属性:

        name 属性：
            1.规定 <input> 元素的名称。
                只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。name-value键值对
            2.为单选框和复选框的选项分组，同一组的单选框只能选一个。 
        
        value属性:
            1.对于单选框和复选框,需要制定value属性的值,用于区分选项。如果只有一个复选框，value属性可以省略
            2.设置下拉选择框的option的值，设置之后提交到后台就是value的值，否者提交的就是文本内容。
            3.设置submit、reset、button按钮的value属性，设置之后是提交按钮的显示文本。
```

```
input 输入项标签：用于输入文本、数字、日期等信息，
        重要属性：
            type属性指定输入项类型，
                text 文本框
                password 密码框
                radio 单选框
                checkbox 复选框
                file 文件上传框
                reset 重置按钮
                submit 提交按钮
                button 普通按钮（配合js实现功能）
            name属性用于提交表单时标识元素的值；
            checked属性指定单选框或复选框的选项是否默认选中状态；（布尔值）
         id属性用于标识元素，
         required属性表示必填项 (布尔值)
```

```
select标签：下拉选择框标签，还可以做联动效果
	id
	name
```

```
option标签：下拉选择框的选项标签
	id
	value
    selected属性指定选项是否默认选中状态（布尔属性）
    disabled属性指定选项是否禁用状态
```

```
textarea标签
            cols属性指定文本域的列数
            rows属性指定文本域的行数
```

```
label标签
            用于关联表单元素，并提供文字说明。
            for属性：与input标签的id属性对应，用于绑定。
            如果在 label 元素内点击文本，就会触发此控件。
                就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。
```

```
button标签
			行级按钮容器，可以放置内容，比如文本或图像
            type属性：submit、reset、button。
                始终定义type属性，不同浏览器默认值不同。
            form属性：与表单的id属性对应，用于绑定。绑定后可放在任意位置
            onclick属性：自定义按钮点击事件。
```

