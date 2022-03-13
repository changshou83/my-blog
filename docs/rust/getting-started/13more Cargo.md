# 采用发布配置自定义构建

- 两种主要配置
  - cargo build 运行的 dev 配置
  - cargo build --release 运行的 release 配置
- 在`Cargo.toml`中无`[profile.*]`部分时采用默认配置
- 覆盖默认配置
  - `[profile.dev]`
  - `[profile.release]`

# 将 crate 发布

## 编写有用的文档注释

- Rust 有特定的用于文档的注释类型，通常被称为文档注释，他们会生成 HTML 文档。
- 文档注释使用三斜杠 `///` 以支持 Markdown 注解来格式化文本
- 文档注释就位于需要文档的项的之前

````rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ```
pub fn add_one(x: i32) -> i32 {
    x + 1
}
````

- 运行`cargo doc --open`构建当前文档

### 常用部分

- example
- panics
- errors
- safety

## 使用 pub use 导出合适的公有 API

- src/lib.rs

```rust
//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    /// The primary colors according to the RYB color model.
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// The secondary colors according to the RYB color model.
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}

pub mod utils {
    use crate::kinds::*;

    /// Combines two primary colors in equal amounts to create
    /// a secondary color.
    pub fn mix(c1: PrimaryColor, c2: PrimaryColor) -> SecondaryColor {
        // --snip--
        SecondaryColor::Orange
    }
}
fn main() {}
```

- src/main.rs

```rust
// 使用pub use之前，使用者不得不知道crate的结构
use art::kinds::PrimaryColor;
use art::utils::mix;

fn main() {
    let red = PrimaryColor::Red;
    let yellow = PrimaryColor::Yellow;
    mix(red, yellow);
}

// 使用pub use 之后
use art::PrimaryColor;
use art::mix;

fn main() {
    // --snip--
}

```

## crate.io

### 创建账号

- 使用 github 账号登录并在`https://crate.io/me/`页面获取 API Token
- 运行`cargo login yourApiToken`

### 发布 crate 之前

- 添加源信息
  示例

```toml
[package]
name = "guessing_game"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"
description = "A fun game where you guess what number the computer has chosen."
license = "MIT OR Apache-2.0"

[dependencies]

```

### 发布

- 发布 crate 时请多加小心，因为发布是永久性的。对应版本不可能被覆盖，其代码也不可能被删除。

```bash
cargo publish
```

### 更新版本

- 修改 Cargo.toml 里的 version 信息然后`cargo publish`

### 撤回版本

- 撤回

```bash
cargo yank --vers targetVersion(exp:1.0.1)
```

- 撤回撤回的命令

```bash
cargo yank --vers targetVersion(exp:1.0.1) --undo
```

# 工作空间

- 项目

```toml
[workplace]
members = [
	"adder",
	"add-one"
]
```

创建子项目

```bash
cargo new adder
cargo new add-one --lib
```

- 子项目依赖其他子项目

```toml
[dependencies]
add-one = { path = "../add-one" }
```

- 运行指定包

```bash
cargo run -p crateName
caro test -p crateName
```

# 从 Crates.io 安装二进制文件

```bash
cargo install crateName
cargo uninstall crateName
```
