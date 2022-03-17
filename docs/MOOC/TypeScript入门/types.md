# 数据类型

1. 数字类型

```ts
let num1: number = 1;
```

2. 字符串类型

```ts
let str1: string = 'hello';
```

3. 布尔值类型

```ts
let flag: boolean = true;
```

4. 数组类型

```ts
let arr1: number[] = [1, 2, 3];
let arr2: Array = [4, 5, 6];
let arr3: any[] = ['hello', 123, false];
```

5. 元组类型：受限制的数组子类型

```ts
let str2: [string, number, boolean] = ['know', 3.18, false];
```

6. 枚举类型

```ts
enum Flag {
  success = 1,
  error = 2,
}
console.log('Flag.success:' + Flag.success);

enum test_status {
  success,
  error,
  waiting = 5,
  nothing,
  test1 = 'test1',
  test2 = '如果前面是字符串类型，后面不规定类型会报错：枚举成员必须具有初始化表达式。',
}
console.log(`默认的数值:${test_status.success},${test_status.error}`);
console.log(`规定指定值后(前一个为5)，后面的值${test_status.nothing}`);
console.log(`定义为字符串类型时:${test_status.test1},${test_status.test2}`);
```

7. any:兜底类型，相当于没用 TS，不建议使用

```ts
let Box: any = document.getElementById('box');
Box.style.color = 'red';
```

8. null 和 undefined:前者缺少值(计算出现错误)，后者缺少赋值

```ts
let num2: undefined;
console.log(num2); // undefined

let num3: null;
num3 = 123; // 空类型只能为空，赋值会报错

let num4: number | undefined | null;
```

9. void 类型:方法没有返回值时就定义为这种类型

```ts
(function fn(): void {
  console.log('run');
})(); // 'run'
```

10. never:其他类型的子类型,代表从不会出现的值,例如函数没有返回值

```ts
function fn(): never {
  throw new Error('Oops!');
}
```

11. unknown：与 any 一样表示任意类型，但是会告知检查器再细分。如果你无法预知一个值的类型，使用 unknown 而不是 any。

```ts
// unknown不会被任意值推导出来，必须显示声明
let ha: unknown;
// 在使用时要先证明unknown是某个类型
let a: unknown = 2;
if (typeof a === 'number') let b = a * 2;
```

12. unknown 是所有类型的父类型，never 是所有类型的子类型，即 never 可以赋给任意类型，而 unknown 则反之
