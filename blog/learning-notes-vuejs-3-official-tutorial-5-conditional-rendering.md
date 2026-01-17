---
title: Vue.js 3 官方入門語法教學筆記 [5] - Conditional Rendering 表單綁定 | 學習筆記
date: 2021-02-05 02:23:41
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

**Conditional Rendering 條件渲染**  
在 Vue 中，我們可以使用 `v-if` 指令來條件式渲染元素：

```html
<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
</template>
```

這個 `<h1>` 只有在 `awesome` 的值為真值時才會被渲染。如果 `awesome` 的值變為假值，它將從 DOM 中被移除。

---

我們還可以使用 `v-else` 和 `v-else-if` 表示條件的其他分支：

```html
<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```

目前的範例同時顯示了兩個 `<h1>`，按鈕也沒有作用。請嘗試為 `<h1>` 添加 `v-if` 和 `v-else` 指令，並實作一個 `toggle()` 方法，使我們可以透過按鈕來切換顯示的內容。

---

示例程式碼範例：

```vue
<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
  <button @click="toggle">Toggle</button>
</template>

<script setup>
import { ref } from 'vue'

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}
</script>
```

---

更多關於 `v-if` 的詳細內容請參閱官方[指南 - 條件渲染](https://vuejs.org/guide/essentials/conditional.html)。

```html
<script setup>
import { ref } from 'vue'

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}
</script>

<template>
  <button @click="toggle">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```