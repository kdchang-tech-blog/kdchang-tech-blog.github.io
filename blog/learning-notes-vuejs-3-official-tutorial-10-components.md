---
title: Vue.js 3 官方入門語法教學筆記 [10] - Components 元件 | 學習筆記
date: 2021-02-10 02:23:41
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

# Components 元件
到目前為止，我們只使用了一個單一的元件。實際的 Vue 應用程式通常是由巢狀元件所組成的。

父元件可以在其模板中渲染另一個元件作為子元件。要使用子元件，我們需要先匯入它：

```javascript
import ChildComp from './ChildComp.vue'
```

然後，我們可以在模板中使用該元件，如下所示：

```vue
<template>
  <ChildComp />
</template>
```

我們現在試試看將匯入子元件並將其渲染到模板中。

```html App.vue
<script setup>
import ChildComp from './ChildComp.vue'
</script>

<template>
  <ChildComp />
</template>
```

```html ChildComp.vue
<template>
  <h2>A Child Component!</h2>
</template>
```
