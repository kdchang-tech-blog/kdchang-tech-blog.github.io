---
title: JavaScript var 閉包（Closure）入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - Closure
    - async/await
    - var
    - 閉包
    - frontend engineer

---

#### **什麼是閉包（Closure）？**
閉包是 JavaScript 中的一個重要概念，指的是**函式在創建時，能夠記住並存取其外部作用域的變數，即使該作用域已經執行完畢**。這種特性使得 JavaScript 的函式可以擁有「記憶」的能力，允許函式保持對外部變數的存取權。

閉包的概念建立在 JavaScript 的**詞法作用域（Lexical Scope）**之上，也就是函式可以存取其被定義時所在的作用域中的變數，而不是函式執行時的作用域。

---

## **1. 基本範例**
```js
function outerFunction() {
    var outerVariable = "我是外部變數";

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

var closureExample = outerFunction(); 
closureExample(); // 輸出: "我是外部變數"
```

### **解析**
1. `outerFunction` 內部宣告了一個變數 `outerVariable`，並定義了一個 `innerFunction`。
2. `innerFunction` 存取 `outerVariable`，並被 `outerFunction` 返回。
3. 當 `closureExample` 執行時，即使 `outerFunction` 早已執行完畢，`innerFunction` 仍然能存取 `outerVariable`，這就是閉包的作用。

---

## **2. `var` 變數與閉包的問題**
JavaScript 在 ES6 之前使用 `var` 來宣告變數，但 `var` 具有**函式作用域（Function Scope）**，這可能會導致閉包相關的陷阱。

### **問題：`for` 迴圈與 `var`**
```js
function varClosureExample() {
    var functions = [];

    for (var i = 0; i < 3; i++) {
        functions.push(function() {
            console.log(i);
        });
    }

    return functions;
}

var closures = varClosureExample();
closures[0](); // 輸出: 3
closures[1](); // 輸出: 3
closures[2](); // 輸出: 3
```

### **為什麼會這樣？**
1. `var` 是**函式作用域**，它在整個 `varClosureExample` 內部是共享的。
2. 當 `closures[0]()`、`closures[1]()` 和 `closures[2]()` 執行時，它們都參考同一個 `i`，但 `i` 已經變成 `3`（因為 `for` 迴圈已經執行完畢）。
3. 所有函式都會輸出 `3`，而不是 `0, 1, 2`。

---

## **3. 如何修正 `var` 的問題**
### **解決方案 1：使用 `let`（區塊作用域）**
```js
function letClosureExample() {
    var functions = [];

    for (let i = 0; i < 3; i++) {
        functions.push(function() {
            console.log(i);
        });
    }

    return functions;
}

var closures = letClosureExample();
closures[0](); // 輸出: 0
closures[1](); // 輸出: 1
closures[2](); // 輸出: 2
```
**為什麼 `let` 有效？**
- `let` 具有**區塊作用域（Block Scope）**，每次迴圈執行時，`i` 都是一個新的變數，因此閉包綁定的 `i` 值不會變化。

### **解決方案 2：使用 IIFE（立即執行函式）**
如果只能使用 `var`，可以使用 **IIFE（Immediately Invoked Function Expression）**：

```js
function varClosureFixedExample() {
    var functions = [];

    for (var i = 0; i < 3; i++) {
        (function(i) {
            functions.push(function() {
                console.log(i);
            });
        })(i);
    }

    return functions;
}

var closures = varClosureFixedExample();
closures[0](); // 輸出: 0
closures[1](); // 輸出: 1
closures[2](); // 輸出: 2
```

### **為什麼 IIFE 有效？**
- IIFE 會立即執行，並建立一個新的作用域，確保每次迭代時 `i` 都是獨立的。

---

## **4. 閉包的實際應用**
### **(1) 模擬私有變數**
```js
function createCounter() {
    var count = 0; // 外部變數

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

var counter = createCounter();
counter.increment(); // 計數器值: 1
counter.increment(); // 計數器值: 2
console.log(counter.getCount()); // 2
counter.decrement(); // 計數器值: 1
```

**解析**
- `count` 是 `createCounter` 內部變數，外部無法直接存取，只能透過 `increment` 和 `decrement` 方法修改，形成了**私有變數的概念**。

---

### **(2) 函式工廠（Function Factory）**
```js
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

var double = createMultiplier(2);
var triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```
**解析**
- `double` 變數是一個閉包，記住了 `multiplier` 為 `2`。
- `triple` 變數是一個閉包，記住了 `multiplier` 為 `3`。
- 這種模式可以用來建立彈性的函式生成器。

---

### **(3) 延遲執行與事件處理**
```js
function delayedMessage(message, delay) {
    setTimeout(function() {
        console.log(message);
    }, delay);
}

delayedMessage("Hello, JavaScript!", 2000); // 2 秒後輸出 "Hello, JavaScript!"
```
**解析**
- `setTimeout` 內部的函式形成閉包，記住 `message` 變數，即使 `delayedMessage` 已經執行完畢。

---

## **5. 總結**
### **閉包的核心概念**
- **函式可以存取其外部函式的變數，即使外部函式已經執行完畢。**
- **`var` 變數的作用域為函式作用域，可能導致閉包內變數的值不如預期。**
- **使用 `let` 或 IIFE 可以避免 `var` 造成的閉包問題。**

### **閉包的應用**
1. **私有變數**（避免全域變數污染）
2. **函式工廠**（建立可重複使用的函式）
3. **事件處理與回調函式**
4. **延遲執行與計時器**

閉包是 JavaScript 的核心概念之一，它允許函式記住外部變數，即使作用域已經離開。var 宣告的變數可能會導致作用域問題，例如 for 迴圈內的閉包錯誤，而 let 或 IIFE 可以解決這個問題。

掌握閉包後，可以更進一步學習 JavaScript 的函式式程式設計（Functional Programming），提升程式的模組化與可讀性。








