---
title: FastAPI 入門教學筆記：打造現代 Python Web API 的入門教學筆記 | 學習筆記
date: 2024-09-01 02:23:41
author: kdchang
tags: 
    - web
    - python
    - FastAPI

---

## 什麼是 FastAPI？

FastAPI 是一個現代、快速（高效能）、基於 Python 3.7+ 類型提示的 Web 框架，用於建構 API。其核心優勢包含：

- **自動生成文件**：內建 OpenAPI 與 Swagger UI 支援
- **高效能**：基於 Starlette 和 Pydantic，效能可媲美 Node.js 與 Go
- **開發快速**：強大的 IDE 支援與自動補全功能
- **自動驗證與序列化**：透過 Pydantic 型別自動完成

FastAPI 適合快速構建 RESTful API，尤其在開發微服務、機器學習模型部署、或任何 API 後端都非常合適。

---

## 快速開始：環境準備與安裝

建議使用虛擬環境管理專案依賴。

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install fastapi uvicorn
```

- `fastapi`：核心框架
- `uvicorn`：ASGI Server，用來啟動應用程式

---

## 第一個 FastAPI 程式：Hello API

```python
# main.py

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}
```

啟動應用程式：

```bash
uvicorn main:app --reload
```

- `--reload`：啟用熱重載，開發時會自動重新載入程式

訪問 `http://127.0.0.1:8000/`，你會看到：

```json
{
  "message": "Hello, FastAPI!"
}
```

---

## 自動生成的互動式 API 文件

FastAPI 自動提供兩個 API 文件頁面：

- Swagger UI：`http://127.0.0.1:8000/docs`
- Redoc：`http://127.0.0.1:8000/redoc`

這些文件會根據程式中的路由與型別提示自動生成，方便前後端協作與測試。

---

## 使用路由參數與查詢參數

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

範例請求：

```
GET /items/42?q=fastapi
```

回應結果：

```json
{
  "item_id": 42,
  "q": "fastapi"
}
```

- `item_id` 是路由參數，會自動轉換為 int
- `q` 是查詢參數，預設為 None

---

## 接收與驗證請求資料：使用 Pydantic 模型

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    in_stock: bool = True

@app.post("/items/")
def create_item(item: Item):
    return {"message": "Item created", "item": item}
```

發送 POST 請求：

```json
POST /items/
{
  "name": "Laptop",
  "description": "A powerful device",
  "price": 1299.99,
  "in_stock": true
}
```

回應：

```json
{
  "message": "Item created",
  "item": {
    "name": "Laptop",
    "description": "A powerful device",
    "price": 1299.99,
    "in_stock": true
  }
}
```

- Pydantic 會自動進行資料驗證與轉換
- FastAPI 可根據模型自動生成 API 文件

---

## 表單與檔案上傳支援

```python
from fastapi import Form, UploadFile, File

@app.post("/submit/")
def submit_form(username: str = Form(...), file: UploadFile = File(...)):
    return {
        "username": username,
        "filename": file.filename,
        "content_type": file.content_type
    }
```

這對於處理使用者上傳檔案與表單資料非常方便。

---

## 回傳自定義 HTTP 狀態碼與錯誤處理

```python
from fastapi import HTTPException

@app.get("/users/{user_id}")
def read_user(user_id: int):
    if user_id != 1:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user_id, "name": "Alice"}
```

這會回傳：

```json
{
  "detail": "User not found"
}
```

並帶有 HTTP 404 錯誤。

---

## 小結與下一步學習方向

FastAPI 提供了一種現代化且優雅的方式來構建 API：

- 強大的型別檢查與 IDE 支援
- 直覺的程式結構與文件生成
- 高效能適合用於生產環境

### 建議學習方向：

1. 路由分割與模組化管理
2. 使用依賴注入（Depends）
3. 整合資料庫（如 SQLAlchemy）
4. JWT 身份驗證與 OAuth2
5. 測試與部署（例如 Docker、Gunicorn）

---

如果你是從 Flask 或 Django REST Framework 轉過來，會發現 FastAPI 提供了相當先進的開發體驗與高效能，是非常值得學習與投入的框架。

### 參考文件
1. [fastapi API](https://fastapi.tiangolo.com/)
