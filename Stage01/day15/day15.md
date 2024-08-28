## JSON

### 概念

- JSON 英文全称 **J**ava**S**cript **O**bject **N**otation
- JSON 是一种轻量级的数据交换格式。
- JSON是独立的语言 *****
- JSON 易于理解。

JSON 使用 JavaScript 语法，但是 JSON 格式仅仅是一个文本。

文本可以被任何编程语言读取及作为数据格式传递。

### 作用

JSON 是用于存储和传输数据的格式。
JSON 通常用于服务端向网页传递数据 。

### 和xml的区别(轻量级的体现)

```
	xml是一个重量级的语言(标签占用的体积比较大),现在主要用于后台的配置文件
		<user>
			<username>张三</username>
			<password>123</password>
		</user>
	josn是一个轻量级的语言(占用的体积比较小),主要用于网络传输
		'{"username":"张三","password":"abc"}'
```

### 格式

#### JSON 语法规则

- 数据为 键/值 对。
- 数据由逗号分隔。
- 大括号保存对象
- 方括号保存数组

#### JSON 对象

JSON 对象保存在大括号内。

就像在 JavaScript 中, 对象可以保存多个 键/值 对：

```json
{"name":"Runoob", "url":"www.runoob.com"}
```

每个键值对由一个键和一个值组成，键和值之间用冒号“:”分隔，键值对之间用逗号“,”分隔。

键必须是字符串，并且用双引号""包围。

值可以是字符串、数值、布尔值、数组、对象或“null”。

本质是字符串类型

#### JSON 数组

JSON 数组保存在中括号内。

就像在 JavaScript 中, 数组可以包含对象：

```json
"sites":[    
    {"name":"Runoob", "url":"www.runoob.com"},     
    {"name":"Google", "url":"www.google.com"},    
    {"name":"Taobao", "url":"www.taobao.com"} 
]
```

本质是数组类型，由多个json对象组成

### 与JS区别

```js
语法上
json字符串:属性名必须要用双引号引起来
js对象:属性名可以不用双引号

作用上
json字符串:本质是一个字符串,可以用于网络传输(从后台接收到的数据大部分都是json数据)
js对象:本质是一个对象(类的实例),不能在网络上传输(后台经常会将js对象转成json字符串,通过网络发送到前台)
```

### 与JS互转

```JS
JSON.parse()	用于将一个 JSON 字符串转换为 JavaScript 对象。
JSON.stringify()	用于将 JavaScript 值转换为 JSON 字符串。
注意：json字符串最好用反引号``包括，单引号或双引号可能会报错
```

## DOM概念

```
概念
	Document Object Model (文档对象模型)
文档对象模型
	当网页被加载时，浏览器会创建页面的文档对象模型
	当前的html文档就会被构造成对象的树(本质就是将页面中的所有组成部分都封装成一个个对象)
DOM操作页面元素的思想
	就是将html页面中的所有组成部分(标签,标签体,属性,注释)都抽成对象,用面向对象的方式来操作
	因为对象中有属性和方法,比单纯操作字符串方便的多
DOM作用
	通过可编程的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML。
    JavaScript 能够改变页面中的所有 HTML 元素
    JavaScript 能够改变页面中的所有 HTML 属性
    JavaScript 能够改变页面中的所有 CSS 样式
    JavaScript 能够对页面中的所有事件做出反应
    
Document 对象(文档最顶层的对象,可以操作页面中的所有元素)
	当浏览器载入 HTML 文档, 它就会成为 Document 对象。
	Document 对象是 HTML 文档的根节点。
	Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。
	
HTML DOM 节点
在 HTML DOM (Document Object Model) 中 , 每一个元素都是 节点:
    文档是一个文档节点。
    所有的HTML元素都是元素节点。
    所有 HTML 属性都是属性节点。
    文本插入到 HTML 元素是文本节点。
    注释是注释节点。
```

## DOM获取元素

```js
获取单个元素
	document.getElementById('elementID')	返回对拥有指定 id 的第一个对象的引用。
    
获取多个元素
	document.getElementsByName('name')		返回带有指定name属性值的所有元素节点列表。（NodeList 伪数组）
	document.getElementsByTagName('tagname')		返回带有指定标签名的元素集合。（HTMLCollection 伪数组）
	document.getElementsByClassName('classname')	返回文档中所有指定类名的元素集合（HTMLCollection 伪数组）
    
H5新增的方式(推荐)
	document.querySelector('选择器') 	返回文档中匹配指定的CSS选择器的第一元素
    document.querySelectorAll('选择器')		返回文档中匹配的CSS选择器的所有元素节点列表（NodeList 伪数组）
    优势：可以灵活地使用CSS选择器
    	document.querySelectorAll('li:nth-child(odd)')
```

## 事件入门

### 三要素

​	1,事件源(按钮)
​	2,事件(其实就是一个动作:点击动作)
​	3,事件处理程序(事件发生之后,需要做的事情,比如弹出消息)

### 三步骤

​	1,写一个事件源(写一个按钮)
​	2,写一个监听器(本质就是一个函数,里面封装的是事件发生之后要执行的代码,也称为事件处理函数)
​	3,绑定监听器和事件源(通过一个属性,将二者绑定到一起)

### 绑定方式

#### 行内绑定

使用行内绑定的方式，直接绑定在标签上，需要传递方法执行的字符串

```js
<button onclick="myClick()">秋香</button>
```

#### 动态绑定

动态绑定:需要先获取到按钮对象,然后在给按钮对象的属性赋值

```js
var btn =  document.querySelector('button')
btn.onclick = myClick
```

myClick是一个函数名,代表整个函数,不能加(),加()代表调用这个函数,然后把函数的返回值赋给onclick

改进:直接将事件处理函数以匿名函数的方式赋给按钮对象的onclick属性

#### 总结

**行内绑定**：需要提供一个可执行的代码段字符串，因此使用 `'myClick()'` 表示在事件发生时调用这个函数。

**动态绑定**：需要提供一个函数引用，因此使用 `myClick`，JavaScript引擎会在事件发生时调用这个函数。

#### 灯泡开关案例

```js
        //获取图片对象
        var img = document.querySelector('img')
    
        //添加点击事件
        img.onclick = function(){

            //判断
            var imgSrc = img.src
            console.log(imgSrc)//http://127.0.0.1:5500/img/off.gif 获取的是图片在网络中完整的url地址
			// 使用endsWith来判断图片的src属性
            if(imgSrc.endsWith('off.gif')){
                this.src = './img/on.gif' //事件中this代表事件源对象,这里也可以使用this来实现!!!
            }else{
                this.src = './img/off.gif'
            }
        }
```

##### 判断src方法介绍

```js
endsWith() 方法用来判断当前字符串是否是以指定的子字符串结尾的（区分大小写）。
如果传入的子字符串在搜索字符串的末尾则返回 true，否则将返回 false

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
不包含返回null，布尔值是false；
包含则返回一个数组，其中存放了与它找到的匹配文本有关的信息，因为数组不为空，布尔值是true 

includes() 方法用于判断字符串是否包含指定的子字符串。
如果找到匹配的字符串则返回 true，否则返回 false。 

search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。如果没有找到任何匹配的子串，则返回 -1。找到后返回匹配的 String 对象起始位置
```

##### 不依赖src属性的判断

```js
/*  使用奇偶数进行切换,不再依赖元素的属性判断
    奇数开，偶数关
    防止变量持续增大，在开灯后自减，关灯后自增 */
var img = document.querySelector('img')
var i = 1
img.onclick = function () {

    if (i % 2 == 0) {
        this.src = './images/off.gif'
        i++
    }
    else {
        this.src = './images/on.gif'
        i--
    }

}
```

```js
/* 使用布尔值进行切换,不再依赖元素的属性判断 */

var img = document.querySelector('img')
// 在外定义一个标记变量跟灯泡的亮灭保持一致
// 现在是开就要关，现在是关就要开
var flag = false
img.onclick = function () {
    if (flag) {
        this.src = './images/off.gif'
        flag = false //及时更新flag状态，和灯泡的亮灭保持一致
    }
    else {
        this.src = './images/on.gif'
        flag = true
    }
}
```

## DOM操作属性

```js
原始方法
	element.setAttribute('属性名','属性值')	设置或者改变指定属性并指定值。
	element.getAttribute('属性名')	返回指定元素的属性值

简化方法
设置
	element.attribute = 'value' 设置或者修改元素属性的值
获取
	element.attribute  		获取元素属性的值
	
场景
	操作图片的src属性(电灯开关案例,轮播图案例)
	操作input文本框的value属性(登录案例,猜年龄案例,书架案例)
	操作元素动画相关的属性(电风扇转速调节案例)
	操作input复选框的checked属性(复选框的选中案例)
```

## DOM操作标签体

### innerHTML&innerText

```js
innerHTML方式
	获取 
		元素对象.innerHTML	// 返回字符串化的HTML结构（元素标签内的）
	设置
		元素对象.innerHTML = '值'	// 解析为HTML元素（直接把值插入源码）
		
innerText方式  ---- 只能操作纯文本
	获取 
		元素对象.innerText	// 仅返回文本，不包含任何html标签
	设置
		元素对象.innerText = '值'	//将值作为纯文本字符串插入

建议：
	插入html元素时使用element.innerHTML = '值'
	获取html元素内的文本使用element.innerText
```

### Node.textContent

Node 接口的 textContent 属性表示一个节点及其后代的文本内容。

备注： textContent 和 HTMLElement.innerText 容易混淆，但这两个属性在重要方面有不同之处 。

#### 语法

```js
let text = someNode.textContent;
someOtherNode.textContent = string;
```

#### 返回值

一个字符串或 null.

#### 与 innerText 的区别

- textContent 会获取所有元素的内容，包括` <script>` 和 `<style>` 元素，然而 innerText 只展示给人看的元素。
- textContent 会返回节点中的每一个元素。相反，innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，
  - 此外，由于 innerText 受 CSS 样式的影响，它会触发回流（ reflow ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）
- 与 textContent 不同的是，在 Internet Explorer (小于和等于 11 的版本) 中对 innerText 进行修改，不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。

#### 与 innerHTML 的区别

正如其名称，Element.innerHTML 返回 HTML。通常，为了在元素中检索或写入文本，人们使用 innerHTML。但是，textContent 通常具有更好的性能，因为文本不会被解析为 HTML。

此外，使用 textContent 可以防止 XSS 攻击。

## DOM操作样式

```JS
单独设置样式
	元素对象.style.样式属性名 = '属性值'
	
	对于CSS中由‘-’连接的属性名，使用小驼峰命名法改写
		background-color	->	backgroundColor

批量设置样式
	使用className
		元素对象.className = 'class属性值'(不推荐,可能会覆盖原有样式)
		弊端
        	会覆盖原来设置的类名，原来用类选择器设置的样式会失效
	使用classList
		add('class1', 'class2', ...)	在元素中添加一个或多个类名。
        remove('class1', 'class2', ...)	移除元素中一个或多个类名。
        toggle('class', true|false)	在元素中切换类名。
        contains('class')	返回布尔值，判断指定的类名是否存在。
        //注意 是类名，不是类选择器
```

### classList

#### 定义和用法

classList 属性返回元素的类名，作为 DOMTokenList 对象。

该属性用于在元素中添加，移除及切换 CSS 类。

classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。

#### 语法

```js
element.classList
```

#### 属性

length	返回类列表中类的数量

该属性是只读的

#### 方法

##### add(class1, class2, ...)	

在元素中添加一个或多个类名。

如果指定的类名已存在，则不会添加

##### contains(class)	

返回布尔值，判断指定的类名是否存在。
可能值：

true - 元素包已经包含了该类名
false - 元素中不存在该类名

##### item(index)	

返回元素中索引值对应的类名。索引值从 0 开始。

如果索引值在区间范围外则返回 null

##### remove(class1, class2, ...)	

移除元素中一个或多个类名。

注意： 移除不存在的类名，不会报错。

##### toggle(class, true|false)	

在元素中切换类名。

第一个参数为要在元素中移除的类名，并返回 false。

如果该类名不存在则会在元素中添加类名，并返回 true。

第二个是可选参数，是个布尔值用于设置元素是否强制添加或移除类，不管该类名是否存在。例如：

移除一个 class: element.classList.toggle("classToRemove", false);

添加一个 class: element.classList.toggle("classToAdd", true);

注意： Internet Explorer 或 Opera 12 及其更早版本不支持第二个参数。

#### 返回值

一个 DOMTokenList, 包含元素的类名列表
