# effect栈
## 嵌套effect
组件的更新是effect的，那么组件的嵌套就是effect的嵌套
### 问题
```js
effect(() => {
  console.log('effect1 run')
  effect(() => {
	console.log('effect2 run')
    temp2 = obj.bar
  })
  temp1 = obj.foo
})
setTimeout(()=> {
  obj.foo = 'hello vue3'// effect2 run
}, 1000)
```

### 原因
- 在第十行获取obj.foo是触发get，但是此时activeEffect已经被effect2覆盖，所以foo的副作用函数是effect2而不是effect1
### 解决
- 加一个栈用来存储activeEffect的信息
```js
let activeEffect;
const effectStack = []
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
	activeEffect = effectFn
	  
	effectStack.push(effectFn)
	  
	fn();// 这里发生了内层effect的添加与删除，递归思想
	
	effectStack.pop()
	activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}
```