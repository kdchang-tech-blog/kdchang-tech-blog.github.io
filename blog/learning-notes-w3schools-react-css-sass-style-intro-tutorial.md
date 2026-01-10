---
title: 在 React 中使用 Sass 進行樣式設計教學 | w3schools 學習筆記
date: 2024-01-15 11:33:41
author: kdchang
tags:
  - React
  - React Hooks
  - Next.js
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

### 前言

在現代前端開發中，維護與管理 CSS 樣式是一項重要任務，尤其當應用程式日益龐大、元件複雜時，單純使用原生 CSS 經常會遇到樣式難以重用、命名衝突等問題。這時候，Sass（Syntactically Awesome Stylesheets）這類 CSS 預處理器便顯得格外實用。Sass 提供變數、巢狀語法、Mixin 等強大功能，有助於讓樣式更具模組化與可維護性。

本篇教學將說明如何在 React 專案中使用 Sass，從安裝、建立樣式檔案、到實際在元件中引用，手把手帶你完成設定。

---

### 重點摘要

- **Sass 是什麼**：一種 CSS 預處理器，可在瀏覽器載入前編譯成標準 CSS。
- **安裝方法**：可透過 `npm i sass` 安裝 Sass 至 React 專案中。
- **副檔名**：Sass 檔案使用 `.scss` 副檔名。
- **支援變數與函數**：可使用 `$變數`、`@mixin` 等進階語法撰寫樣式。
- **與 React 整合方式**：與 CSS 類似，透過 `import './樣式.scss'` 導入樣式。

---

### Sass 是什麼？

Sass（Syntactically Awesome Stylesheets）是一種 CSS 的擴充語法，稱為 CSS 預處理器（preprocessor）。Sass 檔案會在伺服器端進行編譯，轉換為標準的 CSS，然後再由瀏覽器載入。

與傳統 CSS 相比，Sass 提供多種程式化的功能，包括：

- 變數（Variables）
- 巢狀語法（Nesting）
- 混合（Mixins）
- 繼承（Inheritance）

這些功能可以大幅簡化樣式維護與邏輯。

---

### 如何在 React 中使用 Sass？

若你使用 `vite` 建立專案，只需要簡單幾步即可在 React 中整合 Sass。

#### 安裝 Sass

打開終端機，並在 React 專案目錄中執行以下指令：

```bash
npm i sass
```

安裝完成後，即可開始在專案中撰寫與導入 `.scss` 檔案。

---

### 建立 Sass 檔案

建立 `.scss` 檔案的方式與 CSS 相同，唯一差別是副檔名由 `.css` 改為 `.scss`。

假設建立一個名為 `my-sass.scss` 的檔案，其內容如下：

```scss
// 定義一個變數
$myColor: red;

// 使用變數設定 h1 的文字顏色
h1 {
  color: $myColor;
}
```

這段 Sass 程式碼定義了一個 `$myColor` 的變數，並將其應用於 `h1` 標題文字的顏色。

---

### 在 React 元件中使用 Sass

要在 React 元件中使用 Sass，只需像導入 CSS 檔案一樣導入 `.scss` 檔案即可。

以下是一個完整範例：

#### `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './my-sass.scss'; // 導入 Sass 樣式檔

// 建立一個簡單的元件
const Header = () => {
  return (
    <>
      <h1>Hello Style!</h1>
      <p>Add a little style!.</p>
    </>
  );
};

// 掛載元件到畫面上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header />);
```

只要這樣導入 Sass 檔案，該樣式就會自動被應用到對應的元素上，與原生 CSS 的使用方式幾乎一致。

---

### 延伸學習建議

若你對 Sass 有更進一步的興趣，建議深入學習以下主題：

- Sass Mixin 的建立與使用
- 巢狀規則與 BEM 命名法結合技巧
- Sass 的分割與模組化導入（@import / @use）
- 與 CSS Modules、Styled-components 等工具的比較與選擇

---

### 總結

Sass 為 CSS 帶來更多彈性與可維護性，是開發大型 React 應用時的重要利器。配合 `vite` 的簡單整合方式，即使是初學者也能快速上手。只需幾步就能建立出具備變數與結構邏輯的樣式系統，為專案帶來更清晰、可維護的樣式架構。

無論是個人 Side Project 或是商業應用，學會 Sass 的使用，將大大提升你在前端開發上的效率與品質。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
2. [React router 官方網站](https://reactrouter.com/)
