---
title: Axios二次封装
createTime: 2024/06/05 14:08:54
permalink: /article/nrimt3pj/
tags: [axios]
---

在项目开发的时候，我们会对 axios 进行二次封装，使用请求拦截器和相应拦截器，进行一些全局处理

<!-- more -->

> 请求拦截器：在请求拦截器中统一设置请求头；

> 响应拦截器：可以在响应拦截器中处理一些业务，判断 http 相应状态码，统一处理一些操作；

---

在 src 目录下创建 utils/request.ts 文件

```ts
import axios from "axios"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/user"
import pinia from "@/store"

//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  // 判断用户是否登录
  if (userStore.token) {
    // 已登录用户请求头设置token
    config.headers.Authorization = token
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ""
    let status = error.response.status
    switch (status) {
      case 401:
        // 可以在这里清除用户信息
        msg = "token过期"
        break
      case 403:
        msg = "无权访问"
        break
      case 404:
        msg = "请求地址错误"
        break
      case 500:
        msg = "服务器出现问题"
        break
      default:
        msg = "无网络"
    }
    ElMessage({
      type: "error",
      message: msg,
    })
    return Promise.reject(error)
  }
)
export default request
```
