---
title: React Context API 入門教學 | 學習筆記
date: 2024-12-21 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - React
    - React.js
    - ReactJS
    - useContext
    - Context API

---

# 前言
React Context API 是 React 提供的一種方式，讓我們能夠在組件樹中傳遞資料，而不需要一層層地使用 props。Context API 可以解決多層嵌套組件的傳遞問題，讓我們在深層組件中輕鬆訪問到全局狀態。本文將介紹如何使用 React Context API，並提供一個簡單的範例來展示其實際應用。

### 什麼是 React Context API

React Context API 是 React 的一個內建功能，它可以讓我們在組件樹中共享資料，避免多層嵌套的 props 傳遞。Context 主要由三個部分組成：

1. **React.createContext()**：創建一個 Context 物件。
2. **Provider**：這是 Context API 中的一個組件，它用來包裹整個應用，並提供一個全局的資料源。
3. **Consumer**：這是用來訪問 Context 資料的組件，它能夠獲取 Provider 中傳遞的資料。

使用 Context 的目的，是為了避免將相同的資料層層傳遞到每個組件，這樣可以讓應用的資料流變得更加簡潔。

### 使用 Context API 的步驟

#### 步驟 1: 創建 Context

首先，我們需要使用 `React.createContext()` 來創建一個 Context 物件。這個物件會返回一個 `Provider` 和 `Consumer` 組件，讓我們在應用中使用。

```javascript
import React from 'react';

// 創建 Context
const MyContext = React.createContext();
```

#### 步驟 2: 使用 Provider 來傳遞資料

Context 的 `Provider` 是用來包裹應用的，它會接收一個 `value` 屬性，這個屬性就是要共享給整個組件樹的資料。

```javascript
const App = () => {
  const [user, setUser] = React.useState({ name: 'John', age: 30 });

  return (
    <MyContext.Provider value={user}>
      <UserProfile />
    </MyContext.Provider>
  );
};
```

在這個範例中，我們將一個 `user` 物件傳遞給 `MyContext.Provider` 的 `value` 屬性，這樣整個組件樹中的所有子組件都能夠訪問到這個 `user` 資料。

#### 步驟 3: 使用 Consumer 來接收資料

在需要使用資料的地方，我們可以使用 `MyContext.Consumer` 來獲取資料。`Consumer` 的 `children` 是一個函數，它會接收一個 `value` 參數，這個參數就是在 `Provider` 中傳遞的資料。

```javascript
const UserProfile = () => {
  return (
    <MyContext.Consumer>
      {(user) => (
        <div>
          <h1>{user.name}</h1>
          <p>Age: {user.age}</p>
        </div>
      )}
    </MyContext.Consumer>
  );
};
```

在這個範例中，`UserProfile` 組件通過 `Consumer` 來訪問 `MyContext` 中的 `user` 資料，並渲染顯示用戶的名字和年齡。

#### 步驟 4: 使用 `useContext` Hook (React 16.8 及以上)

React 16.8 引入了 `useContext` Hook，這樣我們可以更方便地在函數組件中使用 Context，而不需要使用 `Consumer`。這樣的寫法更加簡潔，並且避免了過多的嵌套。

```javascript
import React, { useContext } from 'react';

const UserProfile = () => {
  const user = useContext(MyContext);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
};
```

使用 `useContext` 可以直接從 Context 中獲取資料，而不需要使用 `Consumer`。這使得代碼更簡潔，並提高了可讀性。

### 實際範例

下面是一個完整的範例，展示了如何使用 React Context API 來管理應用中的全局狀態。這個範例將包括一個用戶資料的管理，並能夠在多個組件中共享這些資料。

```javascript
import React, { useState, useContext } from 'react';

// 創建 Context
const MyContext = React.createContext();

const App = () => {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  return (
    <MyContext.Provider value={user}>
      <div>
        <UserProfile />
        <AgeUpdater />
      </div>
    </MyContext.Provider>
  );
};

const UserProfile = () => {
  const user = useContext(MyContext);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
};

const AgeUpdater = () => {
  const user = useContext(MyContext);
  const setUser = useState()[1];

  const updateAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
};

export default App;
```

### 範例解析

1. **App 組件**：在 `App` 組件中，我們使用 `useState` 定義了一個 `user` 資料，並通過 `MyContext.Provider` 將資料提供給下層組件。
2. **UserProfile 組件**：`UserProfile` 使用 `useContext` 來讀取 `MyContext` 中的資料，並顯示用戶的名字和年齡。
3. **AgeUpdater 組件**：這個組件同樣使用 `useContext` 來讀取和更新 `user` 資料。我們在這裡定義了一個按鈕，當按下時，會更新 `user` 的年齡。

### Context API 的優缺點

#### 優點：

1. **簡化資料傳遞**：當我們需要在多層嵌套的組件中共享資料時，使用 Context 可以避免繁瑣的 props 傳遞。
2. **可擴展性**：Context 非常適合用於應用中的全局狀態管理，像是用戶認證、語言設置、主題樣式等。

#### 缺點：

1. **重新渲染問題**：當 `Provider` 中的資料變更時，所有使用該 Context 的組件都會重新渲染。對於大型應用來說，這可能會影響性能。
2. **狀態過度共享**：Context 主要用於共享全局資料，如果將太多不相關的資料放入同一個 Context，可能會使代碼變得難以維護。

### 總結
React Context API 是一個強大的工具，可以幫助我們管理應用中的全局狀態。在適當的情況下使用 Context 可以大大簡化代碼，避免深層嵌套的 props 傳遞。但也需要謹慎使用，避免過多不必要的資料共享，從而影響性能和可維護性。在開發中，我們可以根據具體需求來選擇是否使用 Context API，並搭配其他狀態管理工具（如 Redux 或 Zustand）來管理更複雜的應用狀態。

# 參考文件
1. [用 React Context API 實作跨組件傳值的功能](https://muki.tw/react-context-api/)