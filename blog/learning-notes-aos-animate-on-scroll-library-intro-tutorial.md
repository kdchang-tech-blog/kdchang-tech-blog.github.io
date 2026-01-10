---
title: AOS（Animate On Scroll Library）入門教學筆記 | 學習筆記
date: 2024-09-01 02:23:41
author: kdchang
tags: 
    - AOS
    - Animate On Scroll Library
    - css
    - JavaScript

---

# 前言
在現代網頁設計中，視覺效果和互動性已經成為提升使用者體驗的重要元素。當使用者向下滾動頁面時，如果某些區塊能夠平滑地出現、滑入、淡入或放大，能大大提升網站的專業感和吸引力。這類效果通常被稱為「滾動動畫」。

[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) 是一個輕量級的 JavaScript 函式庫，讓你可以輕鬆地為 HTML 元素加上動畫效果，並且在元素進入畫面時自動播放動畫。它不需要你手動寫 JavaScript 控制事件，也不依賴大型框架，學習曲線平緩，非常適合想快速加上動畫效果的開發者。

---

## 一、AOS 的特點

- **輕量**：只有數十 KB，對效能影響小。
- **易於使用**：只需要加幾個 `data-aos` 屬性在 HTML 元素上即可。
- **可自訂動畫**：支援動畫類型、延遲時間、持續時間、執行次數等調整。
- **無框架依賴**：可搭配純 HTML/CSS/JS 使用，也支援 React、Vue 等框架。
- **良好的瀏覽器支援**：支援所有現代瀏覽器。

---

## 二、如何安裝 AOS

### 方法一：使用 CDN（最簡單方式）

在你的 HTML 檔案 `<head>` 加入 CSS：

```html
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
```

在 `<body>` 結尾加入 JS：

```html
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init();
</script>
```

### 方法二：透過 npm 安裝（建議在模組化專案中使用）

```bash
npm install aos --save
```

在你的 JavaScript 中引入與初始化：

```js
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
```

---

## 三、基本用法

只要在 HTML 元素上加入 `data-aos` 屬性即可。例如：

```html
<div data-aos="fade-up">
  這段文字將會在滾動時從下方淡入出現
</div>
```

### 常見的動畫效果：

| 效果名稱     | 說明                     |
|--------------|--------------------------|
| fade         | 淡入                     |
| fade-up      | 向上淡入                 |
| fade-down    | 向下淡入                 |
| fade-left    | 向左淡入                 |
| fade-right   | 向右淡入                 |
| zoom-in      | 放大淡入                 |
| zoom-out     | 縮小淡入                 |
| flip-left    | 向左翻轉進場             |
| slide-up     | 向上滑入                 |
| slide-down   | 向下滑入                 |

---

## 四、進階設定

AOS 提供許多自訂參數，以下為常用屬性說明：

### 1. `data-aos-duration`

動畫持續時間（毫秒），預設為 400ms：

```html
<div data-aos="fade-up" data-aos-duration="1000">
  動畫持續 1 秒
</div>
```

### 2. `data-aos-delay`

動畫延遲時間（毫秒），可用來讓多個元素依序出現：

```html
<div data-aos="fade-up" data-aos-delay="0">第一個</div>
<div data-aos="fade-up" data-aos-delay="200">第二個</div>
<div data-aos="fade-up" data-aos-delay="400">第三個</div>
```

### 3. `data-aos-once`

設定是否只執行一次動畫（預設為 false，表示每次滾動進入都會重新動畫）：

```html
<div data-aos="fade-up" data-aos-once="true">
  只播放一次動畫
</div>
```

### 4. `data-aos-offset`

控制動畫啟動前的滾動距離（單位：像素）：

```html
<div data-aos="fade-up" data-aos-offset="300">
  滾動到距離螢幕頂端 300px 時才開始動畫
</div>
```

---

## 五、實際範例

以下是一個完整的簡單 HTML 範例：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <title>AOS 教學範例</title>
  <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
  <style>
    body {
      font-family: sans-serif;
      padding: 0;
      margin: 0;
    }
    section {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border-bottom: 1px solid #ccc;
    }
  </style>
</head>
<body>

  <section>
    <div data-aos="fade-up">第一個區塊</div>
  </section>

  <section>
    <div data-aos="zoom-in" data-aos-delay="200">第二個區塊</div>
  </section>

  <section>
    <div data-aos="slide-left" data-aos-duration="800">第三個區塊</div>
  </section>

  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>

</body>
</html>
```

你可以將這段程式碼儲存為 HTML 檔案後，直接打開瀏覽器觀看滾動動畫效果。

---

## 六、常見問題與注意事項

1. **AOS 沒有效果？**  
   確認你有正確載入 `aos.css` 和執行 `AOS.init()`。

2. **元素進入畫面但沒有動畫？**  
   嘗試調整 `data-aos-offset` 或確認元素是否真的進入視窗中。

3. **動畫無法重複？**  
   預設會重複，除非你加上了 `data-aos-once="true"`。

4. **與 SPA 框架（如 React、Vue）整合時動畫失效？**  
   動態渲染的頁面需在 DOM 更新完後重新執行 `AOS.refresh()`。

---

## 總結

AOS 是一個非常實用又容易上手的前端動畫工具。你不需要寫複雜的 JavaScript，只要加幾行 `data-aos` 屬性就能為你的網站加入吸引人的動態效果。無論是製作個人作品集、商業網站或展示頁面，AOS 都是快速提升視覺層次感的絕佳利器。

當你需要更細緻的動畫控制或複雜的交互邏輯，也可以進一步探索 `GSAP`、`ScrollMagic` 等更強大的動畫工具。但若只是想快速達到流暢的滾動動畫，AOS 絕對是一個值得推薦的選擇。

## 參考文件
1. [gsap](https://gsap.com/)
2. [scrollmagic](https://scrollmagic.io/)