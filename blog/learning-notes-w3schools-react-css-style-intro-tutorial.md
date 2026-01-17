---
title: React 中使用 CSS 的三種方式教學 | w3schools 學習筆記
date: 2024-01-14 11:33:41
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

在開發 React 應用程式時，樣式的管理與設計是一項不可忽視的重要部分。雖然 React 是一個 JavaScript 函式庫，主要用於建構使用者介面，但它本身並不限制開發者如何為元件加上樣式。React 提供多種整合 CSS 的方法，這篇文章將會深入介紹三種最常見的樣式處理方式：**行內樣式（Inline Styling）**、**CSS 樣式表（Stylesheet）**以及**CSS 模組（CSS Modules）**，並說明每種方式的使用情境與範例。

---

## 重點摘要

- React 支援使用 JavaScript 對元件進行行內樣式設計。
- 傳統 CSS 樣式表可以與 React 搭配使用，只需匯入對應檔案。
- 使用 CSS Modules 可避免樣式名稱衝突，適用於大型專案。

---

## 一、行內樣式（Inline Styling）

React 提供以 JavaScript 物件的方式設定行內樣式，這種方式最直接也最簡單，適合少量樣式或動態樣式情境。

### 實作範例：

```jsx
const Header = () => {
  return (
    <>
      <h1 style={{ color: 'red' }}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
};
```

> \*\*注意：\*\*在 JSX 中，JavaScript 表達式必須寫在大括號 `{}` 內，而行內樣式本身是一個物件，因此需使用雙層大括號 `{{}}`。

---

### 屬性名稱需使用 camelCase 命名方式

在 JavaScript 中無法使用帶有連字符（例如 `background-color`）的 CSS 屬性名稱，因此需轉換為 camelCase，例如：`backgroundColor`。

### 實作範例：

```jsx
const Header = () => {
  return (
    <>
      <h1 style={{ backgroundColor: 'lightblue' }}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
};
```

---

### 使用樣式物件來管理樣式

若樣式較多，可先定義一個樣式物件，再以變數形式傳入 `style` 屬性中。

```jsx
const Header = () => {
  const myStyle = {
    color: 'white',
    backgroundColor: 'DodgerBlue',
    padding: '10px',
    fontFamily: 'Sans-Serif',
  };

  return (
    <>
      <h1 style={myStyle}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
};
```

---

## 二、CSS 樣式表（Stylesheet）

若你偏好將樣式與程式邏輯分離，傳統的 CSS 樣式表仍然是實用的選擇。只需建立 `.css` 檔案並在元件或主程式中匯入即可。

### 步驟一：建立 `App.css` 檔案

```css
/* App.css */
body {
  background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Sans-Serif;
  text-align: center;
}
```

> \*\*提示：\*\*檔案名稱可以自由命名，但副檔名需為 `.css`。

### 步驟二：匯入樣式表

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

const Header = () => {
  return (
    <>
      <h1>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

這種方式與傳統 HTML 開發流程相似，適合簡單專案或共用樣式的情境。

---

## 三、CSS Modules

CSS Modules 是一種模組化的 CSS 寫法，每個 CSS 檔案的樣式只作用於匯入該檔案的元件，能有效避免樣式衝突，特別適合大型應用程式或多人協作的開發環境。

### 步驟一：建立模組化樣式檔案

建立一個名稱為 `my-style.module.css` 的 CSS 檔案：

```css
/* my-style.module.css */
.bigblue {
  color: DodgerBlue;
  padding: 40px;
  font-family: Sans-Serif;
  text-align: center;
}
```

> \*\*注意：\*\*檔案名稱需符合 `*.module.css` 格式，才能啟用模組功能。

### 步驟二：在元件中匯入模組

```jsx
// Car.js
import styles from './my-style.module.css';

const Car = () => {
  return <h1 className={styles.bigblue}>Hello Car!</h1>;
};

export default Car;
```

### 步驟三：匯入元件至主程式

```jsx
// index.js
import ReactDOM from 'react-dom/client';
import Car from './Car.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

透過這種方式，`.bigblue` 樣式只會應用於 `Car` 元件，其他元件不會受到影響。

---

## 總結

React 提供靈活的方式來處理樣式，你可以根據專案規模與開發需求選擇最適合的做法：

- 小型元件或需動態切換樣式 → 行內樣式
- 簡單專案或共用樣式 → 外部樣式表
- 中大型專案或多人開發 → CSS Modules

透過良好的樣式管理方式，不僅可以提升 UI 的一致性與可維護性，也讓你能更專注於元件的邏輯設計。

如果你正開始學習 React，建議從行內樣式入手，漸進式學習 CSS Modules，將有助於建立健全的開發習慣與架構。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
2. [React router 官方網站](https://reactrouter.com/)
