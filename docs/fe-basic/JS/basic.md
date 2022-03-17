# Basic

## How JavaScript Work

### JS Engine

- Engine：`JavaScript Code`->`Engine`->`Machine Code`

  - detail：`JS Code`->`Parser`->`AST`->`Interpreter`-
    ->`ByteCode`->`Machine Code`
    ->`Profiler`->`Compiler`->`Optimized Code`->`Machine Code`

- `Interpreter`/`Complier`/`Just In Time Compiler`：将 AST 翻译成`MC`
  - `JS Engine`选择两者都要，既要`Interpreter`的启动速度，又要`Compiler`的后续优化(可优化的部分由`Profiler`负责监控)

### JS Runtime Environment

- `Runtime Environment`：程序运行的时间切片,包含执行上下文

![示意图|400](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/3/16943fd819a25a8a~tplv-t2oaga2asx-watermark.awebp)

- `Memory Heap`：随机分配内存，空间大，查找慢
  - [V8 的堆构成](./Appendix/GC/V8的堆构成)
- `Callback Stack`：固定分配内存，空间小，查找快
- `Stack Overflow`，`Memory Leak`：内存大小超过限制导致数据丢失
- `NodeJs`：A JavaScript Runtime built on V8 Engine
  ![Node示意图|400](https://i.stack.imgur.com/QRePV.jpg)

### Garbage Collection

- Why?帮助程序员管理内存，减少可能的错误
- What?对不用的内存进行释放
- How?1.找到不用的内存 2.进行释放
- 坏处？性能下降，因为为了防止数据竞争导致程序出错，所以在进行 GC 时，JS 线程是暂停的
- 机制：分代式垃圾回收机制
  - 新生代：[Scavenge 算法](./Appendix/GC/Scavenge算法)
  - 老生代：[Mark-Sweep&Mark-Compact 算法](./Appendix/GC/Mark-Sweep与Mark-Compact算法.md)

### Single Thread Model

- 一次只运行一件任务(只有一个调用栈)
- 问题：同步执行 JS 不能执行太重的任务，不然会导致浏览器卡顿
- 解决：使用异步编程提高效率，提升 JS 的可用性

### Context,Lexical Environment,Hoisting

- `Execution Context`：程序运行状态信息的引用
- `Lexcial Envirnoment`：环境记录+对外部词法环境的引用
  - `this`+`arguments`+`Variable Envirnoment`
- `Hositing`：在词法环境中声明被先登记

### Function Invocation

- `function fn() {}`
- `const fn = function() [}`
- `const fn = () => {}`

### Scope, Scope Chain

- `Scope`:标注变量的可视范围
  - `Function Scope`:`function() { let a = 'a' }`
  - `Block Scope`:`{ let a = 'a' }`
- `Scope Chain`:由`Scope`及其间的引用相连构成

## Types

- `Primitive Value`:number,string,boolean,undefined,null,bigint,symbol
  - 分配在栈上，大小固定
- `Reference Type`:Object,Array,Function
  - 分配在堆上，大小随机

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> foundation p2 - p43 42
> types p44 - p51 8
