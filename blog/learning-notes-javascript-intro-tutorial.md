---
title: JavaScript 入門教學筆記 | 學習筆記
date: 2021-12-15 02:23:41
authors: kdchang
tags: 
    - JavaScript
    - JS

---

### 前言  

`JavaScript`（簡稱 JS）是一種高階、直譯式、弱型別的程式語言，廣泛應用於 Web 開發。它最初用於瀏覽器端，現在也能在伺服器端（如 Node.js）運行，並支援多種應用開發，如網頁、行動應用、桌面應用等。

---

## 1. JavaScript 的基本語法  

### 1.1 變數與常數  
在 JavaScript 中，可以使用 `var`、`let` 或 `const` 來宣告變數。  

```javascript
var a = 10; // 傳統變數宣告（不建議使用）
let b = 20; // 可變變數
const c = 30; // 常數，無法重新賦值
```
`let` 和 `const` 具有區塊作用域（Block Scope），而 `var` 則具有函式作用域（Function Scope）。

---

### 1.2 資料型別  
JavaScript 主要的資料型別包括：  

- **原始型別（Primitive Types）**：
  - `string`（字串）
  - `number`（數字，包括整數與浮點數）
  - `boolean`（布林值）
  - `null`（空值）
  - `undefined`（未定義）
  - `symbol`（符號，ES6 引入）

- **參考型別（Reference Types）**：
  - `object`（物件）
  - `array`（陣列）
  - `function`（函式）

範例：
```javascript
let name = 'Alice'; // 字串
let age = 25; // 數字
let isStudent = true; // 布林值
let hobby = null; // 空值
let score; // 未定義（undefined）
let person = { name: 'Bob', age: 30 }; // 物件
let colors = ['red', 'green', 'blue']; // 陣列
```

---

## 2. 運算子  

### 2.1 算術運算子  
```javascript
let x = 10;
let y = 5;

console.log(x + y); // 加法：15
console.log(x - y); // 減法：5
console.log(x * y); // 乘法：50
console.log(x / y); // 除法：2
console.log(x % y); // 餘數：0
console.log(x ** 2); // 次方運算：100
```

### 2.2 比較運算子  
```javascript
console.log(10 > 5); // true
console.log(10 >= 10); // true
console.log(10 < 5); // false
console.log(10 === '10'); // false（全等）
console.log(10 == '10'); // true（寬鬆比較）
console.log(10 !== '10'); // true（全不等）
console.log(10 != '10'); // false（寬鬆不等）
```

### 2.3 邏輯運算子  
```javascript
console.log(true && false); // false（AND）
console.log(true || false); // true（OR）
console.log(!true); // false（NOT）
```

---

## 3. 控制流程  

### 3.1 條件判斷  
```javascript
let score = 75;

if (score >= 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else {
    console.log('C');
}
```

### 3.2 三元運算子  
```javascript
let age = 18;
let canVote = age >= 18 ? '可以投票' : '不可以投票';
console.log(canVote);
```

### 3.3 `switch` 語法  
```javascript
let fruit = 'apple';

switch (fruit) {
    case 'banana':
        console.log('黃色');
        break;
    case 'apple':
        console.log('紅色');
        break;
    default:
        console.log('未知');
}
```

---

## 4. 迴圈  

### 4.1 `for` 迴圈  
```javascript
for (let i = 1; i <= 5; i++) {
    console.log('數字：' + i);
}
```

### 4.2 `while` 迴圈  
```javascript
let num = 1;

while (num <= 5) {
    console.log('數字：' + num);
    num++;
}
```

### 4.3 `forEach`（適用於陣列）  
```javascript
let colors = ['red', 'green', 'blue'];

colors.forEach(function (color) {
    console.log(color);
});
```

---

## 5. 函式（Functions）  

### 5.1 一般函式  
```javascript
function add(a, b) {
    return a + b;
}

console.log(add(3, 5)); // 8
```

### 5.2 箭頭函式（Arrow Function）  
```javascript
const multiply = (a, b) => a * b;

console.log(multiply(4, 6)); // 24
```

### 5.3 立即執行函式（IIFE）  
```javascript
(function () {
    console.log('這是立即執行函式');
})();
```

---

## 6. 陣列與物件  

### 6.1 陣列操作  
```javascript
let fruits = ['apple', 'banana', 'cherry'];

fruits.push('grape'); // 新增
console.log(fruits); // ['apple', 'banana', 'cherry', 'grape']

fruits.pop(); // 移除最後一個
console.log(fruits); // ['apple', 'banana', 'cherry']
```

### 6.2 物件操作  
```javascript
let person = {
    name: 'Alice',
    age: 25,
    greet: function () {
        console.log('Hello, my name is ' + this.name);
    }
};

console.log(person.name); // 'Alice'
person.greet(); // 'Hello, my name is Alice'
```

---

## 7. 非同步處理  

### 7.1 `setTimeout` 與 `setInterval`  
```javascript
setTimeout(() => {
    console.log('這段文字將在 2 秒後出現');
}, 2000);
```

### 7.2 Promise  
```javascript
let fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('資料已載入');
    }, 2000);
});

fetchData.then((message) => console.log(message));
```

### 7.3 `async/await`  
```javascript
async function fetchData() {
    return '資料已載入';
}

fetchData().then(console.log);
```

---

## 總結  
JavaScript 是一種靈活且功能強大的語言，適用於前端與後端開發。本文介紹了基本語法、變數、運算子、控制流程、函式、陣列、物件及非同步處理等內容，這些知識構成 JavaScript 入門的基礎。建議透過實際練習來加深理解，如使用瀏覽器開發者工具或建立小型專案來測試所學內容。