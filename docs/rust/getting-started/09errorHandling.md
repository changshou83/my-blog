# 概述

- Rust 的可靠性：错误处理
- 错误的分类
  - 可恢复的错误：例如文件未找到，可再次尝试
  - 不可恢复的错误：bug，例如数组越界
- 处理错误
  - 可恢复的错误：Result<T, E>
  - 不可恢复的错误：panic!()宏

# 不可恢复的错误

- 应对 panic！，当 panic！发生时
  - 程序展开调用栈
    - Rust 沿着调用栈走，并清理每个遇到的函数中的数据
  - 立即终止调用栈
    - 直接停止程序，有 OS 进行内存清理操作
- 想要最终的二进制文件更小，把设置从“展开”改为“终止”
  - 在 Cargo.toml 中`[profile]`部分设置
    - panic = 'abort'
  - 在 release 模式中 panic 时直接终止
    - `[profile.release] panic = 'abort'`
- 使用 panic!产生的回溯信息
  - panic!可能会出现在我们的代码或者我们所依赖的代码中
  - 可以通过 panic!的回溯信息来定位引起问题的代码
  - 做法:设置环境变量`RUST_BACKTRACE`,在 shell 中输入`set RUST_BACKTRACE=0`

# Result 枚举与可恢复的错误

## 使用 match

```rust
let f = File::open("hello.txt");

let f = match f {
	Ok(file) => file,
	Err(error) => match error.kind() {
		ErrorKind::NotFound => match File::create("hello.txt") {
			Ok(fc) => fc,
			Err(e) => panic!("Problem creating the file: {:?}", e),
 		},
		other_error => panic!("Problem opening the file: {:?}", other_error),
	},
};
```

## 简写 match

```rust
let f = File::open("hello.txt").expect("Failed to open hello.txt");
```

## 传播错误

```rust
let f = File::open("hello.txt");
let mut f = match f {
	Ok(file) => file,
	Err(e) => return Err(e),
};

let mut s = String::new();
match f.read_to_string(&mut s) {
	Ok(_) => Ok(s),
	Err(e) => Err(e),
}
```

### ？运算符

```rust
// 使用?运算符简写错误传播
// 若值是Ok，那么表达式的返回值为Ok中的值;若值是Err，那么将Err作为整个函数的返回值
let mut f = File::open("hello.txt")?;
let mut s = String::new();
f.read_to_string(&mut s)?;
Ok(s)
```

#### ?只能用在返回值为 Result 的函数

```rust
use std::error::Error;
// 目前可以理解 Box<dyn Error> 为使用 ? 时 main 允许返回的 “任何类型的错误”
fn test() -> Result<(), Box<dyn Error>> {
 let f = File::open("hello.txt")?;
 Ok(())
}
```

#### 链式调用

```rust
let mut s = String::new();
File::open("hello.txt")?.read_to_string(&mut s)?;
Ok(s)
```

# 何时使用 panic!

- 总体原则
  - 优先考虑 Result
  - 否则就 panic!
- 编写示例，原型代码，测试
  - 演示概念:unwrap
  - 原型代码:unwrap,expect
  - 测试:unwrap,expect
- 指导性建议(使用 panic!的场景)
  - 调用你的代码，传入无意义的参数值
  - 调用外部不可控代码，返回非法状态，你无法修复
  - 当你的代码对值进行操作，首先应该验证这些值，如验证失败，使用 panic!
- 若你的失败是可预期的则使用 Result

## 为验证创建自定义类型

```rust
// 将有效性检查封装入结构体中
struct Guess {
	value: i32,
}

impl Guess {
	pub fn new(value: i32) -> Guess {
		if value < 1 || value > 100 {
			panic!("Guess value must be between 1 and 100, got {}.", value);
		}

		Guess {
			value
		}
	}
	pub fn value(&self) -> i32 {
		self.value
	}
}

fn main() {
	let guess = Guess::new(32);
}
```
