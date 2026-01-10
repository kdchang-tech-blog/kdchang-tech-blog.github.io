---
title: Django 入門教學筆記 | 學習筆記
date: 2023-07-02 02:23:41
author: kdchang
tags: 
    - setTimeout
    - for loop
    - closure
    - javascript

---

## 前言

Django 是一個由 Python 編寫的高階 Web 框架，強調快速開發與簡潔設計。它提供完整的功能模組如 ORM、Admin 介面、Form 處理、URL 路由與認證系統，讓開發者能專注於商業邏輯而非重複造輪子。本文將帶你一步一步建立一個基本的 Django 應用程式，並說明其核心概念。

## 一、環境安裝

首先，請確保你已安裝好 Python（建議 3.8+）與 pip。以下是建立虛擬環境並安裝 Django 的方式：

```bash
python -m venv myenv
source myenv/bin/activate  # Windows 請使用 myenv\Scripts\activate
pip install django
```

確認安裝成功：

```bash
django-admin --version
```

## 二、建立 Django 專案

Django 使用專案（project）與應用程式（app）來組織程式碼。先建立一個新的專案：

```bash
django-admin startproject mysite
cd mysite
```

你會看到以下結構：

```
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

## 三、建立應用程式

應用程式是 Django 專案的功能模組。例如一個部落格、用戶系統或留言板就是一個 app。以下我們建立一個簡單的留言板：

```bash
python manage.py startapp guestbook
```

在 `guestbook/` 資料夾中會看到以下結構：

```
guestbook/
    models.py
    views.py
    admin.py
    apps.py
    tests.py
    ...
```

接著，在 `mysite/settings.py` 中註冊這個 app：

```python
INSTALLED_APPS = [
    ...
    'guestbook',
]
```

## 四、定義資料模型（Model）

編輯 `guestbook/models.py`，新增一個留言的資料模型：

```python
from django.db import models

class Message(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} 說：{self.content[:20]}...'
```

建立資料表：

```bash
python manage.py makemigrations
python manage.py migrate
```

## 五、啟用後台管理介面

Django 提供強大的 admin 功能。先建立一個 superuser：

```bash
python manage.py createsuperuser
```

然後在 `guestbook/admin.py` 中註冊 model：

```python
from django.contrib import admin
from .models import Message

admin.site.register(Message)
```

啟動伺服器並進入後台：

```bash
python manage.py runserver
```

前往瀏覽器開啟 `http://127.0.0.1:8000/admin/`，使用剛建立的帳號登入，即可操作資料。

## 六、建立 Views 與 Templates

接下來，我們撰寫一個簡單的留言列表與新增留言的畫面。

### views.py

```python
from django.shortcuts import render, redirect
from .models import Message

def message_list(request):
    if request.method == "POST":
        name = request.POST.get('name')
        content = request.POST.get('content')
        if name and content:
            Message.objects.create(name=name, content=content)
        return redirect('message_list')

    messages = Message.objects.order_by('-created_at')
    return render(request, 'guestbook/message_list.html', {'messages': messages})
```

### templates

建立目錄 `guestbook/templates/guestbook/message_list.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <title>留言板</title>
</head>
<body>
    <h1>留言板</h1>
    <form method="post">
        {% csrf_token %}
        姓名：<input type="text" name="name"><br>
        留言：<br>
        <textarea name="content" rows="5" cols="40"></textarea><br>
        <input type="submit" value="送出">
    </form>
    <hr>
    {% for msg in messages %}
        <p><strong>{{ msg.name }}</strong> 說：</p>
        <p>{{ msg.content }}</p>
        <p><small>{{ msg.created_at }}</small></p>
        <hr>
    {% endfor %}
</body>
</html>
```

## 七、設定 URL 路由

在 `guestbook/` 建立 `urls.py`：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.message_list, name='message_list'),
]
```

然後到 `mysite/urls.py` 中加入：

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('guestbook.urls')),
]
```

## 八、啟動開發伺服器

```bash
python manage.py runserver
```

在瀏覽器開啟 `http://127.0.0.1:8000/`，你將看到留言板畫面，並能提交留言。

---

## 總結

Django 是功能非常齊全且具可擴展性的 Web 框架，初學者可從資料模型、後台管理、表單處理與模板引擎著手。本文僅為入門教學，未來更多進階功能如使用 class-based views、form 類別、自訂 middleware、部署到雲端等，規劃在之後的教學筆記進行介紹。