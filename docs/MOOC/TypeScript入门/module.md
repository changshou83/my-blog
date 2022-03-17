# 外部模块

## 定义

- 模块：模块在自身的作用域里执行，而不是在全局作用域里。这意味着定义在一个模块里的变量，函数，类，接口等的时候，你必须先将它们导出再导入他们。

## 代码示例

- 用上章的案例改造成模块化
- 案例：综合使用接口和泛型
  - 功能：定义一个操作数据库的类 支持 Mysql Mssql MongoDb
  - 要求
    1. Mysql Mssql MongoDb 功能一样 都有 add update delete get 方法
  - 注意：约束统一的规范以及代码重用
  - 解决方案：需要约束规范所以要定义接口，需要代码重用所以用到泛型

### modules

- 新建一个 modules 文件夹里面放操作数据库的类

#### db

- 新建文件 db.ts

```ts{8, 19}
interface DBI{
  add(info:T):boolean;
  updated(info:T, id:number):boolean;
  delete(id:number):boolean;
  get(id:number):any[];
}

export class MysqlDb implements DBI{
  constructor(){ console.log('和数据库建立连接'); }
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  updated(info: T, id: number): boolean { throw new Error("Method not implemented."); }
  delete(id: number): boolean { throw new Error("Method not implemented."); }
  get(id: number): any[] { throw new Error("Method not implemented."); }
}
　　
export class MssqlDb implements DBI{
  constructor(){ console.log('和数据库建立连接'); }
  add(info: T): boolean {
    console.log(info);
    return true;
  }
  updated(info: T, id: number): boolean { throw new Error("Method not implemented."); }
  delete(id: number): boolean { throw new Error("Method not implemented."); }
  get(id: number): any[] { throw new Error("Method not implemented."); }
}
```

### model

- 新建一个 model 文件夹，里面放数据库里的表

#### user

- 新建 user.ts

```ts{1, 7}
import { MysqlDb } from '../modules/db' // 导入db.ts

class UserClass{
  username:string | undefined;
  password:string | undefined;
}
　　
var UserModel = new MysqlDb();

export { UserClass, UserModel } //导出
```

#### article

- 新建 artical.ts

```ts{1, 20}
import { MssqlDb } from '../modules/db' // 导入db.ts

interface ArticalParams {
  title:string | undefined;
  desc:string | undefined;
  status?:number | undefined;
}

class ArticleCateClass {
  title:string | undefined;
  desc:string | undefined;
  status:number | undefined;
　　
  constructor(params: ArticalParams) {
    this.title = params.title;
    this.desc = params.desc;
    this.status = params.status;
  }
}
　　
var ArticleCateModel = new MssqlDb();
　　
export { ArticleCateClass, ArticleCateModel } //导出
```

### main

- 根目录下 main.ts

```ts{1-2}
import { UserClass, UserModel } from './model/user'
import { ArticleCateClass, ArticleCateModel } from './model/article'
　　
// 向User表添加数据　　
var u = new UserClass();
u.username = '张三';　　
u.password = '123456';
　　
UserModel.add(u);
　　
// 向ArticleCate表添加数据
var a = new ArticleCateClass({
  title: 'TypeScript实战',
  desc: 'hhh',
  status: 1
});

ArticleCateModel.add(a);
```
