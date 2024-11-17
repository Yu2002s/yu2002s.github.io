---
title: JS中的继承实现
createTime: 2024/06/12 08:21:18
permalink: /article/sphl40t1/
---

将两个对象的共有属性合成一块，避免书写重复代码，使用 js 实现对象继承。

下面代码有两个构造函数，其中一个构造函数上的属性基于另一个构造函数。

<!-- more -->

```js
// 用户对象，包含用户名和密码
function User(username, password) {
  this.username = username
  this.password = password
}

// 原型上有一个方法
User.prototype.playFreeVideo = function () {
  console.log("播放免费视频")
}

// VIP用户对象，继承用户对象，并添加过期时间
function VipUser(username, password, expired) {
  this.username = username
  this.password = password
  this.expired = expired
}

// vip用户也有普通用户的方法
VipUser.prototype.playFreeVideo = function () {
  console.log("播放免费视频")
}

// vip用户独有的方法
VipUser.prototype.playVipVideo = function () {
  console.log("播放付费视频")
}
```

使用上面的结构可以实现功能，但是代码重复了，需要使用原型链知识进行优化

```js
// 用户对象，包含用户名和密码
function User(username, password) {
  this.username = username
  this.password = password
}

// 原型上有一个方法
User.prototype.playFreeVideo = function () {
  console.log("播放免费视频")
}

// VIP用户对象，继承用户对象，并添加过期时间
function VipUser(username, password, expired) {
  // 使用当前this调用父类构造函数，实现继承
  // User中的属性将会添加到当前对象的this环境下
  // 这样的写法，相当于把User中的属性都复制一份到VipUser中
  User.call(this, username, password)
  this.expired = expired
}

// 将VipUser的原型的隐式原型指向User的原型，实现继承普通用户方法
// 相当于VipUser.prototype.__proto__ = User.prototype
Object.setPrototypeOf(VipUser.prototype, User.prototype)

// vip用户独有的方法
VipUser.prototype.playVipVideo = function () {
  console.log("播放付费视频")
}
```

`Object.setPrototypeOf(VipUser.prototype, User.prototype)`

设置隐式原型，使得 VipUser 也能使用 User 对象上的方法

[对于原理可以看->原型链](http://jdynb.xyz/article/17)
