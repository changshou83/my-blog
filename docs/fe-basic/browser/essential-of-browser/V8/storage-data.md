- JavaScript 中的 8 种数据类型，它们可以分为两大类——原始类型和引用类型
- 原始类型的数据是存放在栈中，引用类型的数据是存放在堆中的
	- 堆中的数据是通过引用和变量关联起来的
	- 变量是没有数据类型的，值才有数据类型
- 产生闭包的核心有两步：第一步是需要预扫描内部函数；第二步是把内部函数引用的外部变量保存到堆中