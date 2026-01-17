---
title: Node.js 入門教學筆記 | 學習筆記
date: 2024-12-09 02:23:41
authors: kdchang
tags: 
    - Node.js
    - Node
    - NodeJS

---

# 1. Node.js 簡介

Node.js 是一個基於 Chrome V8 JavaScript 引擎的運行環境，可讓開發者使用 JavaScript 來撰寫後端程式。它適合用於構建高效能、非同步的網路應用。

### 1.1 為何選擇 Node.js？

- **非同步 & 事件驅動**：適合 I/O 密集型應用，如 Web 伺服器。
- **單一語言開發**：可用 JavaScript 同時開發前端與後端。
- **強大的生態系統**：擁有豐富的 NPM（Node Package Manager）套件。
- **高效能**：基於 V8 引擎，運行速度快。

# 2. 安裝與環境設定

### 2.1 安裝 Node.js

從 [Node.js 官方網站](https://nodejs.org/) 下載並安裝 LTS 版本。

### 2.2 檢查安裝是否成功

安裝完成後，在終端機輸入以下指令：
```sh
node -v
npm -v
```
應該會顯示 Node.js 和 npm（Node 套件管理工具）的版本號。

# 3. 基本應用程式

### 3.1 建立第一個 Node.js 應用

新建一個 `app.js` 檔案，並輸入：
```js
console.log('Hello, Node.js!');
```
然後在終端機執行：
```sh
node app.js
```
應該會輸出：
```
Hello, Node.js!
```

### 3.2 建立簡單的 HTTP 伺服器

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```
執行後，開啟瀏覽器並訪問 `http://localhost:3000`，應該會看到 `Hello, World!`。

# 4. Node.js 模組

### 4.1 內建模組

Node.js 提供許多內建模組，例如：
```js
const fs = require('fs'); // 檔案系統
const path = require('path'); // 路徑處理
const os = require('os'); // 作業系統資訊
```

### 4.2 NPM 套件管理

安裝 Express 框架：
```sh
npm install express
```

# 5. Express 入門

### 5.1 建立簡單的 Express 伺服器

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

# 6. 讀取與寫入檔案

### 6.1 讀取檔案

```js
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 6.2 寫入檔案

```js
fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
  if (err) throw err;
  console.log('File has been saved!');
});
```

# 7. 連接 MongoDB 資料庫

### 7.1 安裝 MongoDB 驅動
```sh
npm install mongoose
```

### 7.2 連接 MongoDB
```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
```

# 8. 部署 Node.js 應用

### 8.1 使用 PM2 管理應用

安裝 PM2：
```sh
npm install -g pm2
```
啟動應用：
```sh
pm2 start app.js
```

### 8.2 使用 Docker 部署

建立 `Dockerfile`：
```dockerfile
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
EXPOSE 3000
```

# 9. 結論

透過這篇入門筆記，初學者可以快速掌握 Node.js 的基礎概念與實作技巧，包含 HTTP 伺服器、檔案操作、資料庫連接等。建議進一步學習異步程式設計、RESTful API、WebSocket 以及雲端部署技術，以提升開發能力。

