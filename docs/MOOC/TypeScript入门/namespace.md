# 命名空间(内部模块)

## 定义

- 命名空间：在代码量较大的情况下，为了避免各种变量命名冲突，可将相似功能的函数，类，接口等放置到命名空间内。
  - TypeScript 的命名空间可以将代码包裹起来，只对暴露需要在外部访问的对象。
  - 命名空间内的对象通过 export 暴露，通过 namespace 关键字声明命名空间
- 命名空间和模块的区别：
  - 命名空间：内部模块，主要用于组织代码，避免命名冲突。
  - 模块：外部模块，侧重代码的复用，一个模块里可能会有多个命名空间。

## 代码示例

```ts{1,7,12,22,28,33}
namespace A{
  interface Animal{
    name:string;
    eat(str:string):void;
  }
　　
  export class Dog implements Animal{
    name:string;
    constructor(name:string){ this.name = name }
    eat(){ console.log(`${this.name}吃骨头`) }
  }
  export class Cat implements Animal{
    name:string;
    constructor(name:string){ this.name = name }
    eat(){ console.log(`${this.name}吃老鼠`) }
  }
}
　　
const d = new A.Dog('狗');
d.eat(); // 狗吃骨头

namespace B{
  interface Animal{
    name:string;
    eat(str:string):void;
  }
　　
  export class Dog implements Animal{
    name:string;
    constructor(name:string){ this.name = name}
    eat(){ console.log(`${this.name}吃骨头`) }
  }
  export class Cat implements Animal{
    name:string;
    constructor(name:string){ this.name = name }
    eat(){ console.log(`${this.name}吃老鼠`) }
  }
}
　　
const c = new B.Cat('狸花猫');
c.eat(); // 狸花猫吃老鼠
```
