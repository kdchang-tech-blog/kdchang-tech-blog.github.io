---
title: Vue pinia 保持 reactive 入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags: 
    - JavaScript
    - reactive
    - vue
    - pinia

---

保持 reactive 寫法：

---

## 1️. 用 `computed`

```js
const todos = computed(() => todoStore.todos)
```

**優點**  
- 保持 reactive  
- 簡單直接  
- 在 template 裡 `todos` 可以直接使用  

**缺點**  
- 如果只是讀值，其實有點多餘  

**建議用於**：在 template 需要用 `v-for="todo in todos"` 這種情況下。

---

## 2️. 直接使用 `todoStore.todos` 在 template

不額外宣告變數，直接寫：

```vue
<ul>
  <li v-for="todo in todoStore.todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

**優點**  
- 直接讀取 store，最簡單  
- 不需要 `computed`

**缺點**  
- 如果在 `script` 多處使用 todos，每次都要寫 `todoStore.todos`

**建議用於**：只在 template 需要使用 todos 的情況。

---

## 3️. 使用 `storeToRefs`

這是 Pinia 官方推薦的方式，可以一次把 state 解構成 reactive ref：

```js
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
```

**優點**  
- `todos` 是 reactive  
- 取值時不會失去 reactive  
- 適合同時取多個 state（例如 `const { todos, count } = storeToRefs(todoStore)`）

**缺點**  
- 需要額外 import `storeToRefs`  
- 初學者可能不熟悉  

**建議用於**：component 中需要多個 state 且偏好解構寫法時。

---

## 寫法比較

| 寫法                 | 是否 reactive | 適用場景               |
|------------------|--------------|--------------------|
| `computed` 包一層      | 是           | script 內多次使用      |
| 直接 `todoStore.todos` | 是           | 只在 template 使用     |
| `storeToRefs`         | 是           | 多個 state 解構需要時   |

---

## 建議

- 如果只需要一個 state：`computed` 或直接用 `todoStore.todos`
- 如果需要多個 state：`storeToRefs`

---

### 範例（使用 `storeToRefs`）

```vue
<script setup>
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

function addTodo() { ... }
function removeTodo(id) { ... }
function toggleComplete(id) { ... }
</script>
```

template 裡直接使用 `todos`，效果與 `computed` 相同。

---

**總結**  
三種寫法都可行，主要差異在語法風格與使用場景。若不想意外解構成非 reactive 值，使用 `storeToRefs` 是最安全的。