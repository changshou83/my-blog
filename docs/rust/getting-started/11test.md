# 测试是用来干嘛的

- Rust 的编译器可以进行类型检查和借用检查以保证内存安全
- 但他不能检查的是，这个函数的功能是否是符合我们预期的
- 所以需要编写测试以保证代码的行为符合我们的预期

# 编写测试

测试函数体通常执行如下三种操作：

1. 设置任何所需的数据或状态
2. 运行需要测试的代码
3. 断言其结果是我们所期望的

## 剖析测试函数

- 测试就是一个带有 `test` 属性注解的函数
- 属性（attribute）是关于 Rust 代码片段的元数据
- 使用`cargo test`运行测试并获知测试结果

```bash
cargo new adder --lib
cd adder
```

在 src/lib.rs 文件中写入测试函数

```rust
#[cfg(test)]
mod tests {
	#[test]
	fn it_works() {
		assert_eq!(2 + 2, 4);
	}

	#[test]
	fn another() {
		panic!("Make this tes fail");// 使用panic!宏使测试失败
	}
}
```

## 使用 assert!宏对结果进行检查

- 接受一个布尔值，如果为 true 什么都不会做，如果为 false，则会调用 panic!

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle { width: 8, height: 7 };
        let smaller = Rectangle { width: 5, height: 1 };

        assert!(larger.can_hold(&smaller));
    }

	#[test]
	fn smaller_cannot_hold_larger() {
		let larger = Rectangle { width: 8, height: 7 };
		let smaller = Rectangle { width: 5, height: 1 };
		assert!(!smaller.can_hold(&larger));
	}
}
```

## 测试相等

```rust
pub fn add_two(a: i32) -> i32 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        assert_eq!(4, add_two(2));
    }
	fn it_not_adds_two() {
		assert_ne!(5, add_two(2));
	}
}
```

- 底层使用`==`和`!=`，所以需要比较双方实现了 PartialEq Trait
- 又因为会在失败时打印错误信息，所以还需要实现 Debug Trait

## 自定义错误信息

- 自定义信息有助于记录断言的意义

```rust
pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}

#[test]
fn greeting_contains_name() {
    let result = greeting("Carol");
    assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was `{}`", result
    );
}
```

## 使用 should_panic 注解

- 了解该 panic 是否符合我们的预期

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
			panic!("Guess value must be greater than or equal to 1, got {}.", value);
		} else if value > 100 {
			panic!("Guess value must be less than or equal to 100, got {}.", value);
		}

        Guess {
            value
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }
}

```

## 将 Result<T, E>用于测试

- 在测试时除了直接 panic!，还可以返回 Result，这样就可以使用?运算符

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```

# 控制测试运行

- `cargo test --help`提示 `cargo test` 的有关参数
- `cargo test -- --help`提示在分隔符 `--` 之后使用的有关参数

## 并行和顺序的测试

- 默认并行
  - 确保测试不能相互依赖
  - 不能依赖任何共享的状态，包括依赖共享的环境，比如当前工作目录或者环境变量
- 控制线程的数量
  - 传递 `--test-threads` 参数和希望使用线程的数量给测试二进制文件
  - `cargo test -- --test-threads=number`
- 期望能看到通过的测试中打印的值
  - 截获输出的行为可以通过 `--nocapture` 参数来禁用
  - `cargo test -- --nocapture`

## 按名称进行测试

```bash
cargo test fullname 运行单个测试
cargo test matchword 运行多个测试
```

## 忽略测试

```rust
#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}

#[test]
#[ignore]
fn expensive_test() {
    // 需要运行一个小时的代码
}
```

- 添加`#[ignore]`标注
- 运行`cargo test -- --ignore`

# 测试的组织结构

- 分类
  - 单元测试
  - 集成测试
- 单元测试
  - 一次对一个模块进行隔离的测试
  - 可测试 private 接口
- 集成测试
  - 只能使用 public 接口
  - 可能在每个测试中使用到多个模块
  - 在库外部，会像其他外部代码一样使用你的代码

## 单元测试

### `[cfg(test)]`标注

- tests 模块上的标注
  - 只有运行 cargo test 才会编译和运行
  - cargo build 则不会
- 集成测试不需要该标注
- cfg:告诉 Rust 下面的条目只有在指定的配置选项下才会被包含
- test:由 Rust 提供，用来编译和运行测试

```rust
#[cfg(test)]
mod tests {
	#[test]
	fn it_works() {
		assert_eq!(2 + 2, 4);
	}
}
```

## 集成测试

- 集成测试完全位于被测试库的外部
- 目的:测试被测试库的多个部分是否能正常的一起工作

### tests 目录

- tests 目录就是集成测试的目录
- 目录下的每个测试文件都是单独的 crate，**需要将被测试库导入**
- 无需标注#[cfg(test)],只有 cargo test 才会编译 tests 目录

### 运行指定的集成测试

```bash
cargo test --test filename
```

### 子模块

- tests 目录下的目录不会被当成测试文件进行编译，可以在其中写一些帮助函数

### 针对二进制 Crate 的集成测试

- 如果项目是 binary crate
  - 不能再 tests 目录下创建集成测试
  - 无法把 mian.rs 的函数导入作用域
- 只有 binary crate 才能暴露函数给其他 crate 用
- binary crate 只能独立运行
