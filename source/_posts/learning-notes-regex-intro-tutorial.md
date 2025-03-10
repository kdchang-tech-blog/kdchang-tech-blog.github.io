---
title: 正規表達式（Regex）入門教學筆記 | 學習筆記
date: 2024-12-14 02:23:41
author: kdchang
tags: 
    - Regular Expression
    - 正則式
    - 正規表達式
    - Regex

---

## 1. 正規表達式簡介
正規表達式（Regular Expression，簡稱 `Regex`）是一種用於字串匹配與處理的強大工具。它廣泛應用於文字搜尋、資料驗證、文字替換等場景。正規表達式透過特殊的語法模式來描述字串結構，並可被多種程式語言支援，如 Python、JavaScript、Java、C# 等。

## 2. 基本語法與範例

### 2.1 字面量匹配
正規表達式最基本的形式是字面量匹配，意即直接搜尋特定字串。

**範例**：
```regex
hello
```
可匹配「hello」這個字串。

### 2.2 字元類別（Character Classes）
字元類別用來匹配特定類型的字元。

| 語法 | 說明 | 範例 |
|------|------|------|
| `.`  | 任意單一字元（不含換行） | `h.t` 可匹配 `hat`, `hot`, `hit` |
| `[abc]` | 任意列出的字元 | `[aeiou]` 可匹配任一母音字母 |
| `[^abc]` | 不包含列出的字元 | `[^0-9]` 可匹配任何非數字字元 |
| `[a-z]` | 字母範圍 | `[a-zA-Z]` 可匹配所有英文字母 |
| `\d` | 任意數字（等價於 `[0-9]`） | `\d{2}` 可匹配 `23`, `89` |
| `\w` | 任意字母、數字或底線（`[a-zA-Z0-9_]`） | `\w+` 可匹配 `hello_123` |
| `\s` | 空白字元（空格、Tab、換行） | `\s+` 可匹配 `   ` |

### 2.3 邊界匹配（Anchors）
用來限制匹配的位置。

| 語法 | 說明 | 範例 |
|------|------|------|
| `^` | 開頭 | `^Hello` 只能匹配 `Hello world`，但不匹配 `Say Hello` |
| `$` | 結尾 | `world$` 只能匹配 `Hello world`，但不匹配 `world today` |
| `\b` | 單字邊界 | `\bcat\b` 只匹配 `cat`，但不匹配 `catch` |

### 2.4 重複匹配（Quantifiers）
用來指定重複次數。

| 語法 | 說明 | 範例 |
|------|------|------|
| `*`  | 0 次或更多 | `ba*` 可匹配 `b`, `ba`, `baa`, `baaa` |
| `+`  | 1 次或更多 | `ba+` 可匹配 `ba`, `baa`, `baaa` 但不匹配 `b` |
| `?`  | 0 次或 1 次 | `colou?r` 可匹配 `color` 和 `colour` |
| `{n}` | 恰好 n 次 | `a{3}` 只匹配 `aaa` |
| `{n,}` | 至少 n 次 | `a{2,}` 可匹配 `aa`, `aaa`, `aaaa` |
| `{n,m}` | n 到 m 次 | `a{2,4}` 可匹配 `aa`, `aaa`, `aaaa` |

### 2.5 分組與選擇（Groups & Alternation）
使用括號來分組，使用 `|` 來表示選擇。

**範例**：
```regex
(grape|apple|banana)
```
匹配 `grape`、`apple` 或 `banana`。

**範例（分組）**：
```regex
(a|b)c
```
匹配 `ac` 或 `bc`。

### 2.6 轉義字元（Escape Characters）
正規表達式中的特殊字元（如 `.`、`*`、`?`）需要用 `\` 進行轉義。

**範例**：
```regex
\.com
```
匹配 `.com`（實際字面值）。

## 3. 正規表達式應用範例

### 3.1 Email 驗證
```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```
**匹配範例**：
- `test@example.com` ✅
- `hello@domain.co.uk` ✅
- `invalid@com` ❌

### 3.2 手機號碼驗證（台灣格式）
```regex
^09[0-9]{8}$
```
**匹配範例**：
- `0912345678` ✅
- `1234567890` ❌

### 3.3 找出所有網址
```regex
https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/\S*)?
```
**匹配範例**：
- `https://www.google.com` ✅
- `http://example.org/test` ✅
- `ftp://invalid.url` ❌

### 3.4 HTML 標籤匹配
```regex
<([a-z]+)([^<]+)*(?:>(.*?)</\1>|/>)
```
**匹配範例**：
- `<div class="container">Content</div>` ✅
- `<img src="image.jpg" />` ✅

## 4. 總結
正規表達式是一種強大的工具，適用於文字處理與資料驗證。透過學習基本語法與實際應用，你可以更有效率地處理字串相關的問題。實務上建議透過線上工具（如 [Regex101](https://regex101.com/) 等工具）來測試你的正規表達式，以加深理解。

