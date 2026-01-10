---
title: React 前端整合 JWT（含 Refresh Token）入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags:
  - React
  - JWT
  - Refresh Token
---

## 前言

當你要將 **JWT 驗證整合至 React 前端**，並搭配 **Refresh Token** 或整合 **OAuth（如 Google 登入）流程**，你需要考慮前端的存儲方式、token 的更新機制，以及第三方登入的流程銜接。

以下將分成三個部分講解：

---

# 一、React 前端整合 JWT（含 Refresh Token）

## 流程總覽：

1. 使用者輸入帳密登入，發送 `/login` 請求。
2. 伺服器簽發兩種 token：

   - **Access Token**（短效，有效期如 15 分鐘）
   - **Refresh Token**（長效，有效期如 7 天）

3. 前端儲存 Access Token（如在記憶體），Refresh Token 建議儲存在 **HttpOnly Cookie**。
4. 當 Access Token 過期時，自動用 Refresh Token 換取新 Access Token。
5. 使用者主動登出時，Refresh Token 一併清除。

---

## 伺服器回傳範例（登入成功）：

```json
{
  "accessToken": "xxxxx",
  "expiresIn": 900
}
```

並透過 `Set-Cookie` 傳送 HttpOnly 的 Refresh Token：

```http
Set-Cookie: refreshToken=xxxxx; HttpOnly; Path=/; Max-Age=604800;
```

---

## React 實作要點

```js
// login.js
import axios from 'axios';

export async function login(username, password) {
  const res = await axios.post(
    '/api/login',
    { username, password },
    {
      withCredentials: true, // 允許 cookie 傳遞
    }
  );

  localStorage.setItem('accessToken', res.data.accessToken);
}
```

---

```js
// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      try {
        // 嘗試使用 Refresh Token 換 Access Token
        const res = await axios.post('/api/refresh', {}, { withCredentials: true });
        localStorage.setItem('accessToken', res.data.accessToken);

        // 重試原本請求
        err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(err.config);
      } catch (e) {
        // refresh 失敗，跳轉登入頁
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
```

---

## 登出

```js
export async function logout() {
  await axios.post('/api/logout', {}, { withCredentials: true });
  localStorage.removeItem('accessToken');
}
```

---

## 備註

- Refresh Token 儲存在瀏覽器的 `HttpOnly Cookie`，無法被 JavaScript 存取，提升安全性。
- Access Token 儲存在記憶體或 localStorage（但 localStorage 易受 XSS 攻擊）。
- 若要完全防止 CSRF，Refresh Token cookie 需搭配 SameSite 設定與 CSRF token。

---

# 二、OAuth 2.0 登入（以 Google 為例）

## 流程總覽

1. 前端點擊「使用 Google 登入」。
2. 透過 Google OAuth 流程取得授權碼（或 id_token）。
3. 前端將該 token 傳送到後端 `/auth/google`。
4. 後端驗證 Google id_token，並簽發 JWT 給前端。

---

## React 前端整合（Google 登入）

使用 [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google)：

```bash
npm install @react-oauth/google
```

```js
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="你的 Google Client ID">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // 將 id_token 傳送給後端
          fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token: credentialResponse.credential }),
          });
        }}
        onError={() => {
          console.log('登入失敗');
        }}
      />
    </GoogleOAuthProvider>
  );
}
```

---

## 後端處理（Node.js + `google-auth-library`）

```js
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const jwtToken = jwt.sign({ userId: payload.sub, name: payload.name }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ userId: payload.sub }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ accessToken: jwtToken });
});
```

---

# 三、小結

| 功能             | JWT + Refresh                                                         | OAuth 2.0                                |
| ---------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| 是否需要帳密登入 | 是                                                                    | 否，透過第三方登入                       |
| Token 儲存       | Access Token: localStorage / memory<br />Refresh Token: HttpOnly Cookie | 同上                                     |
| 適合對象         | 自建會員系統                                                          | 使用 Google / Facebook / LINE 等快速登入 |
| 安全性           | 良好，需搭配 HTTPS                                                    | 高，由 Google 等大廠管理                 |
| 實作難度         | 中等，需處理 Token 刷新邏輯                                           | 中高，需處理外部驗證流程                 |

---

# 延伸建議

- 若你想使用前後端共用的 JWT 驗證邏輯，建議抽出 middleware 並集中處理。
- 可搭配 `jsonwebtoken`、`axios-auth-refresh` 等工具。
- 若前後端完全分離，建議使用跨網域 Cookie 搭配 `SameSite=None; Secure`。
