---
title: NextAuth.js 入門教學筆記 | 學習筆記
date: 2024-12-21 11:33:41
author: kdchang
tags:
  - NextAuth.js
  - Next.js
---

## 一、前言

隨著 Web 開發從傳統伺服器渲染演變為前後端分離架構，處理「使用者認證」變得更為複雜。許多開發者不再單純依賴 session + cookie 的方式，而是轉向 token-based 的 JWT 或 OAuth 解決方案。

如果你正在使用 **Next.js**，那麼 **NextAuth.js** 是一套高度整合、彈性高且極為方便的認證函式庫。它支援多種認證方式（如 OAuth、Email、Credentials、LDAP、JWT 等），可與 Next.js 無縫整合，適合快速導入登入機制。

---

## 二、重點摘要

- 開源且專為 **Next.js** 設計的認證函式庫
- 支援：

  - OAuth 第三方登入（Google、GitHub、Facebook、LINE 等）
  - Email 登入（magic link）
  - 自定義帳密登入（Credentials provider）
  - JWT 無狀態驗證

- 自動處理：

  - session 建立與維護
  - cookies 管理
  - CSRF 保護

- 可與資料庫整合（支援 Prisma、TypeORM、MongoDB 等）
- 可自定義：

  - 登入畫面
  - 回傳的使用者資料
  - 授權邏輯與回傳 token 欄位

- 適用場景：企業內部登入、SaaS 後台、會員管理系統、整合第三方帳戶等

---

## 三、建立 NextAuth 基本專案

### 1. 建立 Next.js 專案

```bash
npx create-next-app@latest nextauth-demo
cd nextauth-demo
npm install next-auth
```

---

### 2. 建立 API Route

在 `pages/api/auth/[...nextauth].js` 中新增設定：

```js
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});
```

---

### 3. 設定環境變數

在 `.env.local` 中新增：

```
GITHUB_CLIENT_ID=你的 GitHub OAuth ID
GITHUB_CLIENT_SECRET=你的 GitHub OAuth Secret
NEXTAUTH_SECRET=隨機生成的 secret（可用 openssl rand -base64 32）
```

若使用 JWT，可加入：

```
NEXTAUTH_JWT_SECRET=任意密鑰
```

---

### 4. 在前端使用登入與登出功能

```js
// pages/index.js
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>歡迎，{session.user.name}，你已登入</p>
        <button onClick={() => signOut()}>登出</button>
      </>
    );
  }

  return (
    <>
      <p>尚未登入</p>
      <button onClick={() => signIn('github')}>使用 GitHub 登入</button>
    </>
  );
}
```

---

### 5. 在 `_app.js` 包裝 `SessionProvider`

```js
// pages/_app.js
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
```

---

## 四、自訂登入方式（Credentials）

除了 OAuth，也可以自訂帳號密碼登入：

```js
// [...nextauth].js
import CredentialsProvider from "next-auth/providers/credentials";

providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "帳號", type: "text" },
      password: { label: "密碼", type: "password" },
    },
    async authorize(credentials) {
      const user = await verifyUser(credentials.username, credentials.password);
      if (user) return user;
      return null;
    },
  }),
],
```

> 注意：`authorize` 函式需自行驗證帳密，並回傳 `user` 物件，如 `{ id, name, email }`

---

## 五、整合 JWT 模式（無狀態認證）

啟用 JWT 模式，只需設定：

```js
session: {
  strategy: "jwt",
},
jwt: {
  secret: process.env.NEXTAUTH_SECRET,
},
```

這樣每次登入都會發出加密的 JWT，並由前端自動存於 cookie。你可以透過 `getToken()` 從 API 端存取 token 中的自訂欄位。

---

## 六、取得 Server 端 Session

如果你需要在 API route 或 SSR 頁面取得使用者登入資訊，可使用：

```js
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session,
    },
  };
}
```

---

## 七、總結與延伸

| 功能               | NextAuth 表現                            |
| ------------------ | ---------------------------------------- |
| 快速整合第三方登入 | 非常方便，僅需 provider 設定             |
| 安全性             | 預設 CSRF 保護、HttpOnly cookie          |
| 自訂性             | 高度可調整 callback、UI、資料庫整合      |
| 無狀態支援         | 支援 JWT、Access Token                   |
| SSR/SPA 支援       | 完整整合 getServerSideProps、Client Hook |

---

## 延伸功能建議

- 整合 Prisma 儲存使用者資料與 session（可自動生成 schema）
- 自訂登入 UI 與跳轉路徑
- 客製化 JWT payload 內容（如 role, id, user_type）
- 使用 `getToken()` 或 `useSession()` 搭配權限控制
- 多平台登入支援（Web、Mobile API）
