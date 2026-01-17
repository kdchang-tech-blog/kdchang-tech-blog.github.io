---
title: 12 Factor App 入門教學：打造現代雲端應用的十二守則教學筆記 | 學習筆記
date: 2025-02-09 02:23:41
authors: kdchang
tags:
  - 12 Factor App
  - Heroku
  - SaaS
  - API
  - cloud
---

# 前言

**12 Factor App** 是由 Heroku 團隊提出的一套雲端應用架構設計原則，旨在幫助開發者打造可擴展、可維護、易部署的現代化應用程式。這些準則不限語言或框架，廣泛適用於各種 SaaS 應用、API 服務、微服務架構等場景。

以下是每一個 factor 的說明與實際範例：

---

## 一、 Codebase（代碼基底）

**一個應用對應一個代碼庫，多個部署環境共用該代碼庫**

一個應用程式不應散落在多個 Git 倉庫中，即使部署至多個環境（開發、測試、正式），仍應共用同一代碼庫。

**範例：**

```bash
git@github.com:kdchang/todo-api.git  # 統一代碼庫
```

若你在 GitHub 上有一個 `todo-api` 倉庫，開發、測試與生產環境（production、staging、dev）的部署都應來自這個倉庫的不同分支或 Tag。

---

## 二、 Dependencies（明確聲明相依套件）

**使用明確的套件管理工具來聲明所有相依項目，避免依賴系統層級安裝**，例如：使用如 requirements.txt, Pipfile, package.json

**範例（Node.js）**

```bash
# package.json 中聲明所有依賴
{
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.0.3"
  }
}
```

部署時只需透過 `npm install` 即可安裝所有套件。

## 三、 Config（環境設定分離）

**環境變數應儲存所有設定資訊，而非寫死在程式碼中**，例如：`.env`

這包含資料庫連線、API 金鑰、第三方服務設定等。

**範例：**

```bash
# .env 檔（不要提交到 Git）
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=my_secret_token
```

程式碼中透過 `process.env` 取用這些變數。

---

## 四、 Backing Services（外部資源視為附屬服務）

**無論是本地資料庫、第三方 API、AWS S3 等，都視為可替換的附屬資源**

切換服務供應商不應需改動應用邏輯，只要變更設定即可。例如：DATABASE_URL

**範例：**

```js
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
```

---

## 五、 Build, Release, Run（建置、發布、執行分離）

**明確區分建置（build）、發布（release）與執行（run）三個階段**

- Build：編譯程式、安裝依賴（例如：container）
- Release：結合建置結果與設定，生成可部署版本。將 build 結果與設定綁定
- Run：實際執行應用（以 immutable 的方式）

**範例（Heroku）：**

```bash
git push heroku main  # 觸發 build 與 release
heroku run npm start  # 執行
```

---

## 六、 Stateless Processes（無狀態的執行單元）

**應用程式應以一個或多個無狀態進程執行，狀態需存於外部服務**

避免將使用者 session 存在記憶體中，應使用 Redis、資料庫等外部服務。可以隨時 scale out

**範例（Express）：**

```js
// Session 儲存至 Redis，而非記憶體
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
```

---

## 七、 Port Binding（綁定至 Port 提供服務）

**應用應自行綁定 port 來對外提供 HTTP 服務，而非依賴外部 Web Server**，例如：Gunicorn

這使得應用本身即是一個完整的服務，容易容器化部署。

**範例（Node.js）：**

```js
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
```

---

## 八、 Concurrency（使用程序模型提升並行能力）

**透過分工的進程來擴展應用功能，例如 Web、Worker、queue 等**

每個類型的處理單位可根據需求水平擴充。

**範例（使用 PM2）**

```bash
pm2 start app.js -i max       # 啟動多個 Web 處理進程
pm2 start worker.js --name worker  # 啟動背景任務處理器
```

---

## 九、 Disposability（快速啟動與優雅關閉）

**應用應能快速啟動與安全關閉，適應雲端平台的彈性調度**

優雅關閉能確保未完成的請求被妥善處理完畢，當使用容器應能快速重啟。

**範例（Node.js）：**

```js
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
```

---

## 十、 Dev/Prod Parity（開發與生產環境的一致性）

**開發、測試、生產環境盡可能相似，降低部署錯誤風險**

推薦使用 Docker 來統一環境。盡量減少「只有 production 才會發生」的 bug。

**範例：**

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

---

## 十一、 Logs（將 log 作為事件串流）

**應用不應自行管理 log 文件，而是將 log 輸出到 stdout/stderr，再由平台集中收集與分析**

**範例：**

```js
console.log("User login success", { userId: 123 });
console.error("Database connection failed", error);
```

在 Heroku、GCP、Kubernetes 等平台會自動收集這些 log，讓 log 管理交給專門工具收集（如 ELK, CloudWatch）

---

## 十二、 Admin Processes（一時性管理指令）

**資料庫 migration、資料修復等管理任務應能以一次性指令執行**

這些指令應與主應用共用相同的環境設定與程式碼。管理性任務（如資料遷移）應獨立於應用程式主進程（例如：`python manage.py migrate`）

**範例：**

```bash
# Sequelize migration 指令
npx sequelize-cli db:migrate
```

---

## 總結

12 Factor App 並不是一套硬性規定，而是建立雲端應用的實務指南。當你的應用朝微服務、CI/CD、雲端部署發展時，這十二項原則能幫助你打造更穩定、可擴充的系統架構。
