---
title: React使用
createTime: 2024/11/28 19:50:12
permalink: /article/nszll1ye/
tags: [React]
---

## 1. `React` 是什么

`React` 是一个用于构建用户界面的 `JavaScript` 库，主要用于构建单页应用。

<!-- more -->

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

## 5. 条件渲染

<Card title="条件渲染">

在 `React` 中，可以使用条件渲染来根据不同的条件渲染不同的组件或元素。

- 在 `React`，你可以使用 `JavaScript` 来控制分支逻辑。
- 你可以使用 `if` 语句来选择性地返回 `JSX` 表达式。
- 你可以选择性地将一些 `JSX` 赋值给变量，然后用大括号将其嵌入到其他 `JSX` 中。
- 在 `JSX` 中，`{cond ? <A /> : <B />}` 表示 “当 `cond` 为真值时, 渲染 `<A />`，否则 `<B />`”。
- 在 `JSX` 中，`{cond && <A />}` 表示 “当 `cond` 为真值时, 渲染 `<A />`，否则不进行渲染”。
- 快捷的表达式很常见，但如果你更倾向于使用 `if`，你也可以不使用它们。

</Card>

### 5.1 三目运算符

对于一些简单的条件判断，可以直接在 JSX 中使用三目运算符。

```jsx
import { useState } from "react"

function App() {
  const [count, setCount] = useState(1)

  function increment() {
    setCount((prev) => {
      return prev + 1
    })
  }

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={increment}>+1</button>

      {/* 条件渲染，可以使用三目运算符直接写一行即可 */}
      {count > 10 ? <div>count 大于 10</div> : <div>count 小于等于 10</div>}
    </div>
  )
}

export default App
```

如果结构复杂的，可以使用()进行包裹

```jsx
{
  isPacked ? (<del>{name + " ✅"}</del>) : (name)
}
```

### 5.2 `if` 语句

对于一些复杂的条件判断，可以使用 `if` 语句。

```jsx
// ... 省略一些代码
let content = ""

if (count > 10) {
  content = <div>count 大于 10</div>
} else {
  content = <div>count 小于 10</div>
}

return (
  <div>
    <p>count: {count}</p>
    <button onClick={increment}>+1</button>

    {content}
  </div>
)
```

如果你不想返回任何内容，你可以直接返回 `null`

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null
  }

  return <li className="item">{name}</li>
}
```

### 5.3 `&&` 运算符

对于一些简单的条件判断，可以使用 `&&` 运算符。

```jsx
// ... 省略一些代码

return (
  <div>
    <p>count: {count}</p>
    <button onClick={increment}>+1</button>

    {count > 10 && <div>count 大于 10</div>}
  </div>
)
```

当 `JavaScript` `&&` 表达式 的左侧（我们的条件）为 `true` 时，它则返回其右侧的值（在我们的例子里是勾选符号）。但条件的结果是 `false`，则整个表达式会变成 false。在 `JSX` 里，`React` 会将 `false` 视为一个“空值”，就像 `null` 或者 `undefined`，这样 `React` 就不会在这里进行任何渲染。

::: tip
**切勿将数字放在 `&&` 左侧**.

`JavaScript` 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

例如，一个常见的错误是 `messageCount` && `<p>New messages</p>`。其原本是想当 `messageCount` 为 0 的时候不进行渲染，但实际上却渲染了 0。

为了更正，可以将左侧的值改成布尔类型：`messageCount > 0 && <p>New messages</p>`。
:::

## 6. 循环遍历

你可以借助原生 js 的方式，在 jsx 中循环遍历标签

- 如何从组件中抽离出数据，并把它们放入像数组、对象这样的数据结构中。
- 如何使用 `JavaScript` 的 `map()` 方法来生成一组相似的组件。
- 如何使用 `JavaScript` 的 `filter()` 方法来筛选数组。
- 为何以及如何给集合中的每个组件设置一个 `key` 值：它使 React 能追踪这些组件，即便后者的位置或- 数据发生了变化。

```jsx
const arr = Array.from({ length: count }, (_, index) => index + 1)

return (
  <>
    {arr.map((item) => {
      return <div key={item}>{item}</div>
    })}
  </>
)
```

当然你可以用另一种写法，把 `map` 放到结构外面遍历

```jsx
const arr = Array.from({ length: count }, (_, index) => index + 1)

const items = arr.map((item) => <div key={item}>{item}</div>)

return <div>{items}</div>
```

::: warning

注意：遍历出来的每个节点都必须有 `key` 属性，并且 `key` 的值必须是唯一的。

:::

上面循环的 jsx 语法中，都有 `key` 属性，这个属性是 react 提供的，用来标识每个节点的唯一性，react 会根据这个 `key` 来判断节点是否需要更新。

<Card title="Fragment节点">

::: tip

如果你想循环每个节点而不需要外部的包裹的 `div` 节点

`Fragment` 语法的简写形式 `<> </>` 无法接受 `key` 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：

```jsx
import { Fragment } from "react" // [!code highlight]

// ...

const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
))
```

这里的 `Fragment` 标签本身并不会出现在 `DOM` 上，这串代码最终会转换成 `<h1>、<p>、<h1>、<p>`…… 的列表。

:::

</Card>

::: warning

你可能会想直接把数组项的索引当作 `key` 值来用，实际上，如果你没有显式地指定 key 值，React 确实默认会这么做。但是数组项的顺序在插入、删除或者重新排序等操作中会发生改变，此时把索引顺序用作 key 值会产生一些微妙且令人困惑的 bug。

与之类似，请不要在运行过程中动态地产生 key，像是 `key={Math.random()}` 这种方式。这会导致每次重新渲染后的 key 值都不一样，从而使得所有的组件和 DOM 元素每次都要重新创建。这不仅会造成运行变慢的问题，更有可能导致用户输入的丢失。所以，使用能从给定数据中稳定取得的值才是明智的选择。

有一点需要注意，组件不会把 key 当作 `props` 的一部分。Key 的存在只对 React 本身起到提示作用。如果你的组件需要一个 ID，那么请把它作为一个单独的 prop 传给组件： `<Profile key={id} userId={id} />`。

:::

## 7. 状态 `state`

通常你会希望你的组件 “记住” 一些信息并展示出来，比如一个按钮被点击的次数。要做到这一点，你需要在你的组件中添加 `state`。

首先，从 `React` 引入 `useState`：

```jsx
import { useState } from "react"
```

现在你可以在你的组件中声明一个 state 变量：

```jsx
function MyButton() {
  const [count, setCount] = useState(0)
  // ...
}
```

你将从 `useState` 中获得两样东西：当前的 `state（count）`，以及用于更新它的函数（`setCount`）。你可以给它们起任何名字，但按照惯例会像 `[something, setSomething]` 这样为它们命名。

第一次显示按钮时，count 的值为 0，因为你把 0 传给了 `useState()`。当你想改变 state 时，调用 `setCount()` 并将新的值传递给它。点击该按钮计数器将递增：

```jsx
function MyButton() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Clicked {count} times</button>
}
```

`React` 将再次调用你的组件函数。第一次 `count` 变成 1。接着点击会变成 2。继续点击会逐步递增。

如果你多次渲染同一个组件，每个组件都会拥有自己的 state。你可以尝试点击不同的按钮：

```jsx
import { useState } from "react"

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  )
}

function MyButton() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Clicked {count} times</button>
}
```

::: note
注意，每个按钮会 “记住” 自己的 count，而不影响其他按钮。
:::

### 7.1 组件共享数据

为了使得 `MyButton` 组件显示相同的 count 并一起更新，你需要将各个按钮的 `state` “向上” 移动到最接近包含所有按钮的组件之中。

在这个示例中，它是 MyApp：

此刻，当你点击任何一个按钮时，MyApp 中的 count 都将改变，同时会改变 MyButton 中的两个 count。具体代码如下：

::: steps

1. 首先，将 MyButton 的 state 上移到 MyApp 中：

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0) // [!code ++]

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  )
}

function MyButton() {
  // ... // [!code --]
}
```

2. 接着，将 MyApp 中的点击事件处理函数以及 state 一同向下传递到 每个 MyButton 中。你可以使用 JSX 的大括号向 MyButton 传递信息。就像之前向 `<img>` 等内置标签所做的那样:

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} /> // [!code highlight]
      <MyButton count={count} onClick={handleClick} /> // [!code highlight]
    </div>
  )
}
```

使用这种方式传递的信息被称作 prop。此时 MyApp 组件包含了 count state 以及 handleClick 事件处理函数，并将它们作为 prop 传递给 了每个按钮。

3. 最后，改变 MyButton 以 读取 从父组件传递来的 prop：

```jsx
function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button> // [!code highlight]
}
```

当你点击按钮时，`onClick` 处理程序会启动。每个按钮的 `onClick prop` 会被设置为 MyApp 内的 `handleClick` 函数，所以函数内的代码会被执行。该代码会调用 `setCount(count + 1)`，使得 `state` 变量 count 递增。新的 `count` 值会被作为 `prop` 传递给每个按钮，因此它们每次展示的都是最新的值。这被称为“状态提升”。通过向上移动 state，我们实现了在组件间共享它。

```jsx
import { useState } from "react"

export default function MyApp() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} /> // [!code highlight]
      <MyButton count={count} onClick={handleClick} /> // [!code highlight]
    </div>
  )
}

function MyButton({ count, onClick }) {
  return <button onClick={onClick}>Clicked {count} times</button> // [!code highlight]
}
```

:::

### 7.2 state 快照

与普通 `JavaScript` 变量不同，`React` 状态的行为更像一个**快照**。**设置它并不改变你已有的状态变量，而是触发一次重新渲染**。这在一开始可能会让人感到惊讶！

```jsx
console.log(count) // 0
setCount(count + 1) // 请求用 1 重新渲染
// 仍然是 0！
console.log(count) // [!code highlight]
```

这里有一个小的聊天应用程序。试着猜一猜，如果先按下“发送”，然后再把收件人改为 Bob，会发生什么？五秒钟后，谁的名字会出现在 alert 中？

::: card title="聊天应用程序"

```jsx :collapsed-lines
import { useState } from "react"

export default function Form() {
  const [to, setTo] = useState("Alice")
  const [message, setMessage] = useState("Hello")

  function handleSubmit(e) {
    // [!code word:5000]
    e.preventDefault()
    setTimeout(() => {
      alert(`You said ${message} to ${to}`) // [!code highlight]
    }, 5000) // [!code highlight]
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{" "}
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}
```

5 秒之后收件人并没有发送变化

:::

如果一次性多次调用更新状态方法，状态会多次更新嘛？

```jsx
export default function App() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1) // [!code highlight]

    console.log(count) // [!code highlight]
  }

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          increment() // [!code highlight]
          increment() // [!code highlight]
        }}
      >
        增加
      </button>
    </div>
  )
}
```

然而，实际上 `count` 值只会更新一次，而且打印的值一直都是上一次的值

::: note

`state` 如同一张快照 解释了为什么会出现这种情况。设置状态会请求一个新的重新渲染，但不会在已运行的代码中更改它。所以在你调用 `setScore(score + 1)` 后，score 仍然是 0。

:::

```jsx
console.log(score) // 0
setScore(score + 1) // setScore(0 + 1);
console.log(score) // 0
setScore(score + 1) // setScore(0 + 1);
console.log(score) // 0
setScore(score + 1) // setScore(0 + 1);
console.log(score) // 0
```

你可以通过在设置状态时传递一个 更新器函数 来解决这个问题。注意用 `setScore(s => s + 1)` 替换 `setScore(score + 1)` 是如何修复“+3”按钮的。如果你需要排队进行多次状态更新，那么这非常方便。

```jsx
export default function Counter() {
  const [score, setScore] = useState(0)

  function increment() {
    setCount(count + 1) // [!code --]
    setScore((s) => s + 1) // [!code ++]
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button
        onClick={() => {
          increment()
          increment()
          increment()
        }}
      >
        +3
      </button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

### 7.3 更新 `state` 中的对象

状态可以持有任何类型的 `JavaScript` 值，包括对象。但你不应该**直接改变**你在 React 状态中持有的对象和数组。相反，当你想更新一个对象和数组时，**你需要创建一个新的对象（或复制现有的对象），然后用这个副本来更新状态**。

通常情况下，你会使用 `...` 展开语法来复制你想改变的对象和数组。例如，更新一个嵌套对象可以是这样的：

```jsx :collapsed-lines
import { useState } from "react"

export default function Form() {
  const [person, setPerson] = useState({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  })

  function handleNameChange(e) {
    setPerson({
      ...person, // [!code highlight]
      name: e.target.value,
    })
  }

  function handleTitleChange(e) {
    setPerson({
      ...person, // [!code highlight]
      artwork: {
        ...person.artwork, // [!code highlight]
        title: e.target.value,
      },
    })
  }

  function handleCityChange(e) {
    setPerson({
      ...person, // [!code highlight]
      artwork: {
        ...person.artwork, // [!code highlight]
        city: e.target.value,
      },
    })
  }

  function handleImageChange(e) {
    setPerson({
      ...person, // [!code highlight]
      artwork: {
        ...person.artwork, // [!code highlight]
        image: e.target.value,
      },
    })
  }

  return (
    <>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  )
}
```

如果在代码中复制对象感觉乏味，可以使用 [Immer](https://github.com/immerjs/use-immer) 之类的库来减少重复代码：

::: npm-to

```sh
npm install immer use-immer
```

:::

安装之后，这样使用

::: code-tabs

@tab package.json

```jsonc
"dependencies": {
    "immer": "1.7.3", // [!code ++]
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1" // [!code ++]
  }
```

@tab App.jsx

```jsx :collapsed-lines
import { useImmer } from "use-immer"

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  })

  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value
    })
  }

  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value
    })
  }

  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value
    })
  }

  function handleImageChange(e) {
    updatePerson((draft) => {
      draft.artwork.image = e.target.value
    })
  }

  return (
    <>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  )
}
```

:::

你也使用 JS 的 [] 来实现属性的动态命名，使用一个处理函数来更新多个字段

```jsx :collapsed-lines
import { useState } from "react"

export default function Form() {
  const [person, setPerson] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    email: "bhepworth@sculpture.com",
  })

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value, // [!code highlight]
    })
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input name="email" value={person.email} onChange={handleChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email})
      </p>
    </>
  )
}
```

### 7.4 更新 `state` 中的数组

数组是另一种可以存在状态中的可变 `JavaScript` 对象，应将其视为**只读**。就像对象一样，当你想更新存在状态中的数组时，**你需要创建一个新数组（或者复制现有数组），然后用新数组来更新状态**。

```jsx :collapsed-lines
import { useState } from "react"

const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
]

export default function BucketList() {
  const [list, setList] = useState(initialList)

  function handleToggle(artworkId, nextSeen) {
    setList(
      list.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: nextSeen }
        } else {
          return artwork
        }
      })
    )
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={list} onToggle={handleToggle} />
    </>
  )
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked)
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  )
}
```

使用 `Immer` 库来简化更新数组

```jsx :collapsed-lines
import { useState } from "react"
import { useImmer } from "use-immer"

const initialList = [
  { id: 0, title: "Big Bellies", seen: false },
  { id: 1, title: "Lunar Landscape", seen: false },
  { id: 2, title: "Terracotta Army", seen: true },
]

export default function BucketList() {
  const [list, updateList] = useImmer(initialList)

  function handleToggle(artworkId, nextSeen) {
    updateList((draft) => {
      const artwork = draft.find((a) => a.id === artworkId)
      artwork.seen = nextSeen
    })
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={list} onToggle={handleToggle} />
    </>
  )
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map((artwork) => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={(e) => {
                onToggle(artwork.id, e.target.checked)
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  )
}
```

### 7.5 Reducer

对于那些需要更新多个状态的组件来说，过于分散的事件处理程序可能会令人不知所措。
对于这种情况，**你可以在组件外部将所有状态更新逻辑合并到一个称为 “reducer” 的函数中**。
这样，事件处理程序就会变得简洁，因为它们只需要指定用户的 “actions”。
在文件的底部，`reducer` 函数指定状态应该如何更新以响应每个 `action`！

创建 `Reducer`

```jsx
// 初始数据
const initialTasks = [
  { id: 0, text: "这是内容", done: true },
  { id: 1, text: "hello", done: false },
]

// 创建 Reducer
// taskReducer 为 reducer 函数，initialTasks 为初始状态
const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
// tasks 为状态，dispatch 为触发状态更新的函数
```

taskReducer 函数

```jsx
// taskReducer 函数
// tasks 为状态，action 为具体操作，由 dispatch 函数传递
function taskReducer(tasks, action) {
  // 返回新的状态
  switch (action.type) {
    // 添加任务
    case "added": {
      return [
        ...tasks,
        {
          id: Math.random(),
          text: action.text,
          done: false,
        },
      ]
    }
    // 更新任务
    case "update": {
      return tasks.map((item) => {
        if (item.id === action.task.id) {
          return action.task
        } else {
          return item
        }
      })
    }
    // 删除任务
    case "delete": {
      return tasks.filter((item) => item.id !== action.id)
    }
    default: {
      throw Error("未知操作: " + action.type)
    }
  }
}
```

#### 7.5.1 配合 `Immer` 使用

```jsx :collapsed-lines
import { useImmerReducer } from "use-immer"
import AddTask from "./AddTask.js"
import TaskList from "./TaskList.js"

function tasksReducer(draft, action) {
  switch (action.type) {
    case "added": {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      })
      break
    }
    case "changed": {
      const index = draft.findIndex((t) => t.id === action.task.id)
      draft[index] = action.task
      break
    }
    case "deleted": {
      return draft.filter((t) => t.id !== action.id)
    }
    default: {
      throw Error("未知 action：" + action.type)
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks)

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task,
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    })
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  )
}

let nextId = 3
const initialTasks = [
  { id: 0, text: "参观卡夫卡博物馆", done: true },
  { id: 1, text: "看木偶戏", done: false },
  { id: 2, text: "打卡列侬墙", done: false },
]
```

### 7.6 使用 `Context` 深层传递

通常，你会通过 `props` 将信息从父组件传递给子组件。但是，如果要在组件树中深入传递一些 prop，或者树里的许多组件需要使用相同的 prop，那么传递 prop 可能会变得很麻烦。`Context` 允许父组件将一些信息提供给它下层的任何组件，不管该组件多深层也无需通过 props 逐层透传。

`Context` 使组件向其下方的整个树提供信息。
传递 `Context` 的方法:

- 通过 `export const MyContext = createContext(defaultValue)` 创建并导出 context。
- 在无论层级多深的任何子组件中，把 `context` 传递给 `useContext(MyContext)` `Hook` 来读取它。
- 在父组件中把 `children` 包在 `<MyContext.Provider value={...}>` 中来提供 context。
- `Context` 会穿过中间的任何组件。
- `Context` 可以让你写出 “较为通用” 的组件。
- 在使用 `context` 之前，先试试传递 `props` 或者将 `JSX` 作为 `children` 传递。

你需要创建一个文件，并导出一个 `Context` 对象。

```jsx
import { createContext } from "react"

// 创建 Context
const MyContext = createContext(defaultValue)
```

在祖先组件中，使用 `Provider` 组件提供数据

```jsx
import { useContext } from "react"
import { MyContext } from "./xxxx.js"

export default function Section({ children }) {
  const level = useContext(MyContext) // [!code highlight]
  return (
    <section className="section">
      <MyContext.Provider value={level + 1}>{children}</MyContext.Provider>
    </section>
  )
}
```

在子组件、孙子组件中使用 `Context` 数据

```jsx
import { useContext } from "react"
import { MyContext } from "./xxxx.js"

export default function Heading({ children }) {
  const level = useContext(MyContext)
  return <h1 style={{ fontSize: 15 + level * 5 }}>{children}</h1>
}
```

::: tip

`Context` 让你可以编写“适应周围环境”的组件，并且根据 在哪 （或者说 在哪个 context 中）来渲染它们不同的样子。

Context 的工作方式可能会让你想起 `CSS` 属性继承。在 CSS 中，你可以为一个 `<div>` 手动指定 `color: blue`，并且其中的任何 `DOM` 节点，无论多深，都会继承那个颜色，除非中间的其他 DOM 节点用 color: green 来覆盖它。类似地，**在 React 中，覆盖来自上层的某些 context 的唯一方法是将子组件包裹到一个提供不同值的 `context provider` 中**。

在 `CSS` 中，诸如 `color` 和 `background-color` 之类的不同属性不会覆盖彼此。
你可以设置所有 `<div>` 的 `color` 为红色，而不会影响 background-color。
类似地，不同的 `React context` **不会覆盖彼此**。
你通过 `createContext()` 创建的每个 context 都和其他 context 完全分离，只有使用和提供 那个特定的 context 的组件才会联系在一起。
一个组件可以轻松地使用或者提供许多不同的 context。

:::

#### 7.6.1 合理使用 Context

使用 `Context` 看起来非常诱人！然而，这也意味着它也太容易被过度使用了。如果你只想把一些 `props` 传递到多个层级中，这并不意味着你需要把这些信息放到 `context` 里。

在使用 `context` 之前，你可以考虑以下几种替代方案：

1. 从 传递 `props` 开始。 如果你的组件看起来不起眼，那么通过十几个组件向下传递一堆 props 并不罕见。这有点像是在埋头苦干，但是这样做可以让哪些组件用了哪些数据变得十分清晰！维护你代码的人会很高兴你用 props 让数据流变得更加清晰。

2. **抽象组件并 将 JSX 作为 children 传递 给它们**。 如果你通过很多层不使用该数据的中间组件（并且只会向下传递）来传递数据，这通常意味着你在此过程中忘记了抽象组件。举个例子，你可能想传递一些像 posts 的数据 props 到不会直接使用这个参数的组件，**类似 `<Layout posts={posts} />`。取而代之的是，让 `Layout` 把 `children` 当做一个参数，然后渲染 `<Layout><Posts posts={posts} /></Layout>`**。这样就减少了定义数据的组件和使用数据的组件之间的层级。
   如果这两种方法都不适合你，再考虑使用 context。

#### 7.6.2 Context 使用场景

1. **主题**： 如果你的应用允许用户更改其外观（例如暗夜模式），你可以在应用顶层放一个 `context provider`，并在需要调整其外观的组件中使用该 context。
2. **当前账户**： 许多组件可能需要知道当前登录的用户信息。将它放到 `context` 中可以方便地在树中的任何位置读取它。某些应用还允许你同时操作多个账户（例如，以不同用户的身份发表评论）。在这些情况下，将 UI 的一部分包裹到具有不同账户数据的 `provider` 中会很方便。
3. **路由**： 大多数路由解决方案在其内部使用 context 来保存当前路由。这就是每个链接“知道”它是否处于活动状态的方式。如果你创建自己的路由库，你可能也会这么做。
4. **状态管理**： 随着你的应用的增长，最终在靠近应用顶部的位置可能会有很多 state。许多遥远的下层组件可能想要修改它们。通常 将 reducer 与 context 搭配使用来管理复杂的状态并将其传递给深层的组件来避免过多的麻烦。

`Context` 不局限于静态值。如果你在下一次渲染时传递不同的值，`React` 将会更新读取它的所有下层组件！这就是 `context` 经常和 `state` 结合使用的原因。

一般而言，如果树中不同部分的远距离组件需要某些信息，`context` 将会对你大有帮助。

### 7.7 Context + Reducer

**`Reducer` 帮助你合并组件的状态更新逻辑。`Context` 帮助你将信息深入传递给其他组件。**
你可以将 `reducers` 和 `context` 组合在一起使用，以管理复杂应用的状态。

基于这种想法，使用 reducer 来管理一个具有复杂状态的父组件。
组件树中任何深度的其他组件都可以通过 context 读取其状态。
还可以 `dispatch` 一些 `action` 来更新状态。

::: code-tabs
@tab App.jsx

```jsx
import { TaskProvider } from "./TaskContext"
import ChildComponent from "./components/ChildComponent.jsx"

export default function TaskApp() {
  return (
    <div>
      <TaskProvider>
        <h1>Hello</h1>
        <ChildComponent />
      </TaskProvider>
    </div>
  )
}
```

@tab TaskContext.jsx

```jsx :collapsed-lines
import { createContext, useContext, useReducer } from "react"

// 创建 TaskContext，用于传递任务数据
const TaskContext = createContext(null) // [!code highlight]
// 创建 TaskDispatchContext，用于传递任务更新逻辑
const TaskDispatchContext = createContext(null) // [!code highlight]

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  )
}

// 暴露给外部使用Context
export function useTaskContext() {
  return useContext(TaskContext) // [!code highlight]
}

export function useTaskDispatchContext() {
  return useContext(TaskDispatchContext) // [!code highlight]
}

/**
 * 处理任务的更新逻辑
 */
function taskReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: Math.random(),
          text: action.text,
          done: false,
        },
      ]
    }
    case "update": {
      return tasks.map((item) => {
        if (item.id === action.task.id) {
          return action.task
        } else {
          return item
        }
      })
    }
    case "delete": {
      return tasks.filter((item) => item.id !== action.id)
    }
    default: {
      throw Error("未知操作: " + action.type)
    }
  }
}

const initialTasks = [
  { id: 0, text: "这是内容", done: true },
  { id: 1, text: "hello", done: false },
]
```

@tab ChildComponent.jsx

```jsx
import { useTaskContext, useTaskDispatchContext } from "../TaskContext"

export default function ChildComponent() {
  // 使用Context，返回的是任务列表
  const tasks = useTaskContext() // [!code highlight]
  // 返回的是任务更新派发方法
  const dispatch = useTaskDispatchContext() // [!code highlight]

  if (!tasks) {
    return <div>NULL</div>
  }

  function handleAdd() {
    dispatch({
      type: "added",
      id: Date.now(),
      text: "Hello World",
      done: false,
    })
  }

  return (
    <div>
      {tasks.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}
```

:::

### 7.8 `Reducer` 对比 `useState`

- **代码体积**： 通常，在使用 `useState` 时，一开始只需要编写少量代码。而 `useReducer` 必须提前编写 reducer 函数和需要调度的 `actions`。但是，当多个事件处理程序以相似的方式修改 state 时，useReducer 可以减少代码量。
- **可读性**： 当状态更新逻辑足够简单时，useState 的可读性还行。但是，一旦逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，useReducer 允许你将状态更新逻辑与事件处理程序分离开来。
- **可调试性**： 当使用 useState 出现问题时, 你很难发现具体原因以及为什么。 而使用 useReducer 时， 你可以在 reducer 函数中通过打印日志的方式来观察每个状态的更新，以及为什么要更新（来自哪个 `action`）。 如果所有 action 都没问题，你就知道问题出在了 reducer 本身的逻辑中。 然而，与使用 useState 相比，你必须单步执行更多的代码。
- **可测试性**： reducer 是一个不依赖于组件的纯函数。这就意味着你可以单独对它进行测试。一般来说，我们最好是在真实环境中测试组件，但对于复杂的状态更新逻辑，针对特定的初始状态和 action，断言 reducer 返回的特定状态会很有帮助。
- **个人偏好**： 并不是所有人都喜欢用 reducer，没关系，这是个人偏好问题。你可以随时在 `useState` 和 `useReducer` 之间切换，它们能做的事情是一样的！

::: tip

如果你在修改某些组件状态时经常出现问题或者想给组件添加更多逻辑时，我们建议你还是使用 reducer。当然，你也不必整个项目都用 reducer，这是可以自由搭配的。你甚至可以在一个组件中同时使用 `useState` 和 `useReducer`。

:::

**编写 reducer 时最好牢记以下两点**：

- **`reducer` 必须是纯粹的**。 这一点和 状态更新函数 是相似的，reducer 是在渲染时运行的！（actions 会排队直到下一次渲染)。 这就意味着 reducer 必须纯净，即当输入相同时，输出也是相同的。它们不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）。它们应该以不可变值的方式去更新 对象 和 数组。
- **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化**。 举个例子，如果用户在一个由 reducer 管理的表单（包含五个表单项）中点击了 重置按钮，那么 dispatch 一个 reset_form 的 action 比 `dispatch` 五个单独的 set_field 的 action 更加合理。如果你在一个 reducer 中打印了所有的 action 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！

## 8. Props

`React` 组件使用 `props` 来互相通信。每个父组件都可以提供 `props` 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 `JavaScript` 值，包括对象、数组和函数。

::: caution

props 是 不可变的（一个计算机科学术语，意思是“不可改变”）。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递 不同的 props —— 一个新对象！它的旧 props 将被丢弃，最终 JavaScript 引擎将回收它们占用的内存。

**不要尝试“更改 props”**

:::

- 要传递 `props`，请将它们添加到 `JSX`，就像使用 `HTML` 属性一样。
- 要读取 props，请使用 `function Avatar({ person, size })` 解构语法。
- 你可以指定一个默认值，如 size = 100，用于缺少值或值为 `undefined` 的 props 。
- 你可以使用 `<Avatar {...props} />` JSX 展开语法转发所有 props，但不要过度使用它！
- 像 `<Card><Avatar /></Card>` 这样的嵌套 JSX，将被视为 Card 组件的 `children prop`。
- Props 是只读的时间快照：每次渲染都会收到新版本的 props。
- 你不能改变 props。当你需要交互性时，你可以设置 `state`。

### 8.1 向组件传递 `props`

传递参数给组件

```jsx
export default function Profile() {
  return (
    <Avatar person={{ name: "Lin Lanying", imageId: "1bX5QH6" }} size={100} />
  )
}
```

接收参数的组件

```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={`https://i.imgur.com/${person.imageId}.jpg`}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
```

### 8.2 设置默认值

如果你想在没有指定值的情况下给 prop 一个默认值，你可以通过在参数后面写 = 和默认值来进行解构：

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

::: note
现在， 如果 `<Avatar person={...} />` 渲染时没有 `size prop`， size 将被赋值为 100。

默认值仅在缺少 `size prop` 或 `size={undefined}` 时生效。 但是如果你传递了 `size={null}` 或 `size={0}`，默认值将**不被使用**。

:::

### 8.3 展开 props

有时候，传递 props 会变得非常重复,
如果你有很多 props，并且你不想一个一个地传递它们，你可以使用展开语法：

```jsx
export default function Profile() {
  const person = { name: "Lin Lanying", imageId: "1bX5QH6" }
  return <Avatar {...person} size={100} />
}
```

**请克制地使用展开语法。** 如果你在所有其他组件中都使用它，那就有问题了。 通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。 接下来会详细介绍！

### 8.4 组件作为 props

将组件作为 `props` 进行传递

```jsx
import ChildComponent from "./components/ChildComponent"

export default function App() {
  return (
    <div>
      <Card>
        {/* 子组件，将作为children props传递*/}
        <ChildComponent />
      </Card>
    </div>
  )
}

// chidren props 为嵌套的子组件
function Card({ children }) {
  return (
    <div className="card">
      我是card
      {children}
    </div>
  )
}
```

## 9. 响应事件

使用 React 可以在 JSX 中添加 事件处理函数。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。

- 你可以通过将函数作为 prop 传递给元素如 `<button>` 来处理事件。
- 必须传递事件处理函数，而非函数调用！ `onClick={handleClick}` ，不是 `onClick={handleClick()}`。
- 你可以单独或者内联定义事件处理函数。
- 事件处理函数在组件内部定义，所以它们可以访问 `props`。
- 你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件。
- 你可以根据特定于应用程序的名称定义事件处理函数的 prop。
- 事件会向上传播。通过事件的第一个参数调用 `e.stopPropagation()` 来防止这种情况。
- 事件可能具有不需要的浏览器默认行为。调用 `e.preventDefault()` 来阻止这种情况。
- 从子组件显式调用事件处理函数 prop 是事件传播的另一种优秀替代方案。

按照如下三个步骤，即可让它在用户点击时显示消息：

:::: steps

1. 在 `Button` 组件 内部 声明一个名为 `handleClick` 的函数。

2. 实现函数内部的逻辑（使用 `alert` 来显示消息）。

3. 添加 `onClick={handleClick}` 到 `<button>` JSX 中。

4. 最终实现代码:

```jsx
export default function Button() {
  function handleClick() {
    alert("你点击了我！")
  }

  return <button onClick={handleClick}>点我</button> // [!code highlight]
}
```

::::

你可以定义 `handleClick` 函数然后 将其作为 `prop` 传入 `<button>`。其中 `handleClick` 是一个 事件处理函数 。事件处理函数有如下特点:

- 通常在你的组件 内部 定义。
- 名称以 `handle` 开头，后跟事件名称。

::: note

按照惯例，通常将事件处理程序命名为 `handle`，后接事件名。你会经常看到 `onClick={handleClick}`，`onMouseEnter={handleMouseEnter}` 等。

:::

你也可以使用其他内联的方式设置事件处理函数:

```jsx
<button onClick={function handleClick() {
  alert('你点击了我！');
}}>
```

也可以使用箭头函数:

```jsx
<button onClick={() => {
  alert('你点击了我！');
}}>
```

::: warning

传递给事件处理函数的函数应直接传递，而非调用。例如：

| 传递一个函数（正确）             | 调用一个函数                       |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

区别很微妙。在第一个示例中，`handleClick` 函数作为 `onClick` 事件处理函数传递。这会让 `React` 记住它，并且只在用户点击按钮时调用你的函数。

在第二个示例中，`handleClick()` 中最后的 () **会在渲染过程中立即触发函数**，即使没有任何点击。这是因为位于 `JSX {}` 之间的 `JavaScript` 会立即执行。

当你编写内联代码时，同样的陷阱可能会以不同的方式出现：

| 传递一个函数（正确）                     | 调用一个函数                       |
| ---------------------------------------- | ---------------------------------- |
| `<button onClick={() => handleClick()}>` | `<button onClick={handleClick()}>` |

在这两种情况下，你都应该传递一个函数：

- `<button onClick={handleClick}>` 传递了 `handleClick` 函数。
- `<button onClick={() => alert('...')}>` 传递了 `() => alert('...')` 函数。

:::

### 9.1 命名事件处理函数

内置组件（`<button>` 和 `<div>`）仅支持 浏览器事件名称，例如 `onClick`。但是，当你构建自己的组件时，你可以按你个人喜好命名事件处理函数的 prop。

::: tip

按照惯例，事件处理函数 `props` 应该以 `on` 开头，后跟一个**大写字母**。

:::

### 9.2 事件传播

事件处理函数还将捕获任何来自子组件的事件。通常，我们会说事件会沿着树向上“冒泡”或“传播”：它从事件发生的地方开始，然后沿着树向上传播。

::: tip

在 `React` 中所有事件都会传播，除了 `onScroll`，它仅适用于你附加到的 `JSX` 标签。

:::

#### 9.2.1 阻止传播

事件处理函数接收一个 事件对象 作为唯一的参数。按照惯例，它通常被称为 e ，代表 “event”（事件）。你可以使用此对象来读取有关事件的信息。

这个事件对象还允许你阻止传播。如果你想阻止一个事件到达父组件，你需要像下面 `Button` 组件那样调用 `e.stopPropagation()` ：

::: details

```jsx
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation() // [!code highlight]
        onClick()
      }}
    >
      {children}
    </button>
  )
}

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("你点击了 toolbar ！")
      }}
    >
      <Button onClick={() => alert("正在播放！")}>播放电影</Button>
      <Button onClick={() => alert("正在上传！")}>上传图片</Button>
    </div>
  )
}
```

:::

#### 9.2.2 捕获事件

极少数情况下，你可能需要捕获子元素上的所有事件，**即便它们阻止了传播。例如，你可能想对每次点击进行埋点记录**，传播逻辑暂且不论。那么你可以通过在事件名称末尾添加 `Capture` 来实现这一点：

```jsx
<div
  onClickCapture={() => {
    /* 这会首先执行 */
  }}
>
  <button onClick={(e) => e.stopPropagation()} />
  <button onClick={(e) => e.stopPropagation()} />
</div>
```

每个事件分三个阶段传播：

- 它向下传播，调用所有的 `onClickCapture` 处理函数。
- 它执行被点击元素的 `onClick` 处理函数。
- 它向上传播，调用所有的 `onClick` 处理函数。
- 捕获事件对于路由或数据分析之类的代码很有用，但你可能不会在应用程序代码中使用它们。

#### 9.2.3 阻止默认行为

某些浏览器事件具有与事件相关联的默认行为。例如，点击 `<form>` 表单内部的按钮会触发表单提交事件，默认情况下将重新加载整个页面：

```jsx
<form
  onSubmit={(e) => {
    e.preventDefault() // [!code highlight]
    alert("提交表单！")
  }}
>
  <input />
  <button>发送</button>
</form>
```

## 10. Ref

当你希望组件“**记住**”某些信息，但又**不想让这些信息 触发新的渲染** 时，你可以使用 `ref`：

```jsx
const myRef = useRef(initialValue)
```

与 `state` 一样，ref 在重新渲染之间由 `React` 保留。但是，设置 `state` 会重新渲染组件，而更改 `ref` 不会！你可以通过 `ref.current` 属性访问该 ref 的当前值。

```jsx
import { useRef } from "react"

export default function Counter() {
  let ref = useRef(0) // [!code highlight]

  function handleClick() {
    ref.current = ref.current + 1
    alert("你点击了 " + ref.current + " 次!")
  }

  return <button onClick={handleClick}>点我！</button>
}
```

`ref` 就像组件的一个不被 `React` 追踪的秘密口袋。例如，**可以使用 `ref` 来存储 `timeout ID`、`DOM` 元素 和其他不影响组件渲染输出的对象**。

### 10.1 使用 `ref` 访问 `DOM` 元素

```jsx
import { useRef } from "react"

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    // 设置 DOM 元素的焦点
    inputRef.current.focus() // [!code highlight]
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  )
}
```

::: note

访问列表中的元素，使用 `ref` 来获取 DOM 元素。

这种是错误做法:

```jsx
<ul>
  {items.map((item) => {
    // 行不通！
    const ref = useRef(null)
    return <li ref={ref} />
  })}
</ul>
```

正确做法:

使用 Map 维护 Ref 列表:

```jsx
// 使用 Map
function getMap() {
  if (!itemsRef.current) {
    // 首次运行时初始化 Map。
    itemsRef.current = new Map()
  }
  return itemsRef.current
}
```

在 `map` 中存储 `ref` 的值，可以避免每次渲染时重新创建 `ref`。

```jsx
<ul>
  {catList.map((cat) => (
    <li
      key={cat}
      ref={(node) => {
        const map = getMap() // [!code highlight]
        if (node) {
          // 有 node 参数，表示添加元素
          map.set(cat, node) // [!code highlight]
        } else {
          // 没有 node 参数，表示删除元素
          map.delete(cat) // [!code highlight]
        }
      }}
    >
      <img src={cat} />
    </li>
  ))}
</ul>
```

也可以使用这种方法:

```jsx
<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    // Add to the Map
    map.set(cat, node);

    return () => {
      // Remove from the Map
      map.delete(cat);
    };
  }}
>
```

:::

`React` 默认 `ref` 不允许组件访问其他组件的 `DOM` 节点

解决办法: 使用 `forwardRef` 来访问其他组件的 `DOM` 节点

```jsx
import { useRef, forwardRef } from "react"

export default function TaskApp() {
  const inputRef = useRef(null)

  function handleClick() {
    // 这里可以访问到 MyInput 组件的 DOM 节点
    inputRef.current.focus() // [!code highlight]
  }

  return (
    <div>
      <MyInput ref={inputRef}></MyInput> // [!code highlight]
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

// 使用 forwardRef 来访问其他组件的 DOM 节点
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />
})
```

在上面的例子中，`MyInput` 暴露了原始的 `DOM` 元素 input。这让父组件可以对其调用 `focus()`。然而，这也让父组件能够做其他事情 —— 例如，改变其 `CSS` 样式。在一些不常见的情况下，你可能希望限制暴露的功能。你可以用 `useImperativeHandle` 做到这一点：

```jsx
import { useRef, useImperativeHandle, forwardRef } from "react"

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    // 只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus()
    },
  }))
  return <input {...props} ref={realInputRef} />
})
```

### 10.2 使用 Effect 进行同步

类似 `Vue` 的 `watch` 功能，使用 `Effect` 来同步 `ref` 的值。

1. **声明 Effect**。通常 Effect 会在每次 提交 后运行。
2. **指定 Effect 依赖**。大多数 Effect 应该按需运行，而不是在每次渲染后都运行。例如，淡入动画应该只在组件出现时触发。连接和断开服务器的操作只应在组件出现和消失时，或者切换聊天室时执行。你将通过指定 依赖项 来学习如何控制这一点。
3. **必要时添加清理操作**。一些 Effect 需要指定如何停止、撤销，或者清除它们所执行的操作。例如，“连接”需要“断开”，“订阅”需要“退订”，而“获取数据”需要“取消”或者“忽略”。你将学习如何通过返回一个 清理函数 来实现这些。

```jsx
export default function ChildComponent() {
  const [count, setCount] = useState(0)

  // useEffect 在组件渲染之后执行
  useEffect(() => {
    // 每次渲染都会执行此处代码
    console.log("useEffect")
    return () => {
      console.log("destroy")
    }
  })

  return <div>Child Component {count}</div>
}
```

**每当你的组件渲染时，React 会先更新页面**，然后再运行 `useEffect` 中的代码。换句话说，**`useEffect` 会“延迟”一段代码的运行，直到渲染结果反映在页面上**。

浏览器的 `<video>` 标签没有 `isPlaying` 属性。控制它的唯一方式是在 `DOM` 元素上调用 `play()` 和 `pause()` 方法。因此，你需要将 isPlaying prop 的值（表示视频当前是否应该播放）与 `play()` 和 `pause()` 等函数的调用进行同步。

我们首先需要获取 `<video>` DOM 节点的 对象引用。

你可能会尝试在渲染期间调用 `play()` 或 `pause()`，但这样做是不对的：

```jsx
const ref = useRef(null)

if (isPlaying) {
  ref.current.play() // 渲染期间不能调用 `play()`。
} else {
  ref.current.pause() // 同样，调用 `pause()` 也不行。
}
```

解决办法是 使用 `useEffect` 包裹副作用，**把它分离到渲染逻辑的计算过程之外**：

多按几次播放/暂停，观察视频播放器如何与 `isPlaying` 属性值保持同步：

```jsx :collapsed-lines
import { useState, useRef, useEffect } from "react"

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null)

  // 使用 Effect 来控制视频播放
  // 当 isPlaying 发生变化时，执行 Effect 中的逻辑
  useEffect(() => {
    // 如果 isPlaying 为 true，则播放视频
    if (isPlaying) {
      // 操作 DOM 元素
      ref.current.play()
    } else {
      ref.current.pause()
    }
  })

  return <video ref={ref} src={src} loop playsInline />
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "暂停" : "播放"}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  )
}
```

::: note

默认情况下，`Effect` 会在 每次 渲染后运行。正因如此，**以下代码会陷入死循环**：

```jsx
const [count, setCount] = useState(0)
useEffect(() => {
  setCount(count + 1)
})
```

:::

#### 10.2.1 指定 Effect 的依赖

默认情况下，`Effect` 会在 **每次** 渲染后运行。但往往 这并不是你想要的：

有时，它可能会很慢。与外部系统的同步并不总是即时的，所以你可能希望在不必要时跳过它。例如，你不会想在每次打字时都得重新连接聊天服务器。
有时，它可能会出错。例如，你不会想在每次按键时都触发组件的淡入动画。动画应该只在组件首次出现时播放。

通过在调用 `useEffect` 时指定一个 依赖数组 作为第二个参数，你可以让 `React` 跳过不必要地重新运行 `Effect`。

```jsx
useEffect(() => {
  // ...
}, []) // [!code ++]
```

但是，如果依赖数组为空，`Effect` 将不会在任何情况下运行。将产生以下错误：

`React Hook useEffect has a missing dependency: 'isPlaying'. Either include it or remove the dependency array.`

原因在于，你的 `Effect` 内部代码依赖于 `isPlaying prop` 来决定该做什么，但你并没有显式声明这个依赖关系。为了解决这个问题，**将 `isPlaying` 添加至依赖数组中**：

```jsx
useEffect(() => {
  if (isPlaying) {
    // isPlaying 在此处使用……
    // ...
  } else {
    // ...
  }
  // ……所以它必须在此处声明！
}, [isPlaying]) // [!code ++]
```

现在所有的依赖都已经声明，所以没有错误了。指定 `[isPlaying]` 作为依赖数组会告诉 `React`：如果 `isPlaying` 与上次渲染时相同，就跳过重新运行 `Effect`。这样一来，输入框的输入不会触发 `Effect` 重新运行，只有按下播放/暂停按钮会触发。

依赖数组可以包含多个依赖项。只有当你指定的 **所有** 依赖项的值都与上一次渲染时完全相同，`React` 才会跳过重新运行该 `Effect`。`React` 使用 `Object.is` 来比较依赖项的值。

::: note

```jsx
useEffect(() => {
  // 这里的代码会在每次渲染后运行
})
```

```jsx
useEffect(() => {
  // 这里的代码只会在组件挂载（首次出现）时运行
}, [])
```

```jsx
useEffect(() => {
  // 这里的代码不但会在组件挂载时运行，而且当 a 或 b 的值自上次渲染后发生变化后也会运行
}, [a, b])
```

:::

#### 10.2.2 必要时添加清理操作

考虑一个不同的例子。假如你正在编写一个 `ChatRoom` 组件，该组件在显示时需要连接到聊天服务器。现在为你提供了 `createConnection()` API，该 API 返回一个包含 `connect()` 与 `disconnection()` 方法的对象。如何确保组件在显示时始终保持连接？

从编写 Effect 的逻辑开始：

```jsx
useEffect(() => {
  const connection = createConnection()
  connection.connect()
})
```

上面每次渲染都会重新创建连接，这显然不是你想要的。

```jsx
useEffect(() => {
  const connection = createConnection()
  connection.connect()
}, []) // [!code ++]
```

**由于 `Effect` 中的代码没有使用任何 `props` 或 `state`，所以依赖数组为空数组 `[]`。这告诉 `React` 仅在组件“挂载”（即首次显示在页面上）时运行此代码**。

但是，如果 `ChatRoom` 组件在显示时需要连接到聊天服务器，而在隐藏时需要断开连接，该怎么办？

为了解决这个问题，`Effect` 需要返回一个清理函数(cleanup function)。

```jsx
useEffect(() => {
  const connection = createConnection()
  connection.connect()
  return () => {
    connection.disconnect() // [!code ++]
  }
}, [])
```

**React 会在每次 `Effect` 重新运行之前调用清理函数，并在组件卸载（被移除）时最后一次调用清理函数**。

现在在开发环境下，你会看到三条控制台日志：

1. "✅ 连接中……"
2. "❌ 连接断开。"
3. "✅ 连接中……"

::: note
在开发环境下，这是正确的行为。通过重新挂载你的组件，`React` 验证了离开页面再返回不会导致代码出错。因为本就应该先断开然后再重新连接！如果你很好地实现了清理函数，那么无论是只执行一次 `Effect` ，还是执行、清理、再执行，都应该没有用户可见的区别。**之所以会有额外的一次 `connect/disconnect` 调用，是因为在开发环境下 `React` 在检测你代码中的 bug。因此这是正常现象，不要去试图消除它！**

在生产环境下，你只会看到 "✅ 连接中……" 打印一次。这是因为重新挂载组件只会在开发环境下发生，以此帮助你找到需要清理的 `Effect`。**你可以通过关闭 严格模式 来禁用这个行为**，但我们建议保留它。它可以帮助你发现许多类似上述的 bug。
:::

### 10.3 Ref 与 State 的区别

- `ref` 的值在组件的整个生命周期中保持不变。
- `state` 的值在每次渲染时都可能不同。
- `ref` 不会触发重新渲染。
- `state` 会触发重新渲染。
- `ref` 通常用于访问 DOM 元素或管理不依赖于渲染输出的对象。
- `state` 用于管理组件内部的状态，这些状态需要触发重新渲染。
- 你不应在渲染期间读取（或写入） `current` 值。

### 10.4 `flushSync`

在 `React` 中，`state` 更新是排队进行的。通常，这就是你想要的。但是，在这个示例中会导致问题，因为 `setTodos` 不会立即更新 DOM。因此，当你将列表滚动到最后一个元素时，尚未添加待办事项。这就是滚动总是“落后”一项的原因。

要解决此问题，你可以强制 `React` 同步更新（“刷新”）DOM。 为此，从 `react-dom` 导入 `flushSync` 并将 state 更新包裹 到 `flushSync` 调用中：

```jsx
flushSync(() => {
  setTodos([...todos, newTodo])
})
listRef.current.lastChild.scrollIntoView()
```

## 11. 移除不需要的 Effect

### 11.1 多余的 state 和不必要的 Effect

假设你有一个包含了两个 state 变量的组件：`firstName` 和 `lastName`。你想通过把它们联结起来计算出 `fullName`。此外，每当 `firstName` 和 `lastName` 变化时，你希望 `fullName` 都能更新。你的第一直觉可能是添加一个 state 变量：`fullName`，并在一个 `Effect` 中更新它：

```jsx
function Form() {
  const [firstName, setFirstName] = useState("Taylor")
  const [lastName, setLastName] = useState("Swift")

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [fullName, setFullName] = useState("")
  useEffect(() => {
    setFullName(firstName + " " + lastName)
  }, [firstName, lastName])
  // ...
}
```

大可不必这么复杂。而且这样效率也不高：它先是用 fullName 的旧值执行了整个渲染流程，然后立即使用更新后的值又重新渲染了一遍。让我们移除 state 变量和 Effect：

```jsx
function Form() {
  const [firstName, setFirstName] = useState("Taylor")
  const [lastName, setLastName] = useState("Swift")
  // ...
  // ✅ 非常好：在渲染期间进行计算
  const fullName = firstName + " " + lastName
}
```

::: note

**如果一个值可以基于现有的 props 或 state 计算得出**，不要把它作为一个 state，而是在渲染期间直接计算这个值。这将使你的代码更快（避免了多余的 “级联” 更新）、更简洁（移除了一些代码）以及更少出错（避免了一些因为不同的 state 变量之间没有正确同步而导致的问题）。如果这个观点对你来说很新奇，React 哲学 中解释了什么值应该作为 state。

:::

### 11.2 缓存昂贵的计算

这个组件使用它接收到的 props 中的 filter 对另一个 prop todos 进行筛选，计算得出 visibleTodos。你的直觉可能是把结果存到一个 state 中，并在 Effect 中更新它：

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("")

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [visibleTodos, setVisibleTodos] = useState([])
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter))
  }, [todos, filter])

  // ...
}
```

正确做法是，首先，移除 state 和 Effect：

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("")
  // ✅ 如果 getFilteredTodos() 的耗时不长，这样写就可以了。
  const visibleTodos = getFilteredTodos(todos, filter)
  // ...
}
```

一般来说，这段代码没有问题！但是，`getFilteredTodos()` 的耗时可能会很长，或者你有很多 todos。这些情况下，当 newTodo 这样不相关的 state 变量变化时，你并不想重新执行 getFilteredTodos()。

你可以使用 `useMemo` Hook 缓存（或者说 记忆（memoize））一个昂贵的计算。

```jsx
import { useMemo, useState } from "react"

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("")
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
  // ...
}
```

这会告诉 `React`，**除非 `todos` 或 `filter` 发生变化，否则不要重新执行传入的函数**。React 会在初次渲染的时候记住 `getFilteredTodos()` 的返回值。在下一次渲染中，它会检查 todos 或 filter 是否发生了变化。如果它们跟上次渲染时一样，useMemo 会直接返回它最后保存的结果。如果不一样，React 将再次调用传入的函数（并保存它的结果）。

你传入 useMemo 的函数会在渲染期间执行，所以它仅适用于 纯函数 场景。

## 12. React Hooks

React 的一些钩子，已省略 `useState`、`useReducer`，请查看使用案例

### 12.1 `useSyncExternalStore`

`useSyncExternalStore` 是 `React 18` 引入的一个 `Hook`，用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。这对于需要跟踪外部状态的应用非常有用。

#### 12.1.1 使用场景

1.订阅外部 store 例如(redux,Zustand德语)
2.订阅浏览器API 例如(online,storage,location)等
3.抽离逻辑，编写自定义hooks
4.服务端渲染支持

#### 12.1.2 用法

```ts
const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

- subscribe：用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数。
- getSnapshot：获取当前数据源的快照（当前状态）。
- getServerSnapshot?：在服务器端渲染时用来获取数据源的快照。

返回值：该 res 的当前快照，可以在你的渲染逻辑中使用

```tsx
const subscribe = (callback: () => void) => {
    // 订阅
    callback() 
    return () => { 
        // 取消订阅
    }
}

const getSnapshot = () => {
    return data
}

const res = useSyncExternalStore(subscribe, getSnapshot)
```

#### 12.1.3 案例

订阅浏览器 `localSotrage`, 可以确保组件在 `localStorage` 数据发生变化时，自动更新同步。

```ts
import {useSyncExternalStore} from "react";

export const useStorage = (key: string, initialValue: any) => {

  // 订阅者
  const subscribe = (callback: () => void) => {
    // 订阅浏览器 API
    window.addEventListener('storage', callback)
    return () => {
      // 取消订阅
      window.removeEventListener('storage', callback)
    }
  }

  const getServerSnapshot = () => {
    // 服务器端渲染
    return initialValue
  }

  const getSnapshot = () => {
    // 获取浏览器 API
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue
  }

  const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const updateStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new StorageEvent('storage'))
  }

  return [res, updateStorage]
}

// const [count, setCount] = useStorage('count', 1)
```

使用方法:

```tsx
import {useStorage} from "@/hooks/useStorage";

export default function Storage() {

  const [value, setValue] = useStorage('count', 1)

  return (
    <div>
      <button onClick={() => setValue(value - 1)}>-1</button>
      <h1>{value}</h1>
      <button onClick={() => setValue(value + 1)}>+1</button>
    </div>
  )
}

```

实现订阅浏览器的 `History` API

```ts
// 监听 history 变化
import {useSyncExternalStore} from "react";

export const useHistory = () => {
  const subscribe = (callback: () => void) => {
    // 订阅浏览器 API
    // popstate 只能监听浏览器前进后退按钮，无法监听 pushState、replaceState
    window.addEventListener('popstate', callback)
    return () => {
      // 取消订阅
      window.removeEventListener('popstate', callback)
    }
  }

  const getSnapshot = () => {
    return window.location.href
  }

  const getServerSnapshot = () => {
    return ''
  }

  const url = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const push = (url: string) => {
    window.history.pushState({}, '', url)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const replace = (url: string) => {
    window.history.replaceState({}, '', url)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return [url, push, replace] as const
}
```

使用方法:

```tsx
import {useHistory} from "@/hooks/useHistory";

export default function History() {

  const [url, push, replace] = useHistory()

  return (
    <div>
      <h1>{url}</h1>
      <button onClick={() => push('/cart')}>跳转到购物车</button>
      <button onClick={() => replace('/cart')}>跳转到购物车2</button>
    </div>
  )
}
```

### 12.2 `useTransition`

`useTransition` 是 `React 18` 中引入的一个 `Hook`，用于管理 UI 中的过渡状态，特别是在处理长时间运行的状态更新时。它允许你将某些更新标记为“过渡”状态，这样 `React` 可以优先处理更重要的更新，比如用户输入，同时延迟处理过渡更新。

#### 12.2.1 用法

```ts
const [isPending, startTransition] = useTransition();
```

返回值:

`useTransition` 返回一个数组,包含两个元素

1. isPending(boolean)，告诉你是否存在待处理的 transition。
2. startTransition(function) 函数，你可以使用此方法将状态更新标记为 transition。

#### 12.2.2 案例

加载大量的数据，使用 `useTransition` 来优化性能。

```tsx
export default function Transition() {

  const [isPending, startTransition] = useTransition()

  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState<Item[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)

    fetch('/api/list?keyword=' + e.target.value).then(res => res.json()).then(res => {
      startTransition(() => {
        setList(res.list)
      })
    })
  }

  return (
    <div>
      <input value={keyword} onChange={handleChange} />

      {isPending && <div>loading...</div>}

      <div>
        {
          list.map(item => (
            <Fragment key={item.id}>
              <div>
                {item.name}
              </div>
              <p>{item.address}</p>
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}
```

### 12.3 `useDeferredValue`

`useDeferredValue` 用于延迟某些状态的更新，直到主渲染任务完成。这对于高频更新的内容（如输入框、滚动等）非常有用，可以让 UI 更加流畅，避免由于频繁更新而导致的性能问题。

#### 12.3.1 `useTransition` 和 `useDeferredValue` 的区别

- `useTransition` 主要关注点是状态的过渡。它允许开发者控制某个更新的延迟更新，还提供了过渡标识，让开发者能够添加过渡反馈。
- `useDeferredValue` 主要关注点是单个值的延迟更新。它允许你把特定状态的更新标记为低优先级。

#### 12.3.2 用法

```ts
const deferredValue = useDeferredValue(value)
```

- `value`: 延迟更新的值(支持任意类型)
- `deferredValue`: 延迟更新的值,在初始渲染期间，返回的延迟值将与您提供的值相同

#### 12.3.3 案例

输入框模拟搜索功能

```tsx
export default function DeferredValue() {
  const [keyword, setKeyword] = useState('')
  const [list] = useState<Item[]>(() => {
    return mockjs.mock({
      'list|10000': [{
        id: '@id',
        name: '@natural',
        address: '@city'
      }]
    }).list
  })

  const deferredKeyword = useDeferredValue(keyword)

  const findList = () => {
    return list.filter(item => {
      return item.name.toString().includes(deferredKeyword)
    })
  }

  const isLoading = keyword !== deferredKeyword

  return (
    <div>
      <input value={keyword} onChange={e => setKeyword(e.target.value)}/>

      <div style={{opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.5s'}}>
        {
          findList().map(item => (
            <Fragment key={item.id}>
              <div>
                {item.name}
              </div>
              <p>{item.address}</p>
            </Fragment>
          ))
        }
      </div>
    </div>
  )
}
```

### 12.4 `useLayoutEffect`

1. `useLayoutEffect` 是一个类似于 `useEffect` 的钩子函数，它与 `useEffect` 的主要区别在于，`useLayoutEffect` 在浏览器更新DOM之前执行，而 `useEffect` 在浏览器更新DOM之后执行。

2. `useLayoutEffect` 时同步执行，在浏览器更新DOM之前执行，而 `useEffect` 在浏览器更新DOM之后执行。

#### 12.4.1 使用案例

```tsx
export default function App() {

  // 这里 box1 将不会有过渡效果
  useEffect(() => {
    const div1 = document.querySelector('#box1')
    div1.opcity = 1
    // 添加过渡效果
  }, [])
  

  // box2 将有过渡效果
  useLayoutEffect(() => {
    const div2 = document.querySelector('#box2')
    div2.opcity = 1
  }, [])

  return (
    <div>
      <div style={{opcity: 0}} id="box1"></div>
      <div style={{opcity: 0}} id="box2"></div>
    </div>
  )
}
```

因为 `useLayoutEffect` 是同步执行的，所以 `div2` 的 `opcity` 属性会立即被设置为 `1`，而 `div1` 的 `opcity` 属性会在浏览器更新DOM之后才被设置为 `1`。

### 12.5 `useRef`

1. `useRef` 是一个 `Hook`，用于在组件中创建一个可变的引用对象，该对象在组件的整个生命周期中保持不变。
可以用来保存值，经常用于计时器保存 `timerId`

2. `useRef` 可以绑定一个 DOM 元素或一个组件的实例，用于操作 DOM

#### 12.5.1 使用案例

```tsx
export default function App() {
  count [count, setCount] = useState(0)
  // 用于保存计时器 id，每次重新渲染不会重新赋值
  const timerId = useRef<NodeJS.Timeout>(null)
  // 用于操作 DOM 元素
  const btn = useRef<HTMLButtonElement | null>(null)

  const handleClick = () => {
    // 获取到 DOM 元素的实例，通过 current 属性即可
    console.log(btn.current)

    // 操作 DOM
    btn.current.style.background = 'red'
  }

  const start = () => {
    // 保存计时器 id
    timerId.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }

  const end = () => {
    if (timerId.current) {
      clearInterval(timerId.current)
    }
  }

  return (
    <div>
      <button ref={{ btn }} onClick={handleClick}>
        Test
      </button>

      <button onClick={start}>start</button>
      {count}
      <button onClick={end}>end</button>
    </div>
  )
}
```

#### 12.5.2 使用 `useRef` 获取子组件的节点

通过 `useRef` 获取子组件的节点，需要使用 `forwardRef` 来传递 `ref`。

```tsx
import React, { useRef } from "react"

export default function RefComponent() {

  // 通过 useRef 直接获取到子组件的节点
  const childRef = useRef<HTMLHeadingElement | null>(null)

  return (
    <>
      <button onClick={() => console.log(childRef.current)}>获取 Child</button>
      <Child ref={childRef} />
    </>
  )
}

// 通过 forwardRef 传递 ref
const Child = React.forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <h1 ref={ref}>Hello World</h1>
  )
})
```

#### 12.5.3 使用 `useImperativeHandle` 暴露子组件的实例

`useImperativeHandle` 是一个 `Hook`，用于在父组件中暴露子组件的实例。

```tsx
import React, { useImperativeHandle, useRef, useState } from "react"

interface ChildRef {
  count: number
  addCount: () => void
  minusCount: () => void
}

export default function RefComponent() {
  // 通过 useRef 直接获取到子组件的节点
  const childRef = useRef<ChildRef | null>(null)

  return (
    <>
      <button onClick={() => console.log(childRef.current)}>获取 Child</button>
      <button onClick={() => childRef.current?.addCount()}>增加</button>
      <button onClick={() => childRef.current?.minusCount()}>减少</button>
      <Child ref={childRef} />
    </>
  )
}

// 通过 forwardRef 传递 ref
const Child = React.forwardRef<ChildRef>((props, ref) => { // [!code--]
// React 19 之后 使用 ref 需要使用 {ref: React.Ref<ChildRef>} 来传递 ref
const Child = ({ref}: {ref: React.Ref<ChildRef>}) => { // [!code++]
  const [count, setCount] = useState(0)

  // 通过 `useImperativeHandle` 将返回结果暴露给父组件
  // 还有一个可选参数，依赖项参数，和 `useEffect` 的依赖项参数一样
  useImperativeHandle(ref, () => {
    return {
      count,
      addCount() {
        setCount(count + 1)
      },
      minusCount() {
        setCount(count - 1)
      }
    }
  })

  return (
    <>
      <button onClick={() => setCount(count + 1)}>count+1</button>
      <p>{count}</p>
      <h1>Hello World</h1>
    </>
  )
})
```

### 12.6 `useMemo`

`useMemo` 是一个 `Hook`，用于在组件中缓存计算结果。详单与 Vue 中的计算属性，使用方法和 `useEffect` 类似。

### 12.7 `useCallback`

`useCallback` 是一个 `Hook`，用于在组件中缓存函数。详单与 Vue 中的计算属性，使用方法和 `useEffect` 类似。

## 13 自定义 Hook

## 14 React 使用案例

### 14.1.1 购物车案例

使用 `Reducer` 实现购物车案例

```tsx :collapsed-lines
import { useEffect, useState, type ChangeEvent } from "react"
import { useImmer, useImmerReducer } from "use-immer"
import "./cart.css"

type CartItem = {
  id: number
  name: string
  price: number
  count: number
  isEdit: boolean
}

const cartList: CartItem[] = [
  {
    id: 0,
    name: "小米15",
    price: 9999,
    count: 2,
    isEdit: false,
  },
  {
    id: 1,
    name: "小米11",
    price: 2999,
    count: 4,
    isEdit: false,
  },
  {
    id: 2,
    name: "小米13",
    price: 4999,
    count: 1,
    isEdit: false,
  },
  {
    id: 3,
    name: "小米12",
    price: 3999,
    count: 1,
    isEdit: false,
  },
  {
    id: 4,
    name: "小米12",
    price: 3999,
    count: 1,
    isEdit: false,
  },
  {
    id: 5,
    name: "小米12",
    price: 1999,
    count: 8,
    isEdit: false,
  },
]

interface Action {
  type:
    | "add"
    | "sub"
    | "del"
    | "plus"
    | "minus"
    | "change"
    | "change-name"
    | "edit"
    | "search"
  id?: number
  payload?: CartItem[]
  name?: string
}

/* const cartReducer = (state: CartItem[], { type, id }: Action) => {
  switch (type) {
    case "add":
      return state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
    case "sub":
      return state.map((item) => {
        if (item.id === id && item.count > 0) {
          return {
            ...item,
            count: item.count - 1,
          }
        }
        return item
      })
    case "del":
      return state.filter((item) => item.id !== id)
  }
} */

const cartReducer = (draft: CartItem[], action: Action) => {
  let item: CartItem | undefined = undefined
  if (action.id !== undefined) {
    item = draft.find((item) => item.id === action.id)
  }
  // const item = draft.find((item) => item.id === action.id)
  switch (action.type) {
    case "plus":
      item && item.count++
      break
    case "minus":
      item && item.count--
      break
    case "del":
      return draft.filter((item) => item.id !== action.id)
    case "change":
      draft.splice(0, draft.length, ...action.payload!)
      break
    case "change-name":
      item && (item.name = action.name ?? "")
      break
    case "edit":
      item && (item.isEdit = !item.isEdit)
      break
    case "search":
      if (!action.name?.trim()) {
        // draft.splice(0, draft.length, ...action.payload!)
        return [...action.payload!]
      }
      return draft.filter((item) => item.name.includes(action.name!))
  }
}

export default function Cart() {
  const [keyword, setKeyword] = useState<string>("")
  const [history, setHistory] = useImmer<CartItem[][]>([])
  const [state, dispatch] = useImmerReducer(cartReducer, cartList)

  useEffect(() => {
    setHistory((draft) => {
      draft.push(JSON.parse(JSON.stringify(state)))

      if (draft.length > 10) {
        draft.shift()
      }
    })
  }, [state])

  function backHistory(cartList: CartItem[], index: number) {
    setHistory((draft) => {
      draft.splice(index)
      dispatch({ type: "change", payload: cartList })
    })
  }

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
    if (!e.target.value.trim()) {
      const payload = JSON.parse(JSON.stringify(history[0]))
      dispatch({ type: "change", payload })
    }
  }

  return (
    <div>
      <div>
        <input placeholder="请输入名称搜索" onChange={onSearchChange} />
        <button
          onClick={() =>
            dispatch({ type: "search", name: keyword, payload: history[0] })
          }
        >
          搜索
        </button>
      </div>
      <div>
        <p>历史记录:</p>
        <ul>
          {history.map((item, index) => {
            return (
              <li key={index}>
                #{index}{" "}
                <button onClick={() => backHistory(item, index)}>回退</button>
              </li>
            )
          })}
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {state.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {item.isEdit ? (
                  <input
                    value={item.name}
                    onBlur={() => dispatch({ type: "edit", id: item.id })}
                    onChange={(e) =>
                      dispatch({
                        type: "change-name",
                        id: item.id,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() => dispatch({ type: "minus", id: item.id })}
                >
                  -1
                </button>
                <span>{item.count}</span>
                <button onClick={() => dispatch({ type: "plus", id: item.id })}>
                  +1
                </button>
              </td>
              <td>
                <button onClick={() => dispatch({ type: "del", id: item.id })}>
                  删除
                </button>
                <button onClick={() => dispatch({ type: "edit", id: item.id })}>
                  修改
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>合计</td>
            <td>
              {state.reduce((prev, next) => prev + next.price * next.count, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
```

### 14.1.2 搜索案例

```tsx :collapsed-lines
import React, {
  memo,
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react"

interface News {
  title: string
  content: string
}

function App() {
  const [keyword, setKeyword] = useState("")
  const deferedKeyword = useDeferredValue(keyword)
  const isLoading = keyword !== deferedKeyword

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div>
      <input type="text" value={keyword} onChange={handleInputChange} />

      <Suspense fallback={<div>Loading...</div>}>
        <div
          style={{ opacity: isLoading ? 0.5 : 1, transition: "opacity 0.5s" }}
        >
          <NewsList keyword={deferedKeyword} />
        </div>
      </Suspense>
    </div>
  )
}

const NewsList = memo(({ keyword }: { keyword: string }) => {
  const [news, setNews] = useState<News[]>([])
  const timerId = useRef<number | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (keyword === "") {
      return
    }
    timerId.current = setTimeout(() => {
      fetch("/api/list?keyword=" + keyword)
        .then((res) => res.json())
        .then((res) => {
          startTransition(() => {
            setNews(res.list)
          })
        })
    }, 400)
    return () => {
      clearTimeout(timerId.current!)
    }
  }, [keyword])

  if (keyword === "") {
    return <div>请输入关键字搜索</div>
  }

  /* if (isPending) {
    return <div>Loading....</div>
  } */

  return (
    <div>
      {news.map((item, index) => {
        return (
          <div style={{ padding: "10px", background: "pink" }} key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        )
      })}
    </div>
  )
})

export default App
```
