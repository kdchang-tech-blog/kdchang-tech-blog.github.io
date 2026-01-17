---
title: React Compound Component 模式介紹與入門教學 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - React
  - Compound
  - Compound Component
---

### 前言

在開發大型或複雜的 UI 元件時，傳統的 props 傳遞方式很容易導致元件層層嵌套、可讀性差與維護困難。Compound Component（複合元件）是一種設計模式，能提升 React 元件的可組合性與彈性。它讓父元件扮演「邏輯控制中心」的角色，子元件則能共享上下文資訊，專注於呈現。這種模式常見於設計系統或第三方 UI 套件（例如：`<Tabs>`、`<Accordion>`、`<Dropdown>` 等），能夠建立更清晰、有彈性的 API。

---

### 重點摘要

- **定義**：Compound Component 是一組彼此配合使用的 React 元件，透過共享上下文管理狀態與邏輯。
- **優點**：

  - 增強元件 API 的彈性與可擴充性。
  - 父元件集中邏輯，子元件只負責 UI。
  - 避免 props drilling，提升可維護性。

- **技術關鍵**：

  - 使用 `React.createContext()` 建立 Context。
  - 利用 `Children.map` 搭配 `cloneElement` 傳遞資料（進階用法）。
  - 常結合 `static property` 方式導出子元件（如 `MyComponent.Header`）。

- **常見應用場景**：

  - Tabs 分頁元件
  - Accordion 折疊面板
  - Dropdown 下拉選單
  - Modal 對話框元件

---

### 實際範例：建立一個自訂的 `<Toggle>` 元件

此範例展示如何實作一個 Compound Component：`<Toggle>`, `<Toggle.On>`, `<Toggle.Off>`, `<Toggle.Button>`

#### 1. ToggleContext.js

```tsx
import { createContext, useContext } from 'react';

const ToggleContext = createContext();

export function useToggleContext() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('Toggle compound components must be used within <Toggle />');
  }
  return context;
}

export default ToggleContext;
```

#### 2. Toggle.js

```tsx
import { useState } from 'react';
import ToggleContext from './ToggleContext';

export function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return <ToggleContext.Provider value={{ on, toggle }}>{children}</ToggleContext.Provider>;
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
};

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useToggleContext();
  return !on ? children : null;
};

Toggle.Button = function ToggleButton() {
  const { on, toggle } = useToggleContext();
  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
};
```

#### 3. App.js（使用方式）

```tsx
import { Toggle } from './Toggle';

export default function App() {
  return (
    <div>
      <h1>Compound Component 範例</h1>
      <Toggle>
        <Toggle.On>狀態為：開啟</Toggle.On>
        <Toggle.Off>狀態為：關閉</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    </div>
  );
}
```

---

### 延伸說明

- **Context 的角色**：`ToggleContext` 扮演資訊橋梁，讓所有子元件能共用 `on` 狀態與 `toggle` 函式。
- **錯誤處理**：`useToggleContext` 中若未包在 `<Toggle>` 裡使用，會主動拋出錯誤，提醒開發者正確使用上下文。
- **可擴充性**：我們可以進一步加入 `<Toggle.Icon>`、`<Toggle.Label>` 等元件，複用相同邏輯，保持一致行為。
- **比傳統 Props 傳遞更清晰**：使用 `<Toggle.On>` 等方式比 `showOn={true}` 更語意化且易於理解。

---

### 總結

Compound Component 是 React 開發中一個極具表達力與彈性的設計模式，尤其適用於 UI 元件庫的開發。透過 Context 的使用，我們能解耦邏輯與顯示元件，提升可讀性、可維護性與開發效率。雖然初期設計較為繁瑣，但一旦建立模式後，能帶來長遠效益，尤其在大型專案或多人協作的情境下更具價值。

---

### 延伸學習

- `React.cloneElement()` 的進階應用（自動注入 props）
- `TypeScript` 搭配 Compound Component 的型別設計
- 使用 Zustand、Jotai 或 Redux 搭配 Compound Component
