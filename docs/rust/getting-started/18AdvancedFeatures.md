# unsafe Rust

## unsafe 的超能力

### 解引用裸指针

- 和引用一样，裸指针是不可变或可变的，分别写作
  - `*const T`
  - `*mut T`
- 裸指针与引用和智能指针的区别在于
  - 允许忽略借用规则
    - 可以同时拥有不可变和可变的指针
    - 多个指向相同位置的可变指针
  - 不保证指向有效的内存
  - 允许为空
  - 不能实现任何自动清理功能
- 通过放弃安全保证以换取性能或使用另一个语言或硬件接口的能力
- 应用场景
  - 调用 C 代码接口
  - 构建借用检查器无法理解的安全抽象(我们确信安全的)

```rust
let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

// unsafe block外不允许解引用裸指针
unsafe {
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

### 访问不安全的函数或方法

```rust
unsafe fn dangerous() {}

unsafe {
    dangerous();
}
```

#### 创建不安全函数的安全抽象

```rust
fn main() {
  let mut v = vec![1, 2, 3, 4, 5, 6];
	let r = &mut v[..];

	let (a, b) = r.split_at_mut(3);

	assert_eq!(a, &mut [1, 2, 3]);
	assert_eq!(b, &mut [4, 5, 6]);
}

fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();

    assert!(mid <= len);

    (&mut slice[..mid], &mut slice[mid..])
	// 借用检查其不能理解我们要借用一个slice的两个不同部分
	// 它只知道我们借用这个slice两次
	// 本质上借用 slice 的不同部分是可以的，因为结果两个 slice 不会重叠
	// 当我们知道某些事是可以的而 Rust 不知道的时候，就是触及不安全代码的时候了
}
use std::slice;

fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();
    let ptr = slice.as_mut_ptr();// 获取slice的裸指针，类型为*mut i32

    assert!(mid <= len);

    unsafe {
        (slice::from_raw_parts_mut(ptr, mid),
         slice::from_raw_parts_mut(ptr.add(mid), len - mid))
    }
	// 函数是不安全的因为它获取一个裸指针，并必须确信这个指针是有效的
	// 裸指针上的add方法也是不安全的，因为其必须确信此地址偏移量也是有效的指针
	// 通过观察代码，和增加mid必然小于等于len的断言，我们可以说unsafe块中所有的裸指针将是有效的slice中数据的指针
}
```

#### 调用外部代码

- 有时，Rust 代码可能需要与其他语言编写的代码交互
- 为此，Rust 有一个关键字，`extern`，有助于创建和使用外部函数接口
  - (Foreign Function Interface， FFI)
  - 外部函数接口是一个编程语言用以定义函数的方式，其允许不同编程语言调用这些函数
- `extern` 的使用无需 `unsafe`

```rust
// rust访问其他语言
// "C" 部分定义了外部函数所使用的 应用二进制接口(application binary interface)
// ABI 定义了如何在汇编语言层面调用此函数
extern "C" {
	// 块中，列出了我们希望能够调用的另一个语言中的外部函数的签名和名称
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
// 其他语言可以访问rust
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

### 访问或修改可变静态变量

- 全局变量在 Rust 中被称为 静态(static) 变量
- 静态变量只能储存拥有 `'static` 生命周期的引用
- 常量与不可变静态变量的区别
  - 静态变量中的值有一个固定的内存地址。使用这个值总是会访问相同的地址
  - 常量则允许在任何被用到的时候复制其数据
- 静态变量可以是可变的。访问和修改可变静态变量都是不安全的
- 为何 Rust 认为可变静态变量是不安全的
  - 拥有可以全局访问的可变数据，难以保证不存在数据竞争
  - 任何可能的情况，请优先使用第十六章讨论的并发技术和线程安全智能指针，这样编译器就能检测不同线程间的数据访问是否是安全的

```rust
// 创建和访问静态变量
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("name is: {}", HELLO_WORLD);
}
// 读取和修改可变静态变量
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}

```

### 实现不安全 Trait

- 当 trait 中至少有一个方法中包含编译器无法验证的不变式时 trait 是不安全的
- **后面举了一个并发的例子，不过不太理解**

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}
```

### 访问 union 的字段

- `union` 和 `struct` 类似，但是在一个实例中同时只能使用一个声明的字段
- 联合体主要用于和 C 代码中的联合体交互

## 何时使用 unsafe code

- 需要上述五个操作时就可以使用

# 高级 Trait

# 高级类型

# 高级函数与闭包

## 函数指针

- fn 被称为函数指针，是一个类型而不是闭包的 Fn Trait

```rust
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 { f(arg)+f(arg) }
```

- 倾向于编写使用泛型和闭包 trait 的函数，这样它就能接受函数或闭包作为参数

```rust
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
									.iter()
									// 下面两者效果一样
									.map(|i| i.to_string())// 闭包作参数
									.map(ToString::to_string)// 函数做参数
									.collect();
```

## 返回值闭包

- 闭包表现为 Trait，所以可以使用 trait 对象返回闭包

```rust
fn returns_closure() -> Box<dyn Fn(i32) -> i32> { Box::new(|x| x+1) }
```

# 宏
