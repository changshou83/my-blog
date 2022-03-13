# 模块系统

- 包（Packages）：Cargo 的一个功能，它允许你构建、测试和分享 crate。
- Crates：一个模块的树形结构，它形成了库或二进制项目。
- 模块（Modules）和 use： 允许你控制作用域和路径的私有性。
- 路径（path）：一个命名例如结构体、函数或模块等项的方式

# 包和 Crate

## 含义

- crate 是一个二进制项或者库。
- Package 是提供一系列功能的一个或者多个 crate。

## 规则

- 包的规则
  1.  一个包中至多只能包含一个库 crate(library crate)
  2.  可以包含任意多个二进制 crate(binary crate)
  3.  包中至少包含一个 crate，无论是库的还是二进制的
  4.  一个包会包含有一个 Cargo.toml 文件，阐述如何去构建这些 crate。
- Crate 的规则
  1.  `crate root`是一个源文件，Rust 编译器以它为起始点，并构成你的 crate 的根模块。
  2.  二进制 Crate：src 目录下有 main.rs 文件，main.rs 也是该 Crate 的根文件
  3.  库 Crate：src 目录下有 lib.rs，lib.rs 也是该 Crate 的根文件
  4.  通过将文件放在 src/bin 目录下，一个包可以拥有多个二进制 crate
      - 每个 src/bin 下的文件都会被编译成一个独立的二进制 crate

# 模块

- 定义模块:`mod`
- 声明公有:`pub`
- 定义结构体:`struct`
  - 成员默认私有
- 定义枚举:`enum`
  - 成员默认公有
- 访问模块成员(路径)
  - 相对路径：从当前模块开始，以 `self`、`super` 或当前模块的标识符开头
  - 绝对路径(推荐)：从 crate 根开始，以 crate 名或者字面值 `crate` 开头
  - 涉及到模块树，根模块是 crate
- 规则
  - 父模块不能访问子模块的私有成员
  - 子模块可以访问父模块的所有成员(因为在统一作用域)
- 子模块访问父模块

```rust
mod father {
	fn run() {}
	pub mod son {
		pub fn help() {
			super::run();// 访问父模块成员
		}
	}
	pub struct Daughter {
		pub name: String,
		pub age: i8
	}
	impl Daughter {
		pub fn create(name: &str, age: i8) -> Daughter {
			Daughter {
				name: String::from(name),
				age
			}
		}
	}
	pub enum Appetizer {
		Soup,
		Salad
	}
}
pub fn test() {
	// 绝对路径
	crate::father::son::help();
	// 相对路径
	father::son::help();
	// 访问公有结构体
	let mut daughter = father::Daughter::create("alice", 0);
	// 定义枚举
	let order1 = father::Appetizer::Soup;
    let order2 = father::Appetizer::Salad;
}
```

# use

- 语法:`use path`
- 习惯用法
  - 函数:引入父级模块
  - 结构体，枚举:引入本身
    - 不同模块同名条目
      - 指定到父级
      - 也可以使用 as 定义别名

```rust
use std::fmt;
use std::io;
// use std::io::Result as IoResult

fn f1() -> fmt::Result {}
fn f2() -> io::Result {}
// fn f2() -> IoResult {}

fn main() {}
```

- use 引入的模块默认私有，可以使用 pub 关键字声明为公有的。这样的操作被称为重导出
- 使用外部包：在`Cargo.toml`中的`[dependencies]`下添加`name= "version"`
- 嵌套路径
  - `use std::{cmp::Ordering, io};`
  - `use std::io::{self, Write};`
- 全局引入:`use std::collections::*`,将 `std::collections` 中定义的所有公有项引入当前作用域
  - glob 运算符经常用于测试模块 `tests` 中，这时会将所有内容引入作用域

# 根据模块拆分文件

```rust
// src/lib.rs
mod brother;// 注意分号
mod father;
// src/brother.rs
pub mod brother {}
// src/father.rs
pub mod son;// 嵌套模块，注意依赖树与文件目录结构相同
// src/father/son.rs
pub mod son {}
```

# crates.io 换源

1. 在`C:\Users\currentUser\.cargo`下新建`config`文件
2. 填入以下内容

```html
[source.crates-io] registry = "https://github.com/rust-lang/crates.io-index" #
指定镜像 replace-with = 'ustc' # 如：tuna、sjtu、ustc，或者 rustcc #
注：以下源配置一个即可，无需全部 # 中国科学技术大学 [source.ustc] registry =
"git://mirrors.ustc.edu.cn/crates.io-index" # 上海交通大学 [source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index" # 清华大学
[source.tuna] registry =
"https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git" # rustcc社区
[source.rustcc] registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
[http] check-revoke = false # 解决ustcs说的报错:next InitializeSecurityContext
failed: Unknown error [net] git-fetch-with-cli = true #
https://zhuanlan.zhihu.com/p/126199511(解决git私服问题)
```
