---
title: Vue.js 3 官方入門語法教學筆記 [3] - Event Listeners 事件監聽器 | 學習筆記
date: 2021-02-03 02:23:41
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

**Event Listeners 事件監聽器**  
在 Vue 中，我們可以使用 `v-on` 指令監聽 DOM 事件：

```html
<template>
  <button v-on:click="increment">{{ count }}</button>
</template>
```

由於 `v-on` 的使用頻率很高，Vue 提供了一個簡寫語法：

```html
<template>
  <button @click="increment">{{ count }}</button>
</template>
```

在這裡，`increment` 是在 `<script setup>` 中定義的一個函式：

```vue
<script setup>
import { ref } from 'vue'

// 定義響應式狀態
const count = ref(0)

// 定義函式來更新狀態
function increment() {
  // 更新組件的狀態
  count.value++
}
</script>
```

在函式內，我們可以透過修改 `ref` 的值來更新組件的狀態。

---

事件處理器也可以使用內聯表達式，並透過**修飾符**簡化常見任務。這些細節在[指南 - 事件處理](https://vuejs.org/guide/essentials/event-handling.html)中有詳細說明。

---

現在，我們可以試著自己實作 `increment` 函式，並使用 `v-on` 將它綁定到按鈕。

```html
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```