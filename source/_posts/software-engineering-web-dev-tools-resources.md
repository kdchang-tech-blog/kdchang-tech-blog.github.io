---
title: 常見軟體工程師/網頁開發工具和學習資源整理
date: 2024-03-22 11:33:41
author: kdchang
tags:
  - Frontend Roadmap
  - Software Engineer
  - Software Engineering
  - 前端工程師
  - 前端工程
  - 網頁開發
  - 網站開發
  - 網站開發工具
  - 學習資源
  - 軟體工程
  - 軟體工程師
  - Web
---

以下彙整常見 Web 網頁開發工具和資源整理：

## VS Code 套件

1. emmet
2. Live Server
3. Material Icon Theme
4. Babel JavaScript
5. Prettier
6. CodeSnap
7. JavaScript code snippets
8. Peacock
9. TODO Highlight
10. Code Runner
11. Live Share
12. Color Highlight

## Chrome 瀏覽器擴充套件

1. Responsive Viewer
2. HTML5 Outliner
3. ColorZilla
4. Fonts Ninja
5. Check My Links

## 終端機工具

1. [ohmyzsh Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)
2. [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

(1). Terminal App：iTerm2
網站：https://iterm2.com

(2). Shell：zsh（macOS 預設就是 zsh）
macOS Catalina 之後預設就是 zsh，不用特別安裝
比 bash 現代，有 plugin & theme 支援

(3). Framework：Oh My Zsh
網站：https://ohmyz.sh

優點：
超多好用 plugin（git、docker、npm、自動補齊等）
主題選擇豐富（powerlevel10k、agnoster...）
安裝簡單，社群活躍

安裝指令：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
brew install romkatv/powerlevel10k/powerlevel10k
# vim ~/.zshrc 修改主題樣式
ZSH_THEME="powerlevel10k/powerlevel10k"
source ~/.zshrc
```

## 假文字

1. [中文亂數假文產生器 Chinese Lorem Ipsum](https://pinkylam.me/generator/chinese-lorem-ipsum/)
2. [英文 Lorem Ipsum](https://www.lipsum.com/)

## 假圖

1. [Fake images please?](https://fakeimg.pl/)
2. [Picsum photos](https://picsum.photos/)

## 影片

1. [Free Creative Commons Zero Videos](https://www.pexels.com/search/videos/creative%20commons%20zero/)

## CSS 文件

1. [css-tricks](https://css-tricks.com/)

## CSS Reset

1. [A Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
2. [CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/)

## Git

1. [Learn Git Branching](https://learngitbranching.js.org/)

## CSS 選擇器練習

1. [CSS Dinner](https://flukeout.github.io/)

## CSS 排版練習

1. [Flexbox Froggy](https://flexboxfroggy.com/)
2. [CSS Grid Garden](https://cssgridgarden.com/)

## API

1. [{JSON} Placeholder Free fake and reliable API for testing and prototyping.](https://jsonplaceholder.typicode.com/)

## 設計

1. [s5-style](https://www.s5-style.com/)
2. [cssdesignawards](https://www.cssdesignawards.com/)

## CSS 動畫

1. [CSS 貝茲曲線](https://cubic-bezier.com/)

## 文件工具

1. [docusaurus](https://docusaurus.io/)

## 線上編輯器

1. [codesandbox](https://codesandbox.io/)
2. [codepen](https://codepen.io/)
3. [jsbin](https://jsbin.com/)

## VS Code 排版工具

安裝 Prettier 外掛
1️. 打開 `VS Code` → `Extensions` → 搜尋 `Prettier` - `Code formatter` → 安裝

2️. 在你的 VS Code 設定檔 `.vscode/settings.json`（或直接設定 → 搜尋「`prettier」`）加入：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.semi": true
}
```

`prettier.semi: true` 就是 每行最後自動加分號
以後每次 存檔（`Ctrl+S`）會自動補分號、排版！
