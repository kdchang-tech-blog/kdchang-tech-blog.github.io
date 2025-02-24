---
title: Cypress 測試入門教學筆記 | 學習筆記
date: 2024-12-09 02:23:41
author: kdchang
tags: 
    - Cypress
    - 測試
    - E2E
    - QA

---

# 1. Cypress 基礎概念

`Cypress` 是一款現代化的前端自動化測試工具，主要用於測試 Web 應用程式，支援端對端（`E2E`）測試、`元件測試`等。

### 1.1 為何選擇 Cypress？

- 簡單易用，直接運行於瀏覽器。
- 提供即時回饋，方便 Debug。
- 內建等待機制，避免手動處理異步問題。
- 支援截圖與錄影，方便測試分析。

# 2. 安裝與設定

### 2.1 安裝 Cypress

使用 npm 或 yarn 安裝 Cypress：
```sh
npm install cypress --save-dev
```
或
```sh
yarn add cypress --dev
```

### 2.2 執行 Cypress

安裝完成後，可以使用以下指令開啟 Cypress GUI：
```sh
npx cypress open
```
或直接執行測試：
```sh
npx cypress run
```

# 3. 撰寫 Cypress 測試

### 3.1 建立測試檔案

Cypress 預設的測試檔案放置於 `cypress/e2e/` 目錄下，例如：
```sh
cypress/e2e/sample_spec.cy.js
```

### 3.2 基本測試範例

```js
describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('https://example.cypress.io');
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');
  });
});
```

### 3.3 選擇器與操作

Cypress 提供多種選擇器來查找元素，例如：
```js
cy.get('button').click(); // 透過標籤名稱選擇
cy.get('.btn-primary').click(); // 透過 class 選擇
cy.get('#submit-btn').click(); // 透過 ID 選擇
```

### 3.4 斷言（Assertions）

使用 `.should()` 進行斷言，例如：
```js
cy.get('.success-message').should('be.visible');
cy.get('h1').should('have.text', 'Welcome');
```

# 4. 進階功能

### 4.1 錯誤處理與偵錯

Cypress 提供 `cy.pause()` 和 `cy.debug()` 來幫助偵錯：
```js
cy.get('button').click();
cy.pause(); // 測試暫停
cy.get('.result').should('be.visible');
```

### 4.2 假資料與 API 模擬（Mock API）

可以使用 `cy.intercept()` 攔截 API 請求，例如：
```js
cy.intercept('GET', '/api/user', { name: 'John Doe' }).as('getUser');
cy.visit('/profile');
cy.wait('@getUser');
```

### 4.3 自訂命令

可以在 `cypress/support/commands.js` 內定義自訂命令，例如：
```js
Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});
```
然後在測試中使用：
```js
cy.login('test@example.com', 'password123');
```

# 5. CI/CD 整合

Cypress 可以與 CI/CD 工具整合，如 GitHub Actions 或 GitLab CI/CD。

### 5.1 GitHub Actions 設定範例

在 `.github/workflows/cypress.yml` 中新增：
```yml
name: Cypress Tests
on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run Cypress tests
        run: npx cypress run
```

# 6. 總結

透過 Cypress，可以輕鬆進行 Web 應用的測試，提高開發效率與穩定性。建議多練習不同測試場景，如表單驗證、API 測試與 RWD 測試，以熟悉 Cypress 強大的測試能力。

