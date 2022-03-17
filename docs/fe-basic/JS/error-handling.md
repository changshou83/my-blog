# 课程内容

- 错误处理是一项必要的功能
- JS 通过错误对象来捕捉错误,通过`throw`语句抛出错误
  - throw 语句
    1. 暂停函数执行
    2. 将错误对象抛入错误栈
    3. 将执行传递到调用堆栈中的第一个`catch`块，如果没有，则终止程序执行
    - 错误对象
    - `new Error()`
    - `new TypeError()`
    - `new ReferenceError()`
    - ...
- JS 的错误处理
  - 在同步情况下通过`try..catch..`来捕捉并处理错误对象
  - 在异步情况下，使用`Promise.catch()`和`async+try`进行错误处理
    - 因为异步函数执行时，try 语句的执行环境已经被释放，从而不能正常的进行错误处理
- 通过继承`Error基类`来扩展自己的错误对象

```js
const myError = new Error('oops');
myError.name; // Error
myError.message; // oops
myError.stack; // 堆栈信息

// 同步错误处理
try {
  throw new Error('fail');
} catch (e) {
  console.log(e);
}
// 异步错误处理
Promise.reject('fail')
  .catch(e => {
    console.log('mid: ', e);
  }) // mid: fail
  .catch(e => {
    console.log('fin: ', e);
  }); // 不会执行
Promise.resolve('asyncfail')
  .then(response => {
    Promise.reject('#3 fail').catch(console.log); // #3 fail
  })
  .catch(e => conso.log('final: ', e))(
  // 不会执行
  async function () {
    try {
      await Promise.resolve('oops #1');
      await Promise.reject('oops #2');
    } catch (e) {
      console.log(e);
    } // oops #2

    console.log('is this still good?'); // 会打印
  }
)();
// 扩展错误对象
class customError extends Error {
  constructor(message) {
    super(message);
    this.name = 'customError';
  }
}

const a = new customError('oops');
a.name; // customError
a.message; // oops
```

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> p132 - p138 7
