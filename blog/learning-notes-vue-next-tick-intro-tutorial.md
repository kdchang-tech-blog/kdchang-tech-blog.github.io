---
title: Vue nextTick 入門教學筆記 | 學習筆記
date: 2023-06-01 02:23:41
author: kdchang
tags:
  - nextTick
  - Vue
---

## 前言

在使用 Vue 進行開發時，常常會遇到「資料已經更新，但畫面上的 DOM 尚未更新完成」的情況。這是因為 Vue 採用了 **非同步更新策略 (asynchronous update strategy)**，它會先收集多次資料變動，再一次性地進行 DOM 更新，以提升效能。但這也意味著，如果我們想在資料變更後立即操作更新後的 DOM，往往會發現 DOM 還停留在舊的狀態。

為了解決這個問題，Vue 提供了 `nextTick` 這個 API。它允許我們在 **DOM 更新完成後**，執行特定的 callback function 或程式碼，確保操作的 DOM 是最新的。本文將介紹 `nextTick` 的基本概念、使用情境與實際範例，幫助你掌握這個常用的技巧。

---

## 重點摘要

- **Vue 更新策略**

  - Vue 採用「批次非同步更新」，會延遲 DOM 實際渲染，等所有同步程式碼執行後再統一更新。
  - 好處：避免重複渲染、提升效能。
  - 挑戰：在資料變更後立刻訪問 DOM，可能還是舊狀態。

- **`nextTick` 的作用**

  - 確保在下一次 DOM 更新循環結束後再執行指定 callback。
  - 語法：

    ```js
    import { nextTick } from 'vue';

    nextTick(() => {
      // DOM 已更新完成
    });
    ```

- **常見使用情境**

  1. **操作最新 DOM 元素**：例如要取得更新後元素的高度、寬度或位置。
  2. **與第三方函式庫整合**：某些 UI 套件需要等 DOM 更新後再初始化。
  3. **強制等待渲染完成再執行程式**：避免非同步更新造成的狀態錯誤。

- **可搭配 async/await**

  - `nextTick` 也能回傳 `Promise`，讓程式碼更直觀。
  - 適合在 `setup` 或 `methods` 中使用 `await nextTick()`。

---

## 實際範例

### 範例一：取得更新後的 DOM

```vue
<template>
  <div>
    <button @click="addItem">新增項目</button>
    <ul ref="list">
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
    <p>目前清單高度：{{ listHeight }}px</p>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const items = ref(['項目 1', '項目 2']);
const list = ref(null);
const listHeight = ref(0);

function addItem() {
  items.value.push(`項目 ${items.value.length + 1}`);
  // 此時 DOM 尚未更新，listHeight 還是舊的
  nextTick(() => {
    listHeight.value = list.value.offsetHeight;
  });
}
</script>
```

**說明：**

- 點擊按鈕時，會往清單新增項目。
- `items` 更新後，Vue 還沒立刻修改 DOM。
- 使用 `nextTick`，等到 DOM 重新渲染後，才能正確取得最新高度。

---

### 範例二：搭配 async/await 使用

```vue
<template>
  <div>
    <button @click="toggleBox">切換方塊</button>
    <div v-if="show" ref="box" class="box"></div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const show = ref(false);
const box = ref(null);

async function toggleBox() {
  show.value = !show.value;
  await nextTick();
  if (box.value) {
    console.log('方塊尺寸：', box.value.offsetWidth, box.value.offsetHeight);
  }
}
</script>

<style scoped>
.box {
  width: 200px;
  height: 100px;
  background-color: lightblue;
}
</style>
```

**說明：**

- 使用 `await nextTick()`，讓程式碼讀起來更直覺。
- 在 `v-if` 切換後，等 DOM 更新完成再訪問 `box`，避免 `null` 或舊的狀態。

---

### 範例三：計算新增元素更新後高度

```vue
<template>
  <div>
    <button @click="addItem">新增項目</button>
    <ul ref="list">
      <li v-for="n in items" :key="n">項目 {{ n }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const items = ref([1, 2]);
const list = ref(null);

async function addItem() {
  items.value.push(items.value.length + 1);

  console.log('立即讀取高度：', list.value.offsetHeight);

  await nextTick();
  console.log('nextTick 後高度：', list.value.offsetHeight);
}
</script>
```

**說明：**

- 立即讀取高度 → 還是舊值
- nextTick 後高度 → 才是更新後的 DOM 高度

### 範例四：與第三方套件整合

假設要在 Vue 中使用某個需要 DOM 初始化的套件（例如輪播圖 Swiper）：

```vue
<template>
  <div>
    <button @click="initSlider">初始化輪播</button>
    <div ref="slider">
      <div class="slide" v-for="n in 3" :key="n">Slide {{ n }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
// 假設已安裝 Swiper
import Swiper from 'swiper';

const slider = ref(null);
let swiperInstance = null;

async function initSlider() {
  await nextTick();
  if (slider.value && !swiperInstance) {
    swiperInstance = new Swiper(slider.value, {
      loop: true,
      autoplay: true,
    });
  }
}
</script>
```

**說明：**

- 先確保 DOM 結構已經渲染完成，才交給第三方套件初始化。
- 若省略 `nextTick`，可能會因為 DOM 還沒出現而報錯。

---

## 總結

- Vue 採用非同步批次更新策略，能提升效能，但會導致資料更新後 DOM 還未立即反映。
- `nextTick` 可用來等待 DOM 更新完成後再執行特定程式。
- 使用情境包括：取得最新 DOM、整合第三方套件、避免狀態錯誤。
- 可以透過 **callback function** 或 **async/await** 使用，後者更直覺。
- 熟悉 `nextTick` 能幫助我們更精確掌握 Vue 的渲染時機，寫出更穩定的互動邏輯。
