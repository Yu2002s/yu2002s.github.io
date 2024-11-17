---
title: Mysql笔记
createTime: 2024/11/02 12:05:23
permalink: /backend/wm7a2qo0/
---

### MySql数据库管理系统

```mysql
show databases; #查询所有数据库
create database db1; #创建数据库
create database if not exists db1; #创建数控并进行判断是否存在
drop database if exists db1; #删除数据库并进行判断是否存在
use database db1; #使用数据库
select database(); #当前选中的数据库
show tables; #获取数据库里所有的表
desc func #获取指定表的结构
##########################
#创建表
create table table1(
    字段名1 数据类型1,
    字段名2 数据类型2
);
-- 创建表
create table tb_user (
    id int primary key auto_increment comment 'ID 唯一标识',
    username varchar(20) not null unique comment '用户名',
    password varchar(20) not null comment '密码',
    age tinyint(3) comment '年龄',
    gender char(1) default '男' comment '性别'
) comment '用户表'

drop table table1; #删除表
alter table student rename to stu; #修改表名
alter table stu add address varchar(50); #添加列
alter table stu modify address char(50); #修改列
alter table stu change address addr 
varchar(30); #修改列和数据类型
alter table stu drop addr; #删除列

## 添加
INSERT INTO stu(id, name) VALUES(1,'张三'); #添加指定字段数据
insert into stu values(1, '张三') # 添加数据
insert into stu(id, name) values(1, '张三'),(2,'李四') # 批量添加指定字段数据
insert into stu values(1, '张三'),(2, '李四') # 批量添加数据

UPDATE stu set sex = '女' where name = '张三'; #更新指定列
delete from stu where name = '张三'; #删除指定列

select * from stu where age BETWEEN 20 and 30;

select * from stu where age in (18,20,22);
	
select * from stu where english is NULL;

select name from stu where name like '马%';

select * from stu where name like '_花%';

select * from stu where name like '%德%';

select * from stu group by math desc, english asc;

### if表达式
select if (gender = 1, '男性', '女性') sex, count(*) from tb_emp group by gender;

### case表达式
select 
	(case job when 1 then "老板" when 2 then "学生" else "未分配" end) 职位,
    count(*) from tb_emp group by job;

select count(id) from stu;

select max(math) from stu;

select min(math) from stu;

select sum(math) from stu;

select avg(math) from stu;

select min(english) from stu;

select sex, avg(math) from stu GROUP BY sex;

select sex, avg(math), count(*) from stu where math > 70 GROUP BY sex HAVING COUNT(*) > 2;

#构建表时添加外键
create table emp(
	id int PRIMARY KEY auto_increment,
	name varchar(20),
	age int,
	dep_id int,
    # fk_emp_dept 为外键名 dep_id 和 id 想约束
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id)
);
#删除外键
alter table emp drop FOREIGN key fk_emp_dept;
#添加外键
alter table emp add CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id);
# 多表查询 隐式内连接
select * from emp, dept where emp.dep_id = dept.id;
# 多表查询 查询指定列 隐式内连接（别名）
select t1.name, t1.age,t2.dep_name from emp t1, dept t2 where t1.dep_id = t2.id;
#多表查询 显式内连接
select * from emp INNER JOIN dept on emp.dep_id = dept.id;
#多表查询 左外连接
select * from emp left JOIN dept on emp.dep_id = dept.id;
#多表查询 右外连接
select * from emp right JOIN dept on emp.dep_id = dept.id;
# 子查询 in not in
select * from emp where age > (select age from emp where name = '张三');
select * from emp where dep_id in (select id from dept where dep_name = '销售部' or dep_name = '研发部');
select * from emp where (entry_date, job) = ('2009-01-01', 2)
select * from emp where (entry_date, job) = (select entry_date, job from emp where name = 'jdy');
select * from (select * from emp where entry_date > '2005-01-01') e, dept d where e.dept_id = d.id;

# 事务
# 开启事务
start transaction;
begin;
# 提交事务
commit;
# 回滚事务
rollback;

## 拼接字符串
select concat('a', 'b', 'c');
```

### 内连接与外连接

内连接查询两张表之间交集中的数据，左外连接查询左表和交集的数据，右外连接查询右表和交集的数据

### 创建表

#### char 与 varchar的区别

char为字符，每个字段长度固定。

varchar为字符串，每个字段长度不固定

#### 语法

create table 表名 (

```
字段1 字段类型 [约束] [commit 字段1注释]
```


)

#### 约束


| 约束     | 描述                                       | 关键字      |
| -------- | ------------------------------------------ | ----------- |
| 非空约束 | 限制字段不能为空                           | not null    |
| 唯一约束 | 保证字段是唯一的且非空                     | unique      |
| 主键约束 | 唯一标识id                                 | primary key |
| 默认约束 | 保存数据时未指定值，则使用默认值           | default     |
| 外键约束 | 让两张表建立连接，保证数据的一致性和完整性 | foreign key |

### 数据类型

#### 整数类型

整数列的可选属性有三个：

M: 宽度(在0填充的时候才有意义，否则不需要指定)
unsigned: 无符号类型(非负)
zerofill: 0填充,(如果某列是zerofill，那么默认就是无符号)，如果指定了zerofill只是表示不够M位时，用0在左边填充，如果超过M位，只要不超过数据存储范围即可
原来，在 int(M) 中，M 的值跟 int(M) 所占多少存储空间并无任何关系。 int(3)、int(4)、int(8) 在磁盘上都是占用 4 bytes 的存储空间。


| 类型      | 大小(byte) | 有符号(SIGNED)范围                                    | 无符号(UNSIGNED)范围                                      | 描述             | 备注                                              |
| --------- | ---------- | ----------------------------------------------------- | --------------------------------------------------------- | ---------------- | ------------------------------------------------- |
| tinyint   | 1          | (-128，127)                                           | (0，255)                                                  | 小整数值         |                                                   |
| smallint  | 2          | (-32768，32767)                                       | (0，65535)                                                | 大整数值         |                                                   |
| mediumint | 3          | (-8388608，8388607)                                   | (0，16777215)                                             | 大整数值         |                                                   |
| int       | 4          | (-2147483648，2147483647)                             | (0，4294967295)                                           | 大整数值         |                                                   |
| bigint    | 8          | (-2^63，2^63-1)                                       | (0，2^64-1)                                               | 极大整数值       |                                                   |
| float     | 4          | (-3.402823466 E+38，3.402823466351 E+38)              | 0 和 (1.175494351 E-38，3.402823466 E+38)                 | 单精度浮点数值   | float(5,2)：5表示整个数字长度，2 表示小数位个数   |
| double    | 8          | (-1.7976931348623157 E+308，1.7976931348623157 E+308) | 0 和 (2.2250738585072014 E-308，1.7976931348623157 E+308) | 双精度浮点数值   | double(5,2)：5表示整个数字长度，2 表示小数位个数  |
| decimal   |            |                                                       |                                                           | 小数值(精度更高) | decimal(5,2)：5表示整个数字长度，2 表示小数位个数 |

对于浮点列类型，在MySQL中单精度值使用4个字节，双精度值使用8个字节

MySQL允许使用非标准语法（其他数据库未必支持，因此如果设计到数据迁移，则最好不要这么用）：FLOAT(M,D)或DOUBLE(M,D)。这里，(M,D)表示该值一共显示M位，其中D表示小数点后几位，M和D又称为精度和标度。例如，定义为FLOAT(5,2)的一个列可以显示为-999.99-999.99。M取值范围为0~255。D取值范围为0~30，同时必须<=M。

如果存储时，整数部分超出了范围（如上面的例子中，添加数值为1000.01），MySql就会报错，不允许存这样的值。如果存储时，小数点部分若超出范围，就分以下情况：若四舍五入后，整数部分没有超出范围，则只警告，但能成功操作并四舍五入删除多余的小数位后保存，例如在FLOAT(5,2)列内插入999.009，近似结果是999.01。若四舍五入后，整数部分超出范围，则MySql报错，并拒绝处理。如999.995和-999.995都会报错。

说明：小数类型，也可以加unsigned，但是不会改变数据范围，例如：float(3,2) unsigned仍然只能表示0-9.99的范围。

float和double在不指定精度时，默认会按照实际的精度（由实际的硬件和操作系统决定）来显示

REAL就是DOUBLE ，如果SQL服务器模式包括REAL_AS_FLOAT选项，REAL是FLOAT的同义词而不是DOUBLE的同义词。

注意：在编程中，如果用到浮点数，要特别注意误差问题，因为浮点数是不准确的，所以我们要避免使用“=”来判断两个数是否相等。如果希望保证值比较准确，推荐使用定点数据类型。

#### 字符类型


| 类型       | 大小                  | 描述                         |  |                                                                |     |        |          |
| ---------- | --------------------- | ---------------------------- | - | -------------------------------------------------------------- | --- | ------ | -------- |
| char       | 0-255 bytes           | 定长字符串                   |  | char(10): 最多只能存10个字符,不足10个字符,占用10个字符空间     | AB  | 性能高 | 浪费空间 |
| varchar    | 0-65535 bytes         | 变长字符串                   |  | varchar(10): 最多只能存10个字符,不足10个字符, 按照实际长度存储 | ABC | 性能低 | 节省空间 |
| tinyblob   | 0-255 bytes           | 不超过255个字符的二进制数据  |  |                                                                |     |        |          |
| tinytext   | 0-255 bytes           | 短文本字符串                 |  |                                                                |     |        |          |
| blob       | 0-65 535 bytes        | 二进制形式的长文本数据       |  |                                                                |     |        |          |
| text       | 0-65 535 bytes        | 长文本数据                   |  | phone char(11)                                                 |     |        |          |
| mediumblob | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据 |  | username varchar(20)                                           |     |        |          |
| mediumtext | 0-16 777 215 bytes    | 中等长度文本数据             |  |                                                                |     |        |          |
| longblob   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据     |  |                                                                |     |        |          |
| longtext   | 0-4 294 967 295 bytes | 极大文本数据                 |  |                                                                |     |        |          |

#### 日期类型


| 类型      | 大小(byte) | 范围                                       | 格式                | 描述                     |
| --------- | ---------- | ------------------------------------------ | ------------------- | ------------------------ |
| date      | 3          | 1000-01-01 至 9999-12-31                   | YYYY-MM-DD          | 日期值                   |
| time      | 3          | -838:59:59 至 838:59:59                    | HH:MM:SS            | 时间值或持续时间         |
| year      | 1          | 1901 至 2155                               | YYYY                | 年份值                   |
| datetime  | 8          | 1000-01-01 00:00:00 至 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| timestamp | 4          | 1970-01-01 00:00:01 至 2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值，时间戳 |

### 安装

#### Windows

Mysql - windows
1.下载地址: https://dev.mysql.com/downloads/mysql/
选择: Windows (x86, 64-bit), ZIP Archive 下载压缩包
Windows (x86, 64-bit), MSI Installer(windows安装器)

在系统环境变量添加变量MYSQL_HOME指向安装路径，随后Path变量添加 %MYSQL_HOME%\bin

2.进入文件安装(下载)mysql的bin目录，终端输入 `mysqld --initialize  --console`  或 `mysqld --initialize-insecure`
完成后自动生成随机密码
3.安装mysql服务并启动，管理员运行 mysqld --install mysql

4.net start mysql

5.修改默认密码

mysqladmin -u root password 1234

6.执行命令 mysql -uroot -p，输入密码

7.在mysql里执行命令，ALTER USER 'root'@'localhost' IDENTIFIED BY '密码';

#### Linux for Ubuntu

### 初始化

没有初始密码，解决办法

```bash
mysql -uroot -p # 无密码直接进入mysql
use mysql; # 选择mysql数据库
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'; # 设置密码
```

#### 支持远程链接

查询配置文件位置

```bash
whereis mysql;
```

修改conf配置文件，使用vim进行编辑配置文件

`vim mysqld.conf`

bindadress = 修改为 0.0.0.0 (可选)

---

##### 第一种方法修改root账户host

```bash
use mysql; # 使用mysql数据库
update user set host = '%' where user = 'root'; #修改root账户权限
flush privileges; #刷新权限
```

---

##### 第二种方法添加远程访问

添加一个账户用于远程访问

`use mysql;` 选择数据库

`create user 'admin'@'%' identified by 'password'; ` 构建用户

`GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%'; #执行授权`

`flush privileges; # 刷新用户权限`

`ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password'; ` #授权远程访问

`flush privileges; #刷新`

##### 端口设置

`firewall-cmd --zone=public --add-port=3306/tcp --permanent`

重启防火墙

`systemctl restart firewalld.service`

查询防火墙开放端口

`firewall-cmd --list-ports`