# 课程内容

## JS 需要异步

因为 JS 是单线程的，所以在遇到耗时任务时不能像多线程那样分出一个子线程去执行，因此为了模拟多线程的操作，将耗时任务延后执行来提升运行效率。

## 事件循环(Event Loop)

> JavaScript 有一个基于**事件循环**的并发模型，事件循环负责执行代码、收集和处理事件以及执行消息队列中的子任务。

### 可视化描述

![可视化描述](https://mdn.mozillademos.org/files/17124/The_Javascript_Runtime_Environment_Example.svg)
先执行栈中的，在执行消息队列中的

### 为什么被称为事件循环

```js
while (queue.waitForMessage()) queue.processNextMessage(); // 一有消息就执行
```

## 微任务队列(Job Queue)

Promise 是 JS 的一部分，setTimeout 是 Web API，那么在任务队列里怎么区分两者？
答案是将前者放入一个特殊的优先级更高的任务队列，该队列称为 Job queue。
执行一个 Web API 任务前检查 Job queue 是否为空，如果不为空就将队列中的任务清空再执行 Web API 任务

```js
// ==> Callback Queue
setTimeout(()=>{console.log('1','is the loneliest number')}, 0)
setTimeout(()=>{console.log('2','can be as bad as one')}, 10)

// ==> Job Queue
Promise.resolve('hi').then(data => console.log('2', data))

// ==> Stack
console.log('3', 'is a crowd')

// result
3 is a crowd
2 hi
1 is the loneliest number
2 can be as bad as one
```

## 异步编程

### Web API

```js
setTimeout(function () {}, 0); // 在 0ms 之后将函数送入消息队列
setInterval(function () {}, 0);
```

### Promises

- 用于表示一个异步操作的最终完成及其结果值
- 为什么使用 Promises？因为可以将 CB Hell 变为链式调用，代码可维护性更强
  - 背后的思想：将异步操作视为任务来模拟操作系统的任务调度操作
- 思想扩展：是否有其它思想？除了 Promise 还有以事件驱动的异步模型`EventProxy`,将嵌套关系拉平

```js
// 链式调用思想
// Promise使用
new Promise((resolve, reject) => resolve(fetchData()))
  .then(data => console.log)
  .catch(e => console.log);
Promise.all(
  urls.map(url => {
    return fetch(url).then(res => res.json());
  })
).then(results => console.log);
// 真正意义上的all，Promise.all === allResolve
Promise.allSettled([promise1, promise2]).then(console.log);
// 声明式编程体验
// EventProxy示意
A(function () {
  B(function () {
    C();
  });
});
// ===> EventProxy
const proxy = EventProxy();
proxy.assgin('A', function () {
  B(function () {
    proxy.trigger('B');
  });
});
proxy.assign('B', function () {
  C();
});
// start
A(function () {
  proxy.trigger('A');
});
```

[MyPromise](./Appendix/MyPromise)的实现与将 Callback 转化为 Promise 的[Promiseify](./Appendix/Promiseify)函数

思想扩展：`异步 !== 回调`(写法上不一样，思想是一样的)，比如`async function`

### Async/Await

此语法的的目的是继续在 Promise 的基础上优化异步编程体验，达到与同步编程同级别的体验。

其中`async function`声明一个异步函数，`await`等待一个 Promise 对象的处理结果，在等待期间暂停函数直至有返回值(类似生成器里的 yield)，如果等待的不是 Promise 对象则直接返回值本身。

扩展：`for await...of`创建一个可遍历异步可迭代对象的循环

```js
async function playerStart() {
  const result=await movePlayer(100, 'left')// 返回Promise的处理结果
  await movePlayer(400, 'left')
  // ...
}
const handler = url => fetch(url).then(res => rs.j)

async function(urls) {
  const promises = urls.map(url => {
    return fetch(url).then(res => res.json())
  })
  const results = await Promise.all(promises)
}
```

## 并行

```js
const promiseify = (data, delay) =>
  new Promise(resolve => setTimeout(() => console.log(data), delay));

const a = () => promiseify('a', 100);
const b = () => promiseify('b', 500);
const c = () => promiseify('c', 1000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);

  return `parallel done: ${output1} ${output2} ${output3}`;
}

async function race() {
  const promises = [a().b(), c()];
  const output = await Promise.race(promises);

  return `race done: ${output}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();

  return `sequence done: ${output1} ${output2} ${output3}`;
}

parallel().then(console.log);
race().then(console.log);
sequence().then(console.log);
```

## 并发

### Web Worker

```js
const worker = new Worker('worker.js');
worker.postMessage('hello');
```

### child_processes

```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', data => console.log(`stdout: ${data}`));

ls.stderr.on('data', data => console.error(`stderr: ${data}`));

ls.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
```

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> p115 - p124 10
> [异步梳理笔记](https://www.yuque.com/changshou/fvzohd/eb9xyf)
