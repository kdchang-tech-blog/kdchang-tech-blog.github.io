---
title: React 效能優化入門教學筆記 | 學習筆記
date: 2024-12-27 02:23:41
authors: kdchang
tags:
  - Performance Optimization
  - React
  - ES Module
---

## 前言

隨著前端應用日益龐大，單頁應用（SPA）在初次載入時常面臨 JavaScript 檔案過大、載入時間過久的問題，導致使用者等待時間過長、效能下降。為了解決這個問題，React 與現代建構工具（如 Webpack、Vite）提供了 Code Splitting（程式碼分割）與 Lazy Loading（延遲載入）兩種策略，協助開發者更有效地管理與優化應用程式的載入流程。

程式碼分割（Code Splitting）和惰性載入（Lazy Loading）都是用來優化網頁效能的方法，它們都旨在減少初始加載時間，但實現方式和目標略有不同。 程式碼分割是將程式碼分割成多個較小的塊，而惰性載入則是在需要時才加載這些塊。

## 一、程式碼分割（Code Splitting）

### 概念:

程式碼分割是將一個大型的 JavaScript 應用程式分割成多個較小的、獨立的塊，每個塊包含應用程式的一部分程式碼。 這些塊通常是根據路由、元件或功能來分割的。

### 目標:

主要目標是減少應用程式的初始加載時間，通過只加載使用者當前需要的程式碼塊，而不是一次性加載所有程式碼。

### 實現方式:

程式碼分割通常使用打包工具（如 Webpack、Rollup 等）和動態`import()`語法來實現。

### 使用時機:

在編譯時（build time）就進行分割。

## 二、惰性載入（Lazy Loading）

### 概念:

惰性載入是指在需要的時候才加載程式碼，而不是在應用程式初始化時就加載所有程式碼。

### 目標:

減少應用程式的初始加載時間，特別是對於大型應用程式或元件。

### 實現方式:

惰性載入通常使用 React.lazy 和 Suspense 元件來實現，也可以配合程式碼分割一起使用。

### 使用時機:

在執行時（runtime）才加載，通常是當使用者訪問某個路由、觸發某個事件或需要顯示某個元件時。

## 差異總結

| 特性     | 程式碼分割 Code Splitting                                     | 惰性載入 Lazy Loading                   |
| -------- | -------------------------------------------------------------- | ---------------------------------------- |
| 概念     | 將程式碼分割成多個塊                                           | 在需要時才加載程式碼                     |
| 目標     | 減少初始加載時間，優化效能                                     | 減少初始加載時間，優化效能               |
| 實現方式 | 打包工具，dynamic import()                                     | React.lazy, Suspense, dynamic import() |
| 時機     | 編譯時                                                         | 執行時                                   |
| 關聯性   | 程式碼分割是惰性載入的基礎，惰性載入可以利用程式碼分割的結果。 |                                          |

## 重點摘要

- **Code Splitting（程式碼分割）**

  - 是一種將整個應用程式切割成多個檔案的技術
  - 通常由 Webpack、Rollup 等建構工具自動處理
  - 可應用於 route-based 分割、component-based 分割等情境
  - 不代表一定是延遲載入，僅是結構上的切割

- **Lazy Loading（延遲載入）**

  - 是一種執行時載入程式碼的策略
  - 常與 `import()` 搭配，直到實際使用時才載入
  - 通常透過 `React.lazy`、`Suspense` 實現元件的懶載入
  - 是 Code Splitting 的使用方式之一

- **兩者關係**

  - Code Splitting 是靜態建構階段的優化策略
  - Lazy Loading 是執行階段的載入行為
  - Lazy Loading 必須建立在已做 Code Splitting 的前提上

- **效益**

  - 減少主程式 bundle 的大小
  - 提升首次載入速度（First Contentful Paint）
  - 延遲不必要的資源載入，節省頻寬與記憶體

---

## 實際範例

### 範例一：傳統未分割的情況（單一 bundle）

```jsx
// App.js
import HomePage from './HomePage';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <HomePage />
      <Dashboard />
    </>
  );
}
```

這樣寫會導致 HomePage 和 Dashboard 在應用一開始就被載入，無論使用者有沒有看到這些元件。

---

### 範例二：使用 React.lazy 實現 Lazy Loading 與 Code Splitting

```jsx
// App.js
import React, { Suspense } from 'react';

// Lazy Loading：只有在渲染時才動態 import
const HomePage = React.lazy(() => import('./HomePage'));
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <HomePage />
      <Dashboard />
    </Suspense>
  );
}
```

使用 `React.lazy()` 搭配 `import()` 會讓 Webpack 將這些元件建立為獨立的 chunk。
真正渲染時（如使用者切換頁面），才會觸發載入行為，減少初始 bundle 體積。

---

### 範例三：Route-based Code Splitting（React Router）

```jsx
// AppRouter.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>頁面載入中...</div>}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
}
```

使用路由為單位切割頁面元件，是最常見的 Code Splitting 實務做法。

---

### 範例四：動態 import 實作非元件的延遲載入

```jsx
// utils.js
export function heavyCalculation(input) {
  // 假設這段計算非常耗時
  return input ** 10;
}
```

```jsx
// App.js
function handleClick() {
  import('./utils').then(({ heavyCalculation }) => {
    const result = heavyCalculation(5);
    console.log(result);
  });
}
```

在某些不需要立即執行的邏輯或大型工具函式庫，也可以透過 `import()` 動態載入來延遲其成本。

---

## 常見問題與補充

### Q1：Code Splitting 是自動的嗎？

- 大部分情況下需要手動設計入口點（如 `React.lazy` 或 `import()`），Webpack 才會建立分離的 chunk。

### Q2：只有使用 `React.lazy` 才能 Lazy Load 嗎？

- 不一定，`import()` 是底層機制，也可配合其他框架（Vue、Svelte）或工具（React Loadable）使用。

### Q3：懶載入的元件可以預載嗎？

- 可以，透過 `import().then()` 觸發一次即可放進瀏覽器快取，達到「預熱」效果。

---

## 總結

在前端應用越來越大型化的今天，掌握 Code Splitting 與 Lazy Loading 的差異與使用場景，已成為每位前端工程師的必備技能。Code Splitting 解決的是「結構上的模組分離」，Lazy Loading 則是「載入時機的延後」。兩者密不可分，但用法與思考層次不同。

實務上可先針對頁面級路由進行分割，再進一步優化元件級的載入、工具模組載入時機，逐步降低初始 bundle 體積，提升網站效能與使用者體驗。

## 參考文件

1. [React | 為太龐大的程式碼做 Lazy Loading 和 Code Splitting](https://medium.com/starbugs/react-%E7%82%BA%E5%A4%AA%E9%BE%90%E5%A4%A7%E7%9A%84%E7%A8%8B%E5%BC%8F%E7%A2%BC%E5%81%9A-lazy-loading-%E5%92%8C-code-splitting-7384626a6e0d)