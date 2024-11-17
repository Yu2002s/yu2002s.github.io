---
title: Js中的原型链-渡一教育
createTime: 2024/06/07 08:16:06
permalink: /article/7tsf7d46/
tags: [原型链]
---

原型对象本身也是个对象，默认情况下，是通过`new Object` 创建的。

<!-- more -->

![图片](https://s21.ax1x.com/2024/06/07/pkYj3ct.png)

![图片](https://s21.ax1x.com/2024/06/07/pkYjJnf.png)

`Object.prototype.__proto__`**比较特殊，他固定指向 null**

```js
console.log(Object.prototype.__proto__) // null
```

可以看出，user 的原型形成了一条链条，称之为原型链

当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找

---

`Object`的隐式原型(`Object.__proto__`)等于 Function 的原型(Function.prototype)

```js
console.log(Object.__proto__ === Function.prototype) // true
```

**原型链**

![原型链](https://s21.ax1x.com/2024/06/07/pkYjUAg.png)

```js
console.log(User.__proto__ === Function.prototype) // true

console.log(Function.prototype.__proto__ === Object.prototype) // true

console.log(Function.__proto__ === Function.prototype) // true
```
