为什么有：简化函数写法
区别：
1. 箭头函数没有自己的`this`对象，所以它用的是定义时外层代码块的`this`。
```js
const obj = { id:2, fn:function() { console.log(this.id) } }
obj.fn()// 2
const obj = { id:2, fn:function() {(() => {console.log(this.id)})()} }
obj.fn()// 2
const obj = { id:2, fn:() => { console.log(this.id) } }
obj.fn()// undefined
```
2. 因为没有自己的`this`，所以也不能进行`new`调用
3. 没有`arguments`对象，所以需要用`rest 参数`
4. 不能使用`yield`
不适用的场合：
1. 定义对象
2. 需要动态`this`