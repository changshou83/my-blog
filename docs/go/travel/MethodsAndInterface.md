## 方法

- Go 没有类，不过可以定义方法
- 方法就是一类带`接收者`参数的函数
  - `func (receiver Type) name() returnType {}`
  - 接收者的类型定义和方法声明必须在同一包内
- 接收者的类型
  - 值
    - 类型别名
    - 结构体
  - 指针
  - 两者关系
    - 值接收者对原始数据的副本进行操作，指针接收者修改原值
    - 由于方法经常需要修改它的接收者，指针接收者比值接收者更常用
- 以指针或值为接收者的**方法**被调用时，接收者既能为值又能为指针。而带指针或值参数的**函数**则只能接收对应类型。

### Code

```go
// ...
type Vertex struct {
  X,Y float64
}
type MyFloat float64
// 方法示例
func (v *Vertex) Scale(f float64) { v.X = v.X * f;v.Y = v.Y * f; }// 指针接收者
func (v Vertex) Abs() float64 { return math.Sqrt(v.X*v.X + v.Y*v.Y) }// 结构体接收者
func (f MtFloat) Abs() float64 { if f > 0 { return float64(-f); }; return float64(f) }// 类型别名接收者
// 函数版本
func Abs(v Vertex) float64 { return math.Sqrt(v.X*v.X + v.Y*v.Y) }
func ScaleFunc(v *Vertex, f float64) { v.X = v.X * f;v.Y = v.Y * f; }

func main() {
  v := Vertex{3, 4}
  v.Scale(10)// v { 30, 40 }
  fmt.Println(v.Abs())
  fmt.Println(Abs(v))
  // 方法与函数
  v := Vertex{3, 4}
  v.Scale(2)// Go会自动解析为 (&v).Scale(2),这叫做指针重定向
  ScaleFunc(&v, 10)

  p := &Vertex{4, 3}
  p.Scale(3)
  ScaleFunc(p, 8)
  fmt.Println(p.Abs())// (*p).Abs()

  fmt.Println(v, p)
}
```

## 接口

- **接口类型**  是由一组方法签名定义的集合
- 接口类型的变量可以保存任何实现了这些方法的值
- 隐式实现：`func (t T) IContent() {}`，这表明类型 `T` 实现了接口 `I`,注意到没有使用`implements`关键字
- 接口值
  - 接口值可以用作函数的参数或返回值
  - 在内部，接口值可以看做包含值和具体类型的元组：`(value, type)`
  - 指定了零个方法的接口值被称为 空接口。空接口被用来处理未知类型的值。
- 类型断言提供了访问接口值底层具体值的方式：`t, ok := i.(T)`,将接口 `i` 底层类型为  `T`  的值赋予变量  `t`
- 类型选择是一种按顺序从几个类型断言中选择分支的结构，即特殊的 switch：`switch v := i.(type) { }`
  - `i` 是接口值,`type` 是关键字

### Code

```go
// ...

type Abser interface {
	Abs() float64
}

func main() {
  var a Abser
  f := MyFloat(-math.Sqrt2)
  v := Vertex{3, 4}
  // 赋值
  a = f  // a MyFloat 实现了 Abser
  a = &v // a *Vertex 实现了 Abser,而 a = v 不行，因为 v 是 Vertex 类型，而 Vertex 没有实现 Abs 方法

  // 查看接口值
  a = &Vertex{ 3, 4 }
  describe(a)// (&{3 4}, *main.Vertex)
  fmt.Println(a.Abs())

  a = MyFloat(math.Pi)
  describe(a)// (3.141592653589793, main.MyFloat)
  fmt.Println(a.Abs())

  // 类型断言
  var i interface{} = "hello"
  s, ok := i.(string)
  fmt.Println(s, ok)// hello true
  f, ok := i.(float64)
  fmt.Println(f, ok)// 0 false

  // 类型选择
  do(21)     // Twice 21 is 42
  do("hello")// "hello" is 5 bytes long
  do(true)   // I don't know about type bool!
}

type MyFloat float64
func (f MyFloat) Abs() float64 { // MyFloat 实现了 Abser
	if f < 0 { return float64(-f) }
	return float64(f)
}

type Vertex struct { X, Y float64 }
func (v *Vertex) Abs() float64 { return math.Sqrt(v.X*v.X + v.Y*v.Y) }
// 接口值
func describe(a Abser) { fmt.Printf("(%v, %T)\n", a, a) }
// 类型选择
func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\n", v)
	}
}
```

## 常用接口

- `Stringer` 是一个可以用字符串描述自己的类型：`type Stringer interface { String() string }`
  - 可以通过此接口来打印值
- `error` 表示错误状态：`type error interface { Error() string }`
- `Reader`
  - `io`  包指定了  `io.Reader`  接口，它表示从数据流的末尾进行读取
  - `func (T) Read(b []byte) (n int, err error)`
    - `n` 表示要读取的字节长，默认是字节切片的长度
- `Image`
  - [`image`](https://go-zh.org/pkg/image/#Image)  包定义了  `Image`  接口

```go
type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}
```

### Code

```go
// ...

type Person struct {
	Name string
	Age  int
}

type MyError struct {
	When time.Time
	What string
}

func (p Person) String() string { return fmt.Sprintf("%v (%v years)", p.Name, p.Age) }

func (e *MyError) Error() string { return fmt.Sprintf("at %v, %s", e.When, e.What) }

func run() error { return &MyError{ time.Now(), "it didn't work", } }

func main() {
	a := Person{"Arthur Dent", 42}
	fmt.Println(a)// Arthur Dent (42 years)
	if err := run(); err != nil { fmt.Println(err) }
}
```

### 练习

1. Stringer

```go
package main

import "fmt"

type IPAddr [4]byte

func (ip IPAddr) String() string {
	return fmt.Sprintf("%v.%v.%v.%v", ip[0], ip[1], ip[2], ip[3])
}

func main() {
	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)// googleDNS: 8.8.8.8 loopback: 127.0.0.1
	}
}
```

2. error

```go
package main

import "fmt"

type ErrNegativeSqrt float64

func (e ErrNegativeSqrt) Error() string {
	return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
}

func Sqrt(x float64) (float64, error) {
	if x < 0 { return  x, ErrNegativeSqrt(x)}
	return x, nil
}

func main() {
	fmt.Println(Sqrt(2))// 2 <nil>
	fmt.Println(Sqrt(-2))// -2 cannot Sqrt negative number: -2
}
```

3. Reader

```go
package main

import (
	"io"
	"os"
	"strings"
	"golang.org/x/tour/reader"
)

type MyReader struct{}

func (r MyReader) Read(b []byte) (int, error) {
	b[0] = 'A'
	return 1, nil
}

type rot13Reader struct {
	r io.Reader
}

func rot13(b byte) byte {
  switch {
    case ('A' <= b && b <= 'M') || ('a' <= b && b <= 'm'):
		b = b + 13
    case ('M' < b && b <= 'Z') || ('m' < b && b <= 'z'):
		b = b - 13
  }
  return b
}

func (r rot13Reader) Read(b []byte) (int, error) {
	n, e := r.r.Read(b)
	for i := 0; i < n; i++ {
		b[i] = rot13(b[i])
	}
	return n, e
}

func main() {
	// 产生一个 ASCII 字符 `'A'` 的无限流
	reader.Validate(MyReader{})
	// 一个实现了 `io.Reader` 并从另一个 `io.Reader` 中读取数据的 `rot13Reader`
	s := strings.NewReader("Lbh penpxrq gur pbqr!")
	r := rot13Reader{s}
	io.Copy(os.Stdout, &r)// You cracked the code!
}
```

4. image

```go
package main

import (
	"golang.org/x/tour/pic"
	"image"
	"image/color"
)

type Image struct{}

func (i Image) Bounds() image.Rectangle { return image.Rect(0, 0, 200, 200) }
func (i Image) ColorModel() color.Model { return color.RGBAModel }
func (i Image) At(x, y int) color.Color { return color.RGBA{ uint8(x), uint8(y), 255, 255 } }

func main() {
	m := Image{}
	pic.ShowImage(m)
}
```

## 小结

- 方法
  - 是一类带`接收者`参数的函数：`func (receiver Type) name() returnType {}`
  - 接收者的类型定义和方法声明必须在同一包内
  - 接收者的类型:值/指针
    - 区别:值操作副本，指针操作原值
    - 指针重定向
      - 以指针或值为接收者的**方法**被调用时，接收者既能为值又能为指针
      - 而带指针或值参数的**函数**则只能接收对应类型
- 接口
  - 类型
    - 由一组方法签名定义的集合
    - 接口类型的变量可以保存任何实现了这些方法的值
    - 隐式实现：`func (t T) IContent() {}`
  - 值
    - 可以用作函数的参数或返回值
    - `(value, type)`
    - 空接口被用来处理未知类型的值
  - 类型断言：`t, ok := i.(T)`
  - 类型选择：`switch v := i.(type) { }`
- 常用接口
  - `Stringer`
  - `Error`
  - `io.Reader`
  - `Image`
