---
title: Vue.js 3 官方入門語法教學筆記 [13] - Slots 插槽 | 學習筆記
date: 2021-02-14 02:23:41
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

# Slots 插槽
除了透過 Props 傳遞資料外，父元件還可以透過插槽將模板片段傳遞給子元件：

```vue
<template>
  <ChildComp>
    這是一些插槽內容！
  </ChildComp>
</template>
```

在子元件中，可以使用 `<slot>` 元素作為插槽來渲染父元件傳遞的內容：

```vue
<template>
  <!-- 子元件的模板 -->
  <slot />
</template>
```

插槽內的內容會被視為「預設內容」：當父元件沒有傳遞插槽內容時，會顯示這些預設內容：

```vue
<template>
  <slot>預設內容</slot>
</template>
```

目前我們尚未向 `<ChildComp>` 傳遞任何插槽內容，因此你應該會看到預設內容。現在試著利用父元件的 `msg` 狀態，為子元件提供一些插槽內容吧！

```html App.vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const msg = ref('from parent')
</script>

<template>
  <ChildComp>Message: {{ msg }}</ChildComp>
</template>
```

```html ChildComp.vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const msg = ref('from parent')
</script>

<template>
  <ChildComp>Message: {{ msg }}</ChildComp>
</template>
```