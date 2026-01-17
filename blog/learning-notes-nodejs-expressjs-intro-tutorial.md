---
title: Node.js Express.js 入門教學筆記 | 學習筆記
date: 2024-12-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - 模組
    - nodejs
    - mongoose
    - MongoDB
    - Express.js
    - frontend engineer

---

## 1. 簡介

Express.js 是一個基於 Node.js 的 Web 應用框架，提供簡潔且靈活的 API，適用於建立伺服器端應用程式。它可以用來開發 RESTful API、Web 應用或後端服務。

### 為什麼選擇 Express.js？
- 輕量且易於學習
- 擴展性高
- 內建強大的中介軟體（Middleware）系統
- 支援各種範本引擎（例如：EJS, Pug）

## 2. 安裝與專案初始化

### 安裝 Node.js
在開始使用 Express.js 之前，請先安裝 [Node.js](https://nodejs.org/)。

### 初始化專案
建立一個新的專案資料夾，然後執行以下指令來初始化 Node.js 專案：

```sh
mkdir express-app
cd express-app
npm init -y
```

### 安裝 Express.js

```sh
npm install express
```

## 3. 建立第一個 Express 伺服器

建立 `server.js` 檔案，並加入以下程式碼：

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

### 啟動伺服器

```sh
node server.js
```
然後在瀏覽器打開 `http://localhost:3000/`，應該可以看到 **Hello, Express!**。

## 4. 中介軟體（Middleware）

Express 提供 **Middleware**，可用來處理請求與回應，例如：解析請求體、驗證請求等。

### 使用 `express.json()` 解析 JSON

```javascript
app.use(express.json());
```

### 建立自訂中介軟體

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

## 5. 路由（Routing）

Express 允許定義不同的 HTTP 方法對應不同的路由。

### GET 路由

```javascript
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});
```

### POST 路由

```javascript
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});
```

### 參數化路由

```javascript
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: `User ${userId}` });
});
```

## 6. 靜態檔案服務

Express 可用來提供靜態檔案，例如 HTML、CSS、JavaScript。

```javascript
app.use(express.static('public'));
```

然後在 `public/index.html` 中放入 HTML，即可直接透過 `http://localhost:3000/index.html` 存取。

## 7. 錯誤處理

Express 提供錯誤處理中介軟體，可用來處理應用中的錯誤。

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
```

## 8. 整合 MongoDB

可以使用 `mongoose` 來與 MongoDB 互動。

### 安裝 `mongoose`

```sh
npm install mongoose
```

### 連接 MongoDB

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
```

## 9. 部署 Express 應用

可以使用 **PM2** 來管理 Express 伺服器。

### 安裝 PM2

```sh
npm install -g pm2
```

### 啟動應用

```sh
pm2 start server.js --name express-app
```

## 10. 總結

透過這篇筆記，你已經學會：
1. 安裝與初始化 Express.js
2. 建立基本 Web 伺服器
3. 使用中介軟體與路由
4. 提供靜態檔案
5. 錯誤處理
6. 整合 MongoDB
7. 部署 Express 應用

這些概念是 Express.js 開發的基礎，熟練後可以進一步學習 JWT 認證、WebSocket、GraphQL 等進階技術！

