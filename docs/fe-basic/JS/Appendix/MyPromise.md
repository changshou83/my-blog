- 一个Promise必然处于三个状态中的一个,且如果从pending状态变化后，变化不可逆
- then方法返回一个Promise对象
- Promise解决流程(还没具体了解)
```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isThenable = data => data && data.then && typeof data.then === 'function'
const isPromise = object => isThenable(object) && ('catch' in object) && typeof object.catch === 'function'

// 状态转换
const statusProvider = (promise, status) => data => {
  if(promise.status !== PENDING) return false
  promise.status = status
  promise.result = data
  promise.listeners[status].forEach(fn => fn(data))
}

class MyPromise {
  constructor(exec) {
    this.status = PENDING
	this.listeners = {
	  FULFILLED: [],
	  REJECTED: []
	}
	this.result = undefined  
	
	try {
	  exec(
		  statusProvider(this, FULFILLED),
		  statusProvider(this, REJECTED)
	  )
	} catch(e) { statusProvider(this, REJECTED)(e) }
  }
  then(onFulfilledFn, onRejectedFn) {
    const child = new MyPromise(() => {})// 返回一个Promise，提供链式调用
	
	// 依照规范执行判断流程，最终无误后改变child状态及结果
	const handler = fn => data => {
		if(!fn) {
		  statusProvider(child, this.status)(data)
		} else if(typeof fn === 'function') {
		  try {
			const result = fn(data)
		    if(isThenable(result)) {
			  const successHandler = child.listeners.FULFILLED[0]
			  const errorHandler = child.listeners.REJECTED[0]
			  if(isPromise(result)) {
			    result.then(successHandler, errorHandler)
			  } else {
			    new MyPromise(result.then())
					.then(successHandler, errorHandler)
			  }
			} else statusProvider(child, FULFILLED)(result)
		  } catch(e) { statusProvider(child, REJECTED)(e) }
		} 
	}
	
	// 返回结果或者继续套娃
	switch(this.status) {
		case PENDING:
			this.listeners[FULFILLED].push(handler(onFulfilledFn))
			this.listeners[REJECTED].push(handler(onFulfilledFn))
			break;
		case FULFILLED:
			handler(onFulfilledFn)(this.result)
			break;
		case REJECTED:
			handler(onRejectedFn)(this.result)
			break;
	}
	
	return child
  }
  catch(onRejectedFn) {
    return this.then(() => {}, onRejectedFn)
  }
}

MyPromise.resolve = data => {
  if(isPromise(data)) return data
  return isThenable(data) ?
	  new MyPromise(data.then):
      new MyPromise((resolve, reject) => resolve(data))
}

MyPromise.reject = err => new MyPromise(
	(resolve, reject) => reject(err)
)

MyPromise.all = promises => {
  const length = promises.length
  const values = new Array(length).fill('')
  const count = 0
  const result = new MyPromise(() => {})
	
  // promise版计数器，等待全部promise执行完毕
  promises.forEach((promise, index) => {
    promise.then(data => {
	  values[i] = data
	  count++
	  if(count === length) {
		  statusProvider(result, FULFILLED)(values)
	  }
	}, statusProvider(result, REJECTED))
  })
	
  return result
}

MyPromise.race = promises => {
  const result = new MyPromise(() => {})
  promises.forEach((promise, index) => {
    promise.then(
		statusProvider(result, FULFILLED),
		statusProvider(result, REJECTED)
	)
  })
	
  return result
}


new APromise(resolve => { setTimeout(() => { resolve(1) },500) })
  .then(res => {
    console.log(res);
    return new APromise(resolve => {
      setTimeout(() => { resolve(2) }, 500)
    })
  })
 .then(console.log)
// 1
// 2
```
- 我的思考：promise是一个表述异步操作结果的对象，它接收一个函数，其默认参数为resolve，reject，分别表示为异步操作成功和失败，其返回值会被保存到Promise中，用then方法可以访问其结果值，并且then方法也会返回一个promise对象完成链式调用。then方法接收两个参数onFulfilledFn和onRejectedFn，分别为成功和失败的处理函数，在执行对应handler时，会将结果值传入。
# 参考链接
> https://promisesaplus.com/
> https://github.com/Jocs/MyPromise