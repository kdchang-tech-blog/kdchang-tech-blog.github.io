---
title: React Hooks useReducer 入門教學 | w3schools 學習筆記
date: 2024-01-20 11:33:41
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

## 前言

在 React 中，`useState` 是管理狀態的基礎 Hook，但當應用的狀態邏輯越來越複雜，像是涉及多個欄位更新、交叉依賴或分支邏輯，使用 `useState` 可能變得難以維護。這時，React 提供的 `useReducer` Hook 是一個更合適的選擇。

`useReducer` 的概念與 Redux 類似，它讓你將狀態管理邏輯集中在一個 reducer 函式中，透過 `dispatch` 發送動作來更新狀態，使邏輯清晰、可維護性高，非常適合用於中型到大型的應用。

---

## 重點摘要

- `useReducer` 與 `useState` 類似，但更適合處理複雜邏輯或多狀態管理。
- 語法格式為：`const [state, dispatch] = useReducer(reducer, initialState)`
- `reducer` 是一個函式，根據傳入的 `action` 物件決定如何更新狀態。
- 所有狀態更新都透過 `dispatch(action)` 進行。
- 初始狀態 `initialState` 通常是物件或陣列。
- 適合用在：

  - 表單資料管理
  - Todo List 或清單類資料
  - 複雜的元件邏輯

---

## 實際範例：使用 useReducer 建立 Todo 狀態管理

以下範例展示如何透過 `useReducer` 管理一個 Todo List 的完成狀態切換邏輯。

```jsx
import { useReducer } from 'react';
import ReactDOM from 'react-dom/client';

// 初始狀態：包含兩個代辦事項
const initialTodos = [
  {
    id: 1,
    title: 'Todo 1',
    complete: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    complete: false,
  },
];

// reducer 函式：根據 action 決定如何更新狀態
const reducer = (state, action) => {
  switch (action.type) {
    case 'COMPLETE':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete }; // 切換完成狀態
        } else {
          return todo;
        }
      });
    default:
      return state; // 沒有匹配的 action 則回傳原狀態
  }
};

// 元件：顯示代辦事項清單
function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  // 處理 checkbox 切換
  const handleComplete = (todo) => {
    dispatch({ type: 'COMPLETE', id: todo.id });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.complete} onChange={() => handleComplete(todo)} />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
}

// 渲染應用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Todos />);
```

---

### 說明

- `initialTodos` 是初始狀態，為一個陣列，包含代辦事項的 `id`、`title` 與 `complete` 狀態。
- `reducer` 是一個純函式，根據傳入的 `action` 型別（此處為 `"COMPLETE"`）來更新對應的 todo 狀態。
- `dispatch` 是用來觸發 `reducer` 的函式，只要呼叫 `dispatch({ type: "COMPLETE", id: todo.id })`，就會依據 `id` 切換該 todo 的完成狀態。

---

## 延伸說明

上述範例僅實作了完成狀態的切換，但實務中 `useReducer` 更能發揮作用，因為你可以整合所有的 CRUD 操作邏輯於同一個 reducer 裡，例如：

```js
case "ADD":
  return [...state, newTodo];
case "DELETE":
  return state.filter(todo => todo.id !== action.id);
case "UPDATE":
  return state.map(todo => todo.id === action.id ? { ...todo, title: action.title } : todo);
```

這樣一來，整個應用的狀態更新都統一由 `reducer` 管理，讓邏輯集中且更容易除錯與擴充。

---

## 總結

`useReducer` 是 React 提供用來處理複雜狀態邏輯的重要工具。當你遇到以下情況時，建議考慮使用 `useReducer`：

- 多個狀態變數需要統一處理
- 狀態轉換邏輯複雜且重複
- 想將狀態管理從元件中抽離以提升可讀性

透過 `useReducer`，你可以實現更模組化、可維護的應用狀態邏輯，使開發效率更高、錯誤更少。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
