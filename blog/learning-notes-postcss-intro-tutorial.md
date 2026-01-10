---
title: PostCSS 入門教學筆記 | 學習筆記
date: 2024-09-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - css
    - PostCSS
    - frontend engineer

---

## 一、什麼是 PostCSS？

PostCSS 是一個 **CSS 的轉換工具（CSS Transformer）**，本身不是 CSS 預處理器（如 Sass）或框架（如 Tailwind CSS），但它可以透過「外掛（plugin）」的方式強化你的 CSS 工作流程。

簡單來說，PostCSS 是一個平台，讓你可以用 JavaScript 編寫規則，自動處理 CSS，像是：

- 自動加上瀏覽器前綴（autoprefixer）
- 支援未來 CSS 語法（例如 Nesting）
- 壓縮 CSS、移除重複樣式
- 搭配 Tailwind CSS 進行原子化設計

---

## 二、PostCSS 的運作原理

PostCSS 的流程如下：

1. 將原始 CSS 解析為 AST（抽象語法樹）
2. 透過插件對 AST 進行操作
3. 將修改後的 AST 轉回 CSS 輸出

你可以選擇使用官方插件、社群插件，甚至自己寫 plugin。

---

## 三、如何安裝與設定 PostCSS

### 安裝（使用 npm）

```bash
npm install -D postcss postcss-cli autoprefixer
```

### 建立 PostCSS 設定檔 `postcss.config.js`

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
  ],
};
```

這樣 PostCSS 就會讀取這個設定檔，並在處理 CSS 時自動加入瀏覽器前綴。

---

## 四、基本使用流程

假設你有一個檔案 `src/style.css`：

```css
/* src/style.css */
:root {
  --main-color: #4f46e5;
}

.btn {
  display: flex;
  background-color: var(--main-color);
  user-select: none;
}
```

### 執行 PostCSS 處理：

```bash
npx postcss src/style.css -o dist/style.css
```

這會根據你的 `postcss.config.js` 處理並輸出到 `dist/style.css`。

### 輸出結果可能為：

```css
:root {
  --main-color: #4f46e5;
}

.btn {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: var(--main-color);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
```

這就是 `autoprefixer` 自動補完各種瀏覽器相容性的結果。

---

## 五、常用插件介紹與範例

### 1. `autoprefixer`（最常見）

自動加上 CSS 瀏覽器前綴

```bash
npm install -D autoprefixer
```

可搭配 `.browserslistrc` 或 `package.json` 設定支援目標：

```txt
> 1%
last 2 versions
not dead
```

---

### 2. `postcss-preset-env`

支援未來 CSS 語法，例如 Nesting、變數、邏輯函數等

```bash
npm install -D postcss-preset-env
```

更新設定檔：

```js
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 1,
    }),
  ],
};
```

然後你就可以寫類似這樣的 CSS：

```css
.btn {
  color: white;

  &:hover {
    color: black;
  }
}
```

經過 PostCSS 處理後會被轉成瀏覽器可讀的標準語法。

---

### 3. `cssnano`（壓縮 CSS）

這個插件會讓 CSS 變得更小，適合生產環境使用：

```bash
npm install -D cssnano
```

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
```

---

## 六、PostCSS 與 Tailwind CSS 的關係

Tailwind CSS 是建立在 PostCSS 基礎上的一個插件。因此在安裝 Tailwind 時你會看到：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

這個指令會產生 `postcss.config.js`：

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Tailwind 本身就是一個 PostCSS 插件，會將你在 HTML 或 JSX 中寫的 class 轉換成實際的 CSS。

---

## 七、PostCSS 與其他工具整合

### 搭配 Vite

Vite 專案中只要有 `postcss.config.js` 檔案，會自動載入設定，不需額外安裝。

### 搭配 Webpack

在 `webpack.config.js` 加入：

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ],
}
```

---

## 八、自訂 PostCSS 插件（進階）

你也可以自己撰寫插件來操作 CSS AST：

```js
module.exports = () => {
  return {
    postcssPlugin: 'my-plugin',
    Declaration(decl) {
      if (decl.prop === 'color' && decl.value === 'red') {
        decl.value = 'blue';
      }
    },
  };
};
module.exports.postcss = true;
```

這個簡單的插件會把 `color: red` 自動換成 `color: blue`。

---

## 九、總結

PostCSS 雖然不像 Sass 有自己的語法，也不像 Tailwind 有明確的設計架構，但它是現代前端 CSS 處理流程中不可或缺的工具，擁有高度彈性與強大生態系。

我們可以根據需求只加幾個插件，也可以像 Tailwind 那樣完全建構在它上面。尤其當你的專案需要支援多瀏覽器、使用最新 CSS 語法、進行建置壓縮時，PostCSS 是最佳解法之一。

如果你正在使用 Vite、Next.js、或是 Tailwind CSS，幾乎都已內建 PostCSS 支援。了解它的運作方式能幫你更精準地控制前端樣式處理流程。

