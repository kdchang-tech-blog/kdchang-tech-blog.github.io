---
title: CSS transition 入門教學筆記 | 學習筆記
date: 2022-12-14 02:23:41
authors: kdchang
tags: 
    - html
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - transition
    - css

---

## 前言
CSS `transition` 屬性允許元素在狀態變化時產生平滑的動畫效果，使 UI 更加流暢和自然。這項技術通常應用於按鈕、圖片、卡片等 UI 元素的互動效果，如懸停、點擊或狀態變更。

## 1. `transition` 基礎概念

CSS `transition` 屬性用於定義當元素的某些 CSS 屬性發生變化時，該變化應如何逐漸呈現，而非立即改變。基本語法如下：

```css
transition: property duration timing-function delay;
```

- `property`：指定要應用過渡效果的 CSS 屬性。
- `duration`：設定過渡動畫的時間（如 `0.5s`、`200ms`）。
- `timing-function`：定義動畫的速度曲線（如 `ease`、`linear`）。
- `delay`：動畫開始前的延遲時間（可選，默認為 `0s`）。

## 2. `transition` 常見應用

### 2.1 過渡單一屬性

```css
.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: darkblue;
}
```

當滑鼠懸停在 `.button` 上時，背景顏色將在 `0.3s` 內從 `blue` 變為 `darkblue`。

### 2.2 過渡多個屬性

```css
.card {
    width: 200px;
    height: 300px;
    background-color: lightgray;
    transform: scale(1);
    transition: background-color 0.3s ease, transform 0.5s ease-in-out;
}

.card:hover {
    background-color: gray;
    transform: scale(1.1);
}
```

當滑鼠懸停時，`.card` 的背景顏色會變深，並且整個卡片會放大 `1.1` 倍。

## 3. `transition` 進階應用

### 3.1 `transition-timing-function`（動畫速度曲線）

`timing-function` 用於定義動畫的速度變化方式，常見的值如下：

- `linear`：等速變化。
- `ease`（預設值）：開始與結束較慢，中間較快。
- `ease-in`：開始較慢，之後加速。
- `ease-out`：開始較快，最後減速。
- `ease-in-out`：開始和結束都較慢。

範例：

```css
.box {
    width: 100px;
    height: 100px;
    background-color: red;
    transition: transform 1s ease-in-out;
}

.box:hover {
    transform: translateX(200px);
}
```

當滑鼠懸停時，`.box` 會平滑地向右移動 `200px`，並且動畫在開始和結束時較慢。

### 3.2 `transition-delay`（延遲時間）

可以設定 `transition-delay` 來延遲動畫的開始時間。

```css
.box {
    width: 100px;
    height: 100px;
    background-color: green;
    transition: background-color 0.5s ease-in 1s;
}

.box:hover {
    background-color: darkgreen;
}
```

當滑鼠懸停時，`background-color` 會延遲 `1s` 後才開始變化。

## 4. `transition` 實際應用範例

### 4.1 按鈕的點擊效果

```css
.button {
    padding: 12px 24px;
    background-color: #ff5733;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease-out;
}

.button:active {
    transform: scale(0.95);
}
```

當按下 `.button` 時，按鈕會稍微縮小，產生按壓感。

### 4.2 漸變顯示效果

```css
.fade-box {
    width: 100px;
    height: 100px;
    background-color: blue;
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.fade-box.show {
    opacity: 1;
}
```

當 `.show` 類別被添加時，`.fade-box` 會在 `1s` 內逐漸顯示。

### 4.3 圖片放大效果

```css
.image-container img {
    width: 100px;
    transition: width 0.3s ease-in-out;
}

.image-container:hover img {
    width: 150px;
}
```

當滑鼠懸停時，圖片會平滑地放大。

## 5. `transition` vs `animation`

雖然 `transition` 和 `animation` 都能用來製作動畫，但它們的用途不同：

- **`transition`**：適合用於元素的狀態變更（如 `hover`、`focus`）。
- **`animation`**：適用於更複雜的動畫，如連續循環的動畫。

如果需要更高級的動畫，例如無限重複、按時間順序變化的動畫，則應使用 `@keyframes` 和 `animation`。

## 6. 總結

CSS `transition` 是製作動畫效果最簡單且高效的方法之一。透過 `transition`，可以讓 UI 更加生動，使使用者體驗更流暢。掌握 `transition` 的基本語法與進階應用後，可以靈活運用於各種互動效果，如按鈕動畫、圖片過渡、淡入淡出等，讓網頁更加吸引人。

