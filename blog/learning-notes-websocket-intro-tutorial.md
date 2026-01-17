---
title: WebSocket 入門教學筆記（ESM 模組版） | 學習筆記
date: 2024-07-11 02:23:41
authors: kdchang
tags:
  - Node.js
  - WebSocket
  - NodeJS
---

## 前言

在現代前端與全端開發中，許多應用需求都仰賴即時資料傳輸，例如即時聊天、線上協作、股票報價、IoT 裝置通訊等。而傳統的 HTTP 協定採用「請求－回應」模式，並不適合雙向即時通訊。這時，WebSocket 協定就成為更有效率的替代方案。

**WebSocket** 是 HTML5 標準的一部分，它允許在用戶端與伺服器之間建立一條持久的雙向連線。這使得伺服器能即時推播資料給客戶端，而非只能等待客戶端請求，適合實作低延遲、高互動的應用場景。

本教學將透過現代的 **ESM（ECMAScript Module）語法**，介紹如何在 Node.js 環境中建立 WebSocket 應用，並搭配 HTML 客戶端示範雙向通訊流程。

---

## 重點摘要

- **WebSocket 是什麼？**
  一種基於 TCP 的雙向通訊協定，可在瀏覽器與伺服器之間建立長連線。

- **優點**

  - 持久連線，不需每次重複建立與關閉連線
  - 支援伺服器主動推播資料給客戶端
  - 節省頻寬與延遲
  - 適用於高即時性場景

- **WebSocket vs HTTP**

  | 特性     | HTTP                    | WebSocket               |
  | -------- | ----------------------- | ----------------------- |
  | 通訊模式 | 客戶端請求 → 伺服器回應 | 雙向（Client ↔ Server） |
  | 連線型態 | 短連線                  | 長連線（持續開啟）      |
  | 傳輸效率 | 較低（含 header）       | 高效（精簡封包）        |

- **常見應用情境**

  - 即時聊天系統
  - 線上遊戲同步
  - IoT 裝置狀態回報
  - 即時儀表板或股市報價

- **基本 API（前端）**

  - `new WebSocket(url)`：建立連線
  - `socket.onopen`：連線成功
  - `socket.send()`：傳送資料
  - `socket.onmessage`：接收訊息
  - `socket.onclose`：連線關閉
  - `socket.onerror`：錯誤處理

---

## 實作範例（Node.js + ESM + 原生 HTML）

### 一、專案初始化

建立一個新的資料夾並初始化：

```bash
mkdir websocket-esm-demo
cd websocket-esm-demo
npm init -y
npm install ws
```

修改 `package.json` 以啟用 ESM 模組支援：

```json
{
  "name": "websocket-esm-demo",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "ws": "^8.0.0"
  }
}
```

---

### 二、伺服器端（使用 ESM 模組語法）

建立 `server.js`：

```js
// server.js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('用戶已連線');

  ws.on('message', (message) => {
    console.log(`收到用戶訊息：${message}`);
    ws.send(`伺服器收到：${message}`);
  });

  ws.on('close', () => {
    console.log('連線已關閉');
  });

  ws.on('error', (err) => {
    console.error('WebSocket 錯誤：', err);
  });
});

console.log('WebSocket 伺服器啟動於 ws://localhost:8080');
```

---

### 三、客戶端 HTML（WebSocket 客戶端）

建立 `index.html`：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>WebSocket ESM 範例</title>
  </head>
  <body>
    <h1>WebSocket 即時通訊示範</h1>
    <input type="text" id="input" placeholder="輸入訊息" />
    <button onclick="sendMessage()">送出</button>
    <ul id="log"></ul>

    <script>
      const socket = new WebSocket('ws://localhost:8080');

      socket.addEventListener('open', () => {
        logMessage('已連線至伺服器');
      });

      socket.addEventListener('message', (event) => {
        logMessage(`來自伺服器：${event.data}`);
      });

      socket.addEventListener('close', () => {
        logMessage('連線已關閉');
      });

      socket.addEventListener('error', () => {
        logMessage('連線發生錯誤');
      });

      function sendMessage() {
        const input = document.getElementById('input');
        socket.send(input.value);
        logMessage(`你說：${input.value}`);
        input.value = '';
      }

      function logMessage(msg) {
        const li = document.createElement('li');
        li.textContent = msg;
        document.getElementById('log').appendChild(li);
      }
    </script>
  </body>
</html>
```

---

### 四、執行與測試

1. 啟動伺服器：

```bash
node server.js
```

2. 打開 `index.html`（直接用瀏覽器開啟或用 VSCode Live Server 插件）
3. 在輸入框輸入訊息，點擊「送出」，觀察瀏覽器與後端終端機回應。

---

## 補充與進階建議

- **安全性：** 若部署在生產環境，應使用 `wss://`（WebSocket over TLS）取代 `ws://`。
- **重連策略：** 真實場景下需考慮自動重連機制（如斷線重試）。
- **認證機制：** WebSocket 不支援標準 HTTP 標頭傳遞 JWT，通常可透過 URL query 傳 token，或搭配 Session Cookie。
- **整合框架：** 可結合 Express、Koa、Fastify 使用同一個 HTTP 伺服器提供 HTTP 與 WS。

---

## 總結

WebSocket 是實現現代即時網頁應用的重要基礎建設，能提供更快、更輕量的資料通訊方式。透過本文，你應該已能建立一個使用 ESM 寫法的簡單 WebSocket 應用，並了解其基本運作流程。未來你可以進一步探索如 Socket.IO、SignalR 或 WebRTC 等進階解決方案，以支援更多功能與兼容性需求。
