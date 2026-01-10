---
title: React 入門教學 | w3schools 學習筆記
date: 2024-01-01 11:33:41
author: kdchang
tags:
  - React
  - React Hooks
  - Next.js
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 前言

在當代的前端開發中，React 是最具代表性的 JavaScript 函式庫之一。由 Facebook 軟體工程師 Jordan Walke 所開發，React 被廣泛應用於建構動態使用者介面，尤其適用於大型單頁應用（SPA, Single Page Application）。本篇文章將帶你認識 React 的核心概念、其背後的工作原理、使用前的基礎知識與發展歷史，並透過實例進行初步實作。

---

## 重點摘要

1. **什麼是 React？**

   - React 是一個前端 JavaScript 函式庫，用來建構使用者介面（UI）。
   - React 的別稱包括 React.js 與 ReactJS。
   - 它專注於「元件化思維」，每個 UI 元素都被視為一個可重複使用的元件（Component）。

2. **React 如何運作？**

   - React 在記憶體中建立一個「虛擬 DOM」（Virtual DOM）。
   - 所有 DOM 操作會先發生在虛擬 DOM 中，再批次更新實體 DOM。
   - 這樣的差異化更新策略可提升效能，只變更必要的部分。

3. **React 的優勢**

   - 高效能：避免不必要的 DOM 操作。
   - 組件化：提升程式碼的重用性與可維護性。
   - 單向資料流：資料流動清晰易懂。
   - 強大社群與生態圈：大量開源資源與工具支援。

4. **使用 React 前的必要基礎**

   - 熟悉 HTML 結構與語意標記。
   - 理解 CSS 排版與樣式應用。
   - 掌握 JavaScript 基本語法與函數觀念（如 ES6 語法、變數宣告、陣列方法等）。

5. **React 的發展歷程**

   - 2011 年：React 首次應用於 Facebook 的新聞動態功能（Newsfeed）。
   - 2013 年 7 月：React 對外發布首個公開版本 0.3.0。
   - 2024 年 12 月：React 最新穩定版本為 19.0.0。

---

## 實際範例

以下是一個簡單的 React 程式碼範例，展示如何建立與渲染一個元件。

```jsx
// 引入 React 與 ReactDOM 函式庫
import React from 'react';
import ReactDOM from 'react-dom/client';

// 建立一個簡單的元件
function Welcome() {
  return <h1>你好，React 世界！</h1>;
}

// 在指定的 DOM 節點中渲染該元件
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Welcome />);
```

### 解說：

1. `import React from 'react';` 是使用 React 所必須的匯入語句。
2. `Welcome` 是一個函數式元件（Functional Component），回傳的是 JSX 語法。
3. `ReactDOM.createRoot` 創建一個 root 對象，負責將元件掛載至網頁的 `#root` DOM 節點。
4. `root.render(<Welcome />)` 是將我們的元件渲染到網頁中。

---

## 總結

React 是一個現代網頁開發的重要工具，特別適合構建具互動性與模組化結構的網頁。透過虛擬 DOM 技術，React 讓介面更新更有效率，並提供清晰的元件架構設計。對於有基本前端知識的開發者而言，React 是進階的最佳入門選擇之一。建議你在學習 React 前，先打好 HTML、CSS 與 JavaScript 的基礎，將能更順利掌握 React 的概念與應用。

接著我們將學習 React 的 JSX 語法、狀態管理（useState）、事件處理、生命週期（useEffect）等核心概念，逐步建立自己的 React 專案。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
