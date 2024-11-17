---
title: MyBatis一些笔记
createTime: 2024/11/02 11:39:51
permalink: /backend/cyw3tcxo/
---

## MyBatis

中文网地址: [MyBatis中文网](https://mybatis.net.cn/)

### 导入依赖

```xml
<!-- MyBatis依赖 -->
<!-- <dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.10</version>
</dependency> -->

<!-- mysql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- spring整合 -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>

<!-- 用于记录日志 -->
<!-- 添加slf4j日志api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
</dependency>
<!-- 添加logback-classic依赖 -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
</dependency>
```

### 配置文件

#### mybatis-config.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--<properties>
        <property name="username" value="root"/>
        <property name="password" value="jdy200255"/>
    </properties>
    <settings>
        <setting name="cacheEnabled" value="true"/>
    </settings>-->
    <!-- 类型别名 -->
    <typeAliases>
        <!-- user 代表全限定类名 -->
        <typeAlias alias="user" type="com.example.pojo.User"/>
        <!-- 指定包类名，该包下所有实体类将被自动扫描 -->
        <package name="com.example.pojo"/>
    </typeAliases>
    <!-- 类型处理 -->
    <!--<typeHandlers>
        <typeHandler jdbcType="VARCHAR" javaType="String" handler="com.example.handler.ExampleTypeHandler"/>
    </typeHandlers>-->
</configuration>
```

#### application.yml

```yml
mybatis:
  # 包别名，该包下的实体类将被扫描，用于返回类型
  type-aliases-package: com.example.pojo
  configuration:
    # 开启缓存
    cache-enabled: true
    # log前缀
    log-prefix: jdy
    # 日志实现，未指定将自动查找
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    # 自动生成主键
    use-generated-keys: false
    # 配置自动映射 NONE, PARTIAL, FULL
    auto-mapping-behavior: partial
    # 如果自动映射位置列，是否显示警告日志信息 NONE, WARNING, FAILING
    auto-mapping-unknown-column-behavior: none
    # 语句执行超时时间
    default-statement-timeout: 10
    # 结果集获取数量设置一个建议值
    # default-fetch-size: 100
    # 开启驼峰自动映射
    map-underscore-to-camel-case: true
    # 本地缓存机制
    local-cache-scope: session
    # 当没有为参数指定jdbc类型，空值默认为哪种类型
    jdbc-type-for-null: other
    # 指定那些对象的方法触发一些延迟加载
    # lazy-load-trigger-methods: equals,clone
    # enum默认的类型处理
    default-enum-type-handler: org.apache.ibatis.type.EnumTypeHandler
    # 当返回结果集为空时，如果设置为true时，将默认返回一个空实例对象
    return-instance-for-empty-row: false
  # 设置typeHandlers包路径
  type-handlers-package: com.example.handler
spring:
  datasource:
    username: root
    password: jdy200255
    url: jdbc:mysql://localhost:3306/db01?serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver

```

### TypeAlias

给java类型设置一个缩写名字

```xml-dtd
<!-- 类型别名 -->
<typeAliases>
    <!-- user 代表全限定类名 -->
    <typeAlias alias="user" type="com.example.pojo.User"/>
    <!-- 指定包类名，该包下所有实体类将被自动扫描 -->
    <package name="com.example.pojo"/>
</typeAliases>
```

application.yml中

```yaml
# 包别名，该包下的实体类将被扫描，用于返回类型
type-aliases-package: com.example.pojo
```

在实体类中使用注解声明别名

```java
// 注解方式生成别名
@Alias("author")
public class Author {}
```

### TypeHandler

新建类用于处理jdbc类型与java类型进行映射

```java
// 映射数据库中的varchar类型
// 映射为java中的String类型
// 当在resultMap中使用时，如果没有指定jdbcType，则将不会调用此处方法映射，而会使用默认类型处理器
// 只需在此处声明includeNullJdbcType = true，则未使用jdbcType也将进行处理
@MappedJdbcTypes(JdbcType.VARCHAR, includeNullJdbcType = true)
public class ExampleTypeHandler extends BaseTypeHandler<String> {
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, String parameter, JdbcType jdbcType) throws SQLException {
        System.out.println("setNonNullParameter");
        ps.setString(i, parameter);
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName) throws SQLException {
        System.out.println("getNullableResult");
        return rs.getString(columnName);
    }

    @Override
    public String getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        System.out.println("getNullableResult");
        return rs.getString(columnIndex);
    }

    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        System.out.println("getNullableResult");
        return cs.getString(columnIndex);
    }
}
```

mybatis.config.xml中配置

```xml-dtd
<!-- 类型处理 -->
<typeHandlers>
    <typeHandler jdbcType="VARCHAR" javaType="String" handler="com.example.handler.ExampleTypeHandler"/>
</typeHandlers>
```

application.yaml中

```yaml
# 设置typeHandlers包路径
type-handlers-package: com.example.handler
```

在mapper.xml中的resultMap单独指定

```xml-dtd
<resultMap id="userMap" type="user">
    <result column="username" property="username" typeHandler="com.example.handler.ExampleTypeHandler"/>
</resultMap>
```

### ObjectFactory

mybatis创建实例对象时，都会使用这个工厂对象创建

```java
public class ExampleObjectFactory extends DefaultObjectFactory {
    @Override
    public <T> T create(Class<T> type) {
        System.out.println("create Object");
        return super.create(type);
    }

    @Override
    public <T> T create(Class<T> type, List<Class<?>> constructorArgTypes, List<Object> constructorArgs) {
        System.out.println("create Object");
        return super.create(type, constructorArgTypes, constructorArgs);
    }

    @Override
    public void setProperties(Properties properties) {
        System.out.println("props: " + properties);
        super.setProperties(properties);
    }

    @Override
    public <T> boolean isCollection(Class<T> type) {
        return super.isCollection(type);
    }
}
```

mybatis-config.xml

```xml-dtd
<objectFactory type="com.example.factory.ExampleObjectFactory">
    <property name="someProp" value="100"/>
</objectFactory>
```

### Mappers

**完整用例**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace 命名空间 -->
<mapper namespace="com.itheima.mapper.BrandMapper">

	<!-- 抽取公共数据
		引入sql片段<include refid=""/>
	-->
    <sql id="brand_column">

    </sql>

    <!--
        id: 唯一标识
        type：映射的类型，支持别名
    -->
    <resultMap id="brandResultMap" type="brand">
        <!--
            id 完成主键字段的映射
                column 表的别名
                property 类的字段名
            result 完成一般字段的映射
        -->
        <result column="brand_name" property="brandName"/>
        <result column="company_name" property="companyName"/>
    </resultMap>

    <select id="selectAll" resultMap="brandResultMap">
        select *
        from tb_brand;
    </select>

    <select id="selectById" resultMap="brandResultMap">
        select *
        from tb_brand
        where id = #{id};
    </select>
    <!--<select id="selectByCondition" resultMap="brandResultMap">
        select *
        from tb_brand
        where status = #{status}
        and company_name like #{companyName}
        and brand_name like #{brandName}
    </select>-->
    <select id="selectByCondition" resultMap="brandResultMap">
        select *
        from tb_brand
        <where>
            <if test="status != null">
                and status = #{status}
            </if>
            <if test="companyName != null and companyName != '' ">
                and company_name like #{companyName}
            </if>
            <if test="brandName != null and brandName != '' ">
                and brand_name like #{brandName}
            </if>
        </where>

    </select>
    <!--<select id="selectByConditionSingle" resultMap="brandResultMap">
        select *
        from tb_brand
        where
        <choose>
            <when test="status != null">
                status = #{status}
            </when>
            <when test="companyName != null and companyName != '' ">
                company_name like #{companyName}
            </when>
            <when test="brandName != null and brandName != '' ">
                brand_name like #{brandName}
            </when>
            <otherwise>
                1 = 1
            </otherwise>
        </choose>
    </select>-->

    <select id="selectByConditionSingle" resultMap="brandResultMap">
        select *
        from tb_brand
        <where>
            <choose>
                <when test="status != null">
                    status = #{status}
                </when>
                <when test="companyName != null and companyName != '' ">
                    company_name like #{companyName}
                </when>
                <when test="brandName != null and brandName != '' ">
                    brand_name like #{brandName}
                </when>
            </choose>
        </where>
    </select>

	<!-- 插入后返回主键值 -->
    <insert id="add" useGeneratedKeys="true" keyProperty="id">
        insert into tb_brand (brand_name, company_name, ordered, description, status)
        VALUES (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status});
    </insert>

    <!--<update id="update">
        update tb_brand
        set brand_name = #{brandName},
            company_name = #{companyName},
            ordered = #{ordered},
            description = #{description},
            status = #{status}
        where id = #{id};
    </update>-->

    <update id="update">
        update tb_brand
        <set>
            <if test="brandName != null and brandName != '' ">
                brand_name = #{brandName},
            </if>
            <if test="companyName != null and companyName != '' ">
                company_name = #{companyName},
            </if>
            <if test="ordered != null">
                ordered = #{ordered},
            </if>
            <if test="description != null and description != '' ">
                description = #{description},
            </if>
            <if test="status != null">
                status = #{status}
            </if>
        </set>
        where id = #{id};
    </update>

    <delete id="deleteById">
        delete
        from tb_brand
        where id = #{id};
    </delete>

    <delete id="deleteByIds">
        delete
        from tb_brand
        where id
        in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
        ;
    </delete>
</mapper>
```

**多表查询**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mybatis.mapper.EmpMapper">

    <!-- 结果映射 id：唯一标识，type：实体类类名，指定返回类型 -->
    <resultMap id="empMap" type="emp">
        <!--  
			设置对应关系  column：数据库中的列，property: 实体类属性
  			javaType：实体属性类型，jdbcType：数据库中的字段类型
		-->
        <result column="username" property="username" javaType="String" jdbcType="VARCHAR"/>
        <!--
 			collection: 收集数据，select：指定需要调用的sql id，
			调用selectSex查询数据，并将gender作为selectSex作为id参数进行传入
		-->
        <collection property="gender" javaType="string" column="id" select="selectSex"/>
    </resultMap>

    <!-- autoMapping: 自动映射（column和property相同时） -->
    <resultMap id="orderMap" type="order" autoMapping="true">
        <!--<id column="id" property="id"/>
        <result column="uid" property="uid"/>
        <result column="total" property="total"/>-->
        <result column="create_at" property="createAt"/>
        <!--<result column="username" property="user.username"/>-->
        <!-- 关联数据，将关联表查询数据，关联给user属性（适用于1对1或多对1） -->
        <association property="user" javaType="user" autoMapping="true">
            <id column="uid" property="id"/>
        </association>
    </resultMap>

    <resultMap id="userMap" type="user" autoMapping="true">
        <!-- 收集关联表的数据，将查询到的集合指定ofType的类型，并赋值给（使用与1对多或多对多） -->
        <collection property="orders" ofType="order" autoMapping="true">
            <id column="oid" property="id"/>
            <result column="create_at" property="createAt"/>
        </collection>
    </resultMap>

    <!-- 启用继承extend -->
    <resultMap id="userRoleMap" type="user" extends="userMap" autoMapping="true">
        <collection property="roles" ofType="role" autoMapping="true">
        </collection>
    </resultMap>

    <!-- parameterType 入参类型，指定resultMap 结果映射 -->
    <select parameterType="int" id="selectById" resultMap="empMap">
        select *
        from tb_emp
        where id = #{id}
    </select>

    <!-- resultType：返回结果类型 -->
    <select id="selectSex" parameterType="int" resultType="string">
        select name
        from tb_sex
        where id = #{id}
    </select>

    <select id="getOrders" resultMap="orderMap">
        select *
        from tb_order o,
             tb_user u
        where o.id = u.id
    </select>

    <select id="getUsers" resultMap="userMap">
        select *, o.id oid
        from tb_user
                 left join tb_order o on tb_user.id = o.uid
    </select>

    <select id="getUsersAndRole" resultMap="userRoleMap">
        /*select *
        from tb_user u
                 left join tb_order o on u.id = o.uid
                 left join tb_user_role ur on ur.user_id = u.id
                 inner join tb_role r on r.id = ur.role_id*/
        select * from tb_user u, tb_user_role ur, tb_role r where u.id = ur.user_id and ur.role_id = r.id
    </select>
</mapper>
```

**对应xxxmapper.java**

```java
public interface BrandMapper {

    List<Brand> selectAll();

    // 映射
    @Results(
        {
            @Result(column = "", property = "")
        }
    )
    Brand selectById(int id);

   /* List<Brand> selectByCondition(@Param("status") int status,
                                  @Param("companyName") String companyName,
                                  @Param("brandName") String brandName);*/

   /* List<Brand> selectByCondition(Brand brand);*/

    // Map参数
    List<Brand> selectByCondition(Map<String, String> map);

    // 对象参数
    List<Brand> selectByConditionSingle(Brand brand);

    // 返回自增的主键值
    @Options(keyProperty = "id", usegeneratedKeys = true)
    int add(Brand brand);

    int update(Brand brand);

    void deleteById(int id);
    // 数组参数
    void deleteByIds(@Param("ids") int[] ids);
}
```

**javaAPI**

```java
@Test
public void testSelectAll() throws IOException {
    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    List<Brand> brands = brandMapper.selectAll();
    System.out.println("brands = " + brands);

    sqlSession.close();

}

@Test
public void testSelectById() throws IOException {
    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    Brand brand = brandMapper.selectById(1);
    System.out.println("brand = " + brand);

    sqlSession.close();
}

@Test
public void testSelectByCondition() throws IOException {

    int status = 1;
    String companyName = "华为";
    String brandName = "华为";

    companyName = "%" + companyName + "%";

    /*Brand brand = new Brand();
    brand.setStatus(status);
    brand.setCompanyName(companyName);
    brand.setBrandName(brandName);*/

    Map<String, String> map = new HashMap<>();
    // map.put("status", String.valueOf(status));
    map.put("companyName", companyName);
    // map.put("brandName", brandName);

    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    List<Brand> brands = brandMapper.selectByCondition(map);
    System.out.println("brand = " + brands);

    sqlSession.close();
}

@Test
public void testSelectByConditionSingle() throws IOException {

    int status = 1;
    String companyName = "华为";
    String brandName = "华为";

    companyName = "%" + companyName + "%";

    Brand brand = new Brand();
    //  brand.setStatus(status);
    // brand.setCompanyName(companyName);
    // brand.setBrandName(brandName);

   /* Map<String, String> map = new HashMap<>();
    // map.put("status", String.valueOf(status));
    map.put("companyName", companyName);
    // map.put("brandName", brandName);*/

    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    List<Brand> brands = brandMapper.selectByConditionSingle(brand);
    System.out.println("brand = " + brands);

    sqlSession.close();
}

@Test
public void testAdd() throws IOException {

    int status = 1;
    String companyName = "波导手机";
    String brandName = "波导";

    Brand brand = new Brand();
    brand.setStatus(status);
    brand.setCompanyName(companyName);
    brand.setBrandName(brandName);
    brand.setOrdered(10);
    brand.setDescription("手机中的战斗机");

    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    brandMapper.add(brand);

    Integer id = brand.getId();

    System.out.println("id = " + id);

    // 提交事务
    // sqlSession.commit();

    sqlSession.close();
}

@Test
public void testUpdate() throws IOException {

    int status = 1;
    String companyName = "波导手机";
    String brandName = "波导";

    Brand brand = new Brand();
    brand.setId(5);
    brand.setStatus(0);
//        brand.setCompanyName(companyName);
//        brand.setBrandName(brandName);
//        brand.setOrdered(200);
//        brand.setDescription("波导手机，手机中的战斗机");

    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    int row = brandMapper.update(brand);

    Integer id = brand.getId();

    System.out.println("id = " + id + ", row = " + row);

    // 提交事务
    // sqlSession.commit();

    sqlSession.close();
}

@Test
public void testDeleteById() throws IOException {
    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    brandMapper.deleteById(6);

    sqlSession.close();
}

@Test
public void testDeleteByIds() throws IOException {
    InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

    brandMapper.deleteByIds(new int[]{5, 7, 8});

    sqlSession.close();
}
```

这些配置会告诉 MyBatis 去哪里找映射文件，剩下的细节就应该是每个 SQL 映射文件了.

**mybatis-config.xml**

```xml
<!-- 使用相对于类路径的资源引用 -->
<mappers>
  <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
  <mapper resource="org/mybatis/builder/BlogMapper.xml"/>
  <mapper resource="org/mybatis/builder/PostMapper.xml"/>
</mappers>
<!-- 使用完全限定资源定位符（URL） -->
<mappers>
  <mapper url="file:///var/mappers/AuthorMapper.xml"/>
  <mapper url="file:///var/mappers/BlogMapper.xml"/>
  <mapper url="file:///var/mappers/PostMapper.xml"/>
</mappers>
<!-- 使用映射器接口实现类的完全限定类名 -->
<mappers>
  <mapper class="org.mybatis.builder.AuthorMapper"/>
  <mapper class="org.mybatis.builder.BlogMapper"/>
  <mapper class="org.mybatis.builder.PostMapper"/>
</mappers>
<!-- 将包内的映射器接口实现全部注册为映射器 -->
<mappers>
  <package name="org.mybatis.builder"/>
</mappers>
```

**application.yml**

```yaml
mapper-locations: classpath:mapper/*xml
```

**XML映射**

SQL 映射文件只有很少的几个顶级元素（按照应被定义的顺序列出）：

- `cache` – 该命名空间的缓存配置。
- `cache-ref` – 引用其它命名空间的缓存配置。
- `resultMap` – 描述如何从数据库结果集中加载对象，是最复杂也是最强大的元素。
- `parameterMap` – 老式风格的参数映射。此元素已被废弃，并可能在将来被移除！请使用行内参数映射。文档中不会介绍此元素。
- `sql` – 可被其它语句引用的可重用语句块。
- `insert` – 映射插入语句。
- `update` – 映射更新语句。
- `delete` – 映射删除语句。
- `select` – 映射查询语句。

#### select

```xml
<select id="selectPerson" parameterType="int" resultType="hashmap">
  SELECT * FROM PERSON WHERE ID = #{id}
</select>
```

这个语句名为 selectPerson，接受一个 int（或 Integer）类型的参数，并返回一个 HashMap 类型的对象，其中的键是列名，值便是结果行中的对应值。

注意参数符号：

```xml-dtd
#{id}
```

这就告诉 MyBatis 创建一个预处理语句（PreparedStatement）参数，在 JDBC 中，这样的一个参数在 SQL 中会由一个“?”来标识，并被传递到一个新的预处理语句中，就像这样：

```java
// 近似的 JDBC 代码，非 MyBatis 代码...
String selectPerson = "SELECT * FROM PERSON WHERE ID=?";
PreparedStatement ps = conn.prepareStatement(selectPerson);
ps.setInt(1,id);
```

当然，使用 JDBC 就意味着使用更多的代码，以便提取结果并将它们映射到对象实例中，而这就是 MyBatis 的拿手好戏。参数和结果映射的详细细节会分别在后面单独的小节中说明。

select 元素允许你配置很多属性来配置每条语句的行为细节。

```xml
<select
  id="selectPerson"
  parameterType="int"
  parameterMap="deprecated"
  resultType="hashmap"
  resultMap="personResultMap"
  flushCache="false"
  useCache="true"
  timeout="10"
  fetchSize="256"
  statementType="PREPARED"
  resultSetType="FORWARD_ONLY">
```

Select 元素的属性


| 属性            | 描述                                                                                                                                                                                                      |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | 在命名空间中唯一的标识符，可以被用来引用这条语句。                                                                                                                                                        |
| `parameterType` | 将会传入这条语句的参数的类全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。                                             |
| parameterMap    | 用于引用外部 parameterMap 的属性，目前已被废弃。请使用行内参数映射和 parameterType 属性。                                                                                                                 |
| `resultType`    | 期望从这条语句中返回结果的类全限定名或别名。 注意，如果返回的是集合，那应该设置为集合包含的类型，而不是集合本身的类型。 resultType 和 resultMap 之间只能同时使用一个。                                    |
| `resultMap`     | 对外部 resultMap 的命名引用。结果映射是 MyBatis 最强大的特性，如果你对其理解透彻，许多复杂的映射问题都能迎刃而解。 resultType 和 resultMap 之间只能同时使用一个。                                         |
| `flushCache`    | 将其设置为 true 后，只要语句被调用，都会导致本地缓存和二级缓存被清空，默认值：false。                                                                                                                     |
| `useCache`      | 将其设置为 true 后，将会导致本条语句的结果被二级缓存缓存起来，默认值：对 select 元素为 true。                                                                                                             |
| `timeout`       | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为未设置（unset）（依赖数据库驱动）。                                                                                               |
| `fetchSize`     | 这是一个给驱动的建议值，尝试让驱动程序每次批量返回的结果行数等于这个设置值。 默认值为未设置（unset）（依赖驱动）。                                                                                        |
| `statementType` | 可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。                                                                       |
| `resultSetType` | FORWARD_ONLY，SCROLL_SENSITIVE, SCROLL_INSENSITIVE 或 DEFAULT（等价于 unset） 中的一个，默认值为 unset （依赖数据库驱动）。                                                                               |
| `databaseId`    | 如果配置了数据库厂商标识（databaseIdProvider），MyBatis 会加载所有不带 databaseId 或匹配当前 databaseId 的语句；如果带和不带的语句都有，则不带的会被忽略。                                                |
| `resultOrdered` | 这个设置仅针对嵌套结果 select 语句：如果为 true，将会假设包含了嵌套结果集或是分组，当返回一个主结果行时，就不会产生对前面结果集的引用。 这就使得在获取嵌套结果集的时候不至于内存不够用。默认值：`false`。 |
| `resultSets`    | 这个设置仅适用于多结果集的情况。它将列出语句执行后返回的结果集并赋予每个结果集一个名称，多个名称之间以逗号分隔。                                                                                          |

#### insert, update 和 delete

数据变更语句 insert，update 和 delete 的实现非常接近：

```xml
<insert
  id="insertAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  keyProperty=""
  keyColumn=""
  useGeneratedKeys=""
  timeout="20">

<update
  id="updateAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">

<delete
  id="deleteAuthor"
  parameterType="domain.blog.Author"
  flushCache="true"
  statementType="PREPARED"
  timeout="20">
```


| 属性               | 描述                                                                                                                                                                                                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`               | 在命名空间中唯一的标识符，可以被用来引用这条语句。                                                                                                                                                                        |
| `parameterType`    | 将会传入这条语句的参数的类全限定名或别名。这个属性是可选的，因为 MyBatis 可以通过类型处理器（TypeHandler）推断出具体传入语句的参数，默认值为未设置（unset）。                                                             |
| `parameterMap`     | 用于引用外部 parameterMap 的属性，目前已被废弃。请使用行内参数映射和 parameterType 属性。                                                                                                                                 |
| `flushCache`       | 将其设置为 true 后，只要语句被调用，都会导致本地缓存和二级缓存被清空，默认值：（对 insert、update 和 delete 语句）true。                                                                                                  |
| `timeout`          | 这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为未设置（unset）（依赖数据库驱动）。                                                                                                               |
| `statementType`    | 可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。                                                                                       |
| `useGeneratedKeys` | （仅适用于 insert 和 update）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySQL 和 SQL Server 这样的关系型数据库管理系统的自动递增字段），默认值：false。                      |
| `keyProperty`      | （仅适用于 insert 和 update）指定能够唯一识别对象的属性，MyBatis 会使用 getGeneratedKeys 的返回值或 insert 语句的 selectKey 子元素设置它的值，默认值：未设置（`unset`）。如果生成列不止一个，可以用逗号分隔多个属性名称。 |
| `keyColumn`        | （仅适用于 insert 和 update）设置生成键值在表中的列名，在某些数据库（像 PostgreSQL）中，当主键列不是表中的第一列的时候，是必须设置的。如果生成列不止一个，可以用逗号分隔多个属性名称。                                    |
| `databaseId`       | 如果配置了数据库厂商标识（databaseIdProvider），MyBatis 会加载所有不带 databaseId 或匹配当前 databaseId 的语句；如果带和不带的语句都有，则不带的会被忽略。                                                                |

下面是 insert，update 和 delete 语句的示例：

```xml
<insert id="insertAuthor">
  insert into Author (id,username,password,email,bio)
  values (#{id},#{username},#{password},#{email},#{bio})
</insert>

<update id="updateAuthor">
  update Author set
    username = #{username},
    password = #{password},
    email = #{email},
    bio = #{bio}
  where id = #{id}
</update>

<delete id="deleteAuthor">
  delete from Author where id = #{id}
</delete>
```

如前所述，插入语句的配置规则更加丰富，在插入语句里面有一些额外的属性和子元素用来处理主键的生成，并且提供了多种生成方式。

首先，如果你的数据库支持自动生成主键的字段（比如 MySQL 和 SQL Server），那么你可以设置 useGeneratedKeys=”true”，然后再把 keyProperty 设置为目标属性就 OK 了。例如，如果上面的 Author 表已经在 id 列上使用了自动生成，那么语句可以修改为：

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username,password,email,bio)
  values (#{username},#{password},#{email},#{bio})
</insert>
```

如果你的数据库还支持多行插入, 你也可以传入一个 `Author` 数组或集合，并返回自动生成的主键。

```xml
<insert id="insertAuthor" useGeneratedKeys="true"
    keyProperty="id">
  insert into Author (username, password, email, bio) values
  <foreach item="item" collection="list" separator=",">
    (#{item.username}, #{item.password}, #{item.email}, #{item.bio})
  </foreach>
</insert>
```

对于不支持自动生成主键列的数据库和可能不支持自动生成主键的 JDBC 驱动，MyBatis 有另外一种方法来生成主键。

这里有一个简单（也很傻）的示例，它可以生成一个随机 ID（不建议实际使用，这里只是为了展示 MyBatis 处理问题的灵活性和宽容度）：

```xml
<insert id="insertAuthor">
  <selectKey keyProperty="id" resultType="int" order="BEFORE">
    select CAST(RANDOM()*1000000 as INTEGER) a from SYSIBM.SYSDUMMY1
  </selectKey>
  insert into Author
    (id, username, password, email,bio, favourite_section)
  values
    (#{id}, #{username}, #{password}, #{email}, #{bio}, #{favouriteSection,jdbcType=VARCHAR})
</insert>
```

在上面的示例中，首先会运行 selectKey 元素中的语句，并设置 Author 的 id，然后才会调用插入语句。这样就实现了数据库自动生成主键类似的行为，同时保持了 Java 代码的简洁。

selectKey 元素描述如下：

```xml
<selectKey
  keyProperty="id"
  resultType="int"
  order="BEFORE"
  statementType="PREPARED">
```

selectKey 元素的属性


| 属性            | 描述                                                                                                                                                                                                                                                |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `keyProperty`   | `selectKey` 语句结果应该被设置到的目标属性。如果生成列不止一个，可以用逗号分隔多个属性名称。                                                                                                                                                        |
| `keyColumn`     | 返回结果集中生成列属性的列名。如果生成列不止一个，可以用逗号分隔多个属性名称。                                                                                                                                                                      |
| `resultType`    | 结果的类型。通常 MyBatis 可以推断出来，但是为了更加准确，写上也不会有什么问题。MyBatis 允许将任何简单类型用作主键的类型，包括字符串。如果生成列不止一个，则可以使用包含期望属性的 Object 或 Map。                                                   |
| `order`         | 可以设置为`BEFORE` 或 `AFTER`。如果设置为 `BEFORE`，那么它首先会生成主键，设置 `keyProperty` 再执行插入语句。如果设置为 `AFTER`，那么先执行插入语句，然后是 `selectKey` 中的语句 - 这和 Oracle 数据库的行为相似，在插入语句内部可能有嵌入索引调用。 |
| `statementType` | 和前面一样，MyBatis 支持`STATEMENT`，`PREPARED` 和 `CALLABLE` 类型的映射语句，分别代表 `Statement`, `PreparedStatement` 和 `CallableStatement` 类型。                                                                                               |

#### sql

这个元素可以用来定义可重用的 SQL 代码片段，以便在其它语句中使用。 参数可以静态地（在加载的时候）确定下来，并且可以在不同的 include 元素中定义不同的参数值。比如：

```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
```

这个 SQL 片段可以在其它语句中使用，例如：

```xml
<select id="selectUsers" resultType="map">
  select
    <include refid="userColumns"><property name="alias" value="t1"/></include>,
    <include refid="userColumns"><property name="alias" value="t2"/></include>
  from some_table t1
    cross join some_table t2
</select>
```

也可以在 include 元素的 refid 属性或内部语句中使用属性值，例如：

```xml
<sql id="sometable">
  ${prefix}Table
</sql>

<sql id="someinclude">
  from
    <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
  select
    field1, field2, field3
  <include refid="someinclude">
    <property name="prefix" value="Some"/>
    <property name="include_target" value="sometable"/>
  </include>
</select>
```

#### parameter

之前见到的所有语句都使用了简单的参数形式。但实际上，参数是 MyBatis 非常强大的元素。对于大多数简单的使用场景，你都不需要使用复杂的参数，比如：

```xml
<select id="selectUsers" resultType="User">
  select id, username, password
  from users
  where id = #{id}
</select>
```

上面的这个示例说明了一个非常简单的命名参数映射。鉴于参数类型（parameterType）会被自动设置为 `int`，这个参数可以随意命名。原始类型或简单数据类型（比如 `Integer` 和 `String`）因为没有其它属性，会用它们的值来作为参数。 然而，如果传入一个复杂的对象，行为就会有点不一样了。比如：

```xml
<insert id="insertUser" parameterType="User">
  insert into users (id, username, password)
  values (#{id}, #{username}, #{password})
</insert>
```

如果 User 类型的参数对象传递到了语句中，会查找 id、username 和 password 属性，然后将它们的值传入预处理语句的参数中。

对传递语句参数来说，这种方式真是干脆利落。不过参数映射的功能远不止于此。

首先，和 MyBatis 的其它部分一样，参数也可以指定一个特殊的数据类型。

```xml-dtd
#{property,javaType=int,jdbcType=NUMERIC}
```

和 MyBatis 的其它部分一样，几乎总是可以根据参数对象的类型确定 javaType，除非该对象是一个 `HashMap`。这个时候，你需要显式指定 `javaType` 来确保正确的类型处理器（`TypeHandler`）被使用。

**提示** JDBC 要求，如果一个列允许使用 null 值，并且会使用值为 null 的参数，就必须要指定 JDBC 类型（jdbcType）。阅读 `PreparedStatement.setNull()`的 JavaDoc 来获取更多信息。

要更进一步地自定义类型处理方式，可以指定一个特殊的类型处理器类（或别名），比如：

```xml-dtd
#{age,javaType=int,jdbcType=NUMERIC,typeHandler=MyTypeHandler}
```

参数的配置好像越来越繁琐了，但实际上，很少需要如此繁琐的配置。

对于数值类型，还可以设置 `numericScale` 指定小数点后保留的位数。

```xml-dtd
#{height,javaType=double,jdbcType=NUMERIC,numericScale=2}
```

最后，mode 属性允许你指定 `IN`，`OUT` 或 `INOUT` 参数。如果参数的 `mode` 为 `OUT` 或 `INOUT`，将会修改参数对象的属性值，以便作为输出参数返回。 如果 `mode` 为 `OUT`（或 `INOUT`），而且 `jdbcType` 为 `CURSOR`（也就是 Oracle 的 REFCURSOR），你必须指定一个 `resultMap` 引用来将结果集 `ResultMap` 映射到参数的类型上。要注意这里的 `javaType` 属性是可选的，如果留空并且 jdbcType 是 `CURSOR`，它会被自动地被设为 `ResultMap`。

```xml-dtd
#{department, mode=OUT, jdbcType=CURSOR, javaType=ResultSet, resultMap=departmentResultMap}
```

MyBatis 也支持很多高级的数据类型，比如结构体（structs），但是当使用 out 参数时，你必须显式设置类型的名称。比如（再次提示，在实际中要像这样不能换行）：

```xml
#{middleInitial, mode=OUT, jdbcType=STRUCT, jdbcTypeName=MY_TYPE, resultMap=departmentResultMap}
```

尽管上面这些选项很强大，但大多时候，你只须简单指定属性名，顶多要为可能为空的列指定 `jdbcType`，其他的事情交给 MyBatis 自己去推断就行了。

```xml
#{firstName}
#{middleInitial,jdbcType=VARCHAR}
#{lastName}
```

#### 字符串替换

默认情况下，使用 `#{}` 参数语法时，MyBatis 会创建 `PreparedStatement` 参数占位符，并通过占位符安全地设置参数（就像使用 ? 一样）。 这样做更安全，更迅速，通常也是首选做法，不过有时你就是想直接在 SQL 语句中直接插入一个不转义的字符串。 比如 ORDER BY 子句，这时候你可以：

```xml
ORDER BY ${columnName}
```

这样，MyBatis 就不会修改或转义该字符串了。

当 SQL 语句中的元数据（如表名或列名）是动态生成的时候，字符串替换将会非常有用。 举个例子，如果你想 `select` 一个表任意一列的数据时，不需要这样写：

```xml
@Select("select * from user where id = #{id}")
User findById(@Param("id") long id);

@Select("select * from user where name = #{name}")
User findByName(@Param("name") String name);

@Select("select * from user where email = #{email}")
User findByEmail(@Param("email") String email);

// 其它的 "findByXxx" 方法
```

而是可以只写这样一个方法：

```xml
@Select("select * from user where ${column} = #{value}")
User findByColumn(@Param("column") String column, @Param("value") String value);
```

其中 `${column}` 会被直接替换，而 `#{value}` 会使用 `?` 预处理。 这样，就能完成同样的任务：

```xml
User userOfId1 = userMapper.findByColumn("id", 1L);
User userOfNameKid = userMapper.findByColumn("name", "kid");
User userOfEmail = userMapper.findByColumn("email", "noone@nowhere.com");
```

这种方式也同样适用于替换表名的情况。

**提示** 用这种方式接受用户的输入，并用作语句参数是不安全的，会导致潜在的 SQL 注入攻击。因此，要么不允许用户输入这些字段，要么自行转义并检验这些参数。

#### ResultMapper

`resultMap` 元素是 MyBatis 中最重要最强大的元素。它可以让你从 90% 的 JDBC `ResultSets` 数据提取代码中解放出来，并在一些情形下允许你进行一些 JDBC 不支持的操作。实际上，在为一些比如连接的复杂语句编写映射代码的时候，一份 `resultMap` 能够代替实现同等功能的数千行代码。ResultMap 的设计思想是，对简单的语句做到零配置，对于复杂一点的语句，只需要描述语句之间的关系就行了。

之前你已经见过简单映射语句的示例，它们没有显式指定 `resultMap`。比如：

```xml
<select id="selectUsers" resultType="map">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

上述语句只是简单地将所有的列映射到 `HashMap` 的键上，这由 `resultType` 属性指定。虽然在大部分情况下都够用，但是 HashMap 并不是一个很好的领域模型。你的程序更可能会使用 JavaBean 或 POJO（Plain Old Java Objects，普通老式 Java 对象）作为领域模型。MyBatis 对两者都提供了支持。看看下面这个 JavaBean：

```java
package com.someapp.model;
public class User {
  private int id;
  private String username;
  private String hashedPassword;

  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getHashedPassword() {
    return hashedPassword;
  }
  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }
}
```

基于 JavaBean 的规范，上面这个类有 3 个属性：id，username 和 hashedPassword。这些属性会对应到 select 语句中的列名。

这样的一个 JavaBean 可以被映射到 `ResultSet`，就像映射到 `HashMap` 一样简单。

```xml
<select id="selectUsers" resultType="com.someapp.model.User">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

类型别名是你的好帮手。使用它们，你就可以不用输入类的全限定名了。

比如：

```xml
<!-- mybatis-config.xml 中 -->
<typeAlias type="com.someapp.model.User" alias="User"/>

<!-- SQL 映射 XML 中 -->
<select id="selectUsers" resultType="User">
  select id, username, hashedPassword
  from some_table
  where id = #{id}
</select>
```

在这些情况下，MyBatis 会在幕后自动创建一个 `ResultMap`，再根据属性名来映射列到 JavaBean 的属性上。如果列名和属性名不能匹配上，可以在 SELECT 语句中设置列别名（这是一个基本的 SQL 特性）来完成匹配。比如：

```xml
<select id="selectUsers" resultType="User">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password     as "hashedPassword"
  from some_table
  where id = #{id}
</select>
```

在学习了上面的知识后，你会发现上面的例子没有一个需要显式配置 `ResultMap`，这就是 `ResultMap` 的优秀之处——你完全可以不用显式地配置它们。 虽然上面的例子不用显式配置 `ResultMap`。 但为了讲解，我们来看看如果在刚刚的示例中，显式使用外部的 `resultMap` 会怎样，这也是解决列名不匹配的另外一种方式。

```xml
<resultMap id="userResultMap" type="User">
  <id property="id" column="user_id" />
  <result property="username" column="user_name"/>
  <result property="password" column="hashed_password"/>
</resultMap>
```

然后在引用它的语句中设置 `resultMap` 属性就行了（注意我们去掉了 `resultType` 属性）。比如:

```xml
<select id="selectUsers" resultMap="userResultMap">
  select user_id, user_name, hashed_password
  from some_table
  where id = #{id}
</select>
```

如果这个世界总是这么简单就好了。

#### 高级结果映射

MyBatis 创建时的一个思想是：数据库不可能永远是你所想或所需的那个样子。 我们希望每个数据库都具备良好的第三范式或 BCNF 范式，可惜它们并不都是那样。 如果能有一种数据库映射模式，完美适配所有的应用程序，那就太好了，但可惜也没有。 而 ResultMap 就是 MyBatis 对这个问题的答案。

```xml
<!-- 非常复杂的语句 -->
<select id="selectBlogDetails" resultMap="detailedBlogResultMap">
  select
       B.id as blog_id,
       B.title as blog_title,
       B.author_id as blog_author_id,
       A.id as author_id,
       A.username as author_username,
       A.password as author_password,
       A.email as author_email,
       A.bio as author_bio,
       A.favourite_section as author_favourite_section,
       P.id as post_id,
       P.blog_id as post_blog_id,
       P.author_id as post_author_id,
       P.created_on as post_created_on,
       P.section as post_section,
       P.subject as post_subject,
       P.draft as draft,
       P.body as post_body,
       C.id as comment_id,
       C.post_id as comment_post_id,
       C.name as comment_name,
       C.comment as comment_text,
       T.id as tag_id,
       T.name as tag_name
  from Blog B
       left outer join Author A on B.author_id = A.id
       left outer join Post P on B.id = P.blog_id
       left outer join Comment C on P.id = C.post_id
       left outer join Post_Tag PT on PT.post_id = P.id
       left outer join Tag T on PT.tag_id = T.id
  where B.id = #{id}
</select>
```

你可能想把它映射到一个智能的对象模型，这个对象表示了一篇博客，它由某位作者所写，有很多的博文，每篇博文有零或多条的评论和标签。 我们先来看看下面这个完整的例子，它是一个非常复杂的结果映射（假设作者，博客，博文，评论和标签都是类型别名）。 不用紧张，我们会一步一步地来说明。虽然它看起来令人望而生畏，但其实非常简单。

```xml
<!-- 非常复杂的结果映射 -->
<resultMap id="detailedBlogResultMap" type="Blog">
  <constructor>
    <idArg column="blog_id" javaType="int"/>
  </constructor>
  <result property="title" column="blog_title"/>
  <association property="author" javaType="Author">
    <id property="id" column="author_id"/>
    <result property="username" column="author_username"/>
    <result property="password" column="author_password"/>
    <result property="email" column="author_email"/>
    <result property="bio" column="author_bio"/>
    <result property="favouriteSection" column="author_favourite_section"/>
  </association>
  <collection property="posts" ofType="Post">
    <id property="id" column="post_id"/>
    <result property="subject" column="post_subject"/>
    <association property="author" javaType="Author"/>
    <collection property="comments" ofType="Comment">
      <id property="id" column="comment_id"/>
    </collection>
    <collection property="tags" ofType="Tag" >
      <id property="id" column="tag_id"/>
    </collection>
    <discriminator javaType="int" column="draft">
      <case value="1" resultType="DraftPost"/>
    </discriminator>
  </collection>
</resultMap>
```

`resultMap` 元素有很多子元素和一个值得深入探讨的结构。 下面是`resultMap` 元素的概念视图。

**结果映射（resultMap）**

- constructor - 用于在实例化类时，注入结果到构造方法中

  - `idArg` - ID 参数；标记出作为 ID 的结果可以帮助提高整体性能
  - `arg` - 将被注入到构造方法的一个普通结果
- `id` – 一个 ID 结果；标记出作为 ID 的结果可以帮助提高整体性能
- `result` – 注入到字段或 JavaBean 属性的普通结果
- association – 一个复杂类型的关联；许多结果将包装成这种类型

  - 嵌套结果映射 – 关联可以是 `resultMap` 元素，或是对其它结果映射的引用
- collection – 一个复杂类型的集合

  - 嵌套结果映射 – 集合可以是 `resultMap` 元素，或是对其它结果映射的引用
- discriminator – 使用结果值来决定使用哪个resultMap

  - case

    – 基于某些值的结果映射

    - 嵌套结果映射 – `case` 也是一个结果映射，因此具有相同的结构和元素；或者引用其它的结果映射

ResultMap 的属性列表


| 属性          | 描述                                                                                                                                     |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | 当前命名空间中的一个唯一标识，用于标识一个结果映射。                                                                                     |
| `type`        | 类的完全限定名, 或者一个类型别名（关于内置的类型别名，可以参考上面的表格）。                                                             |
| `autoMapping` | 如果设置这个属性，MyBatis 将会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认值：未设置（unset）。 |

**最佳实践** 最好逐步建立结果映射。单元测试可以在这个过程中起到很大帮助。 如果你尝试一次性创建像上面示例那么巨大的结果映射，不仅容易出错，难度也会直线上升。 所以，从最简单的形态开始，逐步迭代。而且别忘了单元测试！ 有时候，框架的行为像是一个黑盒子（无论是否开源）。因此，为了确保实现的行为与你的期望相一致，最好编写单元测试。 并且单元测试在提交 bug 时也能起到很大的作用。

##### id & result

```xml
<id property="id" column="post_id"/>
<result property="subject" column="post_subject"/>
```

这些元素是结果映射的基础。*id* 和 *result* 元素都将一个列的值映射到一个简单数据类型（String, int, double, Date 等）的属性或字段。

这两者之间的唯一不同是，*id* 元素对应的属性会被标记为对象的标识符，在比较对象实例时使用。 这样可以提高整体的性能，尤其是进行缓存和嵌套结果映射（也就是连接映射）的时候。

两个元素都有一些属性：


| 属性          | 描述                                                                                                                                                                                                                                                                                                              |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `property`    | 映射到列结果的字段或属性。如果 JavaBean 有这个名字的属性（property），会先使用该属性。否则 MyBatis 将会寻找给定名称的字段（field）。 无论是哪一种情形，你都可以使用常见的点式分隔形式进行复杂属性导航。 比如，你可以这样映射一些简单的东西：“username”，或者映射到一些复杂的东西上：“address.street.number”。 |
| `column`      | 数据库中的列名，或者是列的别名。一般情况下，这和传递给`resultSet.getString(columnName)` 方法的参数一样。                                                                                                                                                                                                          |
| `javaType`    | 一个 Java 类的全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。                                                                                  |
| `jdbcType`    | JDBC 类型，所支持的 JDBC 类型参见这个表格之后的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可以为空值的列指定这个类型。                                                                       |
| `typeHandler` | 我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的全限定名，或者是类型别名。                                                                                                                                                                         |

**支持的 JDBC 类型**

为了以后可能的使用场景，MyBatis 通过内置的 jdbcType 枚举类型支持下面的 JDBC 类型。


| `BIT`      | `FLOAT`   | `CHAR`        | `TIMESTAMP`     | `OTHER`   | `UNDEFINED` |
| ---------- | --------- | ------------- | --------------- | --------- | ----------- |
| `TINYINT`  | `REAL`    | `VARCHAR`     | `BINARY`        | `BLOB`    | `NVARCHAR`  |
| `SMALLINT` | `DOUBLE`  | `LONGVARCHAR` | `VARBINARY`     | `CLOB`    | `NCHAR`     |
| `INTEGER`  | `NUMERIC` | `DATE`        | `LONGVARBINARY` | `BOOLEAN` | `NCLOB`     |
| `BIGINT`   | `DECIMAL` | `TIME`        | `NULL`          | `CURSOR`  | `ARRAY`     |