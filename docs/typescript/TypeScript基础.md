---
title: TypeScript基础
createTime: 2024/08/13 20:49:59
permalink: /article/9ynys8xt/
tags: [TypeScript]
---

### 接口

在接口中进行函数声明有以下的两种方式

```ts
interface User {
  name: string
  age: number
  // 第一种声明函数方式
  sayHello: () => void
  // 第二种es声明函数的方式
  sayHi(): void
}
```

对应的实现对象

```ts
const user: User = {
  name: "John",
  age: 30,
  sayHello() {
    console.log(this.name)
  },
}

user.sayHello()
```

定义函数类型的接口

```ts
/**
 * 函数参数类型接口
 */
interface Dog {
  (age: number): boolean
}
```

使用类型别名可以这样写

```ts
/**
 * 使用类型别名定义函数类型
 */
type Dog = {
  (age: number): boolean
}
```

具体实现的方法

```ts
function createDog(dog: Dog) {
  if (dog(1)) {
    console.log("This is a dog")
  }
}
```

接口继承

```ts
interface User {
  name: string
}

interface VipUser extends User {
  name: number
}
```

已有的属性将不能被覆盖，上面将会报错。(**注意，这种情况只是出现在两种相同属性不同类型时**)

使用类型别名的方式则可以进行覆盖

```ts
type User = {
  name: string
}

type VipUser = {
  name: number
} & User

const u: VipUser = {
  name: "1",
}
```

### 枚举

使用枚举可以写出更优雅的代码，当我们需要对值进行修改时，可以直接修改，而无需手动修改。

```ts
/**
 * 枚举类型不赋值的话默认是number类型，从0开始。
 */
enum Sex {
  Male,
  Female,
}
```

使用字符串类型的枚举值

```ts
enum Sex {
  male = "男",
  female = "女",
}
```

可以使用对象的 `Object.values`获取枚举中所有的值

```ts
Object.values(Sex).forEach((item) => {
  console.log(item)
})
```

### 函数重载

```ts
/**
 * 函数的重载
 * @param a
 * @param b
 */
function sum(a: number, b: number): number
function sum(a: string, b: string): string

/**
 * 具体实现
 * @param a
 * @param b
 * @returns
 */
function sum(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a * b
  } else if (typeof a === "string" && typeof b === "string") {
    return a + b
  }
  return 0
}
```

通过重载，我们可以进行以下调用方法

```ts
sum(1, 2)
sum("1", "2")
```

### 类

```ts
class User {
  readonly id: number // 不能改变
  // public name: string
  age: number
  gender: "男" | "女" = "男"
  pid?: string

  // 私有属性
  private publishNumber: number = 3 // 每天一共可以发布多少文章
  private currentNumber: number = 0 // 当前可以发布的文章数量

  constructor(public name: string, age: number) {
    this.id = Math.random()
    // this.name = name
    this.age = age
  }

  publish(title: string) {
    if (this.currentNumber < this.publishNumber) {
      console.log("发布一篇文章:", title)
      this.currentNumber++
    } else {
      console.log("你今日发布的文章数量已达到上限")
    }
  }

  /**
   * 私有方法
   * @returns
   */
  private getPublishNumber(): number {
    return this.publishNumber
  }
}
```

具体使用

```ts
const u = new User("aa", 2)

console.log(u.name)

u.gender = "女"

u.publish("文章1")
u.publish("文章2")
u.publish("文章3")
u.publish("文章4")
u.publish("文章5")
```

### 泛型

约束在类身上，泛型可以约束在方法、参数、类

```ts
class ArrayHelper<T> {
  shuffle(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = this.getRandomNumber(0, arr.length)
      const temp = arr[i]
      arr[i] = arr[randomIndex]
      arr[randomIndex] = temp
    }
    return arr
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
  }
}
```

泛型也可以继承哦，这样就可以有了约束

```ts
interface HasNameProperty {
  name: string
}

/**
 * 泛型约束
 */
function getName<T extends HasNameProperty>(o: T): string {
  return o.name
}
```

多泛型

```ts
function mixinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if (arr1.length !== arr2.length) {
    throw new Error("数组长度不一致")
  }
  const result: (T | K)[] = []
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i])
    result.push(arr2[i])
  }
  return result
}
```

具体使用

```ts
const arr1 = [1, 2, 3]
const arr2 = ["1", "2", "3"]

console.log(mixinArray(arr1, arr2))
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2016", // 编译后目标代码版本
    "module": "CommonJS", // 设置编译结果中使用的模块化标准
    "lib": ["ES6"], // 运行环境
    "outDir": "./dist", // 编译输出目录
    "strictNullChecks": true, // 可以获得更严格的空类型检查，从此以后null、undefined只能赋值给自身
    "moduleResolution": "Node", // 设置解析模块的模式
    "noImplicitUseStrict": false, // 编译结果中不使用"use strict"
    "removeComments": true, // 编译结果中删除注释
    "noEmitOnError": true, // 错误时不生成错误结果
    "esModuleInterop": true, // 启用es模块化交互非es模块导出
    "strictPropertyInitialization": true // 更加严格的属性初始化检查
  },
  "include": ["./src"] // 需要编译的文件
}
```

### 字典

```ts
export type CallBack<T, U> = (key: T, val: U) => void

export class Dictionary<K, V> {
  private keys: K[] = []
  private vals: V[] = []

  /**
   * 访问器属性
   */
  get size() {
    return this.keys.length
  }

  /* set size(val: number) {

  } */

  set(key: K, val: V) {
    const index = this.keys.indexOf(key)
    if (index === -1) {
      this.keys.push(key)
      this.vals.push(val)
    } else {
      this.vals[index] = val
    }
  }

  get(key: K): V | undefined {
    const index = this.keys.indexOf(key)
    if (index !== -1) {
      return this.vals[index]
    }
    return undefined
  }

  forEach(callback: CallBack<K, V>) {
    this.keys.forEach((k, i) => {
      const v = this.vals[i]
      callback(k, v)
    })
  }

  has(key: K) {
    return this.keys.includes(key)
  }

  delete(key: K) {
    const index = this.keys.indexOf(key)
    if (index !== -1) {
      this.keys.splice(index, 1)
      this.vals.splice(index, 1)
      return true
    }
    return false
  }
}
```
