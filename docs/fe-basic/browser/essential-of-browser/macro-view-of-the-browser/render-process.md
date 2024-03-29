- 构建 DOM 树
	- 输入：HTML字节流
	- 过程：解析HTML字节流
	- 输出：DOM树
- 样式计算（Recalculate Style）
	- 输入：CSS样式
	- 过程
		- 把 CSS 转换为浏览器能够理解的结构
		- 转换样式表中的属性值，使其标准化
		- 计算出 DOM 树中每个节点的具体样式
	- 输出：CSSOM
- 布局阶段(计算出 DOM 树中可见元素的几何位置的过程叫做布局)
	- 通过DOM和CSSOM创建布局树
	- 布局计算
- 分层
	- 对布局树进行分(图)层，并生成分层树
	- 拥有层叠上下文属性(在z轴上叠加)的元素会被提升为单独的一层
	- 需要剪裁（clip）的地方也会被创建为图层
- 图层绘制
	- 为每个图层生成绘制列表，并将其提交到合成线程
- 栅格化（raster）操作
	- 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图
- 合成
	- 合成线程发送绘制图块命令 DrawQuad 给浏览器进程
- 显示
	- 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上

## 术语

- JS动画
	- 更新元素的几何属性触发重排=样式计算+布局+分层+绘制+分块+栅格化+合成+显示
	- 更新元素的绘制属性触发重绘=样式计算+绘制+分块+栅格化+合成+显示
- CSS动画
	- 合成=样式计算+分块+栅格化+合成+显示

## 总结

![渲染流水线总结](https://static001.geekbang.org/resource/image/97/37/975fcbf7f83cc20d216f3d68a85d0f37.png?wh=1142*745)
