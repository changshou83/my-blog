- 为了提升对象的属性访问速度而引入了隐藏类
- V8 对每个对象做如下两点假设：
	- 对象创建好了之后就不会添加新的属性
	- 对象创建好了之后也不会删除属性
- V8 会为每个对象创建一个隐藏类，对象的隐藏类中记录了该对象一些基础的布局信息，包括以下两点：
	- 对象中所包含的所有的属性
	- 每个属性相对于对象的偏移量
- 当满足以下两个条件就会复用隐藏类
	- 相同的属性名称
	- 相等的属性个数
- 最佳实践
	- 使用字面量初始化对象时，要保证属性的顺序是一致的(共享隐藏类)
	- 尽量使用字面量一次性初始化完整对象属性(避免重新生成新的隐藏类)
	- 尽量避免使用 delete 方法(避免重新生成新的隐藏类)
		- 我测试没变，，，