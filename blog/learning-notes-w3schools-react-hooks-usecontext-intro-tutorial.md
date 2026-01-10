---
title: React Hooks useContext 入門教學 | w3schools 學習筆記
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

## 前言

在 React 應用程式中，當需要在多個巢狀元件之間共享資料時，傳遞 `props` 是最基本的做法。但當元件層級變深，這樣的資料傳遞會變得繁瑣且難以維護，這種情況被稱為「props drilling」。為了解決這個問題，React 提供了 Context API，搭配 `useContext` Hook 可以讓你在不需要一層層傳遞 `props` 的情況下，輕鬆地在深層元件中讀取共享的狀態。

---

## 重點摘要

- React Context 是一種全域狀態管理的工具。
- 可以搭配 `useState` 使用，實現跨元件樹狀結構的資料共享。
- 「prop drilling」是指一層層傳遞 `props`，容易造成程式碼混亂。
- 使用 Context 包裝需要共享資料的元件樹，可避免不必要的傳遞。
- `useContext` Hook 用於在任意元件中讀取指定 Context 的值。

---

## 問題背景與傳統寫法

假設我們有一個使用者名稱 `user` 的狀態，我們希望在最上層的元件設定這個狀態，並在最底層的第 5 個元件中使用它。傳統的做法會是逐層傳遞：

```jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Component1() {
  const [user, setUser] = useState('Jesse Hall');

  return (
    <>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 user={user} />
    </>
  );
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

雖然只有第 1 和第 5 個元件需要這個資料，但第 2 到第 4 個元件也被迫傳遞 `props`，造成不必要的耦合。

---

## 解決方案：使用 React Context 與 useContext Hook

### 步驟一：建立 Context

```jsx
import { createContext } from 'react';

const UserContext = createContext();
```

這段程式碼建立了一個新的 Context，用來傳遞 `user` 的狀態。

---

### 步驟二：使用 Provider 包住需要資料的元件樹

```jsx
function Component1() {
  const [user, setUser] = useState('Jesse Hall');

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}
```

`UserContext.Provider` 負責提供資料給子元件。所有被包住的子元件都能透過 `useContext` 取得 `user` 的值。

---

### 步驟三：在需要的元件中使用 useContext 取得資料

```jsx
import { useContext } from 'react';

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}
```

只需一行即可取得 Context 的值，避免層層傳遞 `props`。

---

## 完整範例程式碼

```jsx
import { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';

// 建立 Context
const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState('Jesse Hall');

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user}!`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Component1 />);
```

---

## 總結

透過 `useContext` Hook 搭配 Context API，你可以有效管理全域或區域性的狀態，避免繁瑣的 `props` 傳遞，讓元件間的溝通更加清晰與高效。這種模式特別適用於需要在多個巢狀元件中共享資料的情境，例如主題切換、登入狀態管理、使用者資料等。

熟練掌握 React Context 與 `useContext`，將大幅提升你在開發大型 React 應用的能力與維護性。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
