---
title: React Hooks useMemo 入門教學 | w3schools 學習筆記
date: 2024-01-22 11:33:41
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

在 React 的開發中，我們常會遇到一些運算成本高昂（expensive）的函式，例如複雜的計算或操作大量資料。如果這些運算每次重新渲染都會重新執行，可能會導致效能低落，甚至造成使用者界面的卡頓或延遲。此時，我們可以使用 React 的 `useMemo` Hook，透過「記憶化」（memoization）技術，避免不必要的重新計算，從而提升效能。

本文將說明 `useMemo` 的用途、使用時機，並透過實際範例展示其效能優化的實際效果。

---

## 重點摘要

- `useMemo` 是 React 提供的 Hook，用來「記憶化」一個計算結果，僅在依賴（dependencies）變動時才重新計算。
- 它的語法為：`useMemo(() => { return value }, [dependencies])`
- `useMemo` 適合用在：

  - 資源密集的計算
  - 必須避免重複執行的運算

- `useMemo` 與 `useCallback` 類似，但：

  - `useMemo` 回傳的是 **記憶化的值**
  - `useCallback` 回傳的是 **記憶化的函式**

- 搭配依賴陣列使用，確保只在必要時重新計算

---

## 範例一：未使用 useMemo，效能不佳

以下是一個基本範例，展示若每次重新渲染都執行一次昂貴的計算函式 `expensiveCalculation`，會造成延遲的情形：

```jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalculation(count); // 每次 render 都執行

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => (
          <p key={index}>{todo}</p>
        ))}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 問題說明：

當我們只是點擊「Add Todo」按鈕，實際上並未更動 `count`，但昂貴的 `expensiveCalculation(count)` 卻仍然被重新執行，造成整體效能低落。

---

## 範例二：使用 useMemo 優化效能

接下來我們使用 `useMemo` 來包裝昂貴的計算函式，使其僅在 `count` 變動時才重新執行：

```jsx
import { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => (
          <p key={index}>{todo}</p>
        ))}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
};

const expensiveCalculation = (num) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### 優化結果：

- 當你按下「Add Todo」時，不再觸發 `expensiveCalculation`
- 僅當 `count` 變動時，才會重新執行昂貴的計算
- 大幅減少不必要的運算與效能浪費

---

## 總結

`useMemo` 是 React 提供用來優化效能的重要工具，尤其在面對昂貴計算或複雜資料處理時，能有效避免不必要的運算。雖然 `useMemo` 不該過度使用於簡單運算，但在大型應用中，對於效能的提升非常有幫助。

### 使用時機建議：

- 當某個函式或邏輯的執行成本高昂
- 該邏輯只需在某些依賴值變化時執行一次
- 搭配 `useMemo` 可減少重複運算、提升 UI 響應速度

記得：不要為了使用而使用，只有在效能瓶頸或實際需求下，`useMemo` 才能發揮其最大效益。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
