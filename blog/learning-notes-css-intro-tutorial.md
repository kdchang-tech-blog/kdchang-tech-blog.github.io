---
title: CSS 入門教學筆記 | 學習筆記
date: 2021-12-15 03:23:41
authors: kdchang
tags: 
    - css
    - stylesheet

---

#### 1. 什麼是 CSS？  
CSS（Cascading Style Sheets，層疊樣式表）是一種用來美化 HTML 頁面的樣式語言。透過 CSS，可以設定字體、顏色、間距、佈局等，讓網頁更具吸引力和可讀性。  

CSS 透過選擇器（Selectors）來指定 HTML 元素，並套用樣式規則（Rules）。  

---

#### 2. CSS 的使用方式  
有三種方式可以在 HTML 文件中使用 CSS：  

##### 2.1 內部 CSS（Internal CSS）  
將 CSS 直接寫在 HTML 的 `<style>` 標籤內：  

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>內部 CSS 範例</title>
    <style>
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: #007bff;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>這是標題</h1>
    <p>這是一段文字。</p>
</body>
</html>
```

##### 2.2 外部 CSS（External CSS）  
將 CSS 放入獨立的 `.css` 檔案，並透過 `<link>` 引入：  

**styles.css**  
```css
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}

h1 {
    color: #007bff;
    text-align: center;
}
```

**HTML 文件：**  
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>外部 CSS 範例</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>這是標題</h1>
    <p>這是一段文字。</p>
</body>
</html>
```

##### 2.3 行內 CSS（Inline CSS）  
直接在 HTML 標籤內使用 `style` 屬性：  

```html
<h1 style="color: red; text-align: center;">這是紅色標題</h1>
```

行內 CSS 只能用於單一元素，不利於維護，因此不建議大量使用。

---

#### 3. CSS 選擇器（Selectors）  
選擇器用於選取 HTML 元素並套用樣式，常見的選擇器有：

##### 3.1 元素選擇器（Element Selector）  
直接指定 HTML 標籤：  

```css
p {
    color: blue;
    font-size: 16px;
}
```

##### 3.2 類別選擇器（Class Selector）  
使用 `.` 選擇類別，適用於多個元素：  

```css
.important-text {
    color: red;
    font-weight: bold;
}
```

對應的 HTML：  

```html
<p class="important-text">這是一段重要的文字。</p>
```

##### 3.3 ID 選擇器（ID Selector）  
使用 `#` 選擇 ID，適用於單一元素：  

```css
#main-title {
    font-size: 24px;
    color: green;
}
```

對應的 HTML：  

```html
<h1 id="main-title">這是主標題</h1>
```

##### 3.4 群組選擇器（Group Selector）  
同時選取多個元素：  

```css
h1, h2, p {
    font-family: Arial, sans-serif;
}
```

##### 3.5 後代選擇器（Descendant Selector）  
選取某個元素內的特定元素：  

```css
div p {
    color: gray;
}
```

對應的 HTML：  

```html
<div>
    <p>這段文字會變成灰色。</p>
</div>
```

---

#### 4. 盒模型（Box Model）  
CSS 中的所有元素都遵循盒模型（Box Model），包含以下部分：

- **Content（內容）**：元素內部的內容，如文字或圖片。  
- **Padding（內邊距）**：內容與邊框之間的距離。  
- **Border（邊框）**：元素的邊界。  
- **Margin（外邊距）**：元素與其他元素之間的距離。  

範例：  

```css
.box {
    width: 200px;
    height: 100px;
    padding: 10px;
    border: 2px solid black;
    margin: 20px;
    background-color: lightblue;
}
```

對應的 HTML：  

```html
<div class="box">這是一個盒子</div>
```

注意：box-sizing 屬性： content-box（預設）、border-box（寬高合計包含 padding 和 border）

---

#### 5. 常見的 CSS 屬性  
##### 5.1 文字樣式  
```css
p {
    font-size: 18px;
    color: #333;
    text-align: center;
    line-height: 1.5;
}
```

##### 5.2 背景樣式  
```css
body {
    background-color: #f8f9fa;
    background-image: url("background.jpg");
    background-size: cover;
}
```

##### 5.3 邊框與圓角  
```css
.box {
    border: 2px solid #000;
    border-radius: 10px;
}
```

##### 5.4 Flexbox 佈局  
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
```

對應的 HTML：  

```html
<div class="container">
    <div class="box">置中內容</div>
</div>
```

---

#### 6. 響應式設計（Responsive Design）  
使用 `@media` 來適應不同裝置：  

```css
@media (max-width: 600px) {
    body {
        background-color: lightgray;
    }
}
```

當螢幕寬度小於 600px 時，背景變為淺灰色。

---

#### 7. 總結  
本篇筆記介紹了 CSS 的基本概念，包括選擇器、樣式屬性、盒模型與佈局技巧。熟練 CSS 之後，可以進一步學習 Flexbox、Grid、動畫（Animation）等進階技術，並與 JavaScript 結合，打造互動性更高的網頁。實際練習與製作小型專案是學習 CSS 的最佳方式。