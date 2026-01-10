---
title: JWT 入門教學筆記 | 學習筆記
date: 2023-12-20 11:33:41
author: kdchang
tags:
  - JWT
  - Refresh Token
---

## 前言

在現代 Web 應用中，使用者認證與授權機制是系統安全的重要基礎。傳統上，我們可能使用 Session 與 Cookie 搭配伺服器端儲存進行身份驗證；但在前後端分離、多平台（Web、Mobile、API Gateway）應用日益普及的情況下，更輕量、跨平台、無狀態的驗證方案逐漸成為主流。

JWT（JSON Web Token）正是這樣一種流行的解法。它是一種根據 JSON 格式加密後產生的 Token，可用來安全地在用戶與伺服器間傳遞資訊。

---

## 重點摘要

- JWT 是一種開放標準（RFC 7519），用於在雙方之間以 JSON 格式安全傳遞資訊。
- 結構由三部分組成：`Header`.`Payload`.`Signature`。
- 主要用途：

  - **身份認證（Authentication）**
  - **授權（Authorization）**

- 特點：

  - 可跨語言與平台使用
  - 支援無狀態驗證（不需伺服器端儲存 session）
  - 可設定過期時間與自訂 Payload 欄位

- 常見應用場景：API Token 驗證、行動裝置登入狀態維持、OAuth 搭配使用
- JWT 須透過 HTTPS 傳遞以避免中間人攻擊（MITM）
- 不適合儲存敏感資訊（如密碼、信用卡號）

---

## JWT 結構說明

一個 JWT 字串長得像這樣：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiIxMjM0IiwibmFtZSI6IktEIiwiZXhwIjoxNzAwMDAwMDAwfQ.
sKPXrY3AvKb0aBQKgYF3mn7ZWh9yGpyF2X2NFie5TIU
```

它由三個部分組成，透過 `.` 分隔：

1. **Header**：定義演算法（如 `HS256`）與類型（`JWT`）。
2. **Payload**：承載實際資料（如使用者 ID、帳號、過期時間）。
3. **Signature**：用密鑰加密前兩部分，用於驗證是否被竄改。

---

## 實作範例（Node.js + ESM）

### 安裝必要套件

```bash
npm install express jsonwebtoken dotenv
```

### 專案架構

```
project/
├── index.js
├── routes/
│   └── auth.js
├── .env
```

---

### `.env` 檔（儲存密鑰）

```
JWT_SECRET=mysecretkey123
```

---

### `routes/auth.js`

```js
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// 模擬使用者登入
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 模擬帳密驗證（實際應從 DB 查詢）
  if (username === 'admin' && password === '123456') {
    const payload = {
      userId: 'abc123',
      username: 'admin',
    };

    // 簽發 Token，過期時間為 1 小時
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  }

  res.status(401).json({ error: '帳號或密碼錯誤' });
});

// 受保護資源
router.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '請提供 Token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: '驗證成功', user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Token 無效或過期' });
  }
});

export default router;
```

---

### `index.js`

```js
import express from 'express';
import authRouter from './routes/auth.js';

const app = express();
app.use(express.json());

app.use('/api', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 測試流程

1. 發送 `POST /api/login` 並附上正確帳密（如 `admin` / `123456`），取得 JWT。
2. 將該 JWT 作為 `Authorization: Bearer <token>` 放入 Header 中，請求 `GET /api/profile`。
3. 若驗證成功，API 會回傳對應使用者資訊；若失敗，則回傳錯誤訊息。

---

## 常見安全注意事項

- **使用 HTTPS**：JWT 應透過 HTTPS 傳輸，避免中間人攻擊。
- **設定適當過期時間**：避免長期有效的 Token 被盜用。
- **避免儲存敏感資訊於 Payload**：Payload 是可被解碼的（雖然不可修改），不應含有密碼、信用卡資訊等。
- **支援 Token 失效機制（如 Token 黑名單）**：JWT 是無狀態的，若要強制登出或封鎖，需額外設計邏輯。

---

## 總結

JWT 是實作登入與驗證的重要工具，具有無狀態、跨平台、可擴充的特性，特別適合 API 驗證場景。本文透過簡單的 Node.js + Express 實作，展示如何產生與驗證 JWT，並說明常見應用與安全注意事項。

不論你是單頁應用 SPA 開發者，還是撰寫 RESTful API 的後端工程師，掌握 JWT 都將大幅提升你的系統安全與擴充能力。
