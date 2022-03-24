### ref
```js
function ref(val) {
  const wrapper = {
    value: val
  }
  
  Object.defineProperty(wrapper, '_v_isRef', {
    value: true,
	writable: false,
	enumerable: false
  })
	
  return reactive(wrapper)
}
```

### toRef(s)

```js
function toRef(obj, key) {
  const wrapper = {
    get value() {
	  return obj[key]
	}
	set value(newVal) {
	  obj[key] = newVal
	}
  }
  // 省略添加标识
  
  return reactive(wrapper)
}

function toRefs(obj) {
  const ret = {}
  for(const key in obj) {
    ret[key] = toRef(obj, key)
  }
  return ret
}
```
### autoUnref
```js
function proxyRefs(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
	  const value = Reflect.get(target, key, receiver)
	  return value._v_isRef ? value.value : value
	},
	set(target, key, newVal, receiver) {
	  const value = target[key]
	  if(value._v_isRef) { value.value = newVal; return true; }
	  return Reflect.set(target, key, newVal, receiver)
	}
  })
}
```
![[Recording 20220315145020.webm]]
