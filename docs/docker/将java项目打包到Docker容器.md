---
title: 将java项目打包到Docker容器
createTime: 2024/11/24 18:44:28
permalink: /article/2u371ze9/
tags: [Java, Docker]
---

通过 `Docker` 部署 `Java` 项目，解决部署到其他机器上，无法运行的问题

<!-- more -->

## 使用 `Maven` 插件

将 `SpringBoot` 项目打包成 `Docker` 镜像，其主要通过 `Maven plugin` 插件来进行构建。

在之前都是通过 `docker-maven-plugin` 插件进行打包，而现在已经升级出现了新的插件：

`dockerfile-maven-plugin`

接下来我们就是通过这个 plugin 插件进行操作。

::: code-tabs
@tab pom.xml

```xml
<plugin>
  <groupId>com.spotify</groupId>
  <artifactId>dockerfile-maven-plugin</artifactId>
  <version>1.4.13</version>
  <executions>
    <execution>
      <id>default</id>
      <goals>
        <goal>build</goal>
        <goal>push</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <repository>${docker.image.prefix}/${project.artifactId}</repository>
    <tag>${project.version}</tag>
    <buildArgs>
      <JAR_FILE>${project.build.finalName}.jar</JAR_FILE>
    </buildArgs>
  </configuration>
</plugin>

```

:::

参数说明：

- `repository`：指定 Docker 镜像的 repo 名字，要展示在 `docker images` 中的。

- `tag`：指定 Docker 镜像的 tag，不指定 tag 默认为 latest

- `buildArg`s：指定一个或多个变量，传递给 `Dockerfile`，在 Dockerfile 中通过 ARG 指令进行引用。`JAR_FILE` 指定 jar 文件名。

另外，可以在`execution`中同时指定`build`和`push`目标。当运行`mvn package`时，会自动执行 build 目标，构建 Docker 镜像。

## DcockerFile

DockerFile 文件需要放置在项目 `pom.xml` 同级目录下，内容大致如下：

```dockerfile
FROM java:8
EXPOSE 8080
ARG JAR_FILE
ADD target/${JAR_FILE} /niceyoo.jar
ENTRYPOINT ["java", "-jar","/niceyoo.jar"]
```

参数说明：

- `FROM`：基于 `java:8` 镜像构建
- `EXPOSE`：监听 `8080` 端口
- `ARG`：引用 plugin 中配置的 `JAR_FILE` 文件
- `ADD`：将当前 target 目录下的 jar 放置在根目录下，命名为 `niceyoo.jar`，推荐使用绝对路径。
- `ENTRYPOINT`：执行命令 `java -jar /niceyoo.jar`

当前完整的 pom.xml：
