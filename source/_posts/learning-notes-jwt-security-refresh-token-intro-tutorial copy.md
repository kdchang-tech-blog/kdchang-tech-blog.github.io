---
title: JWT 的實作安全策略與 Refresh Token 安全做法入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags:
  - JWT
  - Refresh Token
---

## 一、JWT 基本安全策略

### 1. **使用強密鑰（Secret）或非對稱加密**

- 對稱加密：使用 `HS256` 時，`secret` 應具備高強度（建議 256-bit 以上）。
- 非對稱加密：使用 `RS256` 時，私鑰與公鑰分離，便於服務間驗證。

### 2. **設定有效期限（exp）**

- `Access Token` 建議設為 **短效（10\~30 分鐘）**。
- 避免永久有效的 Token，防止被盜用後長期濫用。

### 3. **限制 Token 權限與資訊**

- Token 中只放必要資訊（例如：`userId`、`role`）。
- **不要放敏感資料**（如密碼、信用卡、住址等）。

### 4. **透過 HTTPS 傳遞 JWT**

- 絕對 **禁止在 HTTP 傳輸 JWT**，避免中間人攻擊（MITM）。
- 所有 API 傳遞 token（包括 Refresh Token）都必須走 HTTPS。

### 5. **防範 XSS**

- 若將 `accessToken` 存放於 `localStorage`，需格外注意防止前端被注入腳本。
- 建議使用 `HttpOnly` cookie 儲存 Refresh Token（無法被 JavaScript 存取）。

---

## 二、為什麼要使用 Refresh Token？

**Access Token 有效期短**，提高安全性，但使用者不希望頻繁重新登入，這時就用 **Refresh Token** 來「悄悄地」幫用戶更新 Access Token。

---

## 三、JWT + Refresh Token 實作架構

```txt
          +-------------+                      +----------------+
          |   前端客戶端 |                      |    後端伺服器    |
          +-------------+                      +----------------+
               |                                       |
               |--------> /login (帳密登入) --------->|
               |                                       |
               |<----- accessToken + refreshToken -----|
               |                                       |
               | 使用 accessToken 存取受保護資源          |
               |--------> /api/profile ------------->|
               |                                       |
        accessToken 過期 ↓                             |
               |--------> /refresh (更新 token) ------>|
               |<------- 新的 accessToken -------------|
```

---

## 四、最佳實作策略詳解

### 1. **accessToken 存放位置**

- 可存在記憶體（例如 Redux、React Context）或 `localStorage`
- 優點：操作方便
- 缺點：暴露於 XSS 攻擊風險

### 2. **refreshToken 存放位置**

- 建議儲存在 **HttpOnly、Secure 的 Cookie** 中：

```http
Set-Cookie: refreshToken=xxxxx; HttpOnly; Secure; SameSite=Strict; Path=/refresh
```

- 前端 JavaScript 無法讀取，降低風險
- 伺服器可以從 cookie 中自動取出 refreshToken

---

### 3. **建立 /refresh API（專責刷新 token）**

```js
// POST /refresh
import jwt from 'jsonwebtoken';

router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ error: '無 refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Refresh token 無效或過期' });
  }
});
```

---

### 4. **可選：Refresh Token 儲存機制（實現強制登出與黑名單）**

- **資料庫方案**（建議）：

  - 每次登入時產生唯一的 `refreshToken` 並儲存於 DB
  - 使用時驗證是否仍存在
  - 登出或異常行為時移除對應的 refreshToken

- **Redis 快取黑名單方案**（進階）：

  - 遇到帳號盜用或封鎖時，將 token 加入黑名單清單，後續驗證可即時攔截

---

### 5. **登出處理（安全地移除 token）**

```js
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', { path: '/refresh' });
  res.json({ message: '已成功登出' });
});
```

---

## 五、常見攻擊防護建議

| 威脅類型   | 防護方法                                                      |
| ---------- | ------------------------------------------------------------- |
| XSS        | 不使用 localStorage 儲存 refresh token，輸出內容時做 XSS 過濾 |
| CSRF       | 使用 SameSite=Strict 的 cookie，或搭配 CSRF Token             |
| Token 竄改 | 使用強加密簽章（如 HS256/RS256）並驗證                        |
| 重放攻擊   | 設定合理 `exp` 過期時間並結合裝置驗證（如 IP / UA）           |
| Token 外洩 | refreshToken 實作多設備登入管理與黑名單機制                   |

---

## 六、小結

| 元素          | 實作策略                               | 優點                         |
| ------------- | -------------------------------------- | ---------------------------- |
| Access Token  | 存放在記憶體或 localStorage            | 快速存取，搭配短效時安全性高 |
| Refresh Token | 存放於 HttpOnly Cookie                 | 避免 JS 存取，提高防護能力   |
| /refresh API  | 驗證 refreshToken 並產生新 accessToken | 提升使用者體驗與系統可用性   |
| 黑名單策略    | 儲存 refreshToken 資訊於資料庫         | 支援強制登出與封鎖帳號       |

---

## 七、額外建議

- 單一使用者只能同時登入 N 台裝置，可依照 refreshToken 綁定設備資訊。
- 將 JWT 實作與中介層（middleware）封裝好，避免開發重複邏輯。
- 若你使用的是框架如 Next.js、NestJS、Spring Boot，也有內建 JWT 與 Refresh 模組可以善用。

# 參考文件

1. [官方文件](https://www.prisma.io/docs)
