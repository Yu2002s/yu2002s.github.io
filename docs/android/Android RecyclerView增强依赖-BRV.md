---
title: Android RecyclerView增强依赖-BRV
createTime: 2024/08/31 17:43:56
permalink: /article/ipx72c5c/
tags: [RecyclerView]
---

BRV 为快速构建 RV 列表工具, 以开源分享来完善, 将一直保持社区维护

<!-- more -->

[文档地址](https://liangjingkanji.github.io/BRV/index.html) [GITHUB](https://github.com/liangjingkanji/BRV)

简单语法

```kotlin
class BrvActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityBrvBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val rv = binding.rv
        rv.linear().setup {}
    }
}
```
