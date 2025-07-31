---
title: 資料庫索引（Index）介紹入門教學筆記 | 學習筆記
date: 2024-02-20 11:33:41
author: kdchang
tags:
  - Roo Code
  - VS Code
  - 編輯器
---

## 前言

在資料庫中，隨著資料筆數的增加，查詢效率成為一個重要的議題。舉例來說，若在百萬筆資料中查找某一筆特定紀錄，如果沒有任何輔助結構，資料庫就必須逐筆掃描（Full Table Scan），效率極差。為了解決這個問題，資料庫系統引入了「索引（Index）」這個概念，來加速查詢與特定操作。索引的設計與使用，是每一位軟體工程師與資料庫設計者都必須掌握的核心技能。

---

## 重點摘要

**一、索引的主要功能：**

- 加速查詢（SELECT）
- 優化條件篩選（WHERE）
- 提升排序效率（ORDER BY）
- 支援唯一性約束（UNIQUE）
- 加快資料關聯查詢（JOIN）

**二、常見索引類型：**

- B-Tree Index：最常見的預設索引類型，適合範圍查詢。
- Hash Index：適合等值查詢（=），不支援範圍查詢。
- Composite Index（複合索引）：由多個欄位組成，適用多條件查詢。
- Full-text Index：針對全文搜尋設計。
- Spatial Index：用於地理空間查詢。

**三、索引的優點：**

- 提升查詢速度
- 減少 I/O 操作
- 加快 JOIN 與 GROUP BY 的效能
- 強化資料的唯一性驗證

**四、索引的缺點：**

- 佔用磁碟空間
- 寫入（INSERT/UPDATE/DELETE）成本增加
- 過多或不當索引會影響效能
- 需定期維護（如重建或重組索引）

**五、何時應該使用索引：**

- 查詢常出現的欄位（如常出現在 WHERE、JOIN、ORDER BY 中）
- 欄位選擇性高（值分布離散，代表這個欄位的值分布非常分散，不同值很多、不重複，如身分證字號）
- 查詢慢、Table Scan 明顯的情況

**六、何時不應使用索引：**

- 小資料表（資料筆數很少）
- 經常被更新的欄位
- 欄位選擇性低（如性別只有兩種值）

---

## 實際範例

### 1. 基本使用

以 MySQL 為例，假設有一個 `users` 表格如下：

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT,
  created_at DATETIME
);
```

現在若經常根據 `email` 來查詢使用者：

```sql
SELECT * FROM users WHERE email = 'user@example.com';
```

若未建立索引，MySQL 將會進行全表掃描。為了加速查詢，我們可以加上索引：

```sql
CREATE INDEX idx_email ON users(email);
```

查詢效率將大幅提升，特別是在資料筆數達到十萬以上的情況。

---

### 2. 複合索引

如果我們常查詢條件如下：

```sql
SELECT * FROM users WHERE age = 30 AND created_at > '2025-01-01';
```

可以建立複合索引：

```sql
CREATE INDEX idx_age_created ON users(age, created_at);
```

但注意複合索引有「最左前綴原則」，必須按照索引欄位的排列順序來使用，否則可能無法被使用。

例如：

```sql
-- 可使用 idx_age_created
SELECT * FROM users WHERE age = 30;

-- 可使用 idx_age_created
SELECT * FROM users WHERE age = 30 AND created_at > '2025-01-01';

-- 無法使用 idx_age_created
SELECT * FROM users WHERE created_at > '2025-01-01';
```

---

### 3. 檢查查詢是否使用索引

可以利用 `EXPLAIN` 關鍵字來檢查查詢是否有使用索引：

```sql
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
```

若 `key` 欄位顯示為 `idx_email`，表示查詢有使用到索引。

---

### 4. 索引對寫入的影響

當對有索引的欄位進行大量更新時，索引也需要同步更新，可能導致效能下降。例如：

```sql
UPDATE users SET email = CONCAT(email, '.tw') WHERE age = 30;
```

此時 `email` 有索引，會導致該索引也被修改，因此執行效率會受到影響。

---

### 5. 刪除不必要的索引

過多的索引會拖慢寫入效能並佔用磁碟空間。可以定期使用以下指令刪除不再使用的索引：

```sql
DROP INDEX idx_email ON users;
```

---

## 總結

索引是資料庫查詢效能優化的關鍵利器，但同時也是一把雙面刃。正確使用索引能大幅加速系統效能，不當使用則可能導致資源浪費甚至拖慢效能。實務上應透過實際的查詢分析與監控（如慢查詢日誌、`EXPLAIN`），謹慎設計與調整索引策略，才能在讀寫效能間取得最佳平衡。
