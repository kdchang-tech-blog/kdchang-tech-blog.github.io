---
title: 前端 i18n 入門教學與注意事項整理筆記 | 學習筆記
date: 2025-01-14 02:23:41
authors: kdchang
tags:
  - i18n
  - react
  - vue
---

## 前言

在現今的全球化應用中，網站或產品若希望觸及更多用戶，提供多語系支援幾乎是必須的功能。這就是所謂的國際化（Internationalization，簡稱 i18n），意即在程式設計階段預先做好結構設計，使系統能根據不同語言與地區的需求，自動載入對應的文案、格式與顯示方式。

本篇筆記將說明前端 i18n 的核心觀念、開發時常見的注意事項，以及如何透過實際程式碼實作一個簡單的多語系功能，協助你快速掌握前端 i18n 的基本功。

---

## 重點摘要：i18n 實作注意事項

1. **避免硬編碼文字**：所有顯示文字應抽離為 key-value 翻譯檔，便於日後維護與翻譯。
2. **使用成熟 i18n 套件**：例如 React 的 `react-i18next`、Vue 的 `vue-i18n`。
3. **結構化管理翻譯檔案**：依功能模組分類翻譯內容，避免 key 混亂或重複。
4. **支援變數插值與格式化**：例如姓名、時間、數字等內容應透過參數傳遞給翻譯函數。
5. **避免字串拼接組合句子**：不同語言語序不同，拼接容易導致語意錯誤。
6. **設計 UI 時預留文字空間**：不同語言的字串長度可能差異很大。
7. **處理 RTL 語言與排版**：如阿拉伯語需設定 `direction: rtl`，必要時翻轉 UI。
8. **提供語系切換機制與偵測**：可從 `navigator.language`、URL、cookie 判斷語系。
9. **設計 fallback 機制**：若某語系未翻譯的 key，應自動 fallback 至預設語系。
10. **翻譯流程建議自動化與工具化**：搭配翻譯平台（如 Lokalise、Crowdin）管理翻譯流程與品質。

---

## 實作範例：使用 React + react-i18next 實現簡單的 i18n 功能

假設我們有一個需要支援中英文切換的 React 專案，以下將一步步實作基本功能。

### 步驟一：安裝相關套件

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 步驟二：建立翻譯檔案（放在 `src/locales/`）

**src/locales/en/translation.json**

```json
{
  "greeting": "Hello, {{name}}!",
  "home": {
    "title": "Welcome to the homepage"
  }
}
```

**src/locales/zh/translation.json**

```json
{
  "greeting": "哈囉，{{name}}！",
  "home": {
    "title": "歡迎來到首頁"
  }
}
```

### 步驟三：初始化 i18n 設定（src/i18n.js）

```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### 步驟四：在應用入口引入 i18n 設定（例如 index.js）

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';

ReactDOM.render(<App />, document.getElementById('root'));
```

### 步驟五：在元件中使用翻譯

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('greeting', { name: 'KD' })}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>
    </div>
  );
}

export default HomePage;
```

### 預期畫面輸出

使用者進入頁面，根據瀏覽器語言自動載入對應語系，或透過按鈕切換語言：

```
歡迎來到首頁
哈囉，KD！
[English] [中文]
```

---

## 總結

i18n 是每個想要「走向國際」的產品所必備的基礎建設之一。透過妥善設計的翻譯架構與工具整合，不僅能提升使用者體驗，也有助於日後擴展新市場與新語系。

建議開發者在專案初期就規劃好 i18n 架構，並搭配良好的團隊流程與翻譯管理工具，將繁瑣的翻譯作業系統化，避免日後重構的成本。
