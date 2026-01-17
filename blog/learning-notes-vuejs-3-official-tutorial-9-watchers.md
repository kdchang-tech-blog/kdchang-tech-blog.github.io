---
title: Vue.js 3 官方入門語法教學筆記 [9] - Watchers 觀察者 | 學習筆記
date: 2021-02-09 02:23:41
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

# Watchers 觀察者
有時我們可能需要以反應性的方式執行「Side-effect 副作用」，例如，當一個數值改變時將其記錄到控制台。我們可以使用觀察者來實現這一點：

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // 是的，console.log() 是一種副作用
  console.log(`新的計數是：${newCount}`)
})
```

`watch()` 可以直接監視一個 `ref`，每當 `count` 的值改變時，回調函數就會被觸發。`watch()` 也可以監視其他類型的數據來源——更多細節請參閱指南：觀察者（Watchers）。

比將訊息記錄到控制台更實用的例子，可能是當一個 ID 發生變化時，根據新 ID 獲取數據。我們的代碼目前是在元件掛載時，從一個模擬 API 獲取 `todos` 數據。此外，還有一個按鈕可以遞增應該被獲取的 `todo` ID。請嘗試實現一個觀察者，在按下按鈕時根據新 ID 獲取新的 `todo` 數據。

參考範例：

```html
<script setup>
import { ref, watch } from 'vue'

const todoId = ref(1)
const todoData = ref(null)

async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  todoData.value = await res.json()
}

fetchData()

watch(todoId, fetchData)
</script>

<template>
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
```