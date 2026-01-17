---
title: Vuex 入門教學筆記：集中式狀態管理實作入門教學筆記 | 學習筆記
date: 2024-11-16 11:33:41
authors: kdchang
tags:
  - Vue
  - Vue Router
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 前言

在 Vue.js 開發中，當應用程式變得複雜，元件之間需要共享的狀態越來越多時，僅靠 props 與 events 傳遞資料會變得混亂與難以維護。這時，我們就需要一個集中式的狀態管理方案，而 Vuex 正是官方為 Vue 提供的解決方案。

Vuex 是一個專為 Vue 應用開發的狀態管理模式。它將應用中所有的狀態集中管理，並以可預測的方式更新，便於追蹤與維護。

---

## 一、Vuex 是什麼？

Vuex 基於 [Flux 架構](https://facebook.github.io/flux/docs/in-depth-overview/) 設計，核心概念如下：

- **State**：集中管理的資料來源（全域狀態）
- **Getter**：從 state 派生出來的資料（類似 computed）
- **Mutation**：唯一可以同步改變 state 的方法
- **Action**：處理非同步操作並提交 mutation
- **Module**：將 store 拆分為模組化結構

---

## 二、安裝與設定 Vuex

以 Vue 3 專案為例，先安裝 Vuex：

```bash
npm install vuex@4
```

### 建立 store

```js
// src/store/index.js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
});

export default store;
```

---

## 三、在 Vue 中註冊 Vuex

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

createApp(App).use(store).mount("#app");
```

---

## 四、在元件中使用 Vuex

### 1. 讀取 State 和 Getter

```vue
<template>
  <div>
    <p>Count：{{ count }}</p>
    <p>Double：{{ doubleCount }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const doubleCount = computed(() => store.getters.doubleCount);
    return { count, doubleCount };
  },
};
</script>
```

### 2. 呼叫 Mutation 和 Action

```vue
<template>
  <button @click="increment">+1</button>
  <button @click="incrementAsync">+1（非同步）</button>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const increment = () => store.commit("increment");
    const incrementAsync = () => store.dispatch("incrementAsync");
    return { increment, incrementAsync };
  },
};
</script>
```

---

## 五、模組化 Vuex Store

當我們的應用變大，state 增加時，可將 store 拆分成多個模組。

```js
// src/store/modules/counter.js
export default {
  namespaced: true,
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      state.count++;
    },
  },
};
```

```js
// src/store/index.js
import { createStore } from "vuex";
import counter from "./modules/counter";

export default createStore({
  modules: {
    counter,
  },
});
```

在元件中使用時要記得模組的命名空間：

```js
store.commit("counter/increment");
```

---

## 六、Vuex 與 Composition API 的搭配

Vuex 4 支援 Vue 3 的 Composition API，我們可以透過 `useStore()` 搭配 `computed()` 來存取或操作資料。這樣的使用方式更模組化，也能更輕鬆撰寫邏輯可重用的自定義 hooks。

```js
// composables/useCounter.js
import { computed } from "vue";
import { useStore } from "vuex";

export default function useCounter() {
  const store = useStore();
  const count = computed(() => store.state.counter.count);
  const increment = () => store.commit("counter/increment");
  return { count, increment };
}
```

---

## 七、Vuex 與非同步操作的實務應用

Vuex 的 Action 適合處理 API 呼叫，例如取得後端資料：

```js
// store/modules/todos.js
export default {
  namespaced: true,
  state: () => ({
    list: [],
    loading: false,
  }),
  mutations: {
    setLoading(state, flag) {
      state.loading = flag;
    },
    setTodos(state, todos) {
      state.list = todos;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      commit("setLoading", true);
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      commit("setTodos", data.slice(0, 5));
      commit("setLoading", false);
    },
  },
};
```

---

## 八、Vuex 的限制與未來

Vuex 提供完整的狀態追蹤與結構化設計，適合大型應用。不過，它的學習曲線略高，對於小型專案可能顯得冗長。Vue 團隊也在 Vue 3 推出後推薦使用 [Pinia](https://pinia.vuejs.org/) 作為新的官方狀態管理方案，擁有更輕量的語法與更佳的 TypeScript 支援。

但 Vuex 在大型專案、多人協作、需要嚴格管理資料流程的場景下仍然非常實用與穩定。

---

## 九、總結與建議

| 功能            | 說明                         |
| --------------- | ---------------------------- |
| state           | 全域共享狀態資料             |
| getters         | 從 state 衍生計算的資料      |
| mutations       | 同步更新狀態的唯一方法       |
| actions         | 處理非同步並提交 mutation    |
| modules         | 將 store 拆分管理            |
| Composition API | 搭配 `useStore()` 模組化使用 |

建議我們在小型應用中可以先用 `props` 和 `emit` 傳遞資料，等到資料流變複雜或頁面之間需頻繁共享狀態時，再引入 Vuex 管理。當然，若我們正開發大型後台系統、電子商務網站，Vuex 的集中式結構能大大提升可維護性與擴展性。

如欲進一步探索，建議查看 Vuex 官方文件、或試著實作一個待辦清單管理應用，實踐 Vuex 中的完整生命週期與流程。
