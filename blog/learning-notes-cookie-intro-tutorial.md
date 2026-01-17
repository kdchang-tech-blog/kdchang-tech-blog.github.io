---
title: Cookie 入門教學筆記 | 學習筆記
date: 2024-11-02 02:23:41
authors: kdchang
tags: 
    - javascript
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - cookie

---

# 前言
Cookie 是一種儲存在使用者瀏覽器上的小型文字檔案，用於保存使用者的狀態或資訊。常見用途包含：

**紀錄登入狀態**：讓使用者在網站上保持登入，不需每次重新輸入帳號。
**使用者偏好設定**：保存使用者選擇的語言、主題等個人化設定。
**追蹤使用者行為**：例如分析網站流量、廣告投放追蹤等。

# 重點摘要
Cookie 依據不同的分類方式，可以分為以下幾種常見種類：

### 一、依用途分類：
1. **功能性 Cookie（Functional Cookies）**  
   - 主要用於提升網站使用體驗，例如記住使用者的登入狀態、語言設定、購物車內容等。
  
2. **必要性 Cookie（Strictly Necessary Cookies）**  
   - 維持網站基本運作所需，例如登入認證、網頁導航等，通常無法被關閉。

3. **分析型 Cookie（Analytical/Performance Cookies）**  
   - 用於收集網站流量數據，分析使用者行為，幫助網站優化，例如 Google Analytics。

4. **廣告追蹤 Cookie（Advertising/Targeting Cookies）**  
   - 用於追蹤使用者瀏覽行為，以提供個人化廣告或推薦內容。

---

### 二、依存放時間分類：
1. **暫時性 Cookie（Session Cookies）**  
   - 只在`使用者開啟網頁期間有效`，`關閉瀏覽器後即刪除`。

2. **永久性 Cookie（Persistent Cookies）**  
   - 設定到期日期，存放於使用者裝置上，保存時間較長，即使關閉瀏覽器也不會刪除，`直到設定的到期日或手動刪除`。

---

### 三、依來源分類：
1. **第一方 Cookie（First-party Cookies）**  
   - 由`使用者瀏覽的網站`所設定，通常用於`記錄該網站上的互動紀錄`。

2. **第三方 Cookie（Third-party Cookies）**  
   - 由非該網站的`第三方`（如廣告商）設定，用於`跨網站追蹤使用者行為`，以`推送廣告`等。

---

### 四、特殊類型：
1. **安全性 Cookie（Secure Cookies）**  
   - 只能透過 `HTTPS` 傳輸，避免被攔截，主要保障敏感資料安全。

2. **HttpOnly Cookie**  
   - 僅限伺服器端存取，JavaScript 無法讀取，用於防範 `XSS` 攻擊。

3. **SameSite Cookie**  
   - 限制跨站請求攜帶 Cookie，減少 `CSRF` 攻擊風險，值可設為：
   - `Strict`：禁止跨站請求攜帶 Cookie。
   - `Lax`：部分允許，如從第三方網站點擊連結進來時可帶 Cookie。
   - `None`：允許跨站攜帶，但須配合 Secure。

# 總結
這些分類會依需求搭配使用，例如一個「`必要性第一方暫時性 Cookie`」可能用於維護`登入和操作狀態`；一個「`第三方廣告追蹤永久性 Cookie`」則可能用於`跨網站顯示個人化廣告`。