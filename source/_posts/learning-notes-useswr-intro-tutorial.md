---
title: useSWR 入門教學筆記：打造高效、簡潔的資料請求方式 | 學習筆記
date: 2024-12-24 02:23:41
author: kdchang
tags:
  - html
  - 前端
  - 前端開發
  - 前端工程
  - react
  - fetch
  - useSWR
---

## 前言

在現代前端開發中，資料的取得與管理是不可或缺的一環。傳統上，我們可能使用 `useEffect` 搭配 `fetch` 或 `axios` 來處理資料請求，但這樣的方式不僅冗長，還需要手動管理 loading、error 狀態與快取邏輯。為了解決這些問題，Vercel 推出的 SWR（stale-while-revalidate）提供了一種簡潔、聲明式且高效的資料取得方式，特別適合搭配 React 應用開發。

本文將介紹 SWR 的核心觀念、使用方式與基本範例，幫助我們快速上手並應用於實務開發中。

---

## 重點摘要

- **SWR 是什麼？**

  - SWR 是由 Vercel 開發的 React Hooks 函式庫，提供資料快取與同步機制。
  - 名稱來自 HTTP 快取策略 “stale-while-revalidate”，意指：**先顯示舊資料，再重新驗證更新資料**。

- **為什麼要使用 SWR？**

  - 自動處理資料快取與重新驗證。
  - 簡化資料請求邏輯，減少樣板程式碼。
  - 支援多種進階功能（錯誤重試、revalidate on focus、polling 等）。

- **基本用法**

  - 使用 `useSWR(key, fetcher)` 進行資料請求。
  - `key`：唯一識別資料來源的 key，通常為 API 路徑。
  - `fetcher`：資料請求函式，可使用 `fetch` 或 `axios` 實作。

- **常見功能**

  - `isLoading`、`error` 狀態管理。
  - 自動重試與重新整理資料。
  - 快取與全域共用資料（Shared cache）。
  - 手動重新驗證資料（revalidate）。
  - 支援 SSR、Pagination、Mutation 等進階功能。

---

## 實際範例：取得 GitHub 使用者資料

### 1. 安裝 SWR

```bash
npm install swr
# 或使用 yarn
yarn add swr
```

---

### 2. 撰寫 fetcher 函式

```tsx
// libs/fetcher.ts
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
```

---

### 3. 在元件中使用 useSWR

```tsx
// pages/UserProfile.tsx
import useSWR from 'swr';
import { fetcher } from '../libs/fetcher';

const UserProfile = () => {
  const { data, error, isLoading } = useSWR('https://api.github.com/users/octocat', fetcher);

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>載入失敗：{error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>GitHub：{data.login}</p>
      <p>Followers：{data.followers}</p>
      <img src={data.avatar_url} width={100} />
    </div>
  );
};

export default UserProfile;
```

---

### 4. 手動重新驗證資料

```tsx
const { data, mutate } = useSWR('/api/data', fetcher);

// 手動刷新資料
const handleRefresh = async () => {
  await mutate();
};
```

---

### 5. 搭配條件式載入

```tsx
const shouldFetch = userId !== null;

const { data } = useSWR(shouldFetch ? `/api/users/${userId}` : null, fetcher);
```

---

### 6. 自訂快取與設定

```tsx
import useSWR from 'swr';

const { data, error } = useSWR('/api/data', fetcher, {
  refreshInterval: 10000, // 每 10 秒重新抓資料
  revalidateOnFocus: true, // 回到畫面時自動刷新
  dedupingInterval: 5000, // 阻止過於頻繁的 API 請求
});
```

---

## 總結

SWR 提供了一種優雅、聲明式的方式來管理 React 應用中的資料請求與快取，不僅能有效簡化程式碼，還能提高使用者體驗與應用效能。其彈性與擴充性也適合應用於中大型專案中。

當我們熟悉了 SWR 的基本用法後，接下來也可以進一步探索以下功能：

- **Mutation API**：用於資料寫入後手動更新快取。
- **依賴 key 的動態載入**：搭配 router 參數動態請求資料。
- **全域快取策略自訂（SWRConfig）**：統一設定所有請求的行為。

透過 SWR，我們不再需要手動處理快取與副作用邏輯，只需專注於資料的呈現與邏輯本身，是開發現代 React 應用的絕佳利器。

## 參考文件

1. [React Hooks for Data Fetching](https://swr.vercel.app/)
