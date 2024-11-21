---
title: UniApp基础配置
createTime: 2024/11/16 22:17:43
permalink: /frontend/uniapp/u19w3e17/
---

### 创建项目

官网地址：[uni-app 官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/quickstart-cli.html)

#### 1.HbuilderX 创建项目

可视化操作

#### 2.Cli 创建项目(推荐)

```bash
# 安装vue3 + ts版本
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
# vue脚手架创建
vue create -p dcloudio/uni-preset-vue my-project
```

**优势**

通过命令行创建 uni-app 项目，**不必依赖 HBuilderX**，TypeScript 类型支持友好。

**命令行创建** **uni-app** **项目：**

vue3 + ts 版

::: code-group

```sh
# 通过 npx 从 github 下载
npx degit dcloudio/uni-preset-vue#vite-ts 项目名称
```

```sh
# 通过 git 从 gitee 克隆下载 (👉备用地址)
git clone -b vite-ts https://gitee.com/dcloud/uni-preset-vue.git
```

::: danger 常见问题

- 运行 `npx` 命令下载失败，请尝试换成**手机热点重试**
- 换手机热点依旧失败，请尝试从[国内备用地址下载](https://gitee.com/dcloud/uni-preset-vue/tree/vite-ts/)
- 在 `manifest.json` 文件添加 [小程序 AppID](https://mp.weixin.qq.com/) 用于真机预览
- 运行 `npx` 命令需依赖 NodeJS 环境，[NodeJS 下载地址](https://nodejs.org/zh-cn)
- 运行 `git` 命令需依赖 Git 环境，[Git 下载地址](https://git-scm.com/download/)

#### 安装插件

VSCode: uni-create-view、uni-helper、uniapp 小程序扩展

**配置扩展**

设置中配置 uni-create-view 插件的默认配置

#### 支持 ts 提示

安装 types

```bash
pnpm i -D @types/wechat-miniprogram @uni-helper/uni-app-types
```

配置 tsconfig.json

```json
// tsconfig.json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    // 类型声明文件
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types" // uni-app 组件类型
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    // 原配置 `experimentalRuntimeMode` 现调整为 `nativeTags`
    "nativeTags": ["block", "component", "template", "slot"], // [!code ++]
    "experimentalRuntimeMode": "runtime-uni-app" // [!code --]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

**工作区设置参考**

```json
// .vscode/settings.json
{
  // 在保存时格式化文件
  "editor.formatOnSave": true,
  // 文件格式化配置
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置语言的文件关联
  "files.associations": {
    "pages.json": "jsonc", // pages.json 可以写注释
    "manifest.json": "jsonc" // manifest.json 可以写注释
  }
}
```

::: danger 版本升级

- 原依赖 `@types/wechat-miniprogram` 现调整为 [miniprogram-api-typings](https://github.com/wechat-miniprogram/api-typings)。
- 原配置 `experimentalRuntimeMode` 现调整为 `nativeTags`。

:::

这一步处理很关键，否则 TS 项目无法校验组件属性类型。

**json 支持注释**

```json
"files.associations": {
    "manifest.json": "jsonc",
    "pages.json": "jsonc"
  },
```

:::

### 编译和运行 uni-app 项目

1. 安装依赖 `pnpm install`
2. 编译成微信小程序 `pnpm dev:mp-weixin`
3. 导入微信开发者工具

::: tip 温馨提示
编译成 H5 端可运行 `pnpm dev:h5` 通过浏览器预览项目。
:::

::: tip 温馨提示

`VS Code` 可通过快捷键 `Ctrl + i` 唤起代码提示。

:::

### 安装 [uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#npm安装)

```sh
pnpm i @dcloudio/uni-ui
```

**配置自动导入组件**

```json
// pages.json
{
  // 组件自动导入
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置  // [!code ++]
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue" // [!code ++]
    }
  },
  "pages": [
    // …省略
  ]
}
```

**安装类型声明文件**

```sh
pnpm i -D @uni-helper/uni-ui-types
```

**配置类型声明文件**

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types", // uni-app 组件类型
      "@uni-helper/uni-ui-types" // uni-ui 组件类型  // [!code ++]
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  }
}
```

### 封装请求方法

/src/utils.ts

```ts
import { useMemberStore } from "@/stores"

// 请求基地址
const baseURL: string = "https://pcapi-xiaotuxian-front-devtest.itheima.net"

const httpInterceptor: UniApp.InterceptorOptions = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1.非http拼接地址
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url
    }
    // 2.请求超时,默认60秒
    options.timeout = 10000
    // 3.添加小程序端请求标识
    options.header = {
      ...options.header,
      "source-client": "miniapp",
    }
    // 4.添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
  // 直接重写返回值有缺点，无法使用泛型
  /* async returnValue(result: Promise<UniApp.RequestSuccessCallbackResult>) {
    return (await result).data
  }, */
}

// 添加拦截器
uni.addInterceptor("request", httpInterceptor)
uni.addInterceptor("uploadFile", httpInterceptor)

/**
 * 基本数据结构
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}

/**
 * 全局请求方法
 * @param options UniApp.RequestOptions
 * @returns Promise
 */
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回一个promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success: (result: UniApp.RequestSuccessCallbackResult) => {
        // 状态码2xx，表示成功
        if (result.statusCode >= 200 && result.statusCode < 300) {
          resolve(result.data as Data<T>)
        } else if (result.statusCode === 401) {
          // 401错误 -> 清除用户信息 跳转登录页面
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: "/pages/login/login" })
          reject(result)
        } else {
          // 其他一些错误 -> 根据后端提示错误信息
          uni.showToast({
            icon: "none",
            title: (result.data as Data<T>).msg || "请求错误",
          })
          reject(result)
        }
      },
      // 网络错误，请求失败
      fail: (err) => {
        uni.showToast({ icon: "none", title: "网络错误，请尝试更换网络" })
        reject(err)
      },
    })
  })
}
```

#### 请求方法封装 2

```ts
import { useUserStore } from "@/store/user"

let BASE_URL = ""

// #ifdef H5
BASE_URL = import.meta.env.VITE_H5_API
// #endif

// #ifdef APP-PLUS
BASE_URL = import.meta.env.VITE_APP_API
// #endif

// UniApp自带的拦截器
uni.addInterceptor("request", {
  // 前置钩子，可以对方法参数进行修改
  invoke(options: UniApp.RequestOptions) {
    // 前缀非http的追加域名
    if (!options.url.startsWith("http")) {
      options.url = BASE_URL + options.url
    }
    // 设置请求的超时时间为10秒
    options.timeout = 10000
    if (!options.header) {
      options.header = {}
    }
    options.header["Content-Type"] = "application/x-www-form-urlencoded"
    // 添加用户的身份标识
    const userStore = useUserStore()
    const cookie = userStore.user.cookie
    if (cookie) {
      // 添加Cookie到请求头中
      options.header.Cookie = cookie
    }
  },
})

/**
 * 基本数据结构
 */
interface Response<T> {
  status: number
  data: T
  msg: string
}

export const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Response<T> | UniApp.RequestSuccessCallbackResult>(
    (resolve, reject) => {
      uni.request({
        ...options,
        async success(result) {
          if (result.statusCode >= 200 && result.statusCode < 300) {
            if (typeof result.data === "string") {
              resolve(result)
            } else {
              resolve(result.data as Response<T>)
            }
          } else if (result.statusCode === 401) {
            // 身份验证失败
            await uni.showToast({ icon: "none", title: "身份验证失败" })
          } else {
            await uni.showToast({ icon: "none", title: "请求失败" })
            reject(new Error((result.data as Response<T>).msg || "请求失败"))
          }
        },
        // 网络请求错误
        async fail(result) {
          await uni.showToast({
            icon: "none",
            title: "网络请求错误: " + result.errMsg,
          })
          reject(new Error(result.errMsg))
        },
        complete(result) {},
      })
    }
  )
}

function get<T, V extends object>(url: string, data: V) {
  return request<T>({
    url,
    method: "GET",
    data,
  })
}

function post<T, V extends object>(url: string, data: V) {
  return request<T>({
    url,
    method: "POST",
    data,
  })
}

export default {
  get,
  post,
}
```
