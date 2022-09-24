- link：[一些JS测试的最佳实践](https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme-zh-CN.md)

## 0：黄金法则

- 测试代码要简单，干练。

## 1：剖析

- 测试名称=测试对象+场景/条件+期望结果
	- 例子：`describe('UserService', () => { describe('Register new user', () => { it('when input valid params, it should register successfully', () => { ... }) }) })`
- 测试内容=布置(准备上下文)+执行(执行测试单元)+断言(结果是否符合预期)
- 注意事项
	- 语言要使用相关领域的术语
	- 坚持黑盒测试，即只测功能，不测实现
	- 避免总用 stub 和 spy，因为他们会和实现耦合，一定要用的时候(一般是模拟某些场景)要注意测试需求，而不是实现
	- 测试使用的数据最好是mock随机生成的，或者使用基于属性的测试来测试输入的多种组合(例如：[fast-check](https://github.com/dubzzz/fast-check#readme))
	- 关于快照测试：如果需要，仅使用短的行内快照，这是基于黄金法则的选择
	- 要保证每个测试的数据源中数据的不可变性，避免因为互相污染而导致测试失败。为了减轻复杂度，我们可以在每个测试中只初始化自己需要的数据。除非性能问题真的非常显著，那么可以做一定的妥协——仅在全局放不会改变的数据（比如 query）
	- 在测试错误时，不要 catch 错误，expect 它们
	- 给测试用例打标签(这个我倒是不是很理解，标签一般是用来快速检索的，这是要快速检索用例？)
- TDD
	- red-green-refactor风格：先编写一个失败的测试，然后写一个最简实现满足这个测试，然后将其重构之生产水平
	- 在遇到bug时，在修复前编写一个测试来检测它，避免在未来再次发生

## 2：后端测试

- 组件化测试：一些比单测大，但是比端到端测试小的测试。
	- 组件测试关注于微服务“单元”
	- 他们反对 API，不 mock 任何属于微服务本身的东西（比如：真实的 DB）但是 stub 所有外部的东西比如调用其他微服务
- 

## 3：前端测试

- 将UI与功能分离：不要断言渲染出来的标签，而是要断言相应的数据(通过一些对渲染结果的处理获取)，因为可能会有动画来拖慢测试的速度
	- 正例
		- `const allRenderedUsers = getAllByTestId('user').map(uiElement => uiElement.textContent);`
		- `const allRealVIPUsers = allUsers.filter((user) => user.vip).map((user) => user.name);`
		- `expect(allRenderedUsers).toEqual(allRealVIPUsers);`
	- 反例：`expect(getAllByTestId('user')).toEqual('[<li data-test-id="user">John Doe</li>]');`
- 使用专用的attrbiute 查询元素进行测试，例如：`data-test=''`
- 尽量使用真实组件进行测试，如果有一个子组件明显拖慢速度，考虑使用伪组件(shallowMount)替换。
- 对于胖的父组件编写少量测试，对于子组件编写更多测试。
- 使用框架内置的对异步事件的支持
- 单测的时候使用某些库来mock 后端api
- 在进行e2e请求真正的后端api时通过复用登录凭证进行提速

## 5：CI以及其他质量度量手段

- 丰富你的 linter 并丢弃有 lint 问题的构建
	- 基础rule： [ESLint standard](https://www.npmjs.com/package/eslint-plugin-standard) 或 [Airbnb style](https://www.npmjs.com/package/eslint-config-airbnb)
	- 发现用例没有写断言：[eslint-plugin-chai-expect](https://www.npmjs.com/package/eslint-plugin-chai-expect)
	- 发现 promise 没有 resolve：[eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise?activeTab=readme)
	- 发现可能被 DOS 攻击的正则表达式：[eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security?activeTab=readme)
	- 。。。
- 