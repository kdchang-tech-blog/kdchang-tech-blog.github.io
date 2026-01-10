---
title: Vue v-cloak 入門教學筆記 | 學習筆記
date: 2024-02-20 11:33:41
author: kdchang
tags:
  - 瀏覽器渲染
  - v-cloak
  - Vue
---

## 前言

`v-cloak` 在 Vue 3 依然存在，作用與 Vue 2 相同：在 Vue 實例或組件掛載完成之前，避免模板中的插值語法（如 `{{ message }}`）閃爍顯示給使用者。搭配 CSS 可在 Vue 掛載完成前隱藏元素，增進首屏體驗。

---

## 重點摘要

- `v-cloak` 為特殊屬性，Vue 3 掛載完成會自動移除。
- 必須搭配 CSS `[v-cloak] { display: none; }` 讓元素在掛載前隱藏。
- 在 Vue 3，掛載方式改用 `createApp`。
- 可用於根組件或子組件的根元素。
- 不會與 `v-if`、`v-show` 衝突。

---

## Vue 3 實際範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>Vue 3 v-cloak 範例</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="app" v-cloak>{{ message }}</div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { createApp } = Vue;

      createApp({
        data() {
          return {
            message: 'Vue 3 掛載完成！',
          };
        },
      }).mount('#app');
    </script>
  </body>
</html>
```

---

## Vue 3 單文件組件 (SFC) 範例

```vue
<template>
  <div v-cloak>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '這是 Vue 3 SFC 範例',
    };
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
```

---

## 總結

- `v-cloak` 在 Vue 3 的核心概念不變，仍用於避免模板閃爍。
- 需配合 CSS `[v-cloak]` 隱藏元素，等 Vue 掛載後自動移除。
- 掛載方式使用 `createApp`，搭配 `.mount()`。
- 可應用於純 HTML 或組件模板中。
