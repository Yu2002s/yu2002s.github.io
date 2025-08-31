---
title: ElementPlus一些配置
createTime: 2025/07/30 15:29:29
permalink: /frontend/vue/lbirnliv/
---

## 按需引入

安装所需依赖

```shell
npm install unplugin-vue-components unplugin-auto-import -D
```

配置 `vite.config.ts`

```ts title="vite.config.ts"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## 主题色修改

::: steps
1. 开始之前，确保你已经安装了 `sass`

```shell
npm install sass --save-dev
```

2. src 目录新建文件 `/src/styles/element/index.scss`

3. 覆盖 element-plus 的样式

```scss
/* 只需要重写你需要的即可 */
@forward "element-plus/theme-chalk/src/common/var.scss" with (
  $colors: (
    "primary": (
      // 主色
      "base": #27ba9b,
    ),
    "success": (
      // 成功色
      "base": #1dc779,
    ),
    "warning": (
      // 警告色
      "base": #ffb302,
    ),
    "danger": (
      // 危险色
      "base": #e26237,
    ),
    "error": (
      // 错误色
      "base": #cf4444,
    ),
  )
);
```

:::

### 全局引入

`main.ts` 中引入

```ts
import "./styles/element/index.scss"
```

### 按需引入

vite.config.ts 中配置

```ts title="vite.config.ts"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export defineConfig({
  plugins: [
    vue(),
    // 设置自动导入
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })], // [!code highlight]
    }),
    // 组件自动导入
    Components({
      resolvers: [
        ElementPlusResolver({   // [!code highlight]
          importStyle: 'sass', // [!code highlight]
        }),                    // [!code highlight]
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      // 预处理器配置
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`, // [!code highlight]
      },
    },
  },
  resolve: {
    // 配置别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // [!code highlight]
    },
  },
})

```
