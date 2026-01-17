---
title: HTML & CSS 切版入門教學筆記 | 學習筆記
date: 2024-07-02 02:23:41
authors: kdchang
tags: 
    - HTML
    - CSS
    - 切版

---

# 1. HTML 基礎概念

HTML（HyperText Markup Language）是網頁的基礎結構，透過標籤（Tag）定義不同的內容與結構。

### 1.1 常見標籤

- `<!DOCTYPE html>`：宣告 HTML 文件類型。
- `<html>`：HTML 文件的根標籤。
- `<head>`：包含頁面設定、SEO 資訊、CSS 連結等。
- `<title>`：設定網頁標題。
- `<body>`：放置頁面可見內容。
- `<h1> ~ <h6>`：標題。
- `<p>`：段落。
- `<a>`：超連結。
- `<img>`：圖片。
- `<ul>`、`<ol>`、`<li>`：無序與有序列表。
- `<div>`：區塊。
- `<span>`：行內元素。
- `<table>`、`<tr>`、`<td>`：表格。

### 1.2 HTML5 新增語意標籤

- `<header>`：頁首。
- `<nav>`：導航。
- `<section>`：區段。
- `<article>`：獨立內容。
- `<aside>`：側邊欄。
- `<footer>`：頁尾。

# 2. CSS 基礎概念

CSS（Cascading Style Sheets）用於設計與美化 HTML 元素。

### 2.1 CSS 引入方式

- **內嵌樣式（Inline Style）**：直接寫在 HTML 標籤內，例如：
  ```html
  <p style="color: red; font-size: 16px;">這是一段文字</p>
  ```
- **內部樣式（Internal Style）**：寫在 `<style>` 標籤內，例如：
  ```html
  <style>
    p { color: blue; font-size: 18px; }
  </style>
  ```
- **外部樣式（External Style）**：將 CSS 放入 `.css` 文件中，再用 `<link>` 連結，例如：
  ```html
  <link rel="stylesheet" href="styles.css">
  ```

### 2.2 CSS 選擇器

- **標籤選擇器**：影響所有相同標籤，例如：
  ```css
  p { color: green; }
  ```
- **類別選擇器（Class）**：適用於多個元素，例如：
  ```css
  .box { background-color: yellow; }
  ```
  ```html
  <div class="box">內容</div>
  ```
- **ID 選擇器**：適用於單一元素，例如：
  ```css
  #header { font-size: 24px; }
  ```
  ```html
  <h1 id="header">標題</h1>
  ```
- **後代選擇器**：選擇特定層級內的元素，例如：
  ```css
  div p { color: blue; }
  ```

### 2.3 盒模型（Box Model）

盒模型包含四個部分：
1. **Content**（內容區域）。
2. **Padding**（內距，內容與邊框之間的距離）。
3. **Border**（邊框）。
4. **Margin**（外距，與其他元素的距離）。

範例：
```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

# 3. 常見版型切版技巧

### 3.1 Flexbox 佈局

`Flexbox` 用於彈性排列子元素。
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 3.2 Grid 佈局

`Grid` 提供更強大的網格系統。
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### 3.3 響應式設計（RWD）

使用 `@media` 來適應不同螢幕尺寸。
```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

# 4. 實戰案例：基本網頁切版

### HTML
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡單網頁</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>我的網站</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">首頁</a></li>
            <li><a href="#">關於</a></li>
            <li><a href="#">聯絡</a></li>
        </ul>
    </nav>
    <section class="content">
        <p>這是一個簡單的 HTML & CSS 切版示範。</p>
    </section>
</body>
</html>
```

### CSS
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}
header {
    background: #333;
    color: white;
    text-align: center;
    padding: 10px;
}
nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
}
nav ul li {
    margin: 0 15px;
}
nav a {
    text-decoration: none;
    color: black;
}
.content {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}
```

# 5. 總結

透過學習 HTML 與 CSS，可以建立結構清晰、外觀美觀的網頁。建議多加練習不同的切版方式，如 Flexbox 和 Grid，並運用 RWD 技巧來提升適應性，讓網站在不同裝置上都能有良好的呈現效果。

