---
title: Emotion CSS 入門教學筆記 | 學習筆記
date: 2024-12-01 02:23:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - CSS
    - Emotion CSS
    - styled

---

## 1. Emotion CSS 簡介

Emotion 是一款強大的 CSS-in-JS 解決方案，提供高效能且靈活的樣式管理方式，適用於 React 應用。Emotion 支援兩種主要的使用方式：

1. **CSS Prop**（使用 JSX 內嵌樣式）
2. **styled API**（使用 `styled` 函式創建元件）

## 2. 安裝 Emotion

使用 npm 或 yarn 安裝 Emotion 核心套件：

```sh
npm install @emotion/react @emotion/styled
```

如果專案使用 Babel，建議安裝 Emotion 的 Babel 插件來提高效能：

```sh
npm install --save-dev @emotion/babel-plugin
```

並在 `.babelrc` 中添加：

```json
{
  "plugins": ["@emotion"]
}
```

## 3. CSS Prop 用法

CSS Prop 允許你直接在 JSX 中定義 CSS 樣式。

### 基本範例

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const style = css`
  background-color: lightblue;
  padding: 20px;
  border-radius: 8px;
`;

function App() {
  return <div css={style}>Hello, Emotion!</div>;
}

export default App;
```

### 傳遞 props 變更樣式

```jsx
const dynamicStyle = (color) => css`
  background-color: ${color};
  padding: 20px;
  border-radius: 8px;
`;

function App({ color = 'lightblue' }) {
  return <div css={dynamicStyle(color)}>Dynamic Emotion</div>;
}
```

## 4. styled API 用法

`styled` API 讓我們能夠創建具備 CSS 樣式的 React 元件。

### 基本範例

```jsx
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

function App() {
  return <Button>Click Me</Button>;
}

export default App;
```

### 傳遞 props 變更樣式

```jsx
const Button = styled.button`
  background-color: ${(props) => props.bg || '#3498db'};
  color: ${(props) => props.color || 'white'};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.bg ? darken(0.1, props.bg) : '#2980b9')};
  }
`;

function App() {
  return <Button bg="tomato">Custom Button</Button>;
}
```

## 5. 全域樣式與 Theme

### 使用 Global 樣式

```jsx
import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <div>Hello, Global Emotion!</div>
    </>
  );
}
```

### 使用 Theme

```jsx
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

const theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71'
  }
};

const ThemedButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedButton>Themed Button</ThemedButton>
    </ThemeProvider>
  );
}
```

## 6. 總結

Emotion 是一款靈活且高效的 CSS-in-JS 解決方案，適用於 React 應用。它提供 `css` prop 以及 `styled` API 來幫助開發者管理樣式，並支援全域樣式與主題設定。這篇教學筆記涵蓋了基礎概念與常見用法，希望對你的開發過程有所幫助。

