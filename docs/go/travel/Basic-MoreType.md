## 指针

- 指针保存了值的内存地址
- 类型  `*T`  是指向  `T`  类型值的指针
- 零值为  `nil`
- `&`  操作符会生成一个指向其操作数的指针
- `*`  操作符表示指针指向的底层值

```go
// ...

func main() {
	i, j := 42, 2701

	p := &i         // 指向 i
	fmt.Println(*p) // 通过指针读取 i 的值
	*p = 21         // 通过指针设置 i 的值
	fmt.Println(i)  // 查看 i 的值

	p = &j         // 指向 j
	*p = *p / 37   // 通过指针对 j 进行除法运算
	fmt.Println(j) // 查看 j 的值
}
```

## 结构体

- 一个结构体就是一组字段。
- 可以使用点号来访问字段
- 也可以通过结构体指针来访问
- 文法
  - 通过直接列出字段的值来新分配一个结构体
  - 使用  `Name:`  语法可以仅列出部分字段，被省略的字段自动分配零值
  - 特殊的前缀  `&`  返回一个指向结构体的指针

```go
// ...

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // 创建一个 Vertex 类型的结构体
	v2 = Vertex{X: 1}  // Y:0 被隐式地赋予
	v3 = Vertex{}      // X:0 Y:0
	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)

func main() {
	v := Vertex{1, 2}
	v.X = 4
	p := &v   // 获取结构体指针
	p.Y = 1e9 // (*p).Y 的简写形式
	fmt.Println(v.X)
}
```

## 数组

- 类型  `[n]T`  表示拥有  `n`  个  `T`  类型的值的数组
- 数组不能改变大小。这看起来是个限制，不过没关系，Go 提供了更加便利的方式来使用数组

```go
// ...

func main() {
  var a = [2]string{"Hello", "World"}
}
```

## 切片

### 简介

- 切片为数组元素提供动态大小的、灵活的视角。在实践中，切片比数组更常用
- 类型  `[]T`  表示一个元素类型为  `T`  的切片
- 切片通过两个下标来界定，即一个上界和一个下界:`a[low, high]`,包含`a`  中下标从 low 到 high-1 的元素
- 切片文法:`[]bool{true, true, false}`

### 切片的属性

- 切片像是数组的引用
  - 切片并不存储任何数据，它只是描述了底层数组中的一段
  - 因此更改切片的元素会修改其底层数组中对应的元素
- 默认行为
  - 切片下界的默认值为  `0`，上界则是该切片的长度
  - `a[0:max]`=`a[0:]`=`a[:max]`=`a[:]`
- 切片拥有  **长度**  和  **容量**
  - 长度就是它所包含的元素个数,可以通过`len(s)`来获取
  - 容量是从它的第一个元素开始数，到其底层数组元素末尾的个数,可以通过`cap(s)`来获取
  - 约束右边会改变 cap 和 len，约束左边只会改变 len
- 切片的零值是  `nil`。nil 切片的长度和容量为 0 且没有底层数组
- 切片的切片：切片可包含任何类型，甚至包括其它的切片

### 操作切片

- 切片可以用内建函数  `make`  来创建，这也是创建动态数组的方式
  - `make`  函数会分配一个元素为零值的数组并返回一个引用了它的切片
  - `make(type, len, cap)`
- 向切片追加元素：`append(s []T, vs ...T) []T`(其实是返回了一个新切片)

### 可能的“陷阱”

- 切片操作并不会复制底层的数组
- 整个数组将被保存在内存中，直到它不再被引用。有时候可能会因为一个小的内存引用导致保存所有的数据
- 比如我只查询一个文本文件的某些字符，却导致整个文件都保存在内存中
  - 解决方法是将需要的数据复制到一个新的切片中
    - `newS := make([]byte, len(data))`
    - `copy(newS, data)`
    - `return newS`

### Code

```go
// ...

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func main() {
  primes := [6]int{2, 3, 5, 7, 11, 13} // 数组

  var s []int = primes[1:4]
  fmt.Println(s)
  s[0] = 4      // 切片像是数组的引用
  fmt.Println(s)

  s := []int{2, 3, 5, 7, 11, 13}
  printSlice(s)// len=6 cap=6 [2 3 5 7 11 13]

  // 截取切片使其长度为 0
  s = s[:0]
  printSlice(s)// len=0 cap=6 []

  // 拓展其长度
  s = s[:4]
  printSlice(s)// len=4 cap=6 [2 3 5 7]

  // 舍弃前两个值
  s = s[2:]
  printSlice(s)// len=2 cap=4 [5 7]

  // nil切片
  var s []int
  fmt.Println(s, len(s), cap(s))
  if s == nil {
	fmt.Println("nil!")
  }

  // 使用 make 创建切片
  a := make([]int, 5)
  printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

  b := make([]int, 0, 5)
  printSlice("b", b) // b len=0 cap=5 []

  // 利用切片的切片创建井字棋盘
  board := [][]string{
	[]string{"_", "_", "_"},
	[]string{"_", "_", "_"},
	[]string{"_", "_", "_"},
  }
}
```

## Range

- `for`  循环的  `range`  形式可遍历切片或映射(感觉像 python 的 range 和 slice)
- 当使用  `for`  循环遍历切片时，每次迭代都会返回两个值。
  1.  当前元素的下标
  2.  当前元素的一份**副本**
- 当不需要某个值时可以用`_`将其忽略

### Code

```go
// ...

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
  for i, v := range pow {
	fmt.Printf("2**%d = %d\n", i, v)
  }
  for _, V := range pow {}
  for i, _ := range pow {}
  for i := range pow {}
}
```

## 映射

- 映射将键映射到值(`map[keyType]valueType`),`make`  函数会返回给定类型的映射
- 映射的零值为  `nil` 。`nil`  映射既没有键，也不能添加键
- 映射的文法与结构体相似，不过必须有键名。若顶级类型只是一个类型名，你可以在文法的元素中省略它

### 操作映射

- 插入/修改元素:`m[key] = elem`
- 获取:`elem = m[key]`
- 删除:`delete(m, key)`
- 是否存在:`elem, ok = m[key]`

### Code

```go
// ...

type Vertex struct {
  Lat, Long float64
}

var m1 map[string]Vertex

var m2 = map[string]Vertex{
	"Bell Labs": Vertex{ 40, -74 },
	"Google": Vertex{ 73, -122 },
	"Meta": { 100, 50 } // 省略 Vertex
}

func main() {
	m1 = make(map[string]Vertex)
	m1["Bell Labs"] = Vertex{ 40, -74 }
	fmt.Println(m1)
	fmt.Println(m2)
}
```

## 函数值

- 函数是第一公民(这是支持函数式编程吗)
- 闭包

### Code

```go
package main

import (
	"fmt"
	"math"
)

// 演示闭包
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}
// 一个返回斐波那契数的函数
func fibonacci() func() int {
	cache := make([]int, 0)
	i := 0
	return func() int {
		if i == 0 { i++;cache = append(cache, 0);return 0 }
		if i == 1 { i++;cache = append(cache, 1);return 1 }
		result := cache[i - 1] + cache[i - 2]
		cache = append(cache, result)
		i++
		return result
	}
}

func main() {
	hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))
	// 获取斐波那契数
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())// 0 1 1 2 3 5 8 13 21 34
	}
}
```

## 小结

- 指针 - 引用
- 结构体
- 数组
- 切片 - 类比动态数组
- Range - 类似 python 的 range 函数
- 映射 - 类比哈希表
- 函数值 - 支持函数式编程
