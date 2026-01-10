---
title: MongoDB 入門教學筆記 | 學習筆記
date: 2024-12-16 11:33:41
author: kdchang
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

## 前言

在現代應用程式開發中，資料儲存已不再侷限於傳統的關聯式資料庫（如 MySQL、PostgreSQL）。特別是在處理非結構化資料、需要高延展性或頻繁 schema 變動的應用場景中，**NoSQL 資料庫**逐漸成為主流選擇。

其中，**MongoDB** 是最受歡迎的 NoSQL 資料庫之一。它採用`文件型（Document-Oriented）`結構，使用 JSON 類型格式（實際為 BSON）儲存資料，讓開發者能更靈活地設計資料模型與操作資料。MongoDB 強調可擴展性、彈性資料結構與高效查詢能力，廣泛應用於 Web 開發、物聯網、大數據處理等領域。

---

## 重點摘要

- **MongoDB 是什麼？**

  - 開源的 NoSQL 文件資料庫，使用 BSON 格式儲存資料。
  - 資料以「資料庫 → 集合（Collection）→ 文件（Document）」的層級組織。
  - 每個文件（Document）類似於 JSON 結構，支援巢狀資料與陣列。

- **主要特性**

  - 文件型資料儲存（更彈性且接近開發者熟悉的物件結構）
  - 無需預先定義 Schema，可動態變更欄位
  - 垂直與水平延展能力佳
  - 提供複寫與分片支援（Replica Set、Sharding）
  - 強大的查詢語言，支援索引、聚合、全文搜尋

- **應用場景**

  - RESTful API 後端儲存（如 Node.js + Express 專案）
  - 快速原型設計與資料模型測試
  - 高並發讀寫需求（例如留言板、商品評論系統）
  - 資料格式變動頻繁的場景（如 IoT 裝置紀錄）

---

## 安裝與啟動

### 1. 安裝 MongoDB（本機）

**Mac 使用者（使用 Homebrew）：**

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb/brew/mongodb-community
```

**Windows / Linux：**
可前往 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) 下載對應版本。

### 2. 啟動 MongoDB

```bash
mongod
```

啟動成功後，預設會在 `mongodb://localhost:27017` 提供本地服務。

### 3. 開啟 Mongo Shell（或使用 MongoDB Compass GUI）

```bash
mongosh
```

進入後會看到互動式 shell 環境，開始操作你的資料庫。

---

## MongoDB 基本操作（Shell 範例）

### 1. 建立 / 切換資料庫

```js
use blog
```

### 2. 建立集合（Collection）與新增文件（Document）

```js
db.posts.insertOne({
  title: 'MongoDB 入門教學',
  author: 'KD',
  tags: ['database', 'nosql', 'mongodb'],
  published: true,
  created_at: new Date(),
});
```

> 插入文件時自動建立集合與資料庫。

### 3. 查詢文件

```js
db.posts.find();
db.posts.find({ author: 'KD' });
db.posts.findOne({ published: true });
```

支援條件、邏輯查詢、排序、分頁等功能：

```js
db.posts.find({ published: true }).sort({ created_at: -1 }).limit(5);
```

### 4. 更新文件

```js
db.posts.updateOne({ title: 'MongoDB 入門教學' }, { $set: { published: false } });
```

支援 `$set`, `$inc`, `$push`, `$unset` 等更新操作符。

### 5. 刪除文件

```js
db.posts.deleteOne({ title: 'MongoDB 入門教學' });
```

---

## 使用 Mongoose 操作（Node.js 範例）

在 Node.js 專案中，常使用 `mongoose` 封裝操作 MongoDB。

### 1. 安裝套件

```bash
npm install mongoose
```

### 2. 建立連線與定義模型

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog');

const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  tags: [String],
  published: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
```

### 3. 實際使用範例

**新增資料：**

```js
const newPost = new Post({
  title: '用 Node.js 操作 MongoDB',
  author: 'KD',
  tags: ['nodejs', 'mongodb'],
  published: true,
});

await newPost.save();
```

**查詢資料：**

```js
const posts = await Post.find({ published: true }).limit(5);
```

**更新資料：**

```js
await Post.updateOne({ title: '用 Node.js 操作 MongoDB' }, { published: false });
```

**刪除資料：**

```js
await Post.deleteOne({ title: '用 Node.js 操作 MongoDB' });
```

---

## 聚合（Aggregation）入門

MongoDB 提供強大的 Aggregation Pipeline 功能，可進行統計、分組、轉換。

**範例：統計作者貼文數量**

```js
db.posts.aggregate([{ $group: { _id: '$author', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
```

---

## 總結

MongoDB 以其彈性、易用與高延展性，成為許多現代應用的首選資料庫，特別是在快速開發、微服務架構或大數據處理場景中表現優異。透過簡單的 JSON 結構與強大的查詢能力，即使不熟 SQL 的開發者也能快速上手，打造穩定且具擴展性的資料儲存系統。

初學者可先從基本的增刪查改練習起，逐步熟悉資料結構與聚合操作，再延伸到使用 Mongoose 開發 REST API，或搭配 GraphQL、Next.js 等前後端整合工具，深入打造現代 Web 應用。
