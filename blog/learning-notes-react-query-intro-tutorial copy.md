---
title: React Query 入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
authors: kdchang
tags:
  - React
  - React Query
---

## 前言

隨著前端應用程式越來越複雜，資料的取得、快取、同步更新以及狀態管理成為重要挑戰。傳統使用 `useEffect` 搭配 `fetch` 或 `axios` 取得資料，會讓程式碼變得冗長且難以維護，特別是需要處理快取、錯誤重試、背景重新整理（refetch）等功能時。

React Query 是一個強大的資料同步庫，它抽象並管理伺服器狀態（server state），讓你能輕鬆完成資料抓取、快取、更新與錯誤處理。透過簡潔的 API 和自動化行為，讓前端開發者能專注於業務邏輯，而非繁瑣的資料管理。

本篇教學將介紹 React Query 的核心概念，並提供簡單的實作範例，讓你快速理解如何在 React 專案中有效率且方便地使用 React Query。

---

## 重點摘要

- **React Query 是什麼？**
  專注於伺服器狀態管理的資料同步庫，提供資料取得、快取、自動重試、背景更新、分頁等功能。

- **伺服器狀態（Server State） vs 本地狀態（Local State）**
  React Query 管理的是伺服器端資料，不同於用 React 的 `useState` 管理元件內部的本地狀態。

- **核心 Hook：`useQuery`**
  用來抓取和快取資料，接收一個 key 和一個 fetcher 函式，會自動處理 loading、error、資料快取。

- **資料快取與自動同步**
  React Query 會自動快取請求結果，並依設定自動重新抓取，保持資料最新。

- **背景重新整理（Refetching）**
  可設定在視窗獲得焦點時自動刷新資料，確保資料同步。

- **錯誤重試機制**
  請求失敗時可自動重試，避免因網路波動導致資料錯誤。

- **`useMutation`**
  用於資料變更（新增、修改、刪除）操作，並支援變更後自動重新整理相關快取。

- **全域 Query Client**
  使用 `QueryClient` 管理所有查詢狀態，需用 `QueryClientProvider` 包裹應用程式。

- **方便整合各種請求函式庫**
  可搭配 `fetch`、`axios` 等任意資料請求方式。

---

## 實際範例

### 1. 安裝

```bash
npm install @tanstack/react-query
```

或

```bash
yarn add @tanstack/react-query
```

### 2. 基本設定

在 React 應用的根元件設定 `QueryClient` 與 `QueryClientProvider`：

```jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourComponent />
    </QueryClientProvider>
  );
}

export default App;
```

### 3. 使用 `useQuery` 抓取資料

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 一個模擬的 fetch 函式，從 API 取得使用者清單
async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

function UserList() {
  // 使用 useQuery，第一參數為 key，第二參數為 fetch 函式
  const { data, error, isLoading, isError } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>載入中...</div>;

  if (isError) return <div>錯誤：{error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

export default UserList;
```

### 4. 使用 `useMutation` 進行資料更新

假設有一個新增使用者的 API，使用 `useMutation` 處理：

```jsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function addUser(newUser) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('新增失敗');
  return res.json();
}

function AddUserForm() {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      // 新增成功後，重新整理 users 快取
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="使用者名稱" />
      <button type="submit">新增使用者</button>
      {mutation.isLoading && <p>新增中...</p>}
      {mutation.isError && <p>錯誤：{mutation.error.message}</p>}
      {mutation.isSuccess && <p>新增成功！</p>}
    </form>
  );
}

export default AddUserForm;
```

---

## 小結

React Query 提供一套完整且簡潔的 API 來管理伺服器狀態，包含資料取得、快取、錯誤處理與背景更新。透過 `useQuery` 與 `useMutation`，你能輕鬆地處理資料的讀取與更新，讓 React 應用程式更穩定且易維護。

建議在開發中逐步導入 React Query，取代傳統的 `useEffect + fetch` 模式，尤其是對於複雜的資料流與同步需求，能大幅提升開發效率與使用者體驗。

# 參考文件

1. [React Query 文件](https://tanstack.com/query/latest)
