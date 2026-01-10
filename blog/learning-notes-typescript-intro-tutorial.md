---
title: TypeScript 入門教學筆記 | 學習筆記
date: 2024-12-03 02:23:41
author: kdchang
tags:
  - typescript
  - 前端
  - 前端開發
  - 前端工程
  - frontend
  - frontend engineer
  - CSS
---

# 一、什麼是 TypeScript？

TypeScript 是由 Microsoft 開發的 JavaScript 超集（Superset），提供靜態型別檢查（Static Type Checking），讓開發者在編譯時發現錯誤，提升程式碼的可靠性與可維護性。TypeScript 會被編譯為標準 JavaScript，並可以運行於任何支援 JavaScript 的環境，例如瀏覽器或 Node.js。

### TypeScript 的主要特點

1. **靜態型別檢查**：在開發階段偵測類型錯誤，減少潛在錯誤。
2. **強大的 IDE 支援**：提供自動補全、型別推斷等功能，提高開發效率。
3. **物件導向特性**：支援類別（Class）、介面（Interface）、泛型（Generics）等功能。
4. **相容 JavaScript**：可以與現有的 JavaScript 程式碼共存，逐步導入 TypeScript。
5. **模組化開發**：支援 ES6+ 模組系統，便於管理大型應用程式。

---

# 二、安裝與設定 TypeScript

### 1. 安裝 TypeScript

可以使用 npm 來安裝 TypeScript：

```sh
npm install -g typescript
```

安裝完成後，可以使用以下指令來檢查 TypeScript 版本：

```sh
tsc -v
```

### 2. 初始化 TypeScript 專案

在專案目錄中執行以下指令，產生 `tsconfig.json` 設定檔：

```sh
tsc --init
```

這個設定檔可以調整 TypeScript 的編譯選項，例如輸出目錄、是否允許隱式 `any` 類型等。

---

# 三、基本語法

## 1. 變數與型別

TypeScript 透過 `:` 來指定變數的型別：

```ts
let name: string = 'Alice';
let age: number = 25;
let isStudent: boolean = true;
```

也可以使用 `any` 來允許變數接受任何型別：

```ts
let value: any = 'Hello';
value = 123; // 不會報錯
```

### 2. 陣列與元組

可以使用 `type[]` 來定義陣列型別：

```ts
let numbers: number[] = [1, 2, 3, 4];
let names: string[] = ['Alice', 'Bob'];
```

元組（Tuple）允許指定固定數量與型別的元素：

```ts
let person: [string, number] = ['Alice', 25];
```

### 3. 物件與介面

可以使用 `interface` 來定義物件的結構：

```ts
interface Person {
  name: string;
  age: number;
  isStudent?: boolean; // 可選屬性
}

let user: Person = {
  name: 'Alice',
  age: 25,
};
```

### 4. 函式與型別

函式的參數與回傳值可以明確指定型別：

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

若函式沒有回傳值，可以使用 `void`：

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

也可以使用箭頭函式語法：

```ts
const multiply = (a: number, b: number): number => a * b;
```

### 5. 型別別名（Type Alias）

`type` 關鍵字可以為型別取別名：

```ts
type ID = string | number;
let userId: ID = 123;
```

---

# 四、進階語法

### 1. Enum（列舉型別）

`enum` 允許定義一組具有特定名稱的數值：

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
```

### 2. 泛型（Generics）

泛型允許函式或類別支援不同的型別，提高可重用性：

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>('Hello'));
console.log(identity<number>(123));
```

泛型也可用於類別：

```ts
class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

let stringBox = new Box<string>('TypeScript');
let numberBox = new Box<number>(100);
```

### 3. 類別與繼承

TypeScript 提供完整的類別支援，與 JavaScript ES6 類似：

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let alice = new Person('Alice');
alice.greet();
```

繼承類別：

```ts
class Student extends Person {
  studentId: number;
  constructor(name: string, studentId: number) {
    super(name);
    this.studentId = studentId;
  }
}

let bob = new Student('Bob', 123);
bob.greet();
```

### 4. 非空斷言（Non-null Assertion）

可以使用 `!` 來告訴 TypeScript 變數一定不會是 `null` 或 `undefined`：

```ts
let value: string | null = 'Hello';
console.log(value!.length);
```

---

# 五、TypeScript 與 JavaScript 的比較

| 特性       | JavaScript | TypeScript       |
| ---------- | ---------- | ---------------- |
| 型別檢查   | 無         | 靜態型別檢查     |
| 介面       | 無         | 有介面與型別定義 |
| 類別與繼承 | ES6+ 支援  | 支援完整 OOP     |
| 泛型       | 無         | 支援泛型開發     |
| Enum 列舉  | 無         | 有內建 Enum      |
| 編譯時錯誤 | 無         | 可提前檢查錯誤   |

---

# 六、TypeScript 專案開發

TypeScript 可與現代開發工具整合，如 Webpack、Babel 等。例如，在 React 或 Vue 開發中，可以使用 TypeScript 提供的型別檢查來提升程式碼質量。

在專案中安裝 TypeScript 相依套件：

```sh
npm install typescript @types/node --save-dev
```

若要搭配 React，則需安裝 `@types/react` 和 `@types/react-dom`：

```sh
npm install @types/react @types/react-dom --save-dev
```

---

# 七、總結

TypeScript 提供靜態型別檢查、模組化開發、泛型與完整的物件導向特性，使 JavaScript 程式碼更安全、可維護且容易擴展。透過與現有 JavaScript 相容的特性，可以逐步導入 TypeScript，提升專案的開發體驗與效能。在現代前端與後端開發中，TypeScript 已成為主流選擇之一。
