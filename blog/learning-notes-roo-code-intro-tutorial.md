---
title: Roo Code 詳細介紹：AI VS Code 編輯器外掛入門教學筆記 | 學習筆記
date: 2025-02-20 11:33:41
authors: kdchang
tags:
  - Roo Code
  - VS Code
  - 編輯器
---

## 前言

Roo Code（原名 Roo Cline）是一款嵌入於 Visual Studio Code 編輯器中的開源 AI 代理，能讀寫檔案、自動執行終端指令、操作瀏覽器，甚至整合多種 LLM 模型。無論是編寫程式、重構、除錯、架構設計，Roo Code 都能協助你提升開發效率，更像是一個智慧且自主的開發團隊成員。

---

## 重點摘要

1. **核心功能與定位**

   - 像開發團隊的 AI 助手，能讀寫檔案、執行命令、自動操作終端與瀏覽器
   - 支援自然語言溝通，整合 OpenAI、Gemini、Anthropic、Deepseek 等多種提供者

2. **多模式運作（Modes）**

   - **Code Mode**：主要用於撰寫與 refactor 程式碼
   - **Architect Mode**：聚焦系統設計與高階規劃
   - **Ask Mode**：解答問題、技術查詢
   - **Debug Mode**：專門診斷並修復錯誤

3. **工具整合**

   - 可撰寫檔案、執行 CLI 指令、操控瀏覽器
   - 支援外部工具擴充（MCP：Model Context Protocol），可接入資料庫、API、指令集

4. **客製化能力強**

   - 自訂指令與 prompt
   - 建立自訂模式，定義專屬角色（如測試工程師、設計師）

5. **專案記憶與 Context 管理**

   - 支援 context condensing 和索引技術，避免長案子失去關聯性

---

## 安裝與初步設置

### 1. 安裝 Roo Code

- 打開 VS Code，前往 Extensions 搜尋「Roo Code」，點擊安裝

### 2. 設定 AI 提供者

- 支援 OpenAI-compliant API，例如 OpenAI 本身、OpenRouter、Anthropic、Gemini 等
- 透過裡面 Preferences 設定 API Key、Model ID、Mode 對應關係

---

## 實作範例（實際使用流程）

### 範例 A：建立新檔案

1. 切換到 **Code Mode**
2. 輸入：「Create a basic HTML template for a portfolio website」
3. Roo Code 生成 HTML 檔案並顯示 diff
4. 審核後確定寫入實際工作區

→ 成功驗證：可透過開啟檔案確認生成內容

### 範例 B：執行命令（CLI / Build / Test）

1. 讓 Roo 進入程式模式
2. 輸入：「Run npm install」
3. Roo 使用終端指令完成套件安裝，且結果顯示在你的終端

→ 驗證指令正確執行

### 範例 C：使用 Architect Mode 規劃功能

1. 切換至 **Architect Mode**
2. 提出：「Help me plan data access layer for a todo application」
3. Roo 回應並建立記錄文件（如 `.md` 記錄實作計畫），建立指引

→ 這種模式能生成結構化內容並建立 Context 記錄

---

## 深入技巧與最佳實踐

- **啟用 Indexing / Context Condensing**：讓 Roo 在大型專案中維持上下文關聯性，有效處理長案不遺漏
- **自訂模式（Custom Modes）**：為不同角色（如 QA、設計師）建立專屬對話與指令集
- **MCP 擴充**：串接外部系統（如 AWS、Jira），擴展 Roo 能力
- **權限控制**：設定自動執行命令範圍、上下文層級，以符合安全標準
- **模式搭配 LLM 模型**：Schema 例：使用 Deepseek R1 做 code、Gigantic Gemini 做 architect、等

---

## 操作範例：結合免費 LLM 模型

假設你想要整合免費模型：

1. 透過 OpenRouter 啟用 DeepSeek R1、Gemini Flash 模型
2. 將 model 分配到不同模式：如 Architect 模式使用 Gemini、Code 模式使用 DeepSeek
3. 透過 Roo 對話測試指令：

   - “Generate React component for ToDo item list.”
   - “Update backend schema to include due date.”

---

## 總結

Roo Code 是一款功能強大且高度可客製的 AI 編程代理工具，適合想提升開發效率、探索 AI 開發流程的人使用。核心優勢包括：

- 多種工作模式切換（`Code` / `Architect` / `Ask` / `Debug`）
- 可控且安全的檔案與終端操作
- 擴充能力強，可透過 MCP、Context Condensing、自訂模式延伸功能
- 支援多種 LLM 提供者，具備彈性與擴充性

由於功能豐富，建議一開始可以先安裝外掛並先從簡單任務使用起：生成範例檔案、執行終端指令，接著再進行構架規劃與系統整合。

## 參考文件

1. [Roo Code 接入 Claude API 完全指南：无惧官网限制而快速用上](https://help.apiyi.com/roo-code-claude-api-integration-guide.html)
2. [【Vibe Coding 神器】VS Code 超強 AI 插件 Roo Code 實作教學：Ask 模式分析專案、協調器模式開發全新專案、Debug 模式進行除錯！](https://www.youtube.com/watch?v=c5pDWj-zLDQ)
3. [Vibe Coding 真的這麼神？上集 來自開發團隊的真實導入經驗 聊聊實踐與成效｜#VibeCoding #AI #軟體開發 #開發團隊｜ JUGG 聊敏捷#22](https://www.youtube.com/watch?v=Vb8Vgs5sZiA)
4. [Vibe Coding 真的這麼神？下集 來自開發團隊的真實導入對談｜導入的坑、文化與建議｜#VibeCoding #AI #軟體開發 #開發團隊 #AI 導入｜ JUGG 聊敏捷#23](https://www.youtube.com/watch?v=eZWVzTd3mkU)
5. [70% 問題：關於 AI 輔助開發的真實樣貌](https://www.thingsaboutweb.dev/zh-TW/posts/the-70-percent-problem#%E8%87%AA%E4%B8%BB%E4%BD%86%E5%8F%97%E5%BC%95%E5%B0%8)
