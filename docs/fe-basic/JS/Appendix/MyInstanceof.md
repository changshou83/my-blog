```js
function MyInstanceof(left, right) {
  let proto = Object.getPrototype(left)
  while(true) {
	if(proto === null || proto === undefined) return false
	if(proto === right.prototype) return true
    proto = Object.getPrototype(proto)
  }
}

MyInstance({}, Object)// true
```