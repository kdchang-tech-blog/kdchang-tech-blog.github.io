---
title: Vue.js 3 官方入門語法教學筆記 [11] - Props 屬性 | 學習筆記
date: 2021-02-11 02:23:41
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

# Props 屬性
子元件可以透過 Props 接收來自父元件的輸入。首先，子元件需要宣告它所接收的 Props：

```vue
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

注意，`defineProps()` 是一個編譯時的巨集，不需要額外匯入。一旦宣告後，`msg` Prop 就可以在子元件的模板中使用，也可以透過 `defineProps()` 返回的物件在 JavaScript 中存取。

父元件可以像設定屬性一樣，將 Prop 傳遞給子元件。若要傳遞動態值，也可以使用 `v-bind` 語法：

```vue
<template>
  <ChildComp :msg="greeting" />
</template>
```

我們現在在編輯器中試試看吧！

```html App.vue
<script setup>
import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

const greeting = ref('Hello from parent')
</script>

<template>
  <ChildComp :msg="greeting" />
</template>
```

```html ChildComp.vue
<script setup>
const props = defineProps({
  msg: String
})
</script>

<template>
  <h2>{{ msg || 'No props passed yet' }}</h2>
</template>
```