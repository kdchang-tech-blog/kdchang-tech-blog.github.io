---
title: Progressive Web App（PWA）入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - PWA
  - Progressive Web App
  - ES Module
---

## 一、前言

在行動裝置普及的今天，使用者越來越期待 Web 應用程式能提供與原生 App 相近的使用體驗。然而，傳統 Web 應用程式在離線支援、效能與通知推送等方面仍有所不足。為了彌補這些缺點，**Progressive Web App（PWA）** 應運而生。

PWA 結合了 Web 技術與原生 App 的優勢，使網站具備離線可用、快速載入、可安裝、推播通知等功能，進而提升使用者體驗與互動黏著度。對開發者而言，PWA 是一種較低成本就能達到跨平台效果的解法。本文將帶你快速認識 PWA 的核心概念與實作方式，適合初學者或 Web 開發者作為入門參考。

---

## 二、重點摘要

- **PWA 定義**：一種利用現代 Web API 提供類似原生 App 體驗的 Web 應用程式。
- **三大核心技術**：

  - **HTTPS**：保護傳輸安全並啟用 Service Worker。
  - **Web App Manifest**：描述應用程式的基本資訊，例如名稱、圖示、顯示模式等。
  - **Service Worker**：一種可攔截網路請求並實現快取、離線功能的背景腳本。

- **PWA 特性**：

  - 可安裝（Installable）
  - 離線可用（Offline capable）
  - 背景推播（Push Notification）
  - 響應式設計（Responsive）
  - 快速載入（Fast loading）

- **使用情境**：

  - 新創或中小企業開發跨平台 App
  - 強化使用者體驗的內容網站或工具型網站
  - 電商網站提升轉換率與留存

---

## 三、實際範例：打造一個簡單的 PWA

我們將從零開始建立一個基本的 PWA 網站，具備可安裝與離線快取功能。

### 1. 建立專案目錄與基本檔案

建立一個資料夾，內含下列檔案：

```
pwa-demo/
├── index.html
├── app.js
├── service-worker.js
├── manifest.json
```

### 2. 撰寫 `index.html`

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PWA Demo</title>
    <link rel="manifest" href="manifest.json" />
  </head>
  <body>
    <h1>Hello, PWA!</h1>
    <script src="app.js"></script>
  </body>
</html>
```

### 3. 撰寫 `manifest.json`

```json
{
  "name": "PWA Demo",
  "short_name": "PWADemo",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

請準備對應的 `icon-192.png` 與 `icon-512.png` 圖示檔案放入根目錄。

### 4. 撰寫 `app.js` 並註冊 Service Worker

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((reg) => {
        console.log('Service Worker 註冊成功:', reg.scope);
      })
      .catch((err) => {
        console.log('Service Worker 註冊失敗:', err);
      });
  });
}
```

### 5. 撰寫 `service-worker.js`

```js
const CACHE_NAME = 'pwa-demo-cache-v1';
const urlsToCache = ['/', '/index.html', '/app.js', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
```

### 6. 本地測試與部署

PWA 需在 HTTPS 或 localhost 環境下運行，因此建議使用以下方式測試：

```bash
npx serve
```

或是使用 VS Code 的 Live Server 插件。

---

## 四、補充建議與工具

- **Lighthouse**：使用 Chrome DevTools 的 Lighthouse 工具分析網站是否符合 PWA 標準。
- **Workbox**：Google 提供的套件，簡化 Service Worker 撰寫與管理。
- **Vite / Next.js**：這些框架和建造工具支援套件快速啟用 PWA，例如 Vite Plugin PWA。

---

## 五、總結

Progressive Web App 是 Web 應用向原生體驗邁進的重要里程碑。透過簡單的設計與實作，我們可以為網站加入離線能力、安裝功能與更佳的效能表現。PWA 不僅提升使用者體驗，也為開發者帶來更高的轉換率與技術可能性。若你正考慮提升網站互動性與可達性，不妨從簡單的 PWA 嘗試開始，逐步拓展應用場景與技術深度。
