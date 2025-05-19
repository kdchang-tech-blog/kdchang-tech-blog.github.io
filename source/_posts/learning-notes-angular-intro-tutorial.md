---
title: Angular 入門教學筆記 | 學習筆記
date: 2024-12-20 02:23:41
author: kdchang
tags:
  - Angular
  - TypeScript
---

## 前言：什麼是 Angular？

Angular 是由 Google 支持與維護的前端框架，採用 `TypeScript` 開發，用於建構單頁應用程式（SPA）。Angular 提供了強大的資料繫結（Data Binding）、組件化設計（Component-based Architecture）、模組化管理（Modules）、路由（Routing）等功能，適合用來開發大型且可維護性的應用。

Angular 與其他前端框架（如 React、Vue）最大的不同在於它是一個完整框架，除了 UI 呈現外，也包含完整的`路由`、`HTTP 通訊`、`表單管理`等功能。

---

## Angular 基本架構

- **模組（Module）**：用來組織應用程式的功能區塊，至少有一個根模組 `AppModule`。
- **組件（Component）**：UI 的基本單位，每個組件包含 HTML 模板、CSS 樣式與 TypeScript 類別。
- **服務（Service）**：用來封裝業務邏輯和資料存取，可被組件注入使用。
- **路由（Router）**：用於處理頁面間的切換。

---

## 開發環境準備

1. 安裝 Node.js（建議版本 16+）

2. 安裝 Angular CLI（命令列工具）：

   ```bash
   npm install -g @angular/cli
   ```

3. 建立新專案：

   ```bash
   ng new my-angular-app
   ```

   期間會詢問是否要加入路由、使用 CSS 或 SCSS 等，可依需求選擇。

4. 進入專案資料夾：

   ```bash
   cd my-angular-app
   ```

5. 啟動開發伺服器：

   ```bash
   ng serve
   ```

6. 開啟瀏覽器，輸入 `http://localhost:4200` 即可看到預設的 Angular 首頁。

---

## 實際範例：簡單的計數器應用

以下將示範如何用 Angular 建立一個簡單的計數器，包含按鈕點擊事件與資料顯示。

### Step 1: 建立計數器組件

使用 Angular CLI 建立組件：

```bash
ng generate component counter
```

這會產生一個新的資料夾 `src/app/counter`，包含四個檔案：

- `counter.component.ts`（TypeScript 程式碼）
- `counter.component.html`（HTML 模板）
- `counter.component.css`（樣式）
- `counter.component.spec.ts`（測試）

### Step 2: 編輯組件程式碼

**counter.component.ts**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
```

這裡我們定義了一個 `count` 屬性，以及三個方法：`increment()`、`decrement()` 和 `reset()`，用來操作計數值。

### Step 3: 編輯 HTML 模板

**counter.component.html**

```html
<div style="text-align: center;">
  <h2>簡單計數器</h2>
  <p>目前數值：{{ count }}</p>

  <button (click)="increment()">增加</button>
  <button (click)="decrement()">減少</button>
  <button (click)="reset()">重設</button>
</div>
```

這裡使用 Angular 的資料繫結語法 `{{ count }}` 顯示目前的計數值，並用 `(click)` 綁定按鈕點擊事件，呼叫組件方法。

### Step 4: 將組件放入主畫面

打開 `src/app/app.component.html`，將預設內容替換成：

```html
<app-counter></app-counter>
```

這樣就會在首頁顯示剛剛建立的計數器組件。

---

## Angular 的重要概念說明

1. **資料繫結（Data Binding）**

   - 插值表達式 `{{ }}`：用來顯示組件的變數。
   - 事件繫結 `(event)`：如 `(click)` 綁定按鈕事件。
   - 雙向繫結 `[(ngModel)]`：常用於表單元素，需引入 `FormsModule`。

2. **組件生命週期（Lifecycle Hooks）**
   Angular 組件有多個生命週期方法，如 `ngOnInit()`（初始化時呼叫）、`ngOnDestroy()`（銷毀時呼叫），可用於在特定時機執行程式碼。

3. **依賴注入（Dependency Injection, DI）**
   Angular 內建 DI 系統，可以將服務注入組件，提高模組化與可測試性。

---

## 總結

- Angular 是功能完整的前端框架，適合開發大型 SPA。
- 透過 CLI 工具，可以快速建立專案與組件。
- 基本組件包含 TypeScript 類別與 HTML 模板，藉由資料繫結和事件綁定實現互動。
- 了解 Angular 核心概念如模組、組件、服務與路由，能幫助設計良好的應用結構。

如果想更深入學習，可以參考官方文件 [Angular 官方網站](https://angular.dev/)，或是搭配範例專案與實作練習，進一步掌握 Angular 的強大功能。
