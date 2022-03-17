# 接口

## 作用

- 抽离特征，定义标准

## 属性接口

```ts{1-4, 5, 8}
interface FullName{
  firstName:string; // 注意以;结尾
  secondName:string;
}
function printName(name: FullName) {
  console.log(`${name.firstName}--${name.secondName}`)
}
function printInfo(info: FullName) {
  console.log(`${info.firstName}--${info.secondName}`)
}
```

### 可选参数

- 与函数可选参数一致

```ts{3}
  interface FullName{
    firstName:string;
    secondName?:string; // 加?表示可选，不加?下面会报错
  }
  function printName(name:FullName) {
    console.log(`${name.firstName}--${name.secondName}`)
  }
  printName({
    firstName: '张'
  })
```

### 案例

- ts 封装 ajax 请求

::: details

```ts
interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

function ajax(config: Config) {
  var xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, true);
  xhr.send(config.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('成功！');
      if (config.dataType == 'json') {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  };
}

ajax({ type: 'get', url: '', dataType: 'json' });
```

:::

## 函数类型接口

- 对方法传入的参数和返回值进行批量约束

```ts
interface encrypt {
  (key: string, value: string): string;
}
var md5: encrypt = function (key: string, value: string): string {
  return key + value;
};
```

## 可索引接口

- 对数组和对象进行约束 不常用

```ts
interface UserArr {
  [index: number]: string;
}
var arr: UserArr = ['1', '2', '3'];

interface UserObj {
  [propName: string]: string;
}
var obj: UserObj = { name: '张三' };
```

## 类类型接口

- 对类进行约束 和抽象类类似 较常用

```ts{6}
interface Animal{
　　name:string;
　　eat(str:string):void;
}

class Dog implements Animal{
  name:string;
  constructor(name:string){
    this.name = name
  }
  eat(){ console.log(`${this.name}吃骨头`) }
}
```

## 接口的扩展

- 接口的继承以及接口和继承的混合使用

```ts{14}
interface Animal{
  eat():void;
}
interface Person extends Animal{
  work():void;
}
　　
class Programmer {
  public name:string;
  constructor(name:string){ this.name = name }
  coding() { console.log(`${this.name}在写代码`) }
}

class Student extends Programmer implements Person{
  constructor(name:string){
    super(name);
  }
  eat(){ return `${this.name}在吃饭` }
  work(){ return `${this.name}在工作`}
}
　　
var s = new Student("小明");
s.coding(); // 小明在写代码
```
