- Mark-Sweep
	- 过程：清理时，先从根对象进行BFS遍历存活对象，之后清理未被标记的对象
	- 问题：因为堆中内存不连续，导致清除后空间分配不合理，在分配大对象时可能会触发不必要的GC
- Mark-Compact
	- 过程：第一步跟MS一样，第二步会将活着的对象复制到一端，然后清除边界外的内存
- 总策略：主要使用MS，分配大对象时若空间不够用MC