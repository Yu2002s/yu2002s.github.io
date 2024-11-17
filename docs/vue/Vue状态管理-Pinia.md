---
title: Vue状态管理-Pinia
createTime: 2024/06/05 10:50:31
permalink: /article/5nvka2q3/
tags: [状态管理, Pinia]
---

[pinia](<[https://](https://pinia.vuejs.org/)>) 是 vue 状态管理库，它允许你跨组件或页面共享状态。如果你熟悉组合式 API 的话，你可能会认为可以通过一行简单的 `export const state = reactive({})` 来共享一个全局状态。

<!-- more -->

#### 安装

```bash
pnpm install pinia
```

> 注意，可能由于版本兼容问题，vue 和 pinia 可能存在问题，需要切换版本

main.ts 文件中使用插件

```ts
import { createPinia } from 'pinia'
const app = createApp(App)
...
app.use(createPinia())
```

#### 配置 store

一般会在 src 文件中新建 store 文件夹，并新建一个 counter.ts 文件管理状态

分为选项式和组合式两种风格

##### 选项式

```ts
import { defineStore } from "pinia"

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

##### 组合式

```ts
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment,
  }
})
```

##### TS 类型支持

定义 ts 类型

```ts
interface State {
  count: number
  items: Item[]
  userinfo: UserInfo | null
}

interface UserInfo {
  username: string
  password: string
}

interface Item {
  name: string
  email: string
}
```

使用 ts 类型

```ts
export const useCounterStore = defineStore("counter", {
  state: (): State => ({ count: 0, userinfo: null, items: [] }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

#### 使用

在项目中使用

```ts
import { useCounterStore } from "@/stores/counter"

const counter = useCounterStore()
```

模板中

```html
<template>
  <div>
    {{ counter.count }} {{ counter.items }}
    <button @click="counter.count ++">+1</button>
  </div>
</template>
```

通过操作 store 对象对状态进行获取和修改

> 直接修改

```ts
// 直接使用变量进行自加一
counter.count++
```

> 使用内部方法

```ts
// 使用内部方法进行自加一
counter.$patch({ count: counter.count + 1 })
```

> 使用内部 actions 中定义的方法进行修改

```ts
// 使用actions进行自加一
counter.increment()
```

> 重置值

在 store 内部也可以调用此方法

```ts
// 重置值
counter.$reset()
```

> 同时修改多个值

```ts
counter.$patch((state) => {
  state.count = 1
  state.items.push({ name: "123", email: "123" })
})
```

> 订阅

可以监听状态改变

```ts
counter.$subscribe(
  (mutation, state) => {
    console.log(mutation, state)
    mutation.type // 'direct' | 'patch object' | 'patch function'
    // 和 cartStore.$id 一样
    mutation.storeId // 'cart'
    // 只有 mutation.type === 'patch object'的情况下才可用
    mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem("cart", JSON.stringify(state))
  },
  {
    // 组件销毁时依然订阅
    detached: true,
    // 深度订阅
    deep: true,
    // 改变时机
    flush: "post",
  }
)
```

> 取消订阅

```ts
const unsubscribe = counter.$subscribe()...

unsubscribe()
```

> 监听 action

```ts
const unsubscribe = counter.$OnAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    console.log(arg)
    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log("after")
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)
```

#### 一些问题

结构 store 将导致对象的值不再具备响应式特性，所以通常将 store 转换为 ref

```ts
const { count } = storeToRefs(Test)
```

#### 持久化

持久化插件[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate)

##### 安装

```bash
pnpm i pinia-plugin-persistedstate
```

##### 使用

```ts
import persist from "pinia-plugin-persistedstate"

pinia.use(persist)
```

在 store 中使用（组合式）

```ts
export const useCountStore = defineStore('count', () => {
    state: () => ({ count: 0 }),
    ...
}, {
    // uni-app使用此方法
    persist: {
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: any) {
          uni.setStorageSync(key, value)
        },
      },
    },
},)
```
