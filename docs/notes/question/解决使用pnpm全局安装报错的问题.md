---
title: 解决使用pnpm全局安装报错的问题
createTime: 2024/08/08 20:47:43
permalink: /question/osu8nxpl/
---

问题：使用pnpm安装包报错
执行以下可解决问题

1. `pnpm setup`    #自动设置环境变量
2. `pnpm config set global-bin-dir "D:\nodejs"`   # pnpm全局bin路径

拓展： 其他设置

::: code-tabs
@tab pnpm

```shell
pnpm config set store-dir "D:\.pnpm-store" # pnpm全局仓库路径(类似 .git 仓库)
pnpm config set global-dir "D:\nodejs\pnpm\pnpm-global" # pnpm全局安装路径
pnpm config set global-bin-dir "D:\nodejs" # pnpm全局bin路径
pnpm config set state-dir "D:\nodejs\pnpm" # pnpm创建pnpm-state.json文件的目录
pnpm config set cache-dir "D:\nodejs\pnpm\cache" # pnpm全局缓存路径
```