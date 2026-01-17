---
title: Vue.js 3 官方入門語法教學筆記 [8] - Lifecycle and Template Refs 生命週期與模板引用 | 學習筆記
date: 2021-02-08 02:23:41
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

## Lifecycle and Template Refs 生命週期與模板引用

到目前為止，Vue.js 透過響應式資料與聲明式渲染，幫助我們處理了所有的 DOM 更新。然而，無可避免地會有需要手動操作 DOM 的情況。

我們可以使用特殊的 `ref` 屬性來請求模板引用 (template ref)，也就是模板中某個元素的引用：

### 範例
```html
<template>
  <p ref="pElementRef">hello</p>
</template>
```

### 定義引用
為了訪問這個引用，我們需要宣告一個名稱匹配的 `ref`：
```javascript
import { ref } from 'vue';

const pElementRef = ref(null);
```
請注意，這個 `ref` 在初始化時會是 `null`，因為當 `<script setup>` 被執行時，對應的 DOM 元素還不存在。模板引用只有在元件掛載 (mounted) 後才能被訪問。

### 在掛載後執行程式碼
我們可以使用 `onMounted()` 函式在掛載後執行程式碼：
```javascript
import { onMounted } from 'vue';

onMounted(() => {
  // 元件已掛載完成
});
```

### 生命週期鉤子
這稱為生命週期鉤子 (lifecycle hook)，它允許我們在元件生命週期的特定時間點註冊回呼函式。其他的生命週期鉤子還包括 `onUpdated` 和 `onUnmounted` 等。更多細節請參考官方文件 [生命週期圖示](https://vuejs.org/guide/essentials/lifecycle.html)。

### 試試看
現在，我們可以嘗試添加一個 `onMounted` 鉤子，透過 `pElementRef.value` 訪問 `<p>` 元素，並對其進行一些直接的 DOM 操作（例如更改 `textContent`）。

```html
<script setup>
import { ref, onMounted } from 'vue'

const pElementRef = ref(null)

onMounted(() => {
  pElementRef.value.textContent = 'mounted!'
})
</script>

<template>
  <p ref="pElementRef">Hello</p>
</template>
```