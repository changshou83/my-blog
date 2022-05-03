## 数组的函数式操作

```js
Array.prototype.map = function (projectionFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    results.push(projectionFunction(itemInArray));
  });

  return results;
};
Array.prototype.filter = function (predicateFunction) {
  var results = [];
  this.forEach(function (itemInArray) {
    if (predicateFunction(itemInArray)) results.push(itemInArray);
  });

  return results;
};
Array.prototype.reduce = function (combiner, initialValue) {
  // 如果数组是空，直接返回
  if (this.length === 0) return this;

  let accumulatedValue = initialValue,
    count = 0;
  if (arguments.length === 1) {
    count = 1;
    accumulatedValue = this[0];
  } else if (arguments.length < 1) {
    throw 'Invalid arguments';
  }

  for (; count < this.length; count++) {
    accumulatedValue = combiner(accumulatedValue, this[count], count);
  }

  return accumulatedValue;
};

// 解决嵌套数组
Array.prototype.concatAll = function () {
  return this.reduce((acc, subArray) => acc.concat(subArray));
};

// JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]"
// [1,2,3].concatAll(); // throws an error because this is a one-dimensional array

// 处理 map 和 concatAll 连用
Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
  return this.map(item => projectionFunctionThatReturnsArray(item)).concatAll();
};

// 合并数组
Array.zip = function (left, right, combinerFunction) {
  const results = [];

  for (
    let counter = 0;
    counter < Math.min(left.length, right.length);
    counter++
  ) {
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};

// JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]'
```

1. forEach 遍历数组
2. map 投影数组 = new Array + forEach
3. filter 过滤数组 = forEach + if
4. (map + concatAll)/concatMap 查询树
5. reduce 缩减数组 = filter + map
6. zip 合并数组
7. 重要的是这些方法的组合使用
   1. 强大的查询能力：**你不仅仅能够从树中查询出数组，你也可以从数组当中查询出树**

## 以下是 RxJS 的相关部分

### 使用 Observable

- Observable：与 Event 类似
  - 和 Event 一样， **Observable 是一个由数据产生者*推送*给数据消费者的值的序列**
  - 和 Event 不同， **Observable 可以通知监听者，它已经完成**，并且不再发送任何数据
- 订阅一个事件
  - 订阅一个事件和遍历一个数组，本质上是相同的操作。
  - 唯一的区别在于， **数组遍历是同步的，而且一定会结束，而事件的遍历是异步的，同时永远不会结束**
  - 如果我们把按钮点击事件转换为一个 Observable 对象，我们就可以使用 forEach() 来遍历这个事件
- take 结束序列
  - 基于事件的 Observable  永远不会自己结束。 take() 方法会创建一个新的序列，此序列在固定数量的元素到达之后，就会结束
  - 当一个 Observable 序列结束时，它会自动取消所有的监听者的订阅。
  - take() 对于监听固定次数的事件然后取消订阅来说，是一个非常好用的方法
- takeUntil 结束序列
  - takeUntil() 方法可以用于 可以在另一个 Event 触发的时候，结束掉一个序列
- 小结
  - 使用 forEach() 遍历 Observables。
  - 使用 fromEvent() 把 Events 转换成永不结束的 Observables。
  - 在 Observable 上使用 take() 和 takeUntil() 创建一个  **会结束**  的序列。

```js
function(button) {
	const handler = function(ev) {
		// 取消订阅
		button.removeEventListener("click", handler);
		alert("Button was clicked. Unsubscribing from event.");
	};
	button.addEventListener("click", handler);
}
function(button) {
	const buttonClicks = Observable.fromEvent(button, "click");

	// 返回一个订阅对象，调用dispose方法销毁订阅对象相当于从异步for循环中 break 出去
	const subscription = buttonClicks.forEach(clickEvent => {
		alert("Button was clicked. Stopping Traversal.");
		subscription.dispose();
	});
}
// 与上面的效果相同
function(button) {
	const buttonClicks = Observable.fromEvent(button, "click");

	buttonClicks.take(1).forEach(function(clickEvent) {
		alert("Button was clicked once. Stopping Traversal.");
	});
}

function(button) {
	const buttonClicks = Observable.fromEvent(button, "click");

	const newButtonClicks = buttonClicks.map(clickEvent => {
		alert("Button was clicked. Stopping Traversal.");
	}).takeUntil(buttonClicks);
}
```

### 查询 Observable

- 异步数据源
  - 事件
    - 事件看成是存储在一个对象(事件对象)里的一系列 事件处理器 的 **列表**
    - 如果事件是一个序列，那么它将是一个永远不会自己结束的包含 0 到无限个事件对象的序列
    - Observables 让我们可以不必操心对于 Event 的订阅
    - 使用 fromEvent() 把 Events 转换成永不结束的 Observables
  - HTTP 请求
    - Observables 也可以让我们
      - 不再需要对并行任务状态进行追踪
      - 像对同步程序进行错误处理那样，在异步程序中 使用相同的错误传导语义
    - 如果回调 API 是一个序列，那么他将是一个返回一个发送完单个元素就自己结束的序列
    - **Observable.create() 是一个可以把任意异步 API 转换成 Observable 的工具**
- web 应用的工作流程：用户操作触发事件，然后发送 HTTP 请求，最后导致状态变化
- 一些工具函数
  - throttleTime(ms)：用于节流
  - distinctUntilChanged()：用于过滤掉连续而且重复的输入值

```js
// 事件例子：鼠标拖动
// sprite, spriteContainer 是两个定义好的 DOM 元素
function(sprite, spriteContainer) {
	// All of the mouse event sequences look like this:
	// seq([ {pageX: 22, pageY: 3423, layerX: 14, layerY: 22} ,,, ])
	const spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
		// Create a sequence that looks like this:
		// seq([ {pageX: 22, pageY:4080 },,,{pageX: 24, pageY: 4082},,, ])
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.
				concatMap(function(contactPoint) {
					// ...retrieve all the mouse move events on the sprite container...
					return spriteContainerMouseMoves.
						// ...until a mouse up event occurs.
						takeUntil(spriteContainerMouseUps).
						map(function(movePoint) {
							return {
								pageX: movePoint.pageX - contactPoint.layerX,
								pageY: movePoint.pageY - contactPoint.layerY
							};
						});
				});

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
// Observer.create() 示例
const handler = {
	next: data => JSON.stringify(data),
	error: err => throw new Error(err),
	complete: () => console.log("The asynchronous operation has completed.")
}
const subscription = Observable.create(handler => {
	let subscribed = true;

	// 执行异步操作，调用handler中的处理函数

	return () => subscribed = false// 定义订阅对象的 dispose() 方法
}).subscribe(handler)
// HTTP 请求示例
var getJSON = function(url) {
	return Observable.create(function(observer) {
		let subscribed = true;

		$.getJSON(url,{
			success: data => { if (subscribed) { observer.next(data); observer.complete(); } },
			error: ex => { if (subscribed) { observer.error(ex); }
		})

		return () => subscribed = false
	});
};
```
