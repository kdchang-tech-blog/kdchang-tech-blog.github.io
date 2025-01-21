---
title: Vue.js 3 官方入門語法教學筆記 [12] - Emits 事件傳遞 | 學習筆記
date: 2021-02-12 02:23:41
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

# Emits 事件傳遞
除了接收 Props 之外，子元件也可以向父元件觸發事件：

```vue
<script setup>
// 宣告要觸發的事件
const emit = defineEmits(['response'])

// 觸發事件並傳遞參數
emit('response', 'hello from child')
</script>
```

`emit()` 的第一個參數是事件名稱，任何額外的參數都會傳遞給事件監聽器。

父元件可以使用 `v-on` 來監聽子元件觸發的事件——如下範例中，處理函式接收來自子元件 `emit` 的額外參數，並將其賦值給本地狀態：

```vue
<template>
  <ChildComp @response="(msg) => childMsg = msg" />
</template>
```

現在我們在編輯器中試試看吧！