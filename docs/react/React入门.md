---
title: React入门
createTime: 2024/11/28 19:50:12
permalink: /article/nszll1ye/
---

## 1. `React` 是什么

`React` 是一个用于构建用户界面的 `JavaScript` 库，主要用于构建单页应用。

## 2. `React` 的特点

- 声明式编程：React 使用声明式编程，可以更方便地描述 UI 的结构和行为。
- 组件化：React 使用组件化开发，可以提高代码的复用性和可维护性。
- 虚拟 DOM：React 使用虚拟 DOM，可以提高页面的渲染效率。
- 单向数据流：React 使用单向数据流，可以提高代码的可维护性和可测试性。

## 3. React 的安装

### 3.1 直接在已有项目安装

React 的安装非常简单，只需要在项目中引入 `React` 的库即可。

::: npm-to

```sh
npm install react react-dom
```

:::

### 3.2 使用 `create-react-app` 安装

使用 `create-react-app` 可以快速创建一个 React 项目。

```bash
npx create-react-app my-app
```

::: tip

`react` 官方不推荐使用 `create-react-app` 创建项目，推荐使用 `vite` 创建项目。

:::

### 3.3 使用 `vite` 创建项目

使用 `vite` 创建项目非常简单，只需要在项目中引入 `vite` 的库即可。

::: npm-to

```sh
npm create vite@latest
```

:::

::: warning

Vite 需要 Node.js 版本 18+ 或 20+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，
当你的包管理器发出警告时，请注意升级你的 Node 版本。

:::

也可以通过命令快速创建一个 [vite](https://cn.vitejs.dev/guide/) 模板

::: npm-to

```sh
# npm 7+，需要添加额外的 --：
npm create vite@latest my-project -- --template react
```

:::

## 4. 一个简单的 React 项目

```jsx
import "./App.css"
import { useState } from "react"

function App() {
  const [count, setCount] = useState(1)

  function increment() {
    // 直接修改值
    // setCount(count + 1)
    // 传入一个函数，函数参数为修改前的值，返回值是需要修改的值
    setCount((prev) => {
      return prev + 1
    })
  }

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default App
```

react 修改 `count` 的值有两种方式：

- 直接修改值
- 传入一个函数，函数参数为修改前的值，返回值是需要修改的值

和 vue 不同，react 使用 `useState` 来定义状态。其中 `useState` 是一个 Hook，
`useState` 是 `React` 提供的一个 Hook，用于在函数组件中添加状态。

这个函数返回一个数组，数组的第一项是状态的值，第二项是修改状态的函数。

### 4.1 创建和使用组件

外部组件，在 `/src/components` 目录下创建一个 `ChildComponent.jsx` 文件。

```jsx
// 使用 jsx 创建一个子组件

export default function ChildComponent() {
  return <div>我是子组件</div>
}
```

在 `/src/App.jsx` 中使用子组件。

```jsx
<div>
  <p>count: {count}</p>
  <button onClick={increment}>+1</button>

  {/* 引入外部组件 */}
  <ChildComponent />
</div>
```

### 4.2 内部创建组件

在 `/src/App.jsx` 中直接创建一个组件。

```jsx
// 直接在 App.jsx 内部创建一个组件
function InnerComponent() {
  return (
    <>
      <div>我是内部组件</div>
    </>
  )
}
```

### 4.3 创建类组件

上面都是以函数的形式创建组件，react 还支持以类的方式创建组件。

```jsx
// src/components/ClassComponent.jsx
import React from "react"

// 使用类的方式创建一个组件
class ClassComponent extends React.Component {
  render() {
    return <div>我是类组件</div>
  }
}
```

::: tip

目前官方更推荐使用函数的形式创建组件

:::
