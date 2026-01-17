---
title: Chrome Extension 入門教學筆記 | 學習筆記
date: 2024-12-20 11:33:41
authors: kdchang
tags:
  - Chrome Extension
  - Chrome
---

## 前言

Chrome Extension（Chrome 擴充功能）是針對 Google Chrome 瀏覽器開發的瀏覽器插件，能夠延伸瀏覽器的功能，提供更高效的使用體驗。你可以用它來自動化操作、強化 UI、增加捷徑、記錄內容、攔截請求等等。

本教學將介紹 Chrome Extension 的基本架構、開發流程與一個簡單的實作範例，協助你快速入門。

---

## 重點摘要

1. **基本架構：**

   - `manifest.json`：擴充功能的核心設定檔
   - `background.js` / `service_worker.js`：背景邏輯（例如攔截請求、常駐任務）
   - `popup.html` + `popup.js`：點擊圖示後的互動 UI
   - `content.js`：注入頁面的腳本，直接與 DOM 互動

2. **開發步驟：**

   - 建立資料夾結構與設定檔
   - 撰寫功能腳本與 UI
   - 在 Chrome 中載入未封裝的擴充功能
   - 測試與除錯

3. **核心權限與功能：**

   - `permissions` 欄位需指定所需功能（如 `tabs`, `storage`, `scripting`）
   - `host_permissions` 控制哪些網站允許注入腳本
   - 可與頁面雙向通訊

4. **常見用途：**

   - 提高生產力（截圖、標記、翻譯）
   - 資料擷取與分析（網頁爬蟲輔助）
   - 儲存內容（書籤、待辦清單）
   - 網站 UI 客製化

---

## 實際範例：儲存選取文字的小擴充功能

### 功能簡介

當使用者在網頁上選取一段文字並點擊擴充功能圖示，會將選取的文字儲存到 `localStorage`，方便後續檢視。

---

### 1. 專案結構

```
my-extension/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
```

---

### 2. manifest.json

```json
{
  "manifest_version": 3,
  "name": "Save Selected Text",
  "version": "1.0",
  "description": "儲存網頁中選取的文字",
  "permissions": ["scripting", "storage"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

---

### 3. popup.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>已儲存文字</title>
  </head>
  <body>
    <h3>你儲存的文字：</h3>
    <ul id="text-list"></ul>
    <script src="popup.js"></script>
  </body>
</html>
```

---

### 4. popup.js

```js
document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.local.get(['savedTexts'], (result) => {
    const list = document.getElementById('text-list');
    const texts = result.savedTexts || [];
    texts.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  });
});
```

---

### 5. content.js

```js
document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.storage.local.get(['savedTexts'], (result) => {
      const current = result.savedTexts || [];
      current.push(selectedText);
      chrome.storage.local.set({ savedTexts: current });
    });
  }
});
```

---

### 6. 載入擴充功能

1. 打開 Chrome 瀏覽器
2. 前往 `chrome://extensions/`
3. 開啟右上角「開發人員模式」
4. 點選「載入未封裝項目」
5. 選取專案資料夾（my-extension）

---

### 7. 測試方式

1. 任意打開一個網頁
2. 選取文字後放開滑鼠
3. 點擊瀏覽器右上角的擴充功能圖示
4. 在彈出的視窗中查看剛才儲存的文字

---

## 小技巧與補充

- **使用 TypeScript**：可結合 `Vite` 或 `webpack` 實現模組化開發。
- **Hot Reload**：透過專案如 `crxjs` 可達成自動刷新套件。
- **權限最小化原則**：僅使用必要權限以通過審核。
- **Storage API**：可選擇使用 `localStorage`、`chrome.storage.local`、`sync` 等不同儲存方式。
- **message passing**：背景與 content script 可用 `chrome.runtime.sendMessage` 溝通。

---

## 總結

Chrome Extension 是一個強大的平台，讓開發者能以 HTML、CSS、JavaScript 等前端技術打造自己的工具。無論是為了解決個人需求、改善使用體驗，還是作為產品 MVP 的雛型開發平台，Chrome Extension 都是值得投資時間學習的技術。

從簡單的文字儲存開始，你可以慢慢拓展功能，加入右鍵選單、快捷鍵、網頁改寫、API 串接等高階應用，打造出屬於你自己的瀏覽器擴充小工具。
