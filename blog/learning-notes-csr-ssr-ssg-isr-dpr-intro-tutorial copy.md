---
title: 前端渲染模式入門教學筆記：CSR、SSR、SSG、ISR、DPR | 學習筆記
date: 2024-12-13 02:23:41
authors: kdchang
tags:
  - CSR
  - SSR
  - SSG
  - ISR
  - DPR
---

## 前言

隨著前端框架如 React、Vue、Next.js、Nuxt 的普及，網站渲染方式也變得更加多樣化。不再只是單純地將 HTML 靜態輸出，開發者可依據產品需求選擇合適的渲染模式，如 CSR（Client Side Rendering）、SSR（Server Side Rendering）、SSG（Static Site Generation）、ISR（Incremental Static Regeneration）和 DPR（Distributed Persistent Rendering）。這些策略在效能、SEO、使用者體驗與部署維運上各有優劣。

本篇將簡明扼要介紹這些渲染方式的基本概念、特性差異與適用情境，並透過簡單範例說明。

---

## 重點摘要

- **CSR（Client Side Rendering）**

  - 完整渲染交由瀏覽器執行
  - 初始速度慢但互動性高
  - 適合 SPA 應用與登入後系統

- **SSR（Server Side Rendering）**

  - 首次請求由伺服器生成 HTML
  - 較佳的 SEO 與初次載入速度
  - 適合需要即時資料更新與 SEO 的網站

- **SSG（Static Site Generation）**

  - 編譯階段預先產出 HTML
  - 非常快、可搭配 CDN 快取
  - 適合內容固定或更新頻率低的網站

- **ISR（Incremental Static Regeneration）**

  - 結合 SSG 和 SSR 優勢
  - 預先生成 + 背景重新生成
  - 適合部份動態又希望維持快取效能的頁面

- **DPR（Distributed Persistent Rendering）**

  - 通常指 Vercel、Netlify 的延遲生成與儲存機制
  - 第一次請求時產生頁面並儲存供後續使用
  - 可視為 ISR 的延伸架構

---

## 各種渲染方式概念與範例

### 1. Client Side Rendering（CSR）

**概念：**
網站載入時只傳送一個空的 HTML 檔案和 JavaScript 程式，資料由瀏覽器下載後執行渲染。常見於 React、Vue 等 SPA 應用。

**優點：**

- 使用者體驗流暢，適合高度互動介面
- 遷移頁面不需重新載入

**缺點：**

- 首次載入慢，對 SEO 不利
- 如果 JS 載入失敗，畫面會呈現空白

**範例：**

```jsx
// React CSR 應用
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
```

部署後的 HTML 初始如下：

```html
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

---

### 2. Server Side Rendering（SSR）

**概念：**
每次請求時，伺服器動態產生完整 HTML 頁面並傳給瀏覽器。Next.js 等框架支援 SSR。

**優點：**

- 快速呈現內容，對 SEO 友善
- 可根據請求產出客製化內容

**缺點：**

- 每次請求都需重新計算，伺服器壓力大
- 開發與維護相對複雜

**範例（Next.js）**

```tsx
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

---

### 3. Static Site Generation（SSG）

**概念：**
在建置階段預先產生所有 HTML 頁面，部署後為靜態檔案，可用 CDN 快取。

**優點：**

- 載入速度快
- 可用於免費 CDN，例如 GitHub Pages、Vercel

**缺點：**

- 無法處理頻繁變動的資料
- 若內容變更需重新部署

**範例（Next.js）**

```tsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

---

### 4. Incremental Static Regeneration（ISR）

**概念：**
在 SSG 基礎上增加「背景重新建置」能力。首次請求使用舊版頁面，背景靜默更新最新版本。

**優點：**

- 同享 SSG 的快取效能
- 同時具備動態更新能力

**缺點：**

- 實作較複雜，需要平台支援（如 Next.js on Vercel）

**範例（Next.js）**

```tsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return {
    props: { data },
    revalidate: 60, // 每 60 秒可重新生成一次
  };
}
```

---

### 5. Distributed Persistent Rendering（DPR）

**概念：**
首度請求頁面時即時產生內容並儲存於分散式快取（如 CDN 或 edge network），後續請求使用快取內容。

**優點：**

- 初次請求稍慢，但之後快如 SSG
- 不需事先建構所有頁面（省資源）

**缺點：**

- 首次請求延遲較高
- 需仰賴平台（如 Vercel 的 On-Demand ISR）

**範例：**
在 Next.js 中使用 `revalidate: 'on-demand'` 需搭配 Vercel 平台設定。

---

## 各渲染方式比較表

| 渲染方式 | 初次速度   | SEO 友善 | 動態內容 | 開發複雜度 | 適用場景           |
| -------- | ---------- | -------- | -------- | ---------- | ------------------ |
| CSR      | 慢         | 差       | 好       | 低         | SPA、登入後介面    |
| SSR      | 中等       | 好       | 好       | 中         | 部落格、商品頁     |
| SSG      | 快         | 好       | 差       | 中         | 文件、靜態頁面     |
| ISR      | 快         | 好       | 中       | 高         | 新聞、部份變動頁面 |
| DPR      | 首次慢後快 | 好       | 好       | 高         | 海量頁面動態生成   |

---

## 總結

選擇正確的渲染模式，取決於你的網站目標、使用情境與部署資源。對於希望提升初次載入速度與 SEO 的內容網站，SSR 或 SSG 是合適的選擇；若偏重互動性或使用者登入後操作，CSR 更適合。對於需要兼顧靜態快取與動態更新的情境，ISR 或 DPR 提供了良好的平衡。
