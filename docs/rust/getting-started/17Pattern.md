# 序

- 模式用来匹配类型中的结构
- 结合使用模式和 `match` 表达式以及其他结构可以提供更多对程序控制流的支配权
- 要处理的数据
  - 字面值
  - 解构的数组、枚举、结构体或者元组
  - 变量
  - 通配符
  - 占位符

# 会用到模式的位置

## match 分支

- 需要穷举

```rust
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
	other => other_operate(other),// 通配
	_ => (),// 忽略其他可能
}
```

## if let 条件表达式

- 更灵活的简写 match
- 不检查穷举

```rust
// 结合 if let、else if、else if let 以及 else
fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {}, as the background", color);
    } else if is_tuesday {
        println!("Tuesday is green day!");
    } else if let Ok(age) = age {
        if age > 30 {
            println!("Using purple as the background color");
        } else {
            println!("Using orange as the background color");
        }
    } else {
        println!("Using blue as the background color");
    }
}
```

## while let 条件循环

```rust
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

// 有值就打印
while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

## for 循环

```rust
let v = vec!['a', 'b', 'c'];

for (index, value) in v.iter().enumerate() {
    println!("{} is at index {}", value, index);
}
```

## let 语句

```rust
let PATTERN = EXPRESSION;
let (x, y, z) = (1, 2, 3);
```

## 函数参数

```rust
fn foo(x: i32) {
    println!("{}",x);
}
fn main() {
	foo(5);//x=5
}
```

# 可反驳性：模式是否会匹配失败

- 模式有两种形式
  - 不可反驳的:能匹配任何传递的可能值的模式
    - 函数参数,let,for 只接受不可失败的模式
  - 可反驳的:对某些可能的值进行匹配会失败的模式
    - if let 和 while let 接受两种模式，但是在可能匹配失败时会警告
  - `match`匹配分支必须使用可反驳模式，除了最后一个分支需要使用能匹配任何剩余值的不可反驳模式

# 模式语法

## 匹配字面值

```rust
let x = 1;

match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("anything"),
}
```

## 匹配命名变量

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x { // Some(5)进入match作用域
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),// Some匹配成功,y=5
		// 要是想要y不被覆盖可以使用守卫
		// Some(n) if n == y => println!("{}", n),//如果x==y(10),输出x里的值
        _ => println!("Default case, x = {:?}", x),
    }// 离开match作用域

    println!("at the end: x = {:?}, y = {:?}", x, y);// Some(5), 10
}
```

## 多个模式

```rust
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    _ => println!("anything"),
}
```

## 匹配范围值

```rust
let x = 5;
let y = 'c';// 范围只允许用于数字或 char 值

match x {
    1..=5 => println!("one through five"),// 1 | 2 | 3 | 4 | 5
    _ => println!("something else"),
}
match y {
	'a'..='j' => println!("early ASCII letter"),
	'k'..='z' => println!("late ASCII letter"),
	_ => println!("something else"),
}
```

## 解构

```rust
struct Point {
    x: i32,
    y: i32,
}
enum Situation {
	TwoD(i32, i32),
	ThreeD(i32, i32, i32),
}
enum Message {
	Quit,
	Move (Situation),
	Write(String),
	ChangeColor(i32, i32, i32),
}

fn main() {
	// 解构结构体和元组
	let ((feet, inches), Point {x, y}) = (
		(3, 10),
		Point { x: 3, y: -10
	);

	// 解构结构体
    let p = Point { x: 0, y: 7 };
	match p {
		Point { x, y: 0 } => println!("On the x axis at {}", x),
		Point { x: 0, y } => println!("On the y axis at {}", y),// √
		Point { x, y } => println!("On neither axis: ({}, {})", x, y),
	}

    let Point { x: a, y: b } = p;
	// 解构枚举
	let msg = Message::ChangeColor(0, 160, 255);
	match msg {
		Message::Quit => {
			println!("The Quit variant has no data to destructure.")
		}
		//Message::Move { x, y } => println!( "{},{}", x, y ),// 匹配结构体
		Message::Move(Situation::TwoD(x, y)) => println!("{},{}", x,y),
		Message::Move(Situation::ThreeD(x, y, z)) => {
			println!("{},{},{}", x,y,z);
		},
		Message::Write(text) => println!("Text message: {}", text),
		Message::ChangeColor(r, g, b) => {
			println!( "red {}, green {}, and blue {}", r, g, b )
		}
	}
}

```

## 忽略

- 使用 `_` 忽略所有值

```rust
// 在函数签名中使用 _
// 需要特定类型签名但是函数实现并不需要某个参数时会有用
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}

fn main() {
	// 通过在名字前以一个下划线开头来忽略未使用的变量
	let _x = 5;// 仍然会绑定变量，但 _ 不会绑定
    foo(3, 4);// 3 会被忽略

	let mut setting_value = Some(5);
	let new_setting_value = Some(10);

	// 当不需要 Some 中的值时在模式内使用下划线来匹配 Some 成员
	match (setting_value, new_setting_value) {
    	(Some(_), Some(_)) => {
        	println!("Can't overwrite an existing customized value");
    	},
		(first, _) => {
			println!("first number: {}", first);
		},
    	_ => {
        	setting_value = new_setting_value;
    	}
	}
	println!("setting is {:?}", setting_value);
}

```

- 使用 `..` 忽略**所剩部分**的值

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {}, {}", first, last);// 2 32
        },
    }
	match numbers {
		(fitst, .., four, last) => {},// 无歧义的 ..
		(first, .., third, .., last) => {},// 有歧义的 ..，Rust不知道third
	}
}
```

## 匹配守卫

- 匹配守卫是一个指定于 `match` 分支模式之后的额外 `if` 条件
- 用于表达比单独的模式所能允许的更为复杂的情况

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(n) if n == y => println!("Matched, n = {}", n),// 使用Guard
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {}", x, y);
}

```

## `@`绑定

- 允许我们在创建一个存放值的变量
- 同时测试其值是否匹配模式
- 使用 `@` 可以在一个模式中同时测试和保存变量值。

```rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    Message::Hello { id: 10..=12 } => {
		// 这里不能用 id
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
		// 要有兜底的
        println!("Found some other id: {}", id)
    },
}
```

# 总结

- 模式帮助我们区分不同类型的数据
  - 字面值/变量/通配符/占位符
  - 解构的数组、枚举、结构体或者元组
- 当用于`match`语句时,Rust 确保模式会包含每一个可能的值,否则程序将不能编译
- `let` 语句和函数参数的模式使得这些结构更强大
- 在将值解构为更小部分的同时为变量赋值
  - 解构(数组/元组/枚举/结构体)
  - 嵌套解构
- 可以创建简单或复杂的模式来满足我们的要求
  - 忽略(全部值: `_`/部分值: `..`)
    - 不能忽略结构体
  - 匹配守卫(访问外部作用域的变量)
  - `@`绑定(在存放值的同时进行测试)
