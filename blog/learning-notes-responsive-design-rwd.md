---
title: Responsive Design 響應式設計入門教學筆記 | 學習筆記
date: 2022-06-10 02:23:41
author: kdchang
tags: 
    - Responsive Design
    - 響應式設計
    - RWD
 
---

## Responsive Design 響應式設計入門教學筆記

### 一、什麼是響應式設計

響應式設計 (Responsive Design) 是一種網頁設計方法，使網頁能夠根據不同裝置的螢幕尺寸與解析度，自動調整版面配置，以提供最佳的使用體驗。

### 二、響應式設計的重要概念

#### 1. 視圖 (Viewport)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

這段程式碼放在 `<head>` 標籤內，能讓網頁根據不同裝置寬度調整顯示比例，是響應式設計的基本設定。

#### 2. 流動網格 (Fluid Grid)
使用百分比 (%) 來設定元素的寬度，而非固定的像素 (px)，讓版面能隨螢幕大小調整。

#### 3. 彈性圖片 (Flexible Images)
圖片大小以百分比或 max-width 設定，避免圖片超出容器範圍。

```css
img {
  max-width: 100%;
  height: auto;
}
```

#### 4. 媒體查詢 (Media Queries)
根據裝置螢幕大小套用不同的 CSS 樣式。

```css
@media (max-width: 768px) {
  body {
    background-color: lightgrey;
  }
}
```

### 三、常見的斷點 (Breakpoints)

以下為常見的螢幕寬度斷點，用來針對不同裝置設定樣式：

| 裝置類型 | 斷點寬度 |
|--------|--------|
| 手機    | 0 - 576px |
| 平板    | 577px - 768px |
| 小型桌面 | 769px - 992px |
| 大型桌面 | 993px 以上 |

### 四、實作範例

#### HTML
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>響應式設計範例</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>歡迎來到響應式設計範例</h1>
    <p>這是一個簡單的響應式網頁範例。</p>
</body>
</html>
```

#### CSS
```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: white;
}

h1 {
  text-align: center;
  color: #333;
}

p {
  text-align: center;
  font-size: 16px;
}

@media (max-width: 768px) {
  body {
    background-color: lightblue;
  }
}

@media (max-width: 576px) {
  p {
    font-size: 14px;
  }
}
```

### 五、其他工具

1. Bootstrap：內建響應式網格系統，方便快速開發響應式網頁。
2. Flexbox：簡化版面排列的工具，適合處理彈性佈局。
3. CSS Grid：強大的網格系統，用於建立複雜的版面。

### 六、結語

響應式設計能提升使用者體驗，使網頁能適應不同裝置，有助於 SEO 表現，是現代網頁設計不可忽視的重要技能。



