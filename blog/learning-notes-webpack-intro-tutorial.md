---
title: Webpack 入門教學筆記：現代前端建構工具的基礎與實戰 | 學習筆記
date: 2024-11-16 11:33:41
authors: kdchang
tags:
  - Webpack
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 前言

在前端專案日益龐大與模組化的今天，建構工具（build tools）扮演了極其關鍵的角色。而 Webpack 作為目前最主流的模組打包器（module bundler），廣泛應用於各類前端應用與框架中（如 React、Vue 等）。本篇筆記將介紹 Webpack 的基本概念、核心組件與實際範例，協助你快速理解與實作。

---

## 一、什麼是 Webpack？

Webpack 是一個靜態模組打包器，它會從你的應用程式進入點（entry point）開始，分析相依的模組（JavaScript、CSS、圖片、JSON 等），然後打包成一或多個 bundle，供瀏覽器載入使用。

主要特性包含：

- 支援模組系統（如 CommonJS、ESM）
- 可搭配各種 Loader 處理不同類型資源
- 使用 Plugin 擴充打包功能
- 開發與生產模式可分離配置
- 支援 Hot Module Replacement（HMR）與 Dev Server

---

## 二、基本安裝與專案初始化

建立一個新的專案資料夾：

```bash
mkdir my-webpack-app
cd my-webpack-app
npm init -y
```

安裝 Webpack 及其 CLI 工具：

```bash
npm install --save-dev webpack webpack-cli
```

建立基本的專案目錄結構：

```
my-webpack-app/
├── dist/
│   └── index.html
├── src/
│   └── index.js
├── package.json
└── webpack.config.js
```

---

## 三、撰寫基本範例

### 1. `src/index.js`

```js
import "./style.css";

const element = document.createElement("h1");
element.textContent = "Hello Webpack!";
document.body.appendChild(element);
```

### 2. `src/style.css`

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
  padding-top: 100px;
}
```

### 3. `dist/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Webpack App</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

---

## 四、Webpack 基礎設定檔

建立 `webpack.config.js`：

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js", // 入口檔案
  output: {
    filename: "main.js", // 輸出檔案名稱
    path: path.resolve(__dirname, "dist"), // 輸出目錄
    clean: true, // 每次打包清空 dist
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // 處理 CSS 檔案
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development", // 模式（也可設為 'production'）
};
```

安裝所需的 CSS loader：

```bash
npm install --save-dev style-loader css-loader
```

---

## 五、打包與啟動

執行打包指令：

```bash
npx webpack
```

執行後會自動將所有相依檔案打包為 `dist/main.js`，可以直接打開 `dist/index.html` 查看效果。

---

## 六、啟用 Webpack Dev Server（開發伺服器）

為了開發方便，我們可以啟用內建的開發伺服器，支援 HMR（Hot Module Replacement）功能。

安裝 dev server：

```bash
npm install --save-dev webpack-dev-server
```

在 `webpack.config.js` 增加設定：

```js
devServer: {
  static: './dist',
  port: 3000,
  open: true, // 自動開啟瀏覽器
  hot: true,  // 啟用 HMR
}
```

更新 `package.json` 的 scripts：

```json
"scripts": {
  "build": "webpack",
  "start": "webpack serve"
}
```

執行：

```bash
npm run start
```

開發伺服器啟動後會自動開啟 `localhost:3000`，修改檔案後可即時預覽變更。

---

## 七、區分開發與生產模式

在實際開發中，我們會針對開發與正式環境建立不同的設定檔，使用 `webpack-merge` 套件來合併共用設定：

```bash
npm install --save-dev webpack-merge
```

建立以下三個檔案：

```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

`webpack.common.js` 放共用設定，其他兩個則各自設定環境特有的項目，例如：

- `webpack.dev.js`: 開啟 Source Map、HMR
- `webpack.prod.js`: 最佳化壓縮、移除 console.log 等

---

## 八、擴充功能：使用 Babel 處理 ES6+

Webpack 本身不會轉譯 JavaScript，需要搭配 Babel：

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

新增 `.babelrc`：

```json
{
  "presets": ["@babel/preset-env"]
}
```

在 `webpack.config.js` 加入規則：

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
}
```

這樣就能讓 Webpack 在打包過程中使用 Babel 將 ES6+ 語法轉譯為相容的版本。

---

## 九、使用 Plugin 擴充功能：HtmlWebpackPlugin

HtmlWebpackPlugin 可自動產生並插入 `script` 標籤：

```bash
npm install --save-dev html-webpack-plugin
```

修改設定：

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    template: "./dist/index.html",
    inject: "body",
  }),
];
```

不再需要手動在 `index.html` 中引入 `main.js`，Webpack 會自動插入對應 bundle。

---

## 十、結語與建議

Webpack 雖然設定上比 Vite 複雜，但擁有極高的自訂彈性與完整生態系，是大型專案不可或缺的建構工具。透過 Loader 處理不同格式的資源、Plugin 擴充功能，再加上分環境設定與開發伺服器支援，Webpack 能有效協助你管理現代前端應用的整個建構流程。

適合情境包括：

- React、Vue 中大型應用
- 多入口或模組系統複雜的專案
- 需要高度自訂打包流程的企業內部系統

雖然 Vite、Parcel 等工具正迅速崛起，但 Webpack 仍是學習前端建構工具不可忽略的重要基礎。
