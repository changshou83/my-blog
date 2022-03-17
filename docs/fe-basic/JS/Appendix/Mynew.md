```js
function new(Ctor, ...params) {
  if(!Ctor.prototype) throw new TypeError(`${Ctor.toString()} is not a constructor`)
	
  const instance = Object.setPrototypeOf({ constructor: Ctor }, Ctor.prototype)
  
  
  const result = Ctor.apply(instance, params)
  const isObject = result !== null && typeof result === 'object'
  const isFunction = typeof result === 'function'
  
  return isObject || isFunction ? result : instance
}
```