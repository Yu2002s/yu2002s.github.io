---
title: JavaScript中的Proxy
createTime: 2024/08/04 21:02:22
permalink: /article/ku3x50f3/
tags: [Proxy]
---

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

<!-- more -->

基本语法：

```js
const p = new Proxy(target, handler)
```

target: 要使用 Proxy 包装的对象，

handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为。

下面是一个基本示例，当访问对象上的一个不存在的属性时，默认返回 37

```js
const obj = {}

const p = new Proxy(obj, {
  // get方法，当对象上的属性被访问时触发，target为被代理的对象，prop为被访问的属性
  get(target, prop) {
    // 判断属性是否在对象上，如果有则返回对应的值，没有则固定返回一个值
    return prop in target ? target[prop] : 37
  },
})

p.a = "a" // 设置属性a的值为a
p.b = undefined // 设置属性b的值为undefined

// 当访问对象上不存在的属性时，会触发get方法，返回37
console.log(p.a, p.b, p.c) // a undefined 37
```

无操作转发代理，代理会将所有作用到代理对象上的操作转发到原本对象上，**但需要注意的是，代理对象并不等于原对象**

```js
const obj = {}

const proxy = new Proxy(obj, {})

// 当修改代理对象上的属性时，被代理的对象也会随之改变
proxy.a = 37

console.log(obj.a) // 37
```

如果需要代理的对象是不可配置或不可写的，则 get handler 返回值将与原来属性值相同

```js
const obj = {}

Object.defineProperty(obj, "a", {
  // 不可配置，设置为false，a属性将不能被delete，属性特性将不能被修改，不能使用属性访问器特性
  configurable: false,
  // 不可写，属性是只读的
  writable: false,
  // 不可枚举，循环迭代将不会输出a属性
  enumerable: false,
  // 属性值
  value: 10,
})

const proxy = new Proxy(obj, {
  get(target, prop) {
    return 20
  },
})

// console.log(proxy.a); // throw TypeError，因为 a 属性不可枚举
console.log(proxy.b) // 20

// proxy.a = 20; 将会报错，因为这个属性是只读的

// console.log(proxy["a"]); // 将会报错，不能使用属性访问器

// for (let k in obj) {
//   console.log(k); // 不会输出 a，因为 a 属性不可枚举
// }
```

通过代理你可以很轻松验证一个对象属性赋值，可以通过 set handler 进行赋值进行验证，如果返回 true 表示成功

```js
const obj = {}

const proxy = new Proxy(obj, {
  // set handler 接受三个参数 被代理的对象、属性名、将要进行赋值的属性值
  set(target, prop, value) {
    // 判断属性名是否时age属性
    if (prop === "age") {
      // 对属性值进行验证
      if (!Number.isInteger(value)) {
        throw new Error("Age must be an integer")
      }
      // 大于200也抛出错误
      if (value > 200) {
        throw new Error("Age must be less than 200")
      }
    }
    // 如果验证成功，则进行赋值
    target[prop] = value
    // 返回true表示属性赋值成功
    return true
  },
})

proxy.age = 20 // 20，验证通过，赋值成功
// proxy.age = "hello"; 赋值字符串，赋值失败
// proxy.age = 300; // 大于200，赋值失败

console.log(proxy.age, obj.age) // 20, 20
```

可撤销的 Proxy，Proxy 有一个静态方法可以对代理对象进行撤销

```js
const obj = { name: "vueJs" }

const { proxy, revoke } = Proxy.revocable(obj, {})

// 正常访问
console.log(proxy.name) // vueJs

// 撤销代理
revoke()

// console.log(proxy.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

校验器案例

```js
const obj = {
  name: "张三",
  _id: 1234,
}

// 自定义校验器
const validator = {
  // 这里是属性的校验条件
  name(val) {
    return typeof val === "string" && val.length > 3
  },
  _id(val) {
    return typeof val === "number" && val > 0
  },
}

const createValidator = (obj, validator) => {
  return new Proxy(obj, {
    _validator: validator,
    set(target, prop, value, proxy) {
      if (!this._validator[prop](value)) {
        throw new Error(`Invalid value for ${prop}`)
      } else {
        return Reflect.set(target, prop, value, proxy)
      }
    },
  })
}

const proxy = createValidator(obj, validator)

proxy.name = "李四" // 校验不通过
```

通过反射实现私有属性读写拦截

```js
const obj = {
  name: "vueJs",
  _id: 1,
}

const proxy = new Proxy(obj, {
  set(target, prop, value, proxy) {
    if (prop[0] === "_") {
      throw new Error("You cannot set a private property")
    }
    return Reflect.set(target, prop, value, proxy)
  },
  get(target, prop, proxy) {
    if (prop[0] === "_") {
      throw new Error("You cannot get a private property")
    }
    return Reflect.get(target, prop, proxy)
  },
})

proxy.name // 可以访问
proxy._id // 报错
```
