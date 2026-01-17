---
title: JavaScript 箭頭函式 (Arrow Function）入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - this
    - Arrow Function
    - frontend engineer

---

在 JavaScript 的 **箭頭函式 (Arrow Function, `=>`)** 中，`this` 的行為與傳統的 **函式表達式 (Function Expression)** 不同，主要特點如下：

---

## **箭頭函式的 `this` 綁定**
1. **箭頭函式不會建立自己的 `this`**，而是**繼承**定義它的上下文（也稱為 **詞法作用域 Lexical Scope**）。
2. 在箭頭函式內部，`this` 指向的是**箭頭函式所處的外部函式的 `this` 值**。

---

## **範例**
### **1. 一般函式的 `this`**
```javascript
function normalFunction() {
  console.log(this); // this 取決於調用方式
}

const obj = {
  method: normalFunction
};

obj.method(); // this 指向 obj
normalFunction(); // this 指向全域物件 (在瀏覽器是 window，在 Node.js 是 global)
```

---

### **2. 箭頭函式的 `this`**
```javascript
const arrowFunction = () => {
  console.log(this); // 繼承外部作用域的 this
};

const obj2 = {
  method: arrowFunction
};

obj2.method(); // this 指向定義時的外部作用域，而不是 obj2
```
**解析：**
- **`arrowFunction` 並未創建自己的 `this`，所以 `this` 仍然指向外部作用域的 `this`**，而不是 `obj2`。

---

## **箭頭函式適用場景**
### **1. 在物件方法中避免 `this` 綁定問題**
```javascript
const person = {
  name: "John",
  sayHello: function() {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // this 繼承 sayHello 的 this，即 person
    }, 1000);
  }
};

person.sayHello(); // Hello, John
```
**解析：**
- `setTimeout` 中的箭頭函式不會創建新的 `this`，它會繼承 `sayHello` 方法中的 `this`，所以 `this.name` 正確指向 `person.name`。

> 若使用一般函式，`this` 會指向 `window`（瀏覽器環境）或 `undefined`（嚴格模式）。

---

### **2. 當作回呼函式 (Callback)**
```javascript
const numbers = [1, 2, 3];

// 使用箭頭函式讓 this 指向外部作用域
const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6]
```
> `map()` 內的箭頭函式不需要 `this`，但讓語法更簡潔。

---

## **箭頭函式的 `this` 限制**
### **1. 不能作為建構函式 (Constructor)**
```javascript
const Person = (name) => {
  this.name = name; //  錯誤，this 不會指向新建的物件
};

const john = new Person("John"); // TypeError: Person is not a constructor
```
**解法：** 必須使用 `function` 來定義建構函式：
```javascript
function Person(name) {
  this.name = name;
}

const john = new Person("John"); //  正常運作
```

---

### **2. 不能使用 `arguments`**
```javascript
const sum = () => {
  console.log(arguments); //  ReferenceError: arguments is not defined
};

sum(1, 2, 3);
```
**解法：** 可以使用 **展開運算符 `...args`**
```javascript
const sum = (...args) => {
  console.log(args); //  [1, 2, 3]
};

sum(1, 2, 3);
```

---

### **3. 無法使用 `.bind()` 改變 `this`**
```javascript
const obj = {
  value: 42,
  method: () => {
    console.log(this.value);
  }
};

const newMethod = obj.method.bind({ value: 100 });
newMethod(); // undefined (this 不會變)
```
> **箭頭函式的 `this` 綁定無法透過 `bind()`、`call()` 或 `apply()` 來改變**。

---

## **總結**
|  特性  | 一般函式 (Function) | 箭頭函式 (Arrow Function) |
|--------|--------------------|------------------------|
| `this` | 依呼叫方式決定 | 繼承外部作用域 |
| `arguments` | 有 (`function` 內部) | 無 (`...args` 取代) |
| `bind()/call()/apply()` | 可改變 `this` | 無效 |
| `new` 關鍵字 | 可用於建構函式 |  無法當建構函式 |

---
### **適用場景**
 **適合使用箭頭函式：**
- 短小的回呼函式 (e.g. `map`, `filter`, `forEach`)
- `setTimeout()` 或 `setInterval()`
- 物件內部方法但不希望 `this` 被改變

 **不適合使用箭頭函式：**
- **建構函式**
- **需要動態 `this` 的方法**
- **使用 `arguments` 物件的場合**