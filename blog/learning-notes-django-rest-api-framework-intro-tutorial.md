---
title: Django RESTful API 入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - Django
  - RESTful
---

# 前言

隨著 Web 與行動應用的發展，API（應用程式介面）已成為前後端溝通的橋樑。RESTful API 是目前最常見的 API 設計風格之一，而 Django REST Framework（簡稱 DRF）則是基於 Django 的強大工具，讓開發 RESTful API 變得更簡單。

本篇筆記將帶我們從零開始，快速建立一個 Django RESTful API 專案，實作一個基本的「文章系統」。

---

### 1. 安裝 Django 與 Django REST Framework

首先，建立一個虛擬環境並安裝必要套件：

```bash
python -m venv venv
source venv/bin/activate  # Windows 用戶請使用 venv\Scripts\activate
pip install django djangorestframework
```

接著，建立 Django 專案：

```bash
django-admin startproject myapi
cd myapi
```

建立一個 app 來處理文章功能：

```bash
python manage.py startapp articles
```

---

### 2. 設定專案

在 `myapi/settings.py` 中，將 `rest_framework` 與 `articles` 加入 `INSTALLED_APPS`：

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'articles',
]
```

---

### 3. 建立模型

打開 `articles/models.py`，定義一個 `Article` 模型：

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

然後執行遷移：

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 4. 建立序列化器（Serializer）

在 `articles` 資料夾中建立 `serializers.py`：

```python
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
```

這樣就完成了資料庫模型與 JSON 之間的轉換設定。

---

### 5. 建立 API View

在 `articles/views.py` 中加入以下程式：

```python
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer

class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
```

我們使用了 DRF 的「通用類別視圖」，大幅減少手寫程式碼。

---

### 6. 設定 URL

在 `articles` 資料夾中建立 `urls.py`：

```python
from django.urls import path
from .views import ArticleListCreateView, ArticleDetailView

urlpatterns = [
    path('articles/', ArticleListCreateView.as_view(), name='article-list-create'),
    path('articles/<int:pk>/', ArticleDetailView.as_view(), name='article-detail'),
]
```

接著將 `articles/urls.py` 加入主專案的 `myapi/urls.py`：

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('articles.urls')),
]
```

現在 API 路由已經設定完成。

---

### 7. 測試 API

啟動開發伺服器：

```bash
python manage.py runserver
```

打開瀏覽器，造訪 `http://127.0.0.1:8000/api/articles/`，我們會看到 DRF 提供的漂亮瀏覽介面，可以直接用網頁表單測試 API。

我們也可以用工具如 Postman 或 curl 測試：

#### 建立新文章

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"title": "第一篇文章", "content": "這是一篇測試文章"}' \
    http://127.0.0.1:8000/api/articles/
```

#### 取得文章列表

```bash
curl http://127.0.0.1:8000/api/articles/
```

#### 取得單篇文章

```bash
curl http://127.0.0.1:8000/api/articles/1/
```

#### 更新文章

```bash
curl -X PUT -H "Content-Type: application/json" \
    -d '{"title": "更新後標題", "content": "更新後內容"}' \
    http://127.0.0.1:8000/api/articles/1/
```

#### 刪除文章

```bash
curl -X DELETE http://127.0.0.1:8000/api/articles/1/
```

---

## 8. 總結

透過這篇筆記，我們完成了：

- 安裝 Django 與 DRF
- 定義模型與序列化器
- 使用泛型類別視圖實作 CRUD API
- 設定 URL 路由
- 使用瀏覽器或命令列工具測試 API

Django REST Framework 提供了許多自動化與簡化開發的工具，讓我們能快速建立出符合 REST 標準的 API。當然，隨著需求增加，我們也可以進一步學習自定義權限、驗證、過濾與分頁等功能。
