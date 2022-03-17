# Two Pillars

## 高阶函数

- `参数|返回值`是函数的函数。本质是定义抽象，屏蔽底层复杂度。

```js
// 示例
const forEach = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i]);
  }
};

// curry
const multiplyBy = num1 => num2 => num2 * num1;

const multiplyByFove = multiplyBy(2)(2);
multiplyByFove(2); // 8
```

## 闭包

闭包是函数及其状态的引用的组合，优点是可以保留引用缺点是保存的引用不会被回收，所以如果闭包太多，会造成内存泄露。

- 涉及知识点：作用域链+高阶函数

```js
const once = fn => {
  let done = false;
  return function (...args) {
    // 正常done所在环境在此函数被调用时已被销毁
    return done ? undefined : ((done = true), fn.call(this, ...args));
  }; // 这个函数和done所在的词法环境的组合是闭包
};

const one = () => 1;
const onceOne = once(one);
onceOne(); // 1
onceOne(); // undefined
```

## 原型继承

- 原型是一种设计模式，即所有对象都是从一个初始对象复制出来的，方便快速生成复杂的对象。

### JavaScript 中的原型

- JavaScript 里的初始原型对象是`Object.getPrototypeOf(Object.prototype)`
- 新对象也可以成为其他对象的原型对象，进而构成一条原型链，方便构成层级关系。
  - `instanceof`就是沿着原型链查找
  - 原理：[MyInstanceof](./Appendix/MyInstanceof)
- JavaScript 中的对象是通过函数的构造器(new)调用来生成的

### JavaScript 中的继承

- 新原型对象对象通过继承来复制旧原型对象上的属性和方法
- JS 中的继承是基于原型链的继承，原型链示意图：
  - `null`
  - ` ↑ Object.getPrototypeOf()`
  - `Object.prototype ←prototype--constructor→ Object`
  - ` ↑ Object.getPrototypeOf()`
  - `{}`
- [inheritance](./Appendix/inheritance)

```js
// 通过原型的方式实现继承
// 1.Object.create()的第一个参数Parent.prototype作为新对象Child.prototype的原型
// 2.给新对象添加了一个constructor属性，值为 Child
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

// 语法糖
Class Child extends Parent { constructor() {...} }
```

## 函数 VS 对象

### 函数

- 默认参数：this，arguments。前者表示函数自身，后者表示函数参数列表
- 函数是一等公民：函数可以被分配；函数可以当参数；函数可以当返回值

- 相关：`HOF`,`Closure`,`FP`,`this`,`scope`,`generator`

### 对象

控制对象的访问：使用`Proxy`

```js
const target = {};
const proxy = new Proxy(target, {
  set(obj, prop, newValue) {
    obj[prop] = newValue;
  },
  get(obj, prop) {
    return obj[prop];
  },
});
proxy.name = 'John'; // 触发set
proxy.name; // 触发get
```

- 相关：集合(`Map`,`set`,`array`),正则表达式(`RegExp`),`OOP`,`prototype`,`inheritance`,`Proxy`

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> p52 - p75 24
