## let和const

### 概念

let 声明的变量只在 let 命令所在的代码块内有效。
const 声明一个只读的常量，一旦声明，常量的值就不能改变。

### let 关键字

#### 代码块内有效

使用 var 关键字声明的变量不具备块级作用域的特性，它在 {} 外依然能被访问到。

在 ES6 之前，是没有块级作用域的概念的。

ES6 可以使用 let 关键字来实现块级作用域。

let 声明的变量只在 let 命令所在的代码块 {} 内有效，在 {} 之外不能访问。

```js
{
    let a = 0;
    a   // 0
    var b = 1;
}
a  // ReferenceError: a is not defined
b  // 1
```

#### 同一作用域不能重复声明

let声明的变量,不能在同一个域中重复声明

```js
let a = 1;
let a = 2;
var b = 3;
var b = 4;
a  // Identifier 'a' has already been declared
b  // 4
```

#### 不同作用域重复声明只作用于局部

使用 var 关键字重新声明变量可能会带来问题。

在块中重新声明变量也会重新声明块外的变量：

```js
var x = 10;
// 这里输出 x 为 10
{ 
    var x = 2;
    // 这里输出 x 为 2
}
// 这里输出 x 为 2
```

let 关键字就可以解决这个问题，因为它只在 let 命令所在的代码块 {} 内有效。

```js
var x = 10;
// 这里输出 x 为 10
{ 
    let x = 2;
    // 这里输出 x 为 2
}
// 这里输出 x 为 10
```

#### 循环作用域

使用 var 关键字：

```js
var i = 5;
for (var i = 0; i < 10; i++) {
    // 一些代码...
}
// 这里输出 i 为 10
```


使用 let 关键字：

```js
var i = 5;
for (let i = 0; i < 10; i++) {
    // 一些代码...
}
// 这里输出 i 为 5
```


在第一个实例中，使用了 var 关键字，它声明的变量是全局的，包括循环体内与循环体外。

在第二个实例中，使用 let 关键字， 它声明的变量作用域只在循环体内，循环体外的变量不受影响。

##### for 循环计数器很适合用 let

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出 0123456789
```

变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。

变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量，即最后输出 12345。（若每次循环的变量 j 都是重新声明的，如何知道前一个循环的值？这是因为 JavaScript 引擎内部会记住前一个循环的值）。

#### 不存在变量提升

JavaScript 中，在预编译阶段,js会优先处理变量和函数的声明,再执行变量和函数的赋值(仅限于var定义的变量)，也就是变量可以先使用再声明。

let 不存在变量提升，需要先声明再使用:

```js
console.log(a);  //ReferenceError: a is not defined
let a = "apple";

console.log(b);  //undefined
var b = "banana";
```

变量 b 用 var 声明存在变量提升，所以当脚本开始运行的时候，b 已经存在了，但是还没有赋值，所以会输出 undefined。

变量 a 用 let 声明不存在变量提升，在声明变量 a 之前，a 不存在，所以会报错。

#### 局部变量

在函数体内使用 var 和 let 关键字声明的变量有点类似。

它们的作用域都是 局部的:

```js
// 使用 var
function myFunction() {
    var carName = "Volvo";   // 局部作用域
}

// 使用 let
function myFunction() {
    let carName = "Volvo";   //  局部作用域
}
```

#### 全局变量

在函数体外或代码块外使用 var 和 let 关键字声明的变量也有点类似。

它们的作用域都是 全局的:

```js
// 使用 var
var x = 2;       // 全局作用域

// 使用 let
let x = 2;       // 全局作用域
```

使用 var 关键字声明的全局作用域变量属于 window 对象:

```js
var carName = "Volvo";
// 可以使用 window.carName 访问变量
```

使用 let 关键字声明的全局作用域变量不属于 window 对象:

```js
let carName = "Volvo";
// 不能使用 window.carName 访问变量
```

#### 暂时性死区

ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

```js
var PI = "a";
if(true){
  console.log(PI);  // Cannot access 'PI' before initialization
  let PI = "3.1415926";
}
```

### const关键字

const 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改：

```js
const PI = 3.141592653589793;
PI = 3.14;      // 报错
PI = PI + 10;   // 报错
```

const定义常量与使用let 定义的变量相似：

- 二者都是块级作用域
- 都不能和它所在作用域内的其他变量或函数拥有相同的名称

两者还有以下两点区别：

- const声明的常量必须初始化，而let声明的变量不用
- const 定义常量的值不能通过再赋值修改，也不能再次声明。而 let 定义的变量值可以修改。

```js
var x = 10;
// 这里输出 x 为 10
{ 
    const x = 2;
    // 这里输出 x 为 2
}
// 这里输出 x 为 10
```

const 声明的常量必须初始化：

```js
// 错误写法
const PI;
PI = 3.14159265359;

// 正确写法
const PI = 3.14159265359;
```

#### 并非真正的常量

 const 其实保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动。

对于简单类型（数值 number、字符串 string 、布尔值 boolean）,值就保存在变量指向的那个内存地址，因此 const 声明的简单类型变量等同于常量。

而复杂类型（对象 object，数组 array，函数 function），变量指向的内存地址其实是保存了一个指向实际数据的指针，所以 const 只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制了，所以使用 const 声明复杂类型对象时要慎重。

```js
const arr = [1,2,3]
//arr = [4,5,6] //字面量方式本质是new了一个新的数组,把新数组的地址赋给arr.报错
arr[1] = 10	//地址没变，但指向的内容变了
console.log(arr)

const obj = {name:'张三',age:23}
//obj =  {name:'李四',age:24} ////字面量方式本质是new了一个新的对象,把新对象的地址赋给obj 报错
obj.name = '李四' //地址没变，但指向的内容变了
console.log(obj)
```

#### 不同作用域重复声明只作用于局部

在相同的作用域或块级作用域中，不能使用 const 关键字来重置 const 关键字声明的变量:

```js
const x = 2;       // 合法
const x = 3;       // 不合法
x = 3;             // 不合法
var x = 3;         // 不合法
let x = 3;         // 不合法

{
    const x = 2;   // 合法
    const x = 3;   // 不合法
    x = 3;         // 不合法
    var x = 3;     // 不合法
    let x = 3;     // 不合法
}
```

const 关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:

```js
const x = 2;       // 合法

{
    const x = 3;   // 合法
}

{
    const x = 4;   // 合法
}
```

### 区别

```js
					var 			  let				const
	块级作用域		 没有				 有                  有
	变量提升           有               没有				没有
	能否被修改         能				  能				不能(对于对象类型,可以修改内容)
```

### 使用

建议按照 const > let > var

1. const在编程语言中,一般表示常量,这样阅读代码的人,就不会随意修改,防止误操作
2. js引擎对const做一些优化,执行效率比较高

具体场景

1. 声明基本类型的变量,确定变量后面会被修改(for,while循环中的循环变量),使用let。确定后面不会被修改,使用const.其他情况,let和const都可以
2. 声明对象类型的变量(数组,日期,正则),更多的是修改内容,而不是修改地址,使用const

## 类和继承

### 概念

在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。

class 的本质是 function。

它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

### 基础用法

类实际上是“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类也有两种定义方式：类表达式和类声明。

#### 类声明

类通常通过类声明创建

```js
class 类名{
    //构造函数(一般是给属性赋值)
    constructor(参数1,参数2){
        this.属性名1 = 参数1
        this.属性名2 = 参数2
    }
    //定义方法
    方法名(参数列表){
        方法体
    }
}
```

```js
// 类声明
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

不可重复声明。

类定义不会被提升，这意味着，必须在访问前对类进行定义，否则就会报错。

类中方法不需要 function 关键字。

##### 类体内特性

在类体内，有若干特性可用。

```js
class MyClass {
  // 构造函数
  constructor() {
    // 构造函数体
      //（对象的属性和方法，但最好只写需要传参的属性。无需传参的属性写在构造函数外作为实例字段；方法也写在外部，会被放在类的prototype内，被对象的__proto__属性访问）
  }
  // 实例字段（会作为对象的属性）
    // （类字段与对象属性相似，不属于变量，不需要使用诸如 const 一类的关键字去声明。）
  myField = "foo";
  // 实例方法（添加到对象的__proto__属性内）
    // （类中方法不需要 function 关键字。）
  myMethod() {
    // myMethod 体
  }
  // 静态字段（通过类名访问的属性）
  static myStaticField = "bar";
  // 静态方法（通过类名调用的方法）
  static myStaticMethod() {
    // myStaticMethod 体
  }
  // 静态块
  static {
    // 静态初始化代码
  }
  // 字段、方法、静态字段、静态方法、静态块都可以使用私有形式
  #myPrivateField = "bar";
}
```

如果你用过早于 ES6 的版本，你可能更熟悉使用函数作为构造函数。上面的模式大致可以转换为以下函数构造器：

```js
function MyClass() {
  this.myField = "foo";
  // 构造函数体
}
MyClass.myStaticField = "bar";
MyClass.myStaticMethod = function () {
  // myStaticMethod 体
};
MyClass.prototype.myMethod = function () {
  // myMethod 体
};

(function () {
  // 静态初始化代码
})();
```

私有字段和方法是类中的新特性，在函数构造器中并没有与之等价的语法。

#### 类表达式

```js
// 类表达式；类是匿名的，但是它被赋值给了变量
const Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// 类表达式；类有它自己的名字
const Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

与函数表达式类似，类表达式可以是匿名的，或者也可以有一个不同于被赋值给的变量的名称的名字。然而，不同于函数声明的是，类声明具有与 let 和 const 相同的暂时性死区限制，并且表现得像是没有被提升一样。

#### 创建对象（类的实例化）

典型函数构造器可以使用 new 来构造，也可以不使用 new 来调用。

但是class 的实例化必须通过 new 关键字。

```js
class Student{
    //属性
    constructor(name,age){
        this.name = name
        this.age = age
    }
    //方法
    study(){
        console.log('学习')
    }
}

//创建对象
const stu1 = new Student('张三',23)
```

### 继承

#### extends

通过 **extends** 实现类的继承。

```js
class Child extends Father { ... }
```

```js
class Person{
    //属性
    constructor(name,age){
        this.name = name
        this.age = age
    }
    //方法
    eat(){
        console.log('干饭')
    }
}

class Student extends Person{
    //自己特有方法
    study(){
        console.log('学习')
    }
}

//创建对象
const stu1 = new Student('张三',23)
console.log(stu1)
stu1.eat()
stu1.study()

/* 
         继承的注意点
         	1.子类必须是被父类囊括的更小的概念
            2.只要不是所有子类都具备的的属性和方法,就不要放在父类中
       */
```

#### super

如果子类中定义了构造函数 constructor ，那么它必须先调用 super() 才能使用 this。

> 在派生类的构造函数体中（使用 `extends`），`super` 关键字可以作为“函数调用”（`super(...args)`）出现，它必须在使用 `this` 关键字之前和构造函数返回之前被调用。它调用父类的构造函数并绑定父类的公共字段，之后派生类的构造函数可以进一步访问和修改 `this`。

super:代表父类

this:代表本类。

```js
class Person{
    //属性
    constructor(name,age){
        this.name = name
        this.age = age
    }
    //方法
    eat(){
        console.log('干饭')
    }
}

class Student extends Person{
    //属性
    constructor(name,age,number){

        //直接调用父类的构造方法完成属性的初始化
        super(name,age)

        this.number = number
    }
    //自己特有方法
    study(){
        console.log('学习')
    }
}
```

super 关键字也可以用来调用父类中对应的方法。

```js
//定义一个手机类
class Phone{
    call(){
        console.log('打电话')
    }
}

//定义一个新一代手机:继承手机类,它的功能更加强大,可以在打电话的同时进行视频
class NewPhone extends Phone{
    //重新书写call方法
    call(){
        //super来调用父类的方法
        super.call()
        console.log('同时视频')
        this.playGame()//this代表本类,可以调用本类的其他方法
    }
    playGame(){
        console.log('玩游戏')
    }
}
```

### 静态

静态属性:使用**static**修饰的属性,只能通过类名访问

静态方法:使用**static**修饰的方法,只能通过类名调用

> static 关键字用来定义类的静态方法或字段。静态属性（字段和方法）被定义在类的自身而不是类的实例上。静态方法通常用于为应用程序创建工具函数，而静态字段则多用于存放缓存、固定配置或其他不需要跨实例复制的数据。

```js
class Student{
    //属性
    constructor(name,age){
        this.name = name
        this.age = age
    }
    //方法
    study(){
        console.log('学习')
    }

    //静态属性
    static country = '中国'

    //静态方法
    static exam(){
        console.log('考试')
    }
}
//创建对象
const stu1 = new Student('张三',23)
stu1.study()

const stu2 = new Student('李四',24)
stu2.study()

//静态成员仍然是通过类名调用,不能通过对象调用
console.log(stu1.country)
console.log(Student.country)
Student.exam()
stu1.exam()
```

### this指向

this 的值在类的构造函数或类的方法中会自动指向类的实例

但对于继承类（派生类）构造函数，没有初始的 this 绑定。调用 super() 在构造函数中创建一个 this 绑定。

## 解构赋值

### 概念

解构赋值是对赋值运算符的扩展。

它针对数组或者对象进行模式匹配，可以将数组中的值或对象的属性取出，赋值给模式中的变量

在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

### 解构模型

在解构中，有下面两部分参与：

- 解构的源，解构赋值表达式的右边部分。
- 解构模式，赋值的目标，解构赋值表达式的左边部分。

#### 描述

对象和数组字面量表达式提供了一种简单的方法来创建特别的数据包。

```js
const x = [1, 2, 3, 4, 5];
```

解构赋值使用类似的语法，但解构模式定义了要从原变量中取出哪些值

```js
const x = [1, 2, 3, 4, 5];
const [y, z] = x;
console.log(y); // 1
console.log(z); // 2
```

同样，对象也可以进行解构赋值。

```js
const obj = { a: 1, b: 2 };
const { a, b } = obj;
// is equivalent to:
// const a = obj.a;
// const b = obj.b;
```

#### 绑定与赋值

对于对象和数组的解构，有两种解构模式：*绑定模式*和*赋值模式*，它们的语法略有不同。

##### 绑定模式

在绑定模式中，模式以声明关键字（`var`、`let` 或 `const`）开始。然后，每个单独的属性必须绑定到一个变量或进一步解构。

```js
const obj = { a: 1, b: { c: 2 } };
const {
  a,
  b: { c: d },
} = obj;
// Two variables are bound: `a` and `d`
```

所有变量共享相同的声明，因此，如果你希望某些变量可重新分配，而其他变量是只读的，则可能需要解构两次——一次使用 let，一次使用 const。

```js
const obj = { a: 1, b: { c: 2 } };
const { a } = obj; // a is constant
let {
  b: { c: d },
} = obj; // d is re-assignable
```

##### 赋值模式

在赋值模式中，模式不以关键字开头。每个解构属性都被赋值给一个赋值目标——这个赋值目标可以事先用 var 或 let 声明，也可以是另一个对象的属性——一般来说，可以是任何可以出现在赋值表达式左侧的东西。

```js
const numbers = [];
const obj = { a: 1, b: 2 };
({ a: numbers[0], b: numbers[1] } = obj);
// The properties `a` and `b` are assigned to properties of `numbers`
```

> **备注**：当使用对象文字解构赋值而不带声明时，在赋值语句周围必须添加括号 `( ... )`。
>
> `{ a, b } = { a: 1, b: 2 }` 不是有效的独立语法，因为左侧的 `{a, b}` 被视为块而不是对象字面量。但是，`({ a, b } = { a: 1, b: 2 }) `是有效的，`const { a, b } = { a: 1， b: 2 } `也是有效的。
>
> 如果你的编码风格不包括尾随分号，则` ( ... )` 表达式前面需要有一个分号，否则它可能用于执行前一行的函数。

**注意**：赋值模式前的语句如果可以加分号，最好加上，否则解构赋值可能会被归于上一行语句中。

### 数组模型的解构（Array）

```js
const [变量列表] = 要匹配的数组
```

#### 基本

```js
const [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3
```

#### 可嵌套

```js
const [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3
```

#### 可忽略

```js
const [a, , b] = [1, 2, 3];
// a = 1
// b = 3
```

#### 解构比源更多的元素

在赋值语句右侧指定长度为 N 的数组的数组解构中，如果赋值语句左侧指定的变量数量大于 N，则只有前 N 个变量被赋值。其余变量的值将是undefined

```js
const [a = 1, b] = []; // a = 1, b = undefined
```

#### 剩余运算符

可以使用剩余属性（...rest）结束解构模式。此模式会将对象或数组的所有剩余属性存储到新的对象或数组中。

```js
const [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

剩余属性必须是模式中的最后一个，并且不能有尾随逗号。

#### 字符串等

在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 Iterator 接口的数据。

```js
const [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'
```

#### 默认值

```js
const [a = 2] = [undefined]; // a = 2
```

当解构模式有匹配结果，且匹配结果是 **undefined** 时，会触发默认值作为返回结果。

```js
const [a = 3, b = a] = [];     // a = 3, b = 3
const [a = 3, b = a] = [1];    // a = 1, b = 1
const [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```

a 与 b 匹配结果为 undefined ，触发默认值：a = 3; b = a =3

a 正常解构赋值，匹配结果：a = 1，b 匹配结果 undefined ，触发默认值：b = a =1

a 与 b 正常解构赋值，匹配结果：a = 1，b = 2

默认值可以是任何表达式。仅在必要时对其进行评估。

```js
const [ b = console.log("hey") ] = [ 2 ];
// Does not log anything, because `b` is defined and there's no need to evaluate the default value.
```

#### 交换变量

可以在一个解构表达式中交换两个变量的值，而无需创建临时变量。

```js
let a = 1;
let b = 3;//这个分号一定要加

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1, 3, 2]
```

#### 解析一个从函数返回的数组

从一个函数返回一个数组是十分常见的情况。解构使得处理返回值为数组时更加方便。

在下面例子中，要让 f() 返回值 [1, 2] 作为其输出，可以使用解构在一行内完成解析。

```js
function f() {
  return [1, 2];
}

const [a, b] = f();
console.log(a); // 1
console.log(b); // 2
```

### 对象模型的解构（Object）

```js
const {参数列表} = 要匹配的字面量对象
```

#### 基本赋值

```js
const { foo, bar } = { foo: 'aaa', bar: 'bbb' };
console.log(foo); // 'aaa'
console.log(bar); // 'bbb'
```

#### 赋值给新的变量名

```js
const { foo: p, bar: q } = { foo: 'aaa', bar: 'bbb' };
console.log(p); // 'aaa'
console.log(q); // 'bbb'
```

`const { foo: p } = 对象` 从对象中获取名为 `foo` 的属性的值，并将其赋值给名为 `p` 的局部变量

#### 可嵌套

```js
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'
```

#### 可忽略

```js
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
// x = 'hello'
```

#### 解构比源更多的元素

```js
let obj = {p: [{y: 'world'}] };
let {p: [{ y }, x ] } = obj;
// x = undefined
// y = 'world'
```

#### 剩余运算符

```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```

#### 解构默认值

使用默认值的规则和数组一样：当匹配结果是 **undefined**时 

```js
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

#### 赋值到新的变量名并提供默认值

一个属性可以：

- 从对象中提取并分配给具有不同名称的变量。
- 指定一个默认值，以防获取的值为 undefined。

```js
const { a: aa = 10, b: bb = 5 } = { a: 3 };

console.log(aa); // 3
console.log(bb); // 5
```

#### 从作为函数参数传递的对象中提取属性

传递给函数参数的对象也可以通过解构赋值把属性提取到变量中，然后可以在函数体内访问这些变量。

解构语法允许新变量具有与原始属性相同或不同的名称，并为原始对象未定义属性的情况分配默认值。

下面是一个对象，其中包含有关用户的信息

```js
const user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "Jane",
    lastName: "Doe",
  },
};
```

接下来展示了如何将传递对象的属性提取到具有相同名称的变量。

形参` { id } `表示解构传递给函数的对象的 id 属性并赋值到一个同名变量id中，然后将变量id传入函数内部使用。

```js
function userId({ id }) {
  return id;
}

console.log(userId(user)); // 42
```

还可以将提取的属性值赋值给新的变量。下面，我们提取名为 displayName 的属性，并将值赋给新变量dname，以便在函数体内使用。

```js
function userDisplayName({ displayName: dname }) {
  return dname;
}

console.log(userDisplayName(user)); // `jdoe`
```

##### 注意

上面的写法`function userId({ id }){...}`中形参`{ id }`表示对对象实参进行解构赋值。

但是，若函数没有实参传入，形参接收到的值就会是undefined，没有办法进行对象的解构赋值，会报错。

所以我们要把形参的默认参数值设置为一个空对象，`{ id }={}`。这样即使没有实参对象传入，也会对默认空对象进行解构赋值，不会报错。

下一小节的实例中，`={}`便表示为形参设置默认值空对象，防止未传参时报错

#### 设置函数参数的默认值

解构默认值可以使用 `= `指定。当解构模式有匹配结果，且匹配结果是 **undefined** 时，会触发默认值作为返回结果。

从作为函数参数传递的对象中提取属性时，如果指定的属性在传递的对象中不存在，则将解构默认值用作变量值

下面展示了一个默认大小为 big的函数，默认坐标为 x: 0, y: 0，默认半径为 25。

```js
function drawChart({
  size = "big",
  coords = { x: 0, y: 0 },
  radius = 25,
} = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}

drawChart({
  coords: { x: 18, y: 30 },
  radius: 30,
});
```

`={}`表示为形参设置默认值空对象，在当前形式下，你可以在不提供任何参数的情况下调用 drawChart()。你也可以在没有该形参默认值的情况下编写该函数。但是，如果你省略该默认值，该函数将在调用时你至少需要提供一个空对象字面量

#### 解构嵌套对象和数组

```js
const metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      title: "JavaScript-Umgebung",
    },
  ],
};

let {
  title: englishTitle, // rename
  translations: [
    {
      title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"
```

#### 组合数组和对象解构

```js
const props = [
  { id: 1, name: "Fizz" },
  { id: 2, name: "Buzz" },
  { id: 3, name: "FizzBuzz" },
];

const [, , { name }] = props;

console.log(name); // "FizzBuzz"
```

#### 解构对象时查找原型链

当解构一个对象时，如果属性是对象本身不具备的，它将沿着原型链继续查找

```js
const obj = {
  self: "123",
  __proto__: {
    prot: "456",
  },
};
const { self, prot } = obj;
// self "123"
// prot "456" (Access to the prototype chain)
```

## 箭头函数

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：

```js
参数 => 函数体
```

但在语义上有一些差异，在用法上也有一些限制：

- 箭头函数没有独立的 this、arguments 和 super 绑定，并且不可被用作方法。
- 箭头函数不能用作构造函数。使用 new 调用它们会引发 TypeError。它们也无法访问 new.target 关键字。
- 箭头函数不能在其主体中使用 yield，也不能作为生成器函数创建。

### 语法

#### 语法一览

```js
() => expression

param => expression

(param) => expression

(param1, paramN) => expression

() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
  statements
}
```

#### 单个参数，一条语句

参数部分可省略括号；函数体可省略大括号，表达式前无需写return，结果自动返回

*注意*：即使函数体只有单条语句，若被大括号扩了起来，要返回必须加return

```js
var f = v => v;
//等价于
var f = function(a){
 return a;
}
f(1);  //1
```

#### 无参数或多个参数

当箭头函数没有参数或者有多个参数，要用 () 括起来。

```js
var f1 = (a,b) => a+b;
f1(6,2);  //8

var f2 = () => console.log('hello world')
f2()
```

#### 函数体多行语句

当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块。

当只有一行语句，并且需要返回结果时，可以省略 {}和return , 结果会自动返回。

*注意*：即使函数体只有单条语句，若被大括号扩了起来，要返回必须加return

```js
var f = (a,b) => {
 let result = a+b;
 return result;
}
f(6,2);  // 8
```

#### 单行对象表达式

当箭头函数要返回对象的时候，为了区分于代码块，要用 () 将对象包裹起来

```js
// 报错
var f = (id,name) => {id: id, name: name};
f(6,2);  // SyntaxError: Unexpected token :

// 不报错
var f = (id,name) => ({id: id, name: name});
f(6,2);  // {id: 6, name: 2}
```

#### 注意点

没有 this、super、arguments 和 new.target 绑定。

```js
var func = () => {
  // 箭头函数里面没有 this 对象，
  // 此时的 this 是外层的 this 对象，即 Window 
  console.log(this)
}
func(55)  // Window 

var func = () => {    
  console.log(arguments)
}
func(55);  // ReferenceError: arguments is not defined
```

箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。

```js
function fn(){
  setTimeout(()=>{
    // 定义时，this 绑定的是 fn 中的 this 对象
    console.log(this.a);
  },0)
}
var a = 20;
// fn 的 this 对象为 {a: 18}
fn.call({a: 18});  // 18
```

不可以作为构造函数，也就是不能使用 new 命令，否则会报错

### 箭头函数this指向

在箭头函数中，this 保留了闭合词法上下文的 this 值。换句话说，当对箭头函数求值时，语言不会创建一个新的 this 绑定。

例如，在全局代码中，无论是否在严格模式下，由于全局上下文绑定，this 值总是 globalThis。

```js
const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true
```

箭头函数在其周围的作用域上创建一个 this 值的闭包，这意味着箭头函数的行为就像它们是“自动绑定”的——无论如何调用，this 都绑定到函数创建时的值（在上面的例子中，是全局对象）。在其他函数内部创建的箭头函数也是如此：它们的 this 值保持为闭合词法上下文的 this。

#### 全局作用域

在全局作用域下定义的箭头函数，其this会继承自全局对象。

在浏览器中，全局对象是window，在Node.js中则是global。

```js
const arrowFunc = () => {
  console.log(this);
};

arrowFunc(); // 在浏览器中输出：window
```

#### 作为字面量对象方法

当箭头函数作为对象的方法使用时，它的`this`不会指向该对象，而是继承自定义该函数时的作用域。

```js
const obj = {
  name: 'John',
  arrowFunc: () => {
    console.log(this.name);
  }
};

obj.arrowFunc(); // 输出：undefined
```

在这个例子中，`this.name`是未定义的，因为箭头函数的`this`指向的是全局对象，而非`obj`。

#### 作为构造函数

箭头函数不适合作为构造函数，因为它们没有自己的`this`。如果尝试用`new`关键字调用箭头函数，会抛出错误。

```js
const ArrowFunc = () => {};
const instance = new ArrowFunc(); // 报错：ArrowFunc is not a constructor
```

#### 在事件处理程序中

箭头函数中的`this`仍然继承自定义时的作用域，因此在事件处理程序中，它不会指向触发事件的DOM元素。

```js
document.querySelector('button').addEventListener('click', () => {
  console.log(this); // 输出：window（在浏览器中）
});
```

所以在书写事件处理函数的时候,如果要用到this,尽量使用普通函数。将this动态地指向事件监听器所在的元素对象

#### 嵌套函数

在嵌套函数中使用箭头函数可以避免传统函数中`this`的指向问题。

```js
function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

const timer = new Timer();
```

在这个例子中，`setInterval`内的箭头函数的`this`指向`Timer`实例，而不是`setInterval`调用的上下文。

#### 箭头函数作为构造函数内的方法

如果你在类中将方法定义为箭头函数，`this` 将绑定到箭头函数定义时的上下文，也就是类实例化时的上下文。

```js
class MyClass {
  constructor() {
    this.name = 'MyClass Instance';
    this.arrowMethod = () => {
      console.log(this.name);
    };
  }
}

const instance = new MyClass();
instance.arrowMethod(); // 输出：MyClass Instance
const myObj = {
    name: 'Li'
}
myObj.fn = instance.arrowMethod;
myObj.fn(); // 输出：MyClass Instance
```

在这个例子中，`arrowMethod` 是一个箭头函数，它在类的构造函数中定义。因此，`this` 在箭头函数中指向类的实例，与普通函数定义的方法相同。

即使将方法赋给其他对象（包括全局对象），也不会改变this指向。这是区别于普通方法的地方（普通方法则会灵活改变this指向）。

#### 箭头函数作为类的实例字段

在类字段中定义箭头函数时，`this` 依然会指向类的实例。

原因是，类字段是在构造函数运行之前被初始化的，但它们仍然属于实例的一部分。因此，当类被实例化时，`arrowMethod` 会被赋值为一个箭头函数，而这个箭头函数的 `this` 就绑定到了当前实例上。

```js
class MyClass {
    constructor() {
        this.name = 'MyClass Instance';
    }
    
    arrowMethod = () => {
        console.log(this.name);
    };
}

const instance = new MyClass();
instance.arrowMethod(); // 输出：MyClass Instance
const myObj = {
    name: 'Li'
}
myObj.fn = instance.arrowMethod;
myObj.fn(); // 输出：MyClass Instance
```

即使将方法赋给其他对象（包括全局对象），也不会改变this指向。这是区别于普通方法的地方（普通方法则会灵活改变this指向）。

## 遍历总结

### 数组遍历的4种方式

1. 普通for循环:速度最快,可读性较差
2. forEach:速度快,并且可以获取元素和索引,最常用
3. for...of 只能获取到元素,获取不到索引,但是可以通过元素获取索引
4. for...in 只能获取到索引,获取不到元素,但是可以通过索引获取元素

#### forEach循环

```js
arr.forEach(function(item,index){
    console.log(item,index)
})
```

#### for...of循环

只能获取到数组的元素,获取不到数组的索引

##### 语法

```js
for(const 元素名 of 数组名){语句体}
```

```js
for(const item of arr){
    console.log(item)
    console.log(arr.indexOf(item))//也可以使用这种方式,间接获取元素的索引(可能会出问题)(当有重复元素时)
}
```

#### for...in循环 

只能获取到数组元素的索引,获取不到数组的元素

##### 语法

```js
for(const 索引名 in 数组名){语句体}
```

```js
for(const index in arr){
    console.log(index)
    console.log(arr[index])//也可以通过这种方式间接获取数组的元素
}
```

### 对象遍历的常用方法

- for...of优势:可以在遍历的同时对元素进行解构,方便快速获取部分内容
- for...in优势:可以很方便的的获取对象的所有属性名(后期就可以通过属性名获取属性值)

#### for...of优势

可以在遍历的同时进行解构,方便快速获取部分内容

```js
var array = [
    {name:"河南省",cities:["郑州","洛阳","开封"]},
    {name:"辽宁省",cities:["沈阳","大连","鞍山"]},
    {name:"山东省",cities:["青岛","济南","烟台"]},
];

//for..of好处:可以在遍历的同时.进行解构
for(const {name,cities} of array){
    console.log(name,cities)
}
```

#### for...in优势

可以很方便的的获取对象的所有属性名(后期就可以通过属性名获取属性值)

```js
//for...in 循环主要用于遍历对象的属性名
var stu = {name:'张三',age:23,height:183}
for(const key in stu){
    console.log(key)//获取的是对象的属性名 
    onsole.log(typeof key);//String
    console.log(stu.key) //这种简化方式获取不到值
    console.log(stu[key])//只能用这种方式获取属性对应的值
}
```

### 使用建议

优先使用forEach,和for...of,其次再考虑for...in

## 属性访问器

### 语法

```js
object.property
object['property']
```

### 描述

我们可以将对象看做是一个*关联数组（*或者：*映射*、*字典*、*哈希表*、*查询表*）。这个数组中的键就是这个对象中属性的名称。

通常，当我们提及一个对象的属性时，会对属性与方法之间做个对比。然而，属性与方法之间的区别并不大。一个方法就是一个可以被调用的属性而已，例如一个指向函数实例的引用可以作为对象属性的值。

访问对象属性有两种方式：点号表示法和方括号表示法。

### 点号表示法

```js
get = object.property;
object.property = set;
```

以上代码中，`property`必须是一个有效的 JavaScript 标识符，例如，一串字母数字字符，也包括下划线及美元符号，但不能以数字作为开头。比如，`object.$1`是合法的，而 `object.1`是无效不合法的。

```js
document.createElement("pre");
```

在上述代码块中，`document`中存在一个名为"createElement"的方法并且被调用了。

如果对数字字面量使用方法，并且数字文字没有指数且没有小数点，请在方法调用之前的点之前留出空格，以防止点被解释为小数点。

```js
77 .toExponential();
// 或
77
.toExponential();
// 或
(77).toExponential();
// 或
77..toExponential();
// 或
77.0.toExponential();
// 因为 77. === 77.0，没有歧义（no ambiguity）
```

### 方括号表示法

```js
get = object[property_name];
object[property_name] = set;
```

`property_name` 是一个字符串。该字符串不一定是一个合法的标识符；它可以是任意值，例如，"1foo"，"!bar!"，甚至是 " "（一个空格）。

任何非字符串对象，包括 Number，都会通过 toString 方法，被转换成一个字符串

```js
document["createElement"]("pre");
```

这里的代码的功能跟上一个例子的作用是相同的。

括号之前允许有空格。

```js
document["createElement"]("pre");
```

### 使用场景

使用点(.)运算符:可读性强,适应于属性名不包含特殊字符或者空格的静态属性名

使用方括号([])运算符:灵活性高,主要用于处理动态属性名或者包含特殊字符的属性名

```js
var stu = {
    'user-name':'张三',
    age:23
}

console.log(stu.user-name)//点运算符处理不了含有特殊字符的属性名
console.log(stu['user-name']) //张三

var a = 'age'
console.log(stu.a) //点运算处理不了动态属性名(变量的值是属性名)
console.log(stu[a])
```

## Offset相关属性

### 概念

offset:元素的偏移值,通过它的相关属性,可以动态获取元素的位置,大小等

### 作用

1. 可以获取元素距离最近的**带定位**父元素的位置(不带单位)
2. 可以获取元素自身的大小,宽高(不带单位)

### 属性

```js
element.offsetTop	返回当前元素的相对于带定位父元素垂直方向的偏移值
element.offsetLeft	返回当前元素的相对于带定位父元素水平方向的偏移值
element.offsetHeight 返回任何一个元素的高度，包括边框和内边距，但不包含外边距
element.offsetWidth	返回元素的宽度，包括边框和内边距，但不包含外边距
element.offsetParent 返回元素的偏移容器
```

#### element.offsetTop

##### 定义和用法

offsetLeft 是一个*只读*属性，返回当前元素相对于 offsetParent 节点左**边界**的偏移像素值

当前元素的border外边缘和offsetParent的border内边缘的偏移像素值

**注意**：

若有transform，是在计算transform之前的偏移

#### element.offsetWidth

##### 定义和用法

offsetWidth 属性是一个*只读*属性，它返回该元素的像素宽度，宽度包含内边距（padding）和边框（border），不包含外边距（margin），是一个整数。不带单位，但单位是像素 px。

#### element.offsetParen

##### 定义和用法

offsetParent 是一个只读属性，获得被定位的最近祖先元素

**注意**：当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。

**注意**：如果都没有定位,相对于body

### 和style区别

#### offset

可以得到任意方式引入的样式值

得到的值没有单位，包含边框和内边距

是只读属性，只能获取不能设置

#### style

只能获取行内样式里的style

得到的值带单位，是否包含边框和内边距要看box-sizing

是一个可读写属性,可以设置，也可以获取

#### 总结

想要获取元素的位置和大小，使用offset更方便（offset主要用于获取）

想要修改元素的属性，使用style更方便（style主要用于设置）