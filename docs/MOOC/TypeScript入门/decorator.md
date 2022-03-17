# 命名空间

## 定义

- 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性或参数上，可以改变类的行为。
- 通俗的讲装饰器就是一个方法，可以注入到类，方法，属性，参数来扩展类，方法，属性，参数的功能上。
- 常见的装饰器有
  - [类装饰器](#类装饰器)
  - [方法装饰器](#方法装饰器)
  - [属性装饰器](#属性装饰器)
  - [参数装饰器](#参数装饰器)
- 装饰器的写法
  - 普通装饰器(无法传参)
  - 装饰器工厂(可传参)

:::tip
装饰器的执行顺序: 如果定义了多个装饰器，那就先执行下面的
:::

## 类装饰器

- 类装饰器在类声明之前被声明(紧接着类声明)，
- 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。

### 普通装饰器

```ts{6}
function logClass(params: any){
  params.prototype.apiUrl = 'xxxx';// 硬编码
  params.prototype.run = function() { console.log('我是一个run方法') }
}

@logClass// logClass(HttpClient)
class HttpClient{
  constructor() {}
  getData() {}
}

const http:any = new HttpClient();
console.log(http.apiUrl);
```

### 装饰器工厂

```ts{7}
function logClass(params: string){
  return function(target: any) {
    target.prototype.apiUrl = params;
  }
}

@logClass('http://www.baidu.com/')// logClass(HttpClient)('http://www.baidu.com/')
class HttpClient{
  constructor() {}
  getData() {}
}
　　
const http: any = new HttpClient();
console.log(http.apiUrl);
```

### 案例

- **重载**构造函数
  - 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
  - 如果来装饰器返回一个值，它会使用提供的构造函数来替换类的声明

:::details

```ts{11}
function logClass(target:any){
  return class extends target{
    apiUrl:any = '我是修改后的数据';
    getData(){
　　  this.apiUrl = this.apiUrl + '---'
　　  console.log(this.apiUrl)
　　}
  }
}

@logClass// logClass(HttpClient)
class HttpClient{
  public apiUrl:string | undefined;
  constructor() { this.apiUrl = '我是构造函数里面的apiUrl' }
  getData() { console.log(this.apiUrl) }
}

const http:any = new HttpClient();
http.getData();
```

:::

## 属性装饰器

- 属性装饰器表达式会在运行时当作函数被调用，传入下列 2 个参数：
  1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  2. 成员的名字(属性名称)

```ts{9-10}
// 属性装饰器
function logProperty(params:any) {
  return function(target:any, attr:string) {
    target[attr] = params;
　}
}

class HttpClient{
  @logProperty('http://www.baidu.com')// logProperty('http://www.baidu.com')(HttpClient, url)
  public url:string | undefined;
  constructor() {}
    getData() {
    console.log(this.url);
  }
}

const http:any = new HttpClient();
http.getData();
```

## 方法装饰器

- 应用到方法的属性描述符上，可以用来监视，修改或替换方法定义。
- 方法装饰会在运行时传入下列 3 个参数：
  1. 对于静态参数来说是类的构造函数，对于实例成员是类的原型对象
  2. 成员的名字
  3. 成员的属性描述符(value,enumerable,configurable,writable)

```ts{14-15}
function logMethods(params: any) {
  return function (target: any, methodName: any, desc: any) {
    const oldMethod = desc.value;
    desc.value = function (...args:any[]) {
      args = args.map(value => String(value));
      oldMethod.apply(this, args);
    };
  };
}

class HttpClient {
  public url: string | undefined;
  constructor() {}
  // logMethods('http://www.baidu.com')(HttpClient, getData, Object.getOwnPropertyDescriptor(http, getData))
  @logMethods("http://www.baidu.com")
  getData(...args:any[]) {}
}
　　
const http: any = new HttpClient();
http.run();
http.getData(123, '123');
```

## 参数装饰器

- 用得少，一般类修饰器就能满足
- 参数装饰器表达时会在运行时当做函数被调用，可以使用参数装饰器为类的原型增加一些元数据，传入下列三个参数：
  1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
  2. 方法的名字
  3. 参数在函数参数列表中的索引

```ts{10-11}
function logParams(params:any) {
  return function(target:any, methodName:any, paramsIndex:any){
    target.apiUrl = params; // 在装饰器中为类添加属性
  }
}

class HttpClient {
  public url: string | undefined;
  constructor() {}
    // logParams('http://www.baidu.com')(HttpClient, getData, 0)
    getData(@logParams('http://www.baidu.com') uuid:any) {
    console.log(uuid);
  }
}

const http:any = new HttpClient();
http.getData('uuid'); // uuid
console.log(http.apiUrl); // http://www.baidu.com
```
