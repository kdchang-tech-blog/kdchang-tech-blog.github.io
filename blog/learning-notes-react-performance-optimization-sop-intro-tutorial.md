---
title: React 效能優化 SOP 檢核清單入門教學筆記 | 學習筆記
date: 2024-12-25 02:23:41
authors: kdchang
tags:
  - Performance Optimization
  - React
  - ES Module
---

## 前言

在大型單頁應用（SPA）與複雜互動式介面中，效能瓶頸常常來自不必要的重新渲染、大型 bundle 導致的載入緩慢，以及過度操作 DOM 所造成的卡頓。建立一份標準化的「效能優化檢核清單」（SOP，Standard Operating Procedure），能夠在開發流程中明確指出應檢查的重點、落實最佳實踐，並透過持續監控與回饋，進一步強化團隊的效能意識與程式品質。

本篇筆記將依照從「程式撰寫到部署」的不同階段，提出具體的檢核項目，並搭配最常見的 React 效能優化技術範例，協助你快速掌握如何在日常開發與 Code Review 中落實效能優化。

---

## 重點摘要

- **一、避免不必要的重新渲染**

  - 使用 `React.memo` 包裹純函式元件
  - 針對函式與物件 props，使用 `useCallback`、`useMemo` 進行記憶
  - 避免 JSX inline 宣告函式或物件

- **二、State 管理與元件分離**

  - 下放 state 至影響範圍最小的元件
  - UI 狀態（開關、Modal 等）與業務資料分離
  - 避免全域 context 過度包覆，導致大範圍 re-render

- **三、列表與大量資料渲染優化**

  - 確保 `key` 穩定（使用唯一 id，非 index）
  - 採用虛擬滾動（`react-window`、`react-virtualized`）
  - 分頁或懶加載機制

- **四、Code Splitting 與懶載入**

  - 使用 `React.lazy` + `Suspense` 分割大型元件
  - 路由層級拆分，動態 `import()`
  - 圖片與第三方資源延遲加載

- **五、效能分析與監控工具**

  - React DevTools Profiler：分析元件 render 次數與耗時
  - Lighthouse / Web Vitals：追蹤 FCP、LCP、TTFB 等指標
  - Bundle 分析（Webpack Bundle Analyzer、Source Map Explorer）

- **六、CI／Code Review 效能檢查**

  - 將檢核清單納入 Pull Request 模板
  - 自動化檢測 bundle size 變化
  - 定期性能測試腳本（Cypress、Playwright + Lighthouse）

---

## 實際範例

### 範例一：避免不必要的重新渲染

```jsx
// ChildComponent.jsx
import React from 'react';

function ChildComponent({ data, onClick }) {
  console.log('ChildComponent render');
  return <div onClick={onClick}>{data.text}</div>;
}

export default React.memo(ChildComponent);
```

```jsx
// ParentComponent.jsx
import React, { useState, useCallback, useMemo } from 'react';
import ChildComponent from './ChildComponent';

export default function ParentComponent({ initialData }) {
  const [count, setCount] = useState(0);

  // useMemo 記憶 data 物件，避免因父組件重新 render 而改變 reference
  const data = useMemo(
    () => ({
      text: initialData,
    }),
    [initialData]
  );

  // useCallback 記憶函式，不會因為 count 變化而重新建立
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>點擊次數：{count}</p>
      <ChildComponent data={data} onClick={handleClick} />
    </div>
  );
}
```

> **檢核點**：
>
> - ChildComponent 是否用 `React.memo` 包裹？
> - data 物件是否用 `useMemo`？
> - onClick 是否用 `useCallback`？

---

### 範例二：列表虛擬化

```jsx
// ListView.jsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';

const Row = React.memo(({ index, style }) => <div style={style}>列表項目 #{index}</div>);

export default function ListView() {
  return (
    <List height={400} itemCount={10000} itemSize={35} width={'100%'}>
      {Row}
    </List>
  );
}
```

> **檢核點**：
>
> - 是否針對長列表導入虛擬化？
> - itemSize 與 height 設定是否合理？

---

### 範例三：Code Splitting 與懶載入

```jsx
// routes.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>載入中...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  );
}
```

> **檢核點**：
>
> - 是否有針對路由或大型元件進行懶載入？
> - fallback UI 是否友善？

---

### 範例四：效能分析

```jsx
import React, { Profiler } from 'react';
import TodoList from './TodoList';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} ${phase} 耗時：${actualDuration.toFixed(2)}ms`);
}

export default function App() {
  return (
    <Profiler id="TodoList" onRender={onRenderCallback}>
      <TodoList />
    </Profiler>
  );
}
```

> **檢核點**：
>
> - 是否使用 Profiler 區隔並記錄核心元件耗時？
> - 是否定期檢視開發者工具數據？

---

## 總結

以上檢核清單涵蓋了從程式撰寫、元件切分，到效能分析與持續監控的各個面向。建議將此清單整合至 Pull Request 模板中，並在團隊中推廣效能優化文化。持續在日常開發中落實這些檢查，能確保應用在功能增長的同時仍保持流暢的使用者體驗，並降低潛在的性能退化風險。若需將本文轉為 Markdown、PDF 或 Notion 模板，歡迎隨時提出。

## 補充：React 效能優化 SOP 檢核清單

### 一、避免不必要的重新渲染

- [ ] 是否使用 `React.memo` 包裹純函式元件？
- [ ] 是否有使用 `useCallback` 記憶傳遞的函式 props？
- [ ] 是否有使用 `useMemo` 記憶計算結果，避免重複計算？
- [ ] 是否避免在 JSX 中直接宣告函式或物件（例如 inline style）？

---

### 二、State 管理與元件分離

- [ ] 是否將狀態下放至最小影響範圍的元件中？
- [ ] 是否避免使用不必要的 lifting state up？
- [ ] 是否將 UI 狀態（如開關、hover 狀態）與全域狀態分離？

---

### 三、Props 傳遞與結構優化

- [ ] 是否控制 props 深層傳遞導致的層層 re-render？
- [ ] 是否 props 結構穩定、可預期？（避免 object/array 每次都變）

---

### 四、渲染大量資料時的處理

- [ ] 是否針對長列表使用虛擬化工具（如 `react-window`, `react-virtualized`）？
- [ ] 是否有合理使用 `key`（且為穩定值，例如 id 而非 index）？

---

### 五、資源載入與 Code Splitting

- [ ] 是否使用 `React.lazy` + `Suspense` 實現元件懶載入？
- [ ] 是否進行 route-based code splitting（使用動態 import）？
- [ ] 是否有壓縮圖片、延遲圖片載入（lazy loading）？

---

### 六、效能監控與分析

- [ ] 是否使用 React DevTools Profiler 檢查 render 頻率與時間？
- [ ] 是否分析過 Lighthouse / Web Vitals 的效能指標？
- [ ] 是否檢查 Bundle Size（Webpack 分析工具、SourceMap Explorer 等）？

---

### 七、避免常見陷阱

- [ ] 是否避免每次 render 都新建匿名函式？
- [ ] 是否避免重複 render 同一資料來源？
- [ ] 是否避免過度依賴 context 導致全頁重 render？

---

### 八、開發階段優化習慣

- [ ] 是否將效能優化納入 Code Review 檢查點？
- [ ] 是否每個大型新元件都確認是否會引起不必要渲染？
- [ ] 是否測試過主流程在弱網或低效能設備上的表現？
