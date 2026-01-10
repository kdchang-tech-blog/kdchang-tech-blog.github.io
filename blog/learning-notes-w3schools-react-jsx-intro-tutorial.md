---
title: React JSX 入門教學 | w3schools 學習筆記
date: 2024-01-04 11:33:41
author: kdchang
tags:
  - React
  - JSX
  - React Hooks
  - Next.js
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 前言

React 是一個用於建立 UI 元件的 JavaScript 函式庫，而 JSX 則是屬於 React 中的一個元件模板語法糖。這篇文章將簡要介紹 JSX 是什麼，如何撰寫、條件式使用以及特殊對應，幫助初學者或 React 開發者進一步瞭解 JSX 的基礎應用。

## 重點摘要

- JSX 是 JavaScript XML 的縮寫
- 允許在 JavaScript 代碼中直接寫 HTML
- JSX 會被轉譯變成 React.createElement()
- JSX 中的 HTML 項目必須有唯一的層級結點
- 可用小括號 {} 執行 JavaScript 表達式
- 允許使用 fragment (空括號) 以避免額外 DOM 結構
- HTML 元素必須適當關閉，並使用 className 代替 class
- 使用條件語句時， if 必須在 JSX 之外，可用三元表達式

## 實例解說

1. JSX 與非 JSX 寫法

使用 JSX 的方式：

```jsx
const myElement = <h1>I Love JSX!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

未使用 JSX 的方式：

```jsx
const myElement = React.createElement('h1', {}, 'I do not use JSX!');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
```

2. JSX 表達式範例

使用 JSX 方式計算數學表達式：

```jsx
const myElement = <h1>React is {5 + 5} times better with JSX</h1>;
```

3. 多行 HTML 要用 () 包起

```jsx
const myElement = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);
```

4. 唯一一層級結點要求

```jsx
const myElement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
);
```

或是使用 fragment ：

```jsx
const myElement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);
```

5. 元素必須適當關閉

```jsx
const myElement = <input type="text" />;
```

6. 使用 className 代替 class

```jsx
const myElement = <h1 className="myclass">Hello World</h1>;
```

7. JSX 條件語句

方式 1：使用 if 在 JSX 之外

```jsx
const x = 5;
let text = 'Goodbye';
if (x < 10) {
  text = 'Hello';
}
const myElement = <h1>{text}</h1>;
```

方式 2：使用三元表達式

```jsx
const x = 5;
const myElement = <h1>{x < 10 ? 'Hello' : 'Goodbye'}</h1>;
```

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
