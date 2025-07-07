---
title: TypeScript进阶
createTime: 2025/07/05 09:19:36
permalink: /article/a0yc5vsi/
tags: [TypeScript]
---

## 类和抽象类

```ts
// 抽象类
abstract class Tank {
    x: number = 0
    y: number = 0
    // 抽象成员，子类必须实现
    abstract name: string

    move(targetX, targetY): boolean {
        // 移动

        console.log('判断边界')

        if (this.rule(targetX, targetY)) {
            this.x = targetX
            this.y = targetY
            return true
        }

        return false
    }

    // 定义移动的规则
    protected abstract rule(targetX, targetY): boolean
}

class UserTank extends Tank {
    name: string = 'userTank'
    x: number = 20
    y: number  = 20

    // 默认构造器
    constructor() {
        super()
    }

    protected abstract rule(targetX, targetY) {
        // 自定义移动规则
        return true
    }
}

class OtherTank extends Tank {
    name: string = 'otherTank'
    x: number = 10
    y: number = 30

    protected abstract rule(targetX, targetY) {
        // 自定义移动规则
        return true
    }
}

const userTank = new UserTank()
const otherTank = new OtherTank()

userTank.move(1, 2)
otherTank.move(2, 3)
```

## 静态成员

```ts

class User {
    constructor(public loginId: string, loginPwd: string) {
    }

    // 静态方法
    static login(loginId: string, loginPwd: string): User | undefined {
        return undefined
    }
}

const result = User.login('', '')


```

## 接口

接口用户约束类、对象、函数，是一个类型契约。

```ts
// animals.ts

// 动物抽象类
export abstract class Animal {
    // 类型让子类进行实现
    abstract type: string

    constructor(
        public name: string,
        public age: number,
    )

    fun sayHello() {
        console.log(`我是${this.type}，我的名字是${this.name}，我今年${this.age}岁了`)
    }
}

export class Lion extends Animal implements IFireShow {
    type: string = "狮子"

    // 实现接口中的方法
    singleFire() {
        console.log('狮子进行单火圈表演')
    }

    doubleFire() {
        console.log('狮子进行双火圈表演')
    }
}

export class Tigger extends Animal implements IFireShow {
    type: string = "老虎"

    singleFire() {
        console.log('老虎进行单火圈表演')
    }

    doubleFire() {
        console.log('老虎进行双火圈表演')
    }
}

```

定义接口规范，拥有某种能力

```ts
// ./interfaces.ts

// 火圈表演
export interface IFireShow {
    singleFire(): void
    doubleFire(): void
}

```

所有会火圈表演的动物进行表演

```ts
// index.ts

const animals = [
    new Lion('辛巴', 12),
    new Tigger('泰哥', 11)
]

// 使用方法判断某个动物是否有火圈表演的能力
function hasFireShow(ani: object): ani is IFireShow {
    if ((ani as unknown as IFireShow).singleFire && (ani as unknown as IFireShow).doubleShow) {
        return true
    }
    return false
}

animals.forEach(a => {
    if (hasFireShow(a)) {
        a.singleFire()
        a.doubleFire()
    }
})

```

::: tip
接口和类型别名最大的区别是：接口可以被类实现，而类型别名不行
> 接口可以继承类
:::

## 索引器

`对象[值]`，使用成员表达式

```ts
const obj = {
    name: 'abc',
    age: 22,
    'my-pid': '123456'
}

for (const key in obj) {
    console.log(key, obj[key])
}

// name, abc
// age, 22

const methodName = 'sayHello'

class User {
    constructor(
        public name: string,
        public age: number
    ) {

    }

    // 动态方法名
    [methodName]() {
        console.log('test')
    }
}

const u = new User('test', 12)
u[methodName]() // 调用方法

```

::: tip
在 `ts` 中默认不对索引器（成员表达式）进行严格的类型检查

如果希望进行严格类型检查需要配置 `tsconfig.json` `noImplicitAny` 设置 `true` 对隐式 `any` 检查

隐式 `any` 类型指定是：`ts` 根据实际情况推导出来的类型

在类中索引器书写的位置在最上方

:::

ts 索引器写法

```ts
class User {

    // 索引器，对类里所有成员进行类型限制
    // 属性名是字符串，属性值是any类型
    [prop: string]: any

    constructor(
        public name: string,
        public age: number
    ) {

    }
}

const u = new User('test', 12)

console.log(u['pid']) // 不报错
u.pid = "123"

```

在所引起中，键的类型可以是字符串，也可以是数字

```ts
class MyArray {
    [index: number]: string
    0 = "1"
    1 = "123"
    2 = "test"
}

const my = new MyArray()

my[1]
```

### TS 索引器的作用

- 在严格的检查下，可以实现为类动态添加成员
- 可以实现动态的操作类成员

在 JS 中所有的成员名，本质上都是字符串，如果使用数字作为成员名，会自动转换为字符串

在 TS 中如果某个类使用了两种类型的索引器，要求两种索引器的值类型必须匹配

## this 指向约束

JS `this` 指向的几种情况

明确：大部分时候，`this` 的指向取决于函数的调用方式

- 如果直接调用函数（全局调用），`this` 指向全局对象（global、window）或 `undefined`（启用严格模式）
- 如果使用 `this.方法` 调用，`this` 指向对象本身
- 如果 dom 事件的处理函数，`this` 指向事件处理对象

特殊情况:

- 箭头函数，`this` 在函数声明的时候确定指向，指向函数位置的 `this`
- 使用 `bind` `apply` `call`，手动绑定 `this` 对象

### TS 中的 `this`

```ts
const u = {
    name: 'test',
    age: 12,
    sayHello() {
        console.log(this.name, this.age)
    }
}

const say = u.sayHello
say() // this 指向全局对象
```

::: note

配置 `noImplicitThis` 为 `true` 表示不允许 `this` 隐式的指向 `any` 类型

:::

在 ts 中允许在书写函数的时，手动声明函数的 `this` 指向，将 `this` 作为函数的第一个参数，
该参数只用于约束 `this`，不会用于参数，也不会出现在编译结果里面

```ts
interface IUser {
    name: string
    age: number
    // 第一个参数设置 this 的指向
    sayHello(this: IUser): void
}

const u: IUser = {
    name: 'test',
    age: 12,
    sayHello() {
        console.log(this.name, this.age)
    }
}

const say = u.sayHello
say() // 报错，this 指向错误
```
