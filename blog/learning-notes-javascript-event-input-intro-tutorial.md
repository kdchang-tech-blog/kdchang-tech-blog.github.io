---
title: JavaScript this 使用情境入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
authors: kdchang
tags: 
    - JavaScript
    - arrow function
    - this

---

# 前言
在 JavaScript 中，箭頭函式（arrow function）與傳統函式在 `this` 的行為上有一些不同。箭頭函式不會創建自己的 `this`，而是繼承外部作用域的 `this`，這就是為什麼你會遇到 `this` 的問題。

### 傳統函式中的 `this`
在傳統的函式中，`this` 會指向該函式被調用時的上下文。例如，當函式作為事件處理器時，`this` 會指向觸發事件的元素。

```javascript
function regularFunction() {
  console.log(this);  // 'this' 是調用它的上下文
}

const obj = {
  name: 'KD',
  show: regularFunction
};

obj.show();  // 'this' 會指向 obj
```

### 箭頭函式中的 `this`
在箭頭函式中，`this` 並不會綁定到函式的上下文，而是繼承自外部作用域。這通常會讓箭頭函式的 `this` 變得不同於你預期的結果。

### 例子：`this` 的問題
假設有這樣的情境，當你在一個物件的方法中使用箭頭函式作為事件處理器，`this` 會指向外部作用域，而不是該物件本身。

```javascript
const obj = {
  name: 'KD',
  show: function() {
    // 使用傳統函式作為事件處理器
    document.getElementById('btn').addEventListener('click', function() {
      console.log(this);  // 'this' 指向的是 'btn' 按鈕元素
    });

    // 使用箭頭函式作為事件處理器
    document.getElementById('btn').addEventListener('click', () => {
      console.log(this);  // 'this' 指向外部作用域，即 'obj' 物件
    });
  }
};

obj.show();
```

- 在傳統函式中，`this` 會指向觸發事件的 DOM 元素（這裡是 `btn` 按鈕）。
- 在箭頭函式中，`this` 會指向外部作用域（這裡是 `obj` 物件），因為箭頭函式不會創建自己的 `this`。

### 解決方案：確保 `this` 正確指向
如果你希望 `this` 指向物件本身，可以使用傳統函式或手動綁定 `this`。

#### 使用傳統函式
如果你希望在事件處理器中讓 `this` 指向物件本身，可以使用傳統函式，或者使用 `bind` 顯式綁定 `this`。

```javascript
const obj = {
  name: 'KD',
  show: function() {
    document.getElementById('btn').addEventListener('click', function() {
      console.log(this);  // 'this' 指向 obj
    }.bind(this));  // 顯式綁定 'this' 到 obj
  }
};

obj.show();
```

#### 另一個選項：箭頭函式和外部 `this`
如果你希望繼續使用箭頭函式，你可以將物件的 `this` 儲存到外部變數中，並在箭頭函式中引用它。

```javascript
const obj = {
  name: 'KD',
  show: function() {
    const self = this;  // 保存物件的 'this'
    document.getElementById('btn').addEventListener('click', () => {
      console.log(self);  // 使用外部的 'self'，指向 obj
    });
  }
};

obj.show();
```

### 總結
- **傳統函式** 會根據調用上下文決定 `this` 的值。
- **箭頭函式** 會繼承外部作用域的 `this`，不會創建自己的 `this`，這樣在某些情況下會導致 `this` 不如預期。
- 如果你需要在事件處理器中使用物件的 `this`，可以選擇使用傳統函式或顯式綁定 `this`。