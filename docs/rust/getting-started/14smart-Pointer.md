# 序

- 指针：一个包含内存地址的变量的通用概念。类似间接寻址。
- 引用是一类只借用数据的指针
- 智能指针是一类数据结构。表现类似指针，但是也拥有额外的元数据和功能。
  - 智能指针拥有他们指向的数据
  - 前面出现过的智能指针：`String`,`Vec<T>`
    - 持有数据所有权
    - 带有元数据（比如他们的容量）
    - 额外的功能或保证（`String` 的数据总是有效的 UTF-8 编码）
  - 通常使用结构体实现。
    - 区别于常规结构体在于其实现了 `Deref` 和 `Drop` trait。
    - `Deref` trait 允许智能指针结构体实例表现的像常规引用一样
      - 这样可以编写既用于引用、又用于智能指针的代码
    - `Drop` trait 允许我们自定义智能指针的 drop 函数
- 本章讲解标准库中最常用的一些智能指针
  - `Box<T>`，用于在堆上分配值
  - `Rc<T>`，一个引用计数类型，其数据可以有多个所有者
  - `Ref<T>` 和 `RefMut<T>`，通过 `RefCell<T>` 访问。
  - `RefCell<T>` 是一个在运行时而不是在编译时执行借用规则的类型。

# `Box<T>`

- box 允许你将一个值放在堆上而不是栈上。留在栈上的则是指向堆数据的指针
- box 没有性能损失
- 应用场景
  1.  当有一个在编译时未知大小的类型，而又想要在需要确切大小的上下文中使用这个类型值的时候
  2.  当有大量数据并希望在确保数据不被拷贝的情况下转移所有权的时候
  3.  当希望拥有一个值并只关心它的类型是否实现了特定 trait 而不是其具体类型的时候
- 解释
  1.  例如递归类型
  2.  优化在栈上转移大量数据所有权时的性能
  3.  这个叫 Trait 对象

## Box 赋能递归类型

- Rust 在编译时需要确定所需内存空间的大小，但递归类型的空间大小是不确定的
- Rust 是如何确认非递归类型的大小？拿枚举举例子，Rust 遍历一遍枚举成员，找出最大者作为枚举的所需空间大小

```rust
enum List {
	Cons(i32, Box<List>),
	Nil,
}

use List::{ Cons, Nil };

fn main() {
	let list = Cons(1, Box::new(Cons(2, Box::new(Nil))));
}
```

# Deref Trait

- 可自定义解引用运算符:`*`的行为
- 智能指针可像常规引用一样来处理

```rust
fn main() {
	let x = 5;
	let y1 = &x;
	let y2 = Box::new(x);

	assert_eq!(5, *y1);
	assert_eq!(5, *y2);
}
```

## 自定义智能指针

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
	fn new(x: T) -> MyBox<T> {
		MyBox(x)
	}
}

impl<T> Deref for MyBox<T> {
	type Target = T;

	// 这里返回引用是因为不希望Box丢失内部值的所有权
	fn deref(&self) -> &T {
		&self.0
	}
}

fn main() {
	let x = 5;
	let y = MyBox::new(x);

	assert_eq!(5, *y);
	// 相当于 *(y.deref()),Rust内部先执行y的deref方法，再进行解引用
}
```

## 函数和方法的隐式 Deref 强制转换

```rust
fn hello(m:&str) {
	println!("Hello {}!", m);
}

fn main() {
	let m = MyBox::new(String::from("Rust"));

	hello(*m);// 这里会进行转换
	// &MyBox<String> -调用MyBox上的deref方法-> &String -调用String上的deref方法-> &str
	// 否则：hello(&(*m){..})
}
```

## Deref 与可变性交互

- Deref Trait 重载不可变引用的`*`符号，DerefMut Trait 重载可变引用的`*`符号
- 转换的三种情况
  - 当 `T: Deref<Target=U>` 时从 `&T` 到 `&U`。
    - 如果有一个 `&T`，而 `T` 实现了返回 `U` 类型的 `Deref`
  - 当 `T: DerefMut<Target=U>` 时从 `&mut T` 到 `&mut U`。
  - 当 `T: Deref<Target=U>` 时从 `&mut T` 到 `&U`。
    - 可能将可变引用变为不可变引用，反之则不可能，这是由引用规则规定的

# Drop trait

- 允许我们自定义智能指针的 drop 函数
- 位于 prelude 中，不用显示引入

```rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer { data: String::from("my stuff") };
    let d = CustomSmartPointer { data: String::from("other stuff") };
    println!("CustomSmartPointers created.");
}
// CustomSmartPointers created.
// Dropping CustomSmartPointer with data `other stuff`!
// Dropping CustomSmartPointer with data `my stuff`!
```

# `Rc<T>`

- 用于启用多所有权，是引用计数的缩写
- 应用场景
  - 需要共享可读数据
  - Rc 只能用于单线程场景
- 方法
  - Rc::new(&self)：生成引用计数类型
  - Rc::clone(&self)：增加引用计数
  - Rc::strong_count(&self)：显示强引用计数
- Rc 使用的是不可变引用，这样就不会违反借用规则导致数据竞争

# 内部可变性与`RefCell<T>`

- 内部可变性允许你在只持有不可变引用的前提下修改数据
  - 内部使用 unsafe 代码绕过 Rust 的可变性和借用规则
- `RefCell<T>`代表了其持有数据的唯一所有权
- 与 Box 和 Rc 在编译时检查不同，RefCell 在运行时检查
- RefCell 只能用于单线程场景

## 使用`RefCell<T>`在运行时记录借用信息

- 两个方法
  - borrow():返回智能指针`Ref<T>`，它实现了 Deref
  - borrow_mut():返回智能指针`RefMut<T>`，它实现了 Deref
- `RefCell<T>`会记录当前存在多少个活跃的`Ref<T>`和`RefMut<T>`智能指针
  - 每次调用 borrow：不可变借用计数加一，任一`Ref<T>`离开作用域被释放，不可变借用计数减一
  - 每次调用 borrow_mut：可变借用计数一，任一`Ref<T>`离开作用域被释放，可变借用计数减一
- 以此来维护借用检查规则
- 优势与损失
  - 在运行时捕获借用错误而不是编译时意味着
    - 将会在开发过程的后期才会发现错误，甚至有可能发布到生产环境才发现，
    - 少量的运行时性能惩罚。
  - 允许在只允许不可变值的上下文中修改自身值

## 结合`Rc<T>`和`RefCell<T>`来拥有多个可变数据所有者

```rust
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));
    let b = Cons(Rc::new(RefCell::new(6)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(10)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
}
```

## 防止内存泄漏的解决办法

- 检查自己逻辑
- 重组数据结构：一些引用表达所有权，一些不表达
  - 循环引用中的一部分具有所有权关系，另一部分不涉及所有权
  - 只有具有所有权关系才影响值的清理
  - 防止循环引用把`Rc<T>`换成`Weak<T>`
    - Rc::clone()为实例的强引用计数+1，Rc 的实例只有在强引用=0 时才被清理
    - Rc 实例通过 Rc::downgrade()创建值的弱引用
      - 返回类型是`Weak<T>`
      - 调用 Rc::downgrade()使 weak_count+=1
      - weak_count!=0 不影响`Rc<T>`实例的清理
  - Strong VS Weak
    - 强引用关于如何分享`Rc<T>`实例的所有权
    - 弱引用不表达该意思，因为在强引用为零时弱引用会自动断开，所以弱引用不会创建循环引用
    - 在使用`Weak<T>`之前，需要保证指向的值仍然存在
      - 在实例上调用 upgrade 方法，返回`Option<Rc<T>>`

# 总结

- 智能指针的`Deref Trait`和`Drop Trait`
  - 前者使我们可以像常规引用一样去使用智能指针，因为会自动执行 deref 方法并进行解引用，并且方法与函数的隐式强制 Deref 转换让我们的代码更简洁
  - 后者可以使我们自定义智能指针离开作用域时的行为(drop 函数)，此 trait 在预导入模块中
- 常用的智能指针：`Box<T>`，`Rc<T>`和`RefCell<T>`
  - Box 使得我们可以在堆上存储数据，因为堆上数据的空间不确定，所以可以依次来创建那些在编译时无法确定大小的数据类型，例如递归类型
    - Box::new()
  - Rc 是引用计数的缩写，它可以使我们共享一个数据的所有权，当强引用计数为零时，Rc 实例会在离开作用域时自动被清除
    - Rc::new()
    - Rc::strong_count()
    - Rc::weak_count()
    - Rc::clone(),使强引用计数+1
    - Rc::downgrade(),使弱引用计数+1
  - RefCell 通过 unsafe 代码使我们获得在值允许不可变引用的上下文中修改自身的值的能力，通过与 Rc 的合作，让我们可以创造多个可变数据所有者。
    - RefCell::new()
    - RefCell::borrow()
    - RefCell::borrow_mut()
  - 如何解决循环引用导致的内存泄漏：使用`Weak<T>`。
    - 循环引用导致值的强引用计数永远不会清零，这样之就会一直存在与内存中从而造成内存泄露
    - 通过将合适的强引用类型变为若引用类型可以防止循环引用导致的内存泄露。这是因为弱引用计数是否为零不会影响资源的释放
    - Weak::new()
    - Weak::upgrade(),查看引用值是否还有效，返回`Option<Rc<T>>`
