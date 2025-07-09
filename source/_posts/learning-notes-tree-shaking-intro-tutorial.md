---
title: Tree Shaking 介紹與入門教學筆記 | 學習筆記
date: 2024-07-02 02:23:41
author: kdchang
tags:
  - Tree Shaking
  - ES Module
---

## 前言

在現代前端開發中，專案的程式碼結構越來越複雜，為了提高效能與使用者體驗，**減少最終打包後的 JavaScript 檔案大小**成為一項重要任務。這時，「Tree Shaking」技術便扮演了關鍵角色。

**Tree Shaking** 是一種靜態程式碼分析技術，能夠在打包階段分析模組之間的依賴關係，**移除未被實際使用的程式碼（dead code）**。這不僅能優化網站載入速度，也讓程式碼更精簡、維護性更高。

---

## 重點摘要

- **Tree Shaking 是什麼：**

  - 靜態分析 JavaScript 模組的依賴關係，排除未使用的導出（export）。
  - 減少 bundle 體積，提升網站效能與載入速度。

- **依賴條件：**

  - 必須使用 **ES Module**（`import` / `export`），不適用於 CommonJS（`require` / `module.exports`）。
  - 模組必須 **無副作用（side effects）**。
  - 打包工具必須支援 Tree Shaking（如 Webpack、Rollup、Vite）。

- **支援工具：**

  - **Webpack**：需設定 `mode: 'production'`，可配合 `sideEffects` 設定。
  - **Rollup**：原生支援 Tree Shaking。
  - **Vite**：基於 Rollup，自然具備支援能力。

- **副作用（Side Effects）：**

  - 當模組在載入時就執行會對外部環境產生影響的操作（如改寫全域物件、注入 CSS），即視為有副作用。
  - 若模組被標示為有副作用，Tree Shaking 不會移除它，即使未被使用。

---

## 實際範例

以下範例展示如何使用 Tree Shaking 與如何正確設定專案來支援這項技術。

### 範例 1：錯誤導入方式，導致無法 Tree Shaking

```js
// main.js
import _ from 'lodash';

const result = _.uniq([1, 2, 2, 3]);
```

使用 `import _ from 'lodash'` 會引入整個 Lodash 函式庫，即使你只使用了 `uniq` 一個函式，打包結果也包含全部模組。

---

### 範例 2：正確方式，搭配 Tree Shaking 使用

```bash
npm install lodash-es
```

```js
// main.js
import { uniq } from 'lodash-es';

const result = uniq([1, 2, 2, 3]);
```

`lodash-es` 是 Lodash 的 ES 模組版本，允許 Tree Shaking。打包工具會自動排除未使用的其他函式，例如 `cloneDeep`、`merge` 等，顯著降低檔案體積。

---

### 範例 3：Webpack 基礎設定

```js
// webpack.config.js
module.exports = {
  mode: 'production', // 啟用 Tree Shaking 與壓縮
  optimization: {
    usedExports: true, // 標記已使用的模組導出（production 模式下自動啟用）
  },
};
```

```json
// package.json
{
  "sideEffects": false
}
```

這樣的設定告訴 Webpack 整個專案皆無副作用，因此可放心進行模組的 Tree Shaking。

若有些檔案需保留副作用（如樣式導入），可以用陣列方式指定：

```json
{
  "sideEffects": ["./src/styles.css"]
}
```

---

### 範例 4：Rollup 自動 Tree Shaking

Rollup 原生支援 Tree Shaking，只需使用 ES Module 即可：

```js
// rollup.config.js
import { defineConfig } from 'rollup';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [babel({ babelHelpers: 'bundled' })],
});
```

Rollup 會分析哪些函式實際被使用，未使用的會自動排除。

---

## 建議實務策略

- **使用模組化的函式庫版本**，如 `lodash-es`、`date-fns`（每個功能一個函式）。
- **避免使用 CommonJS 套件或 `require()` 語法**，否則無法靜態分析。
- **定期分析 bundle 體積**，使用工具如 [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)。
- **結合動態 import**，搭配 lazy loading 拆分 chunk 可進一步優化效能。

---

## 補充副作用（side effects）

在 JavaScript 中，**副作用（side effects）** 指的是 **當程式碼執行時，對外部環境造成改變或依賴外部狀態** 的行為。副作用是 Tree Shaking 技術的一大考量點，因為具有副作用的程式碼通常無法被安全地移除，即使它沒有被「明確使用」。

---

## 一、什麼是副作用？

### 常見的副作用行為包括：

- **修改全域變數或物件**
- **DOM 操作**
- **寫入檔案 / 本地儲存**
- **發送 API 請求**
- **設定計時器（`setTimeout` / `setInterval`）**
- **console.log、alert 等印出操作**
- **匯入會執行即時副作用的模組（例如樣式、polyfill）**

---

## 二、舉例說明

### ✅ 無副作用（pure function）

```js
export function add(a, b) {
  return a + b;
}
```

這個函式純粹根據輸入產出結果，不會影響其他程式碼，可被安全地移除或優化。

---

### ❌ 有副作用

```js
console.log('載入模組時執行'); // 印出訊息就是副作用

document.body.style.backgroundColor = 'black'; // 操作 DOM

export function add(a, b) {
  return a + b;
}
```

即使 `add()` 函式未使用，只要這個模組被 import，就會執行 `console.log` 和 `document` 操作，因此打包工具不敢移除它（怕破壞行為）。

---

## 三、Tree Shaking 為什麼在意副作用？

因為 Tree Shaking 的目標是 **移除未使用的程式碼**，但：

- 如果一段程式碼 **可能有副作用**，打包工具 **不敢隨便刪除**，怕造成功能錯誤。
- 所以需要明確標示模組是否有副作用。

---

## 四、如何告訴打包工具副作用資訊？

在專案或套件的 `package.json` 加入：

```json
{
  "sideEffects": false
}
```

代表：整個專案或套件中，所有模組都無副作用，Webpack/Rollup 就可以放心 Tree Shake。

若某些檔案（如樣式）確實有副作用，可以指定：

```json
{
  "sideEffects": ["./src/styles.css"]
}
```

---

## 五、實務建議

- 撰寫可預測的 **純函式（Pure Function）**，避免模組執行就改變外部狀態。
- 匯入函式時盡量使用模組化方式，例如只 import 使用到的功能。
- 避免使用模組中會「立即執行」某些操作的套件，若無法避免，務必在 `sideEffects` 中設定。

副作用本身並不是壞事，許多實用功能（像是發送請求、改變頁面樣式）本來就需要副作用。但在做效能優化時，**了解副作用的存在與影響是 Tree Shaking 成功的關鍵**。

若模組沒有副作用，且未被使用，就可以安全地刪除。這就是 Tree Shaking 的核心機制。

## 總結

Tree Shaking 是現代前端打包流程中的一項關鍵技術，對於大型應用或需要精細資源管理的專案尤其重要。透過正確地使用 ES 模組、無副作用模組設計與支援工具設定，開發者可以有效刪除未使用的程式碼，提升效能、加快載入速度，並優化使用者體驗。

在實務專案中，建議開發者持續追蹤打包結果，並使用具備良好模組結構與 Tree Shaking 支援的函式庫，以保持專案維持在最佳的資源狀態。
