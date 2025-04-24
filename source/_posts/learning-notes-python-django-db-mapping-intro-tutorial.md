---
title: Django「一對一」、「一對多」、「多對多」關聯入門教學筆記 | 學習筆記
date: 2024-12-02 02:23:41
author: kdchang
tags: 
    - Django
    - 一對一
    - 一對多
    - 多對多
    - python

---

# 前言
當你在學 Django 或資料庫設計時，常會遇到「一對一」、「一對多」、「多對多」這三種關聯（Relationship）。這些是資料庫中表與表之間的關係，下面用簡單的例子幫你搞懂它們的差異：

---

## 一對一（One-to-One）

### 概念：
一個資料只對應另一個資料，彼此之間是唯一配對的關係。

### 例子：
每個人都有一張身份證 → 一個人對應一張身份證，一張身份證只對應一個人。

### Django 實作：

```python
class Person(models.Model):
    name = models.CharField(max_length=100)

class IDCard(models.Model):
    number = models.CharField(max_length=20)
    owner = models.OneToOneField(Person, on_delete=models.CASCADE)
```

---

## 一對多（One-to-Many）

### 概念：
一筆資料可以對應到多筆資料，但每一筆資料只能對應回唯一一筆上層資料。

### 例子：
一個作者可以寫很多本書 → 一個作者對應多本書，但一本書只會有一個作者。

### Django 實作：

```python
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

---

## 多對多（Many-to-Many）

### 概念：
一筆資料可以對應到多筆資料，而對方也可以對應回來多筆資料。

### 例子：
學生選修多門課程，一門課也有很多學生 → 學生對多門課，課程對多位學生。

### Django 實作：

```python
class Student(models.Model):
    name = models.CharField(max_length=100)
    courses = models.ManyToManyField('Course')

class Course(models.Model):
    title = models.CharField(max_length=100)
```

（也可以在 `Course` 裡加 `students = models.ManyToManyField(Student)`，結果會一樣）

---

## 小整理比較表：

| 類型        | 關係形式              | 範例             | Django 欄位                     |
|-------------|------------------------|------------------|---------------------------------|
| 一對一       | A ➝ B 且 B ➝ A         | 人 → 身份證       | `OneToOneField`                 |
| 一對多       | A ➝ 多個 B             | 作者 → 書         | `ForeignKey`                   |
| 多對多       | A ⇄ 多個 B，互相多對多 | 學生 ⇄ 課程       | `ManyToManyField`              |