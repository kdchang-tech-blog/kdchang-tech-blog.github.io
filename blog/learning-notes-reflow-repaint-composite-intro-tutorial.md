---
title: 瀏覽器渲染優化入門：掌握重繪、重排與合成的效能關鍵 | 學習筆記
date: 2024-02-20 11:33:41
authors: kdchang
tags:
  - 瀏覽器渲染
  - Reflow
  - Repaint
  - Composite
---

## 前言

在現代前端開發中，良好的使用者體驗不僅來自功能與介面設計，更仰賴流暢的渲染效能。網頁在瀏覽器中的呈現涉及一連串複雜的渲染步驟，包含樣式計算、排版、繪製與合成。當我們操作 DOM、修改樣式或觸發動畫時，都可能影響這些渲染流程。如果不了解這些背後的機制，很容易造成畫面卡頓與效能瓶頸。

本篇筆記將介紹瀏覽器渲染的三大核心階段：**重排（Reflow）**、**重繪（Repaint）**與**合成（Composite）**，並透過實際範例說明如何避免過度重排與重繪，提升整體效能。

---

## 重點摘要

- **渲染流程**：瀏覽器的渲染過程包括 DOM 構建、樣式計算、布局（Reflow）、繪製（Repaint）與合成（Composite）。
- **Reflow（重排）**：

  - 代表重新計算元素的尺寸與位置。
  - 會影響該元素及其子元素，成本高昂。

- **Repaint（重繪）**：

  - 改變元素的外觀但不影響佈局（如背景色、文字顏色）。
  - 相對比重排便宜，但仍需耗費資源。

- **Composite（合成）**：

  - 將繪製後的圖層合成為畫面。
  - 常與硬體加速 GPU 合作完成，成本最低。

- **優化原則**：

  - 減少 DOM 操作與樣式更動次數。
  - 使用 will-change、transform、opacity 等屬性觸發 GPU 合成。
  - 避免觸發同步 reflow（如讀寫 offsetHeight 混用）。
  - 使用 requestAnimationFrame 取代 setInterval 管理動畫。

---

## 實際範例

### 1. **重排（Reflow）觸發範例**

```html
<div id="box" style="width: 100px; height: 100px; background-color: blue;"></div>

<script>
  const box = document.getElementById('box');
  box.style.width = '200px'; // 觸發 reflow：尺寸改變
</script>
```

這段程式碼會導致重新計算佈局，因為改變了 box 的寬度。若該元素還包含其他內嵌元素，也會一併重新計算，對效能影響較大。

### 2. **重繪（Repaint）觸發範例**

```javascript
box.style.backgroundColor = 'red'; // 觸發 repaint：外觀改變但位置不變
```

這只會重新繪製背景色，不涉及位置與尺寸的計算，因此比重排快一些，但仍需資源。

### 3. **合成層（Composite Layer）優化範例**

```css
#box {
  will-change: transform;
}
```

```javascript
box.style.transform = 'translateX(100px)';
```

使用 `transform` 搭配 `will-change` 可以避免 reflow 與 repaint，直接由 GPU 處理合成層的位移，對效能非常有幫助，適合用於動畫或互動操作。

### 4. **錯誤的讀寫順序導致多次重排**

```javascript
const box = document.getElementById('box');

// 壞寫法：不當的交錯讀寫
box.style.width = '300px';
const height = box.offsetHeight; // 強制同步計算 reflow
box.style.height = height + 10 + 'px';
```

這段程式碼會導致瀏覽器為了提供最新的 `offsetHeight`，先強制執行一次 reflow，然後再處理 `style.height` 的設定，又引發一次 reflow。解法如下：

```javascript
// 好寫法：集中寫入，延後讀取
box.style.width = '300px';
requestAnimationFrame(() => {
  const height = box.offsetHeight;
  box.style.height = height + 10 + 'px';
});
```

這樣可以將樣式修改與讀取解耦，避免過度同步重排。

---

## 常見優化建議

1. **避免頻繁操作 DOM**

   - 將多次操作集中處理，例如使用 `documentFragment` 或暫時隱藏元素再更新。

2. **善用 CSS 動畫與硬體加速**

   - 使用 `transform` 與 `opacity` 搭配 `will-change` 避免重排。

3. **使用 requestAnimationFrame 控制動畫節奏**

   - 與瀏覽器畫面更新同步，避免畫面撕裂與卡頓。

4. **減少強制同步 reflow 操作**

   - 避免混用讀寫，例如同時使用 `offsetTop` 與 `style.left`。

5. **審慎使用大型影響範圍的樣式變更**

   - 例如更動 `<body>` padding 可能導致整頁重排。

---

## 總結

掌握瀏覽器的渲染流程，是優化前端效能的基礎功。過度重排與重繪是畫面卡頓與耗電的主因，而合成則是成本最低的操作。了解並合理運用這三者，才能打造真正流暢、回應迅速的使用體驗。

作為開發者，我們應從 DOM 操作、CSS 寫法到動畫設計，全面考量渲染機制對效能的影響。透過實踐優化策略，讓產品在各種裝置上都能展現卓越表現。

若我們需要進一步探索，可研究 Chrome DevTools 的「Performance」面板，實際觀察每次重排與重繪的開銷，進一步精細調整效能瓶頸。
