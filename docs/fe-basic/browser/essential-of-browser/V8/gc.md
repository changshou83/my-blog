- 垃圾回收策略一般分为手动回收和自动回收
	- java python JavaScript等高级语言为了减轻程序员负担和出错概率采用了自动回收策略
- JavaScript的原始类型数据和引用数据是分别存储在栈和椎中的，由于栈和堆分配空间大小差异，垃圾回收方式也不一样。
- 栈和堆
	- 栈垃圾回收
		- 当函数执行结束，JS引擎通过向下移动ESP指针（记录调用栈当前执行状态的指针），来销毁该函数保存在栈中的执行上下文（变量环境、词法环境、this、outer）。
	- 堆垃圾回收
		- 一、代际假说 1、大部分对象存活时间很短 2、不被销毁的对象，会活的更久
		- 二、分类 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。
		- 三、新生代
			- 算法：Scavenge 算法
			- 原理：
				- 把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域。
				- 新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。
				- 先对对象区域中的垃圾做标记，标记完成之后，把这些存活的对象复制到空闲区域中
				- 完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。 对象晋升策略： 经过两次垃圾回收依然还存活的对象，会被移动到老生区中。
		- 四、老生代
			- 算法：标记 - 清除（Mark-Sweep）算法
			- 原理：
				- 标记：标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。 
				- 清除：将垃圾数据进行清除。 碎片： 对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存。
			- 算法：标记 - 整理（Mark-Compact）算法
			- 原理：
				- 标记：和标记 - 清除的标记过程一样，从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素标记为活动对象。
				- 整理：让所有存活的对象都向内存的一端移动
				- 清除：清理掉端边界以外的内存
			- 优化算法：增量标记（Incremental Marking）算法
			- 原理：
				- 为了降低老生代的垃圾回收而造成的卡顿 
				- V8把一个完整的垃圾回收任务拆分为很多小的任务
				- 让垃圾回收标记和 JavaScript 应用逻辑交替进行