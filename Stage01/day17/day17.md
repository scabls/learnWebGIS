## 其他事件

### 框架/对象事件

#### onload 事件

##### 定义和用法

onload 事件会在页面或图像加载完成后立即发生。

onload 通常用于` <body>` 元素，在页面完全载入后(包括图片、css文件等等。)执行脚本代码。

##### 语法

在 HTML 中:

```html
<body onload="SomeJavaScriptCode">
```

在 JavaScript 中:

```js
window.onload=function(){SomeJavaScriptCode};
```

SomeJavaScriptCode	必需。规定该事件发生时执行的 JavaScript。

##### 以下 HTML 标签支持 onload 

```html
<body>, <frame>, <frameset>, <iframe>, <img>, <input type="image">, <link>, <script>, <style>
```

#### onunload 事件

##### 定义和用法

onunload 事件在用户退出页面时发生。

onunload 发生于当用户离开页面时发生的事件(通过点击一个链接，提交表单，关闭浏览器窗口等等。)

**注意**： onunload 事件同样触发了页面载入事件(+ onload 事件)。

##### 语法

HTML 中:

```html
<body onunload="SomeJavaScriptCode">
```

JavaScript 中:

```js
window.onunload=function(){SomeJavaScriptCode};
```

SomeJavaScriptCode	必需。规定该事件发生时执行的 JavaScript。

##### 以下 HTML 标签支持 onunload 

```html
<body>, <frameset>
```

#### onscroll 事件

```

```



### 表单事件

#### onchange 事件

##### 定义和用法

onchange 事件会在域的内容改变时发生。

onchange 事件也可用于单选框与复选框改变后触发的事件。

##### 语法

HTML 中:

```js
<element onchange="SomeJavaScriptCode">
```

JavaScript 中:

```js
object.onchange=function(){SomeJavaScriptCode};
```

SomeJavaScriptCode	必需。规定该事件发生时执行的 JavaScript。

##### 支持 onchange 事件的 HTML 标签

```html
<input>, <select>, <textarea>
```

#### onsubmit 事件

```

```



### 拖动事件

#### ondrag 事件

```

```



## 事件高级

### 事件对象

事件发生之后,跟事件相关的一系列信息数据的集合,都会放到这个对象中,这对象就是事件对象
比如：

1. 谁绑定了这个事件
2. 如果是鼠标触发的事件,可以得到鼠标相关的信息,比如鼠标的坐标
3. 如果是键盘触发的事件,可以得到键盘相关的信息,比如按下了哪个键

#### 获取事件对象

事件在触发的时候,都会产生事件对象,并且系统会以参数的形式传递给事件处理函数。
我们可以在事件处理函数中,声明一个参数,用于接收这个事件对象。

```html
<button>按钮</button>
<script>
    //获取鼠标事件对象
    document.querySelector('button').addEventListener('click',function(e){
        console.log('我被点了')

        //e代表当前点击事件的事件对象(里面就包含了鼠标的坐标相关的信息)
        console.log(e)//PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
    })
</script>
```

#### 事件对象作用

1. 可以获取当前事件的类型(e.type)
2. 在键盘事件中可以监听按下了哪个键(e.keyCode)
3. 可以获取具体点击了哪一个子元素(e.target)
4. 可以阻止某些标签的默认行为(e.preventDefault())
5. 可以阻止事件冒泡(e.stopPropagation())

#### 事件对象属性

##### type 事件属性

###### 定义和用法

type 事件属性返回发生的事件的类型，即当前 Event 对象表示的事件的名称。

它与注册的事件句柄同名，或者是事件句柄属性删除前缀 "on" 比如 "submit"、"load" 或 "click"。

###### 语法

```js
event.type
```

###### 实例

```html
<button>按钮</button>
<script>
    //获取鼠标事件对象
    document.querySelector('button').addEventListener('click',function(e){
        console.log('我被点了')

        //事件对象作用1,可以获取当前事件的类型(e.type)
        console.log(e.type)
    })
</script>
```

##### key 事件属性

###### 定义和使用

key 事件在按下按键时返回按键的标识符。

按键标识符是表示键盘按钮的字符串，该属性的返回值可以是：

- 单个字母 (如 "a", "W", "4", "+" 或 "$")
- 多个字母 (如 "F1", "Enter", "HOME" 或 "CAPS LOCK")

**提示**： 如果你想查看是否按下了 "ALT", "CTRL", "META" 或 "SHIFT" 键，可使用 altKey, ctrlKey, metaKey 或 shiftKey 属性。

###### 语法

```js
KeyboardEvent.key
```

###### 返回值

字符串，表示按键按钮。

可能值：

- 单个字母 (如 "a", "W", "4", "+" 或 "$")
- 多个字母 (如 "F1", "Enter", "HOME" 或 "CAPS LOCK")

**注意**： Chrome，Safari 和 Opera浏览器返回 undefined

##### keyCode 事件属性

###### 定义和使用

keyCode 属性返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键盘代码。

两种代码类型的区别是:

- 字符代码 - 表示字符的ASCII码
- 键盘代码 - 表示键盘上对应键ASCII码

两种类型的值不是都相等的，例如小写字符 "w" 和大写字符 "W" 有相同的键盘代码，因为键盘上是大写字符 "W"， ( "W" 代码为 "87")；但是它们有不同的字符代码，两个字符输出是不一样的( "w" 和 "W" 字符代码为 "119" 和 "87") 

也就是说，onkeydown 或 onkeyup 事件中，无论字母是大写还是小写，keyCode只能获取对应键的大写字母的ASCII码；而onkeypress事件中keyCode能够区分字母的大小写，获得实际字母的ASCII码。

###### 语法

```JS
KeyboardEvent.keyCode
```

###### 返回值

数字，表示 Unicode 字符代码或 Unicode 键代码

###### 实例

无需判断大小写的场景

```JS
/*  需求:模拟京东聚焦效果,当按下了s键,光标就会自动聚焦在input上 */

//建议监听松开事件,这样文本框就不会残留s字符
document.addEventListener('keyup',function(e){
    console.log(e.keyCode)//通过打印可以看出s字符的键盘代码的ASCII码是83

    //判断
    if(e.keyCode == 83){
        //让文本框聚焦
        //focus()	让文本域获取焦点
        document.querySelector('input').focus()
    }
})
```

需要判断大小写的场景

```js
document.addEventListener('keypress',function(e){
    console.log(e.keyCode)

    //如果想要监听大小写,需要使用keypress事件(keypress对功能键不起作用)
    //就可以根据keyCode的值,判断是否按下了大小写
    if(e.keyCode == 97){
        console.log('按下了小写的a')
    }else if(e.keyCode == 65){
        console.log('按下了大写的a')
    }else{
        console.log('按下了其他键')
    }
})
```

##### preventDefault() 事件方法

阻止某些标签的默认行为

```html
<body>
    <a href="http://www.baidu.com">百度</a>

    <script>
        /* 需求:点击a标签,弹出百度一下消息,不再跳转 */
        document.querySelector('a').addEventListener('click',function(e){
            alert('百度一下')

            //事件对象作用4,可以阻止某些标签的默认行为(e.preventDefault())
            e.preventDefault()
        })
    </script>
</body>
```

##### stopPropagation() 方法

阻止事件冒泡

阻止事件冒泡可以阻止父元素同类事件的事件监听器被元素的事件触发

```html
<body>
    <div class="c1">
        <div class="c2"></div>
    </div>
    <script>
        var c1 = document.querySelector('.c1')
        var c2 = document.querySelector('.c2')
        var body = document.querySelector('body')
        c2.addEventListener('click', function (e) {
            console.log(this);
            e.stopPropagation()//阻止冒泡
        })
        c1.addEventListener('click', function (e) {
            console.log(this);

        })
        body.addEventListener('click', function (e) {
            console.log(this);

        })
    </script>
</body>
```

##### target 事件属性

###### 定义和用法

target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。

###### 语法

```js
event.target
```

##### currentTarget 事件属性

###### 定义和用法

currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。

在捕获和起泡阶段，该属性是非常有用的，因为在这两个节点，它不同于 target 属性。

###### 语法

```js
event.currentTarget
```

###### 与target 事件属性的区别

```html
<body>
    <div id="parent" style="padding: 20px; background-color: lightblue;">
        Parent
        <button id="child" style="margin: 20px;">Child</button>
    </div>

    <script>
        document.getElementById('parent').addEventListener('click', function(event) {
            console.log('Parent clicked');
            console.log('target:', event.target); // 事件最初触发的元素
            console.log('currentTarget:', event.currentTarget); // 当前正在处理事件的元素
        });

        document.getElementById('child').addEventListener('click', function(event) {
            console.log('Child clicked');
            console.log('target:', event.target); // 事件最初触发的元素
            console.log('currentTarget:', event.currentTarget); // 当前正在处理事件的元素
        });
    </script>
</body>
```

如果你点击 `Child` 按钮：

- `target` 是 `button` 元素，因为这是事件最初触发的地方。
- `currentTarget` 在 `child` 的事件处理程序中也是 `button` 元素，因为它是事件处理程序附加到的元素。
- 但是在 `parent` 的事件处理程序中，`currentTarget` 是 `div` 元素，因为这是事件处理程序附加到的元素，而 `target` 仍然是 `button` 元素。

如果你点击 `Parent` div（但不是按钮）：

- `target` 和 `currentTarget` 都是 `div` 元素。

总结：

- `target` 是用户实际与之交互的元素。
- `currentTarget` 是事件处理程序当前附加到的元素。

### 事件代理/委托

```js
概念
	将事件委托给别人,代为处理
	不需要通过子类来注册事件,而是委托给父类
	本质就是给父元素添加事件,将事件处理函数绑定到父类上执行
原因
	使用事件冒泡,当子元素的事件触发之后,会冒泡到父元素,就会执行父元素中的事件处理函数
好处
	1,只需要给父元素绑定一个事件,没必要给每一个子元素都绑定事件,提高了程序的性能
	2,可以实现给新增的元素动态添加事件
```

#### 基本使用

```html
<ul>
    <li>aaa</li>
    <li>bbb</li>
    <li>ccc</li>
</ul>
<script>
    // 给li绑定事件，点击之后，弹出里面的内容
    // 方式一 传统方式：获取所有li，遍历添加事件
    // var lis = document.querySelectorAll('li')
    // lis.forEach(function (li) {
    //     li.addEventListener('click', function () {
    //         alert(li.textContent)
    //     })
    // })

    // 方式二 事件代理
    var ul = document.querySelector('ul')
    ul.addEventListener('click', function (e) {
        alert(e.target.textContent) // 使用target属性获得触发该事件的节点
    })
</script>
```

#### 新增元素的动态事件获取

```html
 <ul>
    <li>aaa</li>
    <li>bbb</li>
    <li>ccc</li>
</ul>
<button>新增li元素</button>
<script>
    var ul = document.querySelector('ul')
    var button = document.querySelector('button')
    button.addEventListener('click', function () {
        var li = document.createElement('li')
        li.textContent='新的li！'
        ul.appendChild(li)
    })

    // 可以实现新增元素事件的动态绑定
    ul.addEventListener('click', function (e) {
        alert(e.target.textContent)
    })
</script>
```

##### 传统方式为新增元素绑定事件

```html
<ul>
    <li>aaa</li>
    <li>bbb</li>
    <li>ccc</li>
</ul>
<button>新增li元素</button>
<script>
    var ul = document.querySelector('ul')
    var button = document.querySelector('button')
    button.addEventListener('click', function () {
        var li = document.createElement('li')
        li.textContent = '新的li！'
        // 新增的同时添加事件
        li.addEventListener('click', function () {
            alert(li.textContent)
        })
        ul.appendChild(li)
    })

    var lis = document.querySelectorAll('li')
    lis.forEach(function (li) {
        li.addEventListener('click', function () {
            alert(li.textContent)
        })
    })
</script>
```

### 鼠标事件对象

```JS
目的
	就是为了获取鼠标在文档中的坐标
属性
	client:表示鼠标在可视区的x轴和y轴的坐标 clientX clientY
	page:表示鼠标在页面文档区域的x轴和y轴的坐标 pageX pageY
	screen:表示鼠标在电脑屏幕的x轴和y轴的坐标 screenX screenY
    offset:表示鼠标与目标对象的边框内边缘在x轴和y轴的偏移量 offsetX offsetY
```

## BOM简介

```HTML
概念
	Browser Object Model (BOM) 浏览器对象模型
作用
	使 JavaScript 有能力与浏览器"对话"
	比如 弹框, 新建窗口,跳转到其他页面,实现定时效果
组成
	window对象  窗口对象 表示浏览器的窗口
	location对象 地址栏对象 用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
	history对象  历史记录对象 包含浏览器的历史
	screen对象  屏幕对象 包含有关用户屏幕的信息
	navigator对象 浏览器对象 包含有关访问者浏览器的信息。
操作思想
	将浏览器的各个组成部分封装成对象,用面向对象的方式和来操作
	因为对象有属性和方法,可以直接调用属性和方法来实现需求
```

## Window对象

Window 对象表示浏览器中打开的窗口。

如果文档包含框架（`<frame> `或 `<iframe>` 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。

所有浏览器都支持 window 对象。

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。

全局变量是 window 对象的属性。

全局函数是 window 对象的方法。

甚至 HTML DOM 的 document 也是 window 对象的属性之一：

```js
window.document.getElementById("header");
```

与此相同：

```js
document.getElementById("header");
```

调用Window对象的属性和方法时可以省略`window.`

### 弹窗相关

#### alert() 方法

##### 定义和用法

alert() 方法用于显示带有一条指定消息和一个 确认 按钮的警告框。

##### 语法

```js
alert(message)
```

#### prompt() 方法

##### 定义和用法

prompt()方法用于显示可提示用户进行输入的对话框。

这个方法返回用户输入的字符串。

##### 语法

```js
prompt(msg,defaultText)
```

msg	可选。要在对话框中显示的纯文本（而不是 HTML 格式的文本）。

defaultText	可选。默认的输入文本。

#### confirm() 方法

##### 定义和用法

confirm()方法用于显示一个带有指定消息和确认及取消按钮的对话框。

如果访问者点击"确定"，此方法返回true，否则返回false。

##### 语法

```js
confirm(message)
```

##### 返回值

boolean 布尔值

### 窗口相关

#### open() 方法

##### 定义和用法

open() 方法用于打开一个新的浏览器窗口或查找一个已命名的窗口。

##### 语法

```js
window.open(URL,name,specs,replace)
```

URL	可选。打开指定的页面的URL。如果没有指定URL，打开一个新的空白窗口

name	可选。指定target属性或窗口的名称。支持以下值：

- _blank - URL加载到一个新的窗口。这是默认
- _parent - URL加载到父框架
- _self - URL替换当前页面
- _top - URL替换任何可加载的框架集
- *name* - 窗口名称

#### close() 方法

##### 定义和用法

close() 方法用于关闭浏览器窗口。

##### 语法

```js
window.close()
```

##### 实例

关闭打开的网页

```html
<body>
    <button class="open">打开窗口</button>
    <button class="close">关闭窗口</button>
    <script>
        // 定义新变量，保存新窗口
        var newWindow = null
        var btn1 = document.querySelector('.open')
        var btn2 = document.querySelector('.close')
        btn1.addEventListener('click', function () {
            newWindow = open('https://www.runoob.com/jsref/met-win-open.html')
        })
        btn2.addEventListener('click', function () {
            // window.close() //谁调用就关闭谁
            newWindow.close()
        })
    </script>
</body>
```

### 定时器

#### setTimeout() 方法

##### 定义和用法

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

**提示**： 1000 毫秒= 1 秒。

**提示**： 如果你只想重复执行可以使用 setInterval() 方法。

**提示**： 使用 clearTimeout() 方法来阻止函数的执行。

##### 语法

```js
setTimeout(code, milliseconds, param1, param2, ...)
setTimeout(function, milliseconds, param1, param2, ...)
```

code/function	必需。要调用一个代码串，也可以是一个函数。

milliseconds	可选。执行或调用 code/function 需要等待的时间，以毫秒计。默认为 0。

param1, param2, ...	可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。

##### 返回值

返回一个 ID（数字），可以将这个ID传递给 clearTimeout() 来取消执行。

##### 示例

```js
function f1() {
    console.log('一秒后打印');
}
function f2() {
    console.log('两秒后打印');
}
// 方式一：传函数名（函数名代表整个函数）
setTimeout(f1, 1000)
// 方式二：传代码串
setTimeout('f2()', 2000)
// 方式三：匿名函数
setTimeout(function () {
    console.log('三秒后打印');
}, 3000)
```

#### clearTimeout() 方法

##### 定义和用法

clearTimeout() 方法可取消由 setTimeout() 方法设置的定时操作。

clearTimeout() 方法的参数必须是由 setTimeout() 返回的 ID 值。

**注意**: 要使用 clearTimeout() 方法, 在创建执行定时操作时要使用全局变量：

```js
myVar = setTimeout("javascript function", milliseconds);
```

如果方法还未被执行，我们可以使用 clearTimeout() 来阻止它。

##### 语法

```js
clearTimeout(id_of_settimeout)
```

id_of_setinterval	调用 setTimeout() 函数时所获得的返回值，使用该返回标识符作为参数，可以取消该 setTimeout() 所设定的定时执行操作。

##### 返回值

无

#### setInterval() 方法

##### 定义和用法

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。

**提示**： 1000 毫秒= 1 秒。

**提示**： 如果你只想执行一次可以使用 setTimeout() 方法。

##### 语法

```js
setInterval(code, milliseconds);
setInterval(function, milliseconds, param1, param2, ...)
```

code/function	必需。要调用一个代码串，也可以是一个函数。

milliseconds	必须。周期性执行或调用 code/function 之间的时间间隔，以毫秒计。

param1, param2, ...	可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。

##### 返回值

返回一个 ID（数字），可以将这个ID传递给clearInterval()以取消执行。

##### 注意

若要在事件或函数内创建计时器，推荐先在事件/函数外创建一个变量用来接收计时器的返回值。事件开始先清除计时器，保证上次调用事件的计时器被关闭。

###### 抽奖案例

点击按钮开始抽奖，再点击暂停。

```html
<span id="layer">000000</span>
<input id="btn" type="button" value='生成随机数' />

<script>
    var span = document.querySelector('#layer')
    var btn = document.querySelector('#btn')
    var flag = true
    var intervalID;
    btn.addEventListener('click', function () {
        flag = !flag
        if (flag) {
            clearInterval(intervalID)
        } else {
            intervalID = setInterval(function () {
                var content = Math.random().toFixed(6).slice(-6)
                span.textContent = content
            }, 100)
        }
    })
</script>
```

#### clearInterval() 方法

##### 定义和用法

clearInterval() 方法可取消由 setInterval() 函数设定的定时执行操作。

clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值。

**注意**: 要使用 clearInterval() 方法, 在创建执行定时操作时要使用全局变量：

```js
myVar = setInterval("javascript 函数", milliseconds);
```

你可以通过 clearInterval() 方法来停止执行。

##### 语法

```js
clearInterval(id_of_setinterval)
```

id_of_setinterval	调用 setInterval() 函数时所获得的返回值，使用该返回标识符作为参数，可以取消该 setInterval() 所设定的定时执行操作。

##### 返回值

没有返回值。

## Location对象

window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。

Location 对象是 window 对象的一部分，可通过 window.location.xxx 格式的相关属性对其进行访问。

#### href 属性

##### 定义和用法

href 属性是一个可读可写的字符串，可设置或返回当前显示的文档的完整 URL。

##### 语法

```js
location.href			// 获取当前页面地址
location.href = URL		// 设置当前页面地址
```

#### reload() 方法

##### 定义和用法

reload() 方法用于刷新当前文档。

reload() 方法类似于你浏览器上的刷新页面按钮。

如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 键的效果是完全一样。

##### 语法

```js
location.reload();
```

#### 示例

结合计时器倒数跳转网页

```html
<body>
    <p>
        <span id="time">5</span>秒之后，自动跳转到首页...
    </p>
    <script>
        /*
            分析：
               1.倒计时读秒效果实现
                   1.1 定义一个方法，获取span标签，修改span标签体内容，时间--
                   1.2 定义一个定时器，1秒执行一次该方法
               2.在方法中判断时间如果<= 0 ，则跳转到首页，并关闭计时器
         */
        var span = document.querySelector('span')
        var i = 5
        var s1= setInterval(function () {
            i--
            span.textContent = i
            if (i < 1) {
                location.href = 'https://www.baidu.com/'
                clearInterval(s1) // 关闭计时器
            }
        }, 1000)
    </script>
</body>
```

## History 对象

History 对象包含用户（在浏览器窗口中）访问过的 URL。

History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。

#### length 属性

##### 定义和用法

length 属性声明了浏览器历史列表中的元素数量。

注意：Internet Explorer和Opera从0开始，而Firefox、Chrome和Safari从1开始。

##### 语法

```js
history.length
```

#### back() 方法

##### 定义和用法

back() 方法可加载历史列表中的前一个 URL（如果存在）。

调用该方法的效果等价于点击后退按钮或调用 history.go(-1)。

##### 语法

```js
history.back()
```

#### forward() 方法

##### 定义和用法

forward() 方法可加载历史列表中的下一个 URL。

调用该方法的效果等价于点击前进按钮或调用 history.go(1)。

##### 语法

```js
history.forward()
```

#### go() 方法

##### 定义和用法

go() 方法可加载历史列表中的某个具体的页面。

该参数可以是数字，使用的是要访问的 URL 在 History 的 URL 列表中的相对位置。（-1上一个页面，1前进一个页面)。或一个字符串，字符串必须是局部或完整的URL，该函数会去匹配字符串的第一个URL。

##### 语法

```js
history.go(number|URL)
```

