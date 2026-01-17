---
title: Vue ref 與 reactive 入門教學筆記 | 學習筆記
date: 2024-12-17 02:23:41
authors: kdchang
tags: 
    - vue
    - ref
    - reactive
    - vue.js

---

## 前言
在 Vue 3 中，`ref` 與 `reactive` 都是用來創建**響應式資料**的工具，但它們適用的情境略有不同。以下是清楚的比較與實際使用範例，幫助你理解什麼時候該用哪一個。

---

## `ref` 使用情境

### 適用於：
- **原始資料型別**：如 `Number`、`String`、`Boolean`、`Date` 等。
- 你只需要追蹤單一值。
- 當你需要某個變數傳遞到 `<template>` 或函式中。

### 語法：
```js
import { ref } from 'vue'

const count = ref(0)
count.value++ // 需要用 .value 訪問或修改
```

### 範例：
```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello')
const count = ref(0)

const updateMessage = () => {
  message.value = 'Hi Vue 3'
}
</script>
```

---

## `reactive` 使用情境

### 適用於：
- **物件或陣列**：需要操作多個屬性的資料結構。
- 多層巢狀資料或你希望所有屬性都具有響應性。
- 表單資料、設定物件等複雜狀態管理。

### 語法：
```js
import { reactive } from 'vue'

const user = reactive({
  name: 'Daniel',
  age: 30
})

user.age++ // 直接修改即可，無需 .value
```

### 範例：
```vue
<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  isSubscribed: false
})

const submitForm = () => {
  console.log(form.username, form.email, form.isSubscribed)
}
</script>
```

---

## ⚠️ `ref` 包物件 vs `reactive`

雖然你也可以這樣用：

```js
const user = ref({ name: 'Daniel', age: 30 })
```

但要存取時就需要：

```js
user.value.name = 'John'
```

用 `reactive` 則可以直接操作：

```js
user.name = 'John'
```

所以若你有**物件資料**，通常選擇 `reactive` 更直覺。

---

## 建議使用方式整理：

| 類型             | 建議使用方式 |
|------------------|---------------|
| 單一變數（數字、字串） | `ref`         |
| 多欄位表單資料     | `reactive`    |
| 陣列、物件、巢狀結構 | `reactive`    |
| 要被 `watch` 或 `computed` 的原始值 | `ref`         |

---
