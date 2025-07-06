---
title: React 效能優化入門教學筆記 | 學習筆記
date: 2024-12-26 02:23:41
author: kdchang
tags:
  - Performance Optimization
  - React
  - ES Module
---

## 前言

React 作為現代前端開發的主流函式庫之一，強調 UI 的組件化與狀態驅動式渲染。然而，隨著應用規模擴大與資料變得動態頻繁，React 應用可能出現重新渲染過多、載入過慢或記憶體占用過高等問題，影響使用者體驗與開發效率。為此，瞭解與掌握 React 的效能優化技巧，成為中高階開發者的重要功課。

本篇筆記將介紹 React 效能優化的核心原則與常見實作方式，搭配簡單的程式碼範例說明實際操作，協助你建立清晰的優化思維與實作經驗。

---

## 重點摘要

- **避免不必要的重新渲染**

  - 使用 `React.memo` 包裹純函式組件
  - 適當使用 `useMemo` 與 `useCallback` 記憶運算結果或函式引用

- **Lazy loading（Code Splitting）**

  - 使用 `React.lazy` 與 `Suspense` 實現組件按需載入

- **列表渲染優化**

  - 提供穩定的 `key`，避免 diff 錯誤導致重繪
  - 處理大量資料時可結合虛擬化工具（如 `react-window`）

- **狀態管理與邏輯分離**

  - 將全域狀態與 UI 狀態分離，減少重渲染範圍
  - 減少 props 傳遞鏈，避免深層組件無謂更新

- **避免 inline 宣告與函式**

  - 每次 render 都會產生新函式或物件，導致子組件重新渲染

- **效能分析與工具**

  - 使用 React DevTools 的 Profiler 模組分析 render 開銷
  - 善用 Chrome DevTools、Lighthouse 等協助調校效能

---

## 實際範例

### 1. 避免不必要的渲染：使用 `React.memo`

```jsx
// 子元件
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  console.log('Render:', todo.text);
  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      {todo.text}
    </li>
  );
});
```

若未使用 `React.memo`，即使 `todo` 資料未變，只要父層重新 render，`TodoItem` 就會跟著重新 render。使用 `React.memo` 可避免這種不必要的重新渲染。

---

### 2. 函式記憶：使用 `useCallback`

```jsx
const onToggle = useCallback((id) => {
  setTodos((prev) =>
    prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  );
}, []);
```

如果 `onToggle` 每次 render 都重新宣告，會導致 `React.memo` 判斷 props 改變，從而重新渲染子元件。使用 `useCallback` 可以保留函式參考的一致性。

---

### 3. 虛擬滾動列表：使用 `react-window`

```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

const MyList = () => (
  <List height={300} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);
```

`react-window` 提供虛擬滾動的能力，只 render 可視範圍內的項目，大幅減少 DOM 結點，提高大數據列表效能。

---

### 4. 懶載入元件：使用 `React.lazy`

```jsx
import React, { Suspense } from 'react';

const Chart = React.lazy(() => import('./Chart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <Chart />
    </Suspense>
  );
}
```

將大型組件分割成懶載入模組，可避免初次載入體積過大，提升頁面初始加載速度。

---

### 5. 使用 Profiler 分析效能瓶頸

React DevTools 提供 Profiler 模組，可追蹤各元件 render 時間與次數，有助於識別過度渲染或效能低落的元件。

```jsx
import { Profiler } from 'react';

<Profiler
  id="TodoList"
  onRender={(id, phase, actualDuration) => {
    console.log(`${id} rendered in ${actualDuration}ms`);
  }}
>
  <TodoList todos={todos} />
</Profiler>;
```

---

## 結語

React 效能優化並非一蹴可幾，而是需隨著應用規模與需求不斷調整與改善的過程。透過理解 Virtual DOM 的運作原理、掌握各種 Hook 的特性，以及活用分析工具，我們可以更有策略地針對效能瓶頸逐步優化，打造流暢且可維護的使用者體驗。

建議從小型優化（如 `React.memo`、`useCallback`）著手，並逐步引入懶載入與虛擬化等進階技巧，讓 React 應用能夠隨著功能擴展持續保持高效能。

如果你對特定效能問題有興趣，例如圖片載入優化、CSR vs SSR 效能比較等，也可以再深入探討不同的進階主題。
