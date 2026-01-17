---
title: JSX 入門教學筆記 | 學習筆記
date: 2024-12-14 02:23:41
authors: kdchang
tags: 
    - JSX
    - react

---

## 1. JSX 是什麼？
JSX（JavaScript XML）是一種語法擴展，主要用於 React 函式庫中，它允許在 JavaScript 代碼中撰寫類似 HTML 的語法，使 UI 組件的編寫更加直觀。JSX 並非原生 JavaScript，需要透過 Babel 轉譯成標準 JavaScript 代碼。

## 2. 為什麼使用 JSX？
JSX 提供了一種更加可讀、直觀的方式來描述 UI 結構，相比於傳統的 JavaScript DOM 操作，它更簡潔易懂。此外，JSX 具備以下優勢：

- **可讀性高**：類似 HTML 的語法使 UI 組件結構清晰。
- **與 JavaScript 無縫結合**：可在 JSX 中嵌入 JavaScript 表達式。
- **更安全**：React 會自動處理 XSS（跨站腳本攻擊），確保數據安全。
- **高效渲染**：React 使用虛擬 DOM 最小化真實 DOM 更新，提高性能。

## 3. 基本語法

### 3.1 基本範例
JSX 允許我們在 JavaScript 代碼中使用類似 HTML 的語法來描述 UI：

```javascript
const element = <h1>Hello, JSX!</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### 3.2 JSX 中的 JavaScript 表達式
JSX 允許在 `{}` 中插入 JavaScript 表達式，例如變數、函式調用等。

```javascript
const name = "Alice";
const element = <h1>Hello, {name}!</h1>;
```

### 3.3 JSX 屬性
JSX 屬性與 HTML 類似，但有些屬性名稱需使用 camelCase，例如 `className` 取代 `class`，`htmlFor` 取代 `for`。

```javascript
const element = <input type="text" placeholder="輸入文字" className="input-box" />;
```

### 3.4 JSX 內聯樣式
內聯樣式需使用 JavaScript 對象，且屬性名稱為 camelCase。

```javascript
const style = { color: 'blue', fontSize: '20px' };
const element = <p style={style}>這是一段藍色文字</p>;
```

## 4. JSX 中的條件與循環

### 4.1 條件渲染（if...else）
JSX 本身不支援 `if...else`，需使用三元運算子或變數。

```javascript
const isLoggedIn = true;
const element = isLoggedIn ? <h1>歡迎回來！</h1> : <h1>請登入</h1>;
```

### 4.2 使用 && 運算符

```javascript
const messages = ['新訊息1', '新訊息2'];
const element = (
  <div>
    {messages.length > 0 && <p>你有 {messages.length} 則未讀訊息。</p>}
  </div>
);
```

### 4.3 迴圈渲染（map）
JSX 可透過 `map` 方法來動態渲染列表。

```javascript
const list = ['Apple', 'Banana', 'Cherry'];
const element = (
  <ul>
    {list.map((item, index) => <li key={index}>{item}</li>)}
  </ul>
);
```

## 5. JSX 與 React 組件
JSX 可與 React 組件結合使用，提升 UI 開發的模組化程度。

### 5.1 函式型組件

```javascript
function Welcome(props) {
  return <h1>你好，{props.name}！</h1>;
}

const element = <Welcome name="小明" />;
ReactDOM.render(element, document.getElementById('root'));
```

### 5.2 類別型組件

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>你好，{this.props.name}！</h1>;
  }
}

const element = <Welcome name="小明" />;
ReactDOM.render(element, document.getElementById('root'));
```

## 6. 總結
JSX 是 React 開發的重要語法，它能夠讓 UI 描述更加直觀，並與 JavaScript 無縫整合。透過學習 JSX，我們可以更高效地撰寫可重用的 React 組件，提高開發效率。

