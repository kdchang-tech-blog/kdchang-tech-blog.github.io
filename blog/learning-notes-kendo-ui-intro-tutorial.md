---
title: Kendo UI 入門教學筆記 | 學習筆記
date: 2020-12-14 02:23:41
authors: kdchang
tags:
  - Kendo
  - jQuery
---

## 前言

在現代前端開發中，不管是使用函式庫或是框架進行開發，使用 UI 元件庫可以大幅提升開發效率與使用者體驗。Kendo UI 是由 Progress 公司推出的前端元件庫，支援多種 JavaScript 框架（如 jQuery、Angular、React、Vue），提供豐富的 UI 元件，包括表格（Grid）、圖表（Chart）、日曆（Calendar）、表單元件、對話框等。Kendo UI 以高效能、易用性與高度可客製化著稱，廣泛應用於企業級應用系統。

本文將介紹 Kendo UI 的核心概念、重要特色，並以實際範例展示如何快速上手使用 Kendo UI 建立一個簡單的資料表格。

---

## 重點摘要

- **多框架支援**
  Kendo UI 提供了多個版本，包含基於 jQuery 的 Kendo UI Core（免費）與商業版 Kendo UI Professional，以及針對 Angular、React、Vue 的專屬元件套件。

- **元件豐富且成熟**
  擁有超過 70 種元件，涵蓋表格、圖表、日期時間選擇器、下拉選單、進度條、通知、編輯器等，能滿足多種開發需求。

- **高效能資料操作**
  內建支援分頁、排序、篩選、群組功能的 Grid，並能與遠端 API 整合，進行即時資料呈現。

- **高度客製化與主題支持**
  元件可調整外觀與行為，支援 Sass 變數，可自訂主題風格以符合企業品牌需求。

- **國際化與無障礙設計**
  支援多語系與區域設定，遵循無障礙標準，提升應用的普及度與可及性。

- **豐富文件與社群支援**
  官方提供完整 API 文件、教學範例與論壇，方便開發者學習與問題解決。

---

## Kendo UI 基本使用範例（以 jQuery 版本為例）

以下範例示範如何快速在網頁中引入 Kendo UI，並使用 Grid 元件顯示靜態資料。

### 1. 環境準備

在 HTML 頁面中透過 CDN 方式引入 Kendo UI CSS 和 JavaScript 檔案，並引入 jQuery。

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <title>Kendo UI Grid 範例</title>
    <!-- Kendo UI CSS -->
    <link
      rel="stylesheet"
      href="https://kendo.cdn.telerik.com/2025.1.119/styles/kendo.default-v2.min.css"
    />
  </head>
  <body>
    <div id="grid"></div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Kendo UI JS -->
    <script src="https://kendo.cdn.telerik.com/2025.1.119/js/kendo.all.min.js"></script>

    <script>
      $(document).ready(function () {
        // 建立資料來源
        var data = [
          { ProductID: 1, ProductName: '蘋果', Price: 120, InStock: true },
          { ProductID: 2, ProductName: '香蕉', Price: 90, InStock: false },
          { ProductID: 3, ProductName: '橘子', Price: 110, InStock: true },
          { ProductID: 4, ProductName: '芒果', Price: 150, InStock: true },
        ];

        // 初始化 Grid
        $('#grid').kendoGrid({
          dataSource: {
            data: data,
            pageSize: 3,
          },
          pageable: true,
          sortable: true,
          filterable: true,
          columns: [
            { field: 'ProductID', title: '產品編號', width: '100px' },
            { field: 'ProductName', title: '產品名稱' },
            { field: 'Price', title: '價格', format: '{0} 元', width: '120px' },
            {
              field: 'InStock',
              title: '是否有貨',
              template: "#= InStock ? '有貨' : '缺貨' #",
              width: '100px',
            },
          ],
        });
      });
    </script>
  </body>
</html>
```

### 2. 範例說明

- 透過 `<link>` 引入 Kendo UI 樣式檔案，確保元件外觀正常呈現。
- 使用 `<script>` 引入 jQuery 與 Kendo UI 主要功能腳本。
- 透過 `$("#grid").kendoGrid()` 初始化一個 Grid 元件，設定資料來源為靜態陣列 `data`。
- 啟用分頁（`pageable`）、排序（`sortable`）及篩選（`filterable`）功能。
- 定義欄位，包括產品編號、名稱、價格，以及是否有貨的自訂範本顯示。

### 3. 進階擴充

Kendo UI 的 Grid 支援各種複雜功能，例如：

- **遠端資料讀取**：可設定 `dataSource.transport.read` 指向 API，實現資料即時載入。
- **編輯功能**：支援內嵌或彈出編輯表單，輕鬆實現 CRUD 操作。
- **群組與聚合**：支援資料分組顯示與計算欄位總和、平均值。
- **導出功能**：支援匯出 Excel、PDF，方便報表產出。

---

## 總結

Kendo UI 是一套功能強大且彈性極高的前端 UI 元件庫，適合企業級應用開發，能有效提升開發效率與產品品質。從簡單的資料表格到複雜的資料視覺化與互動操作，Kendo UI 都能提供完善的解決方案。

若是新手入門建議先從官方文件及基礎元件（如 Grid、Button、DatePicker）開始熟悉，並搭配範例實作加深理解。透過不斷練習與調整設定，能快速掌握其靈活的客製化能力。
