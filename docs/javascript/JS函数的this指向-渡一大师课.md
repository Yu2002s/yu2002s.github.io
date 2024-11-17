---
title: JS函数的this指向-渡一大师课
createTime: 2024/06/06 08:11:43
permalink: /article/59qr6kn3/
tags: [this]
---

不同场景，`this`指向也不同。在全局代码中使用 `this`，指向的是全局对象 `window`，在函数中使用 this，它的指向完全取决于它是如何调用的

<!-- more -->

| 调用方式      | 示例                    | 函数的 this 指向     |
| ------------- | ----------------------- | -------------------- |
| 通过 new 调用 | `new method()`          | 新对象               |
| 直接调用      | `method()`              | 全局对象             |
| 通过对象调用  | `obj.method()`          | 调用的对象           |
| call          | `method.call(context)`  | call 中的第一个参数  |
| apply         | `method.apply(context)` | apply 中的第一个参数 |

示例

```js
var obj = {
  a: 1,
  b: 2,
  method: function () {
    this.c.m() // 指向this.c，谁调用指向谁
  },
  c: {
    m() {
      console.log(this)
    },
  },
}

obj.method()

const copy = obj.c.m()
copy() // 指向window
```

call

```js
function m(a, b) {
  console.log(this, a, b) // this指向{a: 1}
}

m.call({ x: 1 }, 1, 2) // 改变this指向，并传参
```

apply，和 call 一样，传递参数形式不一样

```js
m.apply({ x: 1 }, [1, 2]) // 改变this指向，并传参
```

为所有对象打印键值对

```js
Object.prototype.print = function () {
  for (k in this) {
    if (k === "print") continue // 排除原型上的方法
    // if (!a.hasOwnProperty(k)) continue;
    console.log(k, this[k])
  }
}

const obj = {
  a: 1,
  b: 2,
  method: function () {
    console.log("method")
  },
}

obj.print()
```
