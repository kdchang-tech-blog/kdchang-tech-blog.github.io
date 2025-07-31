---
title: Web 前端效能優化入門教學筆記 | 學習筆記
date: 2024-10-16 11:33:41
author: kdchang
tags:
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - css
  - web
  - 前端效能
  - frontend engineer
---

# 前言

在網頁開發中，效能優化是一個不可忽視的重要課題。無論是企業網站、單頁應用（SPA），或是電商平台，效能表現都直接影響使用者體驗與轉換率。

本篇筆記將介紹 Web 前端效能優化的核心概念、常見策略與實務範例，幫助你為專案建立良好的基礎。

---

## 為什麼需要前端效能優化？

前端效能不佳會導致：

- 首次載入時間過長
- 使用者等待過久，產生跳出行為
- SEO 表現不佳（Google 會參考 LCP、CLS、FCP 等指標）

透過有效的優化策略，我們能讓網站更快、更穩、更吸引人。

---

## 效能優化的三個層面

1. **載入效能（Loading Performance）**：提升頁面初始載入速度。
2. **互動效能（Interaction Performance）**：優化點擊、滑動等互動的流暢度。
3. **渲染效能（Rendering Performance）**：減少重繪、重排與動畫卡頓。

---

## 一、減少不必要的資源請求

### 使用 CDN

透過 CDN（Content Delivery Network）可將靜態資源分發到全球節點，加速載入。

```html
<!-- 使用 Google Fonts CDN -->
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
```

### 合併與壓縮資源（Minify & Bundle）

使用打包工具如 Webpack、Vite，可以：

- 將 JS / CSS 壓縮（Minify）
- 移除註解與空白
- 合併多個檔案減少 HTTP 請求數量

#### 範例（Webpack 設定簡略）：

```js
// webpack.config.js
module.exports = {
  mode: 'production', // 自動啟用壓縮
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
};
```

---

## 二、圖片與多媒體優化

### 適當圖片格式

- 使用 **WebP** 或 **AVIF** 取代 JPEG / PNG，可減少檔案體積 25% 以上
- SVG 適用於圖示與 icon，解析度不會失真

### 延遲載入圖片（Lazy Loading）

```html
<img src="thumbnail.jpg" loading="lazy" alt="延遲載入圖片" />
```

或搭配 JavaScript 實現滾動載入。

---

## 三、有效使用 Cache（快取）

### 設定 Cache-Control 標頭

在伺服器上設定靜態資源快取策略：

```http
Cache-Control: max-age=31536000, immutable
```

適用於版本化的資源檔案（如 `main.123abc.js`），可快取一年不變。

---

## 四、精簡 CSS 與 JavaScript

### 移除未使用的 CSS（Tree Shaking）

使用工具如 **PurgeCSS**、**TailwindCSS JIT Mode** 可自動剔除沒用到的樣式。

#### PurgeCSS 使用方式（簡略）：

```js
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html'],
    }),
  ],
};
```

### 延遲載入 JS（Defer / Async）

```html
<script src="main.js" defer></script>
```

- `defer`: 等 DOM 解析完才執行，不阻塞渲染
- `async`: 載入完成即執行，適合非必要腳本（如 GA）

---

## 五、避免過度重排與重繪

### 使用 class 切換取代 style 修改

重複直接操作 DOM style 屬性會導致效能下降，改用 CSS class 控制樣式較佳。

```js
// 不推薦
element.style.width = '100px';
element.style.height = '50px';

// 推薦
element.classList.add('resized');
```

```css
.resized {
  width: 100px;
  height: 50px;
}
```

### 使用 `transform` 與 `opacity` 進行動畫

避免透過 `top`、`left`、`width` 等影響 layout 的屬性來做動畫。

```css
/* 推薦做法：使用 transform */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.05);
}
```

---

## 六、最佳化 DOM 結構與渲染

- 減少過深的 DOM 巢狀結構
- 使用虛擬滾動（Virtual Scroll）載入大量列表
- 避免頻繁操作 DOM，應該一次性改動（使用 DocumentFragment 或 requestAnimationFrame）

---

## 七、使用開發工具檢查效能

### Chrome DevTools

1. **Lighthouse**：提供整體效能建議
2. **Performance Panel**：檢查 JS 執行、動畫、Layout shift 等問題
3. **Network Panel**：觀察資源大小、載入順序與快取狀態

---

## 總結與建議實作順序

若你剛開始進行專案的效能優化，可以依照以下順序著手：

1. 壓縮與合併 JS / CSS
2. 圖片格式轉換與 Lazy Load
3. CDN 部署靜態資源
4. 移除未使用樣式與延遲載入腳本
5. 改善動畫與 DOM 操作
6. 導入快取策略
7. 使用 Lighthouse 檢查並優化問題

效能優化並非一次性工作，而是一個持續調整的過程。建議我們可以從專案開始就納入效能考量，將它當成基本開發原則來實踐。

## 參考文件

1. [Core Web Vitals: An everyday explanation (Taiwanese with English subtitles)](https://www.youtube.com/watch?v=evrNn54UkHQ)
