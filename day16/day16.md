## DOM节点

在 HTML DOM (Document Object Model) 中 , 每一个元素都是 **节点**:

- 文档是一个文档节点。
- 所有的HTML元素都是元素节点。
- 所有 HTML 属性都是属性节点。
- 文本插入到 HTML 元素是文本节点。are text nodes。
- 注释是注释节点。

## 节点操作

### 元素对象的操作

```js
element.firstChild	返回元素的第一个子节点
element.firstElementChild	返回元素的第一个子元素

element.lastChild	返回最后一个子节点
element.lastElementChild	返回指定元素的最后一个子元素

element.childNodes	返回包含元素所有子节点的伪数组（NodeList）
element.children	返回元素的子元素的伪数组（HTMLCollection）

element.parentNode	返回元素的父节点
element.parentElement	返回元素的父元素
```

#### 返回所有类型节点

##### element.firstChild

###### 定义和用法

firstChild 属性返回被选节点的第一个子节点。

**注意：**如果选定的节点没有子节点，则该属性返回 NULL。

###### 语法

```JS
node.firstChild
```

###### 返回值	

节点的第一个子节点或null。

##### element.lastChild

###### 定义和用法

firstChild 属性返回被选节点的最后一个子节点。

**注意：**如果选定的节点没有子节点，则该属性返回 NULL。

###### 语法

```JS
node.lastChild
```

###### 返回值	

节点的最后一个子节点或null。

##### element.childNodes

###### 定义和用法

childNodes 属性返回包含被选节点的子节点的 NodeList。

**提示：** 如果选定的节点没有子节点，则该属性返回不包含节点的 NodeList。如需循环子节点列表，使用 nextSibling 属性，要比使用父对象的 childNodes 列表效率更高。

###### 语法

```js
element.childNodes
```

###### 返回值

NodeList 对象, 代表节点集合。

##### element.parentNode

###### 定义和用法

parentNode 属性可返回某节点的父节点。

如果指定的节点没有父节点则返回 *null* 。

###### 语法

```js
node.parentNode
```

###### 返回值

作为一个节点对象返回父节点。

#### 返回元素类型节点

##### element.firstElementChild

###### 定义和用法

firstElementChild 属性返回指定元素的第一个子元素。

该属性是只读的。

**提示**：使用 children 属性返回指定元素的任何子元素。

**提示**：要返回指定元素的最后一个子元素，请使用 lastElementChild 属性。

###### 语法

```js
element.firstElementChild
```

###### 返回值

Object	返回 Node 对象，表示元素的第一个子元素，如果没有子元素，则返回 null

##### element.lastElementChild

###### 定义和用法

lastElementChild 属性返回指定元素的最后一个子元素。

该属性是只读的。

**提示**：使用 children 属性返回指定元素的任何子元素。

**提示**：要返回指定元素的第一个子元素，请使用 firstElementChild 属性。

###### 语法

```js
element.lastElementChild
```

###### 返回值

Object	返回 Node 对象，表示元素的最后一个子元素，如果没有子元素，则返回 null

##### element.children

###### 定义和用法

children 属性返回元素的子元素的集合，是一个 HTMLCollection 对象。

**提示:** 根据子元素在元素中出现的先后顺序进行排序。使用 HTMLCollection对象的 length属性获取子元素的数量，然后使用序列号(index，起始值为0)访问每个子元素。

children 属性与 childNodes属性的差别：

- childNodes 属性返回所有的节点，包括文本节点、注释节点；
- children 属性只返回元素节点；

###### 语法

```js
element.children
```

###### 返回值

HTMLCollection 对象，表示一个元素节点的集合，元素在集合中的顺序是在源码中的顺序。

##### element.parentElement

###### 定义和用法

返回当前节点的父元素节点，如果该元素没有父节点，或者父节点不是一个 DOM 元素，则返回 null

###### 语法

```js
element.parentElement
```

###### 返回值

当前节点的父元素。它永远是一个 DOM 元素 对象，或者 null。

### 创建

```js
创建，通过document对象创建
document.createAttribute()	创建一个属性节点
document.createComment()	createComment() 方法可创建注释节点。
document.createDocumentFragment()	创建空的 DocumentFragment 对象节点，并返回此对象。
document.createElement()	创建元素节点。
document.createTextNode()	创建文本节点。
```

##### document.createAttribute()

###### 定义和用法

createAttribute()方法用于创建一个指定名称的属性，并返回Attr 对象属性。

###### 语法

```js
document.createAttribute('attributename')
```

attributename	Attr object	必须。要创建的属性名称。

###### 返回值

节点对象	创建的属性

##### document.createComment()

###### 定义和用法

createComment() 方法可创建注释节点。

###### 语法

```JS
document.createComment('text')
```

text	String	可选. 添加的注释文本。

###### 返回值

Comment object	创建的注释节点

##### document.createDocumentFragment()

###### 定义和用法

createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。

当你想提取文档的一部分，改变，增加，或删除某些内容及插入到文档末尾可以使用createDocumentFragment() 方法。

你也可以使用文档的文档对象来执行这些变化，但要防止文件结构被破坏，createDocumentFragment() 方法可以更安全改变文档的结构及节点。

###### 语法

```js
document.createDocumentFragment()
```

参数	None.

###### 返回值

DocumentFragment 对象	创建文档片段对象

##### document.createElement()

###### 定义和用法

createElement() 方法通过指定名称创建一个元素

**注意**：HTML元素经常包含文本。创建指定文本的按钮你需要在按钮元素后添加文本节点

###### 语法

```js
document.createElement('nodename')
```

nodename	String	必须。创建元素的名称。

###### 返回值

元素对象	创建的元素节点

##### document.createTextNode()

###### 定义和用法

createTextNode() 可创建文本节点。

**注意**：HTML元素通常是由元素节点和文本节点组成

###### 语法

```js
document.createTextNode('text')
```

text	String	必须。文本节点的文本。

###### 返回值

文本节点对象	创建文本节点

### 添加

```js
element.appendChild()	向节点的子节点列表的末尾添加新的子节点
element.insertBefore()	现有的子节点之前插入一个新的子节点

Element.append()	在当前 Element 的最后一个子节点之后插入一组 Node 对象或字符串对象。被插入的字符串对象等价为 Text 节点
```

##### element.appendChild()

###### 定义和用法

appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。

**提示**：如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。

你可以使用 appendChild() 方法移除元素到另外一个元素。

###### 语法

```js
node.appendChild(node)
```

node	节点对象	必须。你要添加的节点对象。

###### 返回值

节点对象	添加的节点

##### element.insertBefore()

###### 定义和用法

insertBefore() 方法可在已有的子节点前插入一个新的子节点。

**提示：** 如果你想创建一个新的文本列表项，在 LI 元素后你应该添加元素的文本节点，然后在列表中添加 LI元素。

你也可以使用 insertBefore 方法来 插入/移除 已存在的元素。

###### 语法

```js
node.insertBefore(newnode,existingnode)
```

newnode	节点对象	必须。要插入的节点对象
existingnode	节点对象	必须。要添加新的节点前的子节点。

###### 返回值

节点对象	你插入的节点

##### Element.append()

###### 定义和用法

在当前 Element 的最后一个子节点之后插入一组 Node 对象或字符串对象。被插入的字符串对象等价为 Text 节点

其与 Node.appendChild() 的差异：

Element.append() 允许附加字符串对象，而 Node.appendChild() 只接受 Node 对象。
Element.append() 没有返回值，而 Node.appendChild() 返回附加的 Node 对象。
Element.append() 可以附加多个节点和字符串，而 Node.appendChild() 只能附加一个节点。

###### 语法

```js
append(param1)
append(param1, param2)
append(param1, param2, /* …, */ paramN)
```

param1、…、paramN
一组要插入的 Node 或字符串对象

###### 返回值

无（undefined）

### 删除

```js
element.removeChild()	删从子节点列表中删除某个节点
```

##### element.removeChild()

###### 定义和用法

removeChild() 方法可从子节点列表中删除某个节点。

如删除成功，此方法可返回被删除的节点，如失败，则返回 NULL。

###### 语法

```
node.removeChild(node)
```

node	节点对象	必须。 你要移除的节点对象。

###### 返回值

节点对象	移除的节点或null

##### 一般做法

```js
// 方式一：直接获取到父元素，再删除
var body = document.querySelector('body')
body.removeChild(img)
```

```js
// 方式二：可以通过子元素找到父元素，然后再删除
var parent = img.parentElement
parent.removeChild(img)
```

```js
// 方式三：若父元素是html的body，直接使用document的body属性
document.body.removeChild(img)
```



## 其他事件

```js
点击事件
	onclick
焦点事件
	onblur 失去焦点
    	常用于Javascript验证代码，一般用于表单输入框
	onfocus 获取焦点
    	通常用于 <input>, <select>, 和<a>
鼠标移入移出事件
    onmouseover	鼠标移到某元素之上。	
    onmouseout	鼠标从某元素移开。
键盘事件
    onkeydown	某个键盘按键被按下。	
    onkeypress	某个键盘按键被按下并松开。
		在所有浏览器中 onkeypress 事件只能监听字母和数字，
        不能监听一些特殊按键（ALT、CTRL、SHIFT、ESC、箭头等）。
        但是可以监听大小写
        监听一个用户是否按下按键请使用 onkeydown 事件,所有浏览器都支持 onkeydown 事件。
    onkeyup	某个键盘按键被松开。
        /* 
        与 onkeydown 事件相关联的事件触发次序:
        onkeydown
        onkeypress
        onkeyup
        */
```

### 排他思想

设置自己的样式前，清除其它元素的样式

```html
<body>
    <button>按钮1</button><button>按钮2</button><button>按钮3</button><button>按钮4</button><button>按钮5</button>

    <script>
        // 需求，点击那个按钮，那个按钮就变成蓝色，其他按钮颜色不变
        var btns = document.querySelectorAll('button')
        btns.forEach(function (btn) {
            btn.onclick = function () {
                // 使用排他思想
                // 在设置当前点击的那个按钮的背景颜色之前,先把所有按钮的背景颜色都去掉
                btns.forEach(function (btn) {
                    btn.style.backgroundColor = ''
                })

                // 设置当前点击按钮的背景
                this.style.backgroundColor = 'lightblue'
            }
        })
    </script>

</body>
```

#### 使用场景

选项卡，轮播图

### 自定义属性

H5可以通过 data-自定义属性名 的方式给元素添加自定义属性

#### 设置

直接在标签上设置：

```html
<标签名 data-自定义属性名="值">
```

通过js代码设置：

```js
元素对象.dataset.自定义属性名='值'
```

两种方式值使用单双引号都可以，只不过为了区分，html双引号，js单引号

#### 获取自定义属性值

元素对象.dataset.自定义属性名

```html
<body>
    <div class="radio" data-type="pay_type" data-value="10">本周免费</div>
    <div class="radio" data-type="pay_type" data-value="11">新手推荐</div>
    <script>
        /*
        H5可以通过 data-自定义属性名 的方式给元素添加自定义属性
    
        设置
            直接在标签上设置：<标签名 data-自定义属性名="值">
            通过js代码设置：元素对象.dataset.自定义属性名='值'
                两种方式值使用单双引号都可以，只不过为了区分，html双引号，js单引号
        获取自定义属性值
            元素对象.dataset.自定义属性名
        */

        var radio1 = document.querySelector('.radio')
        radio1.dataset.name = 'free'
        console.log(radio1.dataset.type);
        console.log(radio1.dataset.value);
    </script>
</body>
```

#### 作用

可以给标签带上数据，将来可以用于筛选数据等

## 事件高级

### H5监听注册事件的方式

```html
传统方式注册事件
  	1,使用on开头的事件属性来注册事件,本质就是设置元素的属性
	2,同一个元素的同一个事件,只能接收一个事件处理函数,后面注册的事件函数会覆盖前面注册的事件函数
H5监听注册方式
	1,使用addEventListener()方法来注册事件,本质就是调用方法
	2,同一个元素的同一个事件,可以接收多个事件处理函数,会按照注册的顺序依次执行
```

### DOM事件流

```js
概念
	事件在发生的时候,会在元素节点中按照指定是顺序传播,这叫做事件流
事件捕获
	网景公司最早提出的:事件是最开始由DOM最顶层的节点接收,然后逐级向下传播到最具体的元素接收
事件冒泡
	IE公司最早提出:事件最开始由最具体的元素接收,然后逐级向上传播到最顶层的过程
W3C统一了二者观点:事件先捕获再冒泡,将DOM事件流分成了3个部分
	1.捕获阶段:从顶层节点到具体事件源的过程
	2,到达当前目标阶段:到达具体触发事件的元素(到达事件源)
	3,冒泡阶段:从具体事件源传播到最顶层节点的过程
addEventListener('event', function, useCapture)
	如果第三个参数是false(默认),表明在事件冒泡阶段调用事件处理函数(执行顺序:底层-顶层)
	如果第三个参数是true,表明在事件捕获阶段调用事件处理函数(执行顺序:顶层-底层)
	
	注意点
		传统注册事件的方式(on开头的属性绑定),只能得到冒泡阶段
		开发中我们很少使用事件捕获,更关心的是事件冒泡
		有些事件没有冒泡,比如blur,focus,onmouseenter,onmouseleave等
```

##### addEventListener()

###### 定义和用法

addEventListener() 方法用于向指定元素添加事件句柄。

addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄。

你可以向一个元素添加多个事件句柄。

你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。

你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。

addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。

当你使用 addEventListener() 方法时, JavaScript 从 HTML 标记中分离开来，可读性更强， 在没有控制HTML标记时也可以添加事件监听。

你可以使用 removeEventListener() 方法来移除事件的监听。

###### 语法

```js
element.addEventListener('event', function, useCapture);
```

第一个参数是事件的类型 (如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。

**注意**：不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。

###### 参数

event	必须。字符串，指定事件名。

注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。



function	必须。指定要事件触发时执行的函数。

事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。



useCapture	可选。布尔值，指定事件是否在捕获或冒泡阶段执行。

可能值:
true - 事件句柄在捕获阶段执行
false- 默认。事件句柄在冒泡阶段执行

##### removeEventListener() 

###### 定义和用法

removeEventListener() 方法用于移除由 addEventListener() 方法添加的事件句柄。

**注意**： 如果要移除事件句柄，addEventListener() 的执行函数必须使用外部函数。

匿名函数，类似 "document.removeEventListener("event", function(){ myScript });" 该事件是无法移除的。

###### 语法

```js
element.removeEventListener(event, function, useCapture)
```

