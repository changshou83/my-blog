# 泛型

- 泛型是具体类型或其他属性的抽象替代，用于高效处理重复概念
- 我们可以表达泛型的属性，比如他们的行为或如何与其他泛型相关联，而不需要在编写和编译代码时知道他们在这里实际上代表什么

## 使用泛型

```rust
fn largest<T>(list: &[T]) -> T {
	let mut largest = list[0];
	for &item in list.iter() {
		if item > largest {// 这里编译会有问题，以为>运算符不能用于所有类型
			largest = item;
		}
	}
	largest
}
```

## 结构体&枚举中的泛型

```rust
struct Point<T, U> {
	x: T,
	y: U,
}

enum Result<T, E> { Ok(T), Err(E), }

fn main() {
	let integer_and_float = Point { x: 5, y: 4.0 };
}
```

## 方法中的泛型

```rust
impl<T, U> Point<T, U> {
	fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
		Point { x: self.x, y: other.y, }
	}
}
```

## 性能

- 在编译时会进行单态化，即把具体类型填进去，这样在运行时就不会有性能损耗

# trait

- 抽象的定义共享行为
- 类似于接口
- Trait 告诉编译器：某些类型具有哪些可以与其他类型共享的功能
- trait 可以与泛型结合来将泛型限制为拥有特定行为的类型，而不是任意类型

## 定义 trait

```rust
pub trait Summary {
	// 带默认实现
	fn summarize(&self) -> String {
	String::from("(Read more...)")
	}
}
```

## 为类型实现 trait

```rust
pub struct Tweet {
	pub username: String,
	pub content: String,
	pub reply: bool,
	pub retweet: bool,
}

impl Summary for Tweet {
	fn summarize(&self) -> String {
		format!("{}: {}", self.username, self.content)
	}
}
fn main() {
let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
    reply: false,
    retweet: false,
};

println!("1 new tweet: {}", tweet.summarize());

}
```

## Trait Bound 语法

```rust
pub fn notify<T: Summary>(item: T) {
	println!("Breaking news! {}", item.summarize());
}
// 语法糖
pub fn notify(item: impl Summary) {
	println!("Breaking news! {}", item.summarize());
}
// 指定多个trait
pub fn notify<T: Summary + Display>(item: T) {
	println!("Breaking news! {}", item.summarize());
}
// 简化Trait
fn some_function<T, U>(t: T, u: U) -> i32
	where T: Display + Clone,
		  U: Clone + Debug
{
	...
}
// 为返回实现trait
fn returns_summarizable() -> impl Summary {
	Tweet {
		username: String::from("horse_ebooks"),
		content: String::from("of course, as you probably already know, people"),
		reply: false,
		retweet: false,
	}
}
// !注意只能返回一种类型，比如A,B都实现了C trait，但只能返回A或者只能返回B，不能有可能返回A，同时又有可能返回B

// 有条件的实现方法
use std::fmt::Display;

struct Pair<T> { x: T, y: T, }
// 为所有T类型实现new方法
impl<T> Pair<T> {
	fn new(x: T, y: T) -> Self {
		Self { x, y, }
	}
}
// 为实现了Display和PartialOrd的T类型实现cmp_display方法
impl<T: Display + PartialOrd> Pair<T> {
	fn cmp_display(&self) {
		if self.x >= self.y {
			println!("The largest member is x = {}", self.x);
		} else {
			println!("The largest member is y = {}", self.y);
		}
	}
}

// 为特定trait有条件的实现trait，覆盖
impl<T: Display> ToString for T {
	// --snip--
}
// 这里为实现了 Display Trait的T类型实现 ToString Trait
let s = 3.to_string();
```

## 使用 Trait 修复 largest 函数

```rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
	let mut largest = &list[0];

	for item in list.iter() {
		if item > largest {
			largest = item;
		}
	}

	largest
}
```

# 生命周期

- 一类允许我们向编译器提供引用如何相互关联的泛型
- 生命周期功能允许在很多场景下借用值的同时仍然使编译器能够检查这些引用的有效性

## 主要作用

- 避免悬垂引用，即被引用的内存块被释放后，仍然对其进行访问，它会导致程序引用非预期引用的数据

```rust
{
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {}", r); //          |此时&x在块外已经被释放，产生悬垂引用
}                         // ---------+
// 一个有效的引用，因为数据比引用有着更长的生命周期
{
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {}", r); //   |       |
                          // --+       |
}                         // ----------+
```

## 函数中的泛型生命周期

```rust
// 'a 就是生命周期注解
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
	if x.len() > y.len() {
		x
	} else {
		y
	}
}
// 函数输出的生命周期与x,y中较短的那一个相同
fn main() {
	let string1 = String::from("long string is long");
	let result;
	{
		let string2 = String::from("xyz");
		result = longest(string1.as_str(), string2.as_str());
	} // 此时y的生命周期结束
	println!("The longest string is {}", result);// 所以这里会报错，因为y指向一个无效的引用
}
```

## 深入理解

- 生命周期语法是用于将函数的多个参数与其返回值的生命周期进行关联的。
- Rust 通过这种关联来获取足够的信息来允许内存安全的操作并阻止会产生悬垂指针亦或是违反内存安全的行为

## 结构体中的生命周期注解

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
```

## 生命周期省略规则

- 早期 Rust 中，每个引用必须有明确的生命周期
- 后来，Rust 团队在编译器中内置了一些常用的模式，被称为生命周期省略规则
- 分类
  - 输入生命周期:参数
  - 输出生命周期:返回值
- 三条规则
  1.  每一个是引用的参数都有它自己的生命周期参数，例如上面的 longest 函数，x,y 都有自己的生命周期，只不过都为 a 而已
  2.  如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数
  3.  如果方法有多个输入生命周期参数并且其中一个参数是 `&self` 或 `&mut self`，说明是个对象的方法，那么所有输出生命周期参数被赋予 `self` 的生命周期

### 从编译器的角度练习

```rust
// 练习一
fn first_word(s: &str) -> &str { "" }
// 应用第一二条规则
fn first_word<'a>(s: &'a str) -> &'a str { "" }

// 练习二
fn longest(x: &str, y: &str) -> &str { "" }
// 应用第一条规则
fn longer<'a, 'b>(x: &'a str, y: &'b str) -> &str { "" }// 会报错，因为编译器不能推断出返回值的生命周期
```

### 方法定义中的生命周期注解

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
	// 应用第三条规则
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

## 静态生命周期

- `'static`，其生命周期**能够**存活于整个程序期间。
- 所有的字符串字面值都拥有 `'static` 生命周期
- 谨慎使用

## 结合

```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
    where T: Display
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

# 总结

- 泛型，trait 使得我们抽象的能力增强
  - 泛型类型参数意味着代码可以适用于不同的类型
  - trait 和 trait bounds 保证了即使类型是泛型的，这些类型也会拥有所需要的行为
- 生命周期保证不会出现悬垂引用
- 所有的这一切发生在编译时所以不会影响运行时效率
