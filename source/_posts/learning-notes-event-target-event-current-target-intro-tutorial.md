---
title: 事件物件屬性 e.target 與 e.currentTarget 的差異與應用 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags:
  - 事件物件屬性
  - e.target
  - e.currentTarget
  - 版本控制
---

## 前言

在網頁開發中，事件處理是前端工程師必須熟悉的基礎知識之一。當我們使用 JavaScript 或框架（如 Vue、React）監聽 DOM 事件時，瀏覽器會提供一個事件物件（event object）給監聽函式，透過它我們能取得觸發事件的相關資訊。而在事件物件中，最常被初學者混淆的兩個屬性就是 `e.target` 與 `e.currentTarget`。

這兩者的差別看似微小，但實際上與事件冒泡機制息息相關。如果理解不清，會導致點擊判斷錯誤、事件綁定邏輯混亂，甚至出現無法預期的行為。本文將從概念、重點摘要，再到程式碼範例，逐步說明 `e.target` 與 `e.currentTarget` 的異同，並介紹實際開發中如何正確使用。

---

## 重點摘要

1. **事件冒泡（Event Bubbling）**

   - 當某個元素觸發事件時，事件會從最深層的子元素向外層父元素依序傳遞。
   - 這意味著外層元素的事件監聽器也可能被觸發。

2. **`e.target`**

   - 代表「事件最初發生的元素」。
   - 使用者實際點擊或操作的 DOM 元素，不論事件是否冒泡到其他父層。

3. **`e.currentTarget`**

   - 代表「當前正在處理事件的元素」。
   - 永遠指向事件監聽器綁定的元素。

4. **差異核心**

   - `e.target` = 使用者操作的來源元素。
   - `e.currentTarget` = 當前呼叫事件處理函式的元素。

5. **常見用途**

   - `e.target`：用於判斷使用者點擊了哪個子元素，常用於事件代理（event delegation）。
   - `e.currentTarget`：用於保證取得事件綁定的元素本身，避免因冒泡導致判斷錯誤。

---

## 範例一：基本點擊事件

以下是一個簡單的 HTML 結構：

```html
<div id="outer" style="padding:20px; background:lightgray;">
  Outer Div
  <button id="inner">Click Me</button>
</div>

<script>
  const outer = document.getElementById('outer');

  outer.addEventListener('click', (e) => {
    console.log('target:', e.target.id);
    console.log('currentTarget:', e.currentTarget.id);
  });
</script>
```

### 執行結果

1. 點擊按鈕（id="inner"）：

   - `e.target.id` → `inner`
   - `e.currentTarget.id` → `outer`

2. 點擊外層灰色區塊（id="outer"）：

   - `e.target.id` → `outer`
   - `e.currentTarget.id` → `outer`

### 說明

- 使用者實際點擊按鈕，所以 `e.target` 是 `inner`。
- 但因為事件冒泡，`outer` 的監聽器被觸發，因此 `e.currentTarget` 永遠是 `outer`。
- 這正好展示了兩者的不同：一個描述事件來源，一個描述處理者。

---

## 範例二：事件代理（Event Delegation）

事件代理是一種常見技巧，將監聽器掛在父層元素，由它統一處理子元素的事件。這種情境下，`e.target` 就非常重要。

```html
<ul id="list">
  <li data-id="1">Item 1</li>
  <li data-id="2">Item 2</li>
  <li data-id="3">Item 3</li>
</ul>

<script>
  const list = document.getElementById('list');

  list.addEventListener('click', (e) => {
    console.log('target tag:', e.target.tagName);
    console.log('currentTarget tag:', e.currentTarget.tagName);

    if (e.target.tagName === 'LI') {
      console.log('You clicked item with data-id:', e.target.dataset.id);
    }
  });
</script>
```

### 執行結果

- 點擊 `Item 2` 時：

  - `e.target.tagName` → `LI`
  - `e.currentTarget.tagName` → `UL`
  - 印出 `"You clicked item with data-id: 2"`

### 說明

- `list`（UL）負責監聽整個清單，這就是 `e.currentTarget`。
- 實際點擊的 `<li>` 元素才是 `e.target`。
- 藉由 `e.target`，我們能知道使用者點的是哪個清單項目，而不用對每個 `<li>` 綁定監聽器。

---

## 範例三：模擬 Vue 的 `.self` 行為

在 Vue 中有一個 `.self` 修飾符，代表「只有點擊元素本身，而不是子元素時，事件才觸發」。這其實就是透過 `e.target === e.currentTarget` 判斷。

```html
<div id="modal" style="width:300px; height:200px; background:rgba(0,0,0,0.5);">
  <div style="width:100px; height:100px; background:white; margin:50px auto;"></div>
</div>

<script>
  const modal = document.getElementById('modal');

  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      console.log('Clicked on modal background, close modal');
    } else {
      console.log('Clicked on inner content, do nothing');
    }
  });
</script>
```

### 說明

- 點擊外層灰色背景時：`e.target === e.currentTarget` → 成立 → 關閉彈窗。
- 點擊白色內層時：`e.target` 為內層 div，而 `e.currentTarget` 為外層 → 不相等 → 不關閉。

這個邏輯就是框架中 `.self` 修飾符的實作原理。

---

## 總結

- `e.target` 與 `e.currentTarget` 都是事件物件的重要屬性。
- `e.target` 表示事件來源，是使用者實際操作的元素。
- `e.currentTarget` 表示事件處理者，是目前綁定監聽器的元素。
- 理解這兩者的差別，對於處理事件冒泡、事件代理、以及控制複雜 UI 行為都至關重要。

當我們需要知道「使用者點了哪個子元素」時，請使用 `e.target`。當我們需要確保「正在處理事件的元素本身」時，請使用 `e.currentTarget`。

掌握這個觀念，能讓我們在撰寫事件監聽邏輯時更精準，避免誤判來源，也能設計出更乾淨與可維護的程式碼。
