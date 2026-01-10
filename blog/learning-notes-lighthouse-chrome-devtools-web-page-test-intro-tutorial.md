---
title: 網站效能診斷入門教學：Lighthouse、Chrome DevTools 與 WebPageTest 實戰指南 | 學習筆記
date: 2024-03-20 11:33:41
author: kdchang
tags:
  - Lighthouse
  - Chrome DevTools
  - WebPageTest
  - 網站效能
---

## 前言

現今網站的使用者體驗與載入速度息息相關，無論是 SEO 排名、使用者留存率或轉換率，都受到頁面效能影響。為了協助開發者精準找出網站瓶頸，Google 與其他組織提供了多種強大的診斷工具，其中最常用且具代表性的就是 Lighthouse、Chrome DevTools 與 WebPageTest。

本篇教學筆記將介紹這三種工具的基礎使用方法與診斷技巧，幫助我們從初學者也能迅速上手，實際分析與優化網站效能。

---

## 重點摘要

### 一、Lighthouse：全方位效能檢測工具

- Google 提供的開源工具，可分析網站效能、可存取性、SEO、最佳實踐等面向
- 可直接從 Chrome DevTools 或使用 CLI、CI 工具啟用
- 評分以 0 ～ 100 呈現，並提供具體優化建議

### 二、Chrome DevTools：開發者內建利器

- 即時查看資源載入時間、執行效能、DOM 結構變動與網頁回應
- 適合追蹤 JavaScript 執行瓶頸、CSS 回流與重繪等細節
- 提供 Coverage 與 Performance 分析工具，可定位未使用程式碼與長任務

### 三、WebPageTest：真實環境模擬工具

- 可選擇不同地區、裝置與網路條件進行測試，模擬真實用戶情境
- 顯示詳細瀏覽器載入瀑布圖與視覺呈現速度
- 適合做跨國網站或行動裝置載入效能的驗證

---

## 實際範例操作

以下以一個虛擬電商網站首頁為例，展示如何使用三種工具進行效能診斷：

---

### 一、使用 Lighthouse 快速評估整體效能

1. 首先，開啟 Chrome，瀏覽欲診斷的頁面
2. 按下 `F12` 或右鍵「檢查」開啟開發者工具
3. 點選上方分頁中的「Lighthouse」
4. 選擇測試裝置類型（建議選 Mobile）與檢測類型（建議全選）
5. 點擊「Generate report」開始分析

#### 分析結果：

- **Performance** 得分僅有 45，顯示首次繪製（FCP）與最大內容繪製（LCP）時間過長
- 建議項目包含：

  - 移除未使用 JavaScript（節省 800KB）
  - 延遲載入非關鍵第三方資源
  - 圖片未壓縮且未啟用 lazy loading

---

### 二、使用 Chrome DevTools 找出瓶頸細節

#### 使用 Network 分頁觀察資源載入：

1. 開啟「Network」分頁並刷新頁面
2. 可看到：

   - 主頁面共載入 150 多個資源
   - 初始 JavaScript bundle 超過 2MB
   - 字體與圖片資源沒有使用快取（Status 200）

#### 使用 Performance 分頁錄製頁面加載過程：

1. 點選「Performance」分頁，按下「Record」
2. 刷新頁面並等待數秒，按下「Stop」
3. 分析結果顯示：

   - 主執行緒中有多個長任務（超過 50ms）
   - 某第三方追蹤腳本佔用主執行緒 600ms
   - 大量 DOM 節點修改導致 Layout Shift（CLS 分數高）

#### 使用 Coverage 分頁掃描未使用程式碼：

1. 使用 `Ctrl+Shift+P` 開啟命令列
2. 輸入「Coverage」並啟用功能
3. 點選「Reload & Start Capturing Coverage」
4. 結果顯示：

   - 主要 CSS 檔案使用率僅 18%
   - JavaScript 檔案使用率 35% 左右

---

### 三、使用 WebPageTest 模擬不同環境下的體驗

1. 進入 [https://www.webpagetest.org](https://www.webpagetest.org)
2. 輸入目標網站網址，選擇測試地點（如東京）與設備（如 Android + 3G 網路）
3. 點擊「Start Test」

#### 分析結果：

- **First Byte Time** 達 1.2 秒，伺服器回應偏慢
- **Speed Index** 高達 6500，顯示可視畫面建立時間過長
- 瀑布圖顯示首頁載入依賴超過 50 個 JS 檔案，部分為同步載入

---

## 總結與行動建議

網站效能優化並非一次性的修補，而是需要透過持續監控與工具診斷的長期工程。Lighthouse 提供了入門評估的方向，Chrome DevTools 協助你深入定位細節，WebPageTest 則讓你檢視在真實用戶情境中的行為。

建議每次上線新功能或導入第三方資源後，皆定期進行這三種工具的檢測，確保網站在不同網路、不同裝置下都有良好的使用者體驗。
