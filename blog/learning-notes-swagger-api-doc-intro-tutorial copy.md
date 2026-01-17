---
title: 使用 ESM 的 Swagger 入門教學（Node.js + Express） | 學習筆記
date: 2023-12-21 11:33:41
authors: kdchang
tags:
  - Swagger
  - API
---

## 前言

在現代後端開發中，撰寫標準化的 API 文件是必要的工作。Swagger（OpenAPI）讓我們可以定義並分享 API 結構，也支援透過 UI 測試 API。本文將示範如何在 **ESM 模組架構的 Node.js 專案中** 整合 Swagger，實現互動式 API 文件。

---

## 重點摘要

- 使用 `swagger-jsdoc` 定義 API 文件（支援 YAML 格式註解）。
- 使用 `swagger-ui-express` 提供互動式 Swagger UI 頁面。
- 採用 ES Module（`import` / `export`）語法整合。
- 使用 JSDoc 註解方式撰寫 API 描述。
- Swagger 文件會自動從註解中產生，不需手動維護 JSON/YAML 文件。

---

## 安裝套件

```bash
npm install express swagger-jsdoc swagger-ui-express
```

並在 `package.json` 中加入：

```json
{
  "type": "module"
}
```

---

## 專案結構

```
project/
├── index.js
├── swagger.js
└── routes/
    └── todos.js
```

---

## 1. 建立 swagger.js

```js
// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: '使用 Swagger + ESM 撰寫的 Todo API 文件',
    },
  },
  apis: ['./routes/*.js'], // 註解來源路徑
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
```

---

## 2. 建立 routes/todos.js

```js
// routes/todos.js
import express from 'express';

const router = express.Router();

/**
 * @openapi
 * /todos:
 *   get:
 *     summary: 取得所有代辦事項
 *     responses:
 *       200:
 *         description: 成功取得清單
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
/**
 * @openapi
 * /todos:
 *   post:
 *     summary: 建立一筆代辦事項
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: 建立成功
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - id
 *         - task
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         task:
 *           type: string
 *           example: 學習 Swagger
 */

router.get('/todos', (req, res) => {
  res.json([{ id: 1, task: '學習 Swagger' }]);
});

router.post('/todos', (req, res) => {
  res.status(201).json({ id: 2, task: req.body.task });
});

export default router;
```

---

## 3. 建立 index.js（入口檔）

```js
// index.js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import todosRouter from './routes/todos.js';

const app = express();

app.use(express.json()); // 處理 JSON 請求
app.use('/api/todos', todosRouter);

// 提供 Swagger UI 文件頁面
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
```

---

## 測試與結果

啟動伺服器後，開啟瀏覽器前往：

```
http://localhost:3000/api-docs
```

你會看到一個完整的互動式 API 文件頁面，可以點擊操作 `GET /todos` 與 `POST /todos`。

---

## 小結

整合 Swagger 到 ESM 架構的 Express 專案中並不困難，關鍵在於：

- 使用 `swagger-jsdoc` 從 JSDoc 註解產生規格。
- 搭配 `swagger-ui-express` 呈現互動式 API 頁面。
- 配合 ES Module 語法撰寫程式碼。

這樣的文件工具能大幅提升開發效率、降低溝通成本，特別適合多人協作或需要對外提供 API 文件的專案。

---

如果你想進一步整合 TypeScript、OpenAPI YAML 檔案、或搭配 FastAPI、NestJS 等框架，也可以告訴我，我可以提供對應版本的教學。是否需要？

# 參考文件

1. [官方文件](https://swagger.io/)
