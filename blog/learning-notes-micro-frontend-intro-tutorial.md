---
title: 微前端（Micro-Frontend）介紹與入門教學筆記 | 學習筆記
date: 2024-12-31 11:33:41
authors: kdchang
tags:
  - npm
  - 前端
  - 前端開發
  - 前端工程
  - 微前端
  - Micro-Frontend
---

## 前言

隨著前端應用日益複雜、團隊規模擴大，「前端單體應用」（Monolithic Frontend）逐漸面臨維護困難、部署不靈活、開發效率低落等問題。微前端（Micro-Frontend）是一種將大型前端應用拆解為數個獨立子應用的架構設計理念，靈感來自後端的微服務（Microservices）架構。每個子應用可以由不同的團隊獨立開發、部署、維護，並共同組成一個整體的產品。

微前端不是某個框架，而是一種架構模式。它的目標是促進前端大型專案的模組化、團隊分工清晰、技術選型彈性，進而提升整體開發與交付效率。

---

## 重點摘要

### 微前端的常見做法

1. Module Federation（Webpack 5 原生支援，超常見）

- 各子應用直接共享模組，不用重複打包
- Webpack 官方強項，Vite 沒有原生支援

2. iframe / Web Component（框架無關，通用做法）

- 每個子應用獨立部署，用 iframe 或 custom elements 包裝
- Vite/React/Vue/Angular 都可以做

3. 乾淨的 build output + 部署整合

- 子應用都 build 出靜態資源，整合到主應用路由
- 跟工具無關，Vite 也能勝任

- **定義**：微前端是一種將前端應用拆解為多個獨立子應用的架構設計模式。
- **目的**：

  - 支援大型團隊並行開發
  - 提高部署彈性（單一子應用可獨立上線）
  - 增加技術選擇自由度（不同子應用可使用不同框架）

- **核心概念**：

  - 子應用獨立開發、測試與部署
  - 主應用統一載入與整合子應用
  - 子應用可共享部分資源（如登入狀態、UI 元件）

- **常見實作方式**：

  - iframe（早期簡單做法，但 UX 不佳）
  - Web Component（標準化但整合與溝通略複雜）
  - JavaScript 插入與渲染（如 single-spa、Module Federation）

- **適用時機**：

  - 專案規模大、開發團隊超過 2 組以上
  - 需要支援異步部署與灰階上線
  - 跨框架共存需求（如同時有 React 與 Vue）

---

## 微前端實作方式簡介

### 1. iframe（不推薦）

將子應用放入 `iframe` 中載入，雖然簡單，但隔離性太強（無法共用狀態、樣式），SEO 和體驗差，不推薦用於現代 Web 專案。

### 2. Web Components（中立）

透過瀏覽器原生的 Custom Elements 技術（如 `my-app-widget`），讓子應用變成一個可重用的 HTML 元件，框架中立，但整合難度高。

### 3. JavaScript 插入與路由分流（主流）

由主應用動態載入子應用（HTML、JS、CSS），並透過路由或 DOM 控制子應用顯示。可使用像是：

- [single-spa](https://single-spa.js.org/)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [qiankun](https://qiankun.umijs.org/)

其中 `qiankun` 是阿里開源的基於 `single-spa` 的微前端框架，中文文件齊全且上手容易。

---

## 實際範例：使用 qiankun 快速建立微前端架構

### 範例說明

目標：建立一個主應用（main-app），載入兩個子應用（react-app、vue-app）

### 1. 安裝 qiankun（主應用）

```bash
npm install qiankun
```

### 2. 主應用主體程式碼（main-app/src/main.ts）

```ts
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3001',
    container: '#subapp-container',
    activeRule: '/react',
  },
  {
    name: 'vue-app',
    entry: '//localhost:3002',
    container: '#subapp-container',
    activeRule: '/vue',
  },
]);

start();
```

### 3. 主應用 HTML 模板

```html
<div id="subapp-container"></div>
```

### 4. 子應用需支援 qiankun 的生命週期函式（以 React 為例）

```ts
export async function bootstrap() {
  console.log('React app bootstraped');
}
export async function mount(props) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
```

### 5. 子應用 Webpack 設定（publicPath）

```js
output: {
  publicPath: 'http://localhost:3001/',
},
```

---

## 微前端的挑戰與注意事項

- **樣式隔離**：CSS 必須避免衝突，可搭配 CSS Modules、Scoped CSS。
- **狀態共享**：登入資訊、使用者資料等需透過 global event 或共享 storage 處理。
- **路由協調**：子應用與主應用須協調 route 設計，避免相互干擾。
- **部署整合**：CI/CD pipeline 需考慮子應用與主應用的獨立部署與測試。

---

## 總結

微前端是一種極具彈性的架構設計理念，適合中大型團隊協作、複雜前端系統的模組化開發。不過它也帶來額外的技術成本與整合挑戰。在決定導入微前端前，應評估專案規模、開發團隊結構與維運資源是否適合。

實作上，建議可從單一框架開始（如 React + qiankun），逐步拆分模組與部署機制，再逐步進化為多框架混合的微前端架構，避免過早複雜化系統。
