---
title: Monorepo 入門教學筆記：使用 npm Workspaces 管理多專案 | 學習筆記
date: 2024-11-16 11:33:41
authors: kdchang
tags:
  - Monorepo
  - npm
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

## 一、什麼是 Monorepo？

**Monorepo（Monolithic Repository）** 是一種將多個相互關聯的專案（如前端、後端、共用函式庫等）統一放在同一個 Git 倉庫中進行版本管理的架構策略。這種做法可提升跨專案開發效率、共用程式碼的一致性，並簡化 CI/CD 流程。

相較於 **Multi-repo**（每個專案獨立倉庫），Monorepo 具有以下幾項優勢：

### 優點

- **統一依賴管理**：使用者可於 root 層集中管理所有套件與版本。
- **共用程式碼方便**：子專案間可以引用彼此模組，而不需額外發佈。
- **版本一致性高**：統一管理 Node.js 與 TypeScript 設定，避免各專案設定不一致。
- **原子性變更**：可一次提交多個模組的改動，有利於大型重構與追蹤問題。

### 缺點

- **權限與管理更複雜**：團隊需要良好的規範以避免耦合過深。
- **初期學習門檻略高**：需要理解 workspace 機制與設定方式。
- **大型 repo 操作效能問題**：隨專案規模增長，Git 操作與工具效能需特別注意。

---

## 二、何謂 npm Workspaces？

從 **npm 7** 開始，Node.js 官方就原生支援 Workspaces。它允許開發者在單一專案下，透過一個 `package.json` 管理多個子專案（workspace packages）。這讓 npm 也能像 Yarn 或 pnpm 一樣支援 monorepo。

特點：

- 原生支援，不需額外工具
- 使用方式簡單直觀
- 適合小型與中型 monorepo 專案

---

## 三、建立 Monorepo 專案實例（使用 npm workspaces）

### 1. 初始化根目錄

```bash
mkdir my-monorepo
cd my-monorepo
npm init -y
```

修改根目錄下的 `package.json` 加入 workspaces 設定：

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"]
}
```

這表示所有子專案會放在 `packages/` 目錄中，支援通配符 `*`。

---

### 2. 建立三個子專案

- `packages/utils`：共用函式庫
- `packages/backend`：Node.js API
- `packages/frontend`：前端應用（可用 React/Vite）

```bash
mkdir -p packages/utils
mkdir -p packages/backend
mkdir -p packages/frontend
```

初始化子專案：

```bash
cd packages/utils
npm init -y

cd ../backend
npm init -y

cd ../frontend
npm init -y
```

---

### 3. 撰寫共用模組（utils）

`packages/utils/index.js`：

```js
function greet(name) {
  return `Hello, ${name}`;
}

module.exports = { greet };
```

`packages/utils/package.json`：

```json
{
  "name": "@my/utils",
  "version": "1.0.0",
  "main": "index.js"
}
```

---

### 4. 使用共用模組於 backend

`packages/backend/index.js`：

```js
const { greet } = require("@my/utils");

console.log(greet("Backend"));
```

`packages/backend/package.json` 加入依賴：

```json
{
  "name": "@my/backend",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@my/utils": "1.0.0"
  }
}
```

當你在 monorepo 根目錄執行：

```bash
npm install
```

npm 會自動建立 workspace 之間的 symbolic link，將 `@my/utils` 套件安裝給 `@my/backend`，無需手動 `npm publish`。

執行 backend：

```bash
node packages/backend/index.js
```

輸出結果為：

```
Hello, Backend
```

---

### 5. 多專案腳本管理

在 root 的 `package.json` 中可設定統一指令：

```json
{
  "scripts": {
    "start:backend": "npm --workspace @my/backend start",
    "start:frontend": "npm --workspace @my/frontend start"
  }
}
```

若在 `@my/backend` 的 `package.json` 中定義了：

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

則可於根目錄執行：

```bash
npm run start:backend
```

---

## 四、進階使用技巧

### 1. 同時執行所有 workspace 指令

```bash
npm run build --workspaces
```

這會同時執行所有子專案中名為 `build` 的 script。

### 2. 安裝依賴給特定子專案

```bash
npm install lodash --workspace @my/backend
```

等同於進到 `packages/backend` 下執行 `npm install lodash`。

### 3. 使用 TypeScript 建構共用型別

若你使用 TypeScript，可將 `packages/utils` 改為 `index.ts` 並加上 `types` 欄位：

```json
{
  "name": "@my/utils",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}
```

建議搭配 `tsc -b` 支援 project references，以改善大型專案建置效能。

---

## 五、適合使用 Monorepo 的情境

- 前後端一體化開發（Fullstack）
- 套件開發與組合應用（如微前端架構）
- 共用型別與邏輯模組（utility / types / domain model）
- 多人協作、模組劃分清晰的大型產品

---

## 六、總結

Monorepo 是一種有效提升多專案整合效率的開發模式。透過 npm Workspaces，你可以不用額外安裝任何工具，即可快速建立一個結構清晰的 monorepo。這種架構不僅適合大型產品團隊，也非常適合個人或小型團隊開發多模組系統時採用。

建議開發者從簡單的 monorepo 起步，並根據團隊需求逐步導入版本控制策略、模組邊界規範與自動化部署流程，以發揮 Monorepo 架構的最大價值。

---

若你有意將這份架構應用到 React、Next.js、NestJS、TypeScript、Lerna 等進階框架或部署情境，歡迎告訴我，我可以提供進一步的範例與最佳實踐建議。
