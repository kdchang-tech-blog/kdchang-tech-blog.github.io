---
title: Vue.js 3 官方入門語法教學筆記 [4] - Form Bindings 表單綁定 | 學習筆記
date: 2021-02-04 02:23:41
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

**Form Bindings 表單綁定**  
使用 `v-bind` 和 `v-on` 結合，我們可以對表單輸入元素創建雙向綁定：

```html
<template>
  <input :value="text" @input="onInput">
  <p>{{ text }}</p>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')

function onInput(e) {
  // v-on 處理器接收原生 DOM 事件作為參數
  text.value = e.target.value
}
</script>
```

當您在輸入框中輸入時，您應該會看到 `<p>` 中的文字隨之更新。

---

為了簡化雙向綁定，Vue 提供了 `v-model` 指令，它本質上是上述代碼的語法糖：

```html
<template>
  <input v-model="text">
  <p>{{ text }}</p>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
```

`v-model` 會自動同步 `<input>` 的值與綁定的狀態，因此我們不再需要為此使用事件處理器。

---

`v-model` 不僅適用於文本輸入，還適用於其他輸入類型，如復選框 (checkbox)、單選按鈕 (radio button) 和下拉選單 (select dropdown)。有關更多細節，請參閱官方[指南 - 表單綁定](https://vuejs.org/guide/essentials/forms.html)。

---

現在，我們試著將代碼重構為使用 `v-model`。

SFC/Composition 版本：

```html
<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <input v-model="text" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

SFC/Options 版本：

```html
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value
    }
  }
}
</script>

<template>
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</template>
```

HTML/Options 版本：

```html
<script type="module">
import { createApp } from 'vue'

createApp({
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value
    }
  }
}).mount('#app')
</script>

<div id="app">
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</div>
```

HTML/Composition 版本：

```html
<script type="module">
import { createApp, ref } from 'vue'

createApp({
  setup() {
    const text = ref('')

    function onInput(e) {
      text.value = e.target.value
    }

    return {
      text,
      onInput
    }
  }
}).mount('#app')
</script>

<div id="app">
  <input :value="text" @input="onInput" placeholder="Type here">
  <p>{{ text }}</p>
</div>
```