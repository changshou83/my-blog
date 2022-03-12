---
title: Docs with VitePress
editLink: true
head:
    - - meta
      - name: description
        content: hello
    - - meta
      - name: keywords
        content: super duper SEO
navbar: true
sidebar: true
---

## 文章内容种类

Guide content

### 显示 markdown formatter

{{ $frontmatter.title }}

### 表格

| Headings      |   Are    |    Centered |
| ------------- | :------: | ----------: |
| left align    | centered | right align |
| zebra striped |   rows   |        easy |

### 表情

:100:

### 代码片段

```js{3-5,10}
function b() {
  let a = 1;
  return function () {
    console.log(a);
  }
}

const c = b();

c();// 1;
```

#### 引入代码片段

<<< @/rust/index.md

##### 支持行高亮

<<< @/rust/index.md{1}
<<< @/rust/index.md#外部代码

### 自定义容器

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOPxxxxxx
Danger zone, do not proceed
:::

### 目录

在 config.js 中启用 toc
[[toc]]

<script setup>
  // 文件内启用组件
  // import CustomComponent from '../components/CustomComponent.vue'
</script>
