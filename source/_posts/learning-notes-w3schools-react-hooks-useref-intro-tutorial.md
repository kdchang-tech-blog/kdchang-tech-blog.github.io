---
title: React Hooks useRef 入門教學 | w3schools 學習筆記
date: 2024-01-19 11:33:41
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

在 React 中，`useRef` 是一個非常實用的 Hook，它提供了一個方法來**在元件重新渲染之間保留值**。不同於 `useState`，當 `useRef` 的值改變時**不會觸發元件重新渲染**，這使它成為追蹤狀態變化、儲存 DOM 參考或避免不必要重新渲染的理想選擇。

本文將深入說明 `useRef` 的三種主要用途：

1. **避免重新渲染的狀態儲存**
2. **直接操作 DOM 元素**
3. **追蹤先前的狀態值**

---

## 重點摘要

- `useRef` 可用來在元件間保留值而不觸發重新渲染。
- 常用於：

  - 儲存不可變的值或變數
  - 直接存取 DOM 元素（透過 `ref`）
  - 記錄先前的狀態（例如輸入欄位的歷史值）

- `useRef()` 回傳一個包含 `.current` 屬性的物件。
- 修改 `ref.current` 不會導致畫面重繪，因此對效能影響小。

---

## 實際範例

### 範例 1：避免重新渲染的計數器

使用 `useRef` 追蹤畫面渲染次數（如果用 `useState` 反而會導致無限循環）：

```jsx
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [inputValue, setInputValue] = useState('');
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 說明：

- `useRef(0)` 初始化 `count.current` 為 0。
- 每次渲染後，`useEffect` 更新 `count.current`。
- 即使值變了，畫面不會重新渲染，這正是 `useRef` 的特性。

---

### 範例 2：存取 DOM 元素

在 React 中，大部分的 DOM 操作應交由框架管理，但在特定情況下，我們需要**手動聚焦、選取或操作元素**，這時 `useRef` 就派上用場。

```jsx
import { useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 說明：

- 使用 `ref={inputElement}` 將 input 元素指向 `useRef()` 的回傳值。
- 呼叫 `inputElement.current.focus()` 來讓輸入框聚焦。

---

### 範例 3：追蹤先前的狀態值

如果你想知道某個值在上一次渲染的狀態是什麼，可以使用 `useRef` 搭配 `useEffect` 來達成。

```jsx
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [inputValue, setInputValue] = useState('');
  const previousInputValue = useRef('');

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 說明：

- `useRef` 儲存上一個 `inputValue`。
- 每次 `inputValue` 改變時，`useEffect` 都會更新 `previousInputValue.current`。
- 在畫面上同時顯示目前值與上一個值。

---

## 總結

`useRef` 是 React 中一個簡單卻強大的工具，適用於以下情境：

- **維持不影響渲染的狀態資料**（例如計數器、定時器 ID、外部資料等）
- **直接操作 DOM 元素**（例如設定焦點、自動滾動）
- **追蹤先前的狀態值或變數**（例如表單內容變化）

理解並善用 `useRef` 可以幫助你更靈活地處理 React 元件中的各種非視覺狀態，讓應用程式更穩定、效能更佳。下次當你不需要觸發重新渲染時，請記得考慮使用 `useRef`！

---

如果你需要我幫你將此內容轉換為 Markdown、部落格文章格式或簡報稿，也可以告訴我。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
