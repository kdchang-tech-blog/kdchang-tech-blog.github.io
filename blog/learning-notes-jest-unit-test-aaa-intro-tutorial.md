---
title: Jest AAA 測試原則入門教學筆記 | 學習筆記
date: 2018-02-02 02:23:41
authors: kdchang
tags:
  - Jest
  - ES Module
---

### **範例測試：`saveMoney` 方法**

`atm.js`：

```js
class ATM {
  constructor(balance) {
    this.balance = balance;
  }
  saveMoney(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    this.balance += amount;
    return this.balance;
  }
  withdrawMoney(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient balance');
    }
    this.balance -= amount;
    return this.balance;
  }
  getBalance() {
    return this.balance;
  }
  reset() {
    this.balance = 0;
  }
  setBalance(balance) {
    if (balance < 0) {
      throw new Error('Balance cannot be negative');
    }
    this.balance = balance;
  }
}

export default ATM;
```

`atm.test.js`：

```js
import ATM from '../atm.js';

test('saveMoney adds money to balance', () => {
  // Arrange: 建立一個 ATM 實例，初始餘額 0
  const atm = new ATM(0);

  // Act: 存入 1000
  atm.saveMoney(1000);

  // Assert: 餘額應該變成 1000
  expect(atm.balance).toBe(1000);
});
```

**逐步對應：**

| 步驟    | 內容                               |
| ------- | ---------------------------------- |
| Arrange | 建立 `ATM` 物件並給初始值          |
| Act     | 呼叫 `saveMoney(1000)`             |
| Assert  | 驗證 `atm.balance` 是否等於 `1000` |

---

### **另一個範例：檢查錯誤拋出**

如果要測試當金額是負數時會丟錯誤：

```js
test('saveMoney throws error when amount <= 0', () => {
  // Arrange
  const atm = new ATM(0);

  // Act & Assert
  expect(() => atm.saveMoney(0)).toThrow('Amount must be positive');
});
```

這裡因為 **`act` 跟 `assert` 綁在一起**，所以在 `expect` 裡包了一個 function，來驗證是否拋出錯誤。

---

## **完整測試檔（用 AAA 標註）**

```js
import ATM from '../atm.js';

test('saveMoney adds money to balance', () => {
  // Arrange
  const atm = new ATM(0);

  // Act
  atm.saveMoney(1000);

  // Assert
  expect(atm.balance).toBe(1000);
});

test('saveMoney throws error when amount <= 0', () => {
  // Arrange
  const atm = new ATM(0);

  // Act & Assert
  expect(() => atm.saveMoney(0)).toThrow('Amount must be positive');
});
```
