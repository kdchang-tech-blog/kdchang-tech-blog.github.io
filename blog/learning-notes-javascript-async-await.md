---
title: async/await 入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - 非同步
    - 異步
    - async/await
    - fetch
    - frontend engineer

---

`async` 和 `await` 是 JavaScript 中處理非同步操作的語法糖，它們使得非同步代碼更加易讀和易寫，避免了傳統回調函數（callback）或 `Promise` 的 `.then()` 鏈式調用的冗長性。

### 1. `async` 關鍵字

`async` 是一個關鍵字，用來標記一個函數為「非同步函數」。非同步函數會隱式地返回一個 `Promise`，並且在函數內部，你可以使用 `await` 來等待非同步操作的結果。

#### 語法
```js
async function example() {
  // 可以在這裡使用 await
}
```

當你呼叫這個函數時，它會立即返回一個 `Promise`。如果函數內的代碼執行成功，這個 `Promise` 會被解析；如果有錯誤，`Promise` 會被拒絕。

### 2. `await` 關鍵字

`await` 必須在 `async` 函數內部使用，它會讓 JavaScript 等待某個 `Promise` 完成並返回結果。`await` 會使得後續代碼暫停，直到 `Promise` 被解決或拒絕（解決是指成功完成操作，拒絕則是發生錯誤）。

#### 語法
```js
const result = await promise; // 等待 Promise 完成並取得結果
```

如果 `Promise` 解決（成功），`await` 會返回結果。如果 `Promise` 被拒絕（失敗），會拋出錯誤，這通常需要使用 `try...catch` 來處理。

### 範例

```js
// 模擬一個非同步操作
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 2000);
  });
}

// 使用 async/await
async function getData() {
  try {
    console.log("Fetching data...");
    const data = await fetchData();  // 等待 fetchData 完成
    console.log(data);  // 顯示結果
  } catch (error) {
    console.error("Error:", error);  // 處理錯誤
  }
}

getData();  // 呼叫 async 函數
```

### 3. `async/await` 的特點：
- **簡化非同步代碼**：`async/await` 讓非同步代碼的寫法更像是同步代碼，避免了回調函數的「Callback hell 回調地獄」。
- **錯誤處理**：你可以使用 `try...catch` 塊來捕獲非同步操作中的錯誤，這使得錯誤處理比傳統的 `.catch()` 更加簡單直觀。
- **非阻塞執行**：儘管代碼看起來是同步執行的，但非同步操作並不會阻塞主執行線程，其他代碼可以繼續執行。

### 總結
- `async` 將函數標記為非同步函數。
- `await` 使代碼等待 `Promise` 的解決結果，並可以在 `async` 函數內使用。
- 使用 `async/await` 可以使非同步代碼更加簡潔且易於理解。