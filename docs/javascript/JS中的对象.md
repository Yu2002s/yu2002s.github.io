---
title: JS中的对象
createTime: 2024/06/06 19:35:48
permalink: /article/i9343ppt/
tags: [对象]
---

对象是一个复合值，它汇聚多个值（原始值和其他对象）并允许我们按名字存储和获取这些值。对象是一个属性的无序集合，每个属性都有名字和值。

在 javascript 中，任何不是字符串、数值、符号或 `true`、`null`、`undefine`、`false`的值都是对象。即使字符串、数值、布尔值不是对象，他们的行为也类似不可修改的对象。

<!-- more -->

除了名字和值之外，每个属性还有三个特性：

writeable（可写）特性指定是否可以修改设置属性的值。
enumerable（可枚举）特性指定是否可以在 for/in 循环中返回属性的名字
configurable（可配置）特性指定是否可以删除属性，以及是否可修改其特性

#### 创建对象

1.字面量

```js
const obj = {}
```

2.new

```js
const = new Object()
```

3.create

```js
const obj = Object.create({ a: 1 }) // 第一个参数作为新对象的原型
```

没有原型的对象

```js
const obj = Object.create(null) // 没有原型的对象
```

#### 测试属性

in 操作符，要求左边是一个属性名，右边是一个对象。如果对象有包含响应名字的自有属性或继承属性，将返回 true

```js
const obj = { a: 1 }
"a" in obj // true
"b" in obj // false
"toString" in obj // obj继承了toString方法
```

对象的`hasOwnProperty`方法用于测试对象是否给定名字的属性，对继承的属性，它返回 false

```js
const obj = { a: 1 }
o.hasOwnProperty("a") // true
o.hasOwnProperty("toString") // false, toString是继承来的
```

propertyIsEnumerable()
如果传入的属性名是自由属性且这个属性是 enumerable 的

```js
const obj = { a: 1 }
obj.propertyIsEnumerable("a") // true
obj.propertyIsEnumerable("toString") // false, 不是自有的
Object.prototype.propertyIsEnumerable("toString") // false, 不可枚举的
```

Object.keys 返回对象可枚举自由属性的数组，不包含符号
Object.getOwnPropertyNames，与 Object.keys 类似，但也会返回不可枚举自有属性名的数组，只要它们的名字是字符串
Object.getOwnPropertySymbols，返回名字是符号的自有属性，无论是否可枚举
Reflect.ownKeys,返回所有属性名
