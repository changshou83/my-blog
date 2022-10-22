- 最简单的方式是使用一个字典来保存属性和值，但是由于字典是非线性结构，所以如果使用字典，读取效率会大大降低
- 分析下V8 采用了哪些策略提升了对象属性的访问速度
- 常规属性 (properties) 和排序属性 (element)
	- 把对象中的数字属性称为排序属性，在 V8 中被称为 elements
		- element 属性指向了 elements 对象，在 elements 对象中，会按照顺序存放排序属性
	- 字符串属性就被称为常规属性，在 V8 中被称为 properties
		- properties 属性则指向了 properties 对象，在 properties 对象中，会按照创建时的顺序保存常规属性
- 快属性和慢属性
	- 将保存在线性数据结构中的属性称之为“快属性”
	- 如果一个对象的属性过多时，V8 就会采取另外一种存储策略，那就是“慢属性”策略。
		- 慢属性的对象内部会有独立的非线性数据结构 (词典) 作为属性存储容器
		- 所有的属性元信息不再是线性存储的，而是直接保存在属性字典中
		- 如果对象中的属性过多时，或者存在反复添加或者删除属性的操作，那么 V8 就会将线性的存储模式降级为非线性的字典存储模式，以提升修改速度
- V8 还实现了内置内属性的策略，当常规属性少于一定数量时，V8 就会将这些常规属性直接写进对象中