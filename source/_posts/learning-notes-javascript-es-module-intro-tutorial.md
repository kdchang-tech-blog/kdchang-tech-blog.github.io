---
title: JavaScript 模組（Module）入門教學筆記 | 學習筆記
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
    - frontend engineer

---

## **1. 什麼是 JavaScript 模組？**
JavaScript 模組（Module）是一種**將程式碼拆分成多個獨立文件**，並在不同文件間共享和管理程式碼的方式。透過模組化的設計，可以讓程式碼更具結構性、可讀性與可維護性。

在 ES6（ECMAScript 2015）之前，JavaScript 主要透過 **IIFE（立即執行函式）、CommonJS 或 AMD** 來模組化程式碼。而 ES6 之後，JavaScript 原生支援 **ES Modules（ESM）**，提供 `import` 和 `export` 來管理模組。

---

## **2. 為什麼需要模組？**
1. **避免全域變數污染**  
   - 模組能夠封裝變數，避免不同程式碼區塊互相影響。
2. **提高可維護性**  
   - 讓程式碼結構更清晰，拆分不同的功能至獨立文件中。
3. **支援程式碼重用**  
   - 可在多個專案中共享相同的模組，避免重複開發。
4. **支援延遲載入（Lazy Loading）**  
   - 透過動態 `import()`，按需載入模組，提高效能。

---

## **3. ES6 模組語法**
在 ES6 中，我們主要使用 `export` 和 `import` 來定義和載入模組。

### **(1) `export` 的使用**
#### **命名匯出（Named Export）**
```js
// math.js
export const pi = 3.14159;
export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}
```

#### **預設匯出（Default Export）**
```js
// greeting.js
export default function sayHello(name) {
    return `Hello, ${name}!`;
}
```

### **(2) `import` 的使用**
#### **匯入命名匯出**
```js
// main.js
import { pi, add, subtract } from "./math.js";

console.log(pi); // 3.14159
console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
```

#### **匯入預設匯出**
```js
// main.js
import sayHello from "./greeting.js";

console.log(sayHello("Alice")); // "Hello, Alice!"
```

#### **匯入所有模組內容**
```js
// main.js
import * as math from "./math.js";

console.log(math.pi); // 3.14159
console.log(math.add(2, 3)); // 5
```

#### **使用 `as` 重新命名**
```js
import { add as sum, subtract as minus } from "./math.js";

console.log(sum(10, 5)); // 15
console.log(minus(10, 5)); // 5
```

---

## **4. ES 模組的特性**
1. **靜態解析（Static Analysis）**
   - `import` 和 `export` **必須在頂層作用域**，不能在條件語句或函式內部。
   - 在編譯時（compile time）解析模組，而不是執行時（runtime）。

2. **模組作用域**
   - 每個模組都有自己的作用域，變數不會污染全域作用域。

3. **自動使用嚴格模式（Strict Mode）**
   - ES6 模組內部自動啟用 `"use strict"`，無需手動指定。

---

## **5. 動態載入模組**
有時候我們希望在特定條件下載入模組，而不是在程式開始時就載入所有模組。這時可以使用 **`import()`** 來動態載入。

```js
if (true) {
    import("./math.js").then((math) => {
        console.log(math.add(5, 10)); // 15
    });
}
```

- `import()` 回傳一個 Promise，當模組載入完成後執行回調函式。
- 這種方式適合懶加載（Lazy Loading）與條件性載入。

---

## **6. `var`、`let` 在模組中的行為**
在模組內，變數 `var` 仍然會被提升（Hoisting），但 `let` 和 `const` 具有區塊作用域。

```js
// module.js
var globalVar = "I am global";
let localVar = "I am local";
```

```js
// main.js
import "./module.js";

console.log(globalVar); // "I am global" （因為 var 會提升到全域）
console.log(localVar); // ReferenceError: localVar is not defined
```

---

## **7. 在瀏覽器與 Node.js 環境使用 ES 模組**
### **(1) 瀏覽器**
在 HTML 文件中，使用 `<script type="module">` 來載入 ES6 模組。

```html
<script type="module">
    import { add } from "./math.js";
    console.log(add(10, 5));
</script>
```

### **(2) Node.js**
Node.js 14+ 版本支援 ES 模組，但需要：
- 檔案副檔名改為 `.mjs`
- 在 `package.json` 設定 `"type": "module"`

```json
{
  "type": "module"
}
```

```js
// math.mjs
export function multiply(a, b) {
    return a * b;
}
```

```js
// main.mjs
import { multiply } from "./math.mjs";
console.log(multiply(4, 5)); // 20
```

---

## **8. 模組引入方式整理**
| **環境**   | **引入方式** |
|------------|------------|
| 瀏覽器（ESM） | `<script type="module">` |
| Node.js（ESM） | `import { foo } from './module.mjs'` |
| Node.js（CommonJS） | `const foo = require('./module.js')` |
| 動態載入（Lazy Load） | `import('./module.js').then(...)` |
| 重新命名 | `import { foo as newFoo } from './module.js'` |
| 匯入所有內容 | `import * as mod from './module.js'` |

---

## **9. 結論**
1. **ES 模組是 JavaScript 原生模組系統**，使用 `import` 和 `export` 來管理程式碼。
2. **模組有助於提升可讀性與可維護性**，避免全域變數污染。
3. **動態載入（import()）可以優化效能**，適合延遲載入模組。
4. **瀏覽器與 Node.js 都支援 ES6 模組**，但 Node.js 需要 `.mjs` 或 `package.json` 設定 `"type": "module"`。
5. **模組可以透過不同方式引入**，根據環境選擇適合的方法。

掌握 JavaScript 模組的概念，能夠讓你更有效地開發與維護大型專案。