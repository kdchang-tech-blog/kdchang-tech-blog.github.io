---
title: Ruby on Rails 介紹與入門教學筆記 | 學習筆記
date: 2024-07-02 02:23:41
authors: kdchang
tags:
  - Ruby on Rails
  - Ruby
  - Rails
---

## 前言

**Ruby on Rails（簡稱 Rails）** 是一套以 **Ruby 語言** 為基礎所打造的全端開發框架，自 2004 年問世以來，因其「約定大於配置（Convention over Configuration）」與「不重複自己（Don't Repeat Yourself, DRY）」的設計理念，成為 Web 開發世界中極具代表性的框架之一。

Rails 強調快速開發與清晰結構，幫助開發者迅速建構可維護的應用程式，適合用於新創產品、MVP 原型開發，以及後台管理系統等場景。

---

## 重點摘要

- **核心概念：**

  - 基於 **MVC 架構**（Model-View-Controller）
  - 使用 Ruby 作為程式語言，語法簡潔易讀
  - 提供大量自動化工具，減少樣板程式碼

- **主要特色：**

  - **Active Record**：物件關聯對應（ORM）層，方便操作資料庫
  - **Action View**：視圖模板系統，支援 HTML + ERB（嵌入式 Ruby）
  - **Action Controller**：處理使用者請求、導引邏輯
  - 內建資源路由、RESTful 設計、自動產生 CRUD 操作
  - 支援開發環境分離（開發、測試、正式）

- **優點：**

  - 建立專案與開發速度快
  - 有完整且穩定的生態系與套件系統（gem）
  - 測試工具完善，支援 TDD/BDD 開發流程
  - 社群活躍，有大量教學資源

- **缺點：**

  - 在高並發、高效能要求場景可能需額外優化
  - 有一定的學習曲線，尤其對 Ruby 不熟悉的開發者

---

## 建立第一個 Rails 專案

### 1. 安裝 Rails

首先需安裝 Ruby 環境，建議搭配 **rbenv** 或 **RVM** 工具管理 Ruby 版本。安裝 Ruby 後，安裝 Rails：

```bash
gem install rails
```

確認版本：

```bash
rails -v
```

---

### 2. 建立新專案

```bash
rails new blog
cd blog
```

`rails new` 指令會建立一個完整的 Rails 專案結構，包含資料夾、設定檔、樣板程式碼等。

---

### 3. 建立資料表與模型

Rails 提供 scaffold 產生器，可以一次建立 Model、Controller、View、路由與測試程式：

```bash
rails generate scaffold Post title:string body:text
```

這個指令會建立 `posts` 資源的 MVC 元件，其中 `title` 是字串、`body` 是文字欄位。

接著執行資料庫遷移：

```bash
rails db:migrate
```

這會根據 `db/migrate` 產生的檔案，建立對應的資料表。

---

### 4. 啟動伺服器並測試

```bash
rails server
```

開啟瀏覽器進入：

```
http://localhost:3000/posts
```

你會看到一個基本的 CRUD 界面，可以建立、查看、修改與刪除文章。這是 Rails scaffold 的成果。

---

## MVC 架構簡介

Rails 採用 MVC 模式組織應用程式：

- **Model（模型）**：對應資料表與商業邏輯，使用 ActiveRecord
- **View（視圖）**：負責呈現 HTML 頁面，支援 ERB、HAML 等模板引擎
- **Controller（控制器）**：負責接收請求、操作模型、回傳視圖

範例：

```ruby
# app/models/post.rb
class Post < ApplicationRecord
end

# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end

# app/views/posts/index.html.erb
<h1>文章列表</h1>
<% @posts.each do |post| %>
  <p><%= post.title %></p>
<% end %>
```

---

## 路由與 RESTful 設計

Rails 使用 `config/routes.rb` 設定路由。若使用 `resources :posts`，Rails 會自動產生如下 RESTful 路由：

| HTTP 動作 | 路徑             | 控制器動作 | 說明         |
| --------- | ---------------- | ---------- | ------------ |
| GET       | /posts           | index      | 查看所有文章 |
| GET       | /posts/\:id      | show       | 查看單一文章 |
| GET       | /posts/new       | new        | 顯示新增頁面 |
| POST      | /posts           | create     | 建立文章     |
| GET       | /posts/\:id/edit | edit       | 顯示編輯頁面 |
| PATCH     | /posts/\:id      | update     | 更新文章     |
| DELETE    | /posts/\:id      | destroy    | 刪除文章     |

---

## 常用開發指令與功能

- 建立模型：`rails generate model Comment body:text`
- 建立控制器：`rails generate controller Comments`
- 執行測試：`rails test`
- 啟動主控台：`rails console`
- 進行資料遷移：`rails db:migrate`

---

## 實用工具與套件（Gem）

Rails 依賴大量 gem 套件，以下是常見幾個：

| 功能     | 套件名稱    | 說明                   |
| -------- | ----------- | ---------------------- |
| 認證登入 | Devise      | 最常用的使用者認證套件 |
| 上傳檔案 | CarrierWave | 支援圖片與檔案上傳     |
| 表單處理 | SimpleForm  | 增強表單設計           |
| 管理後台 | ActiveAdmin | 快速生成後台管理介面   |
| 部署工具 | Capistrano  | 遠端部署自動化         |

---

## 結語

Ruby on Rails 是一套穩定、完整、且易於上手的全端 Web 框架。它的「約定優於配置」設計理念，讓開發者可以專注在商業邏輯與產品功能，減少重複工作。

雖然使用人數成長趨緩，但在快速開發、MVP、管理後台系統等領域仍非常實用。如果你正在尋找一套能夠快速上線且易於維護的全端框架，Rails 仍是非常值得考慮的選擇（前提是對於 Ruby 不排斥）。
