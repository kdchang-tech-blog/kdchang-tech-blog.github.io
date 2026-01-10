---
title: Vue.js 3 官方入門語法教學筆記 [1] - Declarative Rendering 聲明式渲染 | 學習筆記
date: 2021-02-01 02:23:41
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

# Declarative Rendering 聲明式渲染
在 Vue3 我們常看到的是 Vue 單文件元件 (SFC)。SFC 是一個可重用的、獨立的程式碼區塊，它將相關的 HTML、CSS 和 JavaScript 封裝在一起，並寫在一個 `.vue` 文件中。

Vue 的核心特性是聲明式渲染：使用擴展 HTML 的模板語法，我們可以根據 JavaScript 的狀態描述 HTML 應該如何呈現。當狀態發生變化時，HTML 會自動更新。

可以在狀態變化時觸發更新的狀態被認為是響應式的。我們可以使用 Vue 的 `reactive()` API 來聲明響應式狀態。通過 `reactive()` 創建的對象是 JavaScript 的 Proxy，它們的行為與普通物件相同：

SFC 版本：

```javascript
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

html 版本：

```javascript
<script type="module">
import { createApp, ref } from 'vue'

createApp({
  setup() {
    // component logic
    // declare some reactive state here.

    return {
      // exposed to template
    }
  }
}).mount('#app')
</script>

<div id="app">
  <h1>Make me dynamic!</h1>
</div>
```

`reactive()` 只能作用於物件（包括陣列和內建類型如 Map 和 Set）。另一方面，`ref()` 可以接受任何類型的值並創建一物件，其內部值通過 `.value` 屬性暴露出來：

```javascript
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

有關 `reactive()` 和 `ref()` 的更多細節，可以參考官方教學[指南 - 響應式基礎](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)。

在組件的 `<script setup>` 區塊中聲明的響應式狀態可以直接在模板中使用。我們可以基於 `counter` 對象和 `message` 的值，使用 Mustache 語法渲染動態文字：

```html
<template>
  <h1>{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>
</template>
```

注意，當在模板中訪問 `message` 的 `ref` 值時，我們不需要使用 `.value`：它會自動取值，以提供更簡潔的用法。

Mustache `{{ }}` 中的內容不限於標識符或路徑 —— 我們可以使用任何有效的 JavaScript 表達式：

```html
<template>
  <h1>{{ message.split('').reverse().join('') }}</h1>
</template>
```

現在，試著自己創建一些響應式狀態，並使用它來為模板中的 `<h1>` 渲染動態文本內容吧！

```html
<script setup>
import { reactive, ref } from 'vue'

const counter = reactive({ count: 0 })
const message = ref('Hello World!')
</script>

<template>
  <h1>{{ message }}</h1>
  <p>Count is: {{ counter.count }}</p>
</template>
```

## 總結
Vue.js 3 提供了更好的性能、更靈活的 API 和更簡潔的開發體驗。無論是使用 Composition API 還是 Options API，都能快速上手並構建強大的前端應用。

