---
title: SQL 入門語法教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags: 
    - SQL
    - 資料庫
 
---

SQL 是操作關聯式資料庫使用的語法。以下介紹常用 SQL 入門語法：

## 一、資料庫基本概念
資料庫 (Database)：儲存資料的容器。
資料表 (Table)：儲存資料的表格，每列 (row) 為一筆紀錄，每欄 (column) 為一種資料屬性。

---

## 二、基本 SQL 語法

#### 1. 建立資料庫
```sql
CREATE DATABASE my_database;
```

#### 2. 使用資料庫
```sql
USE my_database;
```

#### 3. 建立資料表
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT
);
```

#### 4. 查詢資料
查詢所有欄位

```sql
SELECT * FROM users;
```
選擇特定欄位
```sql
SELECT name, email FROM users;
```

#### 5. 插入資料
```sql
INSERT INTO users (name, email, age) VALUES ('John', 'john@example.com', 25);
```

#### 6. 更新資料
```sql
UPDATE users SET age = 26 WHERE id = 1;
```

#### 7. 刪除資料
```sql
DELETE FROM users WHERE id = 1;
```

---

## 三、條件查詢

#### 1. WHERE 條件
```sql
SELECT * FROM users WHERE age > 20;
```

#### 2. AND、OR、NOT
```sql
SELECT * FROM users WHERE age > 20 AND name = 'John';
SELECT * FROM users WHERE age > 20 OR age < 18;
SELECT * FROM users WHERE NOT age = 25;
```

#### 3. LIKE 模糊查詢
```sql
SELECT * FROM users WHERE name LIKE 'J%';  -- 以J開頭
SELECT * FROM users WHERE email LIKE '%@gmail.com';
```

#### 4. ORDER BY 排序
```sql
SELECT * FROM users ORDER BY age ASC;  -- 遞增排序
SELECT * FROM users ORDER BY age DESC; -- 遞減排序
```

#### 5. LIMIT 限制筆數
```sql
SELECT * FROM users LIMIT 5;
```

---

## 四、聚合函數

#### 1. 計算筆數
```sql
SELECT COUNT(*) FROM users;
```

### 2. 最大/最小值
```sql
SELECT MAX(age) FROM users;
SELECT MIN(age) FROM users;
```

### 3. 平均/總和
```sql
SELECT AVG(age) FROM users;
SELECT SUM(age) FROM users;
```

---

## 五、分組查詢

#### 1. GROUP BY
`GROUP BY` 查詢欄位僅能包含 `GROUP BY` 和聚合函數

```sql
SELECT age, COUNT(*) FROM users GROUP BY age;
```

#### 2. HAVING 搭配 GROUP BY 當作查詢條件
```sql
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;
```

## 六、資料表連接 (JOIN)

#### 1. INNER JOIN
內連接，僅返回兩個資料表中「符合交集條件」的資料。

```sql
SELECT users.id, users.name, orders.amount 
FROM users 
INNER JOIN orders ON users.id = orders.user_id;
```

#### 2. LEFT JOIN
左連接，返回左表 (users) 所有資料，即使右表 (orders) 無對應資料，也會顯示左表資料，右表無資料則會顯示 NULL。

```sql
SELECT users.id, users.name, orders.amount 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id;
```

#### 3. RIGHT JOIN
右連接，返回右表 (orders) 所有資料，即使左表 (users) 無對應資料，也會顯示右表資料，左表無資料則會顯示 NULL。

```sql
SELECT users.id, users.name, orders.amount 
FROM users 
RIGHT JOIN orders ON users.id = orders.user_id;
```

#### 4. FULL JOIN (部分資料庫支援)
全外連接，返回兩個表中所有資料，無對應資料則顯示 NULL。(MySQL 不支援 FULL JOIN，需使用 UNION 模擬)

```sql
SELECT users.id, users.name, orders.amount 
FROM users 
FULL JOIN orders ON users.id = orders.user_id;
```

## 七、合併查詢 (UNION)

#### 1. UNION

```sql
SELECT name, email FROM users WHERE age > 30
UNION
SELECT name, email FROM users WHERE age < 20;
```

UNION 用於合併兩個或多個查詢的結果。
預設會去除重複資料。
欄位數量與型態須一致。

#### 2. UNION ALL

```sql
SELECT name, email FROM users WHERE age > 30
UNION ALL
SELECT name, email FROM users WHERE age < 20;
```

與 UNION 類似，但不會去除重複資料。

---

以上整理了 SQL 入門常見的基本語法，可以基本處理資料庫操作需求。


