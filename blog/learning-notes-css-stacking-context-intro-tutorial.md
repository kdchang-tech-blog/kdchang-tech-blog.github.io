---
title: CSS Stacking Context 入門教學筆記 | 學習筆記
date: 2021-12-15 03:23:41
author: kdchang
tags: 
    - css
    - stylesheet

---

## 前言
在網頁開發中，當多個 HTML 元素重疊時，決定它們顯示順序的機制稱為 **Stacking Context（堆疊上下文）**。這是一個重要概念，影響 `z-index` 的行為，並決定元素在畫面上的排列順序。

---

## **1. 什麼是 Stacking Context**  

**Stacking Context** 是一個獨立的層級空間，內部的元素會依照特定規則進行排序，但不會影響外部的層級。當一個元素建立了 Stacking Context，裡面的元素只會與其內部其他元素比較 `z-index`，而不會與外部的 `z-index` 直接互動。

---

## **2. Stacking Context 的建立方式**  

某些 CSS 屬性和條件會觸發 Stacking Context 的建立，以下是常見的觸發方式：

### **2.1 根元素 (`<html>`)**
HTML 的根元素 (`<html>`) 本身是一個 Stacking Context，所有的元素都在這個上下文中運作。

### **2.2 `z-index` 非 `auto` 並且 `position` 為 `relative`、`absolute` 或 `fixed`**
當 `position` 為 `relative`、`absolute` 或 `fixed`，且 `z-index` 設定為非 `auto` 時，該元素會創建新的 Stacking Context。

```css
.parent {
    position: relative;
    z-index: 10; /* 創建 Stacking Context */
}
```

### **2.3 `opacity` 小於 1**
任何 `opacity` 設定小於 `1`（但大於 `0`）的元素都會建立新的 Stacking Context。

```css
.transparent-box {
    opacity: 0.9; /* 創建 Stacking Context */
}
```

### **2.4 `transform`、`filter`、`clip-path`、`perspective` 不為 `none`**
只要元素應用了 `transform`（例如 `scale`、`rotate`）、`filter` 或 `clip-path`，它就會建立新的 Stacking Context。

```css
.transformed-box {
    transform: translateX(50px); /* 創建 Stacking Context */
}
```

### **2.5 `will-change` 設定特定值**
如果 `will-change` 被設定為 `transform`、`opacity`、`filter` 這類的屬性，該元素會創建新的 Stacking Context。

```css
.optimized-box {
    will-change: transform; /* 創建 Stacking Context */
}
```

---

## **3. Stacking Context 的影響**

### **3.1 `z-index` 影響範圍**
如果某個元素在新的 Stacking Context 中，即使它的 `z-index` 設定得很高，也不會超過它所在的 Stacking Context。這意味著：

- 內部 `z-index` 的值 **只在該 Stacking Context 內比較**。
- 外部的元素如果 `z-index` 更高，仍然可能覆蓋內部 Stacking Context 內的元素。

### **範例：z-index 失效的情境**
```html
<div class="parent">
    <div class="child"></div>
</div>
<div class="outside"></div>
```

```css
.parent {
    position: relative;
    z-index: 10; /* 創建 Stacking Context */
}

.child {
    position: absolute;
    z-index: 9999; /* 只在 .parent 內生效 */
    background: red;
    width: 100px;
    height: 100px;
}

.outside {
    position: absolute;
    z-index: 20;
    background: blue;
    width: 100px;
    height: 100px;
    top: 50px;
    left: 50px;
}
```
**結果：**
- `.child` 的 `z-index: 9999` 只在 `.parent` 內生效。
- `.outside` 的 `z-index: 20` 屬於 `html` 根 Stacking Context，所以 `.outside` 會蓋住 `.child`。

---

## **4. 如何 Debug Stacking Context**
當 `z-index` 沒有如預期運作時，可以用以下方式檢查：

### **4.1 使用開發者工具**
- 在 **Chrome 開發者工具**（F12）內，檢查 `z-index` 的層級。
- 在「Elements」面板檢查 `z-index` 及是否有 `opacity`、`transform` 等影響屬性。

### **4.2 確保 Stacking Context**
如果發現 `z-index` 設定沒有影響，可以：
1. 確認父元素是否創建了新的 Stacking Context。
2. 嘗試移除 `transform`、`opacity` 或 `filter`，看看是否影響 `z-index`。

---

## **5. Stacking Context 的應用場景**

### **5.1 固定導覽列與內容遮罩**
當 `position: fixed` 的導覽列無法覆蓋其他元素時，可以確保它擁有較高 `z-index`，並避免它被無意創建的 Stacking Context 影響。

```css
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: black;
    color: white;
    z-index: 1000;
}
```

### **5.2 Modal（模態視窗）**
確保 `modal` 的 `z-index` 高於其他元素，並避免 `opacity` 或 `transform` 影響 `z-index`。

```css
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    background: white;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
```

---

## **6. 總結**
- **Stacking Context** 影響 `z-index` 的作用範圍，讓 `z-index` 不總是依照數值大小決定順序。
- 多種 CSS 屬性（如 `opacity`、`transform`）會創建 Stacking Context，可能影響層級渲染結果。
- **在開發時，應注意哪些元素創建了 Stacking Context，以確保 `z-index` 如預期運作**。

透過以上概念與技巧，可以更靈活地管理 HTML 元素的層級關係，確保視覺效果正確。