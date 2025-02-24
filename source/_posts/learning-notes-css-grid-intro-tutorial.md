---
title: Grid 網頁排版技巧入門教學筆記 | 學習筆記
date: 2024-11-16 02:23:41
author: kdchang
tags: 
    - Grid
    - css
    - 排版

---

### 前言

在現今網頁設計中，排版的結構與呈現方式對於用戶體驗至關重要。隨著網頁設計的演進，CSS `Grid` 成為了最強大且靈活的排版工具之一。透過 CSS Grid，你可以輕鬆創建複雜的佈局，並且適應不同設備的需求。本文將介紹 CSS Grid 的基本概念與使用技巧，幫助你迅速掌握如何在網頁設計中使用 Grid。

#### 1. 什麼是 CSS Grid？

CSS Grid Layout（簡稱 Grid）是 CSS3 的一個強大功能，允許開發者以列和行的方式來設計網頁佈局。它使得網頁設計更加直觀和靈活，不再需要依賴浮動（float）或定位（position）等老舊技巧，簡化了許多複雜的布局問題。

Grid 是由「`容器`」和「`項目`」兩部分組成。容器定義了網格的結構，而項目則是容器內部的元素。你可以在容器內輕鬆地將項目放置在指定的網格區域中，從而創建各種排版樣式。

#### 2. CSS Grid 的基本語法

在使用 CSS Grid 時，首先需要定義一個容器元素並啟用 Grid 布局。這樣，容器內的子元素將成為 Grid 項目。以下是基本的設置步驟：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
}
```

- `display: grid;` 啟用容器的 Grid 布局。
- `grid-template-columns: repeat(3, 1fr);` 設定三列，每列的寬度為等比例（`1fr`）。`1fr` 代表容器寬度的 1/3。
- `grid-template-rows: auto;` 使得行的高度根據內容自動調整。
- `gap: 10px;` 定義網格項目之間的間距。

#### 3. 定義 Grid 容器的列和行

你可以使用 `grid-template-columns` 和 `grid-template-rows` 來設置容器內列和行的數量、大小及比例。

##### 定義列

例如，若想創建四列的佈局，可以這樣寫：

```css
.container {
  display: grid;
  grid-template-columns: 200px 300px 400px 1fr;
}
```

這裡，我們設置了四列的寬度，前三列有固定的像素寬度，最後一列使用 `1fr`，即佔據剩餘的可用空間。

##### 定義行

類似地，你可以設置行的大小。若要讓每一行的高度根據內容自動調整，可以使用：

```css
.container {
  display: grid;
  grid-template-rows: 100px auto;
}
```

這表示網格容器有兩行，第一行的高度固定為 100px，第二行的高度將根據內容自動調整。

#### 4. 放置 Grid 項目

Grid 容器的子元素會自動成為 Grid 項目。你可以使用 `grid-column` 和 `grid-row` 屬性來指定某個項目占據的列與行。

##### 例子

```css
.item1 {
  grid-column: 1 / 3;
  grid-row: 1;
}
```

這表示 `.item1` 元素會從第 1 列跨越到第 3 列，占據第一行。

- `grid-column: 1 / 3;` 表示該元素會從第 1 列起，跨越兩列，直到第 3 列結束。
- `grid-row: 1;` 表示該元素位於第 1 行。

#### 5. 使用 `fr` 單位設置比例

CSS Grid 中最重要的單位之一是 `fr`（fraction，分數），它讓你可以設定元素在可用空間中所佔比例。

假設你有三列，且希望第一列占 1 部分，第二列占 2 部分，第三列占 3 部分：

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
}
```

這樣會將總寬度分成六等份，其中第一列占 1 份，第二列占 2 份，第三列占 3 份。這樣的佈局適合於動態響應式設計。

#### 6. 設置間距

除了 `gap` 屬性，你還可以為列與行的間距分別設置不同的值：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 20px;
}
```

這裡，`gap: 10px 20px;` 的第一個數值設定了行之間的間距為 10px，第二個數值設定了列之間的間距為 20px。

#### 7. 嵌套 Grid

Grid 允許你在網格項目內再次使用 Grid 佈局，這樣可以創建更複雜的排版結構。例如，假設你在某個項目內再創建一個小的網格：

```css
.item1 {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
```

在這個範例中，`.item1` 是一個 Grid 項目，它內部再次使用 Grid 排版，定義兩列，其中第一列占據 1 部分，第二列占據 2 部分。

#### 8. 響應式設計

Grid 讓你輕鬆應對不同設備的佈局需求。你可以使用媒體查詢來調整 Grid 排版。例如：

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

這段程式碼會根據螢幕寬度變化調整容器的列數：在寬度大於 768px 時顯示四列，在寬度小於 768px 時顯示兩列，在寬度小於 480px 時顯示單列。

#### 9. 小結

CSS Grid 為現代網頁設計提供了一個簡單、強大且靈活的排版解決方案。它不僅能夠解決過去使用浮動或定位方法無法達成的複雜佈局，還能輕鬆適應響應式設計的需求。掌握 CSS Grid，你將能夠更高效地創建現代化的網頁佈局，提升設計的精確度與可維護性。希望本文的介紹能幫助你快速入門並將這項技術應用到你的項目中。