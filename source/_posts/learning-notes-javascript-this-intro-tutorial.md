---
title: JavaScript this 入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - this
    - frontend engineer

---

在 JavaScript 中，`this` 是一個關鍵字，它的值會根據執行環境的不同而改變。以下是 `this` 在不同情境下的行為：

---

## 1. **全域環境 (Global Context)**
在瀏覽器中，`this` 預設指向 `window` 物件：
```js
console.log(this); // 在瀏覽器中，this 指向 window
```
在 Node.js 環境下，`this` 則指向 `global`：
```js
console.log(this); // 在 Node.js 中，this 指向 global
```

---

## 2. **函式內部 (Function Context)**
在一般函式中，`this` 的值取決於是否使用 `"use strict"`：
```js
function showThis() {
  console.log(this);
}
showThis(); // 在非嚴格模式下，this 指向 window (瀏覽器) 或 global (Node.js)

"use strict";
function showStrictThis() {
  console.log(this);
}
showStrictThis(); // 在嚴格模式下，this 變成 undefined
```

---

## 3. **物件方法 (Object Method)**
當 `this` 被用在物件的方法內，它指向該物件：
```js
const obj = {
  name: "Alice",
  greet: function () {
    console.log(this.name);
  },
};
obj.greet(); // "Alice"
```

---

## 4. **建構函式 (Constructor Function)**
在建構函式中，`this` 會指向新建立的物件：
```js
function Person(name) {
  this.name = name;
}
const p = new Person("Bob");
console.log(p.name); // "Bob"
```

---

## 5. **箭頭函式 (Arrow Function)**
箭頭函式中的 `this` **不會** 指向它自己的執行環境，而是繼承自外層函式的作用域：

```js
const obj = {
  name: "Charlie",
  greet: function () {
    const arrowFunc = () => {
      console.log(this.name);
    };
    arrowFunc();
  },
};
obj.greet(); // "Charlie" (this 繼承自 obj)
```

---

## 6. **setTimeout 和 setInterval**
在 `setTimeout` 或 `setInterval` 內，一般函式的 `this` 預設指向 `window` (瀏覽器) 或 `global` (Node.js)：
```js
const obj = {
  name: "David",
  greet: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};
obj.greet(); // undefined，因為 this 指向 window/global
```
解法：改用箭頭函式：
```js
const obj = {
  name: "David",
  greet: function () {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  },
};
obj.greet(); // "David"
```

---

## 7. **事件處理器 (Event Handler)**
在事件處理函式中，`this` 指向觸發事件的元素：
```js
document.getElementById("btn").addEventListener("click", function () {
  console.log(this); // 指向 <button> 元素
});
```
如果改用箭頭函式，`this` 會指向外部作用域：
```js
document.getElementById("btn").addEventListener("click", () => {
  console.log(this); // 指向 window
});
```

---

## 8. **call、apply 和 bind**
可以使用 `call()`、`apply()` 和 `bind()` 來改變 `this` 指向：

### **call()**
```js
function greet() {
  console.log(this.name);
}
const person = { name: "Eve" };
greet.call(person); // "Eve"
```

### **apply()**
`apply()` 與 `call()` 類似，但參數是以陣列方式傳入：
```js
function introduce(age, city) {
  console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}
const person = { name: "Frank" };
introduce.apply(person, [25, "Taipei"]);
```

### **bind()**
`bind()` 會回傳一個新的函式，永久綁定 `this`：
```js
const boundFunc = greet.bind(person);
boundFunc(); // "Eve"
```

---

### 總結
- **全域環境**：`this` 在瀏覽器中指向 `window`，在 Node.js 指向 `global`
- **普通函式**：嚴格模式下 `this` 為 `undefined`，否則指向 `window`
- **物件方法**：`this` 指向該物件
- **建構函式**：`this` 指向新建立的物件
- **箭頭函式**：`this` 繼承外部作用域
- **事件處理器**：普通函式 `this` 指向事件元素，箭頭函式 `this` 指向外部作用域
- **`call`、`apply`、`bind`** 可顯式設定 `this`