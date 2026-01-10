---
title: Vue.js 3 官方入門語法教學筆記 [2] - Attribute Bindings 屬性綁定 | 學習筆記
date: 2021-02-02 02:23:41
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

**Attribute Bindings 屬性綁定**  
在 Vue 中，Mustache 語法只能用於文字插值。要將屬性綁定到動態值，我們需要使用 `v-bind` 指令：

```html
<template>
  <div v-bind:id="dynamicId"></div>
</template>
```

指令是一種特殊的屬性，以 `v-` 前綴開頭，屬於 Vue 的模板語法的一部分。與文字插值類似，指令的值是 JavaScript 表達式，可以訪問組件的狀態。有關 `v-bind` 和指令語法的完整細節，請參閱官方說明[指南 - 模板語法](https://vuejs.org/guide/essentials/template-syntax.html)。

冒號之後的部分（`:id`）是指令的「參數」。在這裡，元素的 `id` 屬性將與組件狀態中的 `dynamicId` 屬性同步。

由於 `v-bind` 的使用頻率很高，Vue 提供了專用的簡寫語法：

```html
<template>
  <div :id="dynamicId"></div>
</template>
```

---

我們可以試著將動態類名綁定到 `<h1>`，使用 `titleClass` 的 `ref` 作為值。如果綁定正確，文字應該會變成紅色！

```html
<script setup>
import { ref } from 'vue'

const titleClass = ref('title')
</script>

<template>
  <h1 :class="titleClass">Make me red</h1> <!-- add dynamic class binding here -->
</template>

<style>
.title {
  color: red;
}
</style>
```