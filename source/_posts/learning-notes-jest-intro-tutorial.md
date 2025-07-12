---
title: Jest 使用 ES Module 入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
author: kdchang
tags:
  - Jest
  - ES Module
---

## 前言

在 JavaScript 開發中，**ES Modules (ESM)** 已成為標準。從 Node.js 12 開始，ESM 已獲得原生支援，而前端開發（如 React、Vue、Svelte 等框架）早已全面採用 ES Module。
然而，當我們使用 Jest 來撰寫與執行測試時，若要直接使用 ES Module，會遇到一些設定上的挑戰。本篇筆記將說明如何在專案中讓 Jest 正確執行 ES Module 程式碼，並透過實例展示操作流程。

---

### 1. Jest 是否支援 ES Module？

Jest 自 **v27** 版本開始實驗性支援 ES Module，到了 **v28 以後更加穩定**。但因為 Node.js 與 CommonJS、ESM 的處理邏輯不同，仍需要額外設定。

若你使用 ES Module（例如 `.mjs` 檔案、`type: module`），或是前端專案用 ES6 `import` / `export`，就必須進行相應的 Jest 設定。

---

### 2. 初始化專案與安裝 Jest

首先，我們建立一個 Node.js 專案：

```bash
mkdir jest-esm-demo
cd jest-esm-demo
npm init -y
```

接著安裝 Jest：

```bash
npm install --save-dev jest
```

**重點！** 在 `package.json` 中加入 `type: "module"`，讓整個專案採用 ES Module：

```json
{
  "name": "jest-esm-demo",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

---

### 3. 撰寫 ES Module 程式碼

假設我們有一個簡單的 **加法模組** `sum.mjs`：

```javascript
// sum.mjs
export function sum(a, b) {
  return a + b;
}
```

接著建立測試檔案 `sum.test.mjs`：

```javascript
// sum.test.mjs
import { sum } from './sum.mjs';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

這時候直接執行 `npm test` 會報錯：

```
SyntaxError: Cannot use import statement outside a module
```

因為 **Jest 預設使用 CommonJS**，不認得 ES Module，需要額外設定。

---

### 4. 設定 Jest 支援 ES Module

#### 方案一：使用 `jest.config.js` 並指定 `transform`

首先，安裝 **Babel** 或 **`jest-esm-transformer`** 之類的工具。如果希望簡單一點，可以直接使用 Jest 的內建 ESM 模式（推薦）。

建立 `jest.config.js`：

```javascript
// jest.config.js
export default {
  transform: {},
  extensionsToTreatAsEsm: ['.mjs'],
  testEnvironment: 'node',
};
```

**重點設定解釋：**

- `transform: {}` 表示不使用 Babel 或其他轉譯器
- `extensionsToTreatAsEsm` 告訴 Jest 哪些副檔名視為 ESM
- `testEnvironment: 'node'` 使用 Node 環境（非 jsdom）

執行 `npm test`，這時候仍會報錯：

```
Jest encountered an unexpected token
```

因為 Jest 內建 transform 無法處理 ES Module 語法（即便 Node.js 支援，但 Jest 內部解析流程不同）。

---

### 5. 方案二：使用 `babel-jest` 轉譯 ESM

安裝 Babel 及相關套件：

```bash
npm install --save-dev @babel/preset-env babel-jest
```

建立 `.babelrc`：

```json
{
  "presets": ["@babel/preset-env"]
}
```

更新 `jest.config.js`：

```javascript
export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.mjs'],
  testEnvironment: 'node',
};
```

這樣 Jest 會用 **babel-jest** 處理 `.js`、`.mjs` 檔案，並當作 ESM 解析。

此時執行 `npm test`，測試就會通過：

```
PASS  ./sum.test.mjs
✓ adds 1 + 2 to equal 3 (5 ms)
```

---

### 6. 測試更複雜情境

假設我們有一個 **fetch 模組**，使用 async function：

```javascript
// fetchData.mjs
export async function fetchData() {
  return 'peanut butter';
}
```

測試檔：

```javascript
// fetchData.test.mjs
import { fetchData } from './fetchData.mjs';

test('returns peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```

一樣執行 `npm test`，因為已經設定好 Babel 與 ESM，非同步測試也能正常運作。

---

### 7. 使用 `import.meta.url` 注意事項

如果你的程式中有用 `import.meta.url`（例如讀取檔案、動態載入），要注意 **Jest 執行時 context 與 Node.js 直跑不同**。

例如：

```javascript
// fileUtil.mjs
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function readConfig() {
  const filePath = join(__dirname, 'config.json');
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
```

測試時要確保 `import.meta.url` 能被正確解析（可能需要 `jest-environment-node`，或 Mock 檔案路徑）。

---

### 8. 常見錯誤與解法

**問題：`SyntaxError: Cannot use import statement outside a module`**

- 確認 `jest.config.js` 中有 `extensionsToTreatAsEsm`
- 測試檔、副程式檔是否副檔名為 `.mjs`

**問題：`Unexpected token export`**

- 確認有設定 `transform` 使用 `babel-jest`
- 確認 `.babelrc` 正確啟用 `@babel/preset-env`

**問題：ESM 測試檔找不到 module**

- 確認 `package.json` 有 `type: module`
- 相對路徑記得補 `.mjs` 副檔名

---

### 9. 實用 Jest CLI 指令

- 執行單一測試檔：

```bash
npx jest sum.test.mjs
```

- 只跑某個測試：

```javascript
test.only('專跑這個測試', () => { ... });
```

- 顯示覆蓋率：

```bash
npx jest --coverage
```

---

## 總結

Jest 預設是為 **CommonJS** 設計，但隨著 **ES Module** 在 Node.js 與前端日漸普及，支援 ESM 變得越來越重要。

透過本文介紹，我們可以知道：

1. `type: module` 啟用 ESM
2. Jest 需要設定 `transform` 及 `extensionsToTreatAsEsm`
3. 使用 `babel-jest` 來處理 ESM
4. 注意 `import.meta.url`、路徑、非同步等 ESM 細節

雖然設定比 CJS 稍微複雜，但一旦設定好後，整個測試流程一樣流暢，也能為未來更符合現代標準的專案奠定基礎。

建議未來若有使用 TypeScript、React、Vue 等，也可以結合對應的 transformer 與設定，讓 Jest 完全支援你的開發。
