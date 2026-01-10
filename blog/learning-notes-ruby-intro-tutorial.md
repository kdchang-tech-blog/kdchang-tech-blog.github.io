---
title: Ruby 語言介紹與入門教學筆記 | 學習筆記
date: 2024-07-02 02:23:41
author: kdchang
tags:
  - Ruby on Rails
  - Ruby
  - Rails
---

## 前言

**Ruby** 是一種純物件導向、動態型別且語法極為直覺易讀的程式語言，由日本程式設計師「**松本行弘（Yukihiro Matsumoto）**」於 1995 年開發推出。Ruby 的開發理念是讓程式設計變得「快樂」，它重視人類可讀性多於機器效率，因此語法貼近自然語言、少有繁複標點，受到許多開發者的喜愛。

Ruby 最廣為人知的應用即是 Web 框架 **Ruby on Rails**，但 Ruby 本身也可應用於腳本撰寫、自動化流程、系統工具與 API 開發。

---

## 重點摘要

- **語言特色：**

  - **純物件導向**：數字、字串、布林值等皆為物件。
  - **語法簡潔**：接近自然語言，易於閱讀與維護。
  - **動態語言**：變數無需預先定義型別。
  - **彈性高**：支援 metaprogramming、區塊、lambda。
  - **龐大標準函式庫**與活躍社群（Gem 套件系統）。

- **應用領域：**

  - Web 開發（搭配 Rails 或 Sinatra）
  - 系統腳本與自動化任務
  - 命令列工具（如 Jekyll、CocoaPods）
  - 測試工具（RSpec、Cucumber）

- **安裝方式：**

  - 建議使用 **rbenv** 或 **RVM** 管理版本。
  - 檢查版本：`ruby -v`
  - 執行程式碼：`ruby 檔名.rb` 或 `irb`（互動環境）

---

## 語法入門實例

以下是一些 Ruby 基本語法與應用的實際範例，幫助理解語言結構與特性。

---

### 1. Hello World

```ruby
puts "Hello, world!"
```

使用 `puts` 印出字串到終端機。無需加分號，換行即表示語句結束。

---

### 2. 變數與資料型別

```ruby
name = "Alice"
age = 30
pi = 3.14
is_admin = true
```

Ruby 不需宣告型別，會根據賦值自動推斷。

---

### 3. 字串操作

```ruby
greeting = "Hello"
name = "Bob"

puts "#{greeting}, #{name}!"  # 字串插值
puts greeting.upcase          # => "HELLO"
puts name.reverse             # => "boB"
```

Ruby 字串是物件，具有許多內建方法如 `.upcase`、`.reverse`。

---

### 4. 陣列與雜湊（Hash）

```ruby
arr = [1, 2, 3]
arr << 4              # 加入元素
puts arr[2]           # => 3

person = { name: "Tom", age: 25 }
puts person[:name]    # => "Tom"
```

陣列可任意擴充，雜湊（Hash）類似於 JavaScript 的物件或 Python 的字典。

---

### 5. 控制流程

```ruby
score = 85

if score >= 90
  puts "優等"
elsif score >= 60
  puts "及格"
else
  puts "不及格"
end
```

條件式使用 `if`、`elsif`、`else`，並以 `end` 結尾。邏輯清楚、語法簡潔。

---

### 6. 迴圈與區塊

```ruby
(1..5).each do |i|
  puts "第 #{i} 次"
end
```

`(1..5)` 表示範圍，`.each` 是集合的遍歷方法，`do ... end` 是 Ruby 的區塊（block）。

---

### 7. 方法定義

```ruby
def greet(name)
  "Hello, #{name}"
end

puts greet("Ruby")
```

方法以 `def` 開頭，`end` 結尾，回傳值可省略 `return`，預設回傳最後一行的值。

---

### 8. 類別與物件導向

```ruby
class Person
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def greet
    "Hi, I'm #{@name}"
  end
end

p = Person.new("Alice")
puts p.greet   # => Hi, I'm Alice
```

Ruby 是純物件導向語言，每個資料皆為物件。類別可包含建構子 `initialize` 與方法，使用 `@變數` 表示實例變數。

---

### 9. 條件表達式簡寫

```ruby
puts "你已成年" if age >= 18
```

Ruby 支援簡化語法，條件可以寫在語句之後，提高可讀性。

---

### 10. 匿名函式與 Lambda

```ruby
double = ->(x) { x * 2 }
puts double.call(5)  # => 10
```

Lambda 是匿名函式，可用 `->` 或 `lambda` 定義，用 `.call` 呼叫。

---

## Ruby 工具與社群資源

- **Gem 套件系統**：`gem install 套件名`，安裝第三方函式庫。
- **irb**：互動式 Ruby shell，適合練習語法。
- **RDoc**：內建文件系統。
- **社群網站**：

  - [https://www.ruby-lang.org/](https://www.ruby-lang.org/)（官方網站）
  - [RubyGems.org](https://rubygems.org/)（套件管理中心）
  - [Ruby China](https://ruby-china.org/)（中文社群）

---

## 總結

Ruby 是一門設計優雅、語法簡潔、表達力強的程式語言，特別適合用於快速開發、腳本處理與 Web 應用。其強大的物件導向特性與彈性語法，讓程式設計不僅實用，更具美感。

如果你是第一次接觸和學習程式語言，Ruby 是一個相當友善的選擇。如果你是經驗豐富的開發者，也能從 Ruby 中找到清晰表達與高層次抽象的樂趣。
