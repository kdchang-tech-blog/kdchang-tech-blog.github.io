---
title: LESS 入門教學筆記 | 學習筆記
date: 2023-06-01 02:23:41
author: kdchang
tags: 
    - SASS
    - SCSS
    - CSS
    - LESS

---

## 前言
`LESS`（Leaner Style Sheets）是一種 CSS 預處理器，它在 CSS 的基礎上加入了變數、嵌套、混合（Mixins）、函式等功能，使樣式表的管理更加靈活且易於維護。LESS 文件最終會被編譯成標準的 CSS，並可在瀏覽器或 Node.js 環境中使用。

---

## 1. 安裝與使用  

LESS 可以透過以下幾種方式使用：  

### 1.1 透過 LESS.js 在瀏覽器中運行  
這種方式適合開發環境，但不建議在正式環境中使用，因為它會在瀏覽器端進行編譯，影響效能。  

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LESS 測試</title>
    <link rel="stylesheet/less" type="text/css" href="styles.less">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/4.1.1/less.min.js"></script>
</head>
<body>
    <h1>Hello LESS!</h1>
</body>
</html>
```

### 1.2 透過 Node.js 編譯 LESS  
如果你希望在開發環境中預先編譯 LESS，則可以使用 npm 安裝 LESS：

```sh
npm install -g less
```

然後使用以下指令將 `.less` 文件編譯為 `.css`：

```sh
lessc styles.less styles.css
```

這樣就能夠將 LESS 轉換為 CSS，並直接在 HTML 中引用 `styles.css`。

---

## 2. LESS 的基本語法  

### 2.1 變數（Variables）  
LESS 允許使用變數來儲存顏色、字型大小、間距等值，方便統一管理樣式。  

```less
@primary-color: #3498db;
@font-size: 16px;

body {
    color: @primary-color;
    font-size: @font-size;
}
```

### 2.2 嵌套（Nesting）  
LESS 允許使用嵌套的方式來撰寫 CSS，這樣可以清楚地表示層級關係。  

```less
nav {
    background-color: #333;
    ul {
        list-style: none;
        li {
            display: inline-block;
            a {
                text-decoration: none;
                color: white;
            }
        }
    }
}
```

編譯後的 CSS：

```css
nav {
    background-color: #333;
}
nav ul {
    list-style: none;
}
nav ul li {
    display: inline-block;
}
nav ul li a {
    text-decoration: none;
    color: white;
}
```

### 2.3 混合（Mixins）  
混合（Mixin）類似於函式，可以定義一組樣式，並在多個地方重複使用。  

```less
.border-radius(@radius) {
    border-radius: @radius;
}

.button {
    background-color: @primary-color;
    .border-radius(5px);
}
```

編譯後的 CSS：

```css
.button {
    background-color: #3498db;
    border-radius: 5px;
}
```

### 2.4 運算（Operations）  
LESS 支援數學運算，可以用來計算尺寸、顏色等。  

```less
@base-size: 10px;

.box {
    width: @base-size * 5;
    height: @base-size * 3;
    padding: @base-size + 5px;
}
```

編譯後的 CSS：

```css
.box {
    width: 50px;
    height: 30px;
    padding: 15px;
}
```

### 2.5 繼承（Extend）  
LESS 提供 `extend` 功能，允許一個選擇器繼承另一個選擇器的樣式。  

```less
.message {
    padding: 10px;
    border: 1px solid #ddd;
}

.success {
    &:extend(.message);
    background-color: #dff0d8;
}
```

編譯後的 CSS：

```css
.message,
.success {
    padding: 10px;
    border: 1px solid #ddd;
}
.success {
    background-color: #dff0d8;
}
```

---

## 3. 進階功能  

### 3.1 運用函式（Functions）  
LESS 提供許多內建函式，例如 `lighten()`、`darken()`、`fadeout()` 等來調整顏色透明度、亮度等。  

```less
@main-color: #3498db;

.button {
    background-color: @main-color;
    border: 1px solid darken(@main-color, 10%);
    color: lighten(@main-color, 20%);
}
```

編譯後的 CSS：

```css
.button {
    background-color: #3498db;
    border: 1px solid #217dbb;
    color: #5dade2;
}
```

### 3.2 迴圈（Loops）  
LESS 允許使用 `each()` 來迭代陣列，或使用 `for` 來執行迴圈。  

```less
@colors: red, green, blue;

.each(@colors, {
    .box-@{value} {
        background-color: @value;
    }
});
```

編譯後的 CSS：

```css
.box-red {
    background-color: red;
}
.box-green {
    background-color: green;
}
.box-blue {
    background-color: blue;
}
```

### 3.3 延遲運算（Lazy Evaluation）  
LESS 變數的值在運算時才會解析，因此可以動態變更變數內容。  

```less
@theme-color: @primary-color;

.button {
    background-color: @theme-color;
}
```

這樣如果稍後更改 `@primary-color`，`@theme-color` 也會自動更新。

---

## 4. 結論  

LESS 透過變數、嵌套、混合、運算等功能，大大提升了 CSS 的可維護性與開發效率。建議開發者透過 Node.js 進行 LESS 編譯，避免在瀏覽器端執行影響效能。透過 LESS，樣式表變得更具結構化，讓前端開發更為靈活高效。