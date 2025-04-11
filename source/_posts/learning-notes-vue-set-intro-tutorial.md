---
title: Vue 正確新增或修改物件屬性入門教學筆記 | 學習筆記
date: 2024-12-15 02:23:41
author: kdchang
tags: 
    - vue
    - this.$set
    - vue.js

---

## 前言
在 Vue 2（Options API）中，`this.$set` 是用來**在響應式系統中正確新增或修改物件屬性**的方法。這對於**動態新增屬性或修改陣列的指定索引值**特別有用。

---

## 語法

```js
this.$set(target, propertyName/index, value)
```

- `target`：要修改的對象或陣列
- `propertyName`（物件）或 `index`（陣列）
- `value`：要設的值

---

## 為什麼需要 `this.$set`？

Vue 2 的 reactivity（響應式系統）使用 `Object.defineProperty`，它**無法偵測到新加的屬性**或是直接對陣列用索引來賦值。

例如，下面的程式碼是不會觸發畫面更新的：

```js
this.someObj.newKey = 'value'      // 不會觸發更新
this.someArray[1] = 'changed'      // 不會觸發更新
```

必須改成：

```js
this.$set(this.someObj, 'newKey', 'value')      // 會觸發更新
this.$set(this.someArray, 1, 'changed')         // 會觸發更新
```

---

## 範例一：對物件新增屬性

```js
data() {
  return {
    user: {
      name: '小明'
    }
  }
},
mounted() {
  this.$set(this.user, 'age', 30);
}
```

這樣才能讓 `user.age` 成為響應式屬性，更新時畫面才會重新渲染。

---

## 範例二：修改陣列中的值

```js
data() {
  return {
    items: ['a', 'b', 'c']
  }
},
methods: {
  updateItem() {
    this.$set(this.items, 1, 'changed');
  }
}
```

---

## Vue 3 呢？

在 Vue 3 裡，因為 reactivity 系統改用 **Proxy**，所以可以直接新增或修改屬性，不需要 `this.$set` 了：

```js
this.someObj.newKey = 'value'   // Vue 3 沒問題
this.someArray[1] = 'changed'   // Vue 3 沒問題
```

---

如果你正在寫 Vue 2 的 Tic Tac Toe 遊戲，當你要動態更新棋盤的某個格子時，這樣做就是對的：

```js
this.$set(this.board[row], col, 'X');
```

這樣才能確保畫面能即時更新。