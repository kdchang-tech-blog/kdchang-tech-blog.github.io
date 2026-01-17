---
title: JavaScript 物件導向（Object-oriented programming）入門教學筆記 | 學習筆記
date: 2021-01-16 11:33:41
authors: kdchang
tags: 
    - 前端
    - 前端開發
    - 前端工程
    - frontend
    - javascript
    - this
    - OOP
    - Object-oriented programming
    - frontend engineer

---

## 1. 物件導向與 `new` 關鍵字
JavaScript 是基於 **原型 (Prototype)** 的物件導向語言，而非典型的 **類別 (Class)** 為基礎的語言。但 ES6 之後，JavaScript 引入了 `class` 語法，使其更接近傳統的物件導向語言，如 Java 或 C++。

在 JavaScript 中，`new` 關鍵字用於建立物件，並且會執行以下步驟：
1. 建立一個新的空物件。
2. 設定該物件的 `__proto__` 指向建構函式 (Constructor) 的 `prototype`。
3. 執行建構函式內的程式碼，並將 `this` 綁定到新建立的物件。
4. 如果建構函式沒有明確返回物件，則回傳該新物件。

範例：
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person("John", 30);
console.log(john.name); // John
console.log(john.age);  // 30
```

---


## 2. `__proto__` vs `prototype`
在 JavaScript 中，`__proto__` 和 `prototype` 是兩個不同的概念。

### `prototype`
`prototype` 是**建構函式**的一個屬性，它是一個物件，當我們使用 `new` 建立物件時，該物件的 `__proto__` 會指向 `prototype`。

範例：
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, I am " + this.name);
};

const dog = new Animal("Dog");
dog.sayHello(); // Hello, I am Dog
console.log(dog.__proto__ === Animal.prototype); // true
```

### `__proto__`
`__proto__` 是物件的內部屬性，指向該物件的**原型**，即 `prototype`。

範例：
```javascript
console.log(dog.__proto__); // Animal.prototype
console.log(dog.__proto__.__proto__ === Object.prototype); // true
console.log(dog.__proto__.__proto__.__proto__); // null (最終的原型鏈結束)
```

**關鍵點整理：**
- `prototype` 是**函式**的屬性。
- `__proto__` 是**物件**的屬性，指向它的 `prototype`。
- `Object.prototype` 是所有物件的最終原型。

---

## 3. `class` 關鍵字
ES6 之後，JavaScript 引入了 `class` 語法，使物件導向的寫法更直覺。

### 定義類別 (Class)
```javascript
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  drive() {
    console.log(this.brand + " is driving");
  }
}

const myCar = new Car("Toyota");
myCar.drive(); // Toyota is driving
```

**等同於 ES5 的寫法：**
```javascript
function Car(brand) {
  this.brand = brand;
}

Car.prototype.drive = function() {
  console.log(this.brand + " is driving");
};
```

**優勢：**
- `class` 提供更簡潔的語法。
- 更貼近傳統物件導向語言的語法風格。
- `constructor` 方法負責初始化物件。
- 方法定義在 `prototype` 上，並不會重複創建。

---

## 4. `extends` 繼承
在 ES6 之前，我們使用 `Object.create()` 或手動設定 `prototype` 來實現繼承。

### 傳統的原型繼承
```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.makeSound = function() {
  console.log("Some generic sound");
};

function Dog(name, breed) {
  Animal.call(this, name); // 繼承屬性
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // 繼承方法
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log("Woof!");
};

const myDog = new Dog("Rex", "Golden Retriever");
myDog.makeSound(); // Some generic sound
myDog.bark(); // Woof!
```

### 使用 `class` 的繼承
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 呼叫父類別的 constructor
    this.breed = breed;
  }
  bark() {
    console.log("Woof!");
  }
}

const myDog = new Dog("Rex", "Golden Retriever");
myDog.makeSound(); // Some generic sound
myDog.bark(); // Woof!
```

**關鍵點：**
- `extends` 用於建立類別的繼承。
- `super(name)` 呼叫父類別的 `constructor`，確保 `this` 正確初始化。
- 子類別可以新增自己的方法。

---

## 5. 物件導向開發的最佳實踐
1. **使用 `class` 提供更清晰的結構。**
2. **使用 `extends` 來建立繼承關係，並呼叫 `super()` 確保正確初始化。**
3. **方法定義於 `prototype` 來減少記憶體浪費。**
4. **理解 `__proto__` 和 `prototype` 之間的關係，以便更好地管理原型鏈。**
5. **避免過度使用繼承，適時使用組合 (Composition) 來降低耦合度。**

---

## 6. 總結
| 特性 | 傳統原型 (Prototype) | ES6 `class` |
|------|------------------|------------|
| 建立物件 | `new Function()` | `new Class()` |
| 方法定義 | `Function.prototype.method = function() {}` | 直接定義於 `class` |
| 繼承 | `Object.create()` + `call()` | `extends` + `super()` |
| `this` 綁定 | 需要 `call()` 或 `bind()` | `super()` 自動綁定 |

JavaScript 的物件導向概念提供了靈活的方式來組織程式碼，掌握 `prototype`、`class`、`extends` 和 `super()`，可以幫助開發者寫出更具可讀性與可維護性的程式碼。

