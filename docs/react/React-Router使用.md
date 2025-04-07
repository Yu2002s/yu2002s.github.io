---
title: React-Router使用
createTime: 2025/01/03 10:19:26
permalink: /article/o4mv65z8/
tags: [React, Router]
---

`React Router` 是一个用于 `React` 的多策略路由器，它弥合了从 React 18 到 React 19 的差距。
可以最大程度地将其用作 React 框架，或者至少将其用作具有自己架构的库。

<!-- more -->

::: tip
有两种方式进行安装，一种是以框架的形式安装，一种是以库的形式安装。
:::

## 以框架的形式安装

框架场景熟练使用 `React Router` 的开发者，可以按照以下步骤进行安装：

```shell
npx create-react-router@latest project-name
```

### Route 路由

路由配置文件 /app/routes.ts

```ts
import { type RouteConfig, route } from "@react-router/dev/routes"

export default [
  route("some/path", "./some/file.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig // 和 as 不同
```

以[文件系统路由约定](https://reactrouter.com/how-to/file-route-conventions)管理路由

```ts
import { type RouteConfig, route } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

export default [
  route("/", "./home.tsx"),

  ...(await flatRoutes()),
] satisfies RouteConfig
```

#### 嵌套路由

它允许路由嵌套在父路由中，形成父子路由，对应的路径为 `/parent/child`。

```ts
// 父路由 /dashboard
route("dashboard", "./dashboard.tsx", [
  // 子路由 /dashboard
  index("./home.tsx"),
  // /dashboard/settings
  route("settings", "./settings.tsx"),
]),
```

在父路由中需要配置 `<Outlet />` 设置子路由展示的位置。

```tsx
import { Outlet } from "react-router"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 将会是 home.tsx 或者 settings.tsx */}
      <Outlet />
    </div>
  )
}
```

#### 布局路由

布局路由和嵌套路由类似，但是不同的是，布局路由的父路由不会追加在路径中，不用配置 `path` 属性。

```ts
layout("./marketing/layout.tsx", [
  index("./marketing/home.tsx"),
  route("contact", "./marketing/contact.tsx"),
]),
```

#### 路由前缀

用于添加一个公共的路由前缀

```ts
...prefix("projects", [ // [!code highlight]
  index("./projects/home.tsx"),
  layout("./projects/project-layout.tsx", [
    route(":pid", "./projects/project.tsx"),
    route(":pid/edit", "./projects/edit-project.tsx"),
  ]),
]),
```

## 以库的形式安装

如果只是构建简单路由应用，直接安装依赖即可：

```shell
# 创建一个 vite 项目
npx create-vite@latest
# 安装所需依赖
npm i react-router
```

在 `index.js` 文件中使用路由

```jsx
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

上面使用的是 `history` 方式，也可以使用 `hash` 方式：

```jsx
<HashRouter>
  <App />
</HashRouter>
```

### Route 路由

#### 1. 配置路由

直接通过配置标签的形式配置路由，使用 `path` 属性指定路由路径，使用 `element` 属性指定路由组件。

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
</BrowserRouter>
```

#### 2. 嵌套路由

路由可以嵌套在父路由中，形成父子路由，对应的路径为 `/parent/child`。

```jsx
<Routes>
  {/* 需要在父路由中展示子路由，需要配置 <Outlet /> */}
  <Route path="dashboard" element={<Dashboard />}>
    {/* index 表示的是默认路由 */}
    <Route index element={<Home />} />
    {/* 其他路由，访问路径 /dashboard/settings */}
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

在父路由中配置 `Outlet`, 使其能够展示子路由。

```jsx
import { Outlet } from "react-router"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  )
}
```

s

#### 3. 布局路由

和嵌套路由类似，但是不同的是，布局路由的父路由不会追加在路径中，不用配置 `path` 属性。

```jsx
<Routes>
  <Route element={<MarketingLayout />}>
    {" "}
    // [!code highlight]
    <Route index element={<MarketingHome />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  <Route path="projects">
    <Route index element={<ProjectsHome />} />
    <Route element={<ProjectsLayout />}>
      {" "}
      // [!code highlight]
      <Route path=":pid" element={<Project />} />
      <Route path=":pid/edit" element={<EditProject />} />
    </Route>
  </Route>
</Routes>
```

其中父路由中的内容为子路由的公共部分

#### 4. 动态路由

动态路由是指路由路径中包含变量的部分，如 `/user/:id`，其中 `:id` 为变量。

```jsx
<Route path="teams/:teamId" element={<Team />} />
```

通过 `useParams` hooks 获取到路径参数

```jsx
import { useParams } from "react-router"

export default function Team() {
  let params = useParams()
  // params.teamId
}
```

可选参数

```jsx
<Route path=":lang?/categories" element={<Categories />} />

<Route path="users/:userId/edit?" element={<User />} />
```

泛型路由

```jsx
<Route path="files/*" element={<File />} />
```

在组件中获取

```jsx
let params = useParams()
// params["*"] will contain the remaining URL after files/
let filePath = params["*"]
```

也可以进行结构

```jsx
let { "*": splat } = useParams()
```

#### 5. NavLink

`NavLink` 组件是一个 `Link` 组件的扩展，它具有一些额外的功能，如 `isActive` 属性，用于确定当前链接是否处于活动状态。

```jsx
import { NavLink, Link } from "react-router"

function Header() {
  return (
    <nav>
      {/* NavLink makes it easy to show active states */}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <Link to="/concerts/salt-lake-city">Concerts</Link>
    </nav>
  )
}
```

## 路由模块

路由模块是一个用于管理路由的库，它提供了一些功能，如路由配置、路由匹配、路由跳转等。

- 自动代码分割
- 数据加载
- Actions
- 重新验证
- 错误边界
- 其他功能

### loader

在服务端加载数据，可以调用服务端中的服务，例如：可以直接操作数据库，打包不会将此处代码打包到客户端。
可以为客户端提供数据

```tsx
/**
 * 服务端加载数据
 */
export async function loader({params}: Route.LoaderArgs) {
  // 服务端加载数据
  // 可以直接操作数据库
  return {
    data: 'hello world2'
  }
}
```

### clientLoader

客户端加载数据，可以补充 `loader` 中加载的数据，也可以替代 `loader`。

```ts
/**
 * 客户端将在数据这里处理
 */
export async function clientLoader({
  params,
  serverLoader,
}: Route.ClientLoaderArgs) {
  // const data = await serverLoader()
  // 客户端加载数据
  return {
    data: "hello",
    test: "123",
  }
}
```

在函数上设置 `hydrate` 属性，参与服务端渲染的初始化页面加载水合。

```ts
clientLoader.hydrate = true as const;
```

:::tip
通过使用 `as const`，`TypeScript` 将会推断出 c`lientLoader.hydrate` 的类型为 `true` 而非 `boolean` 类型。这样一来，`React Router` 就能够基于 `clientLoader.hydrate` 的值来推导出 `loaderData` 的类型了。
:::

### action

路由操作（Route actions）允许进行服务器端的数据变更，并且当从 `<Form>`、`useFetcher` 以及 `useSubmit` 进行调用时，会自动重新验证页面上所有的加载器（loader）数据：

```tsx
/**
 * 服务端 action
 * @param request
 * @returns
 */
export async function action({ request }: Route.ActionArgs) {
  // return redirect('/login')
  return {
    ok: true,
  }
}
```

完整例子:

```tsx
// route("/list", "./list.tsx")
import { Form } from "react-router";
import { TodoList } from "~/components/TodoList";

// action 完成后数据才会加载...
export async function loader() {
  const items = await fakeDb.getItems();
  return { items };
}

// ...以便此处的列表能够自动更新
export default function Items({ loaderData }) {
  return (
    <div>
      <List items={loaderData.items} />
      <Form method="post" navigate={false} action="/list">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const todo = await fakeDb.addItem({
    title: data.get("title"),
  });
  return { ok: true };
}
```

### clientAction

客户端 `action` 是一种特殊的 action，它允许在客户端进行数据变更，而不需要重新加载整个页面。当使用客户端 action 时，React Router 会自动重新验证页面上所有的加载器（loader）数据，以保证数据的一致性。

```tsx
/**
 * 客户端 action 比 服务端 action 优先执行
 * 表单提交的数据将在这里进行处理
 * @param request 请求数据
 * @returns
 */
export async function clientAction({ request, serverAction }: Route.ClientActionArgs) {
  // 也可以进行获取服务端 action 的数据
  // const result = await serverAction()
  // 客户端操作数据
  // 表单数据
  const formData = await request.formData()
  // 获取表单数据
  const title = formData.get("title")

  // 这里执行网络请求
  // await fetch('/api', 'POST', {xxx: xxx})
  return {
    // 返回请求到的数据并进行返回
    ok: true,
  }
}
```

### ErrorBoundary

处理路由出现的异常，他会代替路由的加载。
路由中不配置，则使用 root 中的 `ErrorBoundary`

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
```

### HydrateFallback

当服务端渲染加载时，将展示这个组件，当客户端加载时，将展示路由组件。

```tsx
export function HydrateFallback() {
  return <p>Loading Game...</p>;
}
```

### headers

服务端返回的响应头，可以设置 `Cache-Control` 等。

```ts
export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}
```

### handle

路由句柄（Route handle）允许应用程序向 `useMatches` 中的路由匹配结果添加任何内容，以创建抽象概念（比如面包屑导航等）：

```ts
export const handle = {
  its: "all yours",
};
```

### links

用于定义网页的 `<link>`元素，将在 `<head>`中插入。

```ts
export function links() {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    },
  ];
}
```

所有的路由链接（Route links）将会被汇总并通过 `<Links />` 组件进行渲染，通常该组件会在应用的根组件中被渲染：

```tsx
import { Links } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <Links />
      </head>

      <body />
    </html>
  );
}
```

### meta

路由元数据（Route meta）用于定义那些将会在文档的 `<head>` 部分被渲染的元标签（meta tags）
其他同上，将会插入到 `<head>` 中。

### shouldRevalidate

默认情况下，在执行操作（actions）之后，所有路由都会进行重新验证（revalidated）。而此功能允许某个路由选择不针对那些不会影响其自身数据的操作进行重新验证。

```ts
import type { ShouldRevalidateFunctionArgs } from "react-router";

export function shouldRevalidate(arg: ShouldRevalidateFunctionArgs) {
  return true;
}
```

## Form 和 Fetcher

```tsx
export default function Home() {
  const fetcher = useFetcher()
  const submit = useSubmit()

  // 提交状态
  const busy = fetcher.state !== 'idle'

  function fetcherAction() {
    /*

    // 发送表单数据
    // Submit a FormData instance (GET request)
    const formData = new FormData();
    fetcher.submit(formData);

    // 直接指定表单进行发送
    // Submit the HTML form element
    fetcher.submit(event.currentTarget.form, {
      method: "POST",
    });

    // 提交 json 表单实例
    // Submit key/value JSON as a FormData instance
    fetcher.submit(
      { serialized: "values" },
      { method: "POST" }
    );

    // 发送 json 数据
    // Submit raw JSON
    fetcher.submit(
      {
        deeply: {
          nested: {
            json: "values",
          },
        },
      },
      {
        method: "POST",
        encType: "application/json",
      }
    );

    */
    fetcher.submit(
      {
        title: "hello",
      },
      {
        method: "POST",
        action: "/api",
      }
    )
  }

  // 使用 submit 提交
  function submitAction() {
    submit({ title: "hello" }, {
      method: "POST",
      action: "/api",
    })
  }

  return (
    <div>
      {/* 没有指定 action 则提交到当前的页面 action 处理，Form会记录历史记录，使用 fetcher 则不会 */}
      <Form method="POST">
        <input type="text" name="title" />
        <button type="submit">提交</button>
      </Form>
      {actionData ? <p>{actionData.ok}</p> : null}

      {/* fetcher.Form 和 Form 的区别是 fetcher.Form 不会记录历史记录，浏览器页面不会发生跳转 */}
      <fetcher.Form method="post" onSubmit={e => fetcher.submit(e.currentTarget)}>
        <input type="text" name="title" />
        <button type="submit">提交</button>
      </fetcher.Form>
    </div>
  )
}
```

## 使用数据模式

推荐使用这种方式安装

```shell
npm i react-router
```

### 路由

使用 `createBrowserRouter` 方法定义一个路由导航器，相当于 `Vue` 的 `createHistoryRouter`

```tsx
import { createBrowserRouter } from "react-router";

function Root() {
  return <h1>Hello world</h1>;
}

const router = createBrowserRouter([
  { path: "/", Component: Root },
  { path: '/about', element: <div>About</div>}
]);

```

### 路由对象

```tsx
import {
  createBrowserRouter,
  useLoaderData,
} from "react-router";

createBrowserRouter([
  {
    path: "/teams/:teamId",
    loader: async ({ params }) => {
      let team = await fetchTeam(params.teamId);
      return { name: team.name };
    },
    Component: Team,
  },
]);

function Team() {
  let data = useLoaderData();
  return <h1>{data.name}</h1>;
}

```

使用 `TypeScript` 规范类型

```ts
interface Data {
  list: [
    {
      id: number,
      content: string
    }
  ]
}

function Component() {
  // 获取到加载的数据
  const laoderData = useLoaderData<Data>()
}
```

在数据还在加载时，展示加载效果

```tsx
function Loading() {
  return <div>loading...</div>
}


{
  path: "/",
  // element: <div>Hello world!</div>,
  Component: Root,
  // 此处加载数据
  loader: async ({params}) => {
    // params 为路径上的参数
    console.log(params)
    const res = await fetch('/api/list?keyword=' + params.keyword).then(res => res.json())
    return {
      list: res.list
    }
  },
  // 在 loader 中加载数据时，如果数据还没加载完成，将展示 HydrateFallback 中的内容
  HydrateFallback: Loading,
}
```

### 嵌套路由-数据模式

一个路由可以有子路由，他们是父子的关系

```tsx
export const router = createBrowserRouter([
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        // index: true, 当访问 /dashboard 时，会渲染 Home 组件
        index: true,
        Component: () => {
          return <div>Home</div>;
        },
      },
      {
        // /dashboard/setting
        path: "setting",
        Component: () => {
          return <div>Setting</div>;
        },
      },
    ],
  },
]);
```

在父路由中必须设置子路由要展示的位置

```tsx
function Dashboard() {
  return (
    <div>
      Dashboard
      <div>
        {/* 必须设置 Outlet 才会展示子路由 */}
        <Outlet />
      </div>
    </div>
  )
}
```

### 布局路由-数据默认

布局路由和嵌套路由类型，但是布局路由不用设置 `path`, 路径也不会进行追加

```tsx
export const router = createBrowserRouter([
  {
    // 不设置 path, 为布局路由
    // 直接访问根目录
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: () => <div>Child</div>
      }
    ]
  }
]);

```

### 前缀路由-数据模式

和嵌套路由类型，但是他没有 `Component` 属性，同意多个路由的路由前缀

```tsx
createBrowserRouter([
  {
    // no component, just a path
    path: "/projects",
    children: [
      { index: true, Component: ProjectsHome },
      { path: ":pid", Component: Project },
      { path: ":pid/edit", Component: EditProject },
    ],
  },
]);
```

### 动态路由-数据模式

通过 `path` 中定义动态的属性，可以传递给对应组件 `params` 参数

```ts
{
  path: "teams/:teamId",
  loader: async ({ params }) => {
    // params are available in loaders/actions
    // 获取到路由上动态参数
    let team = await fetchTeam(params.teamId);
    return { name: team.name };
  },
  Component: Team,
}

```

```tsx
import { useParams } from "react-router";

function Team() {
  // params are available in components through useParams
  // 获取到路由对应的 params 参数
  let params = useParams();
  // ...
}

```
