## 用户管理系统

### 搭建开发环境

1. 创建项目，user-manager文件夹
2. 初始化项目，使用`npm init -y`(会生成一个package.json配置文件)
3. 安装依赖(项目运行所需要的包)
   - `npm i axios` 用户从客户端发送请求来接受服务端的数据(从前台向后台拿数据)
   - `npm i json-server@0.17.4 -D`用来提供后台服务(-D代表开发环境)
4. 将数据源文件data.json拷贝到项目的根目录下

### 实现列表功能

#### 本质

使用axios的get请求，获取所有用户信息，然后遍历展示用户列表

#### 步骤

1. 在项目的根目录下，创建index.html页面，作为主页

2. 编写html页面的骨架

3. 编写html页面的样式

4. 发送axios请求获取所有的用户信息

   1. 导入axios包里的头文件

   2. 发送axios请求，获取后台数据

   3. 遍历获取到的数据，动态地创建tr，填充到tbody中
   4. 使用json-server开启后台服务，测试数据

### 实现添加功能

#### 本质

使用axios发送post请求，将获取的表单数据提交到后台完成添加操作

#### 步骤

1. 书写add.html页面
2. 在index.html页面，为添加用户的a标签添加链接地址，将来点击的时候，跳转到添加页面
3. 在add.html页面发送axios请求，将获取的表单数据提交到后台
   1. 导入axios包里面的头文件
   2. 获取提交按钮,监听它的点击事件
   3. 在点击事件中,获取用户提交的用户名和密码
   4. 发送post请求,提交数据到后台
   5. 跳转到页面(会重新发送get请求,刷新页面)

### 实现修改功能

#### 本质

1. 使用axios的get请求，获取要修改的那个用户，将它的信息展示到修改页面（回显操作）

2. 在点击提交按钮的时候，将修改后的数据，通过put请求，发送到后台进行修改


#### 步骤

1. 书写update.html页面（复制add页面修改一下）
2. 在index.html页面为“修改”的超链接添加链接地址，并将要修改的用户的id作为query参数拼接到url上
3. 在update.html页面，获取url里query参数的id值
4. 发送axios的get请求，获取要修改用户的数据
5. 监听提交按钮的点击,发送axios的put请求,将修改后的用户数据提交到后台

### 实现删除功能

#### 本质

使用axios的delete方法，传入要删除用户的id，提交到后台删除

#### 步骤

1. 给删除超链接添加一个onclick属性,将id传进去
2. 编写删除的方法,在方法里面发送axios的delete请求,传入要删除用户的id,提交到后台

## yarn、pnpm命令

包管理工具

### yarn

#### 安装

```powershell
npm i yarn -g //全局安装yarn
```

#### 使用

```powershell
yarn add 包名 //安装包
yarn remove 包名 //卸载包
```

#### pnpm

#### 安装

```powershell
npm i pnpm -g //全局安装pnpm
```

#### 使用

```powershell
pnpm  add 包名 //安装包
pnpm  remove 包名 //卸载包
```

### npm和两者区别

1. npm是node默认的包管理工具,安装node的时候会自动安装npm,yarn和pnpm都需要手动安装
2. yarn的出现是为了弥补npm安装速度慢,依赖包不一样的问题
3. pnpm是高性能的npm,比前两者在性能上有很大提升,可以解决npm和yarn重复文件以及复用率问题

## 深拷贝和浅拷贝

浅拷贝，只拷贝引用地址，不拷贝数据本身

深拷贝，只拷贝数据本身，不拷贝引用地址

### 深拷贝

#### 递归

*递归*指的是在函数的定义中使用函数自身的方法

```js
// 递归
function getCopy(obj) {
    if (typeof obj != 'object' && obj == null) return obj
    const copy = {}
    for (const key in obj) {
        if (typeof obj[key] == 'object') copy[key] = getCopy(obj[key]) //递归
        else copy[key] = obj[key]
    }
    return copy
}
const person = {
    name: '张三',
    age: 18,
    dog: {
        name: '大黄',
        age: 3,
        master: {
            name: '张三',
            age: 18,
        },
    },
}
```

#### 第三方包lodash

1. 下载第三方包 pnpm add loadsh

2. 页面中引入lodash.js文件

   ```html
   <script src="./node_modules/lodash/lodash.min.js"></script>
   ```

3. 调用方法实现深拷贝

##### 对象深拷贝

```js
const person = {
    name: '张三',
    age: 18,
    dog: {
        name: '大黄',
        age: 3,
        master: {
            name: '张三',
            age: 18,
        },
    },
}
// 调用lodash中的cloneDeep()方法实现深拷贝
const person2 = _.cloneDeep(person)
```

##### 数组深拷贝

```js
const arr = [1, 2, 3]
const newArr = _.cloneDeep(arr)
```

## webpack(了解)

#### 概念

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，

然后将这些模块按照指定的规则生成对应的静态资源。

Webpack 可以将多种静态资源 js、css、less 转换成一个静态文件，减少了页面的请求。

#### 使用

```po
	创建一个webpack-test文件夹(项目)
	初始化项目
		npm init -y  
	书写源码
		必须写在src下的component文件夹下
		还需要在src下书写index.js头文件
	安装webpack的服务端
		npm i webpack -g
	安装webpack的客户端
		npm i webpack-cli
	执行打包命令
		npx webpack
```

最终会在项目下生成一个dist发布目录,main.js就是打包好的js文件

## 拦截器(了解)

### 请求拦截器

#### 概念

在请求发送之前进行必要的操作,比如访问页面之前,添加验证,设置请求头

#### 语法

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
```

#### 用法

1. 比如在用户提交的请求中,对一些不符合服务器要求的信息,做一些修改或者过滤
2. 比如每一次发送网络请求的时候,都希望在界面显示一个请求的图标
3. 某些网络请求,必须携带一些特殊信息(登录的token),如果没有就拦截并做出响应提示

### 响应拦截器

#### 概念

在响应数据之前,对响应体的一些处理,通过是数据的统一处理,可以判断登录是否有效

#### 语法

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

####  用法

1. 统一处理所有请求成功之后的响应数据的过滤,或者对一些特殊数据进行处理,其他的正常返回
2. 可以判断服务器返回的登录状态是否有效,如果失效,就需要重新登录

### 总结

```js
//请求拦截器
axios.interceptors.request.use(req=>{},err=>{})
//响应拦截器
axios.interceptors.response.use(res=>{},err=>{})

请求用request,响应用response,二者都有两个配置项,一个是成功的配置,一个是失败的配置
```

## Location 对象

### 属性

#### location.pathname

##### 定义和用法

pathname 属性是一个可读可写的字符串，可设置或返回当前 URL 的路径部分。

##### 语法

```
location.pathname
```

#### location.search

##### 定义和用法

search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 及之后的部分）。

##### 语法

```js
location.search
```

## URL

URL 接口用于解析，构造，规范化和编码 URL。

### 构造器

`URL()` 构造函数返回一个新创建的 URL 对象，该对象表示由参数定义的 URL。

如果给定的基本 URL 或生成的 URL 不是有效的 URL，则会抛出 JavaScript TypeError 异常。

#### 语法

```js
new URL(url)
new URL(url, base)
```

url：一个表示绝对或相对 URL 的 DOMString 或任何具有字符串化方法的对象，例如 `<a> `或 `<area> `元素。如果 url 是相对 URL，则会将 base 用作基准 URL。如果 url 是绝对 URL，则无论参数 base 是否存在，都将被忽略。

base 可选：一个表示基准 URL 的字符串，当 url 为相对 URL 时，它才会生效。如果未指定，它默认为 undefined。

```js
const url = new URL("https://example.com?foo=1&bar=2");
```

### 实例属性

#### url.href

返回包含整个 URL 的字符串。

```js
const url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href",
);
console.log(url.href); // 输出：'https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href'
```

#### url.origin

返回一个包含协议名、域名和端口号的 USVString，默认端口号会被省略

```js
const url = new URL("blob:https://mozilla.org:443/");
console.log(url.origin); // 输出“https://mozilla.org”

const url = new URL("http://localhost:80/");
console.log(url.origin); // 输出“http://localhost”

const url = new URL("https://mozilla.org:8080/");
console.log(url.origin); // 输出“https://mozilla.org:8080”
```

#### url.pathname

以 '/' 起头紧跟着 URL 文件路径的 DOMString

```js
const url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/pathname?q=value",
);
console.log(url.pathname); // 输出“/zh-CN/docs/Web/API/URL/pathname”
```

#### url.search

URL 接口的 search 属性是一个搜索字符串，也称为查询字符串，这是一个包含 '?' 且其后跟着 URL 的参数的字符串。

现代浏览器提供了 URL.searchParams 属性，以便轻松解析查询字符串中的参数。

```js
const url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/search?q=123",
);
console.log(url.search); // 输出“?q=123”
```

#### url.searchParams

只读

URL 接口的 searchParams 属性返回一个 URLSearchParams 对象，这个对象包含当前 URL 中解码后的 GET 查询参数。

##### 示例


如果你的 URL 是 `https://example.com/?name=Jonathan%20Smith&age=18`，你可以这样解析 URL，然后得到 name 和 age 的值。

```js
let params = new URL(document.location).searchParams;
let name = params.get("name"); // 是字符串“Jonathan Smith”。
let age = parseInt(params.get("age")); // 是数字 18
```

## URLSearchParams

**`URLSearchParams`** 接口定义了一些实用的方法来处理 URL 的查询字符串。

一个URLSearchParams 的实例化对象可以直接用在 for...of 结构中，以键/值对在查询字符串中出现的顺序对它们进行迭代，例如下面两行是等价的

```js
for (const [key, value] of mySearchParams) {
    console.log(key, value)
}
for (const [key, value] of mySearchParams.entries()) {
    console.log(key, value)
}
```

### 构造函数

`URLSearchParams()` 构造函数创建并返回一个新的 `URLSearchParams` 对象。

#### 语法

```js
new URLSearchParams()
new URLSearchParams(options)
```

options 可选

可以是以下之一：

- 一个字符串，会按 application/x-www-form-urlencoded 的格式进行解析。开头的 '?' 字符会被忽略。
- 一系列基于字面量的字符串键值对，或者任何对象（例如 FormData 对象），能提供一系列字符串对的迭代器对象。需要注意，File 将被序列化为 [object File]，而不是它们的文件名（就像 application/x-www-form-urlencoded 格式中的那样）。
- 一个由字符串键和字符串值组成的键值对对象。请注意，不支持嵌套。

```js
const searchParams = new URLSearchParams('?id=1&name=zhangsan&password=666')
```

返回值：一个 URLSearchParams 实例。

### 实例属性

#### URLSearchParams.size

只读

返回 `URLSearchParams` 对象中查询参数的总个数。

```js
const searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");
searchParams.size; // 4
```

##### 检查查询参数是否存在

size 属性用于检查是否存在任何查询参数：

```js
const url = new URL("https://example.com?foo=1&bar=2");

if (url.searchParams.size) {
  console.log("URL 具有查询参数！");
}
```

### 实例方法

#### URLSearchParams.append()

插入一个指定的键/值对作为新的查询参数。

##### 语法

```js
append(key, value)
```

key：要附加的参数的键名。

value：要附加的参数的值。

返回值：无（undefined）

##### 示例

如果同一个键被多次附加，则它将与每个值多次配对出现在参数字符串中。

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search);

// 添加第二个 foo 查询参数。
params.append("foo", 4);
// 查询字符串变成：“foo=1&bar=2&foo=4”
```

#### URLSearchParams.delete()

从查询参数列表里删除指定的查询参数及其对应的值。

一个参数名称和可选值用于匹配参数。如果指定了一个参数名称，则会删除所有与该名称匹配的查询参数及其关联值。如果同时指定了参数名称和值，则会删除所有与参数名称和数值匹配的查询参数。

##### 语法

```js
delete(key)
delete(key, value)
```

key：需要删除的键值名称。

value 可选：参数必须匹配的值以及要删除的给定名称。

返回值：无（undefined）。

#### URLSearchParams.entries()

返回一个用于遍历该对象中包含的所有键/值对的迭代器（iterator）。迭代器按照查询字符串中出现的顺序返回键/值对，每一组键和值都是字符串对象。

##### 语法

```js
entries()
```

返回值：返回一个 iterator（迭代协议）。

##### 示例

```js
// 创建一个测试用的 URLSearchParams 对象
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// 显示键/值对
for (const [key, value] of searchParams.entries()) {
  console.log(`${key}, ${value}`);
}
//key1, value1
//key2, value2
```

#### URLSearchParams.forEach()

通过回调函数来遍历实例对象上的键值对。

##### 语法

```js
forEach(callback)
forEach(callback, thisArg)
```

callback：在每个元素上执行的函数，会传入以下参数：

- value：URLSearchParams 对象中正在处理的条目的值。

- key：URLSearchParams 对象中正在处理的条目的键。

- searchParams：当前调用 forEach() 方法的 URLSearchParams 对象。


thisArg 可选：执行 callback 时 this 的值。

返回值：无（undefined）。

注：和数组对象的forEach()方法好像

##### 示例

```js
// 创建用于测试的 URLSearchParams 对象
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// 输出值
searchParams.forEach((value, key) => {
  console.log(value, key);
});
//value1 key1
//value2 key2
```

#### URLSearchParams.get()

获取指定查询参数的第一个值。

##### 语法

```js
get(key)
```

key：要返回的参数的键名。

返回值：如果找到了键对应的值，则返回一个值的字符串；否则返回 null。

##### 示例

示例
如果一个页面的 URL 是 `https://example.com/?name=Jonathan&age=18`，你可以这样解析参数“name”和“age”：

```js
let params = new URLSearchParams(document.location.search);
let name = params.get("name"); // 字符串“Jonathan”
let age = parseInt(params.get("age"), 10); // 数字 18
```

查找一个不存在于查询字符串中的键名则返回 null:

```js
let address = params.get("address"); // null
```

#### URLSearchParams.getAll()

获取指定查询参数的所有值，返回是一个数组。

##### 语法

```js
getAll(key)
```

key：要返回的参数的键名。

返回值：一个字符串的数组，如果没有找到给定参数的值，则其可以是空的。

##### 示例

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search);

// 为 foo 添加第二个参数
params.append("foo", 4);

console.log(params.getAll("foo")); // 输出 ["1", "4"]。
```

#### URLSearchParams.has()

返回 Boolean 判断是否存在此查询参数。

一个参数名称和可选值用于匹配参数。如果只指定了一个参数名称，那么如果查询字符串中的任何参数与名称匹配，则该方法将返回 `true`，否则返回 `false`。 如果同时指定了参数名称和值，则如果参数与名称和值都匹配，该方法才返回 `true`。

##### 语法

```js
has(key)
has(key, value)
```

key：要匹配的参数的名称。

value：要匹配的参数值以及给定的名称。

返回值：一个布尔值。

#### URLSearchParams.keys()

返回iterator 此对象包含了键/值对的所有键名。这些键都是字符串对象。

```js
// 建立一个测试用 URLSearchParams 对象
const searchParams = new URLSearchParams("key1=value1&key2=value2");

// 输出键值对
for (const key of searchParams.keys()) {
  console.log(key);
}
```

#### URLSearchParams.set()

设置一个查询参数的新值，假如原来有多个值将删除其他所有的值。如果查询参数不存在，则创建它。

##### 语法

```js
set(name, value)
```

name：要设置的参数的键名。

value：要设置的参数的值。

返回值：无（undefined）。

##### 示例

```js
let url = new URL("https://example.com?foo=1&bar=2");
let params = new URLSearchParams(url.search);

// 设置第三个参数。
params.set("baz", 3);
params.toString(); // "foo=1&bar=2&baz=3"
```

#### URLSearchParams.sort()

按键名排序。

#### URLSearchParams.toString()

返回查询参数组成的字符串，可直接使用在 URL 上。

返回值：一个不带问号的字符串（如果未设置查询参数，则返回空字符串）。

#### URLSearchParams.values()

返回iterator 此对象包含了键/值对的所有值。

```js
const searchParams = new URLSearchParams("key1=value1&key2=value2");

for (const value of searchParams.values()) {
  console.log(value);
}
```

## ES6 模块

ES6 的模块化分为导出（export） @与导入（import）两个模块。

### 特点

ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。

模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。

每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。

每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。

### export 与 import

#### 基本用法

模块导入导出各种类型的变量，如字符串，数值，函数，类。

- 导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。 
- 不仅能导出声明还能导出引用（例如函数）。
- export 命令可以出现在模块的任何位置，但必需处于模块顶层。
- import 命令会提升到整个模块的头部，首先执行。

```js
/*-----export [test.js]-----*/
let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}
export { myName, myAge, myfn, myClass }
 
/*-----import [xxx.js]-----*/
import { myName, myAge, myfn, myClass } from "./test.js";
console.log(myfn());// My name is Tom! I'm 20 years old.
console.log(myAge);// 20
console.log(myName);// Tom
console.log(myClass.a );// yeah!
```

建议使用大括号指定所要输出的一组变量写在文档尾部，明确导出的接口。

函数与类都需要有对应的名称，导出文档尾部也避免了无对应名称。

#### as 的用法

export 命令导出的接口名称，须和模块内部的变量有一一对应关系。

导入的变量名，须和导出的接口名称相同，即顺序可以不一致。

```js
/*-----export [test.js]-----*/
let myName = "Tom";
export { myName as exportName }

/*-----import [xxx.js]-----*/
import { exportName } from "./test.js";
console.log(exportName);// Tom
```

使用 as 重新定义导出的接口名称，隐藏模块内部的变量

```js
/*-----export [test1.js]-----*/
let myName = "Tom";
export { myName }
/*-----export [test2.js]-----*/
let myName = "Jerry";
export { myName }
/*-----import [xxx.js]-----*/
import { myName as name1 } from "./test1.js";
import { myName as name2 } from "./test2.js";
console.log(name1);// Tom
console.log(name2);// Jerry
```

不同模块导出接口名称命名重复， 使用 as 重新定义变量名。

## 作业总结

### 解决img撑大网格元素

给img设置宽度

```css
.cover img {
    width: 100%;
}
```

### 伪元素伪类实现中央悬浮播放图标

```css
.cover {
    position: relative;
    overflow: hidden;
}
.cover::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    background-image: url(./images/play.png);
    background-size: contain;
    z-index: 2000;
    opacity: 0;
    transition: all 0.3s;
}
.cover:hover::before {
    opacity: 1;
}
```

### 实现鼠标悬浮时图片放大并模糊但显示尺寸不变

```css
.cover {
    position: relative;
    overflow: hidden;
}
.cover img {
    width: 100%;
    transition: all 0.3s;
}
.cover:hover img {
    filter: blur(0.5px);
    transform: scale(1.1);
}
```

