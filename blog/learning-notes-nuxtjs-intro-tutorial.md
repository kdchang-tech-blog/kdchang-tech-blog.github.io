---
title: Nuxt.js 入門教學筆記 | 學習筆記
date: 2024-12-02 02:23:41
author: kdchang
tags: 
    - Nuxt
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - CSS
    - Nuxt.js
    - Vue.js

---

# 一、什麼是 Nuxt.js？  

`Nuxt.js` 是一個基於 `Vue.js` 的漸進式框架，專為構建伺服器端渲染（`SSR`）和靜態站點生成（`SSG`）應用程式而設計。它提供開發者一個強大的開發體驗，並簡化 Vue.js 應用的架構與設定，適合 SEO 優化、效能最佳化以及提升開發效率。  

Nuxt.js 的核心特性包括：  

1. **伺服器端渲染（SSR）**：增強 SEO 並提升初始載入速度。  
2. **靜態站點生成（SSG）**：透過預先生成 HTML 提供更快的載入時間。  
3. **自動路由**：基於 `pages` 目錄的檔案自動建立對應的路由，無需額外配置 Vue Router。  
4. **模組系統**：支援大量 Nuxt 模組（如 TailwindCSS、PWA、Auth 等）來快速擴展功能。  
5. **組態簡單**：預設優化 Vue.js 應用的結構與設定，減少繁瑣的配置工作。  
6. **組件自動載入**：Nuxt 可自動載入 `components` 目錄內的 Vue 組件，減少 `import` 的需求。  

---

# 二、安裝與初始化 Nuxt.js  

### 1. 使用 Nuxt CLI 安裝（推薦方式）  

Nuxt 提供官方 CLI 工具 `nuxi` 來建立新專案。  

```sh
npx nuxi init my-nuxt-app
cd my-nuxt-app
npm install
```

上述指令會自動建立一個 `my-nuxt-app` 專案，並下載 Nuxt 相關相依套件。  

### 2. 使用 `create-nuxt-app` 安裝（舊版方式）  

如果要使用較舊的安裝方式，也可以透過 `create-nuxt-app` 指令來建立專案：  

```sh
npx create-nuxt-app my-nuxt-app
```

此方法會提供互動式選單，讓開發者選擇 UI 框架（TailwindCSS、Bootstrap）、插件（Axios、PWA）以及 Nuxt 模式（SSR 或 SSG）。  

### 3. 啟動開發伺服器  

安裝完成後，可以執行以下指令來啟動開發環境：  

```sh
npm run dev
```

預設會啟動本機伺服器 `http://localhost:3000`，可在瀏覽器中打開檢視。  

---

# 三、專案結構  

Nuxt.js 採用約定式（Convention over Configuration）架構，專案目錄結構如下：  

```sh
my-nuxt-app/
│── assets/        # 未編譯的靜態資源，如 CSS、圖片
│── components/    # Vue 組件（自動載入）
│── layouts/       # 頁面佈局
│── pages/         # 自動建立的路由頁面
│── plugins/       # Nuxt 插件，如 Vue 插件或第三方庫
│── public/        # 靜態資源，可直接透過 URL 存取
│── server/        # 伺服器端 API（Nuxt 3）
│── store/         # Vuex 狀態管理（Nuxt 2，Nuxt 3 改用 `pinia`）
│── nuxt.config.ts # Nuxt 設定檔
│── package.json   # npm 套件設定
```

---

# 四、路由與頁面  

### 1. 自動建立路由  

Nuxt.js 會根據 `pages/` 目錄內的 Vue 檔案自動產生對應的路由。例如，在 `pages/index.vue` 建立首頁：  

```vue
<template>
  <div>
    <h1>歡迎來到 Nuxt.js</h1>
  </div>
</template>
```

若在 `pages/about.vue` 建立新的 Vue 檔案，則 `http://localhost:3000/about` 會自動對應到該頁面。  

### 2. 動態路由  

可以使用 `_` 命名的方式建立動態路由。例如，在 `pages/blog/_id.vue`：  

```vue
<template>
  <div>
    <h1>文章 ID: {{ route.params.id }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
```

訪問 `http://localhost:3000/blog/123`，頁面將顯示 `文章 ID: 123`。  

---

# 五、Nuxt 組件與佈局  

### 1. 自動載入組件  

在 `components/` 內的 Vue 檔案會自動載入，例如建立 `components/Navbar.vue`：  

```vue
<template>
  <nav class="bg-blue-500 p-4 text-white">
    <h1>網站導覽列</h1>
  </nav>
</template>
```

然後在 `pages/index.vue` 內直接使用 `<Navbar />`，無需 `import`：  

```vue
<template>
  <div>
    <Navbar />
    <h1>首頁內容</h1>
  </div>
</template>
```

### 2. 佈局（Layouts）  

佈局是共享的頁面結構，可在 `layouts/default.vue` 內定義：  

```vue
<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>
```

所有 `pages/` 內的頁面會自動套用 `default.vue` 佈局。  

---

# 六、Nuxt 伺服器端 API（Nuxt 3）  

Nuxt 3 內建簡單的 API 伺服器，可在 `server/api/hello.ts` 新增 API：  

```ts
export default defineEventHandler((event) => {
  return { message: "Hello from Nuxt API" };
});
```

這樣就可以透過 `http://localhost:3000/api/hello` 訪問該 API。  

---

# 七、Nuxt 資料獲取  

### 1. `useFetch()` 獲取 API 資料  

Nuxt 3 提供 `useFetch` 來處理 API 讀取，例如：  

```vue
<template>
  <div>
    <h1>{{ data.message }}</h1>
  </div>
</template>

<script setup>
const { data } = useFetch('/api/hello');
</script>
```

這會自動調用 `server/api/hello.ts` 並顯示回應內容。  

---

# 八、部署 Nuxt 應用  

### 1. 生成靜態站點  

若要將 Nuxt 部署為靜態網站，可執行：  

```sh
npm run build
npm run generate
```

這會在 `dist/` 目錄內產生靜態 HTML 檔案，可直接部署到 Netlify 或 Vercel。  

### 2. 部署至 Vercel  

使用 Vercel CLI 部署：  

```sh
npm install -g vercel
vercel
```

即可快速部署 Nuxt 應用。  

---

# 九、結語  

Nuxt.js 提供強大的功能來簡化 Vue.js 開發，透過自動路由、組件自動載入、伺服器 API 以及資料獲取等功能，大幅提升開發效率。對於需要 SEO 優化或靜態站點的專案而言，Nuxt 是一個非常適合的選擇。