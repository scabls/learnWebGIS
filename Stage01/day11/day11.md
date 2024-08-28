## 流程控制

### 按照代码结构分类

#### 顺序结构

从上往下，依次执行

#### 选择结构

选择性的执行某些代码

​			if语句

​			if-else语句

​			if-else if-else语句

​			switch语句

#### 循环结构

根据条件重复执行某些代码

​			for语句

​			while语句

​			do-while语句

### 学习建议

搞清楚每一种结构的**语法**

搞清楚每一种结构的**执行流程**

搞清楚每一种结构的**应用场景**

## 选择语句

### if语句

```js
if(条件表达式){
    语句体
}
```

**执行流程**
	如果表达式成立，就执行对应语句，否则就不执行

**应用场景**

​	主要用于判断一个条件，只有条件成立才会执行相应的代码

**卫语句**

​	多个if语句并列的方式，结构清晰，如同闯关

### if-else语句

```js
if(条件表达式){
    语句体1
}
else{
    语句体2
}
```

**执行流程**
	如果表达式成立，就执行语句体1，否则就执行语句体2

**应用场景**

​	主要用于判断一个条件，条件是否成立都会执行相应的代码

**注意点**

```js
if (false) {
    var a = 10;
}
else {
    alert(a + " " + typeof a)
}
```

在if语句中定义的变量，在else语句中拿不到值

因为if-else只会执行其中之一的语句体，另一块不执行

### if-else if-else语句

```js
if(条件表达式1){
    语句体1
}
else if{
    语句体2
}
···
else if{
    语句体n-1
}
else{
    语句体n
}
```

**执行流程**

从上往下依次判断每个条件，如果满足就执行对应的语句体，都不满足就执行最后的else内语句体

**应用场景**

主要用于判断多个条件（扑克牌发牌，把除3为1给玩家1，把除3为2给玩家2，把除3为3给玩家3）

**注意点**

else if的条件表达式隐含了不满足上面的条件表达式，主要是else在起作用

可以先把特殊情况放在最上层，然后再依次列出正常情况

### switch语句

#### 基础版

```js
switch(n) //首先设置表达式 n（通常是一个变量）
{
    case 值1:
        执行代码块 1
        break;
    case 值2:
        执行代码块 2
        break;
    ···
    case 值n:
        执行代码块 n
        break;
    default:
        当才面所有条件都不成立的时候才会执行的代码
        break;
}
```

**执行流程**

根据表达式或变量的值从上往下依次进行判断，如果匹配相应的值，就会执行相应的代码，并跳出switch语句（break实现）。如果都不满足，就会执行default里的代码

**case穿透**

*case穿透产生的原因*

​		如果case语句没有break，就会产生case穿透，因为break用于结束switch语句

*case穿透产生的现象*

​		从满足条件的那个语句开始，依次执行，忽略后面case表达式的判断，执行语句直到遇到break语句

*case穿透的好处*

​		在某些情况下，可以使用case穿透来简化代码

**应用场景**

主要用于判断多个条件，更多的是等值判断（月份、星期、季节）

#### 完整版

switch 语句会对表达式进行求值，并将表达式的值与一系列 case 子句进行匹配，一旦遇到与表达式值相匹配的第一个 case 子句后，将执行该子句后面的语句，直到遇到 break 语句为止。若没有 case 子句与表达式的值匹配，则会跳转至 switch 语句的 default 子句执行。

##### 语法

```js
switch (expression) {
  case caseExpression1:
    statements
  case caseExpression2:
    statements
  // …
  case caseExpressionN:
    statements
  default:
    statements
}

/*
expression
一个表达式，结果将与每个 case 子句进行匹配。

case caseExpressionN 可选
case 子句用于与 expression 进行匹配。如果 expression 的值与任何 caseExpressionN 的值匹配，则从该 case 子句之后的第一个语句开始执行，直到遇到 switch 语句结束或首个 break 语句为止。

default 可选
default 子句；如果存在，则当 expression 的值与任何 case 句都不匹配时，会执行此子句。一个 switch 语句只能有一个 default 子句。
*/
```

##### 描述

switch 语句首先对其表达式进行求值。然后，它会查找第一个case 子句，该子句的表达式求值结果与输入表达式的结果相同（通过**严格相等**比较） ，并将控制权转移到该子句，执行该子句之后的所有语句。

仅当必要时才会对子句表达式进行求值——如果已经找到了匹配项，则后续的 case 子句表达式将不再进行求值，即使它们可能会因跳出和穿透机制而被执行到。

```js
switch (undefined) {
  case console.log(1):
  case console.log(2):
}
// 仅输出 1
```

若找不到匹配的 case 子句，程序会查找可选的 default 子句，如果找到，则将控制权转移到该子句，并执行该子句后面的语句。如果找不到 default 子句，程序将继续执行 switch 结束后的语句。按照惯例，default 子句通常位于最后一个位置，但实际上并不强制要求如此。一个 switch 语句只能有一个 default 子句；多个 default 子句会导致 SyntaxError 错误。

##### 跳出和穿透

你可以在 switch 语句体内部使用 break 语句提前跳出，通常是在执行完两个 case 子句之间的所有语句后。执行会从 switch 语句后的第一条语句继续进行。

如果省略了 break 语句，程序执行将会继续流向下一个 case 子句，甚至到达 default 子句，而不论该子句中的表达式值是否匹配。这种行为被称为“穿透（fall-through）”。

```js
const foo = 0;
switch (foo) {
  case -1:
    console.log("负 1");
    break;
  case 0: // foo 的值匹配这个条件；执行从这里开始
    console.log(0);
  // 忘记了 break！执行穿透
  case 1: // 'case 0:' 中没有 break 语句，所以这个 case 也会执行
    console.log(1);
    break; // 遇到 break，不会继续到 'case 2:'
  case 2:
    console.log(2);
    break;
  default:
    console.log("default");
}
// 输出 0 和 1
```

在合适的上下文中，其他控制流语句同样具有跳出 switch 语句的效果。例如，如果 switch 语句嵌套在一个函数内部，那么 return 语句将结束函数体的执行，因此也会结束 switch 语句的执行。如果 switch 语句位于循环体内，那么 continue 语句会停止 switch 语句的执行，并跳转到循环体的下一次迭代。

##### 示例

###### 利用穿透特性

这种方法利用了这样一个事实，如果在某个 case 子句下方没有 break 语句，那么无论下一个 case 子句是否满足条件，程序都会继续执行下一个 case 子句。

以下是一个单操作连续 case 语句的示例，其中四个不同的值执行完全相同的操作。

```js
const Animal = "长颈鹿";
switch (Animal) {
  case "奶牛":
  case "长颈鹿":
  case "狗":
  case "猪":
    console.log("这类动物没有灭绝。");
    break;
  case "恐龙":
  default:
    console.log("这类动物已经灭绝。");
}
```

###### 一种替代 if...else 链的方法

switch (true) 模式作为 if...else 结构的一种替代方案，在希望利用穿透行为时特别有用。

```js
var number = prompt("请输入一个月份：");
switch (true) {/* 表示用来跟case表达式匹配的值是true，这时case表达式应该返回布尔值 */
        // 值的匹配通过严格相等比较
    case number === '12' || number === '1' || number === '2':
        alert("冬季");
        break;
    case number === '3' || number === '4' || number === '5':
        alert("春季");
        break;
    case number === '6' || number === '7' || number === '8':
        alert("夏季");
        break;
    case number === '9' || number === '10' || number === '11':
        alert("秋季");
        break;
    default:
        alert("请输入正确的月份");
        break;
}
```

### 选择语句的区别

**语法上**

if和if-else语句只能判断一个条件，而if-else if-else和switch一次可以判断多个条件

if-else if-else和switch结构非常相似，所有的switch语句都可以使用if-else if-else改写

但是所有的if-else if-else语句不一定能用switch改写

**应用场景**

if语句主要用于范围的判断,switch主要用于等值判断

如果条件只有固定几个取值,建议使用switch,因为它的层次更加清晰

## 循环语句

### for循环

```JS
for(初始化语句; 条件判断语句; 循环增量语句){
    循环体语句
}
```

### while循环

#### while 循环

基本格式

```js
while (条件表达式) //通常用来写死循环
{
    循环体语句
}
```

完整格式

```js
初始化语句
while (循环判断语句)
{
    循环体语句
    循环增量语句
}
```

#### do/while 循环

基本格式

```js
do {
    循环体语句
}
while (条件表达式) //通常用来写死循环
```

完整格式

```js
初始化语句
do {
    循环体语句
    循环增量语句
}
while (循环判断语句)
```

### 区别

**for循环和while循环**

每次都是先判断循环条件,再执行循环体

**do-while循环**

每次都是先执行循环体,再判断条件(不管条件成立与否,都会先执行一次循环体)

### 应用场景

循环次数确定,建议使用for循环,因为它的结构比较紧凑

循环次数不确定,一般循环条件是确定的,建议使用while循环