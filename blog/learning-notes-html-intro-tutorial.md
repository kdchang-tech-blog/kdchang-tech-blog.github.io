---
title: HTML 入門教學筆記 | 學習筆記
date: 2021-12-14 02:23:41
authors: kdchang
tags: 
    - html
    - 前端
    - 前端開發
    - 前端工程
    - frontend

---

#### 1. 什麼是 HTML？  
`HTML`（HyperText Markup Language，超文本標記語言）是建立網頁的標準語言。它用標籤（tags）來結構化內容，讓瀏覽器能夠解析並顯示網頁。HTML 主要負責網頁的結構，而樣式與行為則交由 CSS 和 JavaScript 負責。

---

#### 2. HTML 文件基本結構  
一個基本的 HTML 文件包含以下部分：  

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一個 HTML 頁面</title>
</head>
<body>
    <h1>歡迎來到我的網站</h1>
    <p>這是一個簡單的 HTML 頁面。</p>
</body>
</html>
```

- `<!DOCTYPE html>`：宣告 HTML5 文件類型。  
- `<html lang="zh-TW">`：定義 HTML 根標籤，`lang="zh-TW"` 表示使用繁體中文。  
- `<head>`：包含頁面的元資訊（meta information），如編碼、標題等。  
- `<meta charset="UTF-8">`：設定網頁使用 UTF-8 編碼，確保中文字元正確顯示。  
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`：讓網頁適應不同裝置的螢幕大小。  
- `<title>`：設定瀏覽器標籤上的標題。  
- `<body>`：放置網頁的主要內容，如標題、段落、圖片等。

---

#### 3. 常見 HTML 標籤  
##### 3.1 標題與段落  
HTML 提供六種標題 (`<h1>` 到 `<h6>`)，以及 `<p>` 用來表示段落。  

```html
<h1>這是主標題</h1>
<h2>這是次標題</h2>
<h3>這是小標題</h3>
<p>這是一段文字，HTML 會自動換行。</p>
```

##### 3.2 超連結  
使用 `<a>` 標籤建立超連結：  

```html
<a href="https://www.google.com" target="_blank">前往 Google</a>
```
- `href` 指定連結網址。  
- `target="_blank"` 讓連結在新視窗開啟。

##### 3.3 圖片  
使用 `<img>` 來插入圖片：  

```html
<img src="image.jpg" alt="示範圖片" width="300">
```
- `src` 指定圖片來源。  
- `alt` 提供替代文字。  
- `width` 設定圖片寬度（可用 `height` 指定高度）。

##### 3.4 清單  
有序清單 (`<ol>`) 和無序清單 (`<ul>`)：  

```html
<h2>購物清單</h2>
<ul>
    <li>蘋果</li>
    <li>香蕉</li>
    <li>橘子</li>
</ul>

<h2>步驟</h2>
<ol>
    <li>打開電腦</li>
    <li>開啟瀏覽器</li>
    <li>輸入網址</li>
</ol>
```

##### 3.5 表格  
使用 `<table>` 來建立表格，並搭配 `<tr>`（表格列）、`<th>`（表頭）、`<td>`（儲存格）：  

```html
<table border="1">
    <tr>
        <th>姓名</th>
        <th>年齡</th>
    </tr>
    <tr>
        <td>小明</td>
        <td>25</td>
    </tr>
    <tr>
        <td>小華</td>
        <td>30</td>
    </tr>
</table>
```
- `border="1"` 設定表格邊框。

##### 3.6 表單  
使用 `<form>` 來建立表單：  

```html
<form action="submit.php" method="post">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" required>
    <br>
    <label for="email">電子郵件：</label>
    <input type="email" id="email" name="email" required>
    <br>
    <input type="submit" value="提交">
</form>
```
- `action="submit.php"` 指定表單提交到 `submit.php`。  
- `method="post"` 指定使用 POST 方法傳遞數據。  
- `required` 讓輸入欄位變成必填。

---

#### 4. HTML5 新增標籤  
HTML5 引入了一些語義化標籤，使網頁更具結構性。  

```html
<header>
    <h1>網站標題</h1>
</header>
<nav>
    <ul>
        <li><a href="#">首頁</a></li>
        <li><a href="#">關於我們</a></li>
        <li><a href="#">聯絡我們</a></li>
    </ul>
</nav>
<section>
    <h2>最新消息</h2>
    <p>這是一則最新消息的內容。</p>
</section>
<footer>
    <p>版權所有 &copy; 2025</p>
</footer>
```
- `<header>`：頁首。  
- `<nav>`：導覽區塊。  
- `<section>`：內容區塊。  
- `<footer>`：頁尾資訊。

---

#### 5. HTML 與 CSS 結合  
雖然 HTML 定義了結構，但我們通常使用 CSS 來美化頁面。內嵌 CSS 可以寫在 `<style>` 內：  

```html
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        text-align: center;
    }
    h1 {
        color: #007bff;
    }
    p {
        font-size: 18px;
    }
</style>
```

或者外部引入 CSS 檔案：  

```html
<link rel="stylesheet" href="styles.css">
```

---

#### 6. 總結  
這篇教學筆記介紹了 HTML 的基本語法，包括標籤、結構與常見元素。學會這些後，可以進一步學習 CSS 來美化網頁，或是學習 JavaScript 增強互動性。最好的學習方式是透過實際練習與製作小專案來熟悉 HTML 語法。