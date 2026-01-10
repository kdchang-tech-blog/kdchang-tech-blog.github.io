---
title: React 與 ES6 語法教學入門 | w3schools 學習筆記
date: 2024-01-02 11:33:41
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

ES6（ECMAScript 2015）是 JavaScript 的第六版，於 2015 年發布，為 JavaScript 帶來了重大語法革新。React 作為現今最受歡迎的前端框架和函式庫之一，其核心設計與語法極度依賴 ES6 的各項功能。因此，學習 React 前，理解 ES6 的語法特性將大幅提升開發效率與理解深度。

本文將說明 React 常用的 ES6 特性，並透過簡明範例幫助你掌握其實作方式。

## 重點摘要

- ES6 是 ECMAScript 第六版，又稱 ECMAScript 2015。
- React 使用大量 ES6 語法，包括：

  - Class 類別
  - 箭頭函式
  - let、const 變數宣告
  - 陣列方法（如 .map）
  - 解構（Destructuring）
  - 模組系統（import/export）
  - 三元運算子（Ternary Operator）
  - 展開運算子（Spread Operator）

---

## 1. 類別與繼承（Classes & Inheritance）

ES6 引入了 class 關鍵字來定義類別：

```js
class Car {
  constructor(name) {
    this.brand = name;
  }
  present() {
    return 'I have a ' + this.brand;
  }
}

const mycar = new Car('Ford');
console.log(mycar.present());
```

繼承使用 `extends` 關鍵字：

```js
class Model extends Car {
  constructor(name, model) {
    super(name);
    this.model = model;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

const mycar = new Model('Ford', 'Mustang');
console.log(mycar.show());
```

---

## 2. 箭頭函式（Arrow Functions）

簡化函式的寫法：

```js
const hello = () => 'Hello World!';
const greet = (name) => `Hello ${name}`;
```

---

## 3. 變數宣告（let、const、var）

```js
var x = 5; // 函式作用域
let y = 10; // 區塊作用域
const z = 15; // 常數，不可重新指派
```

const 宣告的是參考不可變：

```js
const arr = [1, 2];
arr.push(3); // 可以修改內容
```

---

## 4. 陣列方法（Array.map）

在 React 中常用於渲染列表：

```js
const fruits = ['apple', 'banana', 'orange'];
const listItems = fruits.map((fruit) => <p>{fruit}</p>);
```

---

## 5. 解構賦值（Destructuring）

解構陣列：

```js
const vehicles = ['mustang', 'f-150', 'expedition'];
const [car, , suv] = vehicles;
```

解構函式回傳值：

```js
function calc(a, b) {
  return [a + b, a - b];
}

const [sum, diff] = calc(5, 3);
```

---

## 6. 展開運算子（Spread Operator）

複製或合併陣列與物件：

```js
const numbers1 = [1, 2];
const numbers2 = [3, 4];
const all = [...numbers1, ...numbers2];

const car = { brand: 'Ford', color: 'red' };
const update = { color: 'blue' };
const updatedCar = { ...car, ...update };
```

---

## 7. 模組系統（Modules）

`export` 和 `import` 用於模組化程式碼：

### 命名匯出：

```js
// person.js
export const name = 'Jesse';
export const age = 40;
```

```js
// 使用
import { name, age } from './person.js';
```

### 預設匯出：

```js
// message.js
const message = () => 'Hello';
export default message;
```

```js
import message from './message.js';
```

---

## 8. 三元運算子（Ternary Operator）

條件判斷簡化語法：

```js
const isAuth = true;
isAuth ? renderApp() : renderLogin();
```

---

## 結語

ES6 為 JavaScript 帶來嶄新的語法與思維方式，也為 React 帶來強大的表達力與模組化能力。熟練掌握這些語法，將能讓你在開發 React 專案時更加順手、高效並撰寫出更具可維護性的程式碼。若你尚未熟悉這些語法，建議你從簡單的練習開始，搭配 React 實際開發經驗進行吸收與內化。

## 參考文件

1. [React ES6](https://www.w3schools.com/react/react_es6.asp)
