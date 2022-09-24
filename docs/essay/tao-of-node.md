- link:[tao-of-node](https://alexkondov.com/tao-of-node/)

## 构建与编码实践：对于构建Node程序的建议

- 项目结构：以服务域为中心构建，而不是MVC来把所有逻辑都塞到controller中，相当于去中心化，用户模块集成所有用户的逻辑，权限模块集成所有权限的逻辑

```text
// 👎 Don't structure by technical responsibilities
├── src
|   ├── controllers
|   |   ├── user.js
|   |   ├── catalog.js
|   |   ├── order.js
|   ├── models
|   |   ├── user.js
|   |   ├── product.js
|   |   ├── order.js
|   ├── utils
|   |   ├── order.js
|   ├── tests
|   |   ├── user.test.js
|   |   ├── product.test.js

// 👍 Structure by domain modules
├── src
|   ├── user
|   |   ├── user-handlers.js
|   |   ├── user-service.js
|   |   ├── user-queries.js
|   |   ├── user-handlers.test.js
|   |   ├── index.js
|   ├── order
|   |   ├── order-handlers.js
|   |   ├── order-service.js
|   |   ├── order-queries.js
|   |   ├── order-handlers.test.js
|   |   ├── calculate-shipping.js
|   |   ├── calculate-shipping.test.js
|   |   ├── index.js
|   ├── catalog
|   |   ├── catalog-handlers.js
|   |   ├── product-queries.js
|   |   ├── catalog-handlers.test.js
|   |   ├── index.js
```

- 在开始一个项目时，笔者建议从模块(域)化开始，尽管微服务架构具有更强的可伸缩性，但是也会带来分布式系统的相关问题。但是注意，在模块化的过程中，要时刻带有微服务的思想，将每个模块视为一个可抽离的微服务，将来进行迁移时的成本就会降低。
- 在大型项目中注意分层实现逻辑，来达成最大程度的逻辑复用，
	- 例如http层处理请求相关的逻辑，service处理业务相关的逻辑，modal层处理数据库相关的逻辑，etc.
	- 如果一个层级的逻辑责任仍然过多，那么就需要职责分离，将单一职责分到单独的函数中。
	- 和可组合的函数类似的思想
- 用服务在模块(域)间进行通信，这样可以避免在域外对域进行修改而域不自知
- 创建域的实体来调用对应域的服务，这样可以避免暴露域的相关数据
- 分离工具函数与域的逻辑，即在域之外单独创建一个与业务无关的工具域来进行逻辑复用
- 使用joi来验证请求数据的数据结构是否符合预期
	- 一个类似的库(支持typescript)：[zod](https://github.com/colinhacks/zod)
- 可以创建一个验证中间件，通过加载对应schema对不同的数据进行验证

```js
// Create a reusable validation middleware
const validateBody = (schema) => (req, res, next) => {
  const { value, error } = Joi.compile(schema).validate(req.body)

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ')

    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage))
  }

  Object.assign(req, value)
  return next()
}

// Use it in the route definitions
app.put('/user', validate(userSchema), handlers.updateUser)
```

- 不要在中间件中处理业务逻辑，只需要调用相关域的服务即可
- 设置请求处理函数(可以利用工厂模式生成)，而不是控制器类(如果不是特别重的oop系统)

```js
export function createHandler(logger, userService) {
  return {
    updateDetails: (req, res) => {
      // User the logger and service in here
    },
  }
}
```

- 使用error对象或者扩展它，为错误添加更多细节信息
- 监听进程信号(`process.on('uncaughtException', (err) => {})`)，例如在发生未捕获的错误时log错误并退出
- 创建错误处理模块，用来收集系统日志和为错误处理兜底，例如404和500
- 在域中处理路由，为路由添加版本前缀以确保进行不可避免的破坏性更新时是无痛的：`router.prefix('/v1')`
- 代码风格的一致性：风格=样式+命名，样式可以通过eslint和prettier来保证，可以在预提交阶段通过husky和lint-staged来对提交的代码进行lint检查从而保证线上代码的样式一致性，但命名现阶段就只能靠团队风格了
- 在经过身份验证的请求上保存一些必要的信息

## 工具：与第三方库合作

- 使用极简工具
- 好好学express，因为他是node哲学的代表，大部分的框架都是在express的理念上进行扩展，所以性价比最高
	- nest：使用typescript的非node哲学框架，不过已经有很多大公司在用了
	- fastify：理念与express相同，只不过提供了许多开箱即用的工具
- 在创造抽象时，建议提取库而不是一个单独的服务，但是如果需求变化过快就不建议提取成库了，来回复制吧
- 尽量使用原生方法而不是库
- 使用结构化的logger
	- 因为log太多，有logger帮助你分析log并且在发生错误时向你报警
	- splunk，new relic
	- winston(一直有问题而且不维护了),pino(fastify默认logger)
- 为应用业务层编写文档好让其他人理解
- 尽量使用查询构造器而不是orm
	- orm具有额外的学习成本，sql都写出来了还要去查相应的api
	- 复杂查询的性能不好，并且不好测试和优化
	- 查询构造器推荐knex和mongo自带的，类orm工具推荐prisma
- 锁依赖版本
- 使用typescript
- 使用snyk来报告你的所使用的第三方包中的关键或严重漏洞
- 容器化应用
- 不要考虑更换数据库，除非它会让你的速度增长5-10倍
- 封装你的配置(数据库账号密码，秘钥等)到单独的文件内

## 测试

- 如果只有有限的测试资源，建议优先进行集成测试
- mocking & 依赖注入
- 对业务逻辑执行单元测试，而不是第三方库的封装
- 测试覆盖率99%和100%是两种概念，即使环境不允许你测试所有内容，那也至少为你要添加的新功能添加测试
- 三A模式(arrange-act-assert)(我叫他为三步走模式)：准备环境->执行要测试的逻辑->对执行结果进行断言

## 性能

- 正确使用Node，将会提供惊人的性能，即将Node用于IO密集型任务，当遇到计算密集型任务时，应该想办法将它移出到其他地方解决，如果性能很重要，并且你也不得不使用node执行计算密集型任务时，最好重新考虑是否要使用node
- 代码的算法复杂度常常都不是应用运行的性能瓶颈，当遇到性能问题时，更应该先关注与外部服务的通信，例如对数据库进行查询时在多大程度上利用了数据库的设计，或者是网络优化问题(提升http版本，善用缓存(redis缓存，http缓存)，减少不必要的请求，最大利用http协议的特性，例如多路复用和长链接)
- 好的设计带来好的性能，性能优化只能亡羊补牢
