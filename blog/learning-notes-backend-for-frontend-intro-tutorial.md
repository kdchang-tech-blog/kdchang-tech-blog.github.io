---
title: Backend For Frontend（BFF）入門教學筆記 | 學習筆記
date: 2024-12-13 02:23:41
authors: kdchang
tags: 
    - react
    - Redux
    - React Redux

---

## 前言
當今前端與後端開發越趨分離，加上行動裝置、多樣化的使用者端（Web、App、IoT 等）快速成長，**Backend for Frontend（BFF）** 架構逐漸成為微服務與現代應用中不可或缺的一環。本文將介紹 BFF 的基本概念、優缺點、使用情境與實際範例，幫助你快速理解並在專案中應用。

## 一、什麼是 Backend For Frontend？

**Backend For Frontend（簡稱 BFF）** 是一種後端架構模式，其核心理念是：**每種前端應用（Web、Mobile App、Smart TV）都由各自專屬的後端服務來支援**，這個後端只為對應的前端量身打造。

傳統系統中，前端直接呼叫後端 API 或微服務，常會遇到以下問題：

- 回傳資料過多（浪費頻寬）
- 回傳資料不夠（還要多次請求）
- 錯誤格式（不適合前端解析）
- 缺乏聚合邏輯（需要組裝多個 API 回應）

BFF 則專門為特定前端處理這些問題，讓資料更適合顯示、傳輸與渲染，減少耦合與重複工作。

---

## 二、BFF 架構示意圖

```
          +---------------+          +-------------------+
Web App → |  BFF for Web  |  → REST  |   User Service    |
          +---------------+          +-------------------+
                                        ↑
          +----------------+           |  REST / RPC
Mobile →  | BFF for Mobile |  → GraphQL| Order Service    |
          +----------------+           |
                                        ↓
                                    Product Service
```

每一個 BFF 可以：

- 聚合多個微服務的資料
- 轉換資料格式供前端使用
- 處理權限與驗證邏輯（例如 token 驗證）
- 實作快取策略（如 CDN, Redis）
- 提供更穩定的 API 給前端

---

## 三、什麼情況適合使用 BFF？

1. **有多種前端平台**：Web 和 App 須分別調整 API。
2. **資料需聚合多個來源**：例如組合訂單資料與商品詳細資訊。
3. **前端需要特別的資料結構或格式轉換**
4. **希望讓前端開發獨立部署、測試、開發**
5. **希望簡化前端邏輯，把複雜邏輯搬到後端處理**

---

## 四、BFF 優點與缺點

### 優點

- 前後端明確分工，降低耦合
- 加快前端開發速度
- 可根據裝置特性量身打造 API
- 改善效能（避免多餘資料，提升快取）
- 更容易實施權限控管與安全策略

### 缺點

- 增加部署與維護成本（每個前端都需對應 BFF）
- 需要資源維護 BFF 團隊
- 需協調不同 BFF 的資料一致性與邏輯重複問題

---

## 五、實際範例：Node.js 建立一個 BFF

假設有以下微服務：

- `GET /users/:id` 回傳使用者資料
- `GET /orders/user/:id` 回傳該用戶的訂單清單

現在我們為 Web 建立一個 BFF，統一提供 `/profile/:id` 接口，回傳使用者基本資訊與訂單清單。

### BFF 架構（Node.js + Express）

```javascript
// bff/web-server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/profile/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [userRes, ordersRes] = await Promise.all([
      axios.get(`http://users-service/users/${userId}`),
      axios.get(`http://orders-service/orders/user/${userId}`)
    ]);

    res.json({
      user: userRes.data,
      orders: ordersRes.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('資料取得失敗');
  }
});

app.listen(3000, () => {
  console.log('BFF for Web running at http://localhost:3000');
});
```

### 使用說明

- 前端只需呼叫 `GET /profile/123` 即可拿到整合後的資料。
- BFF 內部負責跟不同服務串接、組裝、錯誤處理與轉換格式。

---

## 六、BFF 和 GraphQL 的關係

GraphQL 本身也常用於 BFF 的實作方式之一。透過 GraphQL：

- 前端可以自己定義要的欄位（防止 over-fetch）
- 可以統一查詢不同來源資料（類似 BFF 的聚合邏輯）
- 可搭配 Apollo Server 快速搭建

**BFF 可以使用 REST，也可以使用 GraphQL，取決於前後端的需求與團隊熟悉度。**

---

## 七、延伸應用：BFF 搭配微前端（Micro Frontend）

當前端本身也是多團隊分工、模組化（例如大型企業的後台管理系統），BFF 可以依照模組拆分，例如：

- Order 模組對應一個 BFF
- Admin 模組對應另一個 BFF

讓後端資料與前端 UI 模組相對應，利於組織協作與部署。

---

## 八、總結

| 面向 | 傳統 API | BFF 架構 |
|------|-----------|-----------|
| 資料格式 | 後端決定 | 針對前端定製 |
| 跨平台支援 | 不佳 | 良好 |
| 前端彈性 | 低 | 高 |
| 擴充性 | 中 | 高 |
| 成本 | 低 | 中～高（需維護 BFF） |

BFF 並不是萬靈丹，但在多平台、多樣前端需求的專案中，非常實用，能夠有效地降低溝通成本、提升開發效率，並提供更佳的 API 使用體驗。

如果你的團隊正在建構大型應用系統，或前端開發頻繁改動，不妨考慮導入 BFF 架構，讓前後端協作更流暢、更可維護。

## 參考文件
1. [Backend For Frontend 前端模式的後端](https://hackmd.io/@yaahsin/BJPCnvnLh)
2. [前端開發者該負責寫 API Endpoints 嗎？The Backend For Frontend Pattern (BFF) In Microservices World](https://medium.com/starbugs/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E8%80%85%E8%A9%B2%E8%B2%A0%E8%B2%AC%E5%AF%AB-api-endpoints-%E5%97%8E-the-backend-for-frontend-pattern-bff-in-microservices-world-1368362c141c)
3. [Backends for Frontends pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)
4. [Backend for frontend (BFF) pattern— why do you need to know it?](https://medium.com/mobilepeople/backend-for-frontend-pattern-why-you-need-to-know-it-46f94ce420b0)