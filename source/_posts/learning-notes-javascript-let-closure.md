---
title: JavaScript let 閉包（Closure）入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - Closure
    - async/await
    - let
    - 閉包
    - frontend engineer

---

#### 什麼是閉包（Closure）？
閉包是 JavaScript 中的一個強大概念，它允許函式「記住」其外部作用域（lexical scope），即使該作用域已經執行完畢並離開了執行環境。閉包使得函式能夠存取其外部函式內部的變數，而這些變數通常在外部函式執行結束後仍然可以被存取。

在 JavaScript 中，每當一個函式被創建時，它都會自動獲得對其外部變數的存取權，這就是閉包的核心概念。

---

## **閉包的基本概念**
閉包的最基本形式是函式內部返回另一個函式，而返回的函式仍然能夠存取外部函式的變數，即使外部函式已經執行完畢。例如：

```js
function outerFunction() {
    let outerVariable = "我是外部變數";

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

const closureExample = outerFunction(); 
closureExample(); // 輸出: "我是外部變數"
```

在這個例子中：
1. `outerFunction` 內部定義了一個變數 `outerVariable`，並宣告了一個 `innerFunction`。
2. `innerFunction` 存取 `outerVariable`，然後被 `outerFunction` 返回。
3. 當 `closureExample` 執行時，即使 `outerFunction` 已經執行完畢，它仍然可以存取 `outerVariable`，因為它形成了一個閉包。

---

## **閉包的實際應用**
閉包在 JavaScript 中有許多實際用途，包括資料封裝、模擬私有變數、事件處理，以及避免全域變數污染等。

### **1. 資料封裝與模擬私有變數**
在 JavaScript 中，沒有內建的 `private` 修飾符，但可以透過閉包來模擬私有變數：

```js
function createCounter() {
    let count = 0; // 私有變數

    return {
        increment: function() {
            count++;
            console.log(`計數器值: ${count}`);
        },
        decrement: function() {
            count--;
            console.log(`計數器值: ${count}`);
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
counter.increment(); // 計數器值: 1
counter.increment(); // 計數器值: 2
console.log(counter.getCount()); // 2
counter.decrement(); // 計數器值: 1
```

在這個例子中：
- `count` 變數是 `createCounter` 的內部變數，外部無法直接存取。
- `increment`、`decrement` 和 `getCount` 方法則形成閉包，允許我們操作 `count`。

這種方法可以防止外部直接修改 `count`，達到變數封裝的效果。

---

### **2. 事件處理中的閉包**
閉包在事件處理中特別有用，例如當我們需要讓事件處理函式記住某些狀態時：

```js
function attachEventListener() {
    let count = 0;

    document.getElementById("clickButton").addEventListener("click", function() {
        count++;
        console.log(`按鈕點擊次數: ${count}`);
    });
}

attachEventListener();
```

這裡：
- `click` 事件處理函式記住了 `count` 變數，即使 `attachEventListener` 已執行完畢，每次點擊按鈕時，`count` 仍然會被持續累加。

---

### **3. 立即函式（IIFE, Immediately Invoked Function Expression）**
立即函式是一種使用閉包的技術，可用於模擬私有作用域，避免變數污染全域空間：

```js
const counter = (function() {
    let count = 0;

    return {
        increment: function() {
            count++;
            console.log(`計數器值: ${count}`);
        },
        decrement: function() {
            count--;
            console.log(`計數器值: ${count}`);
        },
        getCount: function() {
            return count;
        }
    };
})();

counter.increment(); // 計數器值: 1
counter.increment(); // 計數器值: 2
console.log(counter.getCount()); // 2
counter.decrement(); // 計數器值: 1
```

這裡：
- `(function() {...})()` 是一個立即執行函式，它執行後返回了一個對象，該對象內部的函式形成閉包，能夠存取 `count`。

這種技術在早期 JavaScript 程式設計中常被用來創建模組化的程式碼，避免全域變數污染。

---

### **4. 用於函式工廠（Function Factory）**
閉包可以用來創建不同的函式行為，例如建立不同的乘法器：

```js
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

這裡：
- `createMultiplier` 接受 `multiplier` 作為參數，返回一個新的函式。
- 該函式形成閉包，記住 `multiplier`，即使 `createMultiplier` 已經執行完畢。

這種模式在高階函式設計中非常常見。

---

## **閉包的注意事項**
雖然閉包提供了強大的功能，但如果不當使用，可能會導致記憶體洩漏。例如：
```js
function createLargeClosure() {
    let largeArray = new Array(1000000).fill("資料");
    return function() {
        console.log(largeArray.length);
    };
}

const closure = createLargeClosure();
// 如果 closure 持續存在，largeArray 也不會被回收
```
- `largeArray` 變數被閉包記住，無法被垃圾回收機制（GC）回收，可能導致記憶體洩漏。
- 解決方案是確保不再使用閉包時，讓變數參考變為 `null` 或適時使用 `WeakMap` 來管理記憶體。

---

## **結論**
閉包是 JavaScript 的核心概念之一，理解閉包有助於寫出更靈活、可維護的程式碼。它主要用於：
- **變數封裝**（模擬私有變數）
- **事件處理**（記住狀態）
- **函式工廠**（創建可重複使用的函式）
- **IIFE**（避免變數污染）

掌握閉包後，可以更進一步學習 JavaScript 中的函式式程式設計（Functional Programming），提升程式的模組化與可讀性。