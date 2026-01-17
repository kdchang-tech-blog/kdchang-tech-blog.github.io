---
title: Prisma ORM 入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
authors: kdchang
tags:
  - Prisma
  - Prisma ORM
---

## 前言

在現代 Web 應用中，資料庫與後端邏輯的整合至關重要，而 ORM（Object Relational Mapping）工具正好扮演了簡化資料操作、提升開發效率的角色。Prisma 是一個現代化的 TypeScript ORM，具有直觀的語法、自動型別生成、遷移管理與強大的查詢功能，深受開發者喜愛。

本教學將帶你從安裝 Prisma、設定 schema、執行 migration、撰寫查詢等一步步建立對 Prisma 的基本理解。

---

## 重點摘要

- Prisma 是一套現代化的 Node.js ORM 工具，支援 PostgreSQL、MySQL、SQLite、SQL Server、MongoDB。
- 使用 Prisma Schema 語言定義資料模型，並自動生成型別與查詢方法。
- 透過 CLI 工具可快速進行資料庫遷移與型別同步。
- 與 TypeScript 深度整合，享有 IDE 型別提示與靜態檢查。
- Prisma Client 是用來查詢資料庫的自動產生型別安全工具。
- 支援 transaction、raw SQL、relation 查詢等進階功能。

---

## 快速安裝與初始化

### 1. 初始化專案

```bash
mkdir my-prisma-app && cd my-prisma-app
npm init -y
npm install prisma --save-dev
npx prisma init
```

上述指令會建立以下結構：

```
.
├── prisma/
│   └── schema.prisma   // 資料模型定義
└── .env                // 資料庫連線字串
```

### 2. 設定資料庫

以 PostgreSQL 為例，在 `.env` 中加入：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

然後修改 `prisma/schema.prisma` 檔案：

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 定義資料模型

以下是一個簡單的 `User` 與 `Post` 的關聯模型範例：

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  name     String?
  posts    Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

---

## 建立資料庫與生成 Prisma Client

```bash
npx prisma migrate dev --name init
```

這會：

- 根據 schema 建立 migration SQL
- 自動套用到資料庫
- 產生型別安全的 Prisma Client

---

## 使用 Prisma Client 查詢資料

### 安裝並匯入 Prisma Client

```bash
npm install @prisma/client
```

```ts
// src/index.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

### 新增資料

```ts
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    posts: {
      create: {
        title: 'Hello World',
        content: 'This is my first post.',
      },
    },
  },
});
console.log(user);
```

### 查詢資料

```ts
const allUsers = await prisma.user.findMany({
  include: {
    posts: true,
  },
});
console.dir(allUsers, { depth: null });
```

### 更新資料

```ts
await prisma.post.update({
  where: { id: 1 },
  data: { published: true },
});
```

### 刪除資料

```ts
await prisma.post.delete({
  where: { id: 1 },
});
```

---

## 進階功能介紹

- **Relation 查詢**：支援巢狀查詢與 lazy loading。
- **Transaction**：支援多筆操作的交易一致性。
- **Raw SQL**：如需彈性操作，可透過 `prisma.$queryRaw` 撰寫 SQL。
- **Prisma Studio**：可視化資料庫管理 UI，透過 `npx prisma studio` 啟動。

---

## 總結

Prisma 是一套設計現代化、對開發者友善的 ORM 工具，特別適合搭配 TypeScript 開發的應用。它不僅簡化了資料庫操作流程，還提升了開發與除錯效率。無論你是從 Sequelize、TypeORM 轉移而來，或是初次使用 ORM，都能快速上手 Prisma 並有效管理你的資料層邏輯。

# 參考文件

1. [官方文件](https://www.prisma.io/docs)
