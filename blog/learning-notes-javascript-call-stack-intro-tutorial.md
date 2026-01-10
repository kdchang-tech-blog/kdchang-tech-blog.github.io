---
title: JavaScript Call Stack 入門教學筆記 | 學習筆記
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
    - Call Stack
    - frontend engineer

---

在 `JavaScript` 開發中，理解 **Call Stack（呼叫堆疊）** 是掌握執行流程與錯誤除錯的關鍵概念之一。它決定了程式碼執行的順序，也與同步與非同步行為密切相關。本文將深入介紹 Call Stack 的基本原理，並透過實際範例幫助你理解它的運作方式。

---

## **1. 什麼是 Call Stack？**

Call Stack 是 JavaScript 引擎用來**管理函式呼叫的結構**，它遵循 **LIFO（Last In, First Out，後進先出）** 原則。當一個函式被呼叫時，它會被推入（push）堆疊頂部，當函式執行完畢後，會從堆疊中彈出（pop）。

JavaScript 是**單執行緒（single-threaded）**的語言，這代表它一次只能執行一件事。Call Stack 便是 JavaScript 用來管理同步程式碼執行順序的機制。

---

## **2. Call Stack 運作原理**
讓我們用一個簡單的範例來說明 Call Stack 的運作方式：

```javascript
function first() {
    console.log("First function start");
    second();
    console.log("First function end");
}

function second() {
    console.log("Second function start");
    third();
    console.log("Second function end");
}

function third() {
    console.log("Third function");
}

first();
```

### **執行步驟**
1. `first()` 被呼叫，推入 Call Stack。
2. `first()` 內部呼叫 `second()`，`second()` 推入 Call Stack。
3. `second()` 內部呼叫 `third()`，`third()` 推入 Call Stack。
4. `third()` 執行 `console.log("Third function")`，然後執行完畢並從 Call Stack 移除。
5. `second()` 繼續執行 `console.log("Second function end")`，執行完畢並從 Call Stack 移除。
6. `first()` 繼續執行 `console.log("First function end")`，執行完畢並從 Call Stack 移除。
7. Call Stack 清空，程式執行結束。

### **執行輸出**
```
First function start
Second function start
Third function
Second function end
First function end
```

---

## **3. Call Stack 與錯誤訊息**
如果函式之間發生無窮遞迴，Call Stack 會不斷推入函式，最終導致 `Maximum call stack size exceeded` 錯誤。

### **範例：遞迴導致 Stack Overflow**
```javascript
function recursiveFunction() {
    recursiveFunction();
}

recursiveFunction();
```

### **錯誤訊息**
```
Uncaught RangeError: Maximum call stack size exceeded
```
這是因為 `recursiveFunction()` 不斷呼叫自己，導致 Call Stack 無法清空，最終超過瀏覽器設定的堆疊大小。

---

## **4. Call Stack 與非同步**
JavaScript 本質上是單執行緒的語言，但它透過 **Event Loop（事件迴圈）** 來處理非同步程式碼，例如 `setTimeout`、`fetch` 等。

### **範例：setTimeout 與 Call Stack**
```javascript
console.log("Start");

setTimeout(() => {
    console.log("Inside setTimeout");
}, 0);

console.log("End");
```

### **執行輸出**
```
Start
End
Inside setTimeout
```

### **執行流程解析**
1. `console.log("Start")` 直接執行，輸出 `Start`。
2. `setTimeout` 被呼叫，但它是非同步函式，會被放入 **Web API（瀏覽器環境）**，不會影響 Call Stack。
3. `console.log("End")` 直接執行，輸出 `End`。
4. 當 Call Stack 清空後，事件迴圈（Event Loop）會將 `setTimeout` 內的回呼函式放入 Call Stack，執行 `console.log("Inside setTimeout")`。

這說明了 Call Stack 只負責同步程式碼，非同步程式碼會透過 Web API 與 Event Loop 處理。

---

## **5. 使用開發者工具檢查 Call Stack**
大多數現代瀏覽器（如 Chrome、Firefox）都內建開發者工具，可用來觀察 Call Stack。

### **如何使用 Chrome DevTools**
1. 開啟 Chrome 瀏覽器，按 `F12` 或 `Ctrl + Shift + I`（Mac 使用 `Cmd + Option + I`）。
2. 進入 **Sources** 面板。
3. 設置 **斷點（breakpoint）** 在 JavaScript 代碼內的某行。
4. 重新載入頁面，當程式執行到該行時會暫停。
5. 在右側 **Call Stack 面板** 中查看目前堆疊狀態。

這個工具能幫助開發者更直觀地理解 Call Stack 的運作方式。

---

## **6. 總結**
Call Stack 是 JavaScript 引擎管理函式執行順序的核心機制，掌握它的運作原理對於理解 JavaScript 的同步與非同步行為至關重要。總結要點如下：

1. **Call Stack 採用 LIFO（後進先出）原則**，函式執行時會推入堆疊，結束後會移除。
2. **過多遞迴可能導致 Stack Overflow**，應確保遞迴函式有適當的終止條件。
3. **JavaScript 是單執行緒的語言**，但透過 Web API 和 Event Loop 可處理非同步操作。
4. **開發者工具能幫助分析 Call Stack**，對於除錯非常有幫助。

透過理解 Call Stack 的運作，開發者可以更有效地編寫、優化與除錯 JavaScript 程式碼。