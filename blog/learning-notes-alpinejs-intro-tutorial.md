---
title: Alpine.js 入門教學筆記 | 學習筆記
date: 2024-10-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - 模組
    - Alpine
    - Alpine.js
    - frontend engineer

---

## 1. 什麼是 Alpine.js？
`Alpine.js` 是一個輕量級的 JavaScript 框架，專為增強 HTML 標記而設計。它的語法靈感來自 Vue.js，但更加簡潔，適用於需要簡單互動的網頁。

它的主要特點包括：
- 使用 HTML 屬性直接定義行為
- 不需要額外的構建工具
- 易於學習和使用
- 與其他框架（如 Vue、React）兼容

## 2. 安裝與引入
使用 Alpine.js 最簡單的方法是透過 CDN 引入。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alpine.js 入門</title>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
    <h1>Alpine.js 教學</h1>
</body>
</html>
```

## 3. 基本語法與應用

### 3.1 x-data
`x-data` 屬性用於定義 Alpine.js 的組件狀態。

```html
<div x-data="{ message: 'Hello, Alpine!' }">
    <p x-text="message"></p>
</div>
```

這段程式碼會顯示 `Hello, Alpine!`，並且 `x-text` 會自動更新內容。

### 3.2 x-bind
`x-bind` 允許綁定 HTML 屬性。

```html
<div x-data="{ color: 'red' }">
    <p x-bind:style="'color: ' + color">這是一段紅色文字</p>
</div>
```

### 3.3 x-on
`x-on` 用於事件監聽，例如點擊事件。

```html
<div x-data="{ count: 0 }">
    <button x-on:click="count++">增加</button>
    <p>計數：<span x-text="count"></span></p>
</div>
```

### 3.4 x-model
`x-model` 允許雙向綁定表單元素。

```html
<div x-data="{ name: '' }">
    <input type="text" x-model="name" placeholder="輸入你的名字">
    <p>你好，<span x-text="name"></span>！</p>
</div>
```

### 3.5 x-show
`x-show` 控制元素顯示或隱藏。

```html
<div x-data="{ isVisible: true }">
    <button x-on:click="isVisible = !isVisible">切換顯示</button>
    <p x-show="isVisible">這段文字可以顯示或隱藏</p>
</div>
```

### 3.6 x-if
`x-if` 會動態新增或移除元素（比 `x-show` 更影響 DOM）。

```html
<div x-data="{ isVisible: true }">
    <button x-on:click="isVisible = !isVisible">切換</button>
    <template x-if="isVisible">
        <p>這是一段可動態新增或刪除的文字</p>
    </template>
</div>
```

### 3.7 x-for
`x-for` 用於迭代陣列。

```html
<div x-data="{ items: ['蘋果', '香蕉', '橘子'] }">
    <ul>
        <template x-for="item in items" :key="item">
            <li x-text="item"></li>
        </template>
    </ul>
</div>
```

### 3.8 計時器與非同步操作
Alpine.js 支援 `setTimeout` 和 `fetch` 等 JavaScript 方法。

```html
<div x-data="{
    message: '載入中...',
    async fetchData() {
        let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        let data = await response.json();
        this.message = data.title;
    }
}" x-init="fetchData">
    <p x-text="message"></p>
</div>
```

## 4. Alpine.js 與 Tailwind CSS
Alpine.js 常與 Tailwind CSS 搭配使用，打造簡潔的 UI。

```html
<div x-data="{ open: false }" class="p-5">
    <button x-on:click="open = !open" class="bg-blue-500 text-white px-4 py-2 rounded">
        切換選單
    </button>
    <ul x-show="open" class="mt-2 border p-2">
        <li>選單 1</li>
        <li>選單 2</li>
        <li>選單 3</li>
    </ul>
</div>
```

## 5. Alpine.js 進階應用

### 5.1 Alpine.store
`Alpine.store` 可用於全域狀態管理。

```html
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('app', { count: 0 });
    });
</script>

<div x-data>
    <button x-on:click="$store.app.count++">增加</button>
    <p>計數：<span x-text="$store.app.count"></span></p>
</div>
```

### 5.2 Alpine.plugin
Alpine.js 提供外掛支援，例如 `persist`（本地儲存）。

```html
<script src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.plugin(Alpine.persist);
    });
</script>

<div x-data="{ count: $persist(0) }">
    <button x-on:click="count++">增加</button>
    <p>計數：<span x-text="count"></span></p>
</div>
```

## 6. 總結
Alpine.js 是一個靈活且輕量的框架，適合用於簡單互動需求，如表單驗證、選單切換、即時更新內容等。它不需要複雜的配置，能夠快速增強靜態 HTML 頁面。

如果你的專案需要更強大的功能，可以考慮與 Vue.js 或 React 搭配，或在更大規模的應用中使用其他框架。

