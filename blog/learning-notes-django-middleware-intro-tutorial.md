---
title: Django Middleware 入門教學筆記
date: 2024-11-16 11:33:41
authors: kdchang
tags:
  - 前端
  - 後端
  - 前端開發
  - 前端工程
  - 軟體工程
  - Django
  - Middleware
  - RESTful
---

## 前言

在 Web 應用程式中，每一次的 HTTP 請求與回應都會經過一連串的處理流程。在 Django 框架中，這些處理流程的攔截點與操作邏輯就是透過「Middleware（中介軟體）」來實現。

Middleware 是 Django 請求與回應處理流程中一個極為關鍵的機制，允許開發者在請求進入 View 前或回應送出前進行特定操作，例如：身份驗證、日誌紀錄、權限控制、跨域處理、錯誤攔截、壓縮回應等。

掌握 Middleware 的基本原理與撰寫方式，將有助於你更靈活地控制整個應用程式的行為與安全性。

---

## 重點摘要

- Middleware 是介於「請求 → View → 回應」流程中，可插入自訂邏輯的中介處理元件。
- 每個 Middleware 類別皆需實作特定的方法，如 `__call__()` 或 `process_request()`、`process_response()`。
- Middleware 可用於：日誌、認證、CORS、壓縮、IP 限制、防止 CSRF 等。
- 所有 Middleware 的執行順序依 `settings.py` 的 `MIDDLEWARE` 設定順序為準。
- Middleware 執行順序為：

  - 請求階段（request）：從上往下
  - 回應階段（response）：從下往上

---

## Middleware 執行流程簡述

以下是 Django 處理請求的標準流程：

```text
Request
  ↓
Middleware（request）→ View 處理 → Middleware（response）
  ↓
Response
```

舉例來說，假設你有三個 Middleware：

```python
MIDDLEWARE = [
    'myproject.middleware.FirstMiddleware',
    'myproject.middleware.SecondMiddleware',
    'myproject.middleware.ThirdMiddleware',
]
```

執行順序會是：

- 請求階段：First → Second → Third → View
- 回應階段：Third → Second → First → Client

---

## Middleware 的基本結構與方法

從 Django 1.10 起，Middleware 使用「新式 Middleware」架構，基於 `__call__()` 方法設計。基本範例如下：

```python
# middleware.py
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # 這裡是初始化，只在伺服器啟動時執行一次

    def __call__(self, request):
        # 處理請求邏輯（View 前）
        print("Before view")

        response = self.get_response(request)

        # 處理回應邏輯（View 後）
        print("After view")

        return response
```

---

## 實際範例一：請求時間計算 Middleware

此範例會計算 View 執行所花費的時間，並加入到 HTTP 回應標頭中。

```python
# middleware.py
import time

class TimerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time
        response["X-Process-Time"] = f"{duration:.4f}s"
        return response
```

在 `settings.py` 中啟用：

```python
MIDDLEWARE = [
    # 其他內建 middleware...
    'myapp.middleware.TimerMiddleware',
]
```

當你訪問任意頁面時，HTTP 回應標頭中會出現類似：

```
X-Process-Time: 0.0321s
```

---

## 實際範例二：只允許特定 IP 的 Middleware

你可以建立一個 Middleware，用來限制只有某些 IP 位址可以訪問網站。

```python
# middleware.py
from django.http import HttpResponseForbidden

class IPWhitelistMiddleware:
    ALLOWED_IPS = ["127.0.0.1", "192.168.1.100"]

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META.get("REMOTE_ADDR")
        if ip not in self.ALLOWED_IPS:
            return HttpResponseForbidden("Access denied.")
        return self.get_response(request)
```

這可以用來防止內部 API 被外部訪問。

---

## 常見用途與建議實作

| 用途             | 建議工具或方式                               |
| ---------------- | -------------------------------------------- |
| 請求/回應紀錄    | 實作 logging Middleware                      |
| 使用者權限控管   | 自訂 Middleware 或使用 Django Authentication |
| 防止過多請求     | 與 Redis 結合實作 Rate Limiting Middleware   |
| 跨域（CORS）處理 | 使用 django-cors-headers 套件                |
| 錯誤攔截與通知   | 捕捉例外並結合外部通知工具（如 Sentry）      |

---

## 注意事項與開發建議

1. **Middleware 應保持單一職責**：一個 Middleware 做一件事，方便測試與維護。
2. **避免過度耦合 View 或 Model**：Middleware 應專注於請求與回應處理，不應過度介入業務邏輯。
3. **注意 Middleware 順序**：Django 會依照 `MIDDLEWARE` 陣列順序執行，不當排序可能導致無效或錯誤。
4. **善用內建 Middleware**：如 `SecurityMiddleware`, `CommonMiddleware`, `AuthenticationMiddleware`，無須重造輪子。
5. **除錯技巧**：可在 Middleware 中使用 `print()`、`logging` 或加入 HTTP 標頭協助觀察執行情況。

---

## 總結

Middleware 是 Django 框架中攔截與處理請求／回應流程的核心機制之一。學會撰寫與使用 Middleware，能讓你更有效地實現各種橫向功能（如安全、效能、紀錄等），並保持應用架構的乾淨與可維護性。

透過本教學筆記，你應該已理解：

- Middleware 的基本概念與執行流程
- 如何撰寫一個簡單的 Middleware 類別
- 幾種常見的 Middleware 實用場景與範例

進一步建議可以閱讀 Django 官方文件中的 Middleware 章節，並觀察第三方套件的 Middleware 是如何實作的，將更有助於理解其威力與應用彈性。
