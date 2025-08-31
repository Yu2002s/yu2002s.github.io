---
title: Vue按需引入
createTime: 2025/07/30 15:48:47
permalink: /frontend/vue/mdbstzcf/
---

安装所需依赖

```shell
npm install unplugin-vue-components unplugin-auto-import -D
```

添加 ElementUi 按需引入，配置 `vite.config.ts`

```ts title="vite.config.ts"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      // 自动导入的文件名
      imports: ["vue", "vue-router"],
      // 指定生成.d.ts的位置
      dts: "src/auto-imports.d.ts",
      // 需要自动导入的文件
      include: [/\.[tj]sx?$/, /\.vue$/],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
        // 自动注册图标组件
        IconsResolver({
          prefix: "", // 默认前缀是i
          enabledCollections: ["ep"], // 选择图标库集合 ep
        }),
      ],
      // 指定.d.ts生成的位置
      dts: "src/components.d.ts",
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
```

::: tip
图标集合地址: [Icones](https://icones.netlify.app/)
:::

其中 Icons 插件时自动引入图标的

```ts
 Icons({
  // scale: 1, // 缩放
  compiler: 'vue3', // 编译方式
  // defaultClass: '', // 默认类名
  // defaultStyle: '', // 默认样式
  autoInstall: true
  // jsx: 'react' // jsx支持
})
```

Icon 组件自动引入详细配置

```ts
IconsResolver({
  prefix: "icon", // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
  // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
  // alias: { park: 'icon-park' } 集合的别名
  enabledCollections: ["ep"], // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
})
```

在页面中使用组件:

```html
<IconEpFold class="v-icon" />
<icon-ep-fold class="v-icon" />
```

::: tip
可能需要重新启动项目才会进行高亮生效
:::
