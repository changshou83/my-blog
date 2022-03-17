# 课程内容

## 为什么需要模块

随着前端技术的发展，前端的代码量逐渐增多，为了避免代码混乱以及避免污染全局环境(全局变量会一直存在)，所以需要对工程文件进行模块化管理，而且模块化还可以提高模块的可复用性，减少代码体积。

## 规范及其实现(模块加载器)

- CommonJS - Node,Browerify(Node 也在往 ES Module 改)
- AMD - RequireJs,Webpack,Babel(事先声明，开发体验更好)
- UMD = CommonJS + AMD
- CMD - SeaJs(为了性能牺牲开发体验，实际现在加载模块时间不长，没必要)
- ES Module(官方规范，现在用的最多)

```js
// IIFE
(function() {})()

// CommonJS
const module1 = require('module1')
module.exports = { fight: function() {} }

// RequireJs
// index.html.script
require(['jquery','module1'],// 依赖前置
		function($) { console.log('module1 loaded') })
// module1.js
define(function() {console.log('module1 loading')})
// 外部模块
require.config({path: {'jquery': ['path1', 'path2']}})

// SeaJs
seajs.use(['module1.js'], function() {})
// module1.js
define(function(require, exports, module) {
  const $ = require('jquery.js')// 就近依赖
})

// ES Module
import { variable } from 'path'
export variable
```

## 打包与自动化构建

早期网速慢及浏览器性能问题，加载太多模块会卡，所以出现了打包工具将模块打包成一个文件进行加载。随着行业发展，打包工具可以添加插件来整合前端生态。本节讲解常用打包工具。

### 打包与自动化构建

### 一句话概括

**打包**：在项目上线前进行一些资源整合类的**预处理工作**，减少 HTTP 请求数。

**自动化构建**：将开发代码转化为生产代码的过程流程化，标准化以及自动化，提高开发效率。(浏览器是不会懂那些用框架写出来的开发代码的)

### 解决了什么问题

1. 各种兼容(es6+，浏览器)
2. 跨框架开发(Vue, React)
3. 文件压缩混淆，编译(TS)，图片压缩等
4. 部署(静态文件路径，hash 等)

### 工具

#### gulp

基于流的**自动化构建工具**，除了管理和执行任务，还支持监听读写文件。

```js
// gulpfile.js
const { src, dest } = require('gulp');

exports.default = function() {
  return src.('src/*.js').pipe(babel()).pipe(dest('output/'))
}
```

运行 gulp 任务：

```bash
gulp
```

#### rollup

专注于 ES6 模块化，可将一小段代码编译成更大或更复杂的内容。
好处:

- API 设计简单易使用
- tree-shaking:静态分析代码中的 import 并排除未使用的工具
  缺点:不支持 async/await
  安装及使用：

```bash
npm install rollup --save-dev
rollup src/index.js -o bundle.js -f cjs

rollup --config rollup.config.dev.js
rollup -c rollup.config.prod.js
```

配置：

```js
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
};
```

#### esbuild

一个「Go」写的「JavaScript」打包和压缩工具，所以速度极快。
好处：

1. 速度快
2. 支持 es6 和 cjs
3. tree-shaking
4. 兼容 ts 和 jsx
5. 支持插件和 sourcemap

缺点：不知道
安装及使用：

```bash
npm install esbuild --save-dev
esbuild app.jsx --bundle --outfile=out.js
```

配置:

```js
require('esbuild')
  .build({
    entryPoint: ['app.jsx'],
    bundle: true,
    outfile: 'out.js',
  })
  .catch(() => process.exit(1));
```

值得一提的是 snowpack 和 vite 在底层也是使用了 esbuild 进行 js、ts 文件的转化。

#### webpack

一切皆模块，支持模块打包及丰富的插件扩展功能
核心概念：

1. entry：从那个文件开始构建内部依赖图
2. output：输出文件
3. loader：支持 wepback 处理其它语言
4. plugin：允许开发者通过使用插件在编译期的各个生命周期安装钩子，执行，打包优化和资源管理等工作
5. mode：支持在开发和生产环境下的不同配置

优点：开箱即用，功能丰富，社区支持
缺点：新手难上手
安装&使用：

```bash
npm install webpack webpack-cli --save-dev
webpack
```

配置：

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

#### vite

受 snowpack 启发的高性能【nobundle】构建工具，官网称“下一代前端开发工具”
安装及使用：

```bash
yarn create vite@latest projectname --template templatename
yarn create vite@latest my-app --template vue
```

配置:

```js
// vite.config,js
import { defineConfig } from 'vite'

export default defineConfig({
  ...
})
```

#### 总结

gulp - 自动化构建工具
打包工具
webpack(大而全)
-> rollup/esbuild(es module，go)
-> snowpack(nobundler)
-> vite(snowpack 的思想，esbuild 预构建依赖，rollup 打包)

# Links

> [b 站视频](https://www.bilibili.com/video/BV16q4y1o7EG)
> p125 - p131 7
