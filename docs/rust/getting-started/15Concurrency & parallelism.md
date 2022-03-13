# 序

- 随着计算机多处理器的出现与发展，并发编程愈发重要
- 并发(Concurrent),程序的不同部分**独立**执行
- 并行(Parallel),程序的不同部分**同时**执行
- Rust 提供多种工具用于安全且高效地处理并发编程

# 使用线程

- 在操作系统中，程序运行在一个进程中，在程序内部，拥有多个同时运行的独立部分，这些被称为线程。
- 使用线程可以提升性能，因为线程可以并发地执行任务，这也会带来一些问题：
  - 数据竞争
  - 死锁
  - 只会发生在特殊情况下的难以重现的 bug
- 实现线程
  - 1:1，一编程语言线程对应一操作系统线程，较小的运行时
  - M:N，M 个编程语言线程对应 N 个操作系统线程，较大的运行时
  - 因为 Rust 需要做到较小运行时，所以官方提供 1:1，但社区有 M:N 的 crate

## 创建线程

- 使用 std::thread::spawn(f: F)创建一个子线程，其返回值时 JoinHandle 类型。
- 调用 JoinHandle 的 join 方法可以使得主线程被暂停直至子线程被执行完

## move 闭包与线程

- move 可以将闭包所处环境值的所有权强制传入闭包
- 因此可以让线程访问另一个线程

```rust
use std::thread;

fn main() {
	let v = vec![1, 2, 3];

	let handle = thread::spawn(move || {
		println!("Here's a vector: {:?}", v);
	})

	// drop(v); // 这里不能再执行drop函数，因为v的所有权已经不再此处

	handle.join().unwrap();
}
```

# 消息传递

- 通过通信来共享内存

# 使用流实现消息传递。

- 发送者在上游
- 接收者在下游

```rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();// 建立通道

thread::spawn(move || {
	let m = String::from("hi");
	tx.send(m).unwrap();// send将m所有权传出闭包
});

let received = rx.recv().unwrap();// 阻塞主线程执行直到从通道中接收一个值
println!("{}", received);
```

## 多生产者对应一个消费者

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();// 克隆tx获取第二个生产者
thread::spawn(move || {
	let m = String::from("hi");
	tx.send(m).unwrap();
});
thread::spawn(move || {
	let ms = vec![
		String::from("more"),
		String::from("messages"),
		String::from("for"),
		String::from("you"),
	]

	for m in ms {
		tx1.send(m).unwrap();
		thread::sleep(Duration::from_secs(1));
	}
});

for received in rx {
	println!("Got: {}", received);
}
```

# 共享状态

- 通过共享内存来通信

## 互斥锁

- 任意时刻，只允许一个线程访问某些数据。
- 锁：一个作为互斥器一部分的数据结构，它记录谁有数据的排他访问权
- 使用
  1.  使用数据前获取锁
  2.  使用数据后解锁
- Rust 提供的互斥锁：`Mutex<T>`
  - Mutex::new(val);
  - m.lock():获取锁，返回一个叫做 `MutexGuard` 的智能指针
    - 实现了 `Deref` 来指向其内部数据
    - 实现了 `Drop` 使得`MutexGuard`离开作用域时自动释放锁

```rust
use std::sync::Mutex;

let m = Mutex::new(5);// 创建互斥锁，传入需要保护的数据

{
	let mut num = m.lock().unwrap();// 返回Result<Ok, Err>
	*num += 10;
}// 自动释放锁

println!("m = {:?}", m);
```

### 线程间共享`Mutex<T>`

- 这涉及到多线程和多所有权
- 因为`Rc<T>`只适用于单线程，所以引入一个新的类型`Arc<T>`
- 原子引用计数：atomically reference counted，api 与 Rc 一样，不同的是可以安全的在线程间共享

```rust
use std::sync::{Mutex, Arc};
use std::time::Duration;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
	let counter = Arc::clone(&counter);
	let handle = thread::spawn(move || {
		let mut num = counter.lock().unwrap();
		*num += 1;
	});
	handles.push(handle);
}

for handle in handles {
	handle.join().unwrap();
}

println!("Result: {}", *counter.lock().unwrap());
```

### `RefCell<T>`/`Rc<T>` 与 `Mutex<T>`/`Arc<T>` 的相似性

- `Mutex<T>`提供了内部可变性，与 Cell 家族一样
- 我们使用`RefCell<T>`来改变`Rc<T>`里面的内容
- 我们使用`Mutex<T>`来改变`Arc<T>`里面的内容
- 注意：`Mutex<T>`有死锁风险

# 可扩展并发

- 语言本身没有多少与并发相关的特性，基本全靠标准库。所以也可以自实现并发功能。
- 两个内嵌于语言中的并发概念：`std::marker` 中的 `Sync` 和 `Send` trait
- 在多线程场景下
  - send 表明所有权可传递
    - 通过通讯共享内存
  - sync 保证所有权的引用可以安全的传递于多个线程中
    - 通过共享内存进行通讯

## Send

- `Send` 标记 trait 表明类型的所有权可以在线程间传递。
  - `Arc<T>`是 Send 的，`Rc<T>`不是
- 任何完全由 `Send` 的类型组成的类型也会自动被标记为 `Send`。(没懂)
- 几乎所有基本类型都是 `Send` 的，除了裸指针

## Sync

- `Sync` 标记 trait 表明类型可以安全的在多个线程中拥有其值的引用。
  - - `Mutex<T>`是 Sync 的，`RefCell<T>`不是
- 对于任意类型 `T`，如果 `&T`是 `Send` 的话 `T` 就是 `Sync` 的
  - 意味着其引用就可以安全的发送到另一个线程
- 任何完全由 `Sync` 的类型组成的类型也会自动被标记为 `Sync`。

## 注意

- 手动实现 `Send` 和 `Sync` 是不安全的
- 通常并不需要手动实现 `Send` 和 `Sync` trait
  - 由 `Send` 和 `Sync` 的类型组成的类型，自动就是 `Send` 和 `Sync` 的

# 总结

- Rust 提供了
  - 用于消息传递的通道
  - 可以安全的用于并发上下文的智能指针
- 类型系统和借用检查器会确保代码不会出现数据竞争和无效的引用
