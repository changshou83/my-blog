```js
const curry = fn => {	
  return function curried(...args) {
	if(args.length < fn.length) {
	  return (...nextArgs) => curried.apply(null, [...args, ...nextArgs])
	} 
	  
    return fn.apply(null, args)
  }
}
// 逐步演示
fn = (one, two) => {}
curry(fn) = function curried(...args) {
	if(args.length < fn.length) {
	  return function(...nextArgs) {
	    return curried.apply(null, [...args, ...nextArgs]) 
	  }
	}
	
	return fn.apply(null, args)
}
curry(fn)(1) = (...nextArgs) => curried.apply(null, [1])
curry(fn)(1)(2) = curried.apply(null, [1, 2]) = fn.apply(null, [1, 2])
```