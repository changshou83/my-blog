# 面向对象语言的特点

- 面向对象编程语言所共享的一些特性：对象、封装和继承

## 对象

- 对象包含数据和行为

### 对象与 Rust

- Rust 是面向对象的
  - struct,enum 包含数据
  - impl 块提供方法

## 封装

- 对象的实现细节不能被使用对象的代码获取到。
- 唯一与对象交互的方式是通过对象提供的公有 API
- 好处：封装使得改变和重构对象的内部时无需改变使用对象的代码
- 结构体里的字段是默认私有的，只有 pub 关键字才会公开公有 API

## 继承

一个对象可以定义为继承另一个对象的定义，这使其可以获得父对象的数据和行为，而无需重新定义

### 继承与 Rust

从这个角度来看 Rust 不是面向对象的，但 Rust 提供了其他解决方案

#### 为什么使用继承

- 重用代码：如果为一个类型实现特定行为，继承可以对不同的类型重用这个实现
- 实现多态：表现为子类型可以用于父类型被使用的地方

#### Rust 的解决方案

- 使用默认 trait 方法实现来进行共享
  - 例如第十章的`Summary Trait`中`summarize`方法的默认实现，这类似于父类的方法
  - 当实现 Trait 时可以覆盖默认实现，这类似于子类覆盖从父类继承的方法实现
- 因为继承可能会使得子类共享不需要的代码，所以 Rust 使用 Trait 对象实现多态

# Trait 对象

## 为共有行为定义一个 trait

- trait 对象与传统对象
  - 相同：某种程度上组合数据与行为
  - 不同：无法为 trait 对象添加数据
- trait 对象被专门用于处理抽象某些共有行为，没有传统对象通用
- trait 对象的概念有点像鸭子类型(只关注行为不关注类型)
- trait 对象与泛型和 trait bound
  - 泛型关注类型
  - trait 对象关注行为
- 动态分发与静态分发
  - 单态化产生的代码是静态分发；单态化是在编译时将泛型参数转化为具体参数，即知晓了调用什么方法
  - Trait 对象产生的代码是动态分发；在运行时才确定调用了什么方法的代码
    - 为什么需要在运行时才能确定，因为在编译时无法知晓用户的自定义类型
- 取舍：获得灵活性，损失性能
-

```rust
trait Draw {
	fn draw(&self);
}
struct Button {
	width: u32,
	height: u32,
	label: String,
}
impl Draw for Button { fn draw(&self) {} }
struct SelectBox {
	width: u32,
	height: u32,
	options: Vec<String>,
}
impl Draw for SelectBox { fn draw(&self) {} }
// 用Trait对象实现
struct Screen {
	components: Vec<Box<dyn Draw>>,
}

impl Screen {
	fn run(&self) {
		for component in &self.components.iter() {
			component.draw();
		}
	}
}
fn main() {
	let screen = Screen {
		components: vec![
			Box::new(SelectBox {
				width: 75,
				height: 10,
				options: vec![
					String::from("Yes"),
					String::from("Maybe"),
					String::from("No")
				],
			}),
			Box::new(Button {
				width: 50,
				height: 10,
				label: String::from("OK"),
			}),
		],
	};
	screen.run();
}
// 用泛型实现
struct Screen<T: Draw> {
	components: Vec<T>,
}

impl<T> Screen<T>
	where T: Draw {
	fn run(&self) {
		for component in &self.components.iter() {
			component.draw();
		}
	}
}
// 只能实现一种：Button或者SelectBox
// 之前的枚举配合泛型只能适用于已经知道所有类型的情况
```

## 对象安全

- 只有对象安全的 trait 才可以组成 trait 对象
- 如果一个 trait 中所有的方法有如下属性时，则该 trait 是对象安全的：
  - 返回值类型不为 `Self`
    - 反例：Clone Trait：`pub trait Clone{fn clone(&self) -> Self;}`
  - 方法没有任何泛型类型参数

# 设计模式
