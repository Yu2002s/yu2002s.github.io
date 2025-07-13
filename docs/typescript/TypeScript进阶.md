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

## 装饰器

- 面向对象的概念（java：注解）
- 目前 JS 支持装饰器，目前处于建议征集的第二阶段
- 装饰器，分离关注点
- 装饰器作用：为某些属性、类、方法、参数提供元数据信息(metadata)

> 元数据：描述数据的数据

在JS中装饰器是一个函数。（装饰器是要参与运行的）

装饰器可以修饰：

- 类
- 成员
- 参数

```ts
class User {
    @require
    @range(3,5)
    @description("账户")
    loginId: string; // 必须3-5个字符

    loginPwd: string; // 必须是6-12个字符
    age: number;// 必须是0-100数字之间
    gender: "男" | "女";
}

const u = new User();
```

对用户对象中的数据进行验证

```ts
function validate(obj: object) {
    for (let key in obj) {
        const val = (obj as any)[key]
    }
}
```

### 类装饰器

类装饰器本质是一个函数，该函数接收一个参数，参数表示类本身(构造函数本身)

使用装饰器`@得到一个函数`

在TS中如何约束变量为类

- Function
- `new (参数) => object`

在TS中要使用装饰器，需要开启`experimentalDecorators`

装饰器函数的运行时间：在类定义后直接运行

类装饰器可以具有的返回值：

- void：仅运行函数
- 返回一个新的类：会将新的类替换掉装饰的目标

```ts
function test(target: new (...args: any[]) => object) {
    console.log(target)
}

@test
class A {

}

```

传参

```ts
function test(str: string) {
    return function(target: new (...args: any[]) => object) {

    }
}

@test('这是一个类')
class A {

}

```

多个装饰器：会按照后加入先调用的顺序进行调用。

```ts
type constructor = target: new (...args: any[]) => object

function d1() {
    console.log('d1')
    return function(target: constructor) {
        console.log('d1 decorator')
    }
}

function d2() {
    console.log('d2')
    return function(target: constructor) {
        console.log('d2 decorator')
    }
}

@d1
@d2
class A {

}

```

### 成员装饰器

- 属性

属性装饰器也是一个函数，该函数需要两个参数：

1. 如果是静态属性：则为类本身；如果是实例属性：则为类的原型
2. 属性名

```ts
function d(target: any, key: string) {
    console.log(target, key)
}

function d2() {
    return function(target: any, key: string) {
        console.log(target, key)
    }
}

class A {
    @d
    prop1: string

    @d
    static prop2: string
}
```

- 方法

方法装饰器也是一个函数，该函数需要三个参数：

1. 如果是静态属性：则为类本身；如果是实例属性：则为类的原型
2. 固定为一个字符串，表示方法名
3. 属性描述符对象 `PropertyDescriptor`

可以有多个装饰器

```ts
function d() {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(target, key, descriptor)
        descriptor.enumerable = true // 设置方法可枚举的
    }
}

class A {
    @d()
    method1() {

    }
}
```

### 练习

```ts
@classDescriptor("用户")
class User {
    @propDescriptor("账号")
    loginId: string

    @propDescriptor("密码")
    loginPwd: string
}

const u = new User()
u.loginId = 'test'
u.loginPwd = 'test'

printObj(u)
```

定义装饰器

```ts
import "reflect-metadata"

const key = "descriptor"

export function classDescriptor(desc: string) {
    return function(target: Function) {
        // 保存到该类的原型中
        return Reflect.metadata(key, desc)
    }
}

export function propDescriptor(desc: string) {
    return function(target: any, propsName: string) {
        // 把所有的属性信息保存该类的原型
        if (target.$propDescriptions) {
            target.$propDescriptions = []
        }
        target.$propDescriptions.push({
            propName,
            description,
        })
    }
}

export function printObj(obj: any) {
    // 这里是输出类的名字
    if (obj.$classDescription) {
        console.log(obj.$classDescription)
    } else {
        console.log(obj.__propto__.constructor.name)
    }
    // 输出所有的属性描述和属性值
    if (!obj.$propDescriptions) {
        obj.$propDescriptions = []
    }
    // console.log(obj.$propDescriptions)
    for (let key in obj) {
        // 属性名: key
        if (obj.hasOwnProperty(key)) {
            const prop = obj.$propDescriptions.find((item: any) => item.propName === key)
            if (prop) {
                console.log(`\t${prop.description}:${obj[key]}`)
            } else {
                console.log(`\t${key}:${obj[key]}`)
            }
        }
    }
}
```

### reflect-metadata库

该库的作用：保存元数据

```shell
npm install reflect-metadata
```

```ts
import "reflect-metadata"

@Reflect.metadata("a", "一个类")
@Reflect.metadata("a2", "A")
class A {

    @Reflect.metadata("prop", "一个属性")
    prop1: string
}

const obj = new A()

console.log(Reflect.getMetadata("a", A)) // 获取类的元信息

console.log(Reflect.getMetadata("prop", obj, "prop1")) // 获取类属性的元信息
```

### class-validator 和 class-transformer

```shell
npm install class-validator
npm install class-transformer
```

对类的属性进行验证

```ts
import "reflect-metadata"
import {IsNotEmpty, MinLength, MaxLength, Min, Max, validate} from 'class-validator'

class RegUser {

    @IsNotEmpty({message: "账号不可以为空"})
    @MinLength(5, {message: "账号必须至少有5个字符"})
    @MaxLength(12, {message: "账号最多12个字符"})
    loginId: string

    loginPwd: string

    @Min(0, {message: "年龄的最小值是0"})
    @Max(100, {message: "年龄的最大值是100"})
    age: number
    gender: "男" | "女"
}

const post = new RegUser()
post.loginId = "test"

validate(post).then(errors => {
    console.log(errors)
})

```

class-validator

```ts
import axios from "axios"
import {planToClass, Type} from "class-transformer"

class User {
    id: number
    firstName: string
    lastName: string

    // 类型转换
    @Type(() => Number)
    age: number

    getName() {
        return this.firstName + " " + this.lastName
    }
}

axios.get("https://example.com/json/user/1").then(res => res.data).then((users: User[]) => {
    const us = plainToClass(User, users)
    for (const u in users) {
        // 平面对象转换为 JS 对象
        const user = plainToClass(User, u) // 转换为User对象
        console.log(user.getName()) // 调用 User 对象中的方法
    }
})

```

### 补充

- 参数装饰器
    依赖注入、依赖导致

要求函数有三个参数：

1. 如果方法是静态的，则为类本身，如果方法是实例方法，则为类的原型
2. 方法名称
3. 在参数列表中的索引

```ts
class MyMath {
    
    sum(a: number, @test b: number) {
        return a + b
    }

}

function test(target: any, method: string, index: number) {
    console.log(target, method, index)
}
```

- 关于 TS 自动注入的元数据

如果安装了`reflect-metadata`，并且导入了该库，并且在某个成员上添加了元数据，
并且添加了配置`emitDecoratorMetadata`。

则TS的编译的结果中，会将约束的类型，作为元数据添加到相应的位置

这样一来，TS的类型约束将有机会在运行中进行。

```ts
import "reflect-metadata"

class User {
    @Reflect.metadata('a', 'b')
    loginId: string

    @Reflect.metadata('a', 'b')
    age: number
}
```

- AOP（aspect oriented programming）

这是一种编程方式，属于面向对象开发。

将一些在业务中共同出现的功能块，横向切分，以达到分离关注点的目的。

```ts
class RegUser {
    loginId: string

    loginPwd: string

    age: number

    pid: string 

    /**
     * 将用户保存到数据库
     */
    save() {
        // 验证处理
        if (validate(this)) {
            // 保存到数据库
        }
        // 通过后保存数据库
    }
}
```

## 类型演算

> 能够根据已知的信息，计算出新的类型

### 三个关键字

- typeof

TS中的`typeof`，书写的位置在类型约束的位置上

```ts
const a: string = 'hello'

let b: typeof a = "hello"
```

表示：获取某个数据的类型

当`typeof`作用于类的时候，得到的类型，是该类的构造函数

```ts
class User {
    loginId: string
    loginPwd: string
}

// new () => User
function createUser(cls: typeof User): User {
    return new cls()
}

const u = createUser(User)

const u = new User()
const u2 = u // new User()

const A = User // typeof User

new A() // new User()
```

- keyof

作用类、接口、类型别名，用于获取其他类型中的所有成员名组成的联合类型

```ts
interface User {
    loginId: string
    loginPwd: string
    age: number
}

// function printUserProperty(obj: User, prop: string) {
//    console.log(obj[prop]) // 报错
// }

function printUserProperty(obj: User, prop: keyof User) {
    console.log(obj[prop])
}
```

- in

该关键字往往和 `keyof` 联用，限制某个索引类型的取值范围

```ts
interface User {
    loginId: string
    loginPwd: string
    age: number
}

// 将 User 的所有属性值类型变成字符串，得到一个新的类型
type UserString = {
    [p in keyof User]: string
}

// readyonly
type Readonly<T> = {
    readonly [p in keyof T]: User[T]
}

// 可选
type Partial<T> = {
    [p in keyof T]?: T[p]
}
```

### TS 预设的类型演算

```ts
Partial<T> // 将类型T的成员变为可选

Required<T> // 将类型T的成员变为必选

Readonly<T> // 将类型T的成员变为只读

Exclude<T, U> // 从 T 中剔除可以赋值给U的类型

Extract<T, U> // 提取T中可以赋值给U的类型

NonNullable<T> // 从T中剔除null和undefined

ReturnType<T> // 获取函数返回值类型

InstanceType<T> // 获取函数类型的实例类型
 ```

- Exclude

剔除类型

```ts
let u: Exclude<'a' | 'b' | 'c' | 'd', 'b' | 'c'>

// u: "a" | "d"

type T = "男" | "女" | null | undefined

// 剔除 null 和 undefined

type NewT = Exclude<T, null | undefined>
```

- Extract

保留类型

```ts
let u: Extract<'a' | 'b' | 'c' | 'd', 'b' | 'c'>

// u: "b" | "c"
```

- ReturnType

获取函数的返回值

```ts
type func = () => number

type returnType = ReturnType<func> // number

function sum(a: number, b: number) {
    return a + b
}

let a: ReturnType<typeof sum> // number
```

- InstanceType

获取构造函数的类型，构造函数 new 之后的类型

```ts
class User {
    name: string
    age: number
}

const u: InstanceType<typeof User>

// 两个参数的构造函数
type twoParamsConstructor = new (arg1: any, arg2: any) => User

const A: twoParamsConstructor = class Test extends User {

    // constructor() {} // 没有问题
    // constructor(a: any, b: any, c: any) {} // 报错
    constructor(a: any, b: any) {

    }
}

// 获取构造函数返回的类型

type Inst = InstanceType<twoParamsConstructor>
```

## 声明文件

- 什么是声明文件？

以`.d.ts`为结尾的文件

- 声明文件有什么作用？

为JS代码提供类型声明

- 声明文件的位置

1. 放置到 `tsconfig.ts` 配置中包含的目录中(`include`)
2. 放置到`node_modules/@types`文件中
3. 与JS代码所在的目录相同，并且文件名也相同的文件。用ts代码书写的工程发布之后的格式
4. 手动配置

```ts
{
    "compileOptions": {
        "typeRoots": ["./types"] // 配置声明文件的位置
    }
}
```

### 编写声明文件

- 自动生成

工程是使用TS开发的，发布（编译）之后，是js文件，发布的是js文件

如果发布的文件需要被别人使用，可以使用声明文件，来描述发布结果中的类型

配置`tsconfig.json` 中的 `declaration` 为 `true`

- 手动编写

1. 对已有的库，它使用的js书写而成，并且更改该库的代码为ts成本较高，可以手动编写声明文件
2. 对一些第三方库，它使用js书写而成，并且这些第三库没有提供声明文件，可以手动编写声明文件

### 全局声明

声明一些全局的对象、属性

```ts
// global.d.ts

// 第一种写法
declare var console: {
    log(message?: any): void
}

interface Console {
    log(message?: any): void
    info(message?: any): void
    warn(message?: any): void
}

// 第二种
declare var console: Console

// 第三种
declare namespace console {
    function log(message?: any): void
    function wan(message?: any): void
}

```

::: tip

`namespace`：表示命名空间，可以将其认为是一个对象，命名空间中的内容，
必须通过`命名空间.成员名`访问

:::

```ts
type TimeHandler = () => void

declare function setTimeout(handler: TimeHandler, millseconds: number): number
```

### 模块声明

```ts
// 声明模块
declare module "lodash" {
    export function chunk<T>(arr: T[], size: number): T[][]
}
```

::: note
在运行 ts-node 可能会遇到报错，需要手动指定 `typesRoots`

```ts
{
    "compileOptions": {
        "typeRoots": ["./node_modules/@types", "./src/types"]
    }
}
```

:::

### 三斜线指令

在一个声明文件中，包含另一个声明文件

```ts
// 引入声明文件
/// <reference path="../../index.d.ts" />
```

### 发布

::: steps

1. 当前工程使用ts开发

```shell
npm run build
```

编译完成之后，将编译结果文件夹直接发布到npm上

2. 为其他第三方开发的声明文件

发布到@types/**中

3. 进入github的开源项目：

<RepoCard repo="DefinitelyTyped/DefinitelyTyped" />

4. fork到自己的开源仓库中

5. 从自己的开源中克隆到本地

6. 本地新建分支（例如：mylodash）,在新分支中进行声明文件开发

    在types目录中新建文件夹，在新的文件夹中开发声明文件

7. push 分支到开源库

8. 到官方的开源库中，提交 pull request

9. 等待官方管理员审核

10. 审核通过之后，会将你的分支合并到主分支，然后发布到npm

    之后通过命令`npm install @types/你的库名`

:::
