---
title: CSS 權重（Specificity）入門教學筆記 | 學習筆記
date: 2021-12-16 02:23:41
authors: kdchang
tags: 
    - css
    - stylesheet

---

#### 1. 什麼是 CSS 權重？  
CSS 權重（Specificity）是指當多個選擇器同時作用於同一個元素時，瀏覽器決定應用哪條 CSS 規則的優先級機制。不同選擇器具有不同的權重，權重高的樣式會覆蓋權重低的樣式。  

---

#### 2. CSS 權重的計算方式  
CSS 權重由四個部分組成，從高到低分別是：  
1. **行內樣式（Inline Styles）**
2. **ID 選擇器（ID Selectors）**
3. **類別、偽類與屬性選擇器（Class, Pseudo-classes, Attribute Selectors）**
4. **元素與偽元素選擇器（Element, Pseudo-elements）**

每種類型的選擇器都有固定的權重值，計算時以「數值」方式比較：

| 選擇器類型           | 權重值 |
|----------------------|------|
| 行內樣式（`style=""`）| 1000 |
| ID 選擇器（`#id`）   | 100  |
| 類別選擇器（`.class`）、偽類（`:hover`）、屬性選擇器（`[type="text"]`） | 10   |
| 元素選擇器（`div`、`p`）、偽元素（`::before`、`::after`） | 1    |

---

#### 3. 權重計算範例  

##### 3.1 元素選擇器 vs. 類別選擇器  
```css
p {
    color: blue; /* 權重 1 */
}

.text {
    color: red; /* 權重 10 */
}
```
```html
<p class="text">這段文字應該是紅色</p>
```
**結果：** `.text` 的權重為 10，比 `p` 的權重 1 高，因此文字顯示為紅色。

---

##### 3.2 類別 vs. ID 選擇器  
```css
.text {
    color: red; /* 權重 10 */
}

#main {
    color: green; /* 權重 100 */
}
```
```html
<p id="main" class="text">這段文字應該是綠色</p>
```
**結果：** `#main` 的權重 100 高於 `.text` 的 10，因此文字顯示為綠色。

---

##### 3.3 屬性選擇器與偽類  
```css
p {
    color: black; /* 權重 1 */
}

p:hover {
    color: blue; /* 權重 10 */
}

p[title] {
    color: red; /* 權重 10 */
}
```
```html
<p title="Example">這段文字會是紅色，滑鼠懸停時變藍色</p>
```
**結果：** `p[title]` 與 `p:hover` 權重相同（10），但 `p:hover` 只在滑鼠懸停時生效，因此預設為紅色，懸停時變藍色。

---

#### 4. 多個選擇器組合計算  
當一個 CSS 規則包含多種選擇器時，其權重會累加計算。

##### 4.1 複合選擇器  
```css
div p {
    color: blue; /* 權重 2 (div=1 + p=1) */
}

div .text {
    color: red; /* 權重 11 (div=1 + .text=10) */
}

#container .text {
    color: green; /* 權重 110 (#container=100 + .text=10) */
}
```
```html
<div id="container">
    <p class="text">這段文字應該是綠色</p>
</div>
```
**結果：** `#container .text` 的權重 110 高於 `div .text`（11）和 `div p`（2），所以文字顯示為綠色。

---

##### 4.2 !important 覆蓋權重  
```css
.text {
    color: red !important;
}

#main {
    color: green;
}
```
```html
<p id="main" class="text">這段文字應該是紅色</p>
```
**結果：** 即使 `#main` 的權重較高，`!important` 仍然強制覆蓋樣式，使文字變紅。

---

#### 5. 權重衝突的解決策略  
1. **避免使用 `!important`，除非是必要的**
2. **使用更具體的選擇器**
3. **組織 CSS 層級結構**
4. **使用適當的 CSS 預處理器（如 SCSS、LESS）**

---

#### 6. 總結
理解 CSS 權重是撰寫高效、可維護樣式表的關鍵。透過計算選擇器的權重，可以精確控制樣式的優先級，避免不必要的覆蓋問題，提升開發效率。