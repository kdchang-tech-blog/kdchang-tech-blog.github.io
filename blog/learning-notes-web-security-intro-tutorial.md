---
title: Web 資訊安全入門教學筆記 | 學習筆記
date: 2024-10-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - 資訊安全
    - web
    - Web 資訊安全
    - frontend engineer

---

# 前言

在現代網頁應用中，資安問題層出不窮，從簡單的跨站攻擊（XSS）到複雜的憑證竊取、身份偽造（CSRF），都可能導致個資外洩、系統遭入侵甚至企業商譽受損。

本篇筆記將從實務角度出發，介紹幾種常見 Web 資安風險及其防範策略，讓你能以最基本的方式保護網站與使用者安全。

---

## 一、常見 Web 資安威脅類型

### 1. XSS（Cross-Site Scripting，跨站腳本攻擊）

**原理**：攻擊者將惡意腳本注入至網站，當其他使用者瀏覽該頁面時，惡意腳本便會在其瀏覽器上執行，例如竊取 cookie、冒充使用者操作等。

### 實例：

```html
<!-- 攻擊者輸入的留言內容 -->
<script>alert('你被 XSS 攻擊了');</script>
```

若網站未正確處理輸入，這段 JavaScript 就會直接被執行。

### 防範方式：

- 對所有輸入進行 **轉義（Escape）**
- 使用前端框架自動編碼機制（如 React 的 JSX）
- 避免使用 `innerHTML` 插入未清洗的資料

#### 範例（JavaScript 轉義文字）：

```js
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

---

### 2. CSRF（Cross-Site Request Forgery，跨站請求偽造）

**原理**：攻擊者引導使用者點擊惡意連結或載入圖片，使其在未察覺情況下對已登入的網站發送請求，進而竄改資料或觸發操作。

### 實例：

```html
<!-- 攻擊者網站中隱藏圖片，觸發某網站的轉帳請求 -->
<img src="https://bank.com/transfer?amount=1000&to=attacker" />
```

如果使用者已登入 `bank.com` 且未防範 CSRF，就可能無意間轉帳。

### 防範方式：

- 後端驗證 **CSRF Token**
- 使用 **SameSite Cookie 屬性**
- 僅允許 POST / PATCH / DELETE 操作變更狀態
- 驗證 Referer / Origin 標頭（有風險）

#### 範例（Express + CSRF Token）：

```js
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get("/form", (req, res) => {
  res.render("form", { csrfToken: req.csrfToken() });
});
```

---

### 3. SQL Injection（SQL 注入）

**原理**：透過惡意輸入拼接 SQL 查詢語句，導致資料庫查詢異常，甚至刪除資料。

### 實例：

```sql
-- 假設未使用參數化查詢
SELECT * FROM users WHERE username = '' OR 1=1;
```

攻擊者輸入 ` ' OR 1=1; -- ` 可繞過認證邏輯，取得所有帳戶資料。

### 防範方式：

- 使用 ORM 或預處理語句（Prepared Statement）
- 不拼接 SQL 字串，改用參數綁定
- 限制資料庫帳號權限

#### 範例（Node.js + MySQL）：

```js
const username = req.body.username;
const password = req.body.password;

const query = "SELECT * FROM users WHERE username = ? AND password = ?";
connection.query(query, [username, password], function (err, results) {
  // 安全地查詢
});
```

---

### 4. 資料傳輸未加密（缺少 HTTPS）

**原理**：若網站使用 HTTP，使用者資料（如帳號密碼、金流資訊）在傳輸過程中可能被中間人攔截（Man-in-the-Middle attack）。

### 防範方式：

- 強制使用 HTTPS（導入憑證）
- 使用 HSTS（HTTP Strict Transport Security）
- 移除 HTTP 存取（使用 301 重導）

#### 範例（NGINX 強制 HTTPS）：

```nginx
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}
```

---

### 5. 檔案上傳風險

**原理**：攻擊者透過檔案上傳功能傳入惡意腳本（如 `.php`、`.jsp`），若伺服器未阻擋，可能導致遠端代碼執行。

### 防範方式：

- 限制可上傳的檔案類型與副檔名
- 不讓使用者可直接存取上傳目錄
- 使用 UUID 改名，避免原檔名執行

---

## 附加安全性強化機制

### HTTP 安全標頭設定（Security Headers）

使用如 Helmet（Express.js 中間件）快速加入以下標頭：

- `Content-Security-Policy`：防止 XSS 和資源注入
- `X-Frame-Options`：防止點擊劫持（Clickjacking）
- `X-Content-Type-Options`：避免 MIME 類型混淆
- `Strict-Transport-Security`：強制 HTTPS

#### 範例（Node.js + Helmet）：

```js
const helmet = require("helmet");
app.use(helmet());
```

---

## 總結與建議實作順序

如果剛開始建立 Web 專案，可以按照以下步驟檢查安全性：

1. 輸入驗證與輸出轉義，防範 XSS
2. 加入 CSRF Token 機制
3. 資料庫查詢全面使用預處理語句
4. 部署 HTTPS 並強制重導
5. 使用 Helmet 加強安全標頭
6. 定期檢查依賴套件漏洞（如 `npm audit`）


資訊安全並非一勞永逸，而是一種持續維護的工作。建議我們可以將資安意識融入日常開發流程中，隨時更新資安知識與工具。