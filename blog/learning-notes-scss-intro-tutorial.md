---
title: SCSS 介紹入門教學筆記 | 學習筆記
date: 2023-07-02 02:23:41
author: kdchang
tags: 
    - SASS
    - SCSS
    - CSS

---


# 一、SASS 是什麼？  

SASS（Syntactically Awesome Stylesheets）是一種 CSS 預處理器（CSS Preprocessor），它擴展了 CSS 的功能，使樣式表更具可讀性、模組化和可維護性。SASS 允許使用變數、巢狀（Nesting）、混入（Mixin）、繼承（Extend）等進階特性，讓開發者能更有效率地管理 CSS。  

SASS 有兩種語法：  

1. **SCSS（Sassy CSS）**：與傳統 CSS 語法相似，使用 `{}` 和 `;` 來區分樣式，擴展性強且相容 CSS。  
2. **SASS（縮排語法）**：省略 `{}` 和 `;`，使用縮排來表示層級關係，簡潔但較不常用。  

目前，SCSS 語法較受歡迎，因此本文主要以 SCSS 為主進行介紹。  

---

# 二、SASS 的優勢  

使用 SASS 的主要優勢包括：  

1. **可維護性**：透過模組化的結構管理樣式，避免冗長且難以維護的 CSS。  
2. **變數（Variables）**：可定義全站共用的變數，例如顏色、字體大小等，提高一致性。  
3. **巢狀結構（Nesting）**：讓樣式更具層次感，避免重複選擇器。  
4. **混入（Mixin）**：類似函式的概念，可重複使用樣式區塊，減少冗餘。  
5. **繼承（Extend）**：透過 `@extend` 共享樣式，減少重複編寫的代碼。  
6. **函式（Functions）**：內建函式如 `lighten()`、`darken()` 可動態調整顏色，提高設計靈活性。  

---

# 三、安裝與使用 SASS  

### 1. 透過 npm 安裝  

如果使用 Node.js，可透過 npm 安裝 SASS：  

```sh
npm install -g sass
```

安裝後，可使用以下指令將 SCSS 轉譯為 CSS：  

```sh
sass input.scss output.css
```

可使用 `--watch` 讓 SASS 自動監聽檔案變化並即時編譯：  

```sh
sass --watch input.scss:output.css
```

### 2. 透過 CDN 使用  

雖然 SASS 本身無法直接在瀏覽器運行，但可透過一些線上工具（如 CodePen）編寫 SCSS，並自動編譯成 CSS 進行預覽。  

---

# 四、SASS 基礎語法  

### 1. 變數（Variables）  

SASS 允許使用變數來存儲顏色、字體大小、間距等常數，使樣式更具一致性。  

```scss
$primary-color: #3498db;
$font-size: 16px;

body {
    color: $primary-color;
    font-size: $font-size;
}
```

### 2. 巢狀結構（Nesting）  

在 CSS 中，我們通常需要重複撰寫父選擇器，但在 SASS 中可直接巢狀編寫，提高可讀性。  

```scss
nav {
    background: #333;
    ul {
        list-style: none;
        li {
            display: inline-block;
            a {
                color: white;
                text-decoration: none;
            }
        }
    }
}
```

這段 SCSS 會編譯成以下 CSS：  

```css
nav {
    background: #333;
}
nav ul {
    list-style: none;
}
nav ul li {
    display: inline-block;
}
nav ul li a {
    color: white;
    text-decoration: none;
}
```

### 3. 混入（Mixin）  

Mixin 可定義可重複使用的樣式區塊，並可接受參數，使樣式更加靈活。  

```scss
@mixin button-style($bg-color) {
    background-color: $bg-color;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
}

.btn-primary {
    @include button-style(#3498db);
}

.btn-secondary {
    @include button-style(#2ecc71);
}
```

編譯後的 CSS 為：  

```css
.btn-primary {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
}

.btn-secondary {
    background-color: #2ecc71;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
}
```

### 4. 繼承（Extend）  

`@extend` 允許一個選擇器繼承另一個選擇器的樣式，避免重複撰寫代碼。  

```scss
.message {
    padding: 10px;
    border-radius: 5px;
}

.success {
    @extend .message;
    background: #2ecc71;
}

.error {
    @extend .message;
    background: #e74c3c;
}
```

編譯後的 CSS：  

```css
.message, .success, .error {
    padding: 10px;
    border-radius: 5px;
}

.success {
    background: #2ecc71;
}

.error {
    background: #e74c3c;
}
```

### 5. 運算與函式  

SASS 允許在樣式中進行運算，使數值調整更加靈活。  

```scss
$base-size: 16px;

h1 {
    font-size: $base-size * 2;
}

h2 {
    font-size: $base-size * 1.5;
}
```

此外，SASS 內建許多函式，例如 `darken()`、`lighten()` 可用來調整顏色：  

```scss
$primary-color: #3498db;

button {
    background: $primary-color;
    &:hover {
        background: darken($primary-color, 10%);
    }
}
```

編譯後的 CSS：  

```css
button {
    background: #3498db;
}
button:hover {
    background: #217dbb;
}
```

---

# 五、SASS 進階技巧  

### 1. 分割檔案  

SASS 允許將樣式拆分成多個檔案，並透過 `@import` 或 `@use` 來管理，提升可維護性。  

```scss
// _variables.scss
$primary-color: #3498db;
$font-size: 16px;

// main.scss
@import 'variables';

body {
    color: $primary-color;
    font-size: $font-size;
}
```

### 2. 使用 `@use`  

`@use` 是 `@import` 的改進版，能避免變數命名衝突，推薦使用：  

```scss
@use 'variables' as v;

body {
    color: v.$primary-color;
    font-size: v.$font-size;
}
```

---

# 六、結論  

SASS 是一種強大的 CSS 預處理器，它提供變數、巢狀、Mixin、繼承等功能，使樣式管理更加高效與模組化。透過 SASS，開發者可以撰寫更具結構性、可讀性和可維護性的 CSS。  

對於前端開發者來說，掌握 SASS 不僅能提升開發效率，還能讓專案的樣式管理更加清晰。在實際專案中，建議將樣式模組化，並善用變數與 Mixin，以確保程式碼的可重用性與一致性。