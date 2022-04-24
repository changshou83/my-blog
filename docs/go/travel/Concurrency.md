## GoRoutinue

- Go 程（goroutine）是由 Go 运行时管理的**轻量级线程**:`go f(x,y,z)`
- `f`, `x`, `y`  和  `z`  的求值发生在当前的 Go 程中，而  `f`  的执行发生在新的 Go 程中
- Go 程在相同的地址空间中运行，因此在访问共享的内存时必须进行同步

### Code

```go
// ...
func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
```

## 信道

- 信道是带有类型的管道，你可以通过它用信道操作符  `<-`  来发送或者接收值
  - 将 v 发送至信道 ch:`ch <- v`
  - 从 ch 接收值并赋予 v:`v := <- ch`
- 和映射与切片一样，信道在使用前必须创建:`ch := make(chan int)`
- 默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这意味着不用担心出现竞态。
- 初始化一个带缓冲的信道：`ch := make(chan int, 100)`
  - 仅当信道的缓冲区填满后，向其发送数据时才会阻塞
  - 当缓冲区为空时，接受方会阻塞
- `range`和`close`
  - 发送者可以使用`close(c)`来关闭 `c` 信道,接收者可以通过`v, ok := <- ch`的 ok 来查看信道是否关闭
  - 循环  `for i := range c`  会不断从信道接收值，直到它被关闭
  - 注意
    - 向一个已经关闭的信道发送数据会引发程序恐慌
    - 只有在必须告诉接收者不再有需要发送的值时才有必要关闭，例如终止一个  `range`  循环
- `select`  语句使一个 Go 程可以等待多个通信操作
  - `select`  会阻塞到某个分支可以继续执行为止，这时就会执行该分支
  - 当多个分支都准备好时会随机选择一个执行
  - 当  `select`  中的其它分支都没有准备好时，`default`  分支就会执行,因此为了在尝试发送或者接收时不发生阻塞，可使用  `default`  分支

### Code

```go
// ...
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // 将和送入 c，这里不会出现竞态，因为在c准备好前，发送操作会被堵塞
}

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)// 关闭信道以终止 range 循环
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c1 := make(chan int)
	go sum(s[:len(s)/2], c1)
	go sum(s[len(s)/2:], c1)
	x, y := <-c1, <-c1 // 从 c 中接收

	fmt.Println(x, y, x+y)// -5 17 12

	// 缓冲
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	ch <- 3// 这里会报错：fatal error: all goroutines are asleep - deadlock!
	fmt.Println(<-ch)// 1
	fmt.Println(<-ch)// 2

	// range 与 close
	c2 := make(chan int, 10)
	go fibonacci(cap(c2), c2)
	for i := range c2 {
		fmt.Println(i)// 0 1 1 2 3 5 8 13 21 34
	}
}
```

### select 示例

```go
// ...
func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func boom() {
  tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
	boom()// default
}
```

## `sync.Mutex`

- 保证每次只有一个 Go 程能够访问一个共享的变量，从而避免冲突
- 通过互斥锁来实现这种机制
- 也可以用  `defer`  语句来保证互斥锁一定会被解锁

### Code

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// SafeCounter 的并发使用是安全的。
type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

// Inc 增加给定 key 的计数器的值。
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	c.v[key]++ // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
	c.mux.Unlock()
}

// Value 返回给定 key 的计数器的当前值。
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	defer c.mux.Unlock() // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```

## 练习

### 等价二叉查找树

- Tree 结构体

```go
type Tree struct {
    Left  *Tree
    Value int
    Right *Tree
}
```

- `tree.New`用于构造一个随机结构的已排序二叉查找树，它保存了值  `k`, `2k`, `3k`, ..., `10k`

```go
package main

import (
	"golang.org/x/tour/tree"
    "fmt"
)
// Walk 步进 tree t 将所有的值从 tree 发送到 channel ch。
func Walk(t *tree.Tree, ch chan int) {
	sendValue(t, ch)
	close(ch)
}

func sendValue(t *tree.Tree, ch chan int) {
  if t != nil {
		sendValue(t.Left, ch)
		ch <- t.Value
		sendValue(t.Right, ch)
	}
}

// Same 检测树 t1 和 t2 是否含有相同的值。
func Same(t1, t2 *tree.Tree) bool {
    ch1 := make(chan int)
	ch2 := make(chan int)

	go Walk(t1, ch1)
	go Walk(t2, ch2)

	for i := range ch1 {   // ch1 关闭后   for循环自动跳出
      if i != <- ch2 {
        return false
      }
     }
	return true
}

func main() {
	var ch = make(chan int)
    go Walk(tree.New(1),ch)
    for v := range ch {
      fmt.Println(v)
    }
	//  比较两个tree的value值是否相等
    fmt.Println(Same(tree.New(1), tree.New(1)))
    fmt.Println(Same(tree.New(1), tree.New(2)))
}
```

### Web 爬虫

```go
package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	Fetch(url string) (body string, urls []string, err error)
}

// Crawl 使用 fetcher 从某个 URL 开始递归的爬取页面，直到达到最大深度。
func Crawl(url string, depth int, fetcher Fetcher) {
	defer i.Done() //  和add相对应

	if depth <= 0 {
		return
	}
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}

	l.Lock()  // 存入数据  需要同步锁  因为是在子线程中
	if m[url] == 0 { // 不重复抓取页面。
	    m[url]++
		fmt.Printf("found: %s %q\n", url, body)
	    for _, u := range urls {
			i.Add(1)
			go Crawl(u, depth-1, fetcher) // 并行的抓取 URL。
	    }
	}
	l.Unlock()
}

var (
	m = make(map[string]int) //  map  存放爬取的url
	l sync.Mutex  // 互斥锁
	i sync.WaitGroup  //   群组等待
)

func main() {
	i.Add(1)
	Crawl("https://golang.org/", 4, fetcher)
	i.Wait()

	for i := range m {
		fmt.Println(i)
	}
	fmt.Println("over")
}

// fakeFetcher 是返回若干结果的 Fetcher。
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher 是填充后的 fakeFetcher。
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
```
