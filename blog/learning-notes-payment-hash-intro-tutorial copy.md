---
title: 金流使用 Hash 原因入門教學筆記 | 學習筆記
date: 2024-12-19 02:23:41
author: kdchang
tags:
  - Line Pay API
  - 第三方支付
  - payment
  - Hash
  - 金流
---

在金流（第三方支付或自建金流）系統中使用 **Hash（雜湊）** 的原因，主要是為了**安全性**與**防止資料被竄改**。以下是更詳細的解釋：

---

## 一、為什麼金流需要 Hash？

金流交易涉及敏感資料（如金額、訂單編號、使用者資訊、驗證參數等），若這些資料在傳輸過程中被竄改，將造成：

- 金額錯誤（被調整為更小金額）
- 偽造付款成功通知
- 使用者資料外洩
- 金流詐騙行為

因此，**金流平台與商家之間需要一種方式來驗證資料完整性與來源**，這就是使用 Hash 的目的。

---

## 二、Hash 的功能與好處

### 1. 防止資料被竄改

將參數與商家的金鑰（如 `HashKey`, `HashIV`, `Secret`) 一起進行加密產生 Hash，當接收到資料時重新運算比對 Hash 是否一致，可判斷資料是否遭到中間人修改。

### 2. 驗證資料來源（防偽）

因為 Hash 中包含商家密鑰，只有商家與金流平台知道，第三方無法偽造相同的 Hash 值。

### 3. 簽章比對（防止偽造）

如同電子簽章，確保伺服器回傳的付款成功訊息未被偽造。

---

## 三、常見應用場景

1. **交易請求（Payment Request）**

   - 商家送出訂單資訊與 Hash 到金流平台。
   - 金流平台驗證 Hash 是否正確。

2. **金流回傳通知（Callback）**

   - 金流平台回傳付款成功訊息與 Hash。
   - 商家伺服器驗證 Hash 是否正確，確保通知未被偽造。

---

## 四、常見演算法

常用於金流驗證的 Hash 演算法包括：

- **SHA-256**（常見於 Line Pay、藍新金流）
- **SHA-1 / MD5**（部分舊系統使用，不建議，因為已知有碰撞風險）

---

## 五、範例（以 SHA-256 為例）

```python
import hashlib
import urllib.parse

def generate_hash(params, hash_key, hash_iv):
    # 1. 排序參數
    sorted_params = sorted(params.items())

    # 2. 組合參數字串
    query = urllib.parse.urlencode(sorted_params)

    # 3. 加入 HashKey 和 HashIV
    raw = f"HashKey={hash_key}&{query}&HashIV={hash_iv}"

    # 4. URL encode 並轉為小寫
    encoded = urllib.parse.quote_plus(raw).lower()

    # 5. SHA-256 雜湊後轉大寫
    hash_value = hashlib.sha256(encoded.encode('utf-8')).hexdigest().upper()

    return hash_value
```

## 六、重點摘要

- **什麼是 Hash？**

  - 一種不可逆的單向編碼函數。
  - 輸入內容不論長短，輸出皆為固定長度的字串（雜湊值）。

- **Hash 的特性**

  - 不可逆性（無法由輸出推回輸入）。
  - 輸入微幅變動會產生截然不同的結果。
  - 相同輸入會產生相同輸出（穩定性）。

- **金流為何需要 Hash？**

  1. **資料驗證**：確保交易資料在傳送過程未遭竄改。
  2. **身份驗證**：用來確認請求是否來自可信來源（如商家端或金流平台）。
  3. **防止偽造**：Hash 搭配密鑰可防止惡意第三方偽造交易請求。
  4. **簽章與紀錄**：用於產生交易紀錄摘要，利於日後比對查核。

- **常見應用場景**

  - 第三方金流（如：藍新、綠界、Line Pay）API 請求驗證。
  - 商店端對回傳交易結果進行驗證（例如 callback 處理）。
  - 加密交易參數避免資料外洩。

---

## 實際範例

以下以台灣常見的金流服務商 **綠界科技（ECPay）** 為例，說明 Hash 如何在金流流程中使用。

### 📌 模擬付款請求流程中的 Hash 機制

假設我們要透過金流平台建立一筆訂單，商家需呼叫綠界的 API 送出交易請求，為確保資料未被竄改，綠界要求每筆請求需附帶經 Hash 加密的驗證碼（CheckMacValue）。

### 1. 建立交易資料

```plaintext
MerchantID=2000132
MerchantTradeNo=KD123456789
MerchantTradeDate=2025/06/12 15:00:00
PaymentType=aio
TotalAmount=1000
TradeDesc=測試交易
ItemName=測試商品1件
ReturnURL=https://www.kdchang.me/callback
ChoosePayment=ALL
```

### 2. 組合字串（需加上 HashKey 與 HashIV）

```plaintext
HashKey=5294y06JbISpM5x9
HashIV=v77hoKGq4kWxNNIS

組合前格式如下（依照參數 ASCII 排序）：
HashKey=5294y06JbISpM5x9&ChoosePayment=ALL&ItemName=測試商品1件&MerchantID=2000132&MerchantTradeDate=2025/06/12 15:00:00&MerchantTradeNo=KD123456789&PaymentType=aio&ReturnURL=https://www.kdchang.me/callback&TotalAmount=1000&TradeDesc=測試交易&HashIV=v77hoKGq4kWxNNIS
```

### 3. 進行 URL Encode 與轉成小寫，再做 Hash（通常使用 SHA256）

經過 SHA256 計算後會得到一段長度為 64 字元的十六進位字串：

```plaintext
CheckMacValue=5F8BCE79E9D2748F443D751B34EC5085EDB8C52265521FC42D6F807F208F47D2
```

此值將作為驗證碼隨交易資料一併傳送至金流平台。

### 4. 綠界端驗證流程

綠界收到資料後，會根據相同的規則計算一次 Hash 值並與商家提供的 CheckMacValue 比對，若一致，才表示資料未遭竄改，交易請求才會被接受。

---

### 延伸說明：為什麼不用密碼明文？

有些人可能會問：「為何不直接傳送密碼或 token 來驗證身分？」原因在於：

- 密碼若明文傳輸容易被攔截。
- 即使是 HTTPS 傳輸，也無法防止伺服器端遭駭後資料外洩。
- Hash 機制能將敏感資訊加密為單向摘要，即使外洩也難以還原原始資料。

若搭配 **時間戳記**、**一次性 token** 或 **HMAC**（含密鑰的 Hash），可大幅提升安全性。

## 七、總結

金流使用 Hash 的核心目的是「**確保資料未被篡改並驗證來源合法性**」。它就像資料的「指紋」，能保證交易資訊的完整性與安全性。若缺乏這種驗證機制，金流系統就容易遭受攻擊或詐騙，對商家與消費者都造成風險。

因此，不論是在串接金流 API、處理回傳通知或比對訂單資訊時，**妥善處理 Hash 的生成與比對，是金流串接不可忽略的重要環節。**
