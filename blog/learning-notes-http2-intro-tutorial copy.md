---
title: HTTP/2 介紹與入門教學筆記 | 學習筆記
date: 2023-12-16 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - HTTP/1
    - HTTP
    - HTTP/2

---

## 1. HTTP/2 簡介

HTTP/2 是 HTTP/1.1 的後繼版本，由 IETF HTTP 工作小組開發，並於 2015 年 5 月成為正式標準（RFC 7540）。HTTP/2 的主要目標是提高 Web 的性能，減少延遲，並優化資源的傳輸方式。

## 2. HTTP/2 的核心特性

### 2.1 二進制分幀層（Binary Framing Layer）
HTTP/2 以二進制格式進行數據傳輸，而非 HTTP/1.1 的純文字格式。這使得解析和處理更高效，減少了協議的開銷。

### 2.2 多路徑傳輸（Multiplexing）
在 HTTP/1.1 中，一個 TCP 連線同時只能處理一個請求，導致「線頭阻塞」問題。HTTP/2 允許在單個 TCP 連線中並行傳輸多個請求與回應，顯著提高效率。

### 2.3 流量控制與優先權（Stream Prioritization）
HTTP/2 允許客戶端為請求設定優先級，讓重要的資源（如 CSS、JS）優先傳輸，提高頁面載入速度。

### 2.4 頭部壓縮（Header Compression）
HTTP/2 使用 HPACK 壓縮技術來減少 HTTP 標頭的大小，避免 HTTP/1.1 中重複傳輸 Cookie、User-Agent 等大量標頭資訊的問題。

### 2.5 伺服器推送（Server Push）
伺服器可以主動推送客戶端尚未請求的資源，例如 HTML 請求回應時，伺服器可同時推送 CSS、JavaScript 檔案，減少額外的請求時間。

## 3. HTTP/2 與 HTTP/1.1 的比較

| 特性 | HTTP/1.1 | HTTP/2 |
|------|---------|--------|
| 資料格式 | 純文字 | 二進制 |
| 多路復用 | 不支援 | 支援 |
| 流量控制 | 無 | 有 |
| 頭部壓縮 | 無 | HPACK |
| 伺服器推送 | 無 | 有 |

## 4. HTTP/2 的使用與設定

### 4.1 瀏覽器支援
現代主流瀏覽器（Chrome、Firefox、Edge、Safari）皆支援 HTTP/2，但通常需要搭配 HTTPS 使用。

### 4.2 伺服器支援
常見的 Web 伺服器如 Nginx、Apache、LiteSpeed 都已支援 HTTP/2，但需進行適當的設定。

#### 4.2.1 在 Nginx 啟用 HTTP/2

若要在 Nginx 中啟用 HTTP/2，需要確保已安裝支援 HTTP/2 的 Nginx 版本（1.9.5 以上）並修改設定檔：

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/cert.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

在 `listen` 指令中加入 `http2` 即可啟用 HTTP/2。

#### 4.2.2 在 Apache 啟用 HTTP/2

Apache 2.4.17 以上版本支援 HTTP/2，需要啟用 `mod_http2` 模組。

```bash
a2enmod http2
systemctl restart apache2
```

接著，在 VirtualHost 設定中加入：

```apache
<VirtualHost *:443>
    Protocols h2 http/1.1
    DocumentRoot /var/www/html
    ServerName example.com
</VirtualHost>
```

## 5. HTTP/2 客戶端測試

可以使用 `curl` 測試 HTTP/2 是否正常運作：

```bash
curl -I --http2 https://example.com
```

若顯示 `HTTP/2 200`，則表示伺服器已成功支援 HTTP/2。

## 6. HTTP/2 的實際應用

### 6.1 使用 HTTP/2 Server Push

在 HTTP/2 中，可以使用 `Link` 標頭來主動推送資源。例如，在 Nginx 配置中加入：

```nginx
location / {
    add_header Link "</style.css>; rel=preload; as=style";
    add_header Link "</script.js>; rel=preload; as=script";
}
```

這樣當客戶端請求 `index.html` 時，伺服器會自動推送 `style.css` 和 `script.js`，減少 HTTP 請求數量。

### 6.2 透過瀏覽器 DevTools 觀察 HTTP/2

打開 Chrome 開發者工具（F12） → `Network` 分頁，查看 `Protocol` 欄位，若顯示 `h2`，則表示該請求使用了 HTTP/2。

## 7. 總結

HTTP/2 改進了 HTTP/1.1 的多項限制，透過多路徑傳輸、頭部壓縮與伺服器推送提高了 Web 效能。現代瀏覽器與伺服器已廣泛支援 HTTP/2，建議在新專案中啟用 HTTP/2，以提升用戶體驗與網站速度。

