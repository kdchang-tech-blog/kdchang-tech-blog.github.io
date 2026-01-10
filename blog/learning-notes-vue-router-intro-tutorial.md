---
title: Vue Router 入門教學筆記 | 學習筆記
date: 2024-11-16 11:33:41
author: kdchang
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

Vue Router 是 Vue.js 官方提供的前端路由解決方案，專為構建單頁應用（SPA, Single Page Application）而設計。它讓我們可以根據網址變化動態切換畫面而不重新載入頁面，是開發 Vue 應用不可或缺的工具之一。

本文將介紹 Vue Router 的基本概念、安裝方式、核心語法，並透過簡單實作幫助我們快速入門。

---

## 一、什麼是前端路由

在傳統網頁架構中，網址的改變會導致瀏覽器重新向伺服器請求一個新的 HTML 頁面。但在 SPA 中，整個網站的內容是透過 JavaScript 管理畫面切換，網址改變時並不會重新載入整個頁面，而是由「前端路由器」來處理畫面更新。

Vue Router 就是 Vue 的前端路由器。

---

## 二、安裝 Vue Router

在 Vue 3 專案中，可以透過以下指令安裝 Vue Router：

```bash
npm install vue-router@4
```

安裝完成後，在 `src/router/index.js`（或 `router.ts`）中建立路由設定。

---

## 三、基本使用範例

### 1. 建立路由元件

建立幾個簡單的元件：

```js
// src/views/Home.vue
<template>
  <h1>首頁</h1>
</template>

// src/views/About.vue
<template>
  <h1>關於我們</h1>
</template>
```

### 2. 設定路由

```js
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 3. 在 main.js 掛載路由

```js
// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
```

### 4. 使用 `<router-view>` 顯示頁面

```vue
<!-- src/App.vue -->
<template>
  <div>
    <h1>我的網站</h1>
    <nav>
      <router-link to="/">首頁</router-link>
      |
      <router-link to="/about">關於</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
```

`<router-link>` 是 Vue Router 提供的元件，用來建立不重新載入的內部連結。`<router-view>` 則是畫面會顯示對應元件的插槽。

---

## 四、動態路由參數

可使用 `:id` 的方式定義動態參數：

```js
// router/index.js
import User from "../views/User.vue";

const routes = [{ path: "/user/:id", component: User }];
```

在元件中取得參數：

```vue
<!-- views/User.vue -->
<template>
  <div>使用者 ID：{{ $route.params.id }}</div>
</template>
```

---

## 五、巢狀路由

當需要在某個頁面內部再切換子頁面時，可使用巢狀路由。

```js
// router/index.js
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "profile", component: Profile },
      { path: "settings", component: Settings },
    ],
  },
];
```

在 `Dashboard.vue` 中放置 `<router-view>` 來呈現子路由內容：

```vue
<template>
  <div>
    <h2>儀表板</h2>
    <router-link to="/dashboard/profile">個人資料</router-link>
    <router-link to="/dashboard/settings">設定</router-link>
    <router-view></router-view>
  </div>
</template>
```

---

## 六、導覽守衛（Navigation Guard）

我們可以用來保護某些頁面，例如使用者未登入不得進入：

```js
// router/index.js
const router = createRouter({...})

router.beforeEach((to, from, next) => {
  const isLoggedIn = false // 假設未登入
  if (to.path === '/dashboard' && !isLoggedIn) {
    next('/') // 導回首頁
  } else {
    next()
  }
})
```

---

## 七、路由模式（Hash vs History）

Vue Router 支援兩種模式：

1. **Hash 模式（預設）：** 網址含 `#`，如 `/#/about`，適用於靜態伺服器
2. **History 模式（推薦）：** 網址乾淨，需伺服器配合設定

選擇 History 模式時，需設定：

```js
createRouter({
  history: createWebHistory(),
  routes,
});
```

若使用 Vite / Vue CLI，也需額外設定伺服器的 404 fallback。

---

## 八、程式化導航

我們也可以在程式中使用 `$router` 導覽：

```js
this.$router.push("/about");
```

或者使用命名路由與參數：

```js
this.$router.push({ name: "user", params: { id: 123 } });
```

---

## 九、總結

| 概念            | 說明                       |
| --------------- | -------------------------- |
| `<router-view>` | 顯示當前路由對應的元件     |
| `<router-link>` | 建立內部連結               |
| `$route`        | 取得當前路由資訊（如參數） |
| `$router`       | 控制路由導航的方法         |
| 動態路由        | 使用 `:id` 定義參數        |
| 巢狀路由        | 路由中可包含子路由         |
| 導覽守衛        | 控制進入頁面的權限         |
| 模式            | `hash` 或 `history` 模式   |

---

## 結語

Vue Router 是構建 Vue SPA 必備的工具之一，掌握它能幫助我們設計更有結構、可導航的前端應用。在進階應用中，Vue Router 還支援命名路由、懶加載、滾動行為、過渡動畫等功能。

如果我們有興趣了解 Vue Router 與後端整合、登入驗證、或 Nuxt.js 中的路由自動生成，歡迎再提出更進一步的需求。
