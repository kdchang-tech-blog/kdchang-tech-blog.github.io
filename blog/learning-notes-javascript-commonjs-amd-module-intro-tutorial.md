---
title: JavaScript 模組系統：CommonJS 與 AMD 入門教學 | 學習筆記
date: 2024-12-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - 模組
    - module
    - CommonJS（CJS）
    - Asynchronous Module Definition（AMD）
    - frontend engineer

---

## 前言

在 JavaScript 早期，所有程式碼通常寫在單一文件中，這樣的方式在小型專案中或許可行，但當應用程式變得更大、更複雜時，這種結構會導致管理困難。因此，模組化的概念被引入，允許開發者將程式碼拆分成可重複使用的獨立部分，提高可維護性與擴展性。  

在 ES6 標準推出之前，JavaScript 主要依賴 **CommonJS（CJS）** 和 **Asynchronous Module Definition（AMD）** 來實現模組化。這兩種模組系統有不同的設計理念與應用場景，以下將詳細介紹其特性與實作方式。

---

## **1. CommonJS（CJS）—— Node.js 的標準模組系統**  

### **概述**  
**CommonJS** 由 **Node.js** 所採用，主要用於伺服器端開發。它的核心概念是 **同步載入（Synchronous Loading）**，這意味著模組在執行時會逐步載入，而不是並行載入。  

CommonJS 主要透過 `require()` 來載入模組，並使用 `module.exports` 或 `exports` 來匯出模組內容。

### **CommonJS 語法**  

#### **(1) 定義模組（匯出）**
```js
// math.js
const pi = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// 匯出模組
module.exports = {
    pi,
    add,
    subtract
};
```

#### **(2) 使用模組（載入）**
```js
// main.js
const math = require('./math');

console.log(math.pi); // 3.14159
console.log(math.add(10, 5)); // 15
console.log(math.subtract(20, 8)); // 12
```

### **CommonJS 特點**
優點：
**適用於伺服器端（Node.js）**，可輕鬆管理模組與依賴。  
**簡單直覺的 `require()` 和 `module.exports` 語法**。  
**支援循環依賴（Circular Dependencies）**，當兩個模組互相依賴時，仍能正確解析。  

缺點：
**同步載入（Synchronous Loading）**，不適合瀏覽器端，因為會阻塞執行緒，影響頁面效能。  
**不支援瀏覽器環境**，需使用 Webpack 或 Browserify 來轉換為瀏覽器可用的程式碼。  

---

## **2. AMD（Asynchronous Module Definition）—— 適用於瀏覽器的模組系統**  

### **概述**  
**AMD** 是專為 **瀏覽器環境** 設計的模組系統，解決了 CommonJS 無法在前端環境直接運作的問題。AMD 的關鍵特點是 **非同步載入（Asynchronous Loading）**，允許模組在需要時才載入，避免影響頁面效能。  

AMD 主要使用 **`define()`** 來定義模組，**`require()`** 來載入模組。

### **AMD 語法**  

#### **(1) 定義模組（匯出）**
```js
// math.js
define([], function () {
    const pi = 3.14159;

    function add(a, b) {
        return a + b;
    }

    function subtract(a, b) {
        return a - b;
    }

    return {
        pi,
        add,
        subtract
    };
});
```

#### **(2) 使用模組（載入）**
```js
// main.js
require(['math'], function (math) {
    console.log(math.pi); // 3.14159
    console.log(math.add(5, 6)); // 11
});
```

### **AMD 特點**
優點：
**適用於瀏覽器環境**，支援非同步載入，提高效能。  
**使用 `define()` 與 `require()` 來管理模組，能夠載入多個依賴。**  
**非同步執行，適合大型應用程式，減少載入時間。**  

缺點：
**語法較繁瑣**，比 CommonJS 需要更多設定。  
**需要 RequireJS 來執行**，瀏覽器無法直接支援 AMD。  

---

## **3. CommonJS vs AMD vs ES Modules（ESM）**  

| **特性**       | **CommonJS（CJS）** | **AMD** | **ES Modules（ESM）** |
|--------------|----------------|------|----------------|
| **適用環境** | Node.js        | 瀏覽器 | 瀏覽器 & Node.js |
| **載入方式**  | `require()`    | `require()` | `import/export` |
| **同步/非同步** | 同步（Synchronous） | 非同步（Asynchronous） | 靜態解析（Static） |
| **優勢**     | 簡單易用，適合伺服器端 | 適用瀏覽器，非同步載入 | 現代標準，支援 Tree Shaking |
| **限制**     | 不適合瀏覽器 | 需要 RequireJS | 需要 ES6 瀏覽器或 Node.js 12+ |

---

## **4. CommonJS 與 AMD 的使用時機**
- **當開發伺服器端應用程式時，建議使用 CommonJS**，因為它與 Node.js 相容性最佳。  
- **當開發前端應用時，AMD 是一種選擇，但目前更推薦使用 ES Modules（ESM）**。  
- **現代 JavaScript 建議使用 ES Modules（import/export），因為它已經成為標準**，並且同時支援瀏覽器與 Node.js 環境。

---

## **5. 結論**
在 JavaScript 模組化的歷史發展中，**CommonJS** 被廣泛用於 **伺服器端**，而 **AMD** 則主要針對 **瀏覽器環境** 設計。隨著 ES6 的 **ES Modules**（ESM）標準化，許多開發者已經轉向 **ESM**，因為它在語法上更直覺，並且可以同時適用於前端與後端。  

雖然 CommonJS 和 AMD 仍然在某些專案中使用，但未來趨勢將逐漸轉向 ES Modules。因此，對於新專案，建議 **優先使用 ES Modules（import/export）**，而對於舊專案或特定環境（如 Node.js 早期版本），仍可能需要使用 CommonJS 或 AMD。