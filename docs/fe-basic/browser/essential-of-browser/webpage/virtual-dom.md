- DOM的缺陷
	- 对于单页应用来说，DOM结构非常复杂，所生成的页面结构也会很复杂，对于这些复杂的页面执行一次重排或者重绘操作都是非常耗时的，所以VDOM是为了避免频繁的DOM操作的
	- 但是如果VDOM做Diff的时间超过了浏览器重新渲染的时间(例如替换整个页面)，那么就没有太大的优势，所以VDOM是为了给框架性能兜底的
- 什么是VDOM
	- 要解决什么事情
		- 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上
		- 而操作虚拟 DOM 的代价与操作DOM相比就非常轻了
		- 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上
	- 双缓存
		- 在处理图像的过程中，由于图形操作都很复杂且需要大量的运算，因此一副完整的画面可能需要多次计算才能完成，如果不采用双缓存，那么用户可能会感觉到画面的闪烁，而采用双缓存，就可以将中间结果放在中间结果缓冲区，等到计算完成后，将结果复制到显示缓冲区，供显示器读取显示
		- VDOM就相当于Buffer，等收集到完整的变化，再把结果应用到DOM上