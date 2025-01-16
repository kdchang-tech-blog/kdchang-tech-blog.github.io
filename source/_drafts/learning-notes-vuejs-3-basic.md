---
title: Vue3 自學入門教學筆記 | 學習筆記
date: 2023-07-16 11:33:41
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

# Vue.js 3 入門教學筆記

Vue.js 是一個輕量級、漸進式的 JavaScript 框架，適合用來建立現代化的前端應用程式。Vue.js 3 帶來了 Composition API、性能改進和更多新功能，以下為學習 Vue.js 3 的入門筆記。

## 1. 安裝與環境準備

### 使用 CDN
如果你只是要快速測試，可以直接使用 CDN：
```html
<script src="https://unpkg.com/vue@3"></script>
```
在這種情況下，`Vue` 會成為全域變數。

### 使用 Vue CLI
1. 安裝 Vue CLI：
   ```bash
   npm install -g @vue/cli
   ```
2. 創建專案：
   ```bash
   vue create my-vue-app
   ```
3. 進入專案目錄並啟動伺服器：
   ```bash
   cd my-vue-app
   npm run serve
   ```

### 使用 Vite
Vite 是一個更快速的建構工具，適合用來搭配 Vue.js 開發：
```bash
npm create vite@latest my-vue-app --template vue
cd my-vue-app
npm install
npm run dev
```

## 2. 基本概念

### Vue 應用程式的初始化
```javascript
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```
- `createApp` 創建一個 Vue 應用程式。
- `mount` 將應用掛載到 HTML 中的 `#app` 上。

### 基本範例
HTML 文件：
```html
<div id="app">{{ message }}</div>
```
JavaScript 文件：
```javascript
const app = Vue.createApp({
  data() {
    return {
      message: 'Hello, Vuejs 3!'
    };
  }
});

app.mount('#app');
```

### Vue 基本語法
- 插值語法：`{{ }}`
- 條件渲染：`v-if`、`v-else-if`、`v-else`
- 列表渲染：`v-for`
- 事件監聽：`v-on` 或 `@`

範例：
```html
<div id="app">
  <p v-if="isVisible">{{ message }}</p>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  <button @click="toggleVisibility">切換顯示</button>
</div>

<script>
  const app = Vue.createApp({
    data() {
      return {
        isVisible: true,
        message: 'Hello, Vue 3!',
        items: [
          { id: 1, name: '項目一' },
          { id: 2, name: '項目二' },
          { id: 3, name: '項目三' }
        ]
      };
    },
    methods: {
      toggleVisibility() {
        this.isVisible = !this.isVisible;
      }
    }
  });

  app.mount('#app');
</script>
```

## 3. Composition API
Composition API 是 Vue.js 3 的核心特性之一，它讓我們可以更靈活地組織程式碼。

### setup 函式
使用 `setup` 函式定義組件的邏輯：
```javascript
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    return { count, increment };
  }
};
```

範例模板：
```html
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>
```

### 使用 Reactive
`ref` 和 `reactive` 是 Composition API 的核心函式，用於定義響應式數據：
```javascript
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      count: 0
    });

    const increment = () => {
      state.count++;
    };

    return { state, increment };
  }
};
```

## 4. 元件 (Component)

### 定義元件
建立一個簡單的元件：
```javascript
export default {
  props: ['title'],
  template: `<h1>{{ title }}</h1>`
};
```

### 父子元件傳遞資料
父元件：
```html
<template>
  <ChildComponent :title="message" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      message: '來自父元件的訊息'
    };
  }
};
</script>
```

ChildComponent 子元件：
```javascript
export default {
  props: ['title'],
  template: `<h1>{{ title }}</h1>`
};
```

## 5. Vue Router 與 Vuex

### Vue Router
安裝 Vue Router：
```bash
npm install vue-router
```

定義路由：
```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

在應用中使用路由：
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

### Vuex (狀態管理)
安裝 Vuex：
```bash
npm install vuex
```

定義 Store：
```javascript
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      count: 0
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

export default store;
```

在應用中使用 Store：
```javascript
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

createApp(App).use(store).mount('#app');
```

## 總結
Vue.js 3 提供了更好的性能、更靈活的 API 和更簡潔的開發體驗。無論是使用 Composition API 還是 Options API，都能快速上手並構建強大的前端應用。

