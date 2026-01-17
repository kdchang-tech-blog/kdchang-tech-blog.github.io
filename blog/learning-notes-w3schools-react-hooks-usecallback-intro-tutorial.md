---
title: React Hooks useCallback 入門教學 | w3schools 學習筆記
date: 2024-01-21 11:33:41
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

在 React 中，每次元件重新渲染時，元件內部定義的函式也會被重新建立。這會導致某些子元件即使其 `props` 沒有變動，卻仍然會被重新渲染，造成效能浪費。`useCallback` Hook 是 React 提供的工具，用來記憶（memoize）函式的參考，以避免不必要的重新渲染。它的使用情境與 `useMemo` 類似，不同之處在於：`useMemo` 記憶的是「值」，而 `useCallback` 記憶的是「函式」。

---

## 重點摘要

- `useCallback` 是 React 提供的 Hook，可回傳一個**記憶化的函式**。
- 記憶化的概念就像是快取（caching），只在依賴值變更時才重新建立函式。
- `useCallback` 可改善效能，避免函式在每次重新渲染時被重新定義。
- 常與 `React.memo` 搭配使用，防止不必要的子元件重新渲染。
- 與 `useMemo` 類似，但 `useMemo` 回傳的是「值」，`useCallback` 回傳的是「函式」。
- 若函式沒有依賴到外部變數，也可以將依賴陣列設為空陣列（`[]`），表示永遠不重新建立。

---

## 問題說明：為何子元件會重渲染？

在下列範例中，即使 `todos` 陣列沒有變動，點擊 `+` 按鈕後，子元件 `Todos` 仍會重新渲染：

```jsx
// index.js
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, 'New Todo']);
  };

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```jsx
// Todos.js
import { memo } from 'react';

const Todos = ({ todos, addTodo }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => (
        <p key={index}>{todo}</p>
      ))}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default memo(Todos);
```

上述例子中，我們使用了 `React.memo` 包裹 `Todos` 元件，理論上當 `todos` 不變時，它不該重新渲染。然而，當你點擊「+」按鈕後 `Todos` 仍然會重渲染，原因在於：

### **參考相等性（Referential Equality）**

每次 `App` 元件重新渲染時，`addTodo` 函式都會重新建立，導致其記憶位置不同。雖然 `Todos` 的 `props.todos` 沒變，但 `props.addTodo` 是一個新的函式，因此 `React.memo` 偵測到 `props` 有變動，就會導致子元件重新渲染。

---

## 解法：使用 useCallback 記憶函式

為了解決上述問題，可以使用 `useCallback` 記憶 `addTodo` 函式，讓它只在 `todos` 改變時才重新定義：

```jsx
// index.js
import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, 'New Todo']);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

此時，當點擊 `+` 按鈕時，`addTodo` 函式不再被重新建立，因此 `Todos` 元件也不會被不必要地重新渲染。

---

## 總結

- `useCallback` 是優化 React 應用效能的重要工具，尤其是在元件傳遞函式給子元件時。
- 若你搭配 `React.memo` 使用，請務必搭配 `useCallback`，以避免函式參考不一致而導致的重渲染。
- 不過也不要過度使用 `useCallback`，因為它本身也有效能成本，應該根據實際需求與效能瓶頸來使用。

在實務中，對於常被重複渲染、或複雜邏輯包裝的子元件來說，`useCallback` 能有效避免不必要的重新渲染，是撰寫高效 React 應用程式時不可忽視的工具。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
