---
title: JS中的Set、Map、WeakSet、WeakMap
createTime: 2024/08/05 20:09:52
permalink: /article/p31xjkbl/
---

基本使用

```js
const set = new Set() // 通过构造器创建一个Set对象
const set = new Set([1, 2, 2, 3])
```

语法 ：`new Set([iterable]) `构造函数中可以接收数组或者可迭代对象，返回一个新的 set 对象

Set 去除数组中重复元素的作用

操作方法：

```js
const set = new Set() // 通过构造器创建一个Set对象

set.add("hello") // 添加一个元素
set.add(1)
set.add(2)

console.log(set) // 'hello' 1 2
console.log(set.has(1)) // true
console.log(set.size) // 3
set.delete(1) // 删除一个元素 true
set.delete(1) // 删除一个不存在元素 false
set.has(1) // false
set.clear() // 清空集合
```

遍历方法

```js
set.keys() // 返回一个迭代器对象，该对象包含集合中的所有键
set.values() // 返回一个迭代器对象，该对象包含集合中的所有值
set.entries() // 返回一个迭代器对象，该对象包含集合中的所有键值对
// 循环操作
set.forEach((value, key) => {
  console.log(value, key)
})
```

WeakSet：是一些对象的集合，他和 Set 相似，但是没有便利方法，存储的对象值也随时可能被垃圾回收

Map：存储键值对的集合，可能通过 for of 循环迭代出[key, value]形式数组

基本使用：

```js
const map = new Map()
map.set("name", "John")

console.log(map) // { 'name' => 'John' }

// 构造器可以传入一个数组或一个可迭代的对象，其中每个元素都是一个包含键值对的数组
const map2 = new Map([
  [1, "one"],
  [2, "two"],
])
console.log(map2)
```

一些方法：

```js
const map = new Map()
map.set("name", "John")

console.log(map.get("name")) // John

map.delete("name")

console.log(map.get("name")) // undefined

map.has("name") // false
map.size // 0

map.clear() // clear all the elements

map.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})
```

WeakMap：是一种键/值集合，不过键只能是一个对象，并且是弱引用的，值可以是任意类型。
