---
title: JavaScript ES6 入門語法教學筆記 | 學習筆記
date: 2017-02-02 02:23:41
authors: kdchang
tags: 
    - javascript
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - ES6
    - ECMAScript
    - ECMAScript6
    - ECMAScript2015

---

ECMAScript 6 又稱 ECMAScript 2015，是 JavaScript 語言的新一代標準，讓 JavaScript 可以更容易撰寫大型複雜的應用程式並避免不必要的錯誤。

以下介紹常用 ES6 入門語法：

## 一、let & const 變數宣告
1. `let`：用於宣告變數，可重新賦值。
```javascript
let name = 'John';
name = 'Mike';  // 可以重新賦值
```

2. `const`：用於宣告常數，賦值後不可更改。
```javascript
const pi = 3.14;
pi = 3.1415;  // 會報錯
```
> 建議預設使用 `const`，僅需變更時使用 `let`。兩者作用域為 block scope

在 **ES6** 中，`let` 的 **區塊作用域（Block Scope）** 是它與舊有的 `var` 最大的不同之一。

---

### 什麼是 **Block Scope（區塊作用域）**？
- 使用 `let` 宣告的變數，只能在**該程式區塊 `{}`** 內部存取。
- 區塊作用域指的是任何用 `{}` 包起來的範圍，例如：
  - `if`、`for`、`while` 等程式區塊。
  - 一般 `{}` 花括號內的區域。

---

### 範例說明

#### 1. `let` 在區塊內的作用範圍
```javascript
{
  let x = 10;
  console.log(x);  // 10
}
console.log(x);  // ReferenceError: x is not defined
```
- `x` 在 `{}` 區塊內宣告，僅在該區塊內有效。
- 區塊外存取會出錯。

---

#### 2. `var` 沒有區塊作用域（舊語法對比）
```javascript
{
  var y = 20;
  console.log(y);  // 20
}
console.log(y);  // 20
```
- `var` 沒有區塊作用域，`y` 雖在 `{}` 內宣告，但可在區塊外存取。

---

#### 3. `for` 迴圈中的 `let`
```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);  // 0, 1, 2
}
console.log(i);  // ReferenceError: i is not defined
```
- `i` 只在 `for` 迴圈內有效。

---

#### `let` 的區塊作用域優點
1. 避免變數污染：`let` 限制變數在區塊內，避免影響區塊外的程式碼。
2. 防止重複定義：同一區塊內不能重複宣告相同變數。
   ```javascript
   let a = 1;
   let a = 2;  // SyntaxError: Identifier 'a' has already been declared
   ```
3. 更安全、可預期的變數管理。

---

#### 總結
| 關鍵字 | 區塊作用域 | 重複宣告 | 提升（Hoisting）行為 |
|--------|--------------|-----------|---------------------|
| `let`  | 有          | 不可      | 提升但不初始化（TDZ）|
| `var`  | 無          | 可        | 提升並初始化 `undefined` |

**建議盡量用 `let` 和 `const`，避免使用 `var`**！  
這樣可以減少潛在的 bug，也符合現代 JavaScript 開發的最佳實踐。

---

## 二、模板字串（Template Literals）
以前字串串變數要使用 `+`，現在可以使用反引號 (``) 定義字串，可插入變數。
```javascript
const name = 'John';
const age = 25;
console.log(`我叫 ${name}，今年 ${age} 歲`);
```

---

## 三、箭頭函式（Arrow Functions）
1. 基本語法：
```javascript
const add = (a, b) => {
  return a + b;
}
```
2. 簡寫形式：
```javascript
const add = (a, b) => a + b;
```
3. 單一參數可省略括號：
```javascript
const square = n => n * n;
```
> 箭頭函式不會綁定自己的 `this`，繼承外層作用域的 `this`。

---

沒錯！這句話是 **箭頭函式（Arrow Function）** 很重要的特性之一，這裡幫你拆解得更清楚一點：

---

#### 什麼是 `this`？
`this` 代表**函式執行時所屬的物件**，依照函式被呼叫的方式不同，`this` 的值也會不同。

例如：
```javascript
function normalFunction() {
  console.log(this);
}
normalFunction(); // 在瀏覽器環境中，this 會是 window 物件
```

如果這個函式被某個物件呼叫：
```javascript
const obj = {
  name: 'John',
  sayHi: function() {
    console.log(this.name);
  }
};
obj.sayHi(); // John，this 指向 obj
```

---

#### 箭頭函式的 `this` 特性

**箭頭函式不會綁定自己的 `this`，它會「繼承外層作用域」的 `this`。**

也就是說：
- 傳統函式：`this` 依賴呼叫方式來決定。
- 箭頭函式：`this` 取決於**箭頭函式宣告時所在的外層作用域的 `this`**。

範例說明：

#### 傳統函式 vs 箭頭函式
```javascript
const obj = {
  name: 'John',
  normalFunc: function() {
    console.log(this.name); // this 指向 obj
  },
  arrowFunc: () => {
    console.log(this.name); // this 指向外層（通常是 window 或 undefined）
  }
};

obj.normalFunc(); // John
obj.arrowFunc();  // undefined（或瀏覽器中可能是 window.name）
```

#### 常見應用場景：回呼函式（callback）中的 `this`
假設我們有一個計時器：
```javascript
const obj = {
  name: 'John',
  timer: function() {
    setTimeout(function() {
      console.log(this.name); // undefined 或 window.name
    }, 1000);
  }
};

obj.timer();
```
因為 setTimeout 裡的傳統函式，它的 `this` 在執行時會指向 `window`。

若改用箭頭函式：
```javascript
const obj = {
  name: 'John',
  timer: function() {
    setTimeout(() => {
      console.log(this.name); // John
    }, 1000);
  }
};

obj.timer();
```
箭頭函式不會綁定自己的 `this`，會繼承 `timer` 函式的 `this`，因此會正確印出 `John`。

---

#### 常見疑問

##### 為什麼箭頭函式不綁定自己的 `this`？
主要是為了解決**回呼函式中 `this` 易出錯的問題**。

以前會這樣解法：
```javascript
const that = this; // 變數 that 保存正確的 this
setTimeout(function() {
  console.log(that.name);
}, 1000);
```
現在有箭頭函式，就不用這麼麻煩。

---

#### 小結

| 類型              | `this` 綁定方式 | 一般用途                                             |
|-----------------|-----------------|-----------------------------------------------------|
| 傳統函式 function | 執行時決定     | 物件方法、建構函式                                 |
| 箭頭函式 =>      | 定義時決定     | callback 回呼函式、內部函式需要使用外部 `this` 的情境         |

---

總結：
- **一般物件方法用傳統函式。this 由呼叫的物件決定**
- **callback 回呼函式、內部函式用箭頭函式。**

這樣就可以避免大部分 `this` 的混亂狀況！

## 四、解構賦值（Destructuring）
1. 陣列解構：
```javascript
const arr = [1, 2, 3];
const [a, b, c] = arr;
```
2. 物件解構：
```javascript
const person = { name: 'John', age: 25 };
const { name, age } = person;
```

---

## 五、展開運算符（Spread Operator）
1. 陣列展開：
```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
```
2. 物件展開：
```javascript
const obj1 = { name: 'John', age: 25 };
const obj2 = { ...obj1, city: 'Taipei' };
```

---

## 六、預設參數（Default Parameters）
函式參數可設定預設值：
```javascript
const greet = (name = '訪客') => {
  console.log(`Hello, ${name}!`);
}
greet();         // Hello, 訪客!
greet('John');   // Hello, John!
```

---

這些 ES6 基礎語法，是現代 JavaScript 開發的常用技巧，掌握這些概念能大幅提升程式撰寫效率。