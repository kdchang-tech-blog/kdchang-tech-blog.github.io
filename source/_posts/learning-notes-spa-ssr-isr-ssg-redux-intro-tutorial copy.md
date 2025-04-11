---
title: 前端渲染技術全解析：SSR、SSG、ISR、SPA 入門教學筆記 | 學習筆記
date: 2024-12-13 02:23:41
author: kdchang
tags: 
    - react
    - Redux
    - React Redux

---

# 前言
在現代網站開發中，前端技術日益進步，如何選擇合適的渲染方式，將直接影響網站的效能、SEO、開發效率與使用者體驗。本文將介紹四種常見渲染技術：**伺服器端渲染（SSR）**、**靜態網站生成（SSG）**、**增量靜態再生（ISR）**、以及**單頁應用（SPA）**，並搭配實例幫助理解。

---

## 一、伺服器端渲染（SSR：Server-Side Rendering）

### 原理說明：
伺服器在每次收到使用者請求時，根據當下的資料即時產出 HTML，並將這份渲染好的頁面送到使用者瀏覽器。這可以大幅提升搜尋引擎的收錄效率，並加快初次載入速度。

### 使用場景：
- 需要即時資料的頁面（如使用者個人頁、後台系統）
- 搜尋引擎優化（SEO）要求高
- 頁面內容根據請求變化大

### Next.js 範例：
```tsx
export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/user?id=1')
  const data = await res.json()
  return {
    props: { user: data }
  }
}
```
這段程式碼會在伺服器端取得使用者資料後渲染 HTML，再傳送到前端。

---

## 二、靜態網站生成（SSG：Static Site Generation）

### 原理說明：
在網站建置階段（Build 時），就預先將所有頁面產生成 HTML。當使用者請求頁面時，伺服器只需回傳對應的靜態檔案，效能極佳，且架構簡單。

### 使用場景：
- 內容不常改變的網站，如部落格、公司介紹頁
- 文章、產品列表等純展示型內容
- 追求快速讀取與高效能

### Next.js 範例：
```tsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return {
    props: { posts }
  }
}
```

如搭配 `getStaticPaths`，還可為每篇文章生成個別頁面。

---

## 三、增量靜態再生（ISR：Incremental Static Regeneration）

### 原理說明：
SSR 即時，SSG 快速，但無法即時更新。ISR 則是介於兩者之間的解法。它允許你指定一段時間（例如 60 秒），讓系統在背景自動更新靜態頁面。

### 特點：
- 頁面一開始是預先生成的（如 SSG）
- 當使用者訪問頁面時，如果該頁面已過期，系統會在背景自動更新新的 HTML
- 不需重新建置整個網站

### 使用場景：
- 商品頁、新聞頁等內容會更新，但不需秒級即時
- SEO 與效能並重的網站

### Next.js 範例：
```tsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/products')
  const data = await res.json()
  return {
    props: { products: data },
    revalidate: 60 // 每 60 秒背景重新生成一次
  }
}
```
這樣設定後，網頁會在最多 60 秒內保證顯示最新內容，舊頁面仍可正常存取。

---

## 四、單頁應用（SPA：Single Page Application）

### 原理說明：
SPA 是一種完全由前端處理路由與畫面切換的模式。當使用者訪問網站時，會下載一個 HTML 檔與所有 JavaScript 程式碼，接下來所有頁面切換與資料更新都在前端進行，並透過 API 取得資料。

### 優點：
- 頁面切換速度快
- 使用者體驗近似桌面應用程式
- 適合使用者登入後的操作介面

### 缺點：
- 搜尋引擎收錄困難（需配合 pre-render 或 SSR 解法）
- 初始載入可能較慢
- SEO 表現較差

### Vue.js SPA 範例：
```html
<template>
  <div>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>
```
搭配 Vue Router，使用者點選連結時會切換元件但不重新載入頁面。

---

## 五、如何選擇適合的渲染方式？

| 渲染方式 | 資料變動頻率 | SEO 需求 | 首次載入速度 | 範例應用 |
|----------|---------------|----------|----------------|------------|
| SSR      | 高             | 高        | 中等             | 登入後頁面、後台 |
| SSG      | 低             | 高        | 非常快           | 公司首頁、部落格 |
| ISR      | 中             | 高        | 快               | 商品頁、新聞頁 |
| SPA      | 高             | 低        | 首次慢、之後快    | 社群平台、系統後台 |

---

## 總結

在實際專案中，選擇合適的渲染方式往往不是二選一，而是根據頁面類型、使用場景與效能需求進行搭配。以 Next.js 為例，你可以在同一個應用中使用 SSR 處理使用者登入頁、使用 SSG 處理部落格頁面、使用 ISR 處理產品頁面，再配合 SPA 實現無縫的前端互動效果。

理解這四種渲染模式的差異與用途，將有助於開發出更高效、更穩定、且具良好使用體驗的現代網站。