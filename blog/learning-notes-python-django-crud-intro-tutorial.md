---
title: Django CRUD（不使用 ModelForm）入門教學筆記 | 學習筆記
date: 2024-09-01 02:23:41
author: kdchang
tags: 
    - web
    - python
    - Django
    - ModelForm）

---

# 前言

在 Django 中，`ModelForm` 提供了一個快速建立表單與驗證的工具，但在某些情境下，我們可能希望自己掌控表單結構與驗證流程。這篇筆記將示範如何不依賴 `ModelForm`，手動實作一套 CRUD 系統，幫助你更深入理解 Django 表單處理的基本原理。

我們將製作一個簡單的「書籍管理系統」，支援新增（Create）、讀取（Read）、更新（Update）與刪除（Delete）書籍資訊。

## 1. 建立 Django 專案與應用

首先，安裝 Django 並建立新的專案與應用：

```bash
pip install django
django-admin startproject myproject
cd myproject
python manage.py startapp books
```

註冊 `books` 應用於 `myproject/settings.py` 的 `INSTALLED_APPS`：

```python
INSTALLED_APPS = [
    ...
    'books',
]
```

## 2. 定義模型（Model）

在 `books/models.py` 中定義一個簡單的書籍模型：

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    published_date = models.DateField()

    def __str__(self):
        return self.title
```

遷移資料庫：

```bash
python manage.py makemigrations
python manage.py migrate
```

## 3. 撰寫 Views（不使用 ModelForm）

在 `books/views.py` 中撰寫手動處理的 CRUD 功能。

### 新增書籍（Create）

```python
from django.shortcuts import render, redirect
from .models import Book
from django.utils.dateparse import parse_date

def create_book(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        published_date_str = request.POST.get('published_date')
        published_date = parse_date(published_date_str)

        if title and author and published_date:
            Book.objects.create(title=title, author=author, published_date=published_date)
            return redirect('book_list')
        else:
            error = "所有欄位皆為必填"
            return render(request, 'books/book_form.html', {'error': error})
    return render(request, 'books/book_form.html')
```

### 讀取書籍（Read）

```python
def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/book_list.html', {'books': books})
```

### 更新書籍（Update）

```python
from django.shortcuts import get_object_or_404

def update_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        published_date_str = request.POST.get('published_date')
        published_date = parse_date(published_date_str)

        if title and author and published_date:
            book.title = title
            book.author = author
            book.published_date = published_date
            book.save()
            return redirect('book_list')
        else:
            error = "所有欄位皆為必填"
            return render(request, 'books/book_form.html', {'book': book, 'error': error})
    return render(request, 'books/book_form.html', {'book': book})
```

### 刪除書籍（Delete）

```python
def delete_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        book.delete()
        return redirect('book_list')
    return render(request, 'books/book_confirm_delete.html', {'book': book})
```

## 4. 設定 URL 路由

在 `books/urls.py` 中設定對應的路由：

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.book_list, name='book_list'),
    path('create/', views.create_book, name='create_book'),
    path('update/<int:pk>/', views.update_book, name='update_book'),
    path('delete/<int:pk>/', views.delete_book, name='delete_book'),
]
```

並在 `myproject/urls.py` 引入 `books` 路由：

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('books/', include('books.urls')),
]
```

## 5. 建立模板（Templates）

手動撰寫簡單的 HTML 表單與顯示畫面。

### `book_list.html`

```html
<h1>書籍列表</h1>
<a href="{% url 'create_book' %}">新增書籍</a>
<ul>
    {% for book in books %}
    <li>
        {{ book.title }} - {{ book.author }} - {{ book.published_date }}
        <a href="{% url 'update_book' book.id %}">編輯</a>
        <a href="{% url 'delete_book' book.id %}">刪除</a>
    </li>
    {% endfor %}
</ul>
```

### `book_form.html`

```html
<h1>{% if book %}編輯書籍{% else %}新增書籍{% endif %}</h1>

{% if error %}
<p style="color:red;">{{ error }}</p>
{% endif %}

<form method="post">
    {% csrf_token %}
    <p>
        標題：<input type="text" name="title" value="{{ book.title|default_if_none:'' }}">
    </p>
    <p>
        作者：<input type="text" name="author" value="{{ book.author|default_if_none:'' }}">
    </p>
    <p>
        出版日期（格式 yyyy-mm-dd）：<input type="text" name="published_date" value="{{ book.published_date|default_if_none:'' }}">
    </p>
    <button type="submit">儲存</button>
</form>

<a href="{% url 'book_list' %}">返回列表</a>
```

### `book_confirm_delete.html`

```html
<h1>刪除書籍</h1>
<p>確定要刪除 "{{ book.title }}" 嗎？</p>
<form method="post">
    {% csrf_token %}
    <button type="submit">確定刪除</button>
</form>
<a href="{% url 'book_list' %}">取消</a>
```

## 6. 啟動伺服器測試

啟動 Django 開發伺服器：

```bash
python manage.py runserver
```

在瀏覽器開啟 `http://127.0.0.1:8000/books/`，你將可以新增、查詢、編輯和刪除書籍。

---

# 總結

這篇教學示範了在 **不使用 `ModelForm`** 的情況下，手動撰寫表單處理與資料驗證，完整實作了 Django 的 CRUD 功能。

這種方式的優點在於靈活度高，你可以完全控制表單的結構、驗證邏輯與錯誤處理，非常適合需要客製化表單行為或前後端分離的專案。不過，相較於使用 `ModelForm`，開發成本略高，也容易產生重複程式碼，因此適時選擇工具是重要的工程判斷。

進一步的優化方向包括：
- 加入更完整的資料驗證
- 增加欄位格式錯誤提示
- 使用 JavaScript 增強表單互動
- 將表單資料與邏輯封裝成 Class-Based Views（CBV）

透過本篇範例，希望你對 Django 低階處理表單與 CRUD 流程有更深入的理解。
