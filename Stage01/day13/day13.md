## 面向对象

### 字面量对象

##### 传统

先创建类，再创建对象

##### 字面量法

使用{}表示对象。使用键值对给属性和方法赋值,键和值用冒号连接，不同键值对用逗号分隔。可快速创建一个对象

本质还是new创建

```js
var stu2 = {
    name: 'simon',
    age: 18,
    study: function () {
        console.log('学习');
    }
}
```

## Math对象

### 概念

Math 对象用于执行数学任务。

### 特点

Math 对象并不像 Date 和 String 那样是对象的类，因此没有构造函数 Math()。

在使用Math对象的时候，不需要通过Math类来创建对象，直接使用类名调用即可

### 属性

| 属性                                                       | 描述                                                    |
| :--------------------------------------------------------- | :------------------------------------------------------ |
| [E](https://www.runoob.com/jsref/jsref-e.html)             | 返回算术常量 e，即自然对数的底数（约等于2.718）。       |
| [LN2](https://www.runoob.com/jsref/jsref-ln2.html)         | 返回 2 的自然对数（约等于0.693）。                      |
| [LN10](https://www.runoob.com/jsref/jsref-ln10.html)       | 返回 10 的自然对数（约等于2.302）。                     |
| [LOG2E](https://www.runoob.com/jsref/jsref-log2e.html)     | 返回以 2 为底的 e 的对数（约等于 1.4426950408889634）。 |
| [LOG10E](https://www.runoob.com/jsref/jsref-log10e.html)   | 返回以 10 为底的 e 的对数（约等于0.434）。              |
| [PI](https://www.runoob.com/jsref/jsref-pi.html)           | 返回圆周率（约等于3.14159）。                           |
| [SQRT1_2](https://www.runoob.com/jsref/jsref-sqrt1-2.html) | 返回 2 的平方根的倒数（约等于 0.707）。                 |
| [SQRT2](https://www.runoob.com/jsref/jsref-sqrt2.html)     | 返回 2 的平方根（约等于 1.414）。                       |

### 方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [abs(x)](https://www.runoob.com/jsref/jsref-abs.html)        | 返回 x 的绝对值。                                            |
| [acos(x)](https://www.runoob.com/jsref/jsref-acos.html)      | 返回 x 的反余弦值。                                          |
| [asin(x)](https://www.runoob.com/jsref/jsref-asin.html)      | 返回 x 的反正弦值。                                          |
| [atan(x)](https://www.runoob.com/jsref/jsref-atan.html)      | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。     |
| [atan2(y,x)](https://www.runoob.com/jsref/jsref-atan2.html)  | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| [ceil(x)](https://www.runoob.com/jsref/jsref-ceil.html)      | 对数进行上舍入。                                             |
| [cos(x)](https://www.runoob.com/jsref/jsref-cos.html)        | 返回数的余弦。                                               |
| [exp(x)](https://www.runoob.com/jsref/jsref-exp.html)        | 返回 Ex 的指数。                                             |
| [floor(x)](https://www.runoob.com/jsref/jsref-floor.html)    | 对 x 进行下舍入。                                            |
| [log(x)](https://www.runoob.com/jsref/jsref-log.html)        | 返回数的自然对数（底为e）。                                  |
| [max(x,y,z,...,n)](https://www.runoob.com/jsref/jsref-max.html) | 返回 x,y,z,...,n 中的最高值。                                |
| [min(x,y,z,...,n)](https://www.runoob.com/jsref/jsref-min.html) | 返回 x,y,z,...,n中的最低值。                                 |
| [pow(x,y)](https://www.runoob.com/jsref/jsref-pow.html)      | 返回 x 的 y 次幂。                                           |
| [random()](https://www.runoob.com/jsref/jsref-random.html)   | 返回 0 ~ 1 之间的随机数。[0,1)                               |
| [round(x)](https://www.runoob.com/jsref/jsref-round.html)    | 四舍五入。                                                   |
| [sin(x)](https://www.runoob.com/jsref/jsref-sin.html)        | 返回数的正弦。                                               |
| [sqrt(x)](https://www.runoob.com/jsref/jsref-sqrt.html)      | 返回数的平方根。                                             |
| [tan(x)](https://www.runoob.com/jsref/jsref-tan.html)        | 返回角的正切。                                               |
| [tanh(x)](https://www.runoob.com/jsref/jsref-tanh.html)      | 返回一个数的双曲正切函数值。                                 |
| [trunc(x)](https://www.runoob.com/jsref/jsref-trunc.html)    | 将数字的小数部分去掉，只保留整数部分。                       |

#### 随机数

random()	返回 [0,1)的随机数。

```js
// 规律
//以下函数返回 [min,max) 之间的整数：
	// 等价返回 [min,max-1] 之间的整数
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//以下函数返回 [min,max] 之间的整数：
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

## Date对象

Date 对象用于处理日期与时间

### 创建时间对象

```js
//方式一：无参数，创建当前时间的时间对象
var d1 = new Date()
console.log(d1);

//注意 若不加new关键字，直接使用Date()会生成一个表示当前日期和时间的字符串。相当于调用了一个新创建的 Date 对象的 toString() 方法
```

```js
//方式二：使用时间数值为参数的构造，构造出来的是指定的时间对象
// var d2 = new Date(year, month, day, hours, minutes, seconds, milliseconds);
// year, month, day, hours, minutes, seconds, milliseconds 分别表示年、月、日、时、分、秒、毫秒。
// 注意：月份是从零开始计算的，7代表8月
var d2= new Date(2020,8,1)
console.log(d2);
```

```js
//方式三：使用日期字符串为参数的构造，创建出来的也是指定的时间对象
// var d3 = new Date(dateString); 
// dateString 参数表示日期的字符串值。
var d3=new Date('2020-9-1')
console.log(d3);
```

```js
//方式四：使用毫秒数为参数的构造，创建出来的也是指定的时间对象
var d = new Date(milliseconds); // 参数为毫秒
//milliseconds 参数是一个 Unix 时间戳（Unix Time Stamp），它是一个整数值，表示自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数。
//注意与方式二的区别
```

```js
/*
使用场景
	只想获取当前时间使用方式一
	想获取指定的时间对象使用方式三
 */
```

### 方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [getDate()](https://www.runoob.com/jsref/jsref-getdate.html) | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。                  |
| [getDay()](https://www.runoob.com/jsref/jsref-getday.html)   | 从 Date 对象返回一周中的某一天 (0 ~ 6)。                     |
| [getFullYear()](https://www.runoob.com/jsref/jsref-getfullyear.html) | 从 Date 对象以四位数字返回年份。                             |
| [getHours()](https://www.runoob.com/jsref/jsref-gethours.html) | 返回 Date 对象的小时 (0 ~ 23)。                              |
| [getMilliseconds()](https://www.runoob.com/jsref/jsref-getmilliseconds.html) | 返回 Date 对象的毫秒(0 ~ 999)。                              |
| [getMinutes()](https://www.runoob.com/jsref/jsref-getminutes.html) | 返回 Date 对象的分钟 (0 ~ 59)。                              |
| [getMonth()](https://www.runoob.com/jsref/jsref-getmonth.html) | 从 Date 对象返回月份 (0 ~ 11)。                              |
| [getSeconds()](https://www.runoob.com/jsref/jsref-getseconds.html) | 返回 Date 对象的秒数 (0 ~ 59)。                              |
| [getTime()](https://www.runoob.com/jsref/jsref-gettime.html) | 返回 1970 年 1 月 1 日至Date 对象日期的毫秒数。              |
| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-date.html) | 返回 Date 对象的原始值。原始值返回1970年1月1日午夜以来的毫秒数 |
| [parse()](https://www.runoob.com/jsref/jsref-parse.html)     | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。*Date*.parse(*datestring*)。类名调用 |

#### 获取年月日

```js
// 对象调用
getFullYear()
getMonth() //注意： 一月为 0, 二月为 1, 以此类推
getDate()
getDay() //注意： 星期天为 0, 星期一为 1, 以此类推
```

#### 获取时分秒

```js
// 对象调用
getHours()
getMinutes()
getSeconds()
```

#### 获取毫秒

本质上是把Date对象转换为Number类型

```js
// 对象调用
getTime()
valueOf()

// 类名调用
Date.now() // H5方式 静态方法 不接受任何参数
parse()	// Date.parse(datestring)

// 强制转换
+Date对象 // 一元运算符+
Number(Date对象) //转换为Number类型

// 自动转换
' - * / ' 
	// 减乘除运算符，会在运算两个Date对象时将其临时转换为Number类型，也就是对应的毫秒，输出毫秒结果
```

## Number对象

### 概念

Number 对象是原始数值的包装对象。

Number 创建方式 new Number()。

### 属性

| 属性                                                         | 描述                         |
| :----------------------------------------------------------- | :--------------------------- |
| [MAX_VALUE](https://www.runoob.com/jsref/jsref-max-value.html) | 可表示的最大的数。*类名调用* |
| [MIN_VALUE](https://www.runoob.com/jsref/jsref-min-value.html) | 可表示的最小的数。*类名调用* |

### 方法

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [isInteger()](https://www.runoob.com/jsref/jsref-isinteger-number.html) | 检测指定参数是否为整数。*类名调用*                           |
| [isNaN()](https://www.runoob.com/jsref/jsref-isnan-number.html) | 检测指定参数是否为 NaN。*类名调用*                           |
| [toFixed(x)](https://www.runoob.com/jsref/jsref-tofixed.html) | 把数字转换为字符串，结果的小数点后有指定位数的数字。*对象调用* |

#### isNaN

和全局函数 [isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN#%E6%8F%8F%E8%BF%B0) 相比，Number.isNaN() 不会自行将参数转换成数字，只有在参数是值为 NaN 的数字时，才会返回 true

### 注意点

当你使用 Number 对象和原始 number 进行比较时，JavaScript 会自动地将 Number 对象转换为原始的数值类型 (number) ，然后进行比较。

这是通过 valueOf 方法来实现的



## 全局对象

### 概念

​	页面中最大的对象(顶级对象),在浏览器的环境中是window对象,在nodejs环境是global对象

### 特点

​	它的属性和方法都不需要加上对象名(window对象的特点)

### JavaScript 全局属性

| 属性                                                         | 描述                     |
| :----------------------------------------------------------- | :----------------------- |
| [Infinity](https://www.runoob.com/jsref/jsref-infinity.html) | 代表正的无穷大的数值。   |
| [NaN](https://www.runoob.com/jsref/jsref-nan.html)           | 指示某个值是不是数字值。 |
| [undefined](https://www.runoob.com/jsref/jsref-undefined.html) | 指示未定义的值。         |

### JavaScript 全局函数

| 函数                                                         | 描述                                               |
| :----------------------------------------------------------- | :------------------------------------------------- |
| [eval()](https://www.runoob.com/jsref/jsref-eval.html)       | 计算 JavaScript 字符串，并把它作为脚本代码来执行。 |
| [isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN#%E6%8F%8F%E8%BF%B0)     | 检查某个值是否是数字。注意与Number.isNaN()区别     |
| [Number()](https://www.runoob.com/jsref/jsref-number.html)   | 把对象的值转换为数字。                             |
| [parseFloat()](https://www.runoob.com/jsref/jsref-parsefloat.html) | 解析一个字符串并返回一个浮点数。                   |
| [parseInt()](https://www.runoob.com/jsref/jsref-parseint.html) | 解析一个字符串并返回一个整数。                     |
| [String()](https://www.runoob.com/jsref/jsref-string.html)   | 把对象的值转换为字符串。                           |

## Array对象

### 添加和删除

| 方法                                                         | 描述                                                       |
| :----------------------------------------------------------- | :--------------------------------------------------------- |
| [pop()](https://www.runoob.com/jsref/jsref-pop.html)         | 删除数组的最后一个元素并返回删除的元素。                   |
| [push()](https://www.runoob.com/jsref/jsref-push.html)       | 向数组的末尾添加一个或更多元素，并返回新的长度。           |
| [shift()](https://www.runoob.com/jsref/jsref-shift.html)     | 删除并返回数组的第一个元素。                               |
| [unshift()](https://www.runoob.com/jsref/jsref-unshift.html) | 向数组的开头添加一个或更多元素，并返回新的长度。           |
| [splice()](https://www.runoob.com/jsref/jsref-splice.html)   | 从数组中指定位置添加或删除元素。返回含有被删除的元素的数组 |

#### 添加

```js
push()	// 向数组的末尾添加一个或更多元素，并返回新的长度。
unshift()	// 向数组的开头添加一个或更多元素，并返回新的长度。
// 注意，将要添加的值写在()内，多个值用逗号‘,’隔开
// 修改原数组
// 返回值是修改后数组的长度
```

#### 删除

```js
pop()	//删除数组的最后一个元素并返回删除的元素。
shift()	//删除并返回数组的第一个元素。
// 注意，括号内无需写值
// 修改原数组
// 返回值是被删除的元素
```

#### 指定位置添加删除

```js
splice()	//从数组中指定位置添加或删除元素。
```

##### 语法

```js
array.splice(index,howmany,item1,.....,itemX)
```

| 参数                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| *index*               | 必需。规定从何处添加/删除元素。 该参数是开始插入和（或）删除的数组元素的下标，必须是数字。 |
| *howmany*             | 可选。规定应该删除多少元素。必须是数字，但可以是 "0"。 如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。 |
| *item1*, ..., *itemX* | 可选。要添加到数组的新元素                                   |

##### 返回值

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。没有删除则返回空数组

##### 注意

这种方法会改变原始数组，会导致数组长度改变等。

```js
//有一个包含工资的数组 [1500,1200,2000,2100,2200,1800] 把超过2000的删除,剩余的放到一个新的数组 打印新的数组

var arr = [1500,1200,2000,2100,2200,1800]

//直接遍历原数组,将超过2000的删掉
for(var i=0;i<arr.length;i++){
    if(arr[i]>2000){
        arr.splice(i,1)
        i-- //为了防止删除前一个元素,导致后面的元素漏掉(删除之后,数组的长度会发生改变,后面的元素会往前移)
    }
}
```



### 查找和过滤

| 方法                                                       | 描述                                         |
| :--------------------------------------------------------- | :------------------------------------------- |
| [filter()](https://www.runoob.com/jsref/jsref-filter.html) | 检测数值元素，并返回所有符合条件元素的数组。 |
| [find()](https://www.runoob.com/jsref/jsref-find.html)     | 返回符合测试（函数）条件的数组元素。         |

#### find()

##### 语法

```js
array.find(function(currentValue, index, arr),thisValue)
```

函数可以使用匿名函数

##### 定义和用法

find() 方法返回数组的第一个通过测试（函数内判断）的元素的值。

find() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 *true* 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 undefined

**注意:** find() 对于空数组，函数是不会执行的。

**注意:** find() 并没有改变数组的原始值。

##### 返回值	

返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。

#### filter()

##### 语法

```js
array.filter(function(currentValue,index,arr), thisValue)
```

函数也可以使用匿名函数或箭头函数

##### 定义和用法

filter() 方法创建一个新的数组，新数组中的元素是指定数组中符合条件的所有元素。

 filter() 方法为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 true 时, 会将这个元素存在新的数组中

- 如果没有符合条件的元素返回，则返回空数组

**注意：** filter() 不会对空数组进行检测。

**注意：** filter() 不会改变原始数组。

##### 返回值

返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。

#### findIndex()

和find()类似，只不过返回的是元素的索引
