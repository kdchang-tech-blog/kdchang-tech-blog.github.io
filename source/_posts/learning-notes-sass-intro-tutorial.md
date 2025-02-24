---
title: SASS 語法介紹入門教學筆記 | 學習筆記
date: 2024-07-01 02:23:41
author: kdchang
tags: 
    - SASS
    - SCSS
    - CSS

---

# 什麼是 SASS？

`SASS`（Syntactically Awesome Style Sheets）是一種 CSS 預處理器，旨在提升 CSS 的功能性，讓開發者能夠以更加靈活和高效的方式編寫樣式表。它提供了許多比 CSS 更強大的功能，例如變數、巢狀規則、混合（mixins）、繼承等。SASS 語法有兩種主要形式：一種是較為常見的 SCSS（`Sassy CSS`），另一種則是 `SASS`，本文將主要介紹 SASS 語法。

與 SCSS 不同，SASS 語法採用的是縮排語法，即不使用大括號和分號，而是利用縮排來結構化程式碼。這種語法更簡潔，對於習慣 Python 等語言的開發者來說，學習曲線較為平滑。

# 安裝與設置

要開始使用 SASS，首先需要安裝 SASS 編譯器。最常見的安裝方式是透過 Node.js 的 npm（Node Package Manager）。請按照以下步驟進行安裝：

1. 確保已經安裝了 Node.js 和 npm。
2. 打開終端機，並在專案資料夾中執行以下命令來安裝 SASS：

   ```
   npm install -g sass
   ```

3. 安裝完成後，可以通過命令行執行 SASS 編譯命令：

   ```
   sass input.sass output.css
   ```

這樣，`input.sass` 就會被編譯為標準的 `output.css` 檔案。

# SASS 語法介紹

### 1. 變數（Variables）

SASS 的變數功能讓開發者可以將顏色、字體大小、間距等常用值儲存在變數中，這樣能夠提高樣式的可重用性，並讓程式碼更具維護性。在 SASS 中，變數以 `$` 符號開頭。

```sass
$primary-color: #3498db
$font-size: 16px

body
  font-size: $font-size
  color: $primary-color
```

在這段程式碼中，我們定義了 `$primary-color` 和 `$font-size` 兩個變數，並將其應用於 `body` 樣式中。這樣，只需要修改變數的值，即可全局更新相應的樣式。

### 2. 巢狀規則（Nesting）

SASS 支援巢狀規則，這樣可以讓樣式更加結構化，並且簡化對於子元素樣式的編寫。SASS 使用縮排來表示層級關係，這一點與傳統的 CSS 需要寫出完整選擇器有所不同。

```sass
nav
  background-color: #333
  ul
    list-style-type: none
    padding: 0
  li
    display: inline-block
  a
    color: white
    text-decoration: none
```

這段程式碼會被編譯為：

```css
nav {
  background-color: #333;
}
nav ul {
  list-style-type: none;
  padding: 0;
}
nav li {
  display: inline-block;
}
nav a {
  color: white;
  text-decoration: none;
}
```

這樣的寫法可以避免寫重複的選擇器，並且清晰地表現出元素之間的層級結構。

### 3. 混合（Mixins）

混合是 SASS 中一個非常有用的功能，它可以將一段可重用的樣式封裝成一個混合，並且可以接受參數，實現樣式的動態應用。混合類似於函數，能夠在不同地方重複使用。

```sass
=mixin border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius: $radius
  border-radius: $radius

.box
  @include border-radius(10px)
```

在這段程式碼中，我們定義了一個名為 `border-radius` 的混合，接受一個 `$radius` 參數，用來設置元素的邊框圓角。然後，我們在 `.box` 中使用 `@include` 引入這個混合，並傳遞具體的參數。這樣，當需要改變邊框圓角的樣式時，只需要修改混合的參數，而不需要在多個地方重複編寫。

### 4. 繼承（Inheritance）

SASS 提供了繼承功能，使得一個選擇器可以繼承另一個選擇器的樣式。這有助於減少樣式重複，並保持程式碼的整潔性。SASS 使用 `@extend` 指令來實現繼承。

```sass
%button-base
  padding: 10px 15px
  background-color: #3498db
  color: white
  border: none
  border-radius: 5px

.button-primary
  @extend %button-base
  background-color: #1abc9c

.button-secondary
  @extend %button-base
  background-color: #f39c12
```

在這段程式碼中，我們定義了一個 `%button-base` 共享樣式，然後讓 `.button-primary` 和 `.button-secondary` 繼承這些樣式，並根據需要進行自定義修改。使用繼承的方式可以減少代碼重複，提高樣式的可維護性。

### 5. 條件語句（Conditionals）

SASS 支援條件語句，這讓我們可以根據某些條件選擇性地應用不同的樣式。這樣可以使樣式表更具動態性，根據不同情境調整顯示效果。

```sass
$theme: light

body
  @if $theme == light
    background-color: #fff
    color: #333
  @else
    background-color: #333
    color: #fff
```

這段程式碼中，根據變數 `$theme` 的值，條件地設定 `body` 的背景顏色和文字顏色。如果 `$theme` 為 `light`，則使用淺色背景和深色文字；否則，使用深色背景和淺色文字。

### 6. 循環（Loops）

SASS 還支援循環語句，這在需要根據某些條件自動生成多個樣式時非常有用。SASS 的循環可以遍歷一個列表，並生成對應的樣式。

```sass
$colors: red, green, blue

@each $color in $colors
  .#{$color}-box
    background-color: $color
```

在這段程式碼中，`@each` 循環將遍歷 `$colors` 列表，並為每個顏色生成一個相應的類別 `.red-box`、`.green-box` 和 `.blue-box`，並將其背景顏色設置為對應的顏色。

# 總結

SASS 的 SASS 語法是一種簡潔且強大的 CSS 編寫方式，通過簡單的縮排結構，讓開發者能夠更有效率地編寫和維護樣式。SASS 提供的變數、巢狀規則、混合、繼承等功能，能夠使樣式更加模組化、動態化，並大大減少冗餘代碼。學會 SASS 語法後，你可以更靈活地處理大型專案中的 CSS，提升工作效率。如果你還沒有開始使用 SASS，不妨從這些基礎語法開始，體驗它帶來的便利。