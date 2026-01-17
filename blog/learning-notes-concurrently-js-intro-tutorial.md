---
title: concurrently.js 入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - Django
  - RESTful
---

## 前言

在前端與全端開發中，我們經常需要**同時執行多個指令**，例如一邊啟動前端開發伺服器，一邊啟動後端 API 伺服器，或一邊監看 Sass 編譯，一邊執行 TypeScript 編譯。在這樣的情境下，`concurrently` 是一個非常實用的工具，它能讓我們在同一個命令列同時執行多個命令。

本篇筆記將介紹 `concurrently` 是什麼、如何安裝、基本用法，以及實際應用範例。

---

### 什麼是 concurrently？

`concurrently` 是一個 Node.js 套件，可以在一個命令中**同時執行多個命令行指令**，而且會把各個執行的結果分別以不同顏色標示，方便辨認。它常用來取代 `npm-run-all`、`gulp` 等工具中針對「平行執行任務」的需求。

官方說明：**“Run multiple commands concurrently.”**

例如你想同時執行一個 React 專案的前端開發伺服器與後端 API 伺服器：

```bash
npm run start-frontend & npm run start-backend
```

在不同系統或 shell 可能有兼容性問題，用 `concurrently` 則會簡單許多。

---

## 1️⃣ 安裝 concurrently

首先，你需要在專案中安裝 `concurrently`：

```bash
npm install concurrently --save-dev
```

或者使用 yarn：

```bash
yarn add concurrently --dev
```

安裝完成後，你可以在 `package.json` 的 `scripts` 區塊中使用它。

---

## 2️⃣ 基本用法

最基本的用法如下：

```bash
npx concurrently "command1" "command2"
```

例如，同時執行 `npm run server` 和 `npm run client`：

```bash
npx concurrently "npm run server" "npm run client"
```

執行時會在終端顯示兩個任務的 log，並自動用不同顏色標示來源。

---

## 3️⃣ 在 `package.json` 中使用

通常我們會把 `concurrently` 寫在 `package.json` 裡的 scripts 區塊：

```json
{
  "scripts": {
    "server": "node server.js",
    "client": "react-scripts start",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
}
```

執行 `npm run dev`，就會同時執行 `server.js`（後端）與 `react-scripts start`（前端）。

這樣只需要一個指令就能同時啟動兩個服務，對開發非常方便。

---

## 4️⃣ 實際範例：React + Express 同時啟動

假設你有一個專案結構如下：

```
my-app/
  client/
    (React 專案)
  server/
    (Express 後端)
```

### `server/package.json`

```json
{
  "name": "server",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  }
}
```

### `client/package.json`

```json
{
  "name": "client",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start"
  }
}
```

在專案根目錄的 `package.json` 中加入：

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "concurrently \"npm start --prefix server\" \"npm start --prefix client\""
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

- `--prefix` 是讓 npm 到指定資料夾執行
- `npm start --prefix server` 會到 `server/` 資料夾執行 `npm start`
- `npm start --prefix client` 會到 `client/` 資料夾執行 `npm start`

此時執行：

```bash
npm start
```

就會**同時啟動 React 前端與 Express 後端**，而且都會在終端中顯示 log，方便觀察開發情況。

---

## 5️⃣ 進階用法

### ✅ 自訂 prefix 與顏色

可以自訂 log 標籤與顏色，方便辨識哪一個 log 來自哪個指令：

```bash
npx concurrently --names "BACK,FRONT" --prefix-colors "bgBlue.bold,bgMagenta.bold" "npm run server" "npm run client"
```

效果：

```
[BACK] server running on port 5000
[FRONT] webpack compiled successfully
```

---

### ✅ 自動終止所有執行中的任務

當一個任務失敗時，讓其他任務也自動停止：

```bash
npx concurrently --kill-others "npm run server" "npm run client"
```

當其中一個 command 錯誤，另一個也會被 kill，避免殘留無用的背景 process。

---

## 6️⃣ 常見用途

`concurrently` 常見的使用情境有：

- 同時啟動多個 Node.js 服務
- 一邊監看 Sass/LESS 編譯，一邊執行 webpack
- 同時跑 test 與 build
- 同時監看前端與後端程式碼

如果你用 `create-react-app`、`Next.js`、`Vite`、`Express`、`NestJS` 這些框架開發全端應用，`concurrently` 非常適合整合開發流程。

---

## 7️⃣ 與其他工具比較

`concurrently` 的特色在於：

- 簡單語法（不需要額外配置檔）
- 支援 Windows、Linux、Mac
- 輕量、僅做平行執行，不強制任務流程
- log 輸出自帶標籤與顏色
- 可搭配 npm script 或 npx 單獨執行

如果需要「先後順序執行多個任務」，則可以搭配 `npm-run-all`。

---

## 總結

`concurrently` 是一個適合在開發環境中同時執行多個命令的小工具，對需要前後端同時啟動、前端多個編譯工作並行的開發者非常實用。

它用法簡單、安裝快速、跨平台，推薦將它納入專案開發腳本中，以提升開發效率。

希望這篇筆記能幫助你了解 `concurrently` 的用途與基本操作！
