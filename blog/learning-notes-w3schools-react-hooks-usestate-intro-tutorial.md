---
title: React Hooks useState 入門教學 | w3schools 學習筆記
date: 2024-01-17 11:33:41
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

在 React 函式元件中，`useState` 是最常用的 Hook 之一，能讓我們在無需使用 class 的情況下新增與管理元件的「狀態」（state）。狀態是指會隨著使用者互動或應用邏輯變化而更新的資料，例如：輸入框的內容、按鈕點擊次數、切換的主題顏色等。

---

## 重點摘要

- `useState` 是 React 提供的 Hook，用來在函式型元件中儲存與更新狀態。
- 使用前需先從 `react` 匯入 `useState`。
- `useState(初始值)` 會回傳一個陣列，包含目前的狀態值與更新狀態的函式。
- 更新狀態請使用 `setXXX` 函式，**不可直接修改狀態變數**。
- 可以建立多個 `useState` 追蹤不同變數，也可使用一個物件整合多個欄位。
- 若要更新物件或陣列的部分內容，應使用展開運算子（spread operator）來保留其他值。

---

## 實際範例

### 1. 匯入 `useState`

```js
import { useState } from 'react';
```

使用時，請確認使用的是具名匯入（named import），`useState` 是 `react` 模組的一部分。

---

### 2. 初始化狀態

```js
function FavoriteColor() {
  const [color, setColor] = useState('');
}
```

`color` 是目前狀態值；`setColor` 是修改此狀態的函式；初始值設定為空字串。

---

### 3. 讀取狀態並渲染

```js
function FavoriteColor() {
  const [color, setColor] = useState('red');

  return <h1>My favorite color is {color}!</h1>;
}
```

此例中，畫面上會顯示 `My favorite color is red!`，透過 JSX 讀取狀態。

---

### 4. 使用按鈕更新狀態

```js
function FavoriteColor() {
  const [color, setColor] = useState('red');

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button type="button" onClick={() => setColor('blue')}>
        Blue
      </button>
    </>
  );
}
```

點擊按鈕時，會透過 `setColor` 將 `color` 更新為 `"blue"`，畫面也會即時更新。

---

### 5. 多個狀態變數

```js
function Car() {
  const [brand, setBrand] = useState('Ford');
  const [model, setModel] = useState('Mustang');
  const [year, setYear] = useState('1964');
  const [color, setColor] = useState('red');

  return (
    <>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
    </>
  );
}
```

這種方式使用多個 `useState` 管理多個欄位，彼此獨立。

---

### 6. 使用物件作為單一狀態

```js
function Car() {
  const [car, setCar] = useState({
    brand: 'Ford',
    model: 'Mustang',
    year: '1964',
    color: 'red',
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  );
}
```

以物件作為狀態，可集中管理多個欄位，也使程式碼更易維護。

---

### 7. 更新物件中的單一欄位

```js
function Car() {
  const [car, setCar] = useState({
    brand: 'Ford',
    model: 'Mustang',
    year: '1964',
    color: 'red',
  });

  const updateColor = () => {
    setCar((prevState) => {
      return { ...prevState, color: 'blue' };
    });
  };

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button type="button" onClick={updateColor}>
        Blue
      </button>
    </>
  );
}
```

這裡使用展開運算子（`...prevState`）來保留其他屬性，僅更新 `color`。若直接使用 `setCar({ color: "blue" })`，會造成其他屬性遺失。

---

## 總結

React 的 `useState` 是建立互動式 UI 的基礎，能讓我們在函式型元件中管理狀態。透過這個 Hook，我們可以：

- 初始化與讀取狀態值
- 透過更新函式改變狀態並重新渲染畫面
- 使用多個 `useState` 管理多個資料
- 或整合為一個物件並使用展開運算子更新部分欄位

熟練掌握 `useState` 是學會 React 開發不可或缺的第一步。建議初學者透過實作各種小範例來加深理解與記憶。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
