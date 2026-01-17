---
title: TanStack Query 入門教學筆記 | 學習筆記
date: 2024-02-02 02:23:41
authors: kdchang
tags:
  - TanStack Query
  - React Query
---

## 前言

在現代前端開發中，資料取得（Data Fetching）與狀態管理是非常重要的課題。傳統上，我們可能會使用 `useEffect` 搭配 `fetch` 或 `axios` 來手動管理資料請求，並維護載入狀態、錯誤狀態與資料快取等，但這樣往往容易導致重複程式碼、管理複雜以及效能不佳。

TanStack Query（舊名 React Query）是一個專門用來管理伺服器狀態（server state）的函式庫，極大地簡化了資料抓取、快取、同步、重新整理與錯誤處理的流程。它不只支援 React，也能搭配 Vue、Svelte 等其他框架。

這篇筆記將介紹 TanStack Query 的核心概念與使用方式，並提供一個簡單範例，幫助你快速上手。

---

## 重點摘要

- **TanStack Query 是什麼？**
  一個用於管理非同步伺服器資料的 React Hooks 函式庫，能自動處理快取、背景重新整理、錯誤重試等。

- **主要功能**

  - 自動快取資料，減少重複請求。
  - 自動背景刷新（Background Refetching）保持資料最新。
  - 支援資料同步與離線快取。
  - 強大的錯誤重試與錯誤處理機制。
  - 方便整合 Pagination、Infinite Query。
  - 非常輕量且易於擴充。

- **核心概念**

  - **Query**：對伺服器資料的請求。
  - **Query Key**：唯一標識一個 Query 的鍵，決定快取與重新抓取。
  - **useQuery Hook**：用於發起資料請求並取得資料狀態。
  - **Query Client**：全域管理 Query 狀態與快取。

- **安裝方式**

  ```bash
  npm install @tanstack/react-query
  # 或者
  yarn add @tanstack/react-query
  ```

- **基本使用步驟**

  1. 在 React 根組件包裹 `<QueryClientProvider>`。
  2. 使用 `useQuery` Hook 進行資料請求。
  3. 使用 `data`、`error`、`isLoading` 等狀態呈現畫面。

- **常用參數**

  - `queryKey`：快取與識別用的陣列或字串。
  - `queryFn`：負責非同步取得資料的函式。
  - `enabled`：是否啟用該 query。
  - `staleTime`：資料被視為新鮮的時間（避免頻繁重新抓取）。
  - `cacheTime`：資料快取存在時間。
  - `retry`：失敗時重試次數。

---

## 實際範例

以下以 React 搭配 TanStack Query 實現一個簡單的使用者列表資料抓取為例：

### 1. 設定 Query Client

在應用程式最外層（通常是 `App.js` 或 `index.js`）包裹 `QueryClientProvider`：

```jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserList from './UserList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

export default App;
```

### 2. 建立 UserList 元件，使用 `useQuery` 抓取資料

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('網路錯誤');
  }
  return res.json();
}

function UserList() {
  const { data, error, isLoading, isError } = useQuery(['users'], fetchUsers, {
    staleTime: 1000 * 60 * 5, // 5分鐘內資料視為新鮮
    retry: 2, // 失敗重試2次
  });

  if (isLoading) return <div>資料載入中...</div>;

  if (isError) return <div>錯誤發生：{error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          {user.name}（{user.email}）
        </li>
      ))}
    </ul>
  );
}

export default UserList;
```

### 3. 說明

- `useQuery` 第一個參數為 query key，這裡用 `['users']` 表示抓取使用者列表。
- 第二個參數是非同步函式 `fetchUsers`，負責呼叫 API 並回傳資料。
- 返回的物件中包含多種狀態：

  - `isLoading`：資料還在請求中。
  - `isError` 與 `error`：請求失敗時的錯誤狀態與訊息。
  - `data`：請求成功後的資料。

- `staleTime` 設定資料多久內視為新鮮，避免頻繁重新抓取。
- `retry` 設定失敗時自動重試的次數。

---

## 進階應用

- **背景重新抓取**
  使用者回到頁面或重新聚焦視窗時，TanStack Query 預設會重新抓取最新資料，保持資料同步。
  可透過 `refetchOnWindowFocus` 控制是否啟用。

- **資料快取與共享**
  不同組件如果使用相同 `queryKey`，會共用快取資料，避免重複請求。

- **Mutation**
  除了讀取資料，TanStack Query 也提供 `useMutation` 用於資料修改（新增、更新、刪除）並自動管理快取更新。

- **分頁與無限滾動**
  支援分頁資料抓取的 `useInfiniteQuery`，適合實作滾動載入。

---

## 總結

TanStack Query 是一個強大且方便的資料狀態管理工具，解決了傳統手動管理非同步請求的種種痛點。它自動快取、背景重新整理、錯誤重試等機制，大幅提升開發效率與使用者體驗。
