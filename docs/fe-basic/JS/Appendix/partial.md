```js
const partial = (fn, ...partialArgs) => {
  let args = partialArgs;
	
  return function(...restArgs) {
	let argIndex = 0;
	for(let i = 0;i<args.length && argIndex<restArgs.length;i+=1) {
	  if(args[i] === undefined) args[i] = restArgs[argIndex++]
	}
	  
    return fn.apply(null, args)
  }
}
// 逐步演示
fn = (one, two) => {}
partial(fn, 10, undefined) = function(...restArgs) {
  let restArgsIndex = 0;
  for(let i = 0;i<fn.length&&restArgsIndex<restArgs.length;i+=1) {
    if(args[i] === undefined) args[i] = restArgs[restArgsIndex++]
  }
  
  return fn.apply(null, args)
}
partial(fn, 10, undefined)(20) = fn.apply(null, [10, 20])
```