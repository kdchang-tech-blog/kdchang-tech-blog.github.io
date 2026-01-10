---
title: Element Plus 介紹入門教學筆記 | 學習筆記
date: 2024-11-16 11:33:41
author: kdchang
tags:
  - Vue
  - Vue Router
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
  - Element Plus
---

## 前言

在現代前端開發中，UI 框架對於提升開發效率、提升用戶體驗具有至關重要的作用。Element Plus 是一個基於 Vue 3 的開源 UI 框架，它提供了豐富的組件，並且與 Vue 3 的 Composition API 完美兼容，能幫助開發者快速構建高質量的前端應用。

在筆記中，我們將使用 Vue 3 的 `setup()` 語法來講解如何在專案中使用 Element Plus，並展示如何搭配 Vue 3 的新特性來實現更加清晰和模組化的開發模式。

## 重點摘要

- **Element Plus**：基於 Vue 3 的 UI 組件庫，提供了豐富的 UI 元件，支持 Composition API 和 TypeScript。
- **Vue 3 Setup**：使用 Vue 3 的 Composition API 和 `setup()` 來構建組件邏輯，並將 UI 與邏輯分開。
- **組件設置**：展示如何在 `setup()` 中引入並使用 Element Plus 組件。
- **全域配置**：設置 Element Plus 的全域屬性，例如默認主題或組件大小。
- **實際範例**：通過簡單的範例，演示如何在 Vue 3 中使用 Element Plus 進行開發。

## 安裝與設置

### 安裝 Element Plus

在 Vue 3 專案中使用 Element Plus，首先需要安裝它。假設你的專案已經配置了 Vue 3，則可以通過以下命令安裝 Element Plus。

```bash
npm install element-plus --save
```

或者使用 `yarn`：

```bash
yarn add element-plus
```

### 設置 Vue 3 與 Element Plus

在 Vue 3 的專案中，通過 `setup()` 語法來設置 Element Plus，首先需要在 `main.js` 或 `main.ts` 中引入 Element Plus 並配置樣式：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
```

這樣，Element Plus 就成功集成到你的 Vue 3 專案中，接下來可以開始使用其組件。

## 使用 Vue 3 Setup 語法進行開發

### 按鈕 (Button) 組件

在 Vue 3 中，`setup()` 是一個組件的初始化函數，所有的組件邏輯應該放在這個函數中。以下是如何在 `setup()` 中使用 Element Plus 的按鈕組件。

```vue
<template>
  <el-button type="primary">主要按鈕</el-button>
  <el-button type="success">成功按鈕</el-button>
  <el-button type="danger">危險按鈕</el-button>
</template>

<script setup>
import { ElButton } from 'element-plus';
</script>
```

在此範例中，使用 `import` 引入 `ElButton` 組件，並在模板中直接使用。這樣，我們就能夠根據需要渲染出不同樣式的按鈕。Element Plus 的組件會自動按照設置渲染出對應的 UI。

### 對話框 (Dialog) 組件

Element Plus 提供了功能強大的對話框組件，能夠輕鬆實現彈窗效果。下面是如何在 `setup()` 中實現一個顯示對話框的功能：

```vue
<template>
  <el-button @click="openDialog">顯示對話框</el-button>
  <el-dialog :visible.sync="dialogVisible" title="對話框標題">
    <p>這是一個對話框示例。</p>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElButton, ElDialog } from 'element-plus';

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};
</script>
```

在這個範例中，使用 `ref()` 創建了 `dialogVisible` 這個響應式變數，並且通過按鈕的點擊事件來控制對話框的顯示和隱藏。`sync` 修飾符用來將對話框的顯示狀態與 `dialogVisible` 變數同步。

### 表單 (Form) 組件

Element Plus 的表單組件支持高效的表單驗證，以下範例展示如何在 `setup()` 中使用表單組件進行資料提交。

```vue
<template>
  <el-form :model="form" ref="formRef" label-width="120px">
    <el-form-item
      label="名稱"
      prop="name"
      :rules="[{ required: true, message: '請輸入名稱', trigger: 'blur' }]"
    >
      <el-input v-model="form.name" placeholder="請輸入名稱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

const form = ref({
  name: '',
});

const submitForm = () => {
  // 表單提交處理
  console.log(form.value.name);
};
</script>
```

在這個範例中，使用 `ref()` 創建表單的資料模型，並且為名稱欄位設置了必填的驗證規則。當點擊提交按鈕時，將會輸出表單中的名稱欄位值。

### 表格 (Table) 組件

Element Plus 的表格組件支持展示大量數據，並且提供排序、過濾等功能。以下是如何使用 `setup()` 語法來渲染表格：

```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="年齡" prop="age"></el-table-column>
    <el-table-column label="地址" prop="address"></el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

const tableData = ref([
  { name: '王小明', age: 25, address: '台北市' },
  { name: '李大華', age: 30, address: '高雄市' },
  { name: '張三', age: 28, address: '台中市' },
]);
</script>
```

這個範例展示了如何使用 `ref()` 創建表格的數據源，並使用 `ElTable` 和 `ElTableColumn` 來渲染表格。

## 全域配置

Element Plus 提供了全域配置的能力，允許你在項目中設置統一的組件配置。例如，設置所有按鈕的默認大小或主題色彩等。

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(ElementPlus, {
  size: 'small', // 設定所有組件的大小為 small
  zIndex: 3000, // 設定 z-index
});

app.mount('#app');
```

這樣設置之後，你的所有組件將會默認使用小號尺寸，並且對話框等組件的 z-index 也會被統一設置。

## 總結

Element Plus 是一個強大且易於使用的 UI 框架，與 Vue 3 的 Composition API 完美集成。通過 `setup()` 語法，開發者能夠更加簡潔且模組化地編寫組件邏輯，從而提升開發效率。無論是常見的按鈕、對話框，還是複雜的表格、表單，Element Plus 都能提供強大的支持。希望本文能幫助你快速上手 Element Plus，並利用它來構建高效、現代化的前端應用。
