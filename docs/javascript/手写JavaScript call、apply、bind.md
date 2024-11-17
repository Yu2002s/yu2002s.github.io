---
title: 手写JavaScript call、apply、bind
createTime: 2024/06/06 19:03:04
permalink: /article/xn57znxm/
tags: [手写]
---

call、apply、bind 可以改变函数的 this 指向，简单实现这个功能，面试题也经常问这个。

<!-- more -->

#### call

呼叫对象来调用函数

```js
// 将方法定义在原型上，这样就不用重复定义了
Function.prototype.myCall = function (context, ...args) {
  // 判断是不是函数调用myCall方法
  if (typeof this !== "function") {
    throw new TypeError("Not a function")
  }

  // 检查context的上下文
  if (!context || typeof context !== "object") {
    // 如果不是浏览器环境下，就复制node环境的全局对象this
    context = window || globalThis
  }

  // 确保属性永远不会重复
  const key = Symbol("myCall")
  // 将context添加属性key，并赋值this
  context[key] = this
  let result
  try {
    // 使用传入的context对象来调用对象上的方法并传入参数
    result = context[key](...args)
  } finally {
    // 防止方法内发生异常，导致symbol属性没有被删除
    delete context[key]
  }
  // 最后返回方法的返回值
  return result
}

function method() {
  console.log(this) // {a: 1}
}

// 调用自定义的myCall方法
method.myCall({ a: 1 }, 1, 2, 3)
```

#### apply

和 call 差不多，就是传参方式变了

#### bind

bind 调用之后是返回一个新的方法，然后会把两个方法的参数进行一个合并返回

```js
const obj = {
  a: 1,
  method: function (...args) {
    console.log(this, args) // {a: 2}, 2, 1
  },
}

Function.prototype.myBind = function (context, ...args) {
  // 这里省略一些判断
  const key = Symbol("myBind")
  context[key] = this
  // 返回一个新的方法
  return function (...newArgs) {
    // 将两个参数进行合并并使用context调用
    const result = context[key](...args, ...newArgs)
    delete context[key]
    // 返回结果
    return result
  }
}
const bindFunc = obj.method.myBind({ a: 2 }, 2)

bindFunc(1)
```
