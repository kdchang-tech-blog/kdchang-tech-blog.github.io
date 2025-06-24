---
title: React List 入門教學 | w3schools 學習筆記
date: 2024-01-09 11:33:41
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

React 是一個用於建立 UI 組件的 JavaScript 函式庫，而 JSX 則是 React 中的重要語法擴充。前一章我們已學會如何使用 JSX 編寫 React 介面，本文將進一步說明 React 元件（Components）、props、事件處理（Events）、條件渲染（Conditional Rendering）與列表渲染（Lists）的基本觀念與應用，協助讀者掌握建立互動式介面的核心技巧。

## 渲染列表與使用 key

基本列表渲染：

```jsx
function Car(props) {
  return <li>I am a {props.brand}</li>;
}

function Garage() {
  const cars = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => (
          <Car brand={car} />
        ))}
      </ul>
    </>
  );
}
```

加上 key 改寫版本：

```jsx
function Car(props) {
  return <li>I am a {props.brand}</li>;
}

function Garage() {
  const cars = [
    { id: 1, brand: 'Ford' },
    { id: 2, brand: 'BMW' },
    { id: 3, brand: 'Audi' },
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => (
          <Car key={car.id} brand={car.brand} />
        ))}
      </ul>
    </>
  );
}
```

結論
React 提供了彈性而強大的組件機制，透過 props 傳遞資料、事件處理強化互動、條件與列表渲染控制顯示邏輯，讓開發者可以有效建立模組化與資料驅動的使用者介面。熟悉這些基本觀念，將為深入理解 React 的狀態管理與 hooks 打下堅實基礎。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
