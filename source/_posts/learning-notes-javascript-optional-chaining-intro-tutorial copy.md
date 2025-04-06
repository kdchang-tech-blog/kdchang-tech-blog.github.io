---
title: JavaScript 可選鏈接運算符（Optional Chaining）介紹與入門教學 | 學習筆記
date: 2024-12-21 11:33:41
author: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - Optional Chaining

---

## 前言

在 `JavaScript` 中，處理深層嵌套結構時，我們經常會遇到 `null` 或 `undefined` 的問題。例如，當我們需要訪問一個對象的屬性，而該屬性本身可能不存在時，傳統的做法會導致錯誤，這樣的情況會非常繁瑣。為了解決這個問題，JavaScript 引入了 **可選鏈接運算符（Optional Chaining）**，簡化了屬性訪問過程，並防止了因為屬性為 `null` 或 `undefined` 造成的錯誤。

本文將詳細介紹可選鏈接運算符的概念、用法以及常見的實際應用場景。

### 1. 可選鏈接運算符的基本語法

**可選鏈接運算符（`?.`）** 是 JavaScript 中一種新的語法，通過它我們可以安全地訪問對象的屬性，並且在中途如果遇到 `null` 或 `undefined`，就會停止執行並返回 `undefined`，而不是拋出錯誤。

基本語法結構如下：

```js
object?.property
object?.[key]
object?.method()
```

- `object?.property`：如果 `object` 為 `null` 或 `undefined`，則返回 `undefined`，否則返回對象的 `property` 屬性。
- `object?.[key]`：這是動態屬性名的情況，與 `object?.property` 類似，當 `key` 是變數或表達式時，這種語法很有用。
- `object?.method()`：如果 `object` 或 `method` 為 `null` 或 `undefined`，則返回 `undefined`，不會調用該方法。

### 2. 為什麼需要可選鏈接運算符？

在傳統 JavaScript 中，當我們處理嵌套對象的屬性時，若某個屬性不存在或是 `null`、`undefined`，我們會遇到錯誤。例如：

```js
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
  },
};

console.log(user.address.street); // "123 Main St"
console.log(user.phone.number); // TypeError: Cannot read property 'number' of undefined
```

在這個例子中，當我們嘗試訪問 `user.phone.number` 時，由於 `phone` 屬性不存在，會拋出錯誤。為了解決這個問題，通常我們需要進行多層檢查：

```js
console.log(user && user.phone && user.phone.number); // undefined
```

這樣的寫法看起來雜亂，並且很難處理更深層次的嵌套。可選鏈接運算符解決了這個問題，使得代碼更加簡潔和安全。

### 3. 可選鏈接運算符的應用場景

#### 3.1 訪問對象屬性

當我們需要訪問對象的某一層屬性時，如果中間層級的某個屬性為 `null` 或 `undefined`，那麼使用可選鏈接運算符就能防止錯誤的拋出。

```js
const user = {
  name: 'Alice',
  address: {
    street: '123 Main St',
  },
};

console.log(user?.address?.street); // "123 Main St"
console.log(user?.phone?.number); // undefined
```

在這個例子中，`user?.address?.street` 會安全地返回 `street` 屬性，而 `user?.phone?.number` 會返回 `undefined`，因為 `phone` 屬性並不存在。

#### 3.2 訪問數組元素

在操作數組時，如果我們想訪問某個索引的元素，也可以使用可選鏈接運算符來避免錯誤。

```js
const array = [1, 2, 3];

console.log(array?.[1]); // 2
console.log(array?.[10]); // undefined
```

這裡，`array?.[1]` 會返回 `2`，而 `array?.[10]` 會返回 `undefined`，即使索引超出了數組的範圍。

#### 3.3 調用對象方法

如果對象的方法不存在，使用可選鏈接運算符可以避免拋出錯誤，並且返回 `undefined`。

```js
const user = {
  name: 'Alice',
  greet() {
    console.log('Hello!');
  },
};

user?.greet(); // "Hello!"
user?.sayGoodbye(); // undefined
```

在這個例子中，`user?.greet()` 會調用 `greet` 方法並顯示 "Hello!"，而 `user?.sayGoodbye()` 則返回 `undefined`，因為 `sayGoodbye` 方法不存在。

#### 3.4 動態屬性名

可選鏈接運算符也支持用動態屬性名來訪問對象屬性，這在處理具有不確定屬性的對象時非常有用。

```js
const user = {
  name: 'Alice',
  preferences: {
    theme: 'dark',
  },
};

const key = 'theme';
console.log(user?.preferences?.[key]); // "dark"
```

在這個例子中，`key` 是一個變量，表示要訪問的屬性名，`user?.preferences?.[key]` 可以安全地獲取 `preferences` 中的 `theme` 屬性。

### 4. 與傳統方法的比較

使用可選鏈接運算符，我們的代碼變得更加簡潔，減少了不必要的檢查。傳統的方式可能需要多次檢查對象的存在，才能安全地訪問某個屬性，而可選鏈接運算符讓這一過程變得直觀且易於維護。

傳統方法：

```js
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}
```

使用可選鏈接運算符：

```js
console.log(user?.address?.street);
```

### 5. 可選鏈接運算符與 `null` 合併運算符（`??`）

可選鏈接運算符經常與 `null` 合併運算符（`??`）一起使用。`??` 用來返回當前值是否為 `null` 或 `undefined`，如果是則返回其右側的值，否則返回當前值。

```js
const user = null;
const name = user?.name ?? 'Default Name';
console.log(name); // "Default Name"
```

在這裡，`user?.name` 會返回 `undefined`，因為 `user` 是 `null`，而 `??` 會將其替換為 `'Default Name'`。

### 6. 總結

可選鏈接運算符（`?.`）是 JavaScript 中非常實用的一個特性，它簡化了嵌套對象屬性訪問的邏輯，避免了 `null` 或 `undefined` 帶來的錯誤，使代碼更加簡潔且容易理解。無論是在處理複雜的 API 返回數據還是操作動態結構的對象時，可選鏈接運算符都能發揮重要作用。在日常開發中，我們可以利用它來編寫更健壯、可讀性更強的代碼。