---
title: Bloom Filter 入門教學筆記 | 學習筆記
date: 2024-12-16 02:23:41
author: kdchang
tags:
  - Bloom Filter
  - 布隆過濾器
---

## 前言

在處理大數據或需要大量查詢的系統中，「是否存在某個元素」是一個常見的需求。例如：檢查某個使用者是否已註冊、某筆資料是否已儲存、或某個網址是否在黑名單中。這些操作如果都直接查詢資料庫，會造成效能瓶頸，尤其在資料量非常大的情況下。

為了解決這個問題，**Bloom Filter（布隆過濾器）**誕生了。這是一種**空間效率極高且速度快速**的**概率型資料結構**，用於檢查元素是否在集合中。它的特點是可以節省大量記憶體與查詢時間，代價是可能會有「誤判存在」的情況，但保證不會漏判。

Bloom Filter 並不是用來取代資料庫，而是作為**第一層快速判斷工具**，幫助系統更有效率地篩選資料，提升整體效能。

---

## 重點摘要

- **定義**：Bloom Filter 是一種用於判斷元素是否存在於集合中的資料結構，具有一定誤判率。
- **特點**：

  - 省記憶體：只使用位元陣列來表示集合
  - 查詢速度快：時間複雜度為 O(k)，k 為 hash 函數數量
  - 有誤判率：可能錯誤地認為某元素存在，但不會錯誤地排除已存在的元素
  - 不可刪除：傳統 Bloom Filter 不支援元素刪除（可改用 Counting Bloom Filter）

- **運作方式**：

  1. 建立一個 bit array（位元陣列），初始為全 0
  2. 每個元素經由多個 hash 函數映射為數個 bit 位址，並設為 1
  3. 查詢元素時，將元素經過相同的 hash 函數，檢查對應 bit 是否都為 1

     - 若任一為 0，則元素**一定不存在**
     - 若全部為 1，則元素**可能存在**

- **應用場景**：

  - 快取系統的查詢優化
  - URL 黑名單篩選
  - 防止 email 重複註冊
  - 分散式系統中的資源去重

---

## 實際範例（Python 語言）

以下示範如何使用 Python 實作 Bloom Filter，並透過 `pybloom-live` 套件進行簡易操作。

### 安裝套件

```bash
pip install pybloom-live
```

### 基本使用範例

```python
from pybloom_live import BloomFilter

# 建立一個 Bloom Filter，容量為 10000 筆，容忍誤判率為 1%
bloom = BloomFilter(capacity=10000, error_rate=0.01)

# 加入元素
bloom.add("apple")
bloom.add("banana")

# 查詢元素是否存在
print("apple" in bloom)   # True
print("banana" in bloom)  # True
print("grape" in bloom)   # False（或可能 True，機率很小）
```

### 解釋程式碼

- `capacity`: 預估將要儲存的元素數量，Bloom Filter 的大小與 hash 數量會依此設定
- `error_rate`: 容許誤判率（預測某元素在集合中時，實際不在）
- `.add()`: 將元素加入 Bloom Filter
- `in`: 使用 Python 語法糖來查詢元素是否在 Bloom Filter 中

### 模擬誤判情況

```python
false_positives = 0
test_data = ["item" + str(i) for i in range(10000, 10100)]

for item in test_data:
    if item in bloom:
        false_positives += 1

print(f"誤判次數：{false_positives}")
```

這段程式碼將檢查 100 筆從未加入過的資料，看有多少筆被錯誤地判斷為「已存在」。由於設定誤判率為 1%，實際誤判筆數大致會落在 0\~2 筆之間。

---

## 進階補充：Bloom Filter 的數學基礎

假設：

- `n` 為預估儲存的元素數量
- `m` 為 bit 陣列大小
- `k` 為 hash 函數數量

則誤判率約為：

```
(1 - e^(-kn/m))^k
```

透過微積分分析，可以得出在給定 `m` 與 `n` 的情況下，最理想的 hash 函數數量為：

```
k = (m/n) * ln(2)
```

Bloom Filter 的實作常會根據這些公式自動配置最佳參數。

---

## 總結

Bloom Filter 是一個非常實用的資料結構，適合用於需要**高效率查詢與記憶體節省**的場景。雖然它無法完全準確地判斷元素是否存在，但在可以接受少量誤判的場景（例如快取、URL 過濾、黑名單系統等）中，它是非常有效率的選擇。

理解 Bloom Filter 的基本概念與限制，可以幫助我們在設計大型系統時做出更合適的架構選擇。如果你正在處理大量資料或需要快速查詢的場景，不妨試著將 Bloom Filter 納入考量。
