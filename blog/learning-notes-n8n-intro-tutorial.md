---
title: n8n 入門教學筆記 | 學習筆記
date: 2024-12-20 11:33:41
author: kdchang
tags:
  - n8n
  - VS Code
  - 工作流程自動化工具
---

## 前言

在現代軟體開發與數位工作流程中，「自動化」已成為提升效率的關鍵。無論是處理 API 整合、資料同步、通知發送，或是各種無需人工介入的重複性工作，選擇一套靈活的工作流程自動化工具是必要的。

**n8n（pronounced "n-eight-n"）** 是一個強大的開源自動化工具，具備類似 Zapier 的拖拉式流程設計介面，但更強調**可自建、開源、自主掌控資料與程式彈性**。它支援超過 400 個內建整合（如 Slack、Google Sheets、Notion、MySQL、HTTP API 等），同時允許用戶透過 JavaScript 編寫邏輯節點，打造彈性極高的自動化流程。

相較於其他自動化工具，n8n 的最大優勢在於：「你可以在本機或伺服器上自行部署，資料完全由你掌控。」這點對於重視隱私或希望建立企業內部自動化平台的團隊尤其重要。

---

## 重點摘要

- **n8n 是什麼？**

  - 一個開源、自託管、可視化的工作流程自動化工具。
  - 名稱源自 “Node + Node = Workflow”，以節點（Node）為單位建構流程。

- **主要特色**

  - 開源、自託管、資料不外流。
  - 拖放式流程設計器，門檻低但彈性高。
  - 可撰寫 JavaScript 處理邏輯。
  - 支援 webhook、排程、event-based 工作流程。
  - 擁有超過 400 個現成整合節點（Google、Slack、GitHub、HTTP Request 等）。

- **使用場景**

  - 第三方 API 整合與自動同步。
  - 資料轉換與清洗（ETL）。
  - 表單提交後自動寄信／填寫 Google Sheets。
  - 發布內容到社群平台。
  - 團隊協作通知（如 Jira、Slack 整合）。
  - 自動監控 RSS、新留言、社群評論等。

- **部署方式**

  - 支援 Docker、本地安裝、雲端託管（n8n.cloud）、Render、Railway 等平台。
  - 可選擇免費版本或企業進階授權。

---

## 安裝與啟用方式

### 1. 使用 Docker 部署（推薦）

```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

開啟瀏覽器進入 [http://localhost:5678](http://localhost:5678) 即可開始使用。

### 2. 使用 npm 安裝

```bash
npm install n8n -g
n8n
```

同樣可透過 [http://localhost:5678](http://localhost:5678) 開啟界面。

---

## 使用介面簡介

n8n 的主界面由以下幾個部分組成：

- **Canvas（畫布）**：可拖拉節點設計流程。
- **左側工具列**：內建各種整合節點分類（Webhook、HTTP Request、Email 等）。
- **節點屬性面板**：選取節點後可編輯其參數設定。
- **執行與測試工具**：可以逐步執行流程、查看輸入與輸出資料。

---

## 實際應用範例

### 範例一：接收 Webhook 並寄送 Slack 通知

**目標流程**：當收到 Webhook（如表單送出），自動發送一則 Slack 通知。

1. 新增節點 `Webhook`：

   - 設定 HTTP 方法為 `POST`
   - 指定路徑為 `/contact`

2. 新增節點 `Slack`：

   - 動作選擇 `Send Message`
   - 填入 Slack OAuth 認證與頻道資訊
   - 訊息可使用 `{{$json["name"]}}` 這類變數取得 webhook 傳入資料

3. 將 `Webhook` → `Slack` 連接起來。

4. 啟用工作流程，對 `/webhook/contact` 發送 POST 請求，即會收到通知。

---

### 範例二：每天早上 9 點將 MySQL 資料匯出至 Google Sheets

1. 使用 `Cron` 節點設定時間為每天早上 9 點。

2. 使用 `MySQL` 節點撈出指定資料表的內容。

3. 使用 `Google Sheets` 節點將資料新增至指定試算表。

4. 可加上一個 `Function` 節點清洗或轉換資料格式。

這樣可輕鬆建立每日自動報表流程，無需撰寫一行 shell script 或排程任務。

---

### 範例三：API 整合流程（串接 ChatGPT 回覆留言）

1. 使用 `Webhook` 節點接收前端留言內容。

2. 使用 `OpenAI` 節點（或 HTTP Request + 自行送出 API 請求）傳送留言給 ChatGPT 並取得回覆。

3. 使用 `Send Email` 或 `Telegram` 節點自動回覆用戶。

n8n 支援 JSON 處理與條件邏輯節點，讓你可根據留言內容分類處理或轉送不同部門。

---

## 實用建議

- 建議搭配 **版本控制（匯出 workflow JSON）**，便於多人協作與備份。
- 若要部署至生產環境，建議設定密碼驗證與 HTTPS 保護。
- 可以將變數或 API key 設定為「環境變數」集中管理，提升安全性與可維護性。
- 利用 `Function` 與 `Set` 節點進行複雜邏輯處理與欄位映射。
- 若有即時性需求，可使用 webhook + queue-based 設計方式，避免封鎖主流程。

---

## 總結

n8n 是一款功能強大且靈活的開源工作流程自動化工具，不僅適合開發者，也適合營運、行銷、客服等跨部門自動化需求。透過拖拉節點的方式，任何人都可以建立自動化流程，取代繁瑣重複的手動操作。

與 Zapier、Make 等 SaaS 工具不同，n8n 提供了極高的可控性與可擴充性。無論是 API 整合、資料清洗、事件觸發，還是每日任務排程，n8n 都能成為你構建智慧工作流程的得力助手。

## 參考文件

1. [n8n 新手中文教學：6 步安裝、7 步驟部署第一支工作流！費用？](https://adbest.com.tw/blog/what-is-n8n/)
