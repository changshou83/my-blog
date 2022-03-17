# 第一个 TypeScript 程序

## TypeScript 安装

1. 首先安装 Node
2. 然后使用`npm install -g typescript`来安装

## 运行第一个 TypeScript 文件

1. 新建一个`index.ts`文件，并向其中写入一些 TS 代码
2. 运行`tsc index.ts`命令将 TS 文件编译为 JS 文件
3. 运行`node index.js`命令执行`index.js`文件，在控制台查看运行结果

### 示例

```ts
const square = (x: number): number => x * x;
console.log(square(2));
```

## 自动编译

1. 新建一个目录
2. 使用`tsc --init`初始化 tsc 配置文件:`tsconfig.json`
3. 将其中的`outDir`配置改为`./js`
4. `Terminal->Run Task->typescript->tsc 监视`
