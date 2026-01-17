---
title: Lodash 介紹與入門教學筆記 | 學習筆記
date: 2024-07-02 02:23:41
authors: kdchang
tags:
  - Lodash
  - ES Module
  - JavaScript
---

## 前言

在 JavaScript 的開發中，資料處理與函式操作經常需要處理陣列、物件、字串的轉換、搜尋與過濾等需求。儘管 ES6+ 提供了不少內建函式（如 `map`、`filter`、`reduce` 等），但仍有許多情境需要進階或更簡潔的處理方式。

這時候，**Lodash** 就是一個非常實用的工具庫。它是一個提供大量實用函式的 JavaScript 函式庫，能幫助開發者更方便地進行資料操作、提升開發效率與可讀性。

---

## 重點摘要

- **Lodash 是什麼：**

  - 一個現代 JavaScript 實用工具庫，專注於資料處理、陣列與物件操作。
  - 模組化設計，可依照需求引入特定函式，減少最終 bundle 大小。

- **使用方式：**

  - 安裝方式：

    ```bash
    npm install lodash
    ```

  - 引入方式（使用 ES6 模組）：

    ```js
    import _ from 'lodash';
    ```

- **常用函式分類：**

  - 陣列操作：`chunk`、`compact`、`difference`、`uniq`、`flatten` 等
  - 物件操作：`get`、`set`、`merge`、`pick`、`omit`
  - 函式處理：`debounce`、`throttle`、`once`
  - 數學與邏輯判斷：`isEmpty`、`isEqual`、`clamp`
  - 字串操作：`camelCase`、`kebabCase`、`startCase`

- **優點：**

  - API 設計一致，學習曲線平緩
  - 可與原生 JS 無縫搭配
  - 處理巢狀資料與深層結構特別方便

---

## 實際範例

以下透過幾個實際範例來展示 Lodash 的常見使用情境與語法。

### 1. 陣列切分：`_.chunk`

將一個陣列依照固定大小切成多個子陣列。

```js
import _ from 'lodash';

const arr = [1, 2, 3, 4, 5, 6];
const result = _.chunk(arr, 2);
// 輸出：[[1, 2], [3, 4], [5, 6]]
```

---

### 2. 去除 falsy 值：`_.compact`

移除陣列中的 `false`、`null`、`0`、`""`、`undefined` 和 `NaN`。

```js
const arr = [0, 1, false, 2, '', 3];
const result = _.compact(arr);
// 輸出：[1, 2, 3]
```

---

### 3. 陣列差集：`_.difference`

找出第一個陣列中，不存在於其他陣列的元素。

```js
const result = _.difference([1, 2, 3, 4], [2, 3]);
// 輸出：[1, 4]
```

---

### 4. 去除重複值：`_.uniq`

回傳一個不含重複值的新陣列。

```js
const result = _.uniq([2, 1, 2]);
// 輸出：[2, 1]
```

---

### 5. 平坦化陣列：`_.flatten`

將多維陣列的一層扁平化。

```js
const result = _.flatten([1, [2, [3, [4]]]]);
// 輸出：[1, 2, [3, [4]]]
```

若要完全扁平化，可使用 `flattenDeep`。

```js
const result = _.flattenDeep([1, [2, [3, [4]]]]);
// 輸出：[1, 2, 3, 4]
```

---

### 6. 取得物件巢狀值：`_.get`

避免使用多層 `obj && obj.prop` 判斷。

```js
const obj = { a: { b: { c: 42 } } };
const result = _.get(obj, 'a.b.c');
// 輸出：42
```

可設定預設值：

```js
const result = _.get(obj, 'a.b.d', 'not found');
// 輸出：'not found'
```

---

### 7. 防抖動（Debounce）：`_.debounce`

常用於輸入框搜尋防抖，例如搜尋建議：

```js
const search = _.debounce((query) => {
  console.log('搜尋中：', query);
}, 300);

search('a');
search('ab');
search('abc'); // 只會觸發這次
```

---

### 8. 函式執行一次：`_.once`

保證某個函式只執行一次。

```js
const init = _.once(() => {
  console.log('只會執行一次的初始化');
});

init();
init();
// 輸出：只會執行一次的初始化
```

---

## 總結

Lodash 是一個穩定、完整、社群活躍的 JavaScript 工具函式庫，適合用於各種日常資料處理場景。尤其當面對資料轉換、巢狀結構處理、函式優化（如 debounce/throttle）等問題時，Lodash 提供了直觀且一致的解法。

若在專案中引入 Lodash 時，建議採用模組化方式僅引入需要的函式，或使用 [lodash-es（es module 版本）](https://www.npmjs.com/package/lodash-es) 搭配 Tree Shaking，以減少最終輸出大小。
