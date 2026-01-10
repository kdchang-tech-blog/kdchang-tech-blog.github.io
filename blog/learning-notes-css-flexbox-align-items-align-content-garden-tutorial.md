---
title: CSS Flexbox align-items 和 align-content 入門教學筆記 | 學習筆記
date: 2024-07-11 02:23:41
author: kdchang
tags: 
    - Grid Garden
    - Grid
    - align-items
    - align-content
    - CSS
    - CSS

---

# 前言
在 CSS Flexbox 和 Grid 佈局中，`align-items` 和 `align-content` 兩者都與「對齊」有關，但適用的情境不同（單行 vs 多行）：

## 1. `align-items`
- 作用於**單行內容**（單行 Flexbox 或 Grid 容器內的項目）。
- 控制**子元素**在**交叉軸（cross-axis）**上的對齊方式。

### **常見值**
| 值 | 說明 |
|----|------|
| `stretch` | 預設值，子元素會拉伸填滿容器的交叉軸 |
| `flex-start` | 對齊交叉軸的起始點 |
| `flex-end` | 對齊交叉軸的結束點 |
| `center` | 置中對齊 |
| `baseline` | 以文字基線（baseline）對齊 |

### **範例**
```css
.container {
  display: flex;
  align-items: center; /* 子元素在交叉軸上置中對齊 */
  height: 200px;
  border: 1px solid black;
}

.item {
  width: 50px;
  height: 50px;
  background-color: lightblue;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
</div>
```
 **效果**：`item` 會在 `container` 的交叉軸（垂直方向）置中對齊。

---

## 2. `align-content`
- 作用於**多行內容**（當 `flex-wrap: wrap` 或 Grid 有多行時）。
- 控制**整體行的對齊**，而不是單個項目。

### **常見值**
| 值 | 說明 |
|----|------|
| `stretch` | 預設值，行會拉伸填滿容器 |
| `flex-start` | 行對齊交叉軸的起始點 |
| `flex-end` | 行對齊交叉軸的結束點 |
| `center` | 行置中對齊 |
| `space-between` | 第一行靠起始點，最後一行靠結束點，其他行平均分布 |
| `space-around` | 每行之間有相等的間距 |
| `space-evenly` | 每行之間及兩側間距相等 |

### **範例**
```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* 整體行群組在交叉軸上置中 */
  height: 400px;
  border: 1px solid black;
}

.item {
  width: 100px;
  height: 100px;
  background-color: lightcoral;
  margin: 5px;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```
**效果**：當 `.container` 高度足夠時，多行 `.item` 會整體置中排列。

---

## **總結**
| 屬性 | 影響對象 | 適用於 | 主要功能 |
|------|--------|-------|---------|
| `align-items` | 子元素 | 單行（未換行） | 控制子元素在交叉軸上的對齊 |
| `align-content` | 整體行 | 多行（`flex-wrap: wrap`） | 控制多行的整體對齊 |

如果容器內只有**一行**，`align-content` 通常不會有影響，這時候應該使用 `align-items`。

需要 `align-content` 發揮作用時，請確保：
1. 容器有 `flex-wrap: wrap;`（多行）
2. 容器有足夠的**高度**（不然內容會自動填滿）