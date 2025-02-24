---
title: WebSocket 入門教學筆記 | 學習筆記
date: 2024-07-11 02:23:41
author: kdchang
tags: 
    - Node.js
    - WebSocket
    - NodeJS

---

# 1. WebSocket 簡介

`WebSocket` 是一種全雙工通訊協議，允許伺服器與客戶端建立持久連線，並在兩者之間即時傳輸數據。相較於傳統的 HTTP 請求-回應模式，WebSocket 提供了更低延遲的通訊方式。

### 1.1 為何選擇 WebSocket？

- **即時雙向通訊**：適用於聊天應用、即時通知、線上遊戲等。
- **減少 HTTP 開銷**：不需要頻繁發送 HTTP 請求。
- **降低延遲**：資料可以即時傳遞，避免輪詢 (polling) 的延遲問題。

# 2. 建立 WebSocket 伺服器

### 2.1 安裝 WebSocket 套件

使用 Node.js 建立 WebSocket 伺服器，首先安裝 `ws` 套件：
```sh
npm install ws
```

### 2.2 建立基本 WebSocket 伺服器

```js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
```

# 3. 建立 WebSocket 客戶端

可以使用 JavaScript 在前端建立 WebSocket 連線：

```js
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to server');
  socket.send('Hello, Server!');
};

socket.onmessage = (event) => {
  console.log(`Received from server: ${event.data}`);
};

socket.onclose = () => {
  console.log('Disconnected from server');
};
```

# 4. 處理多個客戶端

### 4.1 廣播訊息給所有連線中的客戶端

```js
server.on('connection', (ws) => {
  ws.on('message', (message) => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
```

# 5. WebSocket 與 Express 整合

可以將 WebSocket 整合到 Express 伺服器中：

```js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket Server is running');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

# 6. WebSocket 安全性考量

- **使用 WSS (WebSocket Secure)**：確保連線透過 `wss://` 加密傳輸。
- **驗證客戶端**：可以使用 JWT 或 API Key 驗證使用者身份。
- **防止惡意攻擊**：設定最大連線數、限制訊息大小，防止 DDoS 攻擊。

# 7. 部署 WebSocket 應用

### 7.1 使用 PM2 管理 WebSocket 伺服器

安裝 PM2：
```sh
npm install -g pm2
```
啟動 WebSocket 伺服器：
```sh
pm2 start server.js --name websocket-server
```

### 7.2 使用 Nginx 反向代理 WebSocket

設定 Nginx 配置檔：
```nginx
server {
    listen 80;
    server_name example.com;

    location /ws/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```

# 8. 結論

這篇筆記介紹了 WebSocket 的基礎概念與實作技巧，包括如何建立 WebSocket 伺服器、處理多個客戶端、與 Express 整合、以及部署與安全性考量。建議進一步學習 WebSocket 與 Redis Pub/Sub、負載平衡技術，提升系統可擴展性與穩定性。

