---
title: 解决Spring项目使用Lombok注解无法生效问题
createTime: 2025/01/05 16:16:25
permalink: /question/4z2p5f5b/
tags: [Java, Spring, Lombok]
---

SpringBoot 项目在使用 Lombok 注解时，无法生效。

<!-- more -->

正常使用 Lombok 注解

```java
@Data
@AllArgsConstructor // 生成全参构造器
public class Result<T> {

  private Integer code;

  private String message;

  private T data;

  // ...
}
```

在使用了注解: `@AllArgsConstructor` 后，执行构建编译，控制台报错。

报错内容显示：传入的实参和需要的实参不同，无法匹配到构造器。
会不会是 Idea 的缓存问题？

经过多次尝试，**将 idea 升级到了最新版本，又把 idea 的缓存清理刷新了一下**，均无法解决问题。

最后，打开 idea 的设置: `Settings -> Build, Execution, Deployment -> Compiler -> Annotation Processors`

发现 `Enable annotation processing` 选项是开启的，并且配置都是正常的。那是哪里出了问题呢？

我注意到这个设置项左边还有个列表面板

- Default
- Annotation profile for `project name`

点击第二个选项：**发现 `Processor path` 指向的目录是错误的**

指向目录:

> \repository\org\projectlombok\lombok\unknown\lombok-unknown.jar

很明显，目录出现了`unknown`，导致无法找到对应的 `lombok` 依赖。

解决方式：

**勾选 `Obtain processors from project classpath` 即可解决**

修改完成之后，运行编译正常，目前不知道为什么会出现这个问题。
