## Client属性

### 概念

client：客户端，可视区。通过它的相关属性，可以动态获取元素边框大小，宽高等

### 属性

```js
element.clientTop	表示一个元素的顶部边框的宽度，以像素表示。
element.clientLeft	表示一个元素的左边框的宽度，以像素表示。
element.clientHeight	在页面上返回内容的可视高度（高度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条）
element.clientWidth	在页面上返回内容的可视宽度（宽度包含内边距（padding），不包含边框（border），外边距（margin）和滚动条）

// 都是只读属性
// 出现滚动条后，会占用内容区的空间，同时不属于可视区
```

## Scroll属性

### 概念

Scroll：滚动的意思。通过它的相关属性，可以动态获取元素滚动的距离，元素大小宽高

### 属性

```js
element.scrollTop	返回当前视图中的顶部边缘和实际元素的顶部边缘之间的距离（元素内容垂直滚动距离）
element.scrollLeft	返回当前视图中的左边缘和实际元素的左边缘之间的距离（元素内容水平滚动距离）
element.scrollHeight	返回整个元素的高度（内容区+内边距）（包括溢出的地方）
element.scrollWidth	返回元素的整个宽度（内容区+内边距）（包括溢出的地方））
// element.scrollTop和element.scrollLeft是可读写属性
// element.scrollHeight和element.scrollWidth是只读属性
// 出现滚动条后，会占用内容区的空间
```

### 监听页面的滚动

```js
Window.scrollX	返回文档/页面水平方向滚动的像素值。
Window.scrollY	返回文档在垂直方向已滚动的像素值。

//pageXOffset 和 pageYOffset 属性相等于 scrollX 和 scrollY 属性。
//这些属性是只读的。
```

## 三大系列总结

offset系列:主要用于获取元素的偏移值,来确定元素的位置

client系列:主要用于获取元素可视区的宽高(包含内边距,不包含边框)

scroll系列:主要用于获取元素滚动的距离来做一些判断

## 异常

### 概念

程序出现了不正常的情况(语法错误等),js引擎通常会停止程序,并且生成错误信息抛出

### 系统自动抛出异常

一般是语法错误,null报错,服务器异常,系统都会自动停止程序,并且后续代码也无法执行

### 手动抛出异常

程序可能没有问题，程序员根据变成需要，通过**throw**关键字人为抛出异常，达到某些目的

手动抛出异常后，后续代码也是无法执行

一般配合异常的处理，来完成某些特殊需求

#### 目的

确保程序即使出现异常,后续代码也能继续执行下去,增强程序的健壮性

#### 语法

```js
try {
    ...    //一般会把可能会出现问题代码放到这里,也可以做异常的手动抛出
} catch(e) { // e代表异常对象，系统会将捕捉到的异常信息放到里面
    ...    //一般书写异常的捕获与处理的代码
} finally {
    ...    //不管有没有异常,都必须要执行的代码,放到这里(记录日志)
}
```

##### try 和 catch 语句

**try** 语句允许我们定义在执行时进行错误测试的代码块。

**catch** 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。

JavaScript 语句 **try** 和 **catch** 是成对出现的。

##### finally 语句

finally 语句不论之前的 try 和 catch 中是否产生异常都会执行该代码块。

##### Throw 语句

throw 语句允许我们创建自定义错误。

正确的技术术语是：创建或**抛出异常**（exception）。

如果把 throw 与 try 和 catch 一起使用，那么能够控制程序流，并生成自定义的错误消息。

###### 语法

```js
throw exception
```

异常可以是 JavaScript 字符串、数字、逻辑值或对象。

## Promise入门

### 概念

本质就是js的内置对象,也有属性和方法,它有两个属性和一个方法
一个是状态属性,一个是结果属性,还有一个then方法

### 创建

通过new创建,必须要传一个函数,函数有两个形参 resolve和reject

```js
const p1 = new Promise((resolve, reject) => { })
```

### 属性

#### PromiseState 状态属性

默认是pending状态(待定状态)

修改状态属性，为了保证后面then()的执行

调用resolve()方法可以将待定状态变成兑现状态

```js
const p2 = new Promise((resolve, reject) => { resolve() })
```

调用reject()方法可以将待定状态变成拒绝状态

```js
const p3 = new Promise((resolve, reject) => { reject() })
```

状态属性只有：从 pending 变为 fulfilled 或者从 pending 变为 rejected 的状态改变。只要处于 fulfilled 和 rejected ，状态就不会再变了，我们称之为已*敲定（settled）*

#### PromiseResult 结果属性 

默认是undefined(里面没有数据)

修改结果属性，方便后续将数据传递到then方法的参数中，进行后续操作

调用resolve()或者reject()方法的时候传递一个参数,就可以将数据保存到结果属性中

```js
const p4 = new Promise((resolve, reject) => { resolve('请求成功后的数据') })

const p5 = new Promise((resolve, reject) => { reject('请求失败的原因') })
```

结果属性里的值可根据状态称为兑现值或拒绝值，也可以统称敲定值

### 方法

#### then()

代表promise操作或失败后要做的事情，会分别放到一个函数中（回调函数：回头再调用的函数）

##### 语法

```js
then(onFulfilled)
then(onFulfilled, onRejected)
```

###### onFulfilled 可选

一个在此 Promise 对象被兑现时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。此函数被调用时将传入以下参数：

value：此Promise 对象的兑现值。

如果 onFulfilled 不是一个函数，则内部会被替换为一个恒等函数（(x) => x），它只是简单地将兑现值向前传递。

###### onRejected 可选

一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 then() 返回的 Promise 对象的兑现值。此函数被调用时将传入以下参数：

reason：此Promise 对象被拒绝的原因。

如果 onRejected 不是一个函数，则内部会被替换为一个抛出器函数（(x) => { throw x; }），它会抛出它收到的拒绝原因。

##### 完整写法

then()方法接受两个函数类型的参数

- 第一个是promise被兑现（执行成功）后的回调函数

  ```js
  // 调用resolve()方法，then()方法会执行第一个回调函数
  const p1 = new Promise((resolve, reject) => { resolve() })
  p1.then(() => console.log('成功之后要做的事'), () => console.log('失败之后要做的事'))
  ```

- 第二个是promise被拒绝（执行失败）后的回调函数

  ```js
  // 调用reject()方法，then()方法会执行第二个回调函数
  const p2 = new Promise((resolve, reject) => { reject() })
  p2.then(() => console.log('成功之后要做的事'), () => console.log('失败之后要做的事'))
  ```

##### 注意点

then()只有在promise的PromiseState属性发生改变后才会执行，不能是pending状态

如果then()方法只有一个回调函数被传入，那么只有在兑现状态才会调用，拒绝状态什么都不会调用

```js
// then()方法只有一个回调函数被传入
const p3 = new Promise((resolve, reject) => { resolve() })
p3.then(() => console.log('成功之后要做的事'))
```

##### 在then()方法中拿到promise结果属性中的值

给then()里面的回调函数添加一个参数，就可以拿到结果属性中的值

```js
// 在兑现状态的回调函数中拿到结果属性的值
const p4 = new Promise((resolve, reject) => { resolve('成功数据') })
p4.then(value => console.log('成功之后要做的事' + value), () => console.log('失败之后要做的事'))

// 在拒绝状态的回调函数中拿到结果属性的值
const p5 = new Promise((resolve, reject) => { reject('失败原因') })
p5.then(() => console.log('成功之后要做的事'), reason => console.log('失败之后要做的事' + reason))
```

##### 返回值

返回值又是一个Promise对象，并且状态是默认值pending，无论当前 Promise 对象的状态如何。

`onFulfilled` 和 `onRejected` 处理函数之一将被执行，以处理当前 Promise 对象的兑现或拒绝。即使当前 Promise 对象已经敲定，这个调用也总是异步发生的。返回的 Promise 对象（称之为 `p`）的行为取决于处理函数的执行结果，遵循一组特定的规则。如果处理函数：

- 返回一个值：`p` 以该返回值作为其兑现值。
- 没有返回任何值：`p` 以 `undefined` 作为其兑现值。
- 抛出一个错误：`p` 将抛出的错误作为其拒绝值。
- 返回一个已兑现的 Promise 对象：`p` 以该 Promise 的值作为其兑现值。
- 返回一个已拒绝的 Promise 对象：`p` 以该 Promise 的值作为其拒绝值。
- 返回另一个待定的 Promise 对象：`p` 保持待定状态，并在该 Promise 对象被兑现/拒绝后立即以该 Promise 的值作为其兑现/拒绝值。

返回值又是promise对象,可以实现链式编程

链式编程能够执行的前提,第一个promise的状态必须发生改变



> 即使当前 Promise 对象已经敲定，这个调用也总是异步发生的。
>
> ```js
> const promise = Promise.resolve('Resolved!');
> 
> promise.then((value) => {
>     console.log(value);
> });
> 
> console.log('This will log first');
> 
> // This will log first
> // Resolved!
> ```
>
> 当Promise.resolve('Resolved!')被执行时，Promise立即被解决为fulfilled状态，因为它是一个已经成功解决的Promise。
>
> 即使如此，then中的回调函数不会立即执行，而是被放入一个消息队列的微队列中，等到当前的所有同步代码执行完毕后再执行。
>
> 因此，console.log('This will log first');会先执行，而then的回调函数才会执行，并打印出Resolved!。

### 异步

#### 同步

执行任务的时候，必须要先等待当前任务完成之后,才能执行下一任务(排队执行)

#### 异步

执行任务的时候,不必等待当前任务完成,直接执行下一个任务

相当于新开了一个线程,这个新的线程去执行新的任务,不会阻塞主线程

```js
//同步  打印的顺序是111 222 333
console.log(111)
console.log(222)
console.log(333)

//异步  顺序:111 222 333 444 666  555
new Promise((resolve,reject)=>{
    console.log(444)
    resolve()
}).then(()=>{  //then方法相当于新开了一个线程去执行代码,不会阻塞后面666的打印
    console.log(555)
})

console.log(666)
```

#### 使用场景

来完成一些可能消耗时间足够长以至于被用户察觉的事情（为了不阻塞主线程）

## 外卖网动画

### 导航栏下拉固定效果

1. 首先在css中给header添加固定定位的样式(active类的样式)
2. 在js中获取header元素
3. 监听页面的滚动事件,当页面滚动的距离超过300px的时候,添加样式,否则移除样式