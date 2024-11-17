---
title: JS中的迭代器和生成器
createTime: 2024/07/20 15:06:58
permalink: /article/c89zh3kw/
---

```js
// 迭代器
const obj = {
  values: [1, 3, 5, 6],
  [Symbol.iterator]() {
    let index = 0
    return {
      next() {
        return {
          value: obj.values[index++],
          done: index > obj.values.length,
        }
      },
      return() {
        console.log("迭代器完成")
        return {
          value: undefined,
          done: true,
        }
      },
      throw() {},
    }
  },
}
```

`Symbol.iterator`：迭代器必备的属性，有这个属性就代表是迭代器

其中迭代器返回一个对象，对象中包含：

1. next 函数：这个函数返回一个对象，对象中含有 value、done，value 表示迭代器迭代的值，done 表示迭代是否完成。
2. return()函数：当迭代完成时会进入函数，返回和 next 函数一样的对象结构。
3. throw()函数：当迭代器异常终止时会进入这个函数。

```js
//   let index = 0
//   for (const o of obj) {
//     console.log(o) // 1， 3

//     if (++index === 2) {
//         break
//     }
//   }
```

**生成器**，可以为迭代器提供数据进行迭代

```js
// 生成器
function* fn() {
  const a = yield 1
  console.log(a)
  const b = yield 2
  console.log(b)
}
```

```js
const iterator = fn()

// 手动调用next方法
iterator.next() // { value: 1, done: false }

// 使用for of方法进行迭代
for (let o of iterator) {
  console.log(o) // 1， 2
}
```
