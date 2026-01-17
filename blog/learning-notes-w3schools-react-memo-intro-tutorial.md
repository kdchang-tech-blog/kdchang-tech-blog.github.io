---
title: 提升效能的利器：React.memo 使用入門教學 | w3schools 學習筆記
date: 2024-01-13 11:33:41
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

在 React 中，當元件的父元件重新渲染時，預設情況下其所有子元件也會一併重新渲染，即便傳入的 `props` 完全沒變動。這種「不必要的重新渲染」若發生在大型應用中，會導致效能下降，尤其是當某些元件非常複雜、包含大量計算或 DOM 操作時。

為了避免這種情況，React 提供了一個高階元件函式：`React.memo`。這個函式能讓你**記憶**元件的輸出結果，當傳入的 `props` 沒有變更時，React 就會**跳過該元件的重新渲染**，達到提升效能的效果。

---

### 重點摘要

- React.memo 可讓函式型元件根據 `props` 的淺層比較決定是否重新渲染
- 適合用在**接收不變 props 的純顯示元件**
- 若 `props` 為函式、物件、陣列時，注意傳入參考要穩定，否則仍會觸發重新渲染
- 效能提升明顯的情況：元件內容複雜、資料量大或頻繁更新的應用場景
- 搭配 `useCallback`、`useMemo` 可進一步優化

---

### 問題說明

以下是一個簡單的 React 應用，包含一個計數器與待辦事項列表元件（`Todos`）：

#### index.js

```js
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Todos from './Todos';

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['todo 1', 'todo 2']);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

#### Todos.js

```js
const Todos = ({ todos }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default Todos;
```

在這個範例中，每當你點擊「+」按鈕讓 `count` 增加時，整個 `App` 元件重新渲染，而 `Todos` 元件也會一併被重新渲染，即使 `todos` 陣列完全沒有變更。你可以從 console log 中觀察到 `child render` 不斷出現。

若這個 `Todos` 元件變得很複雜，這樣的重新渲染就會造成效能浪費。

---

### 解法：使用 React.memo

要解決這個問題，我們可以使用 `memo` 將 `Todos` 元件包裝起來，使其只有在 `props.todos` 變動時才會重新渲染。

#### 修改 Todos.js

```js
import { memo } from 'react';

const Todos = ({ todos }) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default memo(Todos);
```

這裡我們引入 `memo` 並用它包裝元件。這樣一來，只要 `todos` 的內容沒有改變，`Todos` 元件就不會重新執行 render。

---

### 行為比較與效能提升說明

| 行為         | 未使用 memo    | 使用 memo        |
| ------------ | -------------- | ---------------- |
| count 變更時 | 重新渲染 Todos | 不重新渲染 Todos |
| todos 改變時 | 重新渲染 Todos | 重新渲染 Todos   |
| 效能影響     | 易造成浪費     | 避免不必要更新   |

---

### 延伸說明

- **memo 比較的是 props 的淺層相等性**。若傳入的是物件、函式等「參考型資料」，每次 render 都會被視為不同，仍然會觸發重新渲染。
- 若要避免這種情況，可搭配 `useMemo` 或 `useCallback` 讓 props 穩定。
- `memo` 並非萬能，只有在元件內容複雜、render 成本高時，才明顯帶來效能優化。過度使用反而會增加記憶體與比較成本。

---

### 小結

`React.memo` 是 React 應用中常見的效能優化技巧之一。透過對 props 進行淺層比較，可以有效避免不必要的子元件重新渲染。當你的應用中包含大量重複渲染的靜態元件或資料時，適時使用 `memo` 可以大幅提升效能表現。

建議在開發時養成習慣：**只有當元件的 props 確實可能不會變動，且 render 成本高時再使用 `memo`**，讓效能優化達到真正效果。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
2. [React router 官方網站](https://reactrouter.com/)
