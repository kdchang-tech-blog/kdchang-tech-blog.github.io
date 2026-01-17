---
title: React Render HTML 入門教學 | w3schools 學習筆記
date: 2024-01-03 11:33:41
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

React 是一個專門用於構建使用者介面（UI）的 JavaScript 函式庫，其主要目標就是將 HTML 呈現在網頁中。透過 React 的核心函式 `createRoot()` 和方法 `render()`，開發者可以將 UI 元件渲染到指定的 HTML 元素中。本文將介紹 React 如何在網頁上渲染 HTML，包括核心函式與方法的用途、應用位置與語法示範，並介紹與 JSX 語法的結合使用方式。

## 重點摘要

- React 透過 `createRoot()` 函式與 `render()` 方法將 HTML 渲染到網頁上。
- `createRoot()` 用於指定要渲染的目標 HTML 元素。
- `render()` 用於將 React 元件實際渲染到指定元素中。
- 標準的 React 專案會在 `public/index.html` 中提供 `<div id="root">` 作為渲染容器。
- JSX 語法允許開發者在 JavaScript 中撰寫類似 HTML 的程式碼。
- 根節點不必一定是 `<div>`，也不一定要命名為 `root`。

## 實際範例

1. 渲染一段簡單的段落：

```js
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<p>Hello</p>);
```

上述程式碼會將 "Hello" 文字渲染到 HTML 文件中的：

```html
<body>
  <div id="root"></div>
</body>
```

2. 使用 JSX 撰寫 HTML 表格並渲染：

```js
const myelement = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(myelement);
```

此段程式會顯示一個包含名稱的簡單表格，渲染至 `root` 節點中。

3. 更換根節點的標籤與 id：
   不一定要使用 `<div id="root">` 作為渲染節點，可以自行命名：

```html
<body>
  <header id="sandy"></header>
</body>
```

對應的 React 程式碼如下：

```js
const container = document.getElementById('sandy');
const root = ReactDOM.createRoot(container);
root.render(<p>Hallo</p>);
```

此範例將段落渲染至 `header` 元素。

## 總結

React 的渲染邏輯核心在於兩個部分：定義渲染目標與執行渲染動作。透過 `createRoot()` 指定 HTML 元素、`render()` 注入 React 元件，開發者可以將 UI 動態顯示在任何節點上。搭配 JSX 語法，不僅可以撰寫更具可讀性的 UI 結構，也讓程式碼維護更為便利。

## 參考文件

1. [React Render HTML](https://www.w3schools.com/react/react_render.asp)
