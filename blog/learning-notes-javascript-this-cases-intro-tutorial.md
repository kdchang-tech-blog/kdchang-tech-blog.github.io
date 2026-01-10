---
title: JavaScript 多事件處理綁定使用情境入門教學筆記 | 學習筆記
date: 2023-12-21 11:33:41
author: kdchang
tags: 
    - JavaScript
    - arrow function
    - this

---

# 前言
在 JavaScript 中，你可以通過事件處理的方式來為多個 `input` 元素綁定事件處理器。這樣做可以讓你在父容器上綁定一個事件處理器，並通過 `event.target` 確定觸發事件的具體 `input` 元素，而不需要為每個 `input` 元素單獨綁定事件。

### 事件委派的概念
事件委派是一種常見的事件處理技術，它將事件綁定到父元素或容器上，然後通過 `event.target` 來確定哪個子元素觸發了事件。這種方式在動態生成的元素中非常有用，因為無論多少個元素，它們都會使用相同的事件處理器。

### 例子：為多個 `input` 元素使用事件委派

假設有多個 `input` 元素，並且我們希望根據用戶在每個 `input` 中的輸入執行某些操作，可以像這樣使用 `event.target`：

```html
<div id="inputContainer">
  <input type="text" id="input1" />
  <input type="text" id="input2" />
  <input type="text" id="input3" />
</div>

<script>
  // 綁定事件處理器到父容器
  document.getElementById('inputContainer').addEventListener('input', function(event) {
    // 檢查事件目標是否為 input 元素
    if (event.target.tagName.toLowerCase() === 'input') {
      console.log('觸發的 input 元素 ID:', event.target.id);
      console.log('輸入的值:', event.target.value);
    }
  });
</script>
```

### 解釋：
1. 我們將 `input` 元素的 `input` 事件綁定到父容器 `#inputContainer` 上。
2. 當任何一個 `input` 元素觸發 `input` 事件時，事件會冒泡到父容器，並且事件處理器會被執行。
3. 在事件處理器中，我們使用 `event.target` 來確定是哪個 `input` 元素觸發了事件。`event.target` 會返回實際觸發事件的元素。
4. 通過 `event.target.id` 和 `event.target.value`，我們可以獲取觸發事件的 `input` 元素的 ID 和輸入的值。

### 優點：
- **減少事件綁定數量**：不需要為每個 `input` 元素單獨綁定事件，減少了冗餘代碼。
- **動態元素支持**：即使後來添加了新的 `input` 元素，父容器上的事件處理器也會自動處理新元素。

### 當 `input` 元素是動態創建時：
如果你有動態創建的 `input` 元素，事件委派依然有效，因為事件處理器是綁定在父容器上的，而不需要直接綁定在每個 `input` 元素上。

```javascript
// 假設需要動態創建 input 元素
const container = document.getElementById('inputContainer');

for (let i = 1; i <= 5; i++) {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'input' + i;
  container.appendChild(input);
}
```

這樣，當你動態創建新的 `input` 元素時，父容器上的事件處理器會自動處理這些新的 `input` 元素。