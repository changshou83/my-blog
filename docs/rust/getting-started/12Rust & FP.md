# 闭包

- 闭包：可以捕获其内在环境的匿名函数
- 特点
  - 匿名函数
  - 可被保存为变量或作为参数
  - 可在一个地方创建闭包，在另一个上下文调用闭包完成运算
  - 调用闭包的作用域可从创建的作用域捕获值

```rust
// 定义匿名函数
let expensive_closure = |num| {
	println!("calculating slowly...");
	thread::sleep(Duration::from_secs(2));
	num
};
```

## 闭包类型推断和注解

- 闭包不要求标注和返回值的类型，编译器会从其上下文自动推断。也可以自己手动加

### 比较函数和闭包的定义语法

```rust
fn add_one_v1 (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x| { x + 1 };
let add_one_v4 = |x| x + 1;
```

### 闭包最终只会推断唯一具体类型

```rust
let example_closure = |x| x;// 单独定义会报错，以为编译器不能推断出类型

let s = example_closure(String::from("hello"));// 编译器将闭包推断为字符串类型
let n = example_closure(5);// 报错，因为5是整型，与闭包的类型不符
```

### 使用泛型和 Fn Trait 存储闭包

- 为了使闭包在需要执行的时候才会被执行，我们可以进行记忆化或叫延迟计算
  1.  创建一个结构体，他持有闭包及其调用结果
      - 只会在需要结果时才执行闭包
      - 可缓存结果
- 让 struct 持有闭包
  - 结构体的定义需要知道所有字段的类型
    - 需要指明闭包的类型
  - 每个闭包是里都有自己唯一的匿名类型，即使两个闭包签名完全一样
  - 需要使用泛型和 Trait Bound
- Fn Trait
  - 由标准库提供
  - 所有闭包都至少实现了以下 Trait 之一
    - Fn
    - FnMut
    - FnOnce

```rust
struct Cacher<T>
where
	T: Fn(u32) -> u32
{
	calculation: T,
	value: Option<u32>,
}

impl<T> Cacher<T>
where
	T: Fn(u32) -> u32
{
	fn new(calculation: T) -> Cacher<T> {
		Cacher {
			calculation,
			value: None,
		}
	}

	fn value(&mut self, arg: u32) -> u32 {
		match self.value {
			Some(v) => v,
			None => {
				let v = (self.calculation)(arg);
				self.value = Some(v);
				v
			}
		}
	}
}
```

- 缓存器的限制
  - 总是会返回第一次调用的值
    - 可以使用 HashMap：key - value => arg - result
  - 只能接受一个 u32 类型的参数和 u32 类型的返回值

## 闭包会捕获其环境

- 函数不可以捕获外部作用域的变量
- 以为捕获环境会产生内存开销，所以在更一般的环境时，函数不被允许捕获环境

```rust
fn main() {
	let z = 1;
	let example_closure = |x| z == x;
	fn example_function(x: u32) -> bool {
		z == x // 不能读取 z
	}
	assert!(example_function(4));
}
```

### 闭包捕获环境的方式

- 对应函数的三种获取参数的方式：
  1.  取得所有权 - FnOnce -获取参数的所有权并在定义闭包时将其移动进闭包
  2.  可变借用 - FnMut - 获取可变的借用值所以可以改变其环境
  3.  不可变借用 - Fn - 从其环境获取不可变的借用值
- FnOnce 的 `Once` 部分代表了闭包不能多次获取相同变量的所有权的事实，所以它只能被调用一次。
- 创建闭包时，通过闭包对环境值的使用，Rust 推断出具体使用哪个 Trait：
  - 由于所有闭包都可以被调用至少一次，所有的闭包都实现了 FnOnce
  - 并没有移动被捕获变量的所有权到闭包内的闭包 实现了 FnMut
  - 不需要对被捕获的变量进行可变访问的闭包 实现了 Fn
- move 关键字
  - 如果你希望强制闭包获取其使用的环境值的所有权，可以在参数列表前使用 `move` 关键字。
  - 这个技巧在将闭包传递给新线程以便将数据移动到新线程中时最为实用。

```rust
fn main() {
    let x = vec![1, 2, 3];
    let equal_to_x = move |z| z == x;
    println!("can't use x here: {:?}", x);// 报错，因为x的所有权被移入闭包

    let y = vec![1, 2, 3];
    assert!(equal_to_x(y));
}
```

## 最佳实践

大部分需要指定一个 `Fn` 系列 trait bound 的时候，可以从 `Fn` 开始，
而编译器会根据闭包体中的情况告诉你是否需要 `FnMut` 或 `FnOnce`。

# 迭代器

- 迭代器模式：对一些列项执行某些任务
- 迭代器负责遍历每个项并确定遍历何时完成
- Rust 中的迭代器
  - 惰性：除非调用消费迭代器的方法，否则迭代器本身没有任何效果

## `Iterator` trait 和 `next` 方法

- 所有迭代器都实现了`Iterator Trait`
- 在标准库中的大致定义

```rust
pub trait Iterator {
	type Item;
	fn next(&mut self) -> Option<Self::Item>;
	// ...
}
```

- 该 trait 仅要求实现一个方法：next
- next 方法
  - 每次返回迭代器中的一项
  - 返回结果包含在 Some 里
  - 迭代结束后返回 None
  - PS:与 es6 里的 Generator 好像
- 可直接在迭代器上调用 next 方法

```rust
let v1 = vec![1, 2, 3];
let mut v1_iter = v1.iter();

assert_eq!(v1_iter.next(), Some(&1));
assert_eq!(v1_iter.next(), Some(&2));
assert_eq!(v1_iter.next(), Some(&3));
```

### 迭代方法

- iter():在不可变引用上创建迭代器
- into_iter():创建的迭代器会获取所有权
- iter_mut():迭代可变引用

## 消费与产生迭代器

- 消费适配器：`Iterator Trait`提供的默认实现的调用 `next` 方法的方法。

```rust
#[test]
fn iterator_sum() {
    let v1 = vec![1, 2, 3];

    let v1_iter = v1.iter();
    let total: i32 = v1_iter.sum();
    assert_eq!(total, 6);
}
```

- 迭代器适配器：允许我们将当前迭代器变为不同类型的迭代器。
  - 可以链式调用多个迭代器适配器
  - 因为所有的迭代器都是惰性的，必须调用一个消费适配器方法以便获取迭代器适配器调用的结果

```rust
let v1: Vec<i32> = vec![1, 2, 3];
// v1.iter().map(|x| x + 1);// 产生警告，因为没有消费创建的迭代器，闭包不会执行
// 调用`map`方法创建一个新迭代器，接着调用`collect`方法消费新迭代器并创建一个 vector
let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);
```

## 使用闭包获取环境

```rust
#[derive(PartialEq, Debug)]
struct Shoe { size: u32, style: String, }
fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
	shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}
```

## 实现 `Iterator` trait 来创建自定义迭代器

- 关键：实现一个 next 方法

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    // 迭代器会产生 u32s
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // count 自增 1。也就是为什么从 0 开始。
        self.count += 1;

        // 检测是否结束结束计数。
        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}

#[test]
fn using_other_iterator_trait_methods() {
    let sum: u32 = Counter::new().zip(Counter::new().skip(1))
                                 .map(|(a, b)| a * b)
                                 .filter(|x| x % 3 == 0)
                                 .sum();
	// zip产生一个vec![2,3,4,5]
	// map产生vec![2,6,12,20]
	// filter产生vec![6,12]
	// sum产生6 + 12 = 18
    assert_eq!(18, sum);
}
```

# 总结

Rust 底层做过优化，迭代器比循环性能还好一些。
