---
title: Vue3 Options API 和 Composition API 風格差異教學筆記 | 學習筆記
date: 2020-11-16 11:33:41
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
    - Options API
    - Composition API

---

# 前言 
根據[官方文件的說明](https://vuejs.org/guide/introduction.html#api-styles)，一般來說 Vue 元件可以用兩種不同的 API 風格來撰寫：**Options API** 和 **Composition API**。

---

# **Options API**  
使用 Options API 時，我們透過一個包含 `data`、`methods` 和 `mounted` 等選項的物件來定義元件邏輯。選項中定義的屬性會在函式內透過 `this` 曝露，`this` 指向的是元件實例。

```html
<script>
export default {
  // 從 data() 返回的屬性成為響應式狀態，
  // 並會透過 `this` 曝露。
  data() {
    return {
      count: 0
    }
  },

  // Methods 是變更狀態並觸發更新的函式，
  // 可作為模板中的事件處理程序綁定。
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命週期鉤子會在組件的不同階段被調用。
  // 此函式會在組件掛載時調用。
  mounted() {
    console.log(`初始計數值為 ${this.count}。`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

---

# **Composition API**  
使用 Composition API 時，我們透過導入的 API 函式來定義組件邏輯。在單文件組件 (SFC) 中，Composition API 通常搭配 `<script setup>` 使用。`setup` 屬性是一個提示，它讓 Vue 執行編譯時轉換，從而減少樣板代碼。舉例來說，在 `<script setup>` 中宣告的導入、第一層變數和函式可直接用於模板中。

以下是相同的組件，模板保持不變，但改用 Composition API 和 `<script setup>`：

```html
<script setup>
import { ref, onMounted } from 'vue'

// 響應式狀態
const count = ref(0)

// 改變狀態並觸發更新的函式
function increment() {
  count.value++
}

// 生命週期鉤子
onMounted(() => {
  console.log(`初始計數值為 ${count.value}。`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

---

# **該選擇哪種風格？**  
這兩種 API 風格都能滿足常見的使用場景。它們是基於相同底層系統的不同介面。實際上，**Options API 是基於 Composition API 實現的**！Vue 的核心概念和知識在兩種風格中是共通的。

1. **Options API**  
   - 圍繞「組件實例」（如範例中的 `this`）進行設計，對於來自 OOP 語言背景的使用者，這種風格通常更符合以類為基礎的思維模型。
   - 初學者友好，通過選項分組的方式隱藏了響應式細節，簡化程式碼組織。

2. **Composition API**  
   - 在函式作用域中直接宣告響應式狀態變數，並透過組合多個函式來管理複雜性。
   - 更加靈活，但需要對 Vue 的響應式機制有深入理解才能有效使用。
   - 適合組織和重用邏輯的更強大模式。

# **學習上的建議**  
- **新手學習**：選擇對您來說更容易理解的風格。大多數核心概念在兩種風格中是共通的，您之後可以再學習另一種風格。  
- **生產使用**：  
  - 如果不使用建構工具，或計畫主要用於低複雜度場景（如漸進式增強），建議使用 `Options API`。  
  - 如果計畫使用 Vue 構建完整應用，建議使用 **Composition API + 單文件組件**。

在學習階段，我們也不需要僅限於某一種風格。可以根據適合的情境使用適合的 API 風格。