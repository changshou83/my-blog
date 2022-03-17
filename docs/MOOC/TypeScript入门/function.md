# 函数

## 定义方法

```ts{2,6,11}
// 函数声明
function run(): string {
  return '123'
}
// 匿名函数
let run = function(): string {
  return '123'
}

// 函数传参
function getInfo(name: string, age: number): string {
  return `${name} --- ${age}`
}
```

## 可选参数 & 默认参数 & 剩余参数

:::warning
可选参数要写到后面
:::
:::warning
剩余参数要放在最后
:::

```ts{2,3,4}
function getInfo(
    name: string = 'changshou83',
    age?: number,
    ...otherInfo: string[]
  ): string {
  return age ? `${name} --- ${age}` : `${name} --- 年龄保密`
}
```

## 方法重载

- ts 中会发生方法重载：同名函数根据不同参数列表执行不同操作

:::warning
最下面的要兼容上面的，不然会报错：此重载签名与其实现签名不兼容
:::

```ts{1,2,3}
function getInfo(name:string):string;
function getInfo(age:number):number;
function getInfo(name:any, age?:any):any {
  return age ? `${name} --- ${age}` : `${name} --- 年龄保密`
}
```
