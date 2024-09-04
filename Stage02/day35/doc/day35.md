## 回调函数

### 什么是回调函数?

如果一个函数B, 作为另一个函数A的参数, 那么函数B就是回调函数

```js
      // 1. 什么是回调函数?
      // 如果一个函数B, 作为另一个函数A的参数, 那么函数B就是回调函数
      element.addEventListener('click', function () {})
      setTimeout(() => {}, 1000)
```

### 回调函数为什么可以有参数

回调函数在函数B的内部执行, 可以向回调函数传递参数

```js
      // 2. 回调函数为什么可以有参数
      //   回调函数在函数B的内部执行, 可以向回调函数传递参数
      function foo(callBack) {
        // callBack就是回调函数
        // 调用callBack。callBack == value=>{}, 将'hello作为实参赋值给value'
        callBack('hello')
      }
      // foo() => 调用foo函数,并将箭头函数作为实参, 赋值给callBack, 传递给foo
      // callBack = value=>{}
      foo(value => console.log(value))

      // 浏览器调试工具打断点
      // 1. 在函数调用
      // 2. 条件判断
```

### 浏览器调试工具打断点

1. 在函数调用
2. 条件判断

## 高阶函数

### 什么是高阶函数?

如果一个函数A, 接收一个函数B作为参数, 那么函数A就是高阶函数

数学的表示: f(g(h(x)))

数组的方法: map(),filter(),find(),findIndex(),reduce(),forEach()

###  map()

```js
      // 注意: 值域里的值是回调函数的返回值
      const arr = [1, 2, 3, 4, 5] // 定义域
      const newArr = arr.map(x => x * 2) //值域
      console.log(newArr)
```

注意: 值域里的值是回调函数的返回值

### reduce()

#### 无初始值

```js
      // 无初始值
      const res = arr.reduce((accu, curr) => {
        console.log(accu, curr)
        return accu + curr
      })
      console.log(res)
```

#### 有初始值

当数组元素和回调函数返回值类型不一致时, 需要给初始值, 初始值的类型和返回值的类型保持一致

```js
      // 有初始值
      // 当数组元素和回调函数返回值类型不一致时, 需要给初始值, 初始值的类型和返回值的类型保持一致
      const arr2 = [
        { id: 1, number: 1 },
        { id: 2, number: 2 },
        { id: 3, number: 3 },
      ]
      // 当箭头函数的函数体只有单行语句时, 可省略花括号和return, 语句的结果会自动返回
      const res2 = arr2.reduce((accu, curr) => accu + curr.number, 0)
      console.log(res2)
```

