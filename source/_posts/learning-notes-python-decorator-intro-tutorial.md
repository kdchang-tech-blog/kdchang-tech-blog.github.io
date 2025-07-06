---
title: Python Decorator 入門教學筆記 | 學習筆記
date: 2021-12-14 02:23:41
author: kdchang
tags:
  - html
  - Decorator
  - Python
  - frontend
---

## 前言

在 Python 的日常開發中，`decorator（裝飾器）` 是一個非常強大的語法工具，常用於**增強函式功能**，例如：記錄日誌、驗證權限、計時、快取等。在許多框架（如 Flask、Django）或第三方函式庫中，也可以經常看到裝飾器的身影。

然而對初學者來說，decorator 的語法可能一開始比較難以理解，尤其涉及到函式是「第一類物件（first-class object）」、「閉包（closure）」的概念。本篇筆記將循序漸進帶你理解 decorator 的本質與應用方式。

---

## 重點摘要

- **Python 函式是第一類物件**：可以作為參數傳遞、作為回傳值、賦值給變數。
- **閉包（Closure）**：內部函式可以存取外部函式的變數，函式結束後變數仍可存活。
- **Decorator 是一種語法糖**，本質是「接收一個函式，回傳一個新的函式」的高階函式。
- **使用 `@` 語法糖可以簡潔地套用裝飾器**。
- **裝飾器可用於邏輯共用、權限驗證、效能監控、快取等實務情境**。
- **`functools.wraps` 可保持被裝飾函式的名稱與 docstring 資訊**。

---

## 一、基礎概念與語法

### 1. 函式是物件

```python
def greet(name):
    return f"Hello, {name}"

say_hello = greet
print(say_hello("Alice"))  # Hello, Alice
```

> 函式可以被賦值給變數、作為參數傳遞，也能作為回傳值。

---

### 2. 函式作為參數的例子

```python
def do_twice(func):
    def wrapper():
        func()
        func()
    return wrapper

def say_hi():
    print("Hi!")

do_twice(say_hi)()
```

> 這就是簡單的裝飾器雛形，`do_twice` 接收一個函式，回傳一個新的函式。

---

## 二、實作一個簡單 decorator

### 1. 不帶參數的 decorator

```python
def my_decorator(func):
    def wrapper():
        print("執行前")
        func()
        print("執行後")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

#### 輸出：

```
執行前
Hello!
執行後
```

> `@my_decorator` 這行等同於 `say_hello = my_decorator(say_hello)`。裝飾器會接手原本的函式，包裝成新的邏輯後回傳。

---

### 2. 處理有參數的函式

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("執行前")
        result = func(*args, **kwargs)
        print("執行後")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"Hello, {name}")

greet("KD")
```

> 使用 `*args, **kwargs` 可以支援任何參數的函式。

---

### 3. 保留原函式資訊：使用 `functools.wraps`

```python
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("執行前")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def add(x, y):
    """加總兩數"""
    return x + y

print(add.__name__)  # add
print(add.__doc__)   # 加總兩數
```

> 沒有 `functools.wraps`，函式的名稱會變成 `wrapper`，容易影響除錯與文件產生。

---

## 三、實用範例：計時 decorator

```python
import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 執行時間：{end - start:.4f} 秒")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1.5)
    print("完成耗時操作")

slow_function()
```

---

## 四、進階：帶參數的 decorator

有時我們希望 decorator 接收參數，例如指定權限等，這時候會需要再多一層函式包裝：

```python
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()
```

> `repeat(3)` 會先執行，回傳 `decorator(func)`，再包裝原函式。

---

## 五、常見應用場景

- **日誌紀錄（logging）**
- **權限驗證（authorization）**
- **執行時間分析（performance monitoring）**
- **快取（caching）**
- **API 路由（如 Flask 的 @app.route）**

---

## 總結

Python 的 decorator 是一個非常實用的語法技巧，一旦理解其本質為「函式的包裝器」，就可以在實務開發中靈活應用。它讓我們可以**以簡潔的方式注入共用邏輯**，大大提升程式的可讀性與可維護性。

我們在練習 decorator 時，建議搭配日常開發情境，如記錄日誌、印出函式執行時間，從實作中加深理解。當你越熟悉它，便越能體會其在 Python 世界中的威力。
