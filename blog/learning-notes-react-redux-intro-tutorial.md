---
title: React Redux 介紹入門教學筆記 | 學習筆記
date: 2024-12-13 02:23:41
author: kdchang
tags: 
    - react
    - Redux
    - React Redux

---

#### 1. 什麼是 Redux？  

`Redux` 是 JavaScript 應用程式的狀態管理工具，最常與 React 搭配使用。它提供一個單一的全域狀態樹，使應用程式的狀態變更更可預測、可測試、可維護。Redux 遵循 **單向數據流** 和 **不可變狀態** 的概念，適合管理大型應用的複雜狀態。  

---

#### 2. Redux 核心概念  

Redux 的運作基礎主要由三個部分組成：  

1. **Store（存儲狀態的地方）**  
   - 整個應用程式的狀態存儲在單一的 Store 中。  
2. **Action（動作）**  
   - Action 是一個 JavaScript 物件，描述了「發生了什麼事」。通常包含 `type` 屬性來表明事件類型，並可能包含 `payload` 傳遞額外數據。  
3. **Reducer（狀態變更邏輯）**  
   - Reducer 是一個純函式，接收當前狀態與 Action，根據 Action 類型來決定如何更新狀態。  

---

#### 3. 安裝 Redux 和 React-Redux  

在 React 專案中安裝 Redux 及 React-Redux：  

```bash
npm install @reduxjs/toolkit react-redux
```

Redux Toolkit（RTK）是官方推薦的 Redux 工具包，它提供更簡潔、易用的 API 來簡化 Redux 使用。  

---

#### 4. 創建 Redux Store  

在 `store.js` 檔案中，使用 `configureStore` 創建 Store：  

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

在這裡，我們將 `counterReducer` 設定為 `counter` 這個 slice 的 reducer。

---

#### 5. 創建 Slice（Reducer + Action）  

在 `counterSlice.js` 檔案中，使用 `createSlice` 定義 `counter` 相關的狀態與 reducer：  

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

這裡的 `createSlice` 幫助我們：  
- 定義狀態的初始值（`initialState`）  
- 自動生成 `reducer`  
- 自動產生對應的 Action  

---

#### 6. 設置 Store 提供給 React  

在 `index.js` 檔案中使用 `Provider` 讓整個 React 應用可以存取 Redux Store：  

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

這樣 `App` 及其所有子元件都可以存取 Redux Store。

---

#### 7. 在 React 組件中使用 Redux  

在 `Counter.js` 中使用 Redux Store 來讀取與修改 `counter` 的值：  

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>計數器：{count}</h1>
      <button onClick={() => dispatch(increment())}>增加</button>
      <button onClick={() => dispatch(decrement())}>減少</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>增加 5</button>
    </div>
  );
};

export default Counter;
```

在這個範例中：  
- `useSelector(state => state.counter.value)` 取得 Store 內的 `counter` 值。  
- `useDispatch()` 取得 Redux 的 `dispatch` 函式，發送 Action 來更新狀態。  
- 點擊按鈕時，對應的 Action 會發送給 Reducer，修改狀態。

---

#### 8. 使用 Redux DevTools 進行除錯  

Redux Toolkit 內建支援 Redux DevTools，可以在瀏覽器中查看 Redux 狀態變更的歷史紀錄，方便除錯。安裝 [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)，並開啟瀏覽器的 `Redux` 分頁來觀察 Action 和 State 變化。

---

#### 9. 總結  

Redux 提供了一個強大的狀態管理方式，適合中大型應用。在 Redux Toolkit 的幫助下，開發 Redux 應用變得更加直觀與簡潔。本篇介紹了 Redux 的基本概念，並透過實際範例展示如何在 React 中整合 Redux。如果你的應用狀態複雜，需要跨組件共享，Redux 會是很好的選擇。

# 參考文件
1. [redux vs useContext, useReducer，該怎麼選擇？](https://blog.typeart.cc/redux-vs-use-congtext-use-reducer-and-which-one/)
2. [The Problem with React's Context API](https://leewarrick.com/blog/the-problem-with-context/)
3. [React 狀態管理套件比較與原理實現 feat. Redux, Zustand, Jotai, Recoil, MobX, Valtio](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/a-comparison-of-react-state-management-libraries-ba61db07332b)
4. [利用 React Context API + useReducer 實作 Redux](https://www.cythilya.tw/2023/05/25/implement-redux-by-react-context-api-and-useReducer/)