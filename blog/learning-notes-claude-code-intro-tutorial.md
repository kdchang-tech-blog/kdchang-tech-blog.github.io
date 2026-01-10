---
title: Claude Code 入門教學筆記 | 學習筆記
date: 2024-12-20 11:33:41
author: kdchang
tags:
  - Claude
  - Claude Code
  - 編輯器
  - AI IDE
---

## 前言

隨著 AI 編程助手的發展，越來越多開發者開始使用 AI 工具來加速開發流程。由 Anthropic 推出的 **Claude Code**，是一個專為程式設計任務設計的生成式 AI 模型。它結合 Claude 的強大語言理解能力，專注於代碼撰寫、重構、除錯與文件生成，並支援多種程式語言。

與 GitHub Copilot、ChatGPT 等工具類似，Claude Code 目標是協助開發者更有效率地完成日常開發任務。不過，它也有獨特的優勢：例如更嚴謹的安全性考量、對上下文理解的廣度，以及與 Anthropic 所提倡的 Constitutional AI 架構相結合的「安全設計」。

本篇筆記將說明 Claude Code 的特色與基礎使用方式，協助你快速上手。

---

## 重點摘要

- **Claude Code 是什麼？**

  - 由 Anthropic 推出的 AI 編程輔助模型，基於 Claude 模型微調。
  - 專注於程式碼相關任務，如生成、除錯、補完與重構。

- **支援的平台與模式**

  - 可透過 Claude 官網、Slack 整合、API 介面使用。
  - Claude 3 模型家族中的 Sonnet 與 Opus 皆支援 Code 能力。

- **支援語言與任務**

  - 語言：Python、JavaScript、TypeScript、Java、C/C++、HTML/CSS、SQL 等。
  - 任務類型：代碼生成、文件產生、除錯、測試碼產出、重構與最佳化。

- **與其他工具的差異**

  - 支援更長的上下文（可達 200k tokens）
  - 回應更具可讀性與解釋性
  - Anthropic 特別強調「可控性」與「安全性」

- **使用方式**

  - Claude 聊天介面中貼上程式碼片段與指令
  - 使用 prompt 提示具體任務，例如 “請優化這段程式碼” 或 “請解釋下列 Python 函數的功能”

---

## 實際範例教學

以下範例將以 Claude Code 處理 Python 程式碼為例，展示常見任務的應用。

### 1. 程式碼生成

**Prompt：**

```
請用 Python 寫一個函式，接收一個整數列表，回傳最大值與最小值。
```

**Claude Code 回應：**

```python
def find_min_max(numbers):
    if not numbers:
        return None, None
    return min(numbers), max(numbers)

# 使用範例
nums = [3, 8, 1, 4, 9]
min_val, max_val = find_min_max(nums)
print(f"最小值: {min_val}, 最大值: {max_val}")
```

### 2. 程式碼除錯

**輸入錯誤程式碼：**

```python
def divide(a, b):
    return a / b

print(divide(10, 0))
```

**Prompt：**

```
這段程式碼會發生什麼錯誤？要怎麼修改？
```

**Claude Code 回應：**

```
這段程式碼會在除以 0 時產生 ZeroDivisionError 錯誤。你可以加入 try-except 來處理例外：
```

**建議修改版本：**

```python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "除數不能為零"

print(divide(10, 0))
```

### 3. 重構程式碼

**Prompt：**

```
請幫我重構以下 Python 程式，使其更簡潔易讀
```

**原始程式碼：**

```python
def process(data):
    result = []
    for item in data:
        if item % 2 == 0:
            result.append(item * item)
    return result
```

**Claude Code 回應：**

```python
def process(data):
    return [item ** 2 for item in data if item % 2 == 0]
```

---

## 實用建議與提示

- **具體的指令更有效**：直接說明你要做什麼，例如「請將下列 TypeScript 重構為具名函式」，比「幫我修改程式碼」效果更好。
- **使用上下文編輯技巧**：可貼上整個 class 或 module，再指明哪個函式需要優化。
- **加入期望輸出範例**：讓 Claude Code 理解你的預期輸入與輸出格式。
- **搭配 API 使用**：進階用戶可透過 Anthropic API 將 Claude Code 整合進開發工作流程或 IDE 插件。

---

## 總結

Claude Code 是新一代 AI 編程輔助工具的代表之一，其簡潔清晰的語言理解能力與較高的上下文記憶範圍，使其特別適合處理複雜的程式重構與跨檔案邏輯分析。無論你是初學者還是資深開發者，只要善用 prompt 的語言描述能力與 Claude Code 的生成特性，就能提升開發效率與程式品質。

若你正尋求 Copilot 或 ChatGPT 的替代方案，Claude Code 值得一試。

---

若你有特定開發環境（如 VSCode、CLI、Slack）或語言需求，我可以進一步為你量身規劃 Claude Code 的使用方式與整合建議。需要的話也可以補充教學範例。

## 參考文件

1. [最佳 GitHub Copilot 設定](https://github.com/doggy8088/github-copilot-configs)
2. [從「寫程式」到「與 AI 共舞」── 我在公司推動 Vibe Coding 的經驗分享](https://medium.com/@cct0201/%E5%BE%9E-%E5%AF%AB%E7%A8%8B%E5%BC%8F-%E5%88%B0-%E8%88%87-ai-%E5%85%B1%E8%88%9E-%E6%88%91%E5%9C%A8%E5%85%AC%E5%8F%B8%E6%8E%A8%E5%8B%95-vibe-coding-%E7%9A%84%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-015e28909290)
3. [2025 年最強推薦 Vibe Coding 工具一次看懂](https://gitmind.com/tw/best-vibe-coding-tools-2025.html)
