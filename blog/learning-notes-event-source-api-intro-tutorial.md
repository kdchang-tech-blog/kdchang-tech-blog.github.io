---
title: EventSource API in JavaScript 入門教學筆記 | 學習筆記
date: 2025-02-03 02:23:41
authors: kdchang
tags:
  - SSE
  - EventSource
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
  - CSS
---

## 前言

在現代的網頁應用程式中，實時性資料更新是一個常見需求，例如即時通知、股價更新、聊天室訊息、伺服器狀態監控等。傳統上，開發者可能會透過輪詢（Polling）或 WebSocket 來實現。然而，若只是單向由伺服器推送訊息到瀏覽器端，其實有更簡單且高效的選擇：**EventSource API**。

EventSource 基於 **Server-Sent Events（SSE）**，由伺服器主動推送文字資料到客戶端，並且使用 **HTTP 協議的持久連線**，開發上比 WebSocket 更簡單，適合事件流的場景。本文將帶我們快速入門 EventSource API，理解它的特性與應用方式。

---

## 重點摘要

1. **EventSource 與 SSE 的核心概念**

   - EventSource 是瀏覽器提供的 JavaScript API，用於接收伺服器推送的 SSE（Server-Sent Events）。
   - 採用 **HTTP 長連線**，不需要 WebSocket，也不需要額外協議。
   - 支援自動重連（瀏覽器會自動在連線中斷時重新連接伺服器）。

2. **EventSource 的適用場景**

   - 即時通知（系統提醒、訊息推送）
   - 資料更新（股價、天氣、賽事比分）
   - 記錄串流（伺服器日誌、事件追蹤）
   - 聊天室訊息（單向推送）

3. **EventSource 的特性**

   - 單向通訊：伺服器 → 客戶端
   - 自動重連機制（可透過伺服器端 `retry:` 指令調整重試時間）
   - 基於純文字的事件格式（MIME type 為 `text/event-stream`）
   - 可透過自訂事件名稱分發不同事件

4. **與其他技術比較**

   - **Polling**：需要客戶端頻繁請求，耗費頻寬與伺服器資源。
   - **WebSocket**：雙向溝通更靈活，但需要額外處理協議與狀態管理。
   - **EventSource（SSE）**：單向推送即可，實作簡單、輕量化，適合多數即時通知場景。

---

## EventSource 使用範例

### 1. 瀏覽器端（JavaScript）

```javascript
// 建立 EventSource 連線
const eventSource = new EventSource('/events');

// 接收預設訊息（message 事件）
eventSource.onmessage = function (event) {
  console.log('收到訊息:', event.data);
};

// 接收自訂事件
eventSource.addEventListener('news', function (event) {
  console.log('收到新聞事件:', event.data);
});

// 監控錯誤與連線狀態
eventSource.onerror = function (error) {
  console.error('EventSource 發生錯誤:', error);
};
```

---

### 2. 伺服器端（Node.js Express 範例）

```javascript
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // 設定 SSE 必要的 Header
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 每隔 3 秒推送一個訊息
  const intervalId = setInterval(() => {
    const data = new Date().toLocaleTimeString();
    res.write(`data: 現在時間 ${data}\n\n`);
  }, 3000);

  // 當客戶端中斷連線時清理資源
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log('SSE 伺服器運行於 http://localhost:3000/events');
});
```

---

### 3. SSE 資料格式範例

伺服器回傳的資料需符合 `text/event-stream` 格式，每筆訊息以兩個換行結尾。

```text
data: 這是一個預設訊息

event: news
data: 這是一個新聞更新

event: alert
data: 系統警告訊息
retry: 5000
```

說明：

- `data:`：主要訊息內容，可以有多行。
- `event:`：指定自訂事件名稱，客戶端可用 `addEventListener` 監聽。
- `retry:`：定義自動重連的延遲時間（毫秒）。

---

## 注意事項

1. **瀏覽器支援性**：大部分現代瀏覽器支援 EventSource（IE 除外）。
2. **跨域問題**：若伺服器與前端不同網域，需設定 CORS。
3. **資料格式**：僅支援 UTF-8 文字資料，若要傳送二進位資料需轉成 Base64 或 JSON。
4. **連線數限制**：部分瀏覽器對同一網域的 SSE 連線數有限制（通常 6 條）。
5. **斷線重連**：內建自動重連機制，但若伺服器返回錯誤狀態碼，可能需手動處理。

---

## 總結

EventSource API 提供了一個簡單又高效的方式，讓前端應用程式能夠輕鬆接收伺服器的即時推送。相較於 WebSocket，EventSource 不需要額外的協議處理，也避免了頻繁輪詢帶來的效能浪費。在僅需單向資料更新的場景下，它是一個理想解決方案。

當我們下次需要在前端實現即時通知、動態更新數據或流式資料顯示時，不妨先考慮 EventSource，它或許就是最輕量的選擇。
