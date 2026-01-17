---
title: Vue.js 3 官方入門語法教學筆記 [7] - Computed Property 計算屬性 | 學習筆記
date: 2021-02-07 02:23:41
authors: kdchang
tags: 
    - vue
    - vue3
    - vue.js
    - vue.js 3
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer

---

# Computed Property 計算屬性

讓我們在前一個待辦清單的範例基礎上繼續改進。這裡，我們已經為每個待辦項目新增了切換功能 (toggle)，這是透過在每個待辦物件中新增一個 `done` 屬性，並使用 `v-model` 綁定到核取方塊來實現的：

```html
<template>
  <li v-for="todo in todos">
    <input type="checkbox" v-model="todo.done">
    ...
  </li>
</template>
```

接下來我們可以進一步改進功能，新增一個按鈕來隱藏已完成的待辦項目。我們已經有一個按鈕可以切換 `hideCompleted` 狀態。但要如何根據這個狀態來動態渲染不同的待辦清單項目呢？

這裡引入了 `computed()`。我們可以建立一個計算屬性，基於其他的響應式數據來源來計算它的 `.value` 值：

```javascript
import { ref, computed } from 'vue';

const hideCompleted = ref(false);
const todos = ref([
  /* ... */
]);

const filteredTodos = computed(() => {
  // 根據 `todos.value` 和 `hideCompleted.value`
  // 返回篩選後的待辦項目
});
```

我們將 `v-for` 的數據來源從原本的 `todos` 改為 `filteredTodos`：
```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

計算屬性會自動追蹤其計算邏輯中使用的其他響應式數據作為依賴項目。它會快取計算結果，並在其依賴項目改變時自動更新。

現在，嘗試新增一個 `filteredTodos` 計算屬性，並實現其計算邏輯！如果實現正確，當隱藏已完成項目時，勾選一個待辦項目應會立即將其隱藏。

```html
<script setup>
import { ref, computed } from 'vue'

let id = 0

const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript', done: true },
  { id: id++, text: 'Learn Vue', done: false }
])

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
```