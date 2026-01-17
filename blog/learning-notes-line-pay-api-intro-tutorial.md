---
title: LINE Pay API 入門教學筆記 | 學習筆記
date: 2024-12-17 02:23:41
authors: kdchang
tags:
  - Line Pay API
  - 第三方支付
  - payment
---

## 一、前言

在電子商務與線上交易日益普及的今天，提供穩定又方便的金流服務已成為網站與應用程式不可或缺的一環。LINE Pay 是由 LINE Corporation 推出的行動支付平台，除了在線上與實體店面支援消費者付款外，也提供開發者 API 介面來整合第三方商務服務，使開發者可以在網站或應用程式中無縫串接付款功能。

本篇教學筆記將帶你了解 LINE Pay API 的基本觀念、運作流程，以及如何透過簡單的實作實現付款功能，協助你更快進入金流整合領域。

---

## 二、重點摘要

- LINE Pay 是 LINE 提供的電子支付平台，可整合至網站或 App。
- LINE Pay API 採用 RESTful 設計，以 HTTPS POST/GET 傳遞 JSON 格式。
- API 主要分為以下幾個步驟：

  - `Request`：建立付款請求
  - `Redirect`：用戶跳轉至 LINE Pay 完成付款
  - `Confirm`：付款成功後確認交易

- 使用前需在 [LINE Pay 商戶後台](https://pay.line.me/tw/developers) 申請帳戶與 Channel。
- API 使用需要 Channel ID、Channel Secret Key，以及測試或正式的 LINE Pay API Endpoint。
- 所有請求需附加簽章（Signature Header）以進行授權與安全驗證。
- 支援多種付款方式（LINE Pay 錢包、信用卡、優惠券等）。

---

## 三、整體交易流程圖

1. 使用者在你的網站點擊「立即付款」
2. 後端呼叫 `request` API 建立交易
3. 將使用者導向 LINE Pay 的付款畫面
4. 用戶完成付款後，LINE 會導回你設定的 redirect URL
5. 你後端呼叫 `confirm` API 完成交易驗證

---

## 四、準備工作

1. **註冊商戶帳號**：至 [LINE Pay Developer Center](https://pay.line.me/tw/developers) 申請開發者帳號與商戶帳戶。
2. **建立 Channel**：建立 LINE Pay Channel 取得 `Channel ID` 與 `Channel Secret Key`。
3. **設定 Redirect URL**：設置付款成功/失敗的回傳網址。
4. **測試環境**：LINE Pay 提供 Sandbox 環境（沙盒），可模擬交易流程。

---

## 五、實際範例（使用 Python Flask 示範）

### 1. 建立付款請求：`/create_payment`

```python
import requests, json, time, hashlib, hmac
from flask import Flask, redirect, request

app = Flask(__name__)

CHANNEL_ID = '你的Channel ID'
CHANNEL_SECRET = '你的Secret Key'
LINE_PAY_ENDPOINT = 'https://sandbox-api-pay.line.me'
CONFIRM_URL = 'https://你的網站.com/confirm_payment'
RETURN_HOST = 'https://你的網站.com'

def generate_signature(uri, body, nonce, secret):
    message = secret.encode('utf-8')
    raw = f"{secret}{uri}{json.dumps(body, separators=(',', ':'))}{nonce}"
    return hmac.new(message, raw.encode('utf-8'), hashlib.sha256).hexdigest()

@app.route('/create_payment')
def create_payment():
    uri = '/v3/payments/request'
    url = f"{LINE_PAY_ENDPOINT}{uri}"
    nonce = str(int(time.time() * 1000))
    headers = {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': CHANNEL_ID,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': generate_signature(uri, {
            "amount": 100,
            "currency": "TWD",
            "orderId": "ORDER123456",
            "packages": [{
                "id": "1",
                "amount": 100,
                "name": "商品",
                "products": [{"name": "測試商品", "quantity": 1, "price": 100}]
            }],
            "redirectUrls": {
                "confirmUrl": CONFIRM_URL,
                "cancelUrl": f"{RETURN_HOST}/cancel"
            }
        }, nonce, CHANNEL_SECRET)
    }

    body = {
        "amount": 100,
        "currency": "TWD",
        "orderId": "ORDER123456",
        "packages": [{
            "id": "1",
            "amount": 100,
            "name": "商品",
            "products": [{"name": "測試商品", "quantity": 1, "price": 100}]
        }],
        "redirectUrls": {
            "confirmUrl": CONFIRM_URL,
            "cancelUrl": f"{RETURN_HOST}/cancel"
        }
    }

    res = requests.post(url, headers=headers, json=body)
    res_data = res.json()
    payment_url = res_data['info']['paymentUrl']['web']
    return redirect(payment_url)
```

### 2. 完成付款後確認交易：`/confirm_payment`

```python
@app.route('/confirm_payment')
def confirm_payment():
    transaction_id = request.args.get('transactionId')
    uri = f"/v3/payments/{transaction_id}/confirm"
    url = f"{LINE_PAY_ENDPOINT}{uri}"
    nonce = str(int(time.time() * 1000))
    body = {
        "amount": 100,
        "currency": "TWD"
    }
    headers = {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': CHANNEL_ID,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': generate_signature(uri, body, nonce, CHANNEL_SECRET)
    }
    res = requests.post(url, headers=headers, json=body)
    return res.json()
```

---

## 六、注意事項

- 所有請求必須使用 HTTPS。
- 金額與幣別需與建立交易時一致，否則確認交易會失敗。
- 建議使用 UUID 或時間戳記作為 `orderId` 以避免重複。
- 正式環境與 Sandbox 的 API Endpoint 不同，測試時請使用 sandbox 網址。

---

## 七、總結

LINE Pay API 提供了強大的付款整合能力，對於電商網站、小型應用或自有服務都有極大的幫助。透過良好的 API 設計與嚴謹的安全驗證，開發者可以快速、安全地建置付款機制。建議開發者先熟悉 sandbox 測試流程，再導入正式環境，以確保交易安全與穩定性。

若你有更多需求，例如分期付款、自動收款、退款等，也可進一步參考官方完整文件：[LINE Pay API 技術文件](https://pay.line.me/tw/developers/apis/onlineApis)
