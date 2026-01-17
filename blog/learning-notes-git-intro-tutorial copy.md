---
title: Server-Sent Events（SSE）入門教學筆記 | 學習筆記
date: 2025-01-30 11:33:41
authors: kdchang
tags:
  - SSE
  - stream
  - Server-Sent Events
---

## 前言

在現代 Web 應用中，即時資料傳輸已經成為重要需求，例如股票行情更新、聊天室訊息、即時通知等。傳統的 HTTP 請求模式是 **客戶端發起請求，伺服器回應一次**，這種「單向請求-回應」模式無法有效支持持續更新。

WebSocket 是一個廣為人知的解決方案，提供全雙工通道，但對於單向更新（伺服器推送到客戶端）而言，WebSocket 可能略顯複雜。這時，**Server-Sent Events（SSE）** 就是一個簡單、輕量級的替代方案。SSE 提供 **伺服器到客戶端的單向持續資料推送**，使用原生 HTML5 技術即可實現，不需額外協議或第三方套件。

---

## SSE 的核心概念

Server-Sent Events 是基於 **HTTP 協議**，透過 **text/event-stream** 的 MIME 類型，保持一個持久連接，讓伺服器可以不斷地向客戶端傳送資料。SSE 的主要特性包括：

1. **單向通訊**

   - 伺服器向客戶端推送資料，客戶端只能接收。若需要雙向通訊，仍需搭配 WebSocket 或 AJAX 請求。

2. **自動重連**

   - 客戶端若因網路斷線或其他原因中斷，瀏覽器會自動重連，可透過 `retry` 指定重連間隔。

3. **文字格式傳輸**

   - SSE 傳輸的資料以純文字格式為主，每個事件用特定的格式標記（如 `event:`、`data:`、`id:` 等）。

4. **支援事件命名**

   - 可以自定義事件名稱，在前端監聽不同事件，提高可讀性與維護性。

5. **輕量且易實作**

   - 客戶端只需使用 JavaScript 的 `EventSource` API，即可快速建立 SSE 連接。

---

## 重點摘要

- **單向連接**：伺服器 → 客戶端
- **持久連接**：不需每次重新建立 HTTP 請求
- **事件格式**：`event`, `data`, `id`, `retry`
- **自動重連**：瀏覽器自動處理連線中斷
- **瀏覽器支援**：大部分現代瀏覽器原生支援（IE 除外）
- **適用場景**：

  - 即時通知系統
  - 資料更新流（股票、天氣、社群消息）
  - 運行狀態監控儀表板

---

## SSE 的資料格式

SSE 的資料格式遵循 **行為約定**：

```
id: 1
event: message
retry: 3000
data: Hello, this is a message from server
```

說明：

- **id**（選填）：事件 ID，客戶端斷線後重連，會告訴伺服器最後接收的 ID
- **event**（選填）：事件名稱，自訂事件類型
- **retry**（選填）：重連間隔，單位為毫秒
- **data**（必填）：事件資料內容，可有多行

**注意**：每個事件以空行結束，代表事件結束。

---

## SSE 實作範例

以下示範如何使用 **Node.js + Express** 建立 SSE 服務，並在前端接收事件：

### 1. 後端 (Node.js + Express)

```javascript
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // 設定 SSE 標頭
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 0;

  // 每秒推送一次訊息
  const interval = setInterval(() => {
    counter++;
    res.write(`id: ${counter}\n`);
    res.write(`event: message\n`);
    res.write(`data: {"count": ${counter}, "time": "${new Date().toISOString()}"}\n\n`);
  }, 1000);

  // 當客戶端斷線時清理 interval
  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log('SSE server running on http://localhost:3000');
});
```

---

### 2. 前端 (HTML + JavaScript)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>SSE Example</title>
  </head>
  <body>
    <h1>Server-Sent Events Demo</h1>
    <div id="messages"></div>

    <script>
      const eventSource = new EventSource('http://localhost:3000/events');

      eventSource.onmessage = function (event) {
        const msgDiv = document.getElementById('messages');
        const data = JSON.parse(event.data);
        msgDiv.innerHTML += `<p>Count: ${data.count}, Time: ${data.time}</p>`;
      };

      eventSource.addEventListener('message', function (event) {
        // 也可透過自訂事件名稱接收
        console.log('Received event:', event.data);
      });

      eventSource.onerror = function (err) {
        console.error('EventSource failed:', err);
      };
    </script>
  </body>
</html>
```

**解釋**：

- `EventSource` 會自動建立持久連接
- 每次後端 `res.write` 新事件時，前端 `onmessage` 會被觸發
- 客戶端不需發起額外請求，伺服器可以持續推送

---

## SSE 與 WebSocket 的比較

| 特性     | SSE                     | WebSocket                  |
| -------- | ----------------------- | -------------------------- |
| 通訊方向 | 伺服器 → 客戶端（單向） | 雙向（伺服器 ↔ 客戶端）    |
| 協議     | HTTP                    | TCP / WebSocket protocol   |
| 連接維護 | 自動重連                | 需手動處理斷線             |
| 輕量實作 | 非常簡單                | 相對複雜                   |
| 適用場景 | 事件推送、資料流        | 即時遊戲、聊天室、雙向互動 |

---

## 實務應用建議

1. **適用場景**：單向更新、事件通知、儀表板數據刷新
2. **不適用場景**：需要大量雙向互動、低延遲遊戲或高頻交易
3. **瀏覽器支援**：大部分現代瀏覽器支援，但 IE 需 polyfill
4. **部署注意**：

   - 長連接可能對 Nginx / Proxy 設定有影響，需允許長時間 HTTP keep-alive
   - 伺服器端要注意資源釋放，避免記憶體泄漏

---

## 結論

Server-Sent Events 是一種 **簡單、輕量、易於實作的即時資料推送方案**，特別適合需要 **單向事件更新** 的 Web 應用。對於需要雙向通訊的場景，WebSocket 或其他方案可能更合適。掌握 SSE 可以讓我們在開發即時應用、監控儀表板或通知系統時快速上手，並結合現代瀏覽器的原生支援，提供穩定的即時體驗。
