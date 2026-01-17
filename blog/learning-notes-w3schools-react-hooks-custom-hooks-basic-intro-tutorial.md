---
title: React Custom Hooks 入門教學 | w3schools 學習筆記
date: 2024-01-23 11:33:41
authors: kdchang
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

### 前言

在 React 應用程式中，隨著功能的增加與維護需求的提升，我們常常會遇到多個元件需要共享相同邏輯的情況。為了避免重複撰寫相似程式碼、增加維護成本，React 提供了一個優雅的解法：**自訂 Hook（Custom Hook）**。

自 React 16.8 版本開始，我們能使用 Hook 來管理狀態與副作用，而自訂 Hook 則是讓我們可以把邏輯封裝起來，像一般函式一樣在多個元件中重複使用。這篇文章將介紹如何從實際範例中將撰寫資料抓取的邏輯封裝成一個 Custom Hook，並展示其應用方式。

---

### 重點摘要

- React Hook 是一種能在函式元件中使用的功能，讓你能使用狀態（state）與其他 React 功能。
- **Custom Hook 是自訂的 Hook 函式**，其命名必須以 `use` 開頭（例如：`useFetch`）。
- Custom Hook 讓我們可以**封裝與重複使用邏輯**，而不重複撰寫相同的程式碼。
- 可透過傳入參數來讓 Hook 更具彈性與重用性。
- 可將如資料抓取（fetching）、表單邏輯、事件監聽等邏輯封裝成 Custom Hook。

---

### 實作範例

#### 初始範例：在元件中撰寫抓取邏輯

以下是一個簡單的 React 元件 `Home`，它在載入時從 JSONPlaceholder 抓取待辦事項（todo）資料，並顯示在頁面上：

```javascript
// index.js
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

這段程式碼可以正常運作，但若我們之後在其他元件中也需要類似的資料抓取功能，就會發現邏輯無法重用，這時就是 Custom Hook 派上用場的時候。

---

#### 抽出邏輯：撰寫 Custom Hook

我們可以將 `fetch` 的邏輯抽出成一個名為 `useFetch` 的自訂 Hook，放在 `useFetch.js` 檔案中：

```javascript
// useFetch.js
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

這個 Hook 會接收一個 URL 作為參數，並返回從該 URL 抓取到的資料。

---

#### 使用 Custom Hook 的元件

有了 `useFetch` 之後，我們就可以在 `Home` 元件中直接使用這個 Hook，如下所示：

```javascript
// index.js
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

### 說明與分析

這個自訂 Hook 的設計有以下幾個特點：

1. **命名規則**：遵守 React 規範，Hook 函式以 `use` 開頭（此例為 `useFetch`），才能被 React 正確識別為 Hook。
2. **封裝邏輯**：將 `useState` 和 `useEffect` 的邏輯封裝在 `useFetch` 中，不再重複撰寫於元件內。
3. **提高重用性**：只要傳入不同的 URL，就能從其他 API 抓取資料，使用方式彈性且簡潔。
4. **維護簡便**：若日後需要修改資料抓取的邏輯，只需在 `useFetch.js` 中調整一次，即可影響所有使用該 Hook 的元件。

---

### 總結

自訂 Hook 是 React 開發中非常實用的工具，讓我們能夠撰寫模組化、可重複使用且容易維護的邏輯。當你在多個元件中發現重複的邏輯（如資料抓取、訂閱事件、表單處理等），就可以考慮將其封裝成一個 Custom Hook，提升程式碼品質與開發效率。

透過本文介紹的 `useFetch` 範例，你應該能夠掌握如何將常見的副作用邏輯抽離為一個可重用的 Hook，也歡迎在實務中嘗試建立更多適合自己應用場景的自訂 Hook。

---

如果你想了解更多關於資料抓取的技術細節，可以進一步學習 **JavaScript Fetch API** 的用法，並搭配錯誤處理（如 `.catch()`）與 loading 狀態等進行擴充。這將使你的 Custom Hook 更加完善。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
