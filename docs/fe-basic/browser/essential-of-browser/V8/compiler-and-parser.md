- 编译器和解释器的区别
	- 编译型语言在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了
	- 由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行
- V8 是如何执行一段 JavaScript 代码
	- 生成抽象语法树（AST）和执行上下文
		- 第一阶段是分词（tokenize），又称为词法分析
		- 第二阶段是解析（parse），又称为语法分析
	- 生成字节码(不直接转换为机器码是因为内存占用问题)
		- 根据 AST 生成字节码，并解释执行字节码
		- 字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行
	- 执行代码
		- 解释器执行代码，当一段代码被多次解释则被标记为热点代码，由编译器介入编译为机器码并保存起来，以提高执行速度
		- 字节码配合解释器和编译器被称为JIT 技术