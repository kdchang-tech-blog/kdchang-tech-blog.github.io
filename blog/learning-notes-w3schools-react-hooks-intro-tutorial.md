---
title: React Hooks 入門教學 | w3schools 學習筆記
date: 2024-01-16 11:33:41
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

### 前言

Hooks 是在 React 16.8 版本中加入的新功能。Hooks 讓你可以在「函式元件（function components）」中使用狀態（state）以及其他 React 功能。因此，自從有了 Hooks 之後，**類別元件（class components）通常就不再是必要的了**。

儘管 Hooks 幾乎取代了類別元件的使用方式，但 React 團隊目前**並沒有打算移除 class 元件**的支援。

---

### 什麼是 Hook？

Hooks 讓我們能夠「掛勾（hook into）」React 的核心功能，例如 **狀態管理（state）** 和 **生命週期方法（lifecycle methods）**。

---

### 範例：

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function FavoriteColor() {
  const [color, setColor] = useState('red');

  return (
    <>
      <h1>我最喜歡的顏色是 {color}！</h1>
      <button type="button" onClick={() => setColor('blue')}>
        藍色
      </button>
      <button type="button" onClick={() => setColor('red')}>
        紅色
      </button>
      <button type="button" onClick={() => setColor('pink')}>
        粉紅色
      </button>
      <button type="button" onClick={() => setColor('green')}>
        綠色
      </button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

---

在這個範例中，我們透過 `useState` 這個 Hook 來追蹤應用程式的狀態。

> **狀態（State）**：泛指那些會隨著使用者互動或應用邏輯而改變的資料或屬性。

此外，**使用 Hook 前必須先從 `react` 模組中引入對應的函式**，例如這裡的 `useState`。

---

### 使用 Hook 的三大規則

1. **只能在 React 的函式元件中呼叫 Hooks**
2. **只能在元件的最上層（Top-level）呼叫**，不能寫在 `if`、`for`、`函式`中等區塊內
3. **不能有條件式地呼叫 Hook**（例如不能寫在 `if` 判斷中）

> 注意：Hooks **無法**在 class 類別元件中使用！

---

### 自訂 Hook（Custom Hooks）

如果你有一些包含狀態的邏輯（stateful logic），需要在多個元件之間重複使用，這時可以考慮**封裝成自訂 Hook**，以提升可讀性與重用性。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
