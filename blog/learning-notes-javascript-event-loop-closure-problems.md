---
title: setTimeout + for loop + closure 核心介紹入門教學筆記 | 學習筆記
date: 2023-07-02 02:23:41
authors: kdchang
tags: 
    - setTimeout
    - for loop
    - closure
    - javascript

---

### 一、`var` 和 `let` 的作用域差異

| 宣告方式 | 作用域           | 是否有暫時性死區（TDZ） |
|----------|------------------|--------------------------|
| `var`    | 函式作用域       | 否                       |
| `let`    | 區塊作用域       | 是                       |
| `const`  | 區塊作用域       | 是                       |

- `var` 宣告的變數在整個函式內都可存取
- `let` 則只在所在區塊 `{}` 中有效

---

### 二、閉包（Closure）

閉包是指「函式能記住它被定義時的作用域，即使在外部執行也能存取當時的變數」。

```js
function outer() {
  let count = 0;
  return function inner() {
    console.log(count++);
  };
}

const fn = outer();
fn(); // 0
fn(); // 1
```

這個例子中，`inner` 函式記住了 `outer` 中的 `count` 變數。

---

### 三、事件迴圈與 `setTimeout`

```js
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

console.log("end");
```

輸出順序：

```
start
end
timeout
```

原因是 `setTimeout` 是非同步的，它會被放入「事件佇列」（event queue）中，等主程式執行完後才會被處理。

---

### 四、面試陷阱：`var` 與 `setTimeout` 搭配

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

這段程式的輸出是：

```
3
3
3
```

因為：
- `var` 沒有區塊作用域，所有的 `setTimeout` 都引用同一個 `i`
- 當 `setTimeout` 執行時，迴圈已跑完，`i` 已是 3

---

### 五、正確解法：使用 `let`

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

輸出為：

```
0
1
2
```

因為 `let` 有區塊作用域，每次迴圈都建立新的 `i`，閉包會記住各自的值。

---

### 六、另一個解法：IIFE（立即執行函式）

若必須用 `var`，可以用 IIFE 綁定每次的 `i`：

```js
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 1000);
  })(i);
}
```

這樣也會正確輸出：

```
0
1
2
```

---

### 七、總結

1. `var` 是函式作用域，容易被非同步邏輯影響
2. `let` 是區塊作用域，與閉包搭配可解決常見陷阱
3. `setTimeout` 是非同步，會延遲執行
4. 通常面試會結合這些概念出題，考你對 JavaScript 執行流程、作用域與閉包的理解
