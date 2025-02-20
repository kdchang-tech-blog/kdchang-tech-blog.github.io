---
title: Vue.js 3 官方入門語法教學筆記 [6] - List Rendering 表單綁定 | 學習筆記
date: 2021-02-06 02:23:41
author: kdchang
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

**List Rendering 列表渲染**  
我們可以使用 `v-for` 指令根據一個來源陣列來渲染元素列表：

```html
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>
```

在這裡，`todo` 是一個局部變數，代表目前被迭代的陣列元素。它的作用域僅限於 `v-for` 元素內部，類似於函式的作用域。

---

請注意，我們為每個 `todo` 對象指定了一個唯一的 `id`，並將其綁定為每個 `<li>` 的特殊 `key` 屬性。`key` 允許 Vue 精準地移動每個 `<li>`，以匹配陣列中對應對象的位置。

---

有兩種方式可以更新列表：

1. 對來源陣列調用可變方法：
   ```javascript
   todos.value.push(newTodo)
   ```

2. 使用新的陣列替換：
   ```javascript
   todos.value = todos.value.filter(/* ... */)
   ```

---

以下是一個簡單的待辦事項列表範例，您可以試著實現 `addTodo()` 和 `removeTodo()` 方法，使其正常運作！

### 範例程式碼：

```html
<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
    <input v-model="newTodoText" placeholder="Add a new todo" />
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定義待辦事項列表和新增的文字
const todos = ref([
  { id: 1, text: 'Learn Vue.js' },
  { id: 2, text: 'Build a project' }
])

const newTodoText = ref('')

// 新增待辦事項
function addTodo() {
  if (newTodoText.value.trim()) {
    todos.value.push({
      id: Date.now(), // 使用當前時間作為唯一 ID
      text: newTodoText.value.trim()
    })
    newTodoText.value = '' // 清空輸入框
  }
}

// 移除待辦事項
function removeTodo(id) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>
```

---

更多關於 `v-for` 的詳細內容，請參閱官方[指南 - 列表渲染](https://vuejs.org/guide/essentials/list.html)。

```html
<script setup>
import { ref } from 'vue'

// give each todo a unique id
let id = 0

const newTodo = ref('')
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
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
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```