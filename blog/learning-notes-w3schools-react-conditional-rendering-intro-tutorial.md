---
title: React 條件渲染入門教學 | w3schools 學習筆記
date: 2024-01-08 11:33:41
authors: kdchang
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

React 是一個用於建立 UI 組件的 JavaScript 函式庫，而 JSX 則是 React 中的重要語法擴充。前一章我們已學會如何使用 JSX 編寫 React 介面，本文將進一步說明 React 元件（Components）、props 與事件（Events）的基本觀念與應用，並介紹如何透過函式元件建立互動性的使用者介面，進而引入條件渲染的方式，讓介面能根據資料狀態動態改變內容。

## 重點摘要

- React 元件就像函式，會回傳 HTML 元素
- 元件是可獨立、可重複使用的程式區塊
- 元件名稱需以大寫開頭
- props 是元件接收的參數，用來傳遞資料
- props 是唯讀的，不能在元件內部直接修改
- 事件處理使用 camelCase 並以大括號包覆事件處理函式
- 可使用箭頭函式傳遞參數至事件處理器
- 可透過 if、三元運算子、邏輯運算子 `&&` 實現條件渲染

## React 條件渲染

React 提供多種條件渲染的方式，以下為三種常見範例：

- 使用 if 陳述式：

```jsx
function MadeGoal() {
  return <h1>Goal!</h1>;
}

function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal />;
  }
  return <MissedGoal />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Goal isGoal={true} />);
```

- 使用 `&&` 邏輯運算子：

```jsx
function Garage(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 && <h2>You have {cars.length} cars in your garage.</h2>}
    </>
  );
}

const cars = ['Ford', 'BMW', 'Audi'];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage cars={cars} />);
```

- 使用三元運算子：

```jsx
function Goal(props) {
  const isGoal = props.isGoal;
  return <>{isGoal ? <MadeGoal /> : <MissedGoal />}</>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Goal isGoal={false} />);
```

## 總結

React 元件是建構 UI 的基本單位，透過 props 傳遞資料與事件處理建立互動，並透過條件渲染控制顯示邏輯。這些基礎觀念為日後深入學習狀態管理、Hooks 與表單處理等主題奠定堅實基礎。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
