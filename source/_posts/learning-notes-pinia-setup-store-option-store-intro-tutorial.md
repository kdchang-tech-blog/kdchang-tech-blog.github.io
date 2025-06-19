---
title: Pinia Setup Store 與 Option Store 比較介紹入門教學筆記
date: 2024-12-16 11:33:41
author: kdchang
tags:
  - 前端
  - 後端
  - 前端開發
  - 前端工程
  - 軟體工程
  - Pinia
---

## 前言

Pinia 是 Vue 3 推薦的狀態管理工具，作為 Vuex 的繼任者，Pinia 以簡潔且直觀的 API 設計，為 Vue 生態系帶來更輕量且易於維護的解決方案。Pinia 提供兩種撰寫 store 的方式：Option Store 與 Setup Store。兩者皆支援響應式狀態管理，但在語法結構與彈性上有所不同。理解這兩種寫法的差異，對於新手以及想提升開發效率的工程師來說相當重要。

---

## 重點摘要

- **Option Store 是物件式語法**，結構清晰，適合剛接觸 Pinia 或 Vuex 過渡的開發者。
- **Setup Store 採用 Composition API 語法**，彈性更大，易於搭配 Vue 3 的其它 API 使用。
- Option Store 通常使用 `state`、`getters`、`actions` 三大屬性分隔管理狀態、計算屬性與方法。
- Setup Store 透過 `ref`、`reactive` 直接定義響應式狀態，並以函式回傳公開 API，結構更自由。
- Setup Store 更方便與 `computed`、`watch`、`async/await` 等 Composition API 功能整合。
- Option Store 語法更接近 Vuex，學習門檻較低，但在複雜邏輯時不易拆分。
- Setup Store 支援多 store 之間更靈活的組合與重用。

---

## 1. Option Store 範例

```js
// stores/counterOption.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
    incrementBy(amount) {
      this.count += amount;
    },
  },
});
```

### 特點說明

- `state` 是一個函式，回傳物件，定義響應式資料。
- `getters` 為基於 state 的計算屬性，類似 Vue 的 computed。
- `actions` 用於定義操作狀態的方法，且可包含異步邏輯。
- 語法簡單，概念清晰，適合快速上手。

---

## 2. Setup Store 範例

```js
// stores/counterSetup.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function incrementBy(amount) {
    count.value += amount;
  }

  return {
    count,
    doubleCount,
    increment,
    incrementBy,
  };
});
```

### 特點說明

- 直接使用 Vue Composition API 的 `ref` 和 `computed`。
- 可自由使用所有 Vue Composition API 來封裝邏輯。
- 方法與狀態同時定義在函式作用域內，結構更模組化。
- 支援更複雜狀態邏輯與副作用控制。

---

## 3. 比較分析

| 項目               | Option Store              | Setup Store                               |
| ------------------ | ------------------------- | ----------------------------------------- |
| **語法風格**       | 物件式，類似 Vuex         | 函式式，基於 Composition API              |
| **學習曲線**       | 容易入門，結構清楚        | 需要熟悉 Vue 3 Composition API            |
| **狀態管理**       | 透過 `state` 函式返回物件 | 使用 `ref` 或 `reactive` 定義狀態         |
| **計算屬性**       | 透過 `getters` 定義       | 使用 `computed` 定義                      |
| **方法定義**       | 放在 `actions` 中         | 直接函式內定義，結構更自由                |
| **邏輯拆分**       | 較不靈活，所有邏輯集中    | 可拆分成多個函式模組，彈性更高            |
| **異步處理**       | 支援，寫法較直觀          | 支援，且更方便搭配 `async/await`          |
| **重用性**         | 較弱                      | 易於組合與重用，搭配 Composition API 更佳 |
| **持久化插件支持** | 兩者皆支持                | 兩者皆支持                                |
| **與 Vue 3 整合**  | 一般                      | 深度整合，充分發揮 Vue 3 特性             |

---

## 4. 什麼時候用哪種？

- \*\*初學者或 Vuex 使用者：\*\*建議先使用 Option Store，語法熟悉、過渡平滑。
- \*\*專案中需大量組合邏輯、重用邏輯時：\*\*Setup Store 更適合，也更符合 Vue 3 生態。
- \*\*大型專案或團隊合作：\*\*Setup Store 可拆分細節更清楚，便於維護與測試。
- \*\*希望在 Store 中使用複雜副作用（例如 watch、watchEffect）：\*\*必須使用 Setup Store。

---

## 5. 總結與建議

Pinia 的 Option Store 與 Setup Store 各有優劣，根據團隊熟悉度、專案規模與需求選擇合適的寫法。掌握兩者能幫助你靈活應對不同開發場景。

---

## 補充：如何在專案中使用

1. 安裝 Pinia：

```bash
npm install pinia
```

2. 在 `main.js` 初始化：

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
```

3. 直接在組件中使用 store：

```js
<script setup>
import { useCounterStore } from '@/stores/counterSetup';

const counter = useCounterStore();

function increase() {
  counter.increment();
}
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="increase">增加</button>
  </div>
</template>
```
