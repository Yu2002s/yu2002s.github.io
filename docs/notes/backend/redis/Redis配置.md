---
title: Redis配置
createTime: 2025/10/23 10:05:50
permalink: /backend/ezf6nx5x/
---

## 添加依赖

springboot 项目，打开 `pom.xml` 引入 `redis` 起步依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

::: note
无需配置版本号，spring 自动配置了。
:::

## 修改配置

打开项目下的 `src/main/resources/application.yml`

::: code-tabs
@tab application.yml

```yml
spring:
  redis:
    host: localhost
    port: 6379
    # 如果需要密码认证，可以添加以下配置
    # password: yourpassword
    # 如果Redis设置了不同的数据库，可以指定数据库索引
    # database: 0
    timeout: 3000 # 读取超时时间
    lettuce:
      pool:
        max-active: 8 # 连接池在给定时间点可分配的最大连接数。使用负值表示无限制。
        max-idle: 8 # 连接池中“空闲”连接的最大数量。使用负值表示空闲连接数量不受限制。
        min-idle: 0 # 池中需保持的最小空闲连接数目标。此设置仅在该值与驱逐运行间隔均为正数时生效。
        max-wait: -1 # 当池耗尽时，连接分配在抛出异常之前应阻止的最长时间。使用负值可无限期阻止。
```

:::

## 配置 RedisTemplate 或 StringRedisTemplate

使用 `RedisTemplate` 或 `StringRedisTemplate`，需要配置类进行配置，可以设置序列化使用的策略

::: code-tabs

@tab /config/RedisConfig.java

```java
/**
 * Redis 配置类
 */
@Configuration
public class RedisConfig {

    /**
     * 配置 RedisTemplate
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // 使用 String 序列化器处理 key
        StringRedisSerializer stringSerializer = new StringRedisSerializer();
        template.setKeySerializer(stringSerializer);
        template.setHashKeySerializer(stringSerializer);

        // 使用 JSON 序列化器处理 value
        GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer();
        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);

        template.afterPropertiesSet();
        return template;
    }
}
```

:::

## 操作 RedisTemplate

可以在服务中注入 `RedisTemplate` 来进行操作

```java
@Autowired
private RedisTemplate<String, Object> redisTemplate;

/**
 * 通过 key、value 设置值
 */
public void setKey(String key, Object value) {
    redisTemplate.opsForValue().set(key, value); // 设置值
}

/**
 * 通过 key 来获取值
 */
public Object getKey(String key) {
    return redisTemplate.opsForValue().get(key); // 通过 key 获取值
}
```

## 启用缓存

在 配置类加上注解 `@EnableCaching` 开启缓存

```java
@EnableCaching
@Configuration
public class CacheConfig { }
```

在服务中使用

```java
@Cacheable("books") // 将结果缓存到名为"books"的缓存中，如果存在则直接返回缓存结果，不调用实际方法。
public Book findBook(ISBN isbn) { ... }
```

这样，当`findBook`方法被调用时，结果会被缓存起来，如果相同的`isbn`再次被调用，将直接返回缓存的结果。
这样减少了数据库查询次数，提高了性能。记得在配置文件中设置适当的缓存管理器（例如Redis）。例如：

```yml
spring:
  cache:
    type: redis # 使用Redis作为缓存类型。默认是ConcurrentMap。如果你已经配置了Redis，这将自动工作。否则，你可能需要额外配置一个Redis缓存管理器。例如：spring.cache.redis.time-to-live=3600000 # 设置缓存有效期（毫秒）例如1小时。根据需要调整。 确保你的项目中已经包含了Spring Boot的starter-cache依赖。如果没有，请添加到你的pom.xml或build.gradle文件中。对于Maven：<dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-cache</artifactId> </dependency> 对于Gradle：
```
