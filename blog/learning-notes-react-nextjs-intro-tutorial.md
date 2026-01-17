---
title: React 與 Next.js 入門教學筆記 | 學習筆記
date: 2024-11-16 11:33:41
authors: kdchang
tags:
  - React
  - Next.js
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 1. React 簡介

React 是由 Facebook（現 Meta）開發的 JavaScript 前端函式庫，主要用於構建 UI 元件。它採用組件化開發方式，並透過 Virtual DOM 提升效能。

## 2. Next.js 簡介

Next.js 是一個基於 React 的框架，提供伺服器端渲染（SSR）、靜態網站生成（SSG）等功能，讓開發者能夠更輕鬆地開發 SEO 友好的應用程式。

## 3. 安裝 Next.js

使用 `create-next-app` 初始化 Next.js 專案：

```sh
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

這將會啟動開發伺服器，預設運行於 `http://localhost:3000`。

## 4. Next.js 核心概念

### 4.1 頁面（Pages）

Next.js 使用 `pages/` 目錄來定義路由，每個 `.js` 或 `.tsx` 文件會自動成為一個頁面。

範例：`pages/index.js`

```jsx
export default function Home() {
  return <h1>歡迎來到 Next.js！</h1>;
}
```

新增 `pages/about.js`：

```jsx
export default function About() {
  return <h1>關於我們</h1>;
}
```

瀏覽 `/` 會載入 `index.js`，瀏覽 `/about` 會載入 `about.js`。

### 4.2 Link 與導航

使用 `next/link` 來建立導航連結：

```jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">首頁</Link> | <Link href="/about">關於</Link>
    </nav>
  );
}
```

### 4.3 頁面中的 props

Next.js 支援 `getServerSideProps`（伺服器端渲染）和 `getStaticProps`（靜態生成）。

#### 伺服器端渲染（SSR）

```jsx
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

#### 靜態生成（SSG）

```jsx
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return { props: { data } };
}

export default function Page({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## 5. API 路由（API Routes）

在 `pages/api/` 目錄下建立 API 端點。

範例：`pages/api/hello.js`

```js
export default function handler(req, res) {
  res.status(200).json({ message: "Hello, API!" });
}
```

請求 `/api/hello` 會返回 JSON 資料。

## 6. 使用全域狀態管理（React Context）

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

在 `_app.js` 中使用 Provider：

```jsx
import { ThemeProvider } from "../context/ThemeContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

在元件中存取狀態：

```jsx
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      切換主題（目前：{theme}）
    </button>
  );
}
```

## 7. 總結

Next.js 提供了比 React 更豐富的功能，如內建路由、伺服器端渲染（SSR）和 API 路由，適合開發高效能與 SEO 友好的網站。熟悉這些核心概念後，你可以更輕鬆地構建現代化的前端應用程式。

## 補充：可選搭配技術（實務常見）

| 技術          | 目的                               |
| ------------- | ---------------------------------- |
| Tailwind CSS  | 快速開發 UI 樣式                   |
| Zustand/Redux | 全域狀態管理                       |
| NextAuth.js   | 登入驗證（支援 Google, GitHub 等） |
| Prisma        | ORM 操作 MySQL/PostgreSQL          |
| React Query   | 前端資料抓取與快取                 |
| shadcn/ui     | 組件庫（Tailwind 美型元件）        |
