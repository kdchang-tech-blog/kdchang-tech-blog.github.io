---
title: 使用 React Router 實現多頁面導覽功能教學（React Router v6）入門教學 | w3schools 學習筆記
date: 2024-01-12 11:33:41
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

React 是一個強大的 JavaScript 函式庫，專門用於建立使用者介面。不過，React 本身並未內建「頁面路由」功能。如果你想要為你的 React 專案加入多個頁面，例如首頁、部落格、聯絡我們頁面等等，就必須引入額外的工具。而在眾多路由解決方案中，**React Router** 是最受歡迎且廣泛使用的選擇。

本文將帶你從零開始，教你如何在使用 Create React App 建立的專案中導入 React Router，並建立一個基本的多頁面架構。

---

### 重點摘要

- **React 本身不包含頁面路由功能**
- **React Router 是 React 中最常用的路由套件**
- **React Router v6 是目前最新的主要版本**
- **需安裝 `react-router-dom` 套件來使用瀏覽器路由功能**
- **使用 `<BrowserRouter>`, `<Routes>`, `<Route>` 建立路由結構**
- **使用 `<Outlet>` 顯示巢狀路由對應的內容**
- **使用 `<Link>` 而非 `<a>` 進行頁面內部連結**

---

### 安裝 React Router

在你的 React 專案根目錄下，打開終端機，執行以下指令安裝 React Router：

```bash
npm i -D react-router-dom
```

如果你是從 React Router v5 升級，建議加入 `@latest` 旗標：

```bash
npm i -D react-router-dom@latest
```

---

### 建立頁面資料夾與基本結構

為了建立多頁面應用，我們需要在 `src` 資料夾中新增一個 `pages` 資料夾，並在其中建立五個頁面元件：

```
src/pages/
├── Layout.js
├── Home.js
├── Blogs.js
├── Contact.js
└── NoPage.js
```

每個檔案都將包含一個簡單的 React 函式元件。

---

### 設定主路由（index.js）

在 `src/index.js` 中引入路由模組與頁面元件，並建立應用程式主結構：

```js
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

### 說明範例運作原理

- **`<BrowserRouter>`**：外層包住整個路由結構，提供瀏覽器路由功能。
- **`<Routes>` 與 `<Route>`**：定義所有路由規則與對應的元件。
- **巢狀 `<Route>`**：`Layout` 元件作為共同外框，其下包含巢狀頁面路由。
- **`<Route index>`**：定義 `/` 路徑的預設頁面為 `Home`。
- **`<Route path="*">`**：匹配所有未定義的網址，用於顯示 404 頁面。

---

### 建立頁面元件

#### Layout.js（共享頁面結構）

```js
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
```

- 使用 `<Link>` 元素建立頁面間的連結。
- `<Outlet>` 負責渲染目前選中的頁面內容。

#### Home.js

```js
const Home = () => {
  return <h1>Home</h1>;
};

export default Home;
```

#### Blogs.js

```js
const Blogs = () => {
  return <h1>Blog Articles</h1>;
};

export default Blogs;
```

#### Contact.js

```js
const Contact = () => {
  return <h1>Contact Me</h1>;
};

export default Contact;
```

#### NoPage.js（404 頁面）

```js
const NoPage = () => {
  return <h1>404</h1>;
};

export default NoPage;
```

---

### 總結

透過 React Router，我們可以很輕鬆地為 React 應用程式建立一個多頁面的瀏覽體驗。本篇教學展示了如何安裝 React Router、建立路由結構、撰寫頁面元件，並結合 `<Outlet>` 與 `<Link>` 實現共用頁面框架與路由切換。這只是入門，React Router v6 還支援更多進階功能，例如動態路由、路由守衛、路由參數等，適合進一步探索使用。

## 參考文件

1. [React Custom Hooks](https://www.w3schools.com/react/react_customhooks.asp)
2. [React router 官方網站](https://reactrouter.com/)
