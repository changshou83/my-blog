## 流程控制

### for

- Go 只有一种循环结构：`for`  循环
- 组成
  - 初始化语句：在第一次迭代前执行，通常为一句短变量声明，此部分可选
  - 条件表达式：在每次迭代前求值，一旦条件表达式的布尔值为  `false`，循环迭代就会终止
  - 后置语句：在每次迭代的结尾执行，此部分可选
- Go 的 for 语句后面的三个构成部分外没有小括号， 大括号  `{ }`  则是必须的
- 在只保留条件表达式时，可以去掉分号，此时就是 C 中的 while

```go
// ...

// 练习：使用牛顿法实现Sqrt
func Sqrt(x float64) float64 {
	z := float64(x)
	for ((z*z - x)/(2 * z)) > float64(0.01) {
	  z -= (z*z - x)/(2 * z)
	}
	return z
}
func main() {
	// 普通 for 循环
	for i:=0;i<10;i++ {}
	// 省略 for 循环
	sum := 0
	for ;sum<1000; { sum += sum }
	for sum<1000 { sum += sum }
	// 无限循环
	for {}
	// 练习
	fmt.Println(Sqrt(4))
}
```

### if

- `if`表达式外无需小括号  `( )` ，而大括号  `{ }`  则是必须的
- `if`的简短语句: `if`  语句可以在条件表达式前执行一个简单的语句,并且该语句声明的变量作用域仅在  `if`  或任何对应的  `else`  块中使用

```go
// ...

func pow(x, n, lim float64) float64 {
  if v:=math.Pow(x, n);v < lim {
	return v
  } else {
	fmt.Println("%g>=%h\n", v, lim)
  }
  return lim
}

//...
```

### switch

- 自带`break`。除非以  `fallthrough`  语句结束，否则分支会自动终止
- switch 的 case 无需为**常量**，且取值不必为整数
- 没有条件的 switch 同  `switch true`  一样

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// case从上到下执行，case 无需为常量
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	  case today + 0:
		fmt.Println("Today.")
	  case today + 1:
		fmt.Println("Tomorrow.")
	  default:
		fmt.Println("Too far away.")
	}
	// 无条件的 switch
	t := time.Now()
	switch {
	  case t.Hour() < 12:
		fmt.Println("Good morning!")
	  case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	  default:
		fmt.Println("Good evening.")
	}
}
```

### defer

- defer 语句会将函数推迟到**外层函数返回之后执行**
- 推迟调用的函数其**参数会立即求值**，但直到外层函数返回前该函数都不会被调用
- 推迟的函数调用会被压入一个栈中(后进先出)

```go
// ...

func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
```

## 小结

- for,if,switch,defer
- 没有 while 循环，因为 for 循环可以简化，简化到只剩终止条件就变成了 while 了
- 比较特殊的是，这些语句可以生成临时变量且都无需小括号
- switch 的 case 是动态的
- 特殊的 defer，可以将函数延迟到外层函数返回后执行
