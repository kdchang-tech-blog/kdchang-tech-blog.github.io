---
title: GitHub Copilot 與 Copilot Agent 入門教學筆記 | 學習筆記
date: 2024-12-20 11:33:41
author: kdchang
tags:
  - GitHub
  - GitHub Copilot
  - Copilot
  - Copilot Agent
  - 編輯器
---

## 前言

自 2021 年推出以來，**GitHub Copilot** 已成為全球數百萬開發者的編程助手，能根據上下文即時補全程式碼。2024 年，GitHub 推出進階功能 **Copilot Workspace** 和 **Copilot Agents**，進一步從單一代碼補全進化為具備「理解、操作與協作」能力的智慧 AI 開發助理。

這些新功能不僅能幫助你完成程式碼撰寫，還能協助理解需求、分析問題、規劃專案、重構模組，甚至提出 pull request 變更。本文將帶你全面認識 GitHub Copilot 及其 Agent 功能，從基本操作到進階應用，協助你提升開發效率與品質。

---

## 重點摘要

### 1. GitHub Copilot 基本功能

- AI 程式碼補全：根據上下文推薦下一行或整段程式碼。
- 註解驅動撰寫：使用自然語言描述意圖，自動轉換為程式碼。
- 測試與樣板產生：自動產出單元測試與樣板邏輯。
- 支援 VS Code、JetBrains IDE、Neovim 等。

### 2. Copilot Agents 新功能

- **工作區理解（Workspace Contextualization）**：理解整個專案結構，非僅單一檔案。
- **任務導向操作（Task-oriented Autonomy）**：透過自然語言指令，Agent 可主動找出需要修改的檔案與程式邏輯。
- **互動式任務視窗（Copilot Workspace）**：能與你共同規劃、分解、執行修改。
- **自動產生 Pull Request**：Agent 能根據需求描述，自動建立符合需求的 PR 變更建議。
- **支援自然語言任務指令**：如 “Add pagination to the user list page” 或 “Refactor login logic to support OAuth”。

### 3. 適用場景

- 新功能導入（快速建構雛型）
- 現有程式碼重構與除錯
- 快速理解大型專案結構
- 撰寫測試與文件
- 協作開發與程式碼審查輔助

---

## 使用條件與環境設置

1. **基本需求**

   - GitHub 帳號
   - VS Code 或 GitHub 官方網站（Copilot Workspace）
   - GitHub Copilot 訂閱（個人 / 企業方案）

2. **啟用方式**

   - 在 VS Code Marketplace 安裝「GitHub Copilot」擴充功能
   - 若已啟用 Agent 功能（目前逐步開放），將會在 Copilot 介面看到 Workspace 或 Chat 模式

3. **使用 Copilot Workspace**（預設僅企業帳戶開放測試）

   - 登入 GitHub，進入某個 repo
   - 點擊 `Copilot` 按鈕開啟 Workspace
   - 輸入任務描述，例如：`Convert all date logic to use UTC`
   - Copilot 會分析整個程式碼庫，自動生成變更建議與 Pull Request

---

## 實際範例

### 範例一：註解驅動補全

輸入：

```javascript
// 寫一個可以將字串反轉的函式
```

Copilot 自動補全：

```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
```

---

### 範例二：Copilot Chat 對話式問答

使用快捷鍵 `Cmd+I` 或從 VS Code Copilot Chat 面板提問：

```
請幫我解釋這段程式碼的作用：parseDate(input, 'YYYY-MM-DD')
```

Copilot 回應：

```
這段程式碼會將字串 input 解析為特定格式的日期物件，格式為 'YYYY-MM-DD'，可能使用的是 dayjs 或 moment 函式庫。
```

---

### 範例三：Copilot Agent 自動任務執行（需 Workspace 模式）

任務描述：

```
Refactor login controller to support Google OAuth
```

流程：

1. Copilot 會分析 `controllers/login.js` 或相似檔案
2. 自動識別現有的登入邏輯
3. 插入 Google OAuth 處理邏輯（可能使用 passport.js 或其他第三方庫）
4. 產生變更摘要與建議 Pull Request
5. 開發者審閱後即可 merge

---

### 範例四：整合單元測試建議

輸入：

```python
def is_palindrome(s):
    return s == s[::-1]
```

在測試檔案中輸入：

```python
def test_is_palindrome():
```

Copilot 自動補全：

```python
    assert is_palindrome("racecar") == True
    assert is_palindrome("hello") == False
    assert is_palindrome("") == True
```

---

## 建議與最佳實踐

1. **善用自然語言描述**
   Copilot Agent 具有語意理解能力，越具體的任務描述，越能產出正確結果。

2. **審核與測試不可省略**
   AI 輔助雖強，但仍可能產生誤邏輯或不符合風格的程式碼，請務必加入測試與審查。

3. **適合用於重複與樣板任務**
   例如 CRUD、測試、自動 refactor、邏輯轉換等。

4. **搭配 GitHub Actions 使用更強大**
   可結合 CI/CD 流程，自動執行 Copilot Agent 產生的 PR。

---

## 總結

GitHub Copilot 已從單純的程式補全工具，蛻變為具備理解上下文、可互動操作的智慧開發代理人。透過 Copilot Agent，你不僅能提升撰寫速度，還能更高層次地規劃、修改與維護專案。

對個人開發者而言，Copilot 是每日開發的好助手；對團隊而言，Copilot Agent 更像是一位全天候不下班的開發實習生，協助你管理技術債、維護程式庫、強化開發工作流。

## 參考文件

1. [最佳 GitHub Copilot 設定](https://github.com/doggy8088/github-copilot-configs)
2. [從「寫程式」到「與 AI 共舞」── 我在公司推動 Vibe Coding 的經驗分享](https://medium.com/@cct0201/%E5%BE%9E-%E5%AF%AB%E7%A8%8B%E5%BC%8F-%E5%88%B0-%E8%88%87-ai-%E5%85%B1%E8%88%9E-%E6%88%91%E5%9C%A8%E5%85%AC%E5%8F%B8%E6%8E%A8%E5%8B%95-vibe-coding-%E7%9A%84%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-015e28909290)
3. [2025 年最強推薦 Vibe Coding 工具一次看懂](https://gitmind.com/tw/best-vibe-coding-tools-2025.html)
