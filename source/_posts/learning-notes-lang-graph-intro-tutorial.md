---
title: LangGraph 入門教學筆記：打造多步驟 AI 流程的圖形化解決方案 | 學習筆記
date: 2024-12-24 02:23:41
author: kdchang
tags:
  - html
  - 前端
  - 前端開發
  - 前端工程
  - LangGraph
---

## 前言

隨著生成式 AI 的應用越來越廣泛，從客服機器人、智慧問答系統到複雜的自動化工作流程，開發者面臨的不再只是單次的文字生成，而是需要處理**多步驟的對話邏輯與決策流程**。

傳統上，這類應用通常透過繁瑣的 if-else 邏輯、狀態機或多層函式巢狀處理，程式碼不易閱讀與維護。為此，**LangGraph** 應運而生。它是一個開源的 Python 函式庫，讓開發者可以用「流程圖」的方式清晰地定義每一步的處理邏輯，進而打造更穩定且模組化的 AI Workflow。

---

## 重點摘要

- **LangGraph 是什麼？**

  - 由 LangChain 團隊開發的 AI Workflow 工具，透過流程圖（Graph）定義多步驟的推理過程。
  - 每一個節點（Node）代表一個處理步驟，從 LLM 回覆、條件判斷到工具呼叫等皆可定義成節點。

- **核心特色**

  - 使用有向圖（DAG）表示流程，每個節點都有明確的輸入與輸出狀態。
  - 支援條件分支、迴圈、自訂狀態、記憶上下文。
  - 可與 LangChain、OpenAI、Anthropic 等服務整合。
  - 適合用於構建 Agent、Chatbot、多階段處理流程。

- **應用情境**

  - 客製化對話代理人（如智能客服）
  - 多階段資訊處理（如：檢索、分類、摘要）
  - 工具選擇與執行流程（如：根據輸入選擇工具）
  - 擴展型 LLM 應用（如：RAG、Tool Use）

- **重要元件說明**

  - `StateGraph`：定義整體流程圖。
  - `Node`：每個節點代表一個具邏輯意義的步驟。
  - `State`：儲存目前上下文狀態，可自訂欄位。
  - `Conditional Edge`：根據邏輯結果決定下一個節點。

---

## 實際範例：打造一個 FAQ 對話機器人

本範例將建立一個簡單的對話流程：

1. 使用者輸入問題。
2. 呼叫 OpenAI GPT 模型回覆。
3. 若輸入為 "bye"，流程結束；否則持續對話。

---

### 1. 安裝套件

```bash
pip install langgraph langchain openai
```

---

### 2. 定義狀態與回應節點

```python
from langgraph.graph import StateGraph, END
from langchain.chat_models import ChatOpenAI
from typing import TypedDict

# 自訂狀態格式
class ConversationState(TypedDict):
    messages: list[str]
    last_user_input: str

# 初始化 LLM
llm = ChatOpenAI(model="gpt-4", temperature=0)

# 處理回應的節點
def generate_response(state: ConversationState):
    user_input = state["last_user_input"]
    state["messages"].append(f"User: {user_input}")
    response = llm.predict(f"請回答以下問題：{user_input}")
    state["messages"].append(f"AI: {response}")
    return state
```

---

### 3. 定義流程結束條件與流程圖

```python
# 判斷是否要結束對話
def should_continue(state: ConversationState):
    if state["last_user_input"].lower().strip() == "bye":
        return END
    return "generate"

# 建立流程圖
builder = StateGraph(ConversationState)
builder.add_node("generate", generate_response)
builder.set_entry_point("generate")
builder.add_conditional_edges("generate", should_continue)

graph = builder.compile()
```

---

### 4. 執行對話流程

```python
# 初始狀態
state = {
    "messages": [],
    "last_user_input": "你好，這是什麼系統？"
}

# 執行第一輪
state = graph.invoke(state)

# 模擬第二輪
state["last_user_input"] = "LangGraph 是什麼？"
state = graph.invoke(state)

# 模擬結束對話
state["last_user_input"] = "bye"
state = graph.invoke(state)

# 印出對話記錄
for msg in state["messages"]:
    print(msg)
```

---

### 範例輸出結果

```
User: 你好，這是什麼系統？
AI: 這是一個由 LangGraph 架構的對話系統。
User: LangGraph 是什麼？
AI: LangGraph 是一個讓開發者用流程圖方式設計 AI 應用的工具。
User: bye
AI: 感謝使用，祝您有美好的一天。
```

---

## 總結與延伸

LangGraph 為 LLM 應用程式帶來一個明確的結構化框架，讓我們能夠模組化管理多步驟流程、狀態記憶與條件判斷。相較於傳統方式，它更適合用來構建複雜、可維護的對話式 AI 應用。

### 延伸應用可以包括：

- 整合 LangChain 工具（如：向量資料庫、搜尋引擎）
- 建構具有分支與回饋機制的智能 Agent
- 開發能根據上下文自我修正的 RAG 系統
- 將整個 LangGraph 部署為 Web API 或背景工作流程

## 參考文件

1. [LangGraph: LangChain Agent 的殺手鐧 (入門)](https://ywctech.net/ml-ai/langchain-langgraph-agent-part1/)
