## node概念

#### 概念

运行在服务端的JavaScript

#### 作用

1. 提供了js运行的一个环境（保证代码能够正常运行所必需的环境，它有内置模块保证js代码的执行）
2. 可以用来开发后台（一些小型网站，论坛，可以用node编写，开发成本低，速度快，容易上手）

#### 组成

##### ECMAScript

和js基础语法一样

##### 内置模块

fs 文件相关的模块

path 路径相关的模块

http 服务器相关的模块

##### 第三方模块（自学）

express 可以快速构建web应用

mysql 可以通过js代码操作数据库

#### 学习路径

##### js

ECMAScript + 内置对象+对象模型（DOM BOM）

##### node.js

ECMAScript + 内置模块（fs path http）

## 模块化

### 模块化概念

#### 概念

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。

换言之，一个Node.js文件就是一个模块，这个文件可能是JavaScript代码、JSON或者编译过的C/C++扩展

#### 总之

模块就是遵循固定的规则,把一个大的js文件,拆分成相互依赖的小文件(对代码的拆分)

类似js中的函数,函数是对代码的封装,它只能在当前文件中使用,不能跨文件使用

模块化就解决了这个问题,它是将js代码单独放到一个文件中,需要的时候,直接引入

这样就实现了跨文件的使用,这就是模块化的思想

#### 好处

提高了代码复用性和可维护性

可以实现按需加载,提高效率

### 模块化分类

#### 根据来源分类

##### 内置模块

由node js官方提供的，例如fs，path，http等

##### 自定义模块

用户创建的每一个js文件，都是自定义模块

##### 第三方模块

由第三方开发的，使用需要下载

### 模块化入门

1. 写一个js文件
   - 其实就是创建了一个自定义模块

2. 通过**require(路径)**，引入自定义模块
   - 其实就是相当于将刚才写好的内容复制过去（并不是纯粹的复制）


### 模块作用域

#### 概念

在自定义模块中定义变量或方法，只能在当前模块使用，不能跨模块使用

#### 好处

可以避免全局变量污染问题

### 模块间共享

#### module对象

在每一个自定义模块中，都有一个module对象，它里面存放了跟当前模块相关的信息

它里面有一个属性，exports属性，是一个对象，用来**导出**模块中定义的变量和方法

#### module.exports对象

用来导出模块中定义的变量和方法，默认是空的

```js
console.log('你若安好，便是晴天')
const a = 10
function eat() {
  console.log('干饭')
}
```

##### 导出

方式一：直接给module.exports对象的属性赋值

```js
/* 使用module中的exports属性导出模块中定义的变量和方法 */
module.exports.a = a
module.exports.eat = eat
```

方式二：对象字面量方式

```js
module.exports = {
    a: a,
    eat: eat
}
```

方式三：将变量和方法赋给module.exports对象的同名属性时，方式二的简化方式（属性的简洁表示法）

```js
module.exports = {
    a,
    eat
}
```

##### 导入

方式一：使用对象接收整个module.exports

```js
const obj = require('./07-模块间共享-自定义模块-module对象-导出')
```

方式二：对module.exports进行解构赋值，仅导入需要的属性和方法

```js
const { a, eat } = require('./07-模块间共享-自定义模块-module对象-导出')
```

#### exports对象

由于module.exports对象写起来比较麻烦，为了简化书写，node提供了一个exports对象，也可以用于导出

默认情况下，module.exports和exports指向同一个对象，但通常还是使用module.export

#### 总结

以后模块的导出还是建议使用module.exports对象

模块的导入使用对象或者解构的方式接收都可以

## 内置模块

### fs模块

#### 概念

官方提供的用于操作文件的模块，提供了一系列操作文档的属性和方法，方便用户操作文件

#### 使用

##### 导入模块

```js
const fs = require('fs')
```

##### 调用方法

```js
fs.readFile(path[, options], callback)	// 异步读取文件内容
fs.writeFile(file, data[, options], callback)	// 异步写入数据到文件
```

#### 方法

##### fs.readFile(path[, options], callback)

异步读取文件内容

path：文件路径

options：编码等可选操作

callback：回调函数（在读取文件之后，回头再调用的函数）；有两个参数 `(err, data)`，其中 `data` 是文件的内容。

##### fs.writeFile(file, data[, options], callback)

异步写入数据到文件

file：写入文件的路径（如果文件不存在将自动创建）

data：要写入的数据

options：编码等可选操作

callback：回调函数，只包含错误信息参数`(err)`，在写入失败时返回

### path模块

#### 概念

用于处理路径的模块，提供了处理文件路径的实用工具

#### 使用

##### 导入模块

```js
const path = require('path')
```

##### 调用方法

```js
path.dirname(path) //返回路径中代表文件夹的部分

path.join([...paths]) // 用于连接路径

path.extname(path) // 返回文件的后缀名

path.basename(path[, ext]) // 返回文件路径的最后一个部分；如果第二个参数传后缀名，获取出来的路径就没有后缀名
```

node提供了一些获取文件路径的简单写法（不需要通过path模块）

- __filename：获取当前文件所在的路径

  ```js
  console.log('绝对路径：' + __filename) //绝对路径：D:\Documents\WebGIS\New Zondy - 2405\00_Mine\day26\17-内置模块-path-使用.js
  ```

- __dirname：获取当前文件所在的目录

  ```js
  console.log('所在目录：' + __dirname) // 所在目录：D:\Documents\WebGIS\New Zondy - 2405\00_Mine\day26
  ```

#### 方法

##### path.dirname(path) 

返回路径中代表文件夹的部分

- path: `<string>`
- 返回: ` <string>`

```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

如果 path 不是一个字符串，则抛出 TypeError

##### path.join([...paths])

用于连接路径

- ...paths: `<string>` 一个路径片段的序列
- 返回: `<string>`

`path.join()` 方法使用平台特定的分隔符把全部给定的 `path` 片段连接到一起，并规范化生成的路径。

长度为零的 `path` 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 `'.'`，表示当前工作目录。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
```

如果任一路径片段不是一个字符串，则抛出 TypeError。

##### path.extname(path)

返回文件的后缀名

- path: `<string>`
- 返回: ` <string>`

##### path.basename(path[, ext]) 

返回文件路径的最后一个部分；如果第二个参数传后缀名，获取出来的路径就没有后缀名

### http模块

#### 概念

跟服务器相关的模块，主要用于搭建HTTP服务端和客户端

#### 使用

##### 导入模块

```js
const http = require('http')
```

##### 调用方法

```js
http.createServer() // 创建一个服务器
```

## 包的操作

### 包的概念

#### 来源

跟内置模块和自定义模块不同,包是由第三方个人或者团队开发出来的,免费给其他人使用的

#### 好处

包其实是由内置模块封装出来的,提供了一个更高级,更方便的api,有助于提高开发效率

### 包管理工具

#### 概念

由美国的一家公司提供的,用来管理包,现在已经被集成到了nodejs中

#### 安装

无需安装,在安装node的时候就已经自动安装好了

#### 查询版本

```powershell
npm -v
```

#### 使用

##### 安装包

```powershell
npm i 包名
```

##### 卸载包

```powershell
npm uninstall 包名
```

### nrm镜像管理工具

#### 作用

解决国外网站速度慢的原因,可以使用国内的镜像

#### 安装nrm

```powershell
npm i nrm -g
```

#### 列出所有镜像

```powershell
nrm ls
```

#### 设置为镜像为淘宝的镜像

```powershell
npm config set registry https://registry.npmmirror.com/
```

#### 查看当前文件设置的镜像

```powershell
npm config get registry
```

#### 注意

nrm只需要安装一次,后续操作还是使用npm

### 包的使用

#### 导入

导入安装好的包

```js
const moment = require('moment') //以moment包为例
```

## 手写包(了解)

### 包的规范

#### 位置

##### node_modules

用于存放所有已经安装到本地的包, require导入第三方包的时候, 优先从这个目录查找

#### 配置文件

##### package.json

当前包的配置文件, 用于记录当前包的下载信息, 包名, 版本, 下载地址等

- name: 包名
- version: 版本
- main: 包的入口

#### 规范

- 包必须以单独的目录存在
- 包的顶级目录下必须包含package.json配置文件
- package.json配置文件中必须要有name, version, main三个属性

### 手写一个包

手写计算器包(calc包),用于计算两个数的加减法

1. 创建文件夹
   1. 在node_modules下创建calc文件夹
2. 初始化这个文件夹
   1. 使用cd命令进入刚才创建的文件夹
   2. 使用npm init -y来初始化这个包,就会在calc下自动创建一个package.json配置文件
3. 创建包的目录结构
   1. 创建src文件夹,用于存放源代码
   2. 创建dist文件夹,作为发布目录
   3. 在dist文件夹下,创建一个index.js,作为包的入口文件
   4. 修改package.json配置文件中的main属性值为`./dist/index.js`
4. 编写源码 
   1. 在src下创建一个add.js实现加法操作,并用module.exports导出
   2. 在src下创建一个sub.js实现减法操作,并用module.exports导出
5. 编写头文件(在dist文件夹下的index.js下)
   1. 步骤:将源码里面所有的单个模块都引入进来,然后再统一导出去