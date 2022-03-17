```js
const promiseify = fn => {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.unshift(function(err, ...params) {
	    if(err) { reject(err) }
		params = params.length > 1 ? params : params[0]
		resolve(params)
	  })
		
	  try { fn(...args) } catch(err) { reject(err) }
	})
  }
}

const sample = promiseify(function(fn, ...args) {
  setTimeout(function() {
    fn(null, ...args)
  }, 100)
})

sample('hello').then(data => console.log(data))// hello
sample('hello', 'world').then(data => console.log(data))//[...]
```