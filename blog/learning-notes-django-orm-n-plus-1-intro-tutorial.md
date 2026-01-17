---
title: Django 中的 n+1 問題入門教學筆記
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
  - N + 1
  - RESTful
---

# Django 中的 n+1 問題入門教學筆記

## 前言

Django 作為一個功能完整的 Python Web 框架，其 ORM（Object-Relational Mapping）能讓開發者以物件導向方式操作資料庫。然而，這樣的便利也容易隱藏一些效能陷阱，其中最常見也最容易忽略的就是 **n+1 查詢問題（n+1 query problem）**。

n+1 問題會導致程式在執行查詢時產生大量多餘的 SQL 語句，影響效能並拖慢頁面載入速度，特別是在處理關聯資料時（如 ForeignKey 或 ManyToManyField）。本篇筆記將帶你認識 n+1 問題在 Django 中的成因、辨識方法與解法。

---

## 重點摘要

- **n+1 問題定義**：查詢一個主物件（n 筆），卻對每筆物件再執行一次額外查詢，總共造成 n+1 次查詢。
- **常見發生情境**：在模板或程式中存取 ForeignKey 或 ManyToManyField 時，未預先載入（eager loading）相關資料。
- **效能影響**：每個物件觸發一次額外 SQL，當資料量增加時，查詢數可能達到數百次以上。
- **解法**：

  - 使用 `select_related()` 預先載入「多對一」與「一對一」的關聯。
  - 使用 `prefetch_related()` 預先載入「一對多」與「多對多」的關聯。

- **如何偵測 n+1 問題**：

  - 開啟 `django.db.backends` 日誌觀察查詢數量與內容。
  - 使用 [Django Debug Toolbar](https://django-debug-toolbar.readthedocs.io/) 查看 SQL 查詢次數與細節。

---

## 實際範例：部落格文章與作者

假設有以下兩個模型：

```python
# models.py
class Author(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

### n+1 問題範例

```python
# views.py
def post_list(request):
    posts = Post.objects.all()
    return render(request, "blog/post_list.html", {"posts": posts})
```

```django
{# post_list.html #}
<ul>
  {% for post in posts %}
    <li>{{ post.title }} - {{ post.author.name }}</li>
  {% endfor %}
</ul>
```

這段程式會發生 n+1 問題：

- 第一次查詢取得所有文章 `SELECT * FROM post`
- 每篇文章查詢一次作者 `SELECT * FROM author WHERE id = ?`

如果有 100 篇文章，總共會執行 101 次查詢。

---

## 解法一：使用 `select_related()`

```python
# views.py（改進）
def post_list(request):
    posts = Post.objects.select_related("author").all()
    return render(request, "blog/post_list.html", {"posts": posts})
```

`select_related` 會使用 SQL JOIN 一次把作者資料一起載入。查詢數減少為 1 次：

```sql
SELECT post.*, author.*
FROM post
JOIN author ON post.author_id = author.id;
```

這種方式適合用於 ForeignKey（多對一）與 OneToOneField 關聯。

---

## 解法二：使用 `prefetch_related()`

若改為一對多或多對多關係，例如：

```python
class Tag(models.Model):
    name = models.CharField(max_length=30)

class Post(models.Model):
    title = models.CharField(max_length=200)
    tags = models.ManyToManyField(Tag)
```

如果在模板中使用：

```django
{% for post in posts %}
  {{ post.title }}:
  {% for tag in post.tags.all %}
    {{ tag.name }}
  {% endfor %}
{% endfor %}
```

這樣會產生 n+1 查詢問題（每個 post 查一次 tag）。解法：

```python
posts = Post.objects.prefetch_related("tags").all()
```

`prefetch_related()` 會先查出所有關聯，再用 Python 記憶體關聯對應資料，不用 JOIN。

```sql
SELECT * FROM post;
SELECT * FROM post_tags WHERE post_id IN (...);
SELECT * FROM tag WHERE id IN (...);
```

---

## select_related 與 prefetch_related 差異整理

| 特性         | select_related             | prefetch_related         |
| ------------ | -------------------------- | ------------------------ |
| 關係類型     | 一對一、外鍵（ForeignKey） | 一對多、多對多           |
| 查詢方式     | 使用 JOIN 一次查出         | 分別查詢後用 Python 關聯 |
| 查詢數量     | 一次查詢即可完成           | 最少兩次查詢             |
| 效能適用情境 | 關聯資料不多且關係單純     | 關聯資料多或複雜嵌套     |

---

## 如何偵測與除錯 n+1 問題

1. **開啟 SQL 日誌**：
   在 `settings.py` 中設定：

   ```python
   LOGGING = {
       "version": 1,
       "handlers": {
           "console": {
               "class": "logging.StreamHandler",
           },
       },
       "loggers": {
           "django.db.backends": {
               "handlers": ["console"],
               "level": "DEBUG",
           },
       },
   }
   ```

2. **使用 Django Debug Toolbar**：
   安裝與設定後可視覺化查詢次數與內容。

3. **查看 QuerySet 查詢次數**：
   使用 `len(connection.queries)` 或中間件分析每個 request 的查詢數。

---

## 總結

n+1 問題是 Django ORM 中最常見的效能陷阱之一，但只要了解其原理與解法，透過 `select_related()` 和 `prefetch_related()` 搭配得當，幾乎可以完全避免這個問題。

掌握以下原則即可：

- 遇到 ForeignKey 或 OneToOne 時用 `select_related()`
- 遇到 ManyToMany 或反向 ForeignKey 時用 `prefetch_related()`
- 避免在模板中直接使用 `.related_set.all()` 未預先載入資料
- 對列表頁或頻繁查詢頁進行效能測試與 SQL 分析

良好的 ORM 使用習慣能大幅提升系統穩定性與使用者體驗，是每位 Django 開發者必備的基礎功。
