---
title: JS中的原型-渡一大师课
createTime: 2024/06/06 07:25:45
permalink: /article/a9asusys/
tags: [原型]
---

![原型](https://s21.ax1x.com/2024/06/06/pkYFbge.png)

##### 原型

每个函数都有一个自己的属性`prototype`，这个属性的值是一个普通对象，称之为原型对象

##### 实例

通过 new 产生的对象称之为实例

##### 隐式原型

每个实例都有一个特殊属性**proto**，称之为隐式原型，它指向构造函数的原型

```js
function User(name, age) {
  this.name = name
  this.age = age
}

var user = new User()

console.log(user.__proto__ === User.prototype) // true
```

当访问实例上的属性时，先从自身对象上找，如果没有，会自动从隐式原型中寻找

```js
function User(name, age) {
  this.name = name
  this.age = age
}

User.prototype.sayHi = function () {
  console.log("Hi, I am " + this.name + ", I am " + this.age + " years old")
}

var user = new User()

user.sayHi()
```

> 一般开发时候，会把构造函数中函数放在原型上
