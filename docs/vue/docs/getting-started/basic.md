# 起步基础

## 开始

### Option & Composition

- 同一底层系统的两套接口
- Option 以 组件实例(this) 为中心，更适合面向对象编程
- Composition 以 响应式数据(data) 为中心，更适合函数式编程
- option 对新手更友好，composition 更灵活，使得组织和重用逻辑更强大

## 基础

### 创建一个应用

- 创建：向`createApp函数`传入一个**根组件**返回一个**应用实例**,
- 挂载：通过实例上的`mount方法`将应用渲染到容器元素(一个 DOM 对象)上，方法返回值是根组件实例。
  - 根组件没有`template`选项时，容器的`innerHTML`将作为默认模板
- 应用配置：应用实例上会有一个`config`对象用来进行应用级配置，还有一些方法(例如`component`可以注册组件)
- 使用`createApp`可以分别创建多个实例并把它挂载到所需的元素上

#### 小结

- createApp
- mount
- config

### 模板语法

- 相比于 JSX，Vue 对模板进行了编译时优化
- 文本插值：`{{ data }}`
- 原始 HTML：`v-html="value"`
  - 不安全
  - 组件是用来复用的
- 属性绑定：`v-bind:attribute="expression"`，或简写为`:attribute="expression"`,在被绑定的数据发生变更时，会被重新渲染
- Vue 在所有的数据绑定中都支持**单一**JavaScript**表达式**
  - JS 表达式
    - 计算求值：算数(得出一个数字),字符串(得出一个字符串),逻辑值(得出一个逻辑值)
    - 副作用：基本表达式(字面量，关键字),左值表达式(寻找赋值目标)
  - 数据绑定：文本插值，`v-bind`...
  - 可以在绑定的表达式中使用一个组件暴露的方法(不带副作用)
- 指令：name:argument.modifiers="value"
  - 名称：`v-`开头，例如：`v-if`,`v-for`,`v-on`,`v-model`
  - 参数：一段字符串，可以是动态参数：`:[someattr]="value"`,小写是因为浏览器会强制将属性变为小写
  - 修饰符:`prevent`等

#### 小结

- {{}}
- v-html
- v-bind
- name:argument.modifiers="value"

### 响应式基础

- reactive 创建响应式对象或数组
  - 在组件模板中使用，需要在 setup 函数中定义并返回
  - reactive 的局限：Vue 的响应式是基于对对象属性的监控，所以取出的状态不再具有响应式(例如解构赋值)
- `<script setup>`:在使用 SFC 时，可以使用这个来简化代码
- DOM 更新：更新响应式状态后，DOM 也会更新，不过 DOM 只会一个状态的改变更新一次，其他的状态变化会被放入下一次更新中，可以通过`nextTick(() => {})`来访问更新之后的 DOM
- 深度响应式：响应式对象的嵌套对象仍然是代理(不与原对象相同)
- ref 可以创建响应式变量，可以通过.value 来访问变量
  - .value 被重新赋值时也不会丢失响应性
  - 被解构赋值时也不会丢失响应性
- ref 是 reactive 的升级版，缺点是访问需要使用.value
  - 原因是 ref 内部的闭包对象是响应式的，所以我们对 ref 的操作实际上都是操作闭包对象的属性
  - 新推出个语法糖(试验阶段)：`$ref`,会在编译器做自动转换，所以用的时候就不用.value 了
- ref 自动解包
  - 在模板中会自动解包，即不用.value。
    - 此解包只限定于顶级 property，访问深层级的 ref 不会解包
      - 例如：`const obj = {foo:ref(1)}`,模板访问：`{{foo}}`
      - 解释 obj 不是 ref，所以返回原值
    - 因为 setup 的返回值会被包裹一个代理，这个代理监控了返回值的 get 操作，如果获取的 ref 数据，则返回其.value，如不是则直接返回原值
  - 在响应式对象中自动解包
    - 在数组和集合类型中不会自动解包

#### 小结

1. reactive
   1. 作用
   2. 局限
2. ref
   1. 作用
   2. 自动解包
   3. 语法糖
3. nextTick
4. `<script setup>`

### 计算属性

- computed 期望接受一个 getter 函数，返回一个计算属性 ref：`const refValue = computed(() => {})`
- computed 与方法：Vue 对 computed 进行了优化(缓存=仅更新时才重新计算)
- computed 默认是不可写的，即其返回的 ref 只能用于渲染，而不能通过.value 对其重新赋值，但是通过添加 getter 函数，可以使其可写

```js
const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ');
  },
});

fullName.value = 'Chang Shou';
```

- 最佳实践
  - 计算属性不应有副作用(改变其他值)
  - 避免使用 setter，应该更新它所依赖的状态来初发新的计算
    - 这个值只在 setter 函数里有用，而不会被存储起来，你被存储起来不还是重新触发计算吗，多这么一步就像脱裤子放屁

#### 小结

- computed
- 最佳实践

### 类与样式绑定

- `:class="{ active: isActive, 'text-danger': hasError }"`
- 好的实践：使用返回一个对象的 computed：`:class="classObject"`
- 或者使用一个数组把静态的，动态的都包进去：`:class=[classObject, staticClass]`
- 与组件：单根组件：默认渲染到根组件上；多根组件：通过`:class="$attrs.class"`指定的一个根元素上
- 内联样式：`<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`
- 自动前缀：`<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`,只会渲染生效的那个

#### 小结

- `:class="classObject"`
  - 指定选择组件根元素
- `:style="styleObject"`
  - 自动前缀
- 对象或数组

### 条件渲染

- `v-if="value"`,v-else-if,v-else
- 如果想要切换的元素不止一个，可以在包裹他们的 template(一个不可见的包装器)上使用 v-if

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

- v-if VS v-show：切换频率高用后者，不高用前者，因为前者不实际渲染
- v-if 与 v-for：不建议同时使用，因为 v-if 会被优先执行，所以如果使用了循环变量那么就会报错
  - 可以使用 template(v-for)把要循环的元素(v-if)包起来

```html
<!-- Bad -->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
<!-- Good -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">{{ todo.name }}</li>
</template>
```

### 列表渲染

- v-for 与数组

```html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
<!-- 带解构赋值 -->
<li v-for="({ message }, index) in items">{{ message }}</li>
```

- v-for 与对象

```html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

- v-for 与组件：v-for 不会自动把任何数据传给组件，组件想要接收数据需要使用 prop

```html
<my-component
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
></my-component>
```

- 优化，key 值期望是一个字符串或者数字

```html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

- 数组变化检测，数组的一些操作经过 Vue 的包装可以触发视图更新
  - push，pop，unshift，shift，splice
  - sort，reverse

#### 小结

- v-for 与数组,对象
- 与组件，不会自动传入循环变量
- key 优化
- 数组变化检测

### 事件处理

- `v-on:eventName="handler"`或缩写成`@eventName="handler"`
- handler 自动接收原生 DOM 事件并触发执行,若是带其他参数，则需要手动传递`$event`变量
- 事件修饰符：`.stop`：阻止冒泡,`.prevent`：阻止默认行为,`.self`：只在自身元素上触发,`.capture`：阻止捕获,`.once`：只触发一次,`.passive`：不想阻止默认行为,可以链式书写。
  - passive：让某些行为立即发生(一般用于触摸事件的监听器，用来改善移动端设备的滚屏性能)
- 按键修饰符：`@keyup|click.modifiers="handler"`
  - 键盘
    - `.enter`,`.delete`,`.esc`,`.space`,`.tab`
    - `.up`,`.down`,`.left`,`.right`
  - 鼠标：`.left`,`.right`,`.middle`
  - 系统
    - `.ctrl`,`alt`,`.shift`,`.meta`：只要按了就会触发，比如`@keyup.alt.shift`则单按一个也会触发
    - `.exact`:确定组合键，上面的例子加上这个就只有组合键才会触发

#### 小结

- v-on
  - 不带参数：自动传 event 对象
  - 带参数：需要使用`$event`手动传
- 修饰符
  - 事件修饰符
  - 按键修饰符

### 表单输入绑定

- `v-model="value"`

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
<textarea v-model="message" placeholder="add multiple lines">
{{ 不会工作，被v-model替换 }}</textarea
>
<!-- checkedNames总会包含被选中的值 -->
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<!-- 建议提供一个空值的禁用选项，避免由于select渲染成未选择的状态而导致的无法选择第一项 -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
</select>
```

- 修饰符：`.lazy`:只在 change 事件后更新,`.trim`：自动去空格
- 可与组件配合使用

### 生命周期

- 生命周期：Vue 组件实例的不同阶段(创建，挂载，更新，销毁)
- 注册钩子函数：onMounted(() => {})

### 监听器

- computed 可以声明性地计算推导值，但是我们有时会需要运行副函数(根据结果修改状态等)
- `const stop = watch([ref, reactiveObj, () => someValue], () => {})`,返回值为停止函数，运行 stop()可以停止监听
  - ref:ref,computed
  - reactiveObj:reactive
  - () => {}:() => reactive.property | ref.value
- 深层监听器
  - 对于响应式对象，默认深度监听
  - 对于 getter 函数，只有返回不同对象时才会触发，可以显式声明 deep 选项，强制转为深度监听器
  - 慎用
- watchEffect：积极执行的 watch，相当于 do...while，Vue 会自动分析响应源，并自动更新。
  - 例子：做响应式的数据请求

```js
watchEffect(async () => {
  const response = await fetch(url.value);
  data.value = await response.json();
});
```

- watch 与 watchEffect
  - watch 只追踪明确源，避免在副作用中追踪依赖
  - watchEffect 会在副作用中追踪所有能访问到的响应式 property，因此导致**响应性依赖关系不那么明确**
- 回调的刷新时机
  - 默认是在 DOM 更新前
  - 可以通过`flush: 'post'`延后回调从而访问更新后的 DOM
  - PS:后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`

#### 小结

- watch
- watchEffect
- watchPostEffect

### 模板 ref

- 用于直接访问底层 DOM 元素，它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。
- 访问模板 ref：option api:this.$refs,composition api:同名 ref
- v-for 与模板 ref(v3.2.25+)：模板 ref 将会是一个数组(顺序不一定与原数组顺序相同)
- 模板 ref 除了是字符串也可以是一个函数/方法
- 模板 ref 与组件：指向组件实例
  - option api：与子组件的 this 相同，父组件可以访问子组件的所有内容
  - comps api：默认私有，父组件只能访问子组件通过 defineExpose 暴露的内容

### 组件基础

- 定义组件
  - 构建：SFC
  - 不构建：包含特定选项的 JavaScript 对象
- 使用组件 - 传递 props - 监听事件
  使用 setup

```html
<script setup>
  const props = defineProps(['title']);
  console.log(props.title);
  const emit = defineEmits(['enlarge-text']);
  emit('enlarge-text');
</script>
```

不使用 setup

```js
export default {
  props: ['title'],
  emits: ['enlarge-text'],
  setup(props, ctx) {
    console.log(props.title);
    ctx.emit('enlarge-text');
  },
  template: `<template><div @click="$emit('enlarge-text')"></div></template>`,
};
```

- 使用插槽:当做占位符表示将组件标签中的内容放到组件内的指定位置
- 动态组件：动态切换组件，例如 tab
  - `<component :is="value"></component>`
  - value 可以是被注册的组件名或者是导入的组件对象
  - 组件会在被切换掉后卸载。可以通过`<KeepAlive>`组件强制不活跃的组件仍然保持“存活”的状态
- DOM 模板解析注意事项
  - 适用于：直接在 DOM 中书写 Vue 模板，不适用于：SFC，template 选项
  - 大小写：postTitle -> post-title
  - 闭合标签：`<MyComponent />` ->`<my-Component></my-component>`
  - 元素位置：某些 HTML 元素对于放在其中的元素类型有限制，例如 `<ul>`，`<ol>`，`<table>` 和 `<select>`

```html
<!-- 不会显示 -->
<table>
  <blog-post-row></blog-post-row>
</table>
<!-- 解决方法 -->
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

## 小结

1. 创建应用：createApp();挂载：mount();配置：app.config;可以创建多个 Vue 实例;
2. 模板语法：`{{}}`,`v-html`,`:attr="value"`;所有数据绑定都支持单一表达式;`name:argument.modifiers="value"`,参数可以是动态的`:[someattr]="value"`
3. 响应式原理
   1. reactive：定义对象和数组;监听对象属性变化
   2. ref：定义变量;`.value`访问;自动解包(模板;响应式对象;不包括集合和数组);`$ref`
   3. 深度响应式：响应式对象的嵌套对象仍然是响应式对象
   4. nextTick(()=>{})：访问更新后的 DOM
   5. `<script setup>`：在 SFC 中简化代码
4. 计算属性：`computed(getter)`or`computed({getter, setter})`;Vue 专属优化(Cache);不应有副作用;避免使用 setter
5. 类与样式绑定
   1. `:class="{active:isActive}"`,`:style="{color:activeColor}"`;可以是对象或者数组(静态&动态)
   2. 自动前缀(`:style="{display:['-webkit-box', 'flex']}"`,渲染最终生效的那个)
   3. 与组件(默认根组件|通过`:class="$attr.class"`选择的根元素)
6. 条件渲染：`v-if="value"`,`v-show="value"`;不与 v-for 同用(v-for 的 template 套上 v-if 的元素)
7. 列表渲染
   1. arr:`v-for="(item,index) in arr"`,obj:`v-for="(item,key,index) in obj"`;item 支持解构;`key attribute`优化(同 key 复用)
   2. 需要同时循环多个用 template(一个不可见的元素)套上
   3. 与组件：变量不会传给组件，组件只会接受 props
   4. 数组变化检测：一些方法可以触发视图更新(push|pop|shift|unshift|splice)(sort|reverse)
8. 事件处理
   1. `@eventName.modifiler="handler"`;
   2. 不带参数,默认参数为事件对象;带参数,若需要则`$event`传入事件对象;
   3. 事件修饰符
      1. 键盘:`@keyup.`(enter|delete|esc|space|tab)(up|down|left|right)(ctrl|alt|shift|meta)(exact：组合键)
      2. 按键:`@click.`(left|right|middle)
9. 表单输入绑定：`v-model="value"`(简化操作|绑定的是 JS 变量|插值表达式不管用);修饰符(lazy|trim|number);可与组件配合使用
10. 生命周期:Vue 组件实例的不同阶段(创建,挂载,更新,卸载);注册钩子：`onMounted(()=>{})`
11. 监听器
    1. 根据状态变换运行副函数
    2. `watch([ref,obj,() => obj.ctx],()=>{})`(消极|明确响应源)和`watchEffect(()=>{})`(积极|自动推断响应源|例:响应式的数据请求)
    3. 副作用函数运行时机：默认 DOM 更新前；配置`flush:true`延后到 DOM 更新后
12. 模板 ref：访问底层 DOM;`this.$refs`or`同名ref`;动态 ref(可以是个函数);与 v-for：不保证顺序的数组;与组件：子组件 this(option)或暴露的内容(setup)
13. 组件基础：SFC|包含特定项的 JS 对象;使用组件(标签|props|emit)(setup(宏)|option(选项));插槽;
    1. 动态组件：`<component :is="tab[currentTab]"></component>`;使用`keepAlive`组件使被卸载的组件强制存活提升性能
    2. DOM 模板解析注意事项：大小写(postTitle->post-title),标签(`<MyComponent />`->`<my-Component></my-component>`),元素位置(特殊标签在特殊位置生效)
