---
title: Vue项目中使用Svg图标
createTime: 2024/06/03 17:21:25
permalink: /article/lfkxk2qz/
---

**在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,**

**这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。**

#### 安装Svg依赖插件

```bash
pnpm install vite-plugin-svg-icons -D
```

#### 在vite.config.ts中配置

```ts
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'

export default () => {
    return {
        plugins: [
            createSvgIconsPlugin({
                // Specify the icon folder to be cached
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
    }
}
```

#### main.ts中导入

```ts
import 'virtual:svg-icons-register'
```

#### 封装全局组件

在`src/components`目录下创建一个`SvgIcon`组件：

```html

<template>
    <div>
        <svg :style="{ width: width, height: height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        //xlink:href属性值的前缀
        prefix: {
            type: String,
            default: '#icon-'
        },
        //svg矢量图的名字
        name: String,
        //svg图标的颜色
        color: {
            type: String,
            default: ""
        },
        //svg宽度
        width: {
            type: String,
            default: '16px'
        },
        //svg高度
        height: {
            type: String,
            default: '16px'
        }

    })
</script>
<style scoped></style>
```

#### 注册为全局组件

main.ts

```ts
import SvgIcon from '@/components/SvgIcon/index.vue'

...

app.component("SvgIcon", SvgIcon)
```
