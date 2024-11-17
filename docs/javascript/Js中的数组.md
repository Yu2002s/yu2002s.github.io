---
title: Js中的数组
createTime: 2024/06/08 14:47:12
permalink: /article/fdd4tdfq/
tags: [数组]
---

#### 创建数组的方式

1. 字面量
2. 可迭代对象使用...扩展运算符
3. `Array()`构造函数
4. 工厂方法 `Array.of()`和 `Array.from()`

`Array()`构造函数

```js
// 空数组
const arr = new Array()
```

指定长度

```js
// 长度为10的数组，元素未定义
const arr = new Array(10)
```

传入两个或更多参数时

```js
const arr = new Array(1, 2, 3, "a", "b", "c")
```

> 这样调用的话，构造函数参数会成为新数组的元素，在使用数值参数调用 Array 构造函数时，这个参数时数组的长度，这也就意味着使用`Array`构造函数无法创建一个元素的数组。`Array.of`在 ES6 中就会为了解决这个问题。

`Array.of`

```js
Array.of(1, 2, 3) // [1, 2, 3]
```

`Array.from`

`Array.from`是`ES6`新增的另一个工厂方法，这个方法期待一个可迭代对象或类数组对象作为第一个参数，并返回该对象元素的新数组。如果传入可迭代对象，`Array.from(iterable)`与使用扩展运算符`[...iterable]`一样。因此它是创建数组副本的一种方法。

```js
const copy = Array.from(original)
```

第二个参数接受一个函数，在新建数组时，源对象的每个元素都会传入这个函数，这个函数的返回值将替代原始值。

```js
// 类数组
const obj = {
  0: "a",
  1: 1,
  length: 2,
}

// 使用from方法进行复制
const copy = Array.from(obj, (v, k) => {
  // 返回一个新值，将替代原来的值
  // k是键，v是值
  return {
    key: k,
    value: v,
  }
})

console.log(copy) // [ { key: 0, value: 'a' }, { key: 1, value: 1 } ]
```

#### 读写数组

由于数组就是一个特殊的对象属性，所以`javascript`数组没有所谓的越界错误。查询任何对象不存在的属性都不会导致错误，只会返回`undefined`。数组作为一种特殊对象也是如此。

```js
const a = []
a[-1.23] = true // 创建一个属性“-1.23”
a["1000"] = 0 // 这是数组第1001个元素
a[1.0] = 1 // 数组索引1，相当于a[1] = 1
```

使用普通对象

```js
const o = {}
o[1] = "one"
o["1"] // "one",数值和字符串属性名是同一个
```

#### 稀疏数组

稀疏数组就是其元素没有从 0 开始的索引的数组。正常情况下，数组的`length`属性表明数组中的元素的个数。如果数组是稀疏的，则`length`属性的值会大于元素的个数。可以使用`Array`构造函数创建稀疏数组，或者直接给大于当前数组`length`的数组索引赋值。

```js
const a = new Array(5) // 没有元素，但是a.length是5
a = [] // 创建一个空数组，此时length = 0
a[1000] = 0 // 赋值增加了一个元素，但length变成了1001
```

注意，使用`[1,,3]`这样也会得到一个稀疏数组，被省略的元素时不存在的：

```js
cosnt arr1 = [,] // 这个数组没有元素，但是length是1
const arr2 = [undefined] // 这个数组有一个undefined元素
0 in arr1 // false: arr1在索引0没有元素
0 in arr2 // true: arr2在索引0有一个undefined元素
```

#### 数组长度

```js
const arr = [1, 2, 3, 4, 5]
arr.length = 3 // a变成了[1, 2, 3]
arr.length = 0 // a变成了空数组
arr.length = 5 // 长度是5，但是没有元素，类似new Array(5)
```

#### 迭代数组

到`ES6`为止，遍历一个数组（或任何可迭代对象）的最简单的方式就是使用`for/of`循环

```js
const arr = [..."hello world"] // 展开字符串元素
let string = ""
for (let letter of arr) {
  string += letter
}

console.log(string) // "hello world"
```

如果要对数组使用 `for/of`循环，并且想知道数组元素的索引，可以使用数组的 `entries()` 方法和结构赋值。对于稀疏数组，这个循环没有特殊行为，凡是不存在的都返回`undefined`

```js
const arr = [..."hello"]
for (let [index, item] of arr.entries()) {
  console.log(index, item)
}
```

另一种迭代方式是使用`forEach()`。他并不是一种新的`for`循环，而是数组提供的一种用于自身迭代的函数式方法。

```js
const arr = [1, 2, 3]

arr.forEach((item, index) => {
  console.log(item, index)
})
```

> 与`for/of`不同，`forEach`能够感知稀疏数组，不会对没有的元素调用函数。

#### 数组其他方法

`flat、flatMap`打平数组

在`ES2019`中，`flat()`方法用于创建并返回一个新数组，这个新数组包含与它调用`flat()`的数组相同元素，只不过其中任何本身也是数组的元素也会被“**打平**”填充到返回的数组中。

```js
[1, [2, 3]].flat() // [1, 2, 3]
[1, [2, [3]]]).flat() [1, 2, [3]]
```

如果想打平多层级，需要给`flat`传递参数。

调用`arr.flapMap(fun)` 等同于（但效率高于）`a.map().flap()`

```js
const arr = ["hello world", "the definitive guide"]
const words = arr.flatMap((item) => item.split(" "))
console.log(words) // ["hello", "world", "the", "definitive", "guide"]
```

`fill` 填充数组

```js
const arr [1, 2, 3]
arr.fill(0) // [0, 0, 0]
arr.fill(9, 1) // [0, 9, 9] 从索引1开始填充
arr.fill(8, 1, -1) // [0, 8, 9] // 从索引1开始到索引结束（不包含结束）填充
```

`copyWithin()` 把数组切片赋值到数组中的新位置

```js
const arr = [1, 2, 3, 4, 5]
arr.copyWithin(1) // [1, 1, 2, 3, 4] 把元素赋值到索引1及之后
```

#### 排序

要对数组元素执行非字符顺序的排序，必须给`sort`传一个比较函数作为参数。这个函数决定它的两个参数哪一个在排序后的数组中应该出现在前面。**如果第一个参数应该出现于第二个参数前面，比较函数应该返回一个小于 0 的数值。如果第一个参数应该出现在第二个参数后面，比较函数应该返回一个大于 0 的数值。如果两个值相等（也就是它们的顺序不重要），则比较数应该返回 0。**

#### 数组判断

`Array.isArray` 用于确定一个未知值是不是数组。
