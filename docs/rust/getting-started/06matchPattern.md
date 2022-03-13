# 枚举

## 与结构体

相对于结构体来说，枚举更简洁，并且可以将数据直接放入成员中(结构体只能定义类型)

```rust
enum IpAddrKind {
	V4,
	V6
}
struct IpAddr1 {
	Kind: IpAddrKind,
	address: String
}
// 上面与下面效果一样
enum IpAddr2 {
	V4(u8,u8,u8,u8),
	V6(String)
}
fn main() {
	let home1 = IpAddr1 {
		kind: IpAddrKind::V4,
		address: String::from("127.0.0.1");
	}
	let home2 = IpAddr::V4(127,0,0,1);
}
```

- 枚举也可以像结构体一样带方法

```rust
enum Message {
	Write(String)
}
impl Message {
	fn call(&self) {}
}
fn main() {
	let message = Message::Write(String::from("hello"));
	message.call();
}
```

## option 枚举

- rust 中没有 null，但有 null(空值)的概念：`Option<T>`
- option 枚举在标准库中的定义

```rust
enum Option<T> {
	Some<T>, // 非空值
	None,    // 空值
}
```

- 使用 option 枚举
  - option 在预加载中，所以不用显示引用

```rust
fn main() {
	let some_number = Some(5);
	// 定义None时需要指定类型，因为编译器不能根据None来进行类型推断
	let absent_number: Option<i32> = None;
}
```

- 与 null 的优势 1.不再担心会错误的假设一个非空值，会让你对代码更加有信心 2.限制空值的泛滥以增加 Rust 代码的安全性
  - 解释
    - 只有使用了 option 的值需要考虑是否为空，其他值不需要考虑
    - 在进行 T 和`Option<T>`的运算前需要将`Option<T>`转换为 T，在转换的时候会捕获到常见问题
    - 另一个视角
    - 为了拥有一个可能为空的值，你必须要显式的将其放入对应类型的`Option<T>`中。
    - 接着，当使用这个值时，必须明确的处理值为空的情况。
- 示例

```rust
fn main() {
	let x: i8 = 5;
	let y:Option<i8> = Some(5);

	let sum = x + y;// 会报错，因为Option<i8>与i8是不同的数据类型
	let sum = x + y.unwrap();// 这样就可以
}
```

# match 控制流

- match 允许我们将一个值与一系列的模式相比较，并根据相匹配的模式执行相应代码。
- 模式可由字面值、变量、通配符和许多其他内容构成

```rust
enum UsState {
 Alabama,
 Alaska,
}

enum Coin {
 Penny,
 Quarter(UsState),
}

fn plus_one(x:Option<i32>) -> Option<i32> {
	match x {
		Some(i) => Some(i+1),
		None => None,
	}
}

fn main() {
	let coin = Coin::Quarter(UsState::Alaska);
	match coin {
		Coin::Penny => 1,
		Coin::Quarter(state) => {
			println!("{}",state);
			25
		}
	}
	let five = Some(5);
	let six = plus_one(five);
	let none = plus_one(None);
}
```

- match 必须穷举所有可能，拿 option 举例，如果你忘记处理 none，他会提醒你没处理
- 通配符与`_`，有风险，比如 None 被忽略

```rust
fn main() {
	let dice_roll = 9;
	match dice_roll {
		3 => add_fancy_hat(),
		7 => remove_fancy_hat(),
		// other => move_player(other),// 通配，涵盖所有其他可能
		_ => (),// 忽略所有其他可能
	}
}
```

# if let 控制流

- match 的语法糖：处理只匹配一个模式的值而忽略其他模式的情况
- 与 match
  - 好处:使用 if let 意味着编写更少代码，更少的缩进和更少的样板代码
  - 坏处:会失去 match 强制要求的穷尽性检查
  - 选择:依赖特定的环境以及增加简洁度和失去穷尽性检查的权衡取舍

```rust
#[derive(Debug)]
fn main() {
	let mut count = 0;
	let coin = Coin::Quarter(UsState::Alaska);
	// match coin {
 	//     Coin::Quarter(state) => println!("State quarter from {:?}!", state),
 	//     _ => count += 1,
 	// }
 	// 下面的代码与上面效果一样
 	if let Coin::Quarter(state) = coin {
 		println!("State quarter from {:?}!", state);
 	} else {
 		count += 1;
 	}
}
```
