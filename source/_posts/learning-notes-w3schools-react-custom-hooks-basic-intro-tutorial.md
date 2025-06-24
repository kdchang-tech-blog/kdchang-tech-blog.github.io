---
title: React Custom Hooks | w3schools 學習筆記
date: 2024-01-01 11:33:41
author: kdchang
tags:
  - React
  - React Hooks
  - Next.js
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
---

### Hooks 是可重複使用的函式

當我們有一些元件邏輯需要在多個元件中共用時，我們可以將這些邏輯提取出來，寫成「自訂 Hook」。

自定義 Hook 的命名需以 `use` 開頭，例如：`useFetch`。

---

### 建立一個 Hook

以下範例中，我們在 `Home` 元件中取得資料並顯示出來。

這裡我們使用 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) 這個免費的假資料 API 服務來模擬資料擷取。這個服務非常適合在資料尚未準備好時進行開發與測試。

現在我們要使用 JSONPlaceholder 提供的「待辦事項（todo）」資料，並將它們的標題顯示在頁面上：

---

#### 範例：建立 React.js 專案並顯示資料

**index.js：**

```javascript
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
```

---

以上的資料擷取邏輯也可能在其他元件中需要，因此我們可以把它抽出來，做成一個自訂 Hook。

---

### 抽出 fetch 邏輯成自訂 Hook

我們將資料擷取邏輯移到另一個檔案中，以便重複使用：

---

#### 範例：

**useFetch.js：**

```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;
```

**index.js：**

```javascript
import ReactDOM from 'react-dom/client';
import useFetch from './useFetch';

const Home = () => {
  const [data] = useFetch('https://jsonplaceholder.typicode.com/todos');

  return (
    <>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
```

---

### 範例說明

我們建立了一個名為 `useFetch.js` 的新檔案，裡面定義了一個名為 `useFetch` 的函式，這個函式封裝了資料擷取的邏輯。

原本寫死的 URL 被改為一個參數 `url`，讓我們可以依需求傳入不同的 API 路徑。

最後，我們從這個自訂 Hook 中回傳資料。

在 `index.js` 中，我們像使用其他 Hook 一樣使用 `useFetch`，並傳入我們想要擷取資料的 URL。

這樣一來，就能在任何元件中重複使用這個自訂 Hook 來取得不同來源的資料了。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
