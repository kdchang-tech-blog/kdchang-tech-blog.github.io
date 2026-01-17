---
title: 整合 Tailwind CSS 與 daisyUI 的入門教學筆記 | 學習筆記
date: 2024-10-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - css
    - Tailwind
    - TailwindCSS
    - daisyUI
    - frontend engineer

---

## 一、前言：為什麼選擇 Tailwind CSS 搭配 daisyUI？

在現代前端開發中，Tailwind CSS 提供了高度自訂、原子化的 CSS class，使得開發者能夠以更模組化與語意化的方式撰寫樣式。然而，Tailwind 並不內建 UI 元件，這就使得一些常見元件（如按鈕、表單、卡片）仍需手動組裝樣式。

這時，`daisyUI` 就成為極佳的搭檔。daisyUI 是一個基於 Tailwind CSS 架構的元件庫，提供豐富的預設元件樣式與主題切換能力，讓你能快速建構出一致、美觀的介面，並維持 Tailwind CSS 的開發哲學。

---

## 二、基本安裝流程

### 1. 初始化專案

首先建立一個新的專案，並安裝 Tailwind CSS。這裡以 Vite 為例：

```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
```

接著安裝 Tailwind CSS 相關套件：

1. tailwindcss	核心庫，提供 Tailwind 的 utility class
2. postcss	CSS 處理工具，Tailwind 用它來轉換 CSS
3. autoprefixer	為 CSS 自動加上瀏覽器前綴，如 -webkit-

```bash
# 安裝相關套件
npm install -D tailwindcss postcss autoprefixer
# 初始化設定檔
# 建立 Tailwind CSS 的設定檔 tailwind.config.js
# 加上 -p 參數會同時建立 PostCSS 的設定檔 postcss.config.js
npx tailwindcss init -p
```

### 2. 設定 Tailwind

修改 `tailwind.config.js`：

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

建立 `./src/style.css` 並加上 Tailwind 的 directives：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. 安裝 daisyUI

```bash
npm install daisyui
```

然後在 `tailwind.config.js` 中加入插件：

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

可選：設定主題

```js
daisyui: {
  themes: ["light", "dark", "cupcake", "synthwave", "dracula"],
},
```

---

## 三、開始使用：元件實戰範例

現在你已成功安裝與整合 Tailwind CSS + daisyUI，接下來讓我們透過實際範例來掌握它們的用法。

### 範例一：按鈕樣式

daisyUI 提供多種按鈕樣式，只需使用 `btn` class：

```html
<button class="btn btn-primary">主要按鈕</button>
<button class="btn btn-secondary">次要按鈕</button>
<button class="btn btn-accent">強調按鈕</button>
<button class="btn btn-outline">外框按鈕</button>
```

也可以搭配大小與形狀：

```html
<button class="btn btn-sm btn-circle btn-error">X</button>
<button class="btn btn-lg btn-square btn-info">i</button>
```

### 範例二：表單與輸入框

```html
<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">使用者名稱</span>
  </label>
  <input type="text" placeholder="請輸入名稱" class="input input-bordered w-full" />
</div>

<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">選擇國家</span>
  </label>
  <select class="select select-bordered">
    <option disabled selected>選擇一個選項</option>
    <option>台灣</option>
    <option>日本</option>
    <option>美國</option>
  </select>
</div>
```

### 範例三：卡片元件

```html
<div class="card w-96 bg-base-100 shadow-xl">
  <figure><img src="https://placeimg.com/400/225/tech" alt="科技圖" /></figure>
  <div class="card-body">
    <h2 class="card-title">科技卡片</h2>
    <p>這是一個搭配 Tailwind CSS 與 daisyUI 所設計的卡片元件。</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">查看更多</button>
    </div>
  </div>
</div>
```

### 範例四：主題切換

daisyUI 預設支援多主題切換，可透過修改 `<html>` 的 `data-theme` 屬性達成：

```html
<html data-theme="dracula">
```

或者透過 JS 切換：

```js
document.documentElement.setAttribute("data-theme", "light")
```

---

## 四、整合應用：登入頁設計

我們結合 daisyUI 元件製作一個登入表單：

```html
<div class="min-h-screen bg-base-200 flex items-center justify-center">
  <div class="card w-full max-w-sm shadow-2xl bg-base-100">
    <div class="card-body">
      <h2 class="text-2xl font-bold text-center mb-4">登入系統</h2>
      <div class="form-control">
        <label class="label">
          <span class="label-text">電子郵件</span>
        </label>
        <input type="email" placeholder="you@example.com" class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">密碼</span>
        </label>
        <input type="password" placeholder="請輸入密碼" class="input input-bordered" />
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary">登入</button>
      </div>
    </div>
  </div>
</div>
```

整合 Tailwind CSS 和 daisyUI 後這個表單完全不需要寫自訂 CSS，就能擁有一致的樣式與響應式設計。

---

## 五、總結與延伸學習

整合 Tailwind CSS 和 daisyUI 的好處在於：

- 可以保有 Tailwind CSS 的彈性與控制權。
- daisyUI 提供現成且風格統一的元件，開發速度大幅提升。
- 可輕鬆切換主題，實現暗色模式等功能。
- 支援任意框架，React、Vue、Svelte、Alpine.js 都適用。