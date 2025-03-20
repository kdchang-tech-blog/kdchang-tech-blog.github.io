---
title: Grid Garden 入門教學筆記 | 學習筆記
date: 2024-07-11 02:23:41
author: kdchang
tags: 
    - Grid Garden
    - Grid
    - CSS

---

# 1. Grid 簡介
`Grid`（Grid Layout）是一種 CSS3 佈局模式，專門用來設計一維的彈性佈局，適用於水平或垂直排列元素，使網頁排版更加靈活且易於維護。

Grid Garden 透過花圃澆花遊戲化方式去介紹 Grid 使用方式

## Level 1
Welcome to Grid Garden, where you write CSS code to grow your carrot garden! Water only the areas that have carrots by using the grid-column-start property.

For example, grid-column-start: 3; will water the area starting at the 3rd vertical grid line, which is another way of saying the 3rd vertical border from the left in the grid.

```css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
  grid-column-start: 3;
}
```
