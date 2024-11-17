---
title: Vue v-model双向数据绑定
createTime: 2024/06/05 11:12:39
permalink: /article/tauuqn4d/
tags: [v-model]
---

双向数据绑定多用于输入框中，当 input 中的内容改变时，对用绑定的响应式对象也相应进行改变，当响应式对象改变时，input 内容也进行改变，即双向数据绑定，做到数据双向同步的目的

<!-- more -->

#### 封装 v-model 在组件中

##### 父组件

父组件中的用法

```html
<!--  v-model:title 给v-model指定一个参数，子组件接收属性名将为title  -->
<V-Model v-model.big="searchText" />
<div>App组件: search: {{ searchText }}</div>
```

##### 子组件

子组件中定义

```js
// v-model:title 表示指定一个参数
const props = defineProps({
  modelValue: String,
  // v-model 修饰符
  modelModifiers?: {
    big: boolean,
    // 指定一个默认值
    default: () => ({
      big: false
    })
  }
})
```

`modelValue` 是一个默认属性，可以通过 v-model:后面参数进行修改，`modelModifiers` 中表示的事 v-mode.后面的修饰符

定义 emit 给父组件发送更新事件

```js
// modelValue是父组件v-model传递的属性，固定写法
const emit = defineEmits(["update:modelValue"]) // 更新属性值，固定写法
```

模板中使用

```html
<template>
  <div>
    <h2>V-Model</h2>
    <input type="text" :value="modelValue" @input="change" />
    <input type="text" v-model="value" />
  </div>
</template>
```

定义 change 方法，发送事件

```js
const change = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
```

#### 新特性

```js
// 声明 "modelValue" prop，由父组件通过 v-model 使用
const model = defineModel()
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })

// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"

// 声明 "count" prop，由父组件通过 v-model:count 使用
const count = defineModel("count")
// 或者：声明带选项的 "count" prop
const count = defineModel("count", { type: Number, default: 0 })

function inc() {
  // 在被修改时，触发 "update:count" 事件
  count.value++
}
```
