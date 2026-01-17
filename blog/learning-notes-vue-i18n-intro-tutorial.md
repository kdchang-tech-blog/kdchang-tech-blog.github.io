---
title: Vue i18n 入門教學筆記 | 學習筆記
date: 2024-11-14 02:23:41
authors: kdchang
tags: 
    - Vue
    - i18n
    - Vue i18n
    - 多語系
    - 多國語系
    - 在地化

---

## 1. Vue I18n 簡介

Vue i18n 是 Vue.js 的國際化（Internationalization）解決方案，可用於管理應用程式的多語系內容。當開發需要支援不同語言的應用時，Vue i18n 提供了一個高效的方式來處理翻譯、數字格式、日期格式等。

### 1.1 為何使用 Vue I18n？

- **動態切換語言**：讓使用者能夠即時更改語言。
- **簡化多語系管理**：集中化翻譯內容，方便維護。
- **格式化支援**：內建日期、時間、數字等格式化功能。

## 2. 安裝 Vue I18n

Vue I18n 可透過 npm 安裝，適用於 Vue 3 應用。

```sh
npm install vue-i18n
```

## 3. 設定 Vue I18n

在 Vue 3 中，可以使用 `createI18n` 來設定 Vue I18n：

```js
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

const messages = {
  en: {
    welcome: 'Welcome to Vue I18n!'
  },
  zh: {
    welcome: '歡迎使用 Vue I18n！'
  }
};

const i18n = createI18n({
  locale: 'en', // 預設語言
  fallbackLocale: 'zh', // 備用語言
  messages
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
```

## 4. 在組件中使用 Vue I18n

### 4.1 使用 `$t` 方法

在 Vue 組件中，可以透過 `$t` 方法來取得翻譯內容。

```vue
<template>
  <h1>{{ $t('welcome') }}</h1>
</template>
```

### 4.2 切換語言

可以透過 `this.$i18n.locale` 來更改語言：

```vue
<template>
  <div>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('zh')">中文</button>
    <p>{{ $t('welcome') }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>
```

## 5. 使用外部 JSON 檔案管理翻譯內容

當專案的翻譯內容較多時，建議將翻譯字串拆分成獨立的 JSON 檔案。

**建立語言檔案：**

`locales/en.json`
```json
{
  "welcome": "Welcome to Vue I18n!"
}
```

`locales/zh.json`
```json
{
  "welcome": "歡迎使用 Vue I18n！"
}
```

**修改 `i18n` 設定：**

```js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zh from './locales/zh.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'zh',
  messages: { en, zh }
});
```

## 6. 插值與變數

Vue I18n 支援在翻譯字串中插入變數。

```js
const messages = {
  en: {
    greeting: 'Hello, {name}!'
  },
  zh: {
    greeting: '你好, {name}!'
  }
};
```

在組件中使用：

```vue
<p>{{ $t('greeting', { name: 'John' }) }}</p>
```

## 7. 訊息格式化與日期、數字處理

Vue I18n 內建 `numberFormats` 和 `datetimeFormats`，可用於格式化數字與日期。

```js
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'zh',
  messages,
  numberFormats: {
    en: {
      currency: {
        style: 'currency', currency: 'USD'
      }
    },
    zh: {
      currency: {
        style: 'currency', currency: 'TWD'
      }
    }
  }
});
```

在組件中使用：

```vue
<p>{{ $n(1000, 'currency') }}</p>
```

## 8. 延遲載入翻譯（Lazy Loading）

當應用程式的語言檔案過多時，建議使用動態載入（Lazy Loading）來優化效能。

```js
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'zh',
  messages: {}
});

async function loadLocaleMessages(locale) {
  const messages = await import(`./locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale = locale;
}
```

## 9. 結論

Vue I18n 是 Vue.js 中強大的國際化解決方案，透過 `$t` 方法、插值變數、外部 JSON 檔案管理，以及數字與日期格式化功能，可以讓開發者輕鬆實作多語系應用。本篇筆記介紹了 Vue I18n 的基本使用方式，進一步學習可研究動態載入、多語系 SEO 以及與 Vue Router 的結合。

