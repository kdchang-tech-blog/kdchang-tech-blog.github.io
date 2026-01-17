---
title: 將 Vue 3 應用部署到 GitHub Pages 入門語法教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - Vue
  - GitHub Pages
---

要將 Vue 3 應用部署到 GitHub Pages，這裡有一個詳細的步驟說明，指導你如何使用 `gh-pages` 部署你的應用。

### 1. 安裝 `gh-pages` 套件

首先，你需要安裝 `gh-pages` 套件來將你的專案部署到 GitHub Pages。

在專案目錄中執行以下命令：

```bash
npm install --save-dev gh-pages
```

### 2. 配置 `vite.config.js`

為了將專案部署到 GitHub Pages，你需要配置 `vite.config.js` 文件中的 `base` 屬性，讓它使用 GitHub 的存儲庫名稱作為基本路徑。

打開 `vite.config.js`，並根據你的 GitHub 用戶名和存儲庫名稱來設定 `base` 屬性。假設你的 GitHub 存儲庫名稱是 `my-vue-app`，配置應該是：

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-vue-app/", // 用你的 GitHub repository 名稱替換
});
```

### 3. 更新 `package.json`

你需要在 `package.json` 中添加兩個腳本來處理部署。打開 `package.json`，並在 `scripts` 部分添加 `predeploy` 和 `deploy` 腳本：

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

- `predeploy` 會先執行 `npm run build`，這會構建你的應用。
- `deploy` 會將 `dist` 目錄（即構建後的文件）推送到 GitHub Pages。

### 4. 設定 GitHub Pages

如果你還沒設定過 GitHub Pages，請先確保你的 GitHub 存儲庫設定了 GitHub Pages。

1. 在 GitHub 上打開你的存儲庫。
2. 點擊 `Settings`。
3. 滾動到 `Pages` 部分，並將 `Source` 設定為 `gh-pages` 分支。

### 5. 部署到 GitHub Pages

完成上述配置後，你就可以將專案部署到 GitHub Pages 了。

執行以下命令來構建並部署專案：

```bash
npm run deploy
```

`gh-pages` 會自動將構建後的 `dist` 目錄推送到 `gh-pages` 分支。你可以在 GitHub 上查看部署情況。

### 6. 訪問你的應用

部署完成後，你可以使用以下 URL 來訪問你的應用：

```
https://<你的 GitHub 用戶名>.github.io/my-vue-app/
```

請將 `<你的 GitHub 用戶名>` 和 `my-vue-app` 替換為你實際的 GitHub 用戶名和存儲庫名稱。

### 7. 自動化部署（可選）

如果我們希望每次推送代碼時自動部署到 GitHub Pages，你可以使用 GitHub Actions 來自動化這個過程。GitHub 提供了許多現成的 Actions 來進行自動部署，像是 [GitHub Action for deploying to GitHub Pages](https://github.com/marketplace/actions/deploy-to-github-pages)。
