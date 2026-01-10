---
title: React Hooks useEffect 入門教學 | w3schools 學習筆記
date: 2024-01-18 11:33:41
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

### 前言

在 React 函式型元件中，`useEffect` 是一個強大且常用的 Hook，用來處理副作用（side effects）。副作用指的是那些不直接涉及元件渲染的操作，例如：發送 API 請求、操作 DOM、設定或清除計時器等。

傳統上，這些操作會在 `componentDidMount`、`componentDidUpdate` 或 `componentWillUnmount` 等生命週期函式中進行，而在函式元件中，`useEffect` 正是用來統一處理這些行為。

---

### 重點摘要

- `useEffect` 可以執行副作用操作，例如：抓取資料、設定計時器、監聽事件。
- 語法格式：`useEffect(函式, 依賴陣列)`
- 不提供第二個參數時，`useEffect` 每次重新渲染都會執行。
- 傳入空陣列作為第二個參數，則只會在元件初次渲染時執行一次。
- 若依賴陣列中包含特定的 state 或 props，只要它們改變，副作用就會重新執行。
- 可以在 `useEffect` 裡透過回傳一個函式進行資源清除（cleanup），避免記憶體洩漏。

---

### 實際範例

#### 範例一：沒有依賴陣列，導致每次渲染都執行

```jsx
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

**問題說明：**

- 每次渲染都會重新執行 `useEffect`，導致 `setTimeout` 一直重複，數字不斷累加，非預期行為。

---

#### 範例二：使用空陣列作為依賴，只執行一次

```jsx
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []); // 加上空陣列，只在初始渲染時執行一次

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

**重點：**

- 空陣列表示沒有任何依賴，因此只會在元件掛載時執行一次副作用。

---

#### 範例三：有依賴變數，根據 count 改變而重新執行

```jsx
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // 每次 count 改變就重新計算

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
```

**重點：**

- 依賴陣列中包含 `count`，因此只要 `count` 改變，`useEffect` 就會重新執行，計算新的值。

---

### 副作用的清除（Effect Cleanup）

某些副作用，如計時器、訂閱、事件監聽器等，當元件卸載或依賴改變時，應該清除，否則可能會導致記憶體洩漏或非預期行為。

在 `useEffect` 中可以回傳一個函式，用來執行清除動作。

#### 範例四：清除計時器

```jsx
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearTimeout(timer); // 清除 timeout
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

**說明：**

- `setTimeout` 被命名為 `timer`，在 `useEffect` 的清除函式中使用 `clearTimeout(timer)` 移除它，避免重複執行。

---

### 總結

React 的 `useEffect` 是處理副作用的主要工具。理解它的運作邏輯、依賴機制與清除策略，能幫助開發者更有效率地控制元件的生命周期與效能。

**使用建議：**

- 若副作用只需在元件初次渲染執行，請傳入空陣列。
- 若需要根據變數變動執行副作用，將其加入依賴陣列中。
- 若副作用產生了外部資源（如計時器、訂閱等），務必記得清除。

掌握這些原則後，就能更靈活並安全地使用 `useEffect`，打造高效穩定的 React 應用。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
