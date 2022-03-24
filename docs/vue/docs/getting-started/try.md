## 尝试教程

- ref(0),reactive({ count: 0 }),
- :value="todo.text",@click="addTodo",v-model="newTodo",
- v-if="todo.done",v-for="todo in todos",
- computed(() => {}),
- lifecycle:onMounted(() => {}),
- template refs:const p = ref(null);`<p ref="p">content</p>`,使用`p.value.textContent`访问其内容,
- `watch([ref, computed, () => reactiveObj.count, () => refValue.value], (newValue) => {})`,
- components:`<ChildComp />`,
  - props:defineProps({}),
  - emits:defineEmits([]),
  - slots:`<solt>child content</solt>`
