---
title: chrome.storage.local vs. localStorage：資料儲存方式差異入門教學筆記 | 學習筆記
date: 2024-12-20 11:33:41
authors: kdchang
tags:
  - Chrome Extension
  - Chrome
  - chrome.storage.local
  - localStorage
---

## 前言

在前端與 Chrome 擴充功能（Chrome Extension）開發中，「資料儲存」是一項常見需求。開發者常見的兩種方式為：

- `localStorage`：瀏覽器原生提供的本地儲存 API
- `chrome.storage.local`：Chrome Extension 提供的本地儲存 API

兩者名稱相似，功能也都能儲存 key-value 結構資料，但其用途、行為、效能與限制卻有顯著差異。本篇筆記將帶你掌握這兩者的差別，並透過實作範例協助你在開發時做出正確選擇。

---

## 重點摘要

### 1. 定義與使用場景

- `localStorage` 是 Web API，適用於一般網頁與 Content Script，操作簡便但同步。
- `chrome.storage.local` 是專為 Chrome 擴充功能設計的非同步儲存 API，適用於 Background、Popup、Options、Content Script 等擴充功能組件。

### 2. 主要差異比較

| 項目                       | `chrome.storage.local`            | `localStorage`         |
| -------------------------- | --------------------------------- | ---------------------- |
| API 類型                   | 非同步                            | 同步                   |
| 儲存容量                   | 約 5MB 以上，可依平台調整         | 約 5MB（視瀏覽器而定） |
| 使用範圍                   | 限於 Chrome Extension             | 網頁與 Content Script  |
| 安全性與隔離性             | 高（與其他網站與擴充隔離）        | 中（每個 domain 隔離） |
| 可與 background/popup 共用 | 是                                | 否                     |
| 是否支援跨裝置同步         | 使用 `chrome.storage.sync` 可支援 | 否                     |

### 3. 實作差異

- `localStorage` 使用方式簡單、同步，可立即取得值。
- `chrome.storage.local` 是非同步設計，需透過 callback 或 Promise 取得值。

---

## 實際範例比較

以下為兩者的典型儲存與讀取操作實作方式。

---

### 一、使用 `localStorage`（同步）

#### 儲存資料

```javascript
localStorage.setItem('username', 'kdchang');
```

#### 讀取資料

```javascript
const name = localStorage.getItem('username');
console.log(name); // 輸出：kdchang
```

#### 刪除資料

```javascript
localStorage.removeItem('username');
```

#### 優點與限制

- **優點**：簡單、直覺、無需 callback
- **限制**：無法在 background script 中使用、同步操作可能阻塞 UI、無跨 component 溝通機制

---

### 二、使用 `chrome.storage.local`（非同步）

#### 儲存資料

```javascript
chrome.storage.local.set({ username: 'kdchang' }, () => {
  console.log('儲存成功');
});
```

#### 讀取資料

```javascript
chrome.storage.local.get(['username'], (result) => {
  console.log('讀到的值:', result.username);
});
```

#### 刪除資料

```javascript
chrome.storage.local.remove('username', () => {
  console.log('已刪除 username');
});
```

#### 優點與限制

- **優點**：資料與擴充功能隔離、安全性高、能跨組件共享
- **限制**：需處理非同步流程（可用 async/await 解決）

---

## 實戰應用：擴充功能記錄使用者偏好設定

### 專案背景

你開發了一個可自訂主題配色的擴充功能，使用者可以切換「深色」或「淺色」模式，並希望記錄下來。

---

### localStorage 實作方式（限 Content Script）

```javascript
// 儲存使用者偏好
localStorage.setItem('theme', 'dark');

// 頁面載入時讀取
const theme = localStorage.getItem('theme');
document.body.setAttribute('data-theme', theme);
```

此方法雖然簡便，但無法在 background script、popup 等元件中共用。

---

### chrome.storage.local 實作方式（推薦）

```javascript
// 儲存
chrome.storage.local.set({ theme: 'dark' }, () => {
  console.log('儲存主題成功');
});

// 讀取
chrome.storage.local.get(['theme'], (result) => {
  document.body.setAttribute('data-theme', result.theme || 'light');
});
```

這種方式可讓 background.js、popup.html、options.html 都能取得相同資料，並透過 message passing 進一步溝通。

---

## 使用建議與最佳實踐

### 選擇依據：

- **Chrome Extension 專案開發時**：建議一律使用 `chrome.storage.local`，搭配 async/await 管理非同步流程。
- **Content Script 或網頁前端小工具**：若不考慮擴充功能架構，可使用 `localStorage` 快速開發。

### 注意事項：

- `chrome.storage.local` 每次寫入都是非同步，避免過度頻繁更新（例如輸入框每秒觸發）
- `localStorage` 資料若寫入太大或格式不當，可能造成同步錯誤或被清除

---

## 總結

| 問題                                              | 建議做法                        |
| ------------------------------------------------- | ------------------------------- |
| 在 popup、background、content script 共享設定資料 | 使用 `chrome.storage.local`     |
| 快速暫存使用者動作、不需跨頁                      | 可用 `localStorage`             |
| 需考慮非同步、可擴充、跨頁共享與安全性            | 優先使用 `chrome.storage.local` |

`chrome.storage.local` 與 `localStorage` 各有適用場景與特點，選擇時需考量使用環境、效能、安全性與 API 特性。透過本文你應該能更清楚何時該用哪一種方式，並應用在擴充功能與網頁開發中，打造穩定且高效的儲存邏輯。
