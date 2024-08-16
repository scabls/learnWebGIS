## AJAX

### 概念

AJAX = Asynchronous JavaScript and XML.

AJAX 是一种用于创建快速动态网页的技术。

AJAX 通过在后台与服务器进行少量数据交换，使网页实现异步更新。这意味着可以在不重载整个页面的情况下，对网页的某些部分进行更新。

传统的网页（不使用 AJAX）如果需要更新内容，必须重载整个页面。

### 作用

- 实现前后端数据的交换（从前端向后台获取数据）
- 可以实现不刷新整个页面的基础上，更新部分网页数据（局部刷新）
- 一般作为前后端分离技术中，前端向后端请求数据的解决方案（vue中axios就是对ajax的封装）

### 应用场景

- 百度注册：失去焦点时，发送ajax请求，检查用户名是否被注册
- 百度搜素：根据用户输入，提示不同的关联信息
- 谷歌地图：按需加载

## 原生AJAX实现

### 具体步骤

1. 创建发送ajax请求的XMLHttpRequest对象
2. 设置请求方式和请求的url
3. 监听请求对象状态的变化，设置处理函数（在这里可以接受服务器发送过来的数据）
4. 发送请求

```js
// 1. 创建发送ajax请求的XMLHttpRequest对象
const xhr = new XMLHttpRequest()
// 2. 设置请求方式和请求的url
xhr.open('GET', 'http://project.x-zd.net:3001/apis/herolist')
// 3. 监听请求对象状态的变化，设置处理函数（在这里可以接受服务器发送过来的数据）
xhr.addEventListener('readystatechange',function(){
    // 当 readyState 等于 4 且状态为 200 时，表示响应已就绪
    if(this.readyState==4&&this.status==200){
        // 如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。
        console.log(this.responseText);
    }
})
// 4. 发送请求
xhr.send()
```

### Promise函数封装

**普通函数封装的弊端**

从服务器获取数据,是一个耗时操作,直接返回数据,是拿不到数据的

需要等待获取到服务器返回的数据之后,再把这个数据传过去

**解决**

使用promise封装异步操作

**做法**

将整个操作放到一个promise对象中,将服务器返回的数据放到结果属性中

将来如果想获取异步操作的数据,通过then方法或者await来拿到promise执行之后结果属性中的值

```js
function getDataP(method,url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText)
            }
        })
        xhr.send()
    })
}
async function getData(method,url) {
    console.log(await getDataP(method,url));
}
getData('GET','http://project.x-zd.net:3001/apis/herolist')
```



## ES6模块化

### 模块化

其实就是对js文件的拆分，将一个大的文件js文件按照一定规则进行拆分，拆分成若干个小的文件

### 好处

可以重复使用里面的功能（提高了代码的重用性）

### 举例

学生管理系统 - - - >增删改查功能

如果把增删改查都写在一个文件中，文件就会非常大，不方便维护，里面的功能很难重用

如果把它进行模块化的拆分，将整个js文件按照功能拆分成4个文件

每个文件都有自己的功能，方便后期维护或重用，也方便协同开发

### 模块的导入导出

ES6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。

ES6 的模块化分为导出（export） 与导入（import）两个模块。

### 基本的导入导出

导入使用import 导出使用export

#### 普通导出

```js
//导出变量
export const str = 'aaa'

//导出函数
export function fn() {
    console.log('bbb');
}

//导出类
export class Student {
    constructor(name) {
        this.name = name
    }
}
```

#### 普通导入

```html
<script type="module">
    // 基本导入，顺序可以乱，名字不能错
    import { str, fn, Student } from './04-基本导出.js';

    console.log(str);
    console.log(fn);
    console.log(Student);
</script>
```

#### 注意点

export 命令导出的接口名称，须和模块内部的变量有一一对应关系。

导入的变量名，须和导出的接口名称相同，但顺序可以不一致。

### 默认的导入导出

导入使用import 导出使用export default

#### 默认导出

```js
//最好先定义变量
const str = 'aaa'
// 默认导出（仅有一个）
export default str
```

#### 默认导入

```html
<script type="module">
    // 随便取名，无需括号
    import s from './06-默认导出.js';

    console.log(s);

</script>
```

#### 注意点

在一个文件或模块中，export、import 可以有多个，export default 仅有一个。

export default 中的 default 是对应的导出接口变量。

通过 export 方式导出，在导入时要加{ }，export default 则不需要。

export default 向外暴露的成员，可以使用任意变量来接收。

### 混合导入导出

#### 混合导出

```js
//导出变量
export const str = 'aaa'

//导出函数
export function fn() {
    console.log('bbb');
}

//导出类
export class Student {
    constructor(name) {
        this.name = name
    }
}

//默认导出（仅有一个）
export default function () {
    console.log('匿名函数');
}
```

#### 混合导入

```html
<script type="module">
    // 默认导入要写在括号外最前面，随便取名
    // 基本导入，括号里面，顺序可以乱，名字不能错
    // as用来将基本导入值赋给其他变量名（如果导入变量名和已有变量名起冲突时）
    import f, { str as string, fn, Student } from './08-混合导出.js'
    console.log(string)
    console.log(fn)
    console.log(Student)
    console.log(f)
</script>
```

#### 注意点

导入的时候,默认导入要写到括号外最前面，与普通导入的括号以逗号分隔

#### 别名问题

如果导出的变量和当前文件定义的变量冲突,使用as起别名