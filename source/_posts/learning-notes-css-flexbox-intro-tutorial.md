---
title: Flexbox 網頁排版技巧入門教學筆記 | 學習筆記
date: 2024-11-15 02:23:41
author: kdchang
tags: 
    - Flexbox
    - css
    - 排版

---

## 1. Flexbox 簡介

`Flexbox`（Flexible Box Layout）是一種 CSS3 佈局模式，專門用來設計一維的彈性佈局，適用於水平或垂直排列元素，使網頁排版更加靈活且易於維護。

### 1.1 為何使用 Flexbox？
- **彈性調整**：元素可根據可用空間動態調整大小。
- **簡化佈局**：減少對 `float`、`inline-block` 及 `position` 依賴。
- **更好的對齊方式**：內建強大的對齊與分佈控制。

## 2. Flexbox 基本概念

Flexbox 佈局的核心概念是 **容器（container）** 和 **子項目（items）**。

```css
.container {
  display: flex;
}
```

一旦對容器使用 `display: flex`，其內部的子元素將自動變成 Flex 子項目，並受 Flex 佈局影響。

## 3. Flex 容器屬性

### 3.1 `flex-direction`
決定主軸（main axis）方向。

```css
.container {
  flex-direction: row; /* 預設值，水平排列 */
  flex-direction: row-reverse; /* 反向水平排列 */
  flex-direction: column; /* 垂直排列 */
  flex-direction: column-reverse; /* 反向垂直排列 */
}
```

### 3.2 `justify-content`
控制子項目在主軸上的對齊方式。

```css
.container {
  justify-content: flex-start; /* 預設，從左到右排列 */
  justify-content: flex-end; /* 靠右排列 */
  justify-content: center; /* 置中排列 */
  justify-content: space-between; /* 兩端對齊，間距平均分布 */
  justify-content: space-around; /* 子項目兩側有相等的間距 */
  justify-content: space-evenly; /* 所有間距均等 */
}
```

### 3.3 `align-items`
控制子項目在交叉軸（cross axis）上的對齊方式。

```css
.container {
  align-items: flex-start; /* 靠起始位置對齊 */
  align-items: flex-end; /* 靠末端對齊 */
  align-items: center; /* 垂直置中對齊 */
  align-items: stretch; /* 預設，撐滿高度 */
  align-items: baseline; /* 依據文本基線對齊 */
}
```

### 3.4 `align-content`
適用於多行佈局，控制多行之間的間距。

```css
.container {
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: space-evenly;
}
```

## 4. Flex 子項目屬性

### 4.1 `flex-grow`
設定子項目如何分配多餘空間。

```css
.item {
  flex-grow: 1; /* 所有子項目平均分配空間 */
}
```

### 4.2 `flex-shrink`
控制子項目如何縮小。

```css
.item {
  flex-shrink: 0; /* 防止縮小 */
}
```

### 4.3 `flex-basis`
設定子項目的初始大小。

```css
.item {
  flex-basis: 200px; /* 設定初始寬度或高度 */
}
```

### 4.4 `flex`
綜合 `flex-grow`、`flex-shrink` 和 `flex-basis`。

```css
.item {
  flex: 1 1 100px; /* grow, shrink, basis */
}
```

## 5. Flexbox 常見佈局範例

### 5.1 水平置中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### 5.2 等寬三欄佈局

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```

### 5.3 兩欄固定 + 自適應

```css
.container {
  display: flex;
}
.sidebar {
  flex: 0 0 200px; /* 固定 200px */
}
.content {
  flex: 1; /* 佔滿剩餘空間 */
}
```

## 6. 結論

Flexbox 是一種強大且直觀的 CSS 佈局方式，能夠解決傳統排版難題，使開發者能夠輕鬆實現響應式佈局與對齊方式。本篇筆記介紹了 Flexbox 的基本屬性及常見佈局範例，進一步學習可以研究 CSS Grid 和更進階的排版技巧。

