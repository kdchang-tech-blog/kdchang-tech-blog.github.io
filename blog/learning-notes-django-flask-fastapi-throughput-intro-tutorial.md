---
title: Django、Flask、FastAPI 吞吐量比較入門教學筆記 | 學習筆記
date: 2025-02-24 02:23:41
author: kdchang
tags:
  - Django
  - Flask
  - FastAPI
  - locust
  - throughput
  - Load testing
---

## 前言

在 Python Web 開發領域，Django、Flask 與 FastAPI 是三個非常熱門且廣泛使用的框架。它們各有特點與適用場景，但在性能表現，特別是吞吐量（throughput）方面，存在一定差異。吞吐量通常指每秒鐘能處理的請求數量，是衡量 Web 框架在高併發環境中效率的重要指標。

本篇筆記將簡要介紹這三個框架的基本架構與設計理念，並透過簡單測試與範例比較其吞吐量，幫助初學者理解如何依需求選擇適合的框架。

---

## 重點摘要

- **Django**

  - 全功能、重量級框架，內建 ORM、管理後台、驗證系統等
  - 同步同步處理，基於 WSGI，預設不支援非同步（Asynchronous）請求
  - 適合需要完整解決方案的中大型專案
  - 吞吐量相較較低，因同步阻塞限制高併發能力

- **Flask**

  - 輕量級框架，核心簡單，擴展彈性高
  - 同樣基於同步 WSGI，預設不支援非同步
  - 適合小型、原型開發及彈性需求較多的專案
  - 吞吐量與 Django 相近，瓶頸多來自同步阻塞與部署環境

- **FastAPI**

  - 新興的輕量且高性能框架，採用 ASGI 標準，內建非同步支援
  - 基於 Starlette 與 Pydantic，支援非同步 I/O，大幅提升吞吐量
  - 適合高併發、API 開發需求強烈的專案
  - 吞吐量明顯優於 Django、Flask，適合現代微服務架構

- **吞吐量測試環境與結果**

  - 使用同一台機器與相同測試工具（如 `wrk`、`ab`、`Locust`）對簡單 API 進行測試
  - Django、Flask 在同步阻塞環境吞吐量約數千至上萬請求/秒
  - FastAPI 在非同步環境可突破十萬請求/秒，具備更好擴展性

- **部署差異**

  - Django、Flask 多搭配 Gunicorn（WSGI）同步服務器部署
  - FastAPI 搭配 Uvicorn、Hypercorn（ASGI）非同步服務器，性能最佳化

---

## 吞吐量比較實際範例

以下將以簡單「Hello World」API 為例，展示三個框架的基本實作，並提供吞吐量測試方法參考。

### 1. Django 範例

**程式碼（`views.py`）：**

```python
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})
```

**URL 設定（`urls.py`）：**

```python
from django.urls import path
from .views import hello

urlpatterns = [
    path('hello/', hello),
]
```

**啟動方式：**

```bash
python manage.py runserver
```

（正式部署可用 Gunicorn）

### 2. Flask 範例

**程式碼（`app.py`）：**

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/hello')
def hello():
    return jsonify(message="Hello World")

if __name__ == "__main__":
    app.run()
```

**啟動方式：**

```bash
python app.py
```

（正式部署可用 Gunicorn）

### 3. FastAPI 範例

**程式碼（`main.py`）：**

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
async def hello():
    return {"message": "Hello World"}
```

**啟動方式：**

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 吞吐量測試方法簡介

使用 Linux 下的 `wrk` 工具對三個 API 進行測試：

若使用 Mac 作業系統可以安裝：

```
brew install wrk
```

下指令測試：

```bash
wrk -t4 -c100 -d30s http://localhost:8000/hello
```

- `-t4`：4 個 thread
- `-c100`：100 個持續連線
- `-d30s`：測試持續 30 秒

測試結果可觀察 Requests/sec 欄位，即為吞吐量。

---

## 性能分析與比較

- **Django** 在簡單請求下可達數千請求/秒，但因同步處理與較重的框架開銷，無法輕易擴展至高併發環境。
- **Flask** 同樣是同步，吞吐量略優於 Django，但主要瓶頸仍在同步阻塞與伺服器資源分配。
- **FastAPI** 採用非同步設計，利用 Python 的 async/await 及高效事件迴圈，能在相同硬體資源下達到數倍甚至十倍以上吞吐量，尤其適合 I/O 密集型服務。

---

## 總結

選擇適合的 Python Web 框架時，需根據專案規模、功能需求及預期流量做權衡。Django 適合快速搭建大型且功能完整的應用，Flask 適合靈活開發與小型專案，而 FastAPI 則是現代高效能 API 開發的首選。

在吞吐量需求高、需要非同步處理的情境下，FastAPI 明顯優勢突出。未來隨著非同步技術普及，FastAPI 的應用範圍將持續擴大。

## 參考文件

1. [locust 官方文件](https://locust.io/)
