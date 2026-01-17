---
title: CSS transform 入門教學筆記 | 學習筆記
date: 2021-12-14 02:23:41
authors: kdchang
tags: 
    - html
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - transform
    - css

---

## 前言
CSS `transform` 屬性是一個強大的工具，可以用來對 HTML 元素進行旋轉、縮放、移動及傾斜等變換，而不會影響其他元素的佈局。這使得 `transform` 非常適合用來建立動畫效果、視覺調整以及 UI 微調。

## 1. `transform` 基礎概念

`transform` 屬性可以接受一個或多個變換函數，使元素在不影響文檔流的情況下進行變換。這些變換主要包含：
- **平移 (translate)**
- **縮放 (scale)**
- **旋轉 (rotate)**
- **傾斜 (skew)**
- **矩陣變換 (matrix)**

## 2. `transform` 常見屬性

### 2.1 平移 (`translate`)
`translate(x, y)` 用於移動元素的 X 軸與 Y 軸位置。

```css
.box {
    transform: translate(50px, 100px);
}
```

此範例將 `.box` 元素向右移動 50px，向下移動 100px。

#### 單軸平移
- `translateX(50px)`：僅在 X 軸移動 50px。
- `translateY(100px)`：僅在 Y 軸移動 100px。

### 2.2 縮放 (`scale`)
`scale(x, y)` 用於縮放元素。

```css
.box {
    transform: scale(1.5, 0.5);
}
```
此範例將 `.box` 元素的寬度放大 1.5 倍，高度縮小為原來的一半。

#### 單軸縮放
- `scaleX(2)`：寬度變為 2 倍。
- `scaleY(0.5)`：高度變為 0.5 倍。

### 2.3 旋轉 (`rotate`)
`rotate(angle)` 用於旋轉元素。

```css
.box {
    transform: rotate(45deg);
}
```
此範例將 `.box` 元素順時針旋轉 45 度。

### 2.4 傾斜 (`skew`)
`skew(x-angle, y-angle)` 用於使元素傾斜。

```css
.box {
    transform: skew(30deg, 10deg);
}
```
此範例將 `.box` 在 X 軸方向傾斜 30 度，在 Y 軸方向傾斜 10 度。

#### 單軸傾斜
- `skewX(15deg)`：僅在 X 軸傾斜 15 度。
- `skewY(25deg)`：僅在 Y 軸傾斜 25 度。

### 2.5 矩陣變換 (`matrix`)
`matrix(a, b, c, d, e, f)` 是一個綜合性變換函數，允許透過 6 個參數來同時應用縮放、旋轉、傾斜與位移。

```css
.box {
    transform: matrix(1, 0.5, 0.5, 1, 50, 100);
}
```
這樣的矩陣表示：
- `1`：X 軸縮放。
- `0.5`：X 軸傾斜。
- `0.5`：Y 軸傾斜。
- `1`：Y 軸縮放。
- `50`：X 軸位移。
- `100`：Y 軸位移。

## 3. `transform` 的應用範例

### 3.1 建立簡單的 hover 效果
利用 `transform`，可以輕鬆製作滑鼠懸停的動畫效果，例如按鈕放大效果：

```css
.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-align: center;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
}

.button:hover {
    transform: scale(1.1);
}
```

### 3.2 圖片翻轉效果
使用 `rotateY(180deg)` 來製作翻轉效果，常用於卡片翻轉動畫。

```css
.card {
    width: 200px;
    height: 300px;
    background-color: lightgray;
    transform: rotateY(0deg);
    transition: transform 0.5s;
}

.card:hover {
    transform: rotateY(180deg);
}
```

### 3.3 旋轉動畫
結合 `@keyframes` 和 `transform`，可以製作無限旋轉動畫。

```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
    animation: spin 2s linear infinite;
}
```

## 4. `transform-origin` 的應用
`transform-origin` 屬性用於指定變換的基準點，預設值為 `50% 50%`（元素中心）。

```css
.box {
    transform-origin: top left;
    transform: rotate(45deg);
}
```

此範例中，元素將以左上角為旋轉點，而非默認的中心點。

## 5. `perspective` 與 3D 變換
當使用 3D 變換（如 `rotateX`、`rotateY`）時，可使用 `perspective` 來模擬景深效果。

```css
.container {
    perspective: 500px;
}

.box {
    transform: rotateY(45deg);
}
```
此範例讓 `.box` 具有 3D 透視效果，使其看起來更真實。

## 6. 總結
CSS `transform` 是一個靈活且強大的屬性，可以用來製作動畫、視覺調整及增強 UI 體驗。透過 `translate`、`scale`、`rotate`、`skew` 等函數，你可以輕鬆地操控元素的外觀，讓你的網頁更具吸引力。

