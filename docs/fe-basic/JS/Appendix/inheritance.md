```js
function myInheritance(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    cnostructor: {
	  value: Child,
	  enumerable: false,
	  writable: true,
	  configurable: true
	}
  })
}
```