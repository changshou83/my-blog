# 泛型

## 定义

- 泛型：软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，也能支持未来的数据类型，
- 在创建大型系统时为你提供了十分灵活的功能。可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以用自己的数据类型来使用组件。
- 概括的说：泛型就是解决 类 接口 方法的复用性，以及对不特定数据类型的支持

## 理解泛型

- 使用泛型支持多个类型(number, string)

```ts
function getData(value: T): T {
  return value;
}
getData(123);
getData('这是一个泛型');
```

## 泛型类

- 使用泛型从而支持多类型的类(number, string)
- 比如有个最小堆算法， 需要同时支持返回数字和字符串两种类型。 通过类的泛型来实现

```ts
class MinClass {
  public list: T[] = [];
  add(num: T) {
    this.list.push(num);
  }
  min(): T {
    var minNum = this.list[0];
    for (let i = 0; i < this.list.length; i += 1) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}
```

### 泛型类的扩展

- 类也可以使用泛型来表示(User，Article)

:::details

```ts
class MySQLDb {
  add(user: T): boolean {
    console.log(user);
    return true;
  }
}
// User
class User {
  username: string | undefined;
  password: string | undefined;

  constructor(params: {
    username: string | undefined;
    password: string | undefined;
  }) {
    this.username = params.username;
    this.password = params.password;
  }
}
const u = new User({ username: '张三', password: '123456' });
const Db1 = new MySQLDb();
Db1.add(u);
// Article
class ArticleCate {
  title: string | undefined;
  desc: string | undefined;
  status: number | undefined;

  constructor(params: {
    title: string | undefined;
    desc: string | undefined;
    status?: number | undefined;
  }) {
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }
}
const a = new ArticleCate({ title: '张三', desc: '123456', status: 1 });
var Db2 = new MySQLDb();
Db2.add(a);
```

:::

## 泛型接口

- 使用泛型从而支持多类型的接口(number, string)

```ts
interface Config {
  (value: T): T;
}
const myFn: Config = (value: T) => {
  return value;
};
myFn('20'); // 20
```

## 案例

- 目的：综合使用接口和泛型
- 功能：定义一个操作数据库的类 支持 Mysql Mssql MongoDb
- 要求 1：Mysql Mssql MongoDb 功能一样 都有 add update delete get 方法

:::details

```ts
interface DBI {
  add(info: T): boolean;
  updated(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}

class MysqlDb implements DBI {
  constructor() {
    console.log('和数据库建立连接');
  }
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  updated(info: T, id: number): boolean {
    throw new Error('Method not implemented.');
  }
  delete(id: number): boolean {
    throw new Error('Method not implemented.');
  }
  get(id: number): any[] {
    throw new Error('Method not implemented.');
  }
}

class MssqlDb implements DBI {
  constructor() {
    console.log('和数据库建立连接');
  }
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  updated(info: T, id: number): boolean {
    throw new Error('Method not implemented.');
  }
  delete(id: number): boolean {
    throw new Error('Method not implemented.');
  }
  get(id: number): any[] {
    throw new Error('Method not implemented.');
  }
}

class User {
  username: string | undefined;
  password: string | undefined;
}

var u = new User();
u.username = '张三';
u.password = '123456';
// var oMysqlDb = new MysqlDb();
// oMysqlDb.add(u);
// var oMssql = new MssqlDb();
// oMssql.add(u);
```

:::
