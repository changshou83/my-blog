# 课程内容

## OOP

- [Mynew](./Appendix/Mynew)
- [02 两个支柱 √#JavaScript 中的原型](./two-pillars#javascript-中的原型)
- [inheritance](./Appendix/inheritance)
- Object.create(prototype, ?properties)
  - set,get
  - writable(可写),value(默认值),configurable(可更改描述符+可删除),enumerable(可枚举)
- this
  - 普通函数

:::details

```js
function() { console.log(this) }// window
const obj = { fn:function() { console.log(this) } }// obj
obj.fn.call(window)// window
const obj2 = new Object()// Object
```

:::

- 箭头函数：[arrow function](./Appendix/arrow%20function)
- class
  - 与构造函数的不同：1.不能进行函数调用(new 除外)2.有标识

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  work() {}
}
class Child extends Person {
  static cnt = 0;
  static addOne() {
    cnt += 1;
  }
  _protectedVariable = '';
  #privateVariable = '';

  constructor(name, parent) {
    super(name);
    this.parent = parent;
  }
  study() {}
  get parent() {}
  set parent(newValue) {}
}
const person = new Person('changshou');
changshou.work();
const child = new Child('changshou83', person);
child.study();
Child.addOne();
```

- 四支柱
  - 封装：包装数据和行为
  - 抽象：隐藏复杂性
  - 多态：复用方法
  - 继承：复用对象
- 好处
  - 隐藏复杂性，开闭原则
  - 保护用户
- 示例：[角色系统](./Appendix/角色系统)

## FP

- 纯函数：数据不可变性，不更改外部状态
  - 性质
    - 引用透明性：对于相同的输入返回相同的输出` `
    - 替换模型：替换函数的值不影响上下文`(1+4) = (1+double(2))`
- 柯里化：把多元函数转化为嵌套的一元函数，[currying](./Appendix/currying)
- 偏应用：为函数参数留空，[partial](./Appendix/partial)
- 组合与管道

```js
// 组合
const compose =
  (...fns) =>
  initValue =>
    fns.reverse().reduce((result, fn) => fn(result), initValue);
// 管道
const pipe =
  (...fns) =>
  initValue =>
    fns.reduce((result, fn) => fn(result), initValue);

// 四舍五入
const composeRounding = compose(Math.round, parseFloat);
const pipeRounding = pipe(parseFloat, Math.round);

composeRounding(3.5); // 4
pipeRounding(3.4); // 3
```

- 函子：一个包裹了值的普通对象或者类，他实现了 map 方法接收函数用于对值进行处理

```js
class MayBe {
  constructor(value) {
    this.value = value;
  }
  of(value) {
    return new MayBe(value);
  }
  isNothing() {
    return this.value === null || this.value === undefined;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(null) : MayBe.of(fn(this.value));
  }
}
```

- Monad 函子：实现了把值从包裹中取出的函数的函子

```js
class MayBe {
  // ...
  join() {
    return this.isNothing() ? MayBe.of(null) : this.value;
  }
  chain(fn) {
    return this.map(fn).join();
  }
}
```

## OOP VS FP

- 组合 VS 继承
- 函数(抽象行为) VS 对象(抽象数据)
- 适合处理计算 VS 适合处理模板
- 编写便于扩展，便于维护的健壮代码

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> OOP p76 - p92 17
> FP p93 - p111 19
> OOP VS FP p112 - 114 3
