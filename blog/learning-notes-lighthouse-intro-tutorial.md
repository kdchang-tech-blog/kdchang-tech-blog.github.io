---
title: Google Lighthouse 介紹與入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
author: kdchang
tags:
  - Jest
  - ES Module
---

### 一、什麼是 Lighthouse？

**Google Lighthouse** 是 Google 開發的開源自動化工具，主要用來評估網頁的品質，包含 **效能 (Performance)、無障礙 (Accessibility)、最佳化 (Best Practices)、SEO、漸進式網頁應用 (PWA)** 等五大面向。透過 Lighthouse，開發者可以快速找到網站問題與優化建議，幫助網站在使用者體驗與搜尋引擎上表現更好。

Lighthouse 可以透過以下方式執行：

- **Chrome DevTools**（瀏覽器內建）
- **Node.js CLI**（命令列工具）
- **Lighthouse CI**（持續整合工具）
- **Web 版**（[https://pagespeed.web.dev/）](https://pagespeed.web.dev/）)

本教學以 **Chrome DevTools** 為主，搭配 **命令列工具**輔助說明。

---

### 二、如何在 Chrome 使用 Lighthouse

#### 1. 開啟 Chrome DevTools

- 使用 Chrome 瀏覽器打開我們想分析的網站
- 按下 `F12` 或 `Ctrl+Shift+I` (Mac: `Cmd+Option+I`) 開啟 DevTools
- 點選 **「Lighthouse」** 分頁（如果沒有看到，點選 `>>` 更多選項即可）

#### 2. 設定 Lighthouse 報告

在 Lighthouse 分頁中，可以看到幾個選項：

- **Categories**：選擇要測試的項目（預設全選）
- **Device**：選擇模擬裝置（Mobile 或 Desktop）

一般來說，建議從 **Mobile** 開始測試，因為 Google 搜尋主要使用行動端指標作為排名依據。

#### 3. 開始產生報告

設定好後，點擊 **「Analyze page load」**（或「Generate report」），Lighthouse 會開始分析。分析過程會自動重新載入頁面並執行模擬測試，過程大約 30 秒至 1 分鐘。

完成後，會生成一份報告，包含分數、每個項目的問題說明與建議。

---

### 三、報告解讀與優化建議

以下為報告中幾個重要指標：

1. **Performance（效能）**

   - **First Contentful Paint (FCP)**：第一次內容繪製時間
   - **Largest Contentful Paint (LCP)**：主要內容繪製完成時間
   - **Time to Interactive (TTI)**：頁面可互動時間
   - **Cumulative Layout Shift (CLS)**：累積版面位移

**優化方向範例**：

- 壓縮圖片（使用 WebP）
- 延遲非必要 JavaScript 載入（lazy loading）
- 使用 CSS/JS minify 工具
- 啟用瀏覽器快取 (cache)

2. **Accessibility（無障礙）**

   - 圖片是否有 `alt` 屬性
   - 表單元素是否有 `label`
   - 按鈕是否有可辨識的名稱

**優化方向範例**：

- 確保所有互動元件有適當的 ARIA 標籤
- 保持足夠的色彩對比

3. **Best Practices（最佳化）**

   - 是否使用 HTTPS
   - 是否避免過時的 API
   - 檢查瀏覽器安全設定

4. **SEO**

   - 是否有 `meta` 描述
   - 是否設定 `<title>`
   - 是否有 robots.txt
   - 頁面是否可被索引

---

### 四、實際範例：分析一個網頁

前往 `https://example.com` 網站，操作步驟如下：

#### 使用 Chrome DevTools：

1. 用 Chrome 瀏覽 [https://example.com](https://example.com)
2. 開啟 DevTools → Lighthouse 分頁
3. 選擇 **Mobile** + 全部 Categories
4. 點擊 **Analyze page load**

執行後，我們會看到一份報告，例如：

| Category       | Score |
| -------------- | ----- |
| Performance    | 68    |
| Accessibility  | 92    |
| Best Practices | 85    |
| SEO            | 90    |

針對效能分數 68，Lighthouse 會提出具體建議，例如：

- "Serve images in next-gen formats" → 建議將 JPG/PNG 圖片轉換為 WebP
- "Eliminate render-blocking resources" → 建議將 CSS/JS 非同步或延遲載入

此時，我們可以採取以下修正：

- 使用 **ImageMagick** 或 **Squoosh** 等工具壓縮並轉換圖片
- 加上 `<link rel="preload">` 標籤預先載入必要資源
- 將 `script` 標籤加上 `defer` 屬性

---

### 五、使用命令列執行 Lighthouse

如果需要自動化測試或整合到 CI/CD，可以用 Node.js 安裝 Lighthouse：

#### 1. 安裝

```bash
npm install -g lighthouse
```

#### 2. 執行

```bash
lighthouse https://example.com --view
```

執行後會產生一個 HTML 報告並自動打開。

可以用額外參數調整輸出：

```bash
lighthouse https://example.com --output json --output html --output-path ./report.html --preset desktop
```

---

### 六、實務應用與建議

- **開發階段就導入**：開發過程中就應該多次使用 Lighthouse，而不是到上線前才檢查。
- **設定目標分數**：通常建議 Mobile 效能達到 80 分以上。
- **結合 CI/CD**：用 Lighthouse CI 在部署時自動檢查網站品質，確保每次更新不會退步。

如果是大型專案，也可以與 **WebPageTest、PageSpeed Insights** 搭配，取得更廣泛的性能數據。

---

### 七、總結

Google Lighthouse 是一個功能強大的網站品質檢測工具，不僅能協助提升效能，還能兼顧 SEO、無障礙與最佳實務。無論是初學者或資深前端工程師，都建議將 Lighthouse 納入開發流程中，定期檢查與優化，為網站帶來更好的使用者體驗與搜尋排名。

透過本篇教學，相信我們已能夠：

1. 知道如何使用 Chrome DevTools 產生報告
2. 理解報告中指標與優化方式
3. 用命令列執行 Lighthouse 以自動化分析

後續可以根據團隊需求，進一步探索 Lighthouse CI、API 或與其他性能工具整合的進階應用。
