---
title: React useMemo 與 useCallback 差異介紹與入門教學 | 學習筆記
date: 2024-12-20 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - React
    - React.js
    - ReactJS
    - useMemo
    - useCallback

---

# 前言

在使用 React hooks 進行開發時，`useMemo` 和 `useCallback` 是兩個常被提及的性能優化工具。它們都屬於 **記憶化（memoization）** 技術，用來避免不必要的重算與重渲染。然而，很多初學者在理解這兩者的用途與差異時常感到困惑。這篇文章將從概念出發，並搭配實際範例，幫助你掌握 `useMemo` 與 `useCallback` 的核心用途與實作方式。

---

## 一、共通點：記憶化

React 在每次組件渲染時，預設會重新執行所有函式與表達式。當某些值（如計算結果、函式）在依賴未改變的情況下不需要重新產生，我們可以利用記憶化來優化效能。

這就是 `useMemo` 和 `useCallback` 的主要功能：**根據依賴陣列（dependency array）決定是否重建值或函式**。

---

## 二、差異概念總覽

| Hook        | 主要用途             | 回傳內容     | 使用時機                                 |
|-------------|----------------------|--------------|------------------------------------------|
| `useMemo`   | 記憶「計算結果」     | 任意值       | 計算過程昂貴，避免重複運算               |
| `useCallback` | 記憶「函式定義」   | 函式         | 傳遞函式給子元件，避免不必要的 re-render |

換句話說：

- `useMemo(fn, deps)` ≈ `const value = memoized(fn)`
- `useCallback(fn, deps)` ≈ `const callback = memoized(() => fn)`

---

## 三、useMemo 範例

假設我們有一個需要進行繁重計算的函式，例如統計某個資料集合中的數值：

```jsx
import React, { useState, useMemo } from 'react';

function slowFunction(num) {
  console.log('Running slow function');
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += num;
  }
  return result;
}

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState(1);

  const computedValue = useMemo(() => {
    return slowFunction(input);
  }, [input]);

  return (
    <div>
      <h2>Expensive Calculation</h2>
      <p>計算結果：{computedValue}</p>
      <input
        type="number"
        value={input}
        onChange={e => setInput(Number(e.target.value))}
      />
      <button onClick={() => setCount(c => c + 1)}>重新渲染 ({count})</button>
    </div>
  );
}
```

在這個例子中，若不使用 `useMemo`，只要任何 state 改變（例如點擊按鈕改變 `count`），整個組件都會重新執行 `slowFunction`，導致效能問題。透過 `useMemo`，只有 `input` 改變時才會重新計算，其他情況會重複使用上次的計算結果。

---

## 四、useCallback 範例

有時候我們會將函式作為 props 傳遞給子元件。如果每次重新 render 都產生新的函式實例，會導致子元件誤以為 props 改變，而重新渲染。這時就可以用 `useCallback`。

```jsx
import React, { useState, useCallback, memo } from 'react';

const ChildButton = memo(({ onClick }) => {
  console.log('ChildButton rendered');
  return <button onClick={onClick}>點我</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <h2>useCallback Demo</h2>
      <p>Count: {count}</p>
      <ChildButton onClick={handleClick} />
      <button onClick={() => setOther(o => o + 1)}>改變其他狀態</button>
    </div>
  );
}
```

在這個範例中，`ChildButton` 是經過 `memo` 包裹的元件，只有在 `props.onClick` 改變時才會重新渲染。使用 `useCallback` 確保 `handleClick` 函式在 `[]`（無依賴）下只會創建一次，即使 `other` 改變，`ChildButton` 也不會重新渲染。

---

## 五、常見錯誤與注意事項

1. **過度使用會反效果**  
   `useMemo` 和 `useCallback` 本身也有記憶成本，不建議過度使用。只有在你確定函式或運算昂貴，或造成子元件重 render 才需要用。

2. **依賴陣列要正確**  
   記得將函式中引用的變數正確加入依賴陣列中，否則會造成記憶結果與預期不符。

3. **搭配 `React.memo` 效果更明顯**  
   `useCallback` 通常與 `memo` 或 `PureComponent` 搭配，否則即使函式地址一樣，也無法避免重 render。

---

## 六、總結

當你在開發中遇到效能瓶頸或元件不必要地重複渲染時，才是使用 `useMemo` 與 `useCallback` 的好時機。舉例來說：

- 在表格過濾、排序等涉及大量資料處理的畫面中，可以用 `useMemo` 優化計算。
- 在表單中將函式傳遞給 `input` 元件時，使用 `useCallback` 可避免整個表單重 render。

記住一個原則：**不要為了使用 hook 而使用，而是根據實際效能需求進行優化**。如果你的應用很小或尚未遇到效能問題，先專注於撰寫可讀性高、邏輯清楚的程式碼，這才是最重要的。


## 參考文件
1. [如何優化 React 元件的渲染效能，並避免渲染陷阱](https://muki.tw/react-render-usecallback-react-memo/)