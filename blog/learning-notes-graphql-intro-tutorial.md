---
title: GraphQL 入門教學筆記（ESM 模組版）| 學習筆記
date: 2024-11-16 11:33:41
author: kdchang
tags:
  - 前端
  - 後端
  - 前端開發
  - 前端工程
  - 軟體工程
  - GraphQL
  - RESTful
---

## 前言

在傳統的 REST API 中，前端往往需要根據不同的需求，呼叫多個端點取得資料，有時還會遇到資料過多（Over-fetching）或不足（Under-fetching）的問題。為了解決這些痛點，Facebook 在 2015 年開源了 **GraphQL**，一種靈活且高效率的查詢語言。

GraphQL 讓前端可以**明確指定想要的資料欄位**，伺服器僅回傳需要的資料，改善資料浪費與重複請求的問題。此語言既可以查詢（Query）、也可以修改資料（Mutation），更支援訂閱（Subscription）即時變化，成為 REST 的強大替代方案。

本文將以 ESM（ECMAScript Module）模組格式，搭配現代 Node.js 環境與 Apollo Server，手把手實作一個簡易 GraphQL API。

---

## 重點摘要

- **GraphQL 是什麼？**
  一種用於 API 的查詢語言（Query Language），由 Facebook 開發。它不是資料庫，而是用來建立伺服器與用戶端之間通訊的一種規格。

- **特色與優點**

  - 客戶端可以精確指定所需資料
  - 單一端點處理所有請求
  - 減少 over-fetching / under-fetching 問題
  - 強型別系統（Schema 定義清楚 API 結構）
  - 自帶文件化功能（如 Apollo Studio / GraphQL Playground）

- **核心概念**

  - `Schema`：定義資料型別與查詢結構
  - `Query`：讀取資料
  - `Mutation`：修改資料（新增、刪除、更新）
  - `Resolver`：實際執行資料存取邏輯的函式
  - `Type`：定義資料欄位與型別，例如 `type Book { title: String }`

- **GraphQL vs REST**

  | 特性         | REST                     | GraphQL                        |
  | ------------ | ------------------------ | ------------------------------ |
  | 資料請求     | 多個端點                 | 單一端點                       |
  | 回傳資料     | 固定欄位，可能過多或不足 | 客戶端可自訂所需欄位           |
  | 文件維護     | 手動撰寫 Swagger/OpenAPI | 自動產生於 Playground / Studio |
  | 資料關聯查詢 | 多次 HTTP 請求           | 一次查詢可取得巢狀關聯資料     |

---

## 實作範例（Node.js + Apollo Server + ESM）

### 一、專案初始化

建立資料夾並初始化：

```bash
mkdir graphql-esm-demo
cd graphql-esm-demo
npm init -y
npm install @apollo/server graphql
```

修改 `package.json` 啟用 ESM 模組：

```json
{
  "type": "module"
}
```

---

### 二、撰寫 GraphQL API（server.js）

建立 `server.js`：

```js
// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 模擬資料
const books = [
  { title: 'GraphQL 教學指南', author: 'Alice' },
  { title: '現代 JavaScript', author: 'Bob' },
];

// 定義 Schema
const typeDefs = `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

// 定義 Resolver
const resolvers = {
  Query: {
    books: () => books,
  },
};

// 建立 Apollo Server 實例
const server = new ApolloServer({ typeDefs, resolvers });

// 啟動伺服器
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
```

---

### 三、啟動伺服器並測試

執行伺服器：

```bash
node server.js
```

啟動後會顯示伺服器位置（通常是 [http://localhost:4000](http://localhost:4000) Apollo Studio，或使用 Postman / Altair / curl 測試。

---

### 四、查詢範例（GraphQL Playground 中輸入）

```graphql
query {
  books {
    title
    author
  }
}
```

我們也可以僅查詢某個欄位，例如：

```graphql
query {
  books {
    title
  }
}
```

這正是 GraphQL 的威力所在：我們只拿我們需要的資料。

---

## 延伸功能與建議學習方向

- **Mutation 實作**（新增、刪除資料）
  可以加入 `Mutation` 類型與 resolver，實作 POST/PUT 功能。

- **資料來源整合**
  Resolver 可以整合 REST API、資料庫、第三方服務等來源。

- **驗證與權限**
  可透過 Context 傳入使用者驗證資訊，進行資料存取控管。

- **使用工具**

  - [Apollo Studio](https://studio.apollographql.com/)：視覺化介面與測試工具
  - GraphQL Codegen：產生型別定義與前端 Hooks
  - Relay / urql / Apollo Client：前端整合工具

---

## 總結

GraphQL 提供比 REST 更彈性與效率的 API 設計方式，尤其適合需要頻繁前後端協作或資料結構變化頻繁的專案。透過本篇教學，我們已經學會如何使用 Apollo Server 以 ESM 模組撰寫簡單的 GraphQL API，並實際查詢資料。

未來我們可以嘗試進一步加入 Mutation、串接資料庫（如 MongoDB、PostgreSQL）、前端 Apollo Client 等，打造一個全端的 GraphQL 應用。
