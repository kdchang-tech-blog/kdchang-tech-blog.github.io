---
title: React 表單入門教學 | w3schools 學習筆記
date: 2024-01-11 11:33:41
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

在網頁開發中，表單（Forms）是使用者與網站互動最常見的方式之一。透過表單，我們可以讓使用者輸入資料、提交查詢、填寫訂單等。而在 React 中，表單不再只是簡單的 HTML 元素堆疊，而是成為受控元件（controlled components）的一部分，由 React 元件的 state 負責管理輸入值與提交行為。

本篇教學將帶你一步一步掌握如何在 React 中建立表單、處理輸入變更、提交資料，並涵蓋文字輸入框、多個欄位、Textarea 與 Select 的特殊處理方式，幫助你更靈活地控制資料流程與使用者體驗。

---

## 重點摘要

- 在 React 中，表單輸入值由 component state 管理，稱為「受控元件」。
- 使用 `useState` hook 來追蹤每個欄位的變化。
- 使用 `onChange` 事件處理輸入值的即時更新。
- 使用 `onSubmit` 處理表單送出行為，並透過 `event.preventDefault()` 阻止預設重新整理頁面的行為。
- 多個欄位可透過 `name` 屬性與通用的 `handleChange` 事件處理函式管理。
- `textarea` 與 `select` 元素在 React 中透過 `value` 屬性控制初始與變更的值。

---

## 實際範例與說明

### 一、建立簡單表單

最基本的 React 表單可以像這樣寫：

```jsx
function MyForm() {
  return (
    <form>
      <label>
        Enter your name:
        <input type="text" />
      </label>
    </form>
  );
}
```

雖然這段程式碼可以運作，但在送出表單時會導致頁面刷新。這不是 React 推薦的處理方式。

---

### 二、控制輸入欄位（Controlled Components）

我們希望讓 React 完全掌控輸入欄位的狀態，因此需透過 `useState` 控制值，並在 `onChange` 事件中更新：

```jsx
import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');

  return (
    <form>
      <label>
        Enter your name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
    </form>
  );
}
```

---

### 三、處理表單提交

若想處理送出資料而非重新整理頁面，需使用 `onSubmit` 並加上 `preventDefault()`：

```jsx
import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`您輸入的名字是：${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <input type="submit" />
    </form>
  );
}
```

---

### 四、多個輸入欄位的管理

當表單中有多個欄位時，使用一個 `inputs` 物件來集中管理會更加方便：

```jsx
import { useState } from 'react';

function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`使用者輸入資料：${JSON.stringify(inputs)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input type="text" name="username" value={inputs.username || ''} onChange={handleChange} />
      </label>
      <label>
        Enter your age:
        <input type="number" name="age" value={inputs.age || ''} onChange={handleChange} />
      </label>
      <input type="submit" />
    </form>
  );
}
```

---

### 五、Textarea 的處理方式

在 HTML 中 `<textarea>` 的值寫在標籤中，但在 React 中，需改為用 `value` 屬性控制：

```jsx
import { useState } from 'react';

function MyForm() {
  const [textarea, setTextarea] = useState('這裡是預設文字');

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  return (
    <form>
      <textarea value={textarea} onChange={handleChange} />
    </form>
  );
}
```

---

### 六、Select 下拉選單的處理方式

同樣地，`<select>` 元素的選擇值也應由 `value` 屬性控制：

```jsx
import { useState } from 'react';

function MyForm() {
  const [myCar, setMyCar] = useState('Volvo');

  const handleChange = (event) => {
    setMyCar(event.target.value);
  };

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </form>
  );
}
```

---

## 總結

React 提供一種結構化且一致的方式來處理表單資料，透過 Hook 與事件處理，可以讓應用程式中的資料流更容易掌控與維護。只要掌握好 `useState`、`onChange`、`onSubmit` 等基本技巧，就能在 React 中打造功能完整且具有互動性的表單介面，提升整體使用者體驗與應用穩定性。未來若進一步搭配表單驗證函式庫（如 Formik 或 React Hook Form），可以更加有效率地管理大型與複雜表單邏輯。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
