---
title: JavaScript Hoisting 入門教學筆記 | 學習筆記
date: 2021-12-16 02:23:41
authors: kdchang
tags: 
    - JavaScript
    - JS
    - Hoisting
    - 變數提升

---

## 1. 什麼是 Hoisting？
Hoisting（提升）是 JavaScript 中的一種行為，它允許變數與函式在執行時被提升到作用域的頂部，這表示你可以在宣告之前使用它們，而不會發生錯誤。「`建立期`」（`Creation Phase`）和「`執行期`」（`Execution Phase`），建立期主要為定義變數名稱，執行期為執行程式和指定賦值。

在 JavaScript 中，Hoisting 影響兩種類型的宣告：
1. **變數宣告（var, let, const）**
2. **函式宣告（Function Declaration）**

## 2. 變數 Hoisting

### 2.1 使用 `var` 的 Hoisting
`var` 宣告的變數會被提升，但不會初始化，這表示變數本身會被提升到作用域頂端，但其值不會。

```javascript
console.log(a); // undefined
var a = 10;
console.log(a); // 10
```

上述程式碼等同於：

```javascript
var a;
console.log(a); // undefined

a = 10;
console.log(a); // 10
```

在 Hoisting 過程中，變數 `a` 被提升（Hoist）到了作用域的頂部，但它的值 `10` 並沒有一起提升，因此第一次 `console.log(a);` 會輸出 `undefined`。

### 2.2 使用 `let` 和 `const` 的 Hoisting
`let` 和 `const` 也會被提升，但它們不會自動初始化，因此在變數宣告之前存取會導致 `ReferenceError`。

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

等同於：

```javascript
let b;
console.log(b); // ReferenceError
b = 20;
```

`let` 和 `const` 變數存在「暫時性死區（Temporal Dead Zone, TDZ）」，這表示變數在初始化之前無法被存取。

```javascript
console.log(c); // ReferenceError
const c = 30;
```

### 2.3 總結變數 Hoisting
| 宣告方式 | 是否 Hoisting | 是否初始化 | TDZ 存在 |
|-----------|-------------|-----------|---------|
| `var`     | 是         | `undefined` | 否 |
| `let`     | 是         | 無         | 是 |
| `const`   | 是         | 無         | 是 |

## 3. 函式 Hoisting

### 3.1 Function Declaration（函式宣告）
函式宣告（`function foo() {}`）會完整 Hoisting，因此可以在定義之前調用。

```javascript
hello(); // Hello, world!

function hello() {
    console.log("Hello, world!");
}
```

在執行時，JavaScript 會將函式整個提升到作用域頂部，因此 `hello()` 可以在函式宣告前執行。

等同於：

```javascript
function hello() {
    console.log("Hello, world!");
}

hello(); // Hello, world!
```

### 3.2 Function Expression（函式表達式）
使用 `var` 宣告的函式表達式（Function Expression）僅會提升變數，但不會提升函式內容，因此無法在宣告前調用。

```javascript
console.log(sayHi); // undefined
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
    console.log("Hi!");
};
```

上述程式碼等同於：

```javascript
var sayHi;
console.log(sayHi); // undefined

sayHi = function() {
    console.log("Hi!");
};
```

因為 `sayHi` 在 Hoisting 時只被提升變數，但未初始化，因此 `console.log(sayHi);` 顯示 `undefined`，並且 `sayHi();` 會導致 `TypeError`。

### 3.3 使用 `let` 和 `const` 的 Function Expression
若函式表達式使用 `let` 或 `const`，則變數仍然會被提升，但會受到暫時性死區（TDZ）影響，因此在初始化前使用會導致 `ReferenceError`。

```javascript
console.log(sayHello); // ReferenceError: Cannot access 'sayHello' before initialization
let sayHello = function() {
    console.log("Hello!");
};
```

## 4. 結論與最佳實踐

### 4.1 總結 Hoisting 行為
1. **變數宣告**：
   - `var` 會被提升並初始化為 `undefined`。
   - `let` 和 `const` 會被提升，但不會初始化（存在 TDZ）。
2. **函式宣告**：
   - `function` 會完整提升，可以在宣告前調用。
   - `var` 宣告的函式表達式只提升變數，無法在宣告前調用。
   - `let` 和 `const` 宣告的函式表達式受 TDZ 影響，無法在宣告前使用。

### 4.2 最佳實踐
- **避免使用 `var`**，改用 `let` 或 `const`。
- **函式表達式應在使用前宣告**，避免 `undefined` 或 `ReferenceError`。
- **將所有變數與函式宣告放在作用域的開頭**，可減少 Hoisting 帶來的困惑。

### 4.3 最佳實踐範例
```javascript
// 正確做法：將變數與函式宣告放在最上方
function greet() {
    console.log("Hello, world!");
}

greet();

const sayHi = function() {
    console.log("Hi!");
};

sayHi();
```

這樣可以確保程式碼易於理解，並避免因 Hoisting 造成的問題。

# 參考文件
1. [[JavaScript] Javascript 的執行環境 (Execution context) 與堆疊 (Stack)](https://medium.com/itsems-frontend/javascript-execution-context-and-call-stack-e36e7f77152e)
2. [初學者指南：深入了解 JavaScript 中的 Event Loop（事件循環）](https://realnewbie.com/coding/javascript/javascript-event-loop/)
3. [初學者指南：深入了解 JavaScript 的 Call Stack（呼叫堆疊）](https://realnewbie.com/coding/javascript/javascript-call-stack/)
4. [初學者指南：深入了解 JavaScript 的執行環境（Execution Context）](https://realnewbie.com/coding/javascript/javascript-execution-context/)
5. [初學者指南：深入了解 JavaScript 的建立期與執行期](https://realnewbie.com/coding/javascript/javascript-creation-phase-execution-phase/)
6. [初學者指南：深入了解 JavaScript 中函式與變數的建立期與執行期差異](https://realnewbie.com/coding/javascript/javascript-variable-function-creation-phase-execution-phase-difference/)