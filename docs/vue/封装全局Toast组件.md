---
title: 封装全局Toast组件
createTime: 2024/06/05 14:17:58
permalink: /article/272knjl0/
tags: [封装组件]
---

有些时候需要用全局提示组件，类型于 elementUi 的组件。这里使用了 `pinia `实现这个功能

<!-- more -->

---

使用 pinia 实现

src/store/toast.ts

```ts
import { defineStore } from "pinia"

interface LayoutState {
  toast: {
    // 显示状态
    show: boolean
    // 显示内容
    message: string
  }
}

export const useLayoutStore = defineStore("layout", {
  state(): LayoutState {
    return {
      toast: {
        show: false,
        message: "",
      },
    }
  },
  getters: {},
  actions: {},
})
```

src/components/toast/index.vue

```html
<script setup lang="ts">
  import { useLayoutStore } from "@/stores/layout"

  defineOptions({ name: "Toast" })

  const layoutStore = useLayoutStore()
</script>

<template>
  <div class="toast" v-show="layoutStore.toast.show">
    {{ layoutStore.toast.message }}
  </div>
</template>

<style scoped lang="scss">
  .toast {
    z-index: 999999;
    color: white;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 2px #eee;
    position: fixed;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
```

显示 toast

```ts
import { useLayoutStore } from "@/stores/layout"
import pinia from "@/stores"

const layoutStore = useLayoutStore(pinia)

let timer: number = 0

export const showToast = (message: string, time = 2000) => {
  if (timer) {
    clearTimeout(timer)
  }

  layoutStore.toast = {
    show: true,
    message,
  }

  timer = setTimeout(() => {
    layoutStore.toast.show = false
    timer = 0
  }, time)
}
```

最后在 App.vue 中使用组件

```html
<template>
  <div>
    <Toast />
  </div>
</template>
```
