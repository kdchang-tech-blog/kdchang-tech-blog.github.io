---
title: Tailwind CSS 入門教學筆記 | 學習筆記
date: 2024-12-01 02:23:41
author: kdchang
tags: 
    - Tailwind CSS
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - CSS
    - Tailwind

---

# 一、什麼是 Tailwind CSS？  
Tailwind CSS 是一款以「`工具類別優先`」（`Utility-First`）為核心設計理念的 CSS 框架，與傳統的 CSS 框架（如 Bootstrap、Bulma）不同，它不提供預設的 UI 元件，而是提供大量的樣式工具類別，讓開發者可以快速組合來建構 UI，而不需要額外撰寫自訂 CSS。  

相較於傳統 CSS 框架，Tailwind CSS 具有以下幾個主要優勢：  

1. **開發效率高**：只需使用`類別組合`即可完成設計，無需撰寫額外 CSS。  
2. **高度可客製化**：可以透過設定檔調整顏色、字型、間距等設計。  
3. **內建響應式支援**：透過 `sm: md: lg: xl:` 等前綴輕鬆定義不同裝置的樣式。  
4. **一致性強**：開發團隊可以統一使用 Tailwind CSS 定義的設計樣式，減少 UI 風格不一致的問題。  
5. **效能優化**：可透過 PurgeCSS 移除未使用的樣式，確保最小化 CSS 檔案大小，提高網站載入速度。  

---

# 二、安裝 Tailwind CSS  
Tailwind CSS 可以透過多種方式安裝，以下介紹幾種常見的方法：  

### 1. 使用 CDN（適合快速測試）  

如果只是想快速體驗 Tailwind CSS，可以直接在 HTML 檔案中加入以下 `<link>`：  

```html
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.0.0/dist/tailwind.min.css" rel="stylesheet">
```

這種方式適合小型專案或測試 Tailwind CSS 的功能，但不適合正式開發，因為無法使用客製化設定。  

### 2. 透過 npm 安裝（推薦方式）  

在正式開發環境中，建議使用 npm 或 yarn 來安裝 Tailwind CSS，以便進行客製化設定。  

**安裝 Tailwind CSS**：  

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

執行上述指令後，會在專案根目錄中產生 `tailwind.config.js` 設定檔，可用來調整 Tailwind 的預設樣式。  

**設定 Tailwind CSS**：  

開啟 `tailwind.config.js`，找到 `content` 設定，確保 Tailwind 只處理專案內的相關檔案，例如：  

```js
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

這樣 Tailwind CSS 就只會掃描 `src` 資料夾內的 HTML、JavaScript 和 TypeScript 檔案，避免產生不必要的 CSS。  

**引入 Tailwind 樣式**：  

在 `src/index.css` 或 `styles.css` 檔案中加入以下內容，讓 Tailwind CSS 套用基礎樣式：  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

最後，在開發環境中執行 Tailwind 編譯指令：  

```sh
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

這會自動監聽檔案變化，並輸出 Tailwind CSS 的樣式到 `output.css`。  

---

# 三、Tailwind CSS 常用類別  
Tailwind CSS 提供大量的工具類別，以下介紹幾個常用的類別和應用範例。  

### 1. 文字樣式  

Tailwind 允許透過類別來快速調整字體大小、顏色、行距等樣式，例如：  

```html
<p class="text-lg font-bold text-gray-700 leading-relaxed">
  這是一段示範文字
</p>
```

其中：  

- `text-lg`：字體大小  
- `font-bold`：加粗  
- `text-gray-700`：深灰色文字  
- `leading-relaxed`：行距較寬  

### 2. 背景與邊框  

可以使用背景色與邊框樣式來設計 UI，示例如下：  

```html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
  Tailwind CSS 範例
</div>
```

- `bg-blue-500`：藍色背景  
- `text-white`：白色文字  
- `p-4`：內距 16px  
- `rounded-lg`：圓角  
- `shadow-lg`：大型陰影  

### 3. Flexbox 佈局  

Tailwind CSS 提供完整的 Flexbox 工具類別，讓開發者能夠快速進行佈局：  

```html
<div class="flex items-center justify-between p-4 bg-gray-200">
  <div>左側內容</div>
  <div>右側內容</div>
</div>
```

- `flex`：啟用 Flexbox  
- `items-center`：垂直置中  
- `justify-between`：左右對齊  

### 4. Grid 佈局  

使用 Grid 來建立多欄式佈局：  

```html
<div class="grid grid-cols-3 gap-4">
  <div class="bg-red-200 p-4">1</div>
  <div class="bg-green-200 p-4">2</div>
  <div class="bg-blue-200 p-4">3</div>
</div>
```

- `grid`：啟用 Grid  
- `grid-cols-3`：建立三欄  
- `gap-4`：欄間距  

### 5. 響應式設計  

Tailwind 內建響應式前綴，適用於不同裝置：  

```html
<div class="text-base md:text-lg lg:text-xl xl:text-2xl">
  響應式字體大小
</div>
```

- `text-base`：手機（預設）  
- `md:text-lg`：平板（`min-width: 768px`）  
- `lg:text-xl`：筆電（`min-width: 1024px`）  
- `xl:text-2xl`：桌機（`min-width: 1280px`）  

---

# 四、Tailwind CSS 進階功能  
### 1. 自訂樣式  

可以透過 `tailwind.config.js` 來擴充自訂樣式，例如新增顏色：  

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#9333EA",
      },
    },
  },
};
```

這樣就可以在 HTML 中使用 `text-primary` 或 `bg-secondary` 來套用顏色。  

### 2. 使用 @apply 簡化樣式  

在 CSS 檔案中使用 `@apply` 來重複使用 Tailwind 類別：  

```css
.btn {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
```

然後在 HTML 中只需寫：  

```html
<button class="btn">按鈕</button>
```

---

# 五、總結
Tailwind CSS 透過工具類別的方式大幅提升開發效率，並提供響應式設計、靈活佈局與高度客製化的功能。對於前端開發者而言，熟悉 Tailwind CSS 可以讓 UI 設計更加直觀、高效，並減少對自訂 CSS 的依賴，進而提升開發維護性。