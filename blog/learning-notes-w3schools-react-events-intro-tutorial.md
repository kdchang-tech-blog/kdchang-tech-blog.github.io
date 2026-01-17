---
title: React Events 入門教學 | w3schools 學習筆記
date: 2024-01-07 11:33:41
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

React 是一個用於建立 UI 組件的 JavaScript 函式庫，而 JSX 則是 React 中的重要語法擴充。前一章我們已學會如何使用 JSX 編寫 React 介面，本文將進一步說明 React 元件（Components）、props 與事件處理的基本觀念與應用，並介紹如何透過函式元件傳遞資料及觸發動作，建立更互動且靈活的 UI 架構。

## 重點摘要

- React 元件就像函式，會回傳 HTML 元素
- 元件是可獨立、可重複使用的程式區塊
- React 元件主要有兩種類型：函式元件與類別元件
- 元件名稱需以大寫開頭
- props 是元件接收的參數，用來傳遞資料
- props 是唯讀的，不能在元件內部直接修改
- 使用 props 可以讓元件更具重用性與彈性
- React 事件與 HTML DOM 事件類似，但語法使用 camelCase
- 事件處理函式使用大括號包裹，支援箭頭函式與參數傳遞

## 實例解說

1. 建立函式元件
   使用 `function` 或箭頭函式定義元件，直接回傳 JSX 即可：

```jsx
function Car() {
  return <h2>Hi, I am a Car!</h2>;
}
```

2. 將元件渲染到畫面
   使用 ReactDOM 將元件掛載到 HTML 中的指定節點：

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
```

3. 使用 props 傳遞資料
   可透過 HTML 屬性語法向元件傳遞資料，資料將以物件形式傳入元件的參數 props：

```jsx
function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car brand="Ford" />);
```

4. 父子元件資料傳遞
   父元件可透過 props 向子元件傳遞資料：

```jsx
function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}

function Garage() {
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage />);
```

5. 傳遞變數與物件
   可傳遞變數給 props：

```jsx
function Garage() {
  const carName = 'Ford';
  return <Car brand={carName} />;
}
```

也可傳遞物件並在子元件中取用屬性：

```jsx
function Car(props) {
  return <h2>I am a {props.brand.model}!</h2>;
}

function Garage() {
  const carInfo = { name: 'Ford', model: 'Mustang' };
  return <Car brand={carInfo} />;
}
```

6. 類別元件使用 props
   類別元件接收 props 的方式略有不同：

```jsx
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.brand}</h2>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car brand="Toyota" />);
```

7. React 事件處理
   React 支援與 HTML 相同的事件（如 click、change、mouseover 等），但語法不同：

- 事件名稱使用 camelCase，如 onClick
- 事件處理函式使用大括號包裹

基本範例：

```jsx
function Football() {
  const shoot = () => {
    alert('Great Shot!');
  };

  return <button onClick={shoot}>Take the shot!</button>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);
```

8. 傳遞參數到事件處理函式
   若要傳入參數，使用箭頭函式包裹：

```jsx
function Football() {
  const shoot = (msg) => {
    alert(msg);
  };

  return <button onClick={() => shoot('Goal!')}>Take the shot!</button>;
}
```

9. 取得事件物件
   事件處理函式會自動接收事件物件，可用來取得事件類型、目標等資訊：

```jsx
function Football() {
  const shoot = (msg, event) => {
    alert(event.type);
  };

  return <button onClick={(event) => shoot('Goal!', event)}>Take the shot!</button>;
}
```

## 總結

React 元件是建構 UI 的基本單位，透過 props 傳遞資料可以讓元件之間建立清晰的資料流，而透過事件處理則能讓使用者與介面產生互動。掌握元件、props 與事件的使用，將有助於建立模組化、互動性高且維護性良好的 React 應用程式。接下來可以進一步學習 state、hook 與生命週期等更進階的主題，打造更完整的前端應用。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
