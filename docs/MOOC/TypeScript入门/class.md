# 类

## es5 中的类

### 最简单的类

```js
function Person() {
  this.name = 'zs';
  this.age = 20;
}
const p = new Person();
```

### 增加方法和静态方法

```js{8-10, 13-15}
function Person() {
  this.name = 'zs';
  this.age = 20;
  this.run = function() {
    alert(this.name + "在跑步")
  }
}
Person.getInfo = function() {
  alert("调用静态方法")
}
// 原型链上的属性会被多个实例共享，构造方法里的不会
Person.prototype.sex = "男"
Person.prototype.work = function() {
  alert(this.name + "在工作")
}
const p = new Person();
　　
p.work();
Person.getInfo();
```

### es5 继承

- es5 里面的继承，使用对象冒充和原型链的组合继承模式
  - 对象冒充：super
    - 实现：在子类构造函数中调用父类构造函数：`Person.call(this)`
    - 缺点：无法继承原型链上的属性和方法
  - 原型链：extends
    - 实现：将子类的原型设为父类实例：`Object.setPrototypeOf(Child, (new Person()))`
    - 缺点：实例化子类的时候，没法给父类传参

#### 组合继承

- 组合继承既能继承原型链中的属性和方法也可以给父类传参

```js{16,18}
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.run = function() {
    alert(this.name + "在跑步")
  }
}

Person.prototype.sex = "男"
Person.prototype.work = function() {
  alert(this.name + "在工作")
}
　　
// Student类 继承Person类
function Student(name, age) {
  Person.call(this); // 对象冒充的继承模式
}
Student.prototype = new Person(); // 原型链的继承模式
　　
let s = new Student("zs", 20);
s.run(); // zs在跑步
s.work(); // zs在工作
```

## 定义类

```ts
class Person {
  name: string; // 属性 前面省略了public关键词
  constructor(n: string) {
    this.name = n;
  }
  run(): void {
    console.log(`${this.name}在跑步`);
  }
}

const p = new Person('zs');
p.run(); // zs在跑步
```

## 继承

```ts{11,13}
class Person {
  name:string;
  constructor(n:string) {
    this.name = n;
  }
  run():void {
    console.log(`${this.name}在跑步`)
  }
}

class Student extends Person {
  constructor(name:string){
    super(name);
  }
  work() {
    console.log(`${this.name}在工作`)
  }
}

const s = new Student("ls")
s.run(); // ls在跑步
s.work(); // ls在工作
```

## 修饰符

- typescript 里面定义属性的时候给我们提供了 三种修饰符
  - public :公有 在当前类里面 子类，类外面都可以访问
  - protected :保护类型 在当前类里面和子类中都可以访问，类外面不行
  - private :私有 只能在当前类里面访问，子类和类外面都不可以
- 属性不写修饰符，默认 public

## 静态方法 静态属性

- static 关键词定义静态方法

```ts{3,10-12}
class Person {
  public name:string;
  public static age:number = 20; // 静态属性
  constructor(name:string) {
    this.name = name
  }
  run():void {
    console.log(`${this.name}在跑步`)
  }
  public static getAge():string { // 静态方法,里面只能用静态属性
    return `我的年龄是${this.age}岁`
  }
}
```

## 多态

- 父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现

```ts{6-8,14-16,22-24}
class Animal {
  public name:string;
  constructor(name:string){
    this.name = name
  }
  eat() {
    return '不知道吃什么'
  }
}
class Dog extends Animal {
  constructor(name:string) {
    super(name)
  }
　eat():string {
    return `${this.name}吃骨头`
  }
}
class Cat extends Animal {
  constructor(name:string) {
    super(name)
  }
  eat():string {
    return `${this.name}吃老鼠`
  }
}
```

## 抽象类

- 它是提供其他类继承的基类，不能直接被实例化
- 用 abstract 关键字定义抽象类和抽象方法
  - 在抽象类中不包含抽象方法的具体实现，但在其派生类中必须实现
  - 抽象方法只能放在抽象类中
  - 抽象类和抽象方法用来定义**标准**

```ts{1,4,11-13}
abstract class Animal {
  public name:string;
  constructor(name:string){ this.name = name }
  abstract eat():any;
}
// const a = new Animal(); // 报错：无法创建抽象类的实例。
class Dog extends Animal {
  constructor(name:string) {
    super(name)
  }
  eat():string {
    return `${this.name}吃骨头`
  }
}
```
