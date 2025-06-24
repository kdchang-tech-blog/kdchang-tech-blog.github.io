---
title: React Components 入門教學 | w3schools 學習筆記
date: 2024-01-05 11:33:41
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

React 是一個用於建立 UI 組件的 JavaScript 函式庫，而 JSX 則是 React 中的重要語法擴充。前一章我們已學會如何使用 JSX 編寫 React 介面，本文將進一步說明 React 元件（Components）的基本觀念與應用，並介紹如何透過函式元件（Function Components）與類別元件（Class Components）撰寫可重用的 UI 模組。

## 重點摘要

- React 元件就像函式，會回傳 HTML 元素
- 元件是可獨立、可重複使用的程式區塊
- React 元件主要有兩種類型：函式元件與類別元件
- 現代 React 建議使用函式元件搭配 Hooks
- 元件名稱需以大寫開頭
- 類別元件需繼承 React.Component 並實作 render 方法
- 函式元件語法簡潔，易於撰寫與理解

## 實例解說

1. 建立類別元件
   使用 `class` 關鍵字定義元件並繼承 `React.Component`，需實作 `render()` 方法，該方法需回傳一段 JSX：

```jsx
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
```

2. 建立函式元件
   使用 `function` 或箭頭函式定義元件，直接回傳 JSX 即可：

```jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}
```

這是現代 React 中最推薦的元件撰寫方式，語法簡單且易於維護。

3. 函式元件範例完整呈現
   將元件渲染到頁面中：

```jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

注意 `<Car />` 是一個 JSX 自定義標籤，代表我們自訂的元件。

4. 多個元件組合
   可以將元件組合成更大的 UI 架構：

```jsx
function Car() {
  return <h2>I am a Car!</h2>;
}

function Garage() {
  return (
    <div>
      <h1>Who lives in my Garage?</h1>
      <Car />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

此例中 `Garage` 是父元件，包含了一個 `Car` 子元件。

5. 使用 props 傳遞資料
   元件可透過 props 接收參數以提高重用性：

```jsx
function Car(props) {
  return <h2>I am a {props.brand}</h2>;
}

function Garage() {
  return (
    <div>
      <Car brand="Ford" />
      <Car brand="BMW" />
    </div>
  );
}
```

6. 類別元件使用 props

```jsx
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}</h2>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car brand="Toyota" />);
```

## 結論

React 元件是建構 UI 的基本單位，具備獨立、可重複使用的特性。無論是使用函式或類別方式撰寫元件，只要掌握元件的命名規則與回傳 HTML 的模式，就能快速建立簡潔有彈性的前端介面。現代 React 開發已以函式元件為主，建議優先掌握函式元件的寫法並搭配後續的 Hook 技術使用。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
