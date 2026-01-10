---
title: CSS Animation 入門教學筆記 | 學習筆記
date: 2024-11-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - css
    - Animation
    - transition
    - transform
    - frontend engineer

---

# 前言

在現代網頁開發中，動畫是一種強而有力的表現手法，能提升使用者體驗，使介面更加生動、有趣。相比 JavaScript，CSS Animation 提供一種更簡潔、性能更佳的動畫解法，尤其適合製作 UI 中的小型動畫效果。

本篇教學筆記將介紹 CSS Animation 的基本語法、常見屬性與一個實際範例，幫助你快速上手。

---

## 為什麼使用 CSS Animation？

CSS Animation 的優點：

1. **簡單易用**：使用純 CSS 撰寫動畫，不需額外 JavaScript。
2. **效能佳**：瀏覽器針對 CSS Animation 做過優化，效能較好。
3. **語意清楚**：樣式與行為分離，程式碼結構清晰。

---

## 基本語法

CSS 動畫的基本概念分為兩大部分：

1. `@keyframes`：定義動畫的每個階段（狀態）
2. 動畫屬性（如 `animation-name`、`animation-duration` 等）：設定動畫的名稱、時間、重複次數等

### 1. 定義動畫步驟：`@keyframes`

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

也可以使用百分比表示中間過程：

```css
@keyframes moveBox {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}
```

### 2. 套用動畫屬性

```css
.box {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
```

也可以使用簡寫語法：

```css
animation: fadeIn 1s ease-in-out 0s 1 forwards;
```

---

## 常見屬性說明

| 屬性                     | 說明 |
|--------------------------|------|
| `animation-name`         | 對應的 `@keyframes` 名稱 |
| `animation-duration`     | 動畫持續時間（如 `2s`、`500ms`） |
| `animation-delay`        | 動畫延遲時間 |
| `animation-iteration-count` | 播放次數（數字或 `infinite`） |
| `animation-direction`    | 播放方向（如 `normal`、`reverse`、`alternate`） |
| `animation-timing-function` | 動畫速度曲線（如 `linear`、`ease`、`ease-in-out`、`cubic-bezier`） |
| `animation-fill-mode`    | 動畫結束後元素狀態（如 `none`、`forwards`、`backwards`、`both`） |

---

## 實際範例：淡入移動效果

### HTML

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Animation 入門範例</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="animated-box">Hello CSS Animation</div>
</body>
</html>
```

### CSS（style.css）

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.animated-box {
  padding: 20px 40px;
  background-color: #4a90e2;
  color: white;
  font-size: 24px;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeSlideIn 1s ease-out forwards;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 效果說明

當頁面載入時，`.animated-box` 元素會從下方淡入移動到原位。這種效果常用於元件出現時的動畫，例如：卡片載入、提示訊息出現等。

---

## 進階補充

### 多個動畫階段

可以使用百分比定義多個狀態：

```css
@keyframes bounce {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-50px); }
  50%  { transform: translateY(0); }
  70%  { transform: translateY(-25px); }
  100% { transform: translateY(0); }
}
```

### 搭配 `hover` 做互動動畫

```css
.button {
  transition: transform 0.3s ease;
}

.button:hover {
  transform: scale(1.1);
}
```

雖然這是使用 `transition`，但若需要更多控制，就可以改用 `animation`。

---

## 總結

CSS Animation 提供一套簡潔的方式，能有效為網頁增添動態效果。適合使用在進場動畫、提示動畫、狀態變化等場合。若需求單純、動畫步驟不複雜，建議優先使用 CSS Animation 來取代 JavaScript，提升效能與維護性。

如果你剛開始學前端，建議從觀察現有網站的動畫效果出發，試著模仿並自己實作，會對 CSS Animation 有更深的理解。下一步你可以學習 `transition`、`transform` 與 `cubic-bezier`，讓動畫更自然、細緻。