---
title: 滾動視差（Parallax Scrolling）網頁設計入門教學筆記 | 學習筆記
date: 2024-12-04 02:23:41
authors: kdchang
tags: 
    - typescript
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - frontend engineer
    - CSS

---

# 一、什麼是滾動視差？  

滾動視差（`Parallax Scrolling`）是一種前端網頁設計技術，透過不同層的背景與內容以不同的速度滾動，營造出立體感與動態視覺效果。這種技術常見於品牌網站、產品介紹頁面或作品展示頁面，能有效提升使用者的沉浸感與互動體驗。  

### 滾動視差的視覺效果  

1. **背景與內容滾動速率不同**：背景滾動速度較慢，前景滾動速度較快，模擬景深效果。  
2. **多層次視覺變化**：不同層的元素可以有獨立的滾動行為，增加動態感。  
3. **創造故事性**：透過滾動觸發不同場景，讓使用者體驗連貫的視覺敘事。  

---

# 二、滾動視差的基本實作  

### 1. 使用純 CSS 來製作滾動視差  

CSS 提供了 `background-attachment: fixed;` 屬性，可以讓背景圖像保持固定位置，而前景內容繼續滾動，營造簡單的滾動視差效果。  

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>滾動視差示例</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        .parallax {
            background-image: url('parallax-background.jpg');
            height: 100vh;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .content {
            height: 500px;
            background-color: white;
            text-align: center;
            padding: 50px;
        }
    </style>
</head>
<body>

    <div class="parallax"></div>

    <div class="content">
        <h2>滾動視差示例</h2>
        <p>這是一個簡單的滾動視差網頁，背景固定不動，前景內容滾動。</p>
    </div>

    <div class="parallax"></div>

</body>
</html>
```

這種方式雖然簡單，但無法實現更複雜的視差動畫效果。如果想要更進階的效果，通常需要搭配 JavaScript 或 CSS 變形（Transform）。

---

### 2. 使用 CSS `transform` 來實現滾動視差  

透過 `transform: translateZ()` 搭配 `perspective()`，可以製造出更立體的視差效果。  

```css
.parallax-container {
    perspective: 1px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
}

.parallax-layer {
    position: absolute;
    width: 100%;
    transform: translateZ(-1px) scale(2);
}
```

這種方式可以讓不同層的元素有不同的滾動速率，達到更細緻的視覺效果。

---

# 三、使用 JavaScript 製作更靈活的滾動視差  

雖然純 CSS 可以實現基本視差效果，但若要控制不同層級的滾動速度，或者添加額外動畫效果，就需要 JavaScript。  

### 1. 簡單的 JavaScript 滾動視差  

使用 `window.scrollY` 來控制元素的 `transform` 屬性，使其隨滾動變化。  

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript 滾動視差</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .parallax {
            position: relative;
            height: 100vh;
            overflow: hidden;
            background: url('parallax-background.jpg') center/cover no-repeat;
        }
        .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            color: white;
        }
    </style>
</head>
<body>

    <div class="parallax">
        <div class="text">滾動視差效果</div>
    </div>

    <script>
        window.addEventListener('scroll', function() {
            let scrollPosition = window.scrollY;
            document.querySelector('.parallax').style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    </script>

</body>
</html>
```

在這個範例中，我們透過 JavaScript 讓背景圖片根據滾動位置改變 `backgroundPositionY`，從而達成視差效果。

---

### 2. 使用第三方函式庫（如 ScrollMagic）  

如果想要更進階的視差效果，可以使用 `ScrollMagic` 這類 JavaScript 函式庫，來更精確地控制滾動動畫。  

首先安裝 ScrollMagic：  

```sh
npm install scrollmagic
```

然後在 JavaScript 中設定滾動觸發點：  

```js
let controller = new ScrollMagic.Controller();
let scene = new ScrollMagic.Scene({
    triggerElement: '.parallax',
    duration: '100%',
    triggerHook: 0
})
.setTween('.parallax', { y: '50%', ease: Linear.easeNone })
.addTo(controller);
```

這樣可以讓 `.parallax` 元素在滾動時逐漸移動，達成視差效果。

---

# 四、滾動視差的應用場景  

滾動視差可以應用於許多不同類型的網站，例如：  

1. **品牌網站**：用來展示產品特性與公司理念，提高視覺吸引力。  
2. **作品集網站**：適合攝影師、設計師，讓內容更具層次感。  
3. **故事敘述頁面**：用來製作互動式故事，讓用戶在滾動中探索內容。  
4. **促銷與行銷頁面**：讓特定區塊在滾動時突出，吸引目光。  

---

# 五、滾動視差的優勢與缺點  

### 優勢  

- 增強視覺吸引力，使網站更具互動性。  
- 可提升品牌形象，讓內容更具故事性。  
- 創造更流暢的使用者體驗，增加網站的停留時間。  

### 缺點  

- 過多視差效果可能會影響效能，導致頁面滾動不流暢。  
- 可能對行動裝置不友善，需要額外的優化。  
- 過度使用可能會影響可讀性，降低使用者體驗。  

---

# 六、結論  

滾動視差是一種有效提升網站視覺吸引力的技術，適用於品牌展示、作品集與故事敘述類型的網站。透過 CSS 的 `background-attachment`，JavaScript 的 `scrollY`，或是使用函式庫如 `ScrollMagic`，都能實現不同程度的視差效果。  

然而，使用時需注意效能與可讀性，確保不會影響使用者體驗。在實作時，建議先從簡單的 CSS 視差效果開始，逐步引入 JavaScript 或函式庫，根據需求選擇最佳實作方式。