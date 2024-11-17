---
title: Java学习笔记
createTime: 2024/11/02 19:04:46
permalink: /backend/1quvmmb9/
---

# Java学习笔记

在输入dos命令时，要使用英文输入，所有标点都要是英文

##### 面向过程

例如张三打篮球，还要在做一个李四踢足球的程序？

##### 面向对象

人的对象，人的运动的动作，运动的器械这三个对象，

实例化一个张三的对象，这个对象有一个打篮球的动作，器械是篮球

实例化一个李四的对象，对象有一个踢足球的动作，器械是足球

面向对象能够更好的在抽象的层面来分析问题，在程序实现跨越极大的赋予之前的代码

这些是面向过程编程很难实现的

C,C++，由程序员回收，手动编写代码回收（优点：能够在内存不足时快速回收，准确高效；缺点：容易失误出现bug，例如忘记编写回收内存的代码？内存一直不回收）

Java，垃圾回收是自动，开了一个习题集现此自动取检测那些内存不用了然后回收掉（优点：自动的，意味着不会出现忘记回收；缺点：回收不及时）

一般观点是，宁可回收不及时但是一定要回收，使用自动的垃圾回收更合适

### 类型转换

小的类型可以转换成大的类型，大的类型不能转换成小的类型 ==>

```java
int i = 1;
byte j = i;
// 这个转换是错误的
byte i = 1;
int j = i;
// 转换正确
```

混合计算

```java
byte a = 1;
short s = 2;
byte b = 3;
int i = a + s + b;
```

<!--在计算过程中，整型类型int的范围最大，所以s和b都分别转换成int类型，然后进行加法运算，最终的结果是int类型的数据-->

char字符类型相加

```java
char c = 'a';
byte b = 2;
int k = c + b; 
// 可以得到结果
```

char 类型的数据在与数字进行数学运算的时候，它是转换为相对应的ASCII码的值，然后在进行计算

```java
String str = "abc";
int i = 1;
System.out.println(str + i);
// 输出字符串
```

**把任何类型的值与字符串相加，结果都为字符串类型**

### 运算符

当整数与整数相除，舍弃小数部分

##### 位运算

```java
5 << 2 // 1左移两位，5 * 2的2次方 5 * 2 * 2 = 20
1 >> 2 // 1右移两位，5 / 2的-2次方 5 / 2 * 2 = 1
```

有符号的左移，空位补0，被移除的最高位丢弃，空缺位补0

有符号的右移是看右移之后的最高位是0还是1，是0空缺位补0，是1就补1，

无符号的右移，移动之后不管最高位是0还是1，空缺位都是直接补0

（转换为二进制进行同位运算）

同位&运算时，都是1结果为1，其他情况都是0

同位|运算时，都是0结果为0，其他情况都是1

同位^运算时，都是0或者都是1结果为0，其他情况为1

~反码运算，二进制1变0，0变1

### 数组

##### 数组排序

冒泡排序，把最大值往后移位，直至到最后一位

```java
public static void main(String[] args) {
        int[] array = new int[] {9, 1, 2, 5};
        int temp;
        for (int i = 0; i < array.length - 1; i ++) { // 进行数组长度-1排序轮次
            for (int j = 0; j < array.length - 1 - i; j ++) { // 每一轮次循环次数
                if (array[j] > array[j + 1]) { // 如果前值大于后值，就往后移一位
                    temp = array[j + 1]; // 先把后值缓存起来
                    array[j + 1] = array[j]; // 前值往后移一位，后值赋值给前值
                    array[j] = temp; // 前置赋值之前缓存后值的数值
                }
            }
        }
        for (int j : array) {
            System.out.println(j);
        }
    }
```

### 权限修饰符


|    修饰符    | 同一个类 | 同一个包中子类无关类 | 不同包的子类 | 不同包的无关类 |
| :-----------: | :------: | :------------------: | :----------: | :------------: |
|  **private**  |    √    |                      |              |                |
|  **default**  |    √    |          √          |              |                |
| **protected** |    √    |          √          |      √      |                |
|  **public**  |    √    |          √          |      √      |       √       |

### 时间对应字母表


| Letter | Date                | Example  |
| ------ | ------------------- | -------- |
| y      | Year                | 1996,96  |
| Y      | Week Year           | 2009,09  |
| M      | Month for Year      | July, 07 |
| D      | Day in Year         | 189      |
| d      | Day in Month        | 10       |
| H      | Hour in day(0-23)   | 0        |
| k      | Hour in day(1-24)   | 24       |
| K      | Hour in am(0-11)    | 0        |
| h      | Hour in am/pm(1-12) | 12       |
| m      | Minute in hour      | 30       |
| s      | Second in minute    | 55       |

### 内置接口

#### Consumer

```java
Consumer<String> consumer = System.out::println;
consumer.accept("hello world");
```

#### Function

对数据类型进行转换 <T --> R>

#### Predicate

用于校验数据，返回boolean类型

#### Supplier

用于计算返回值

### Stream

#### filter

过滤数据

```java
List<String> list = new ArrayList<>();
list.add("孙悟空");
list.add("猪八戒");
list.add("沙和尚");

// filter 过滤数据
String result = list.stream().filter(s -> {
// 需要过滤的条件
return s.length() >= 3;
}).collect(Collectors.joining()); // // 收集过滤的数据,将集合转换成字符串
```

#### count

返回数据长度

```java
// 返回过滤后的长度
long length = list.stream().filter(s -> s.length() == 3).count();
```

#### allMatch

所有数据是否都满足指定条件

```java
boolean result = list.stream().allMatch(new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return s.length() == 3;
    }
});
```

#### anyMatch

只要有一条数据满足条件就返回真

#### noneMatch

如果流中数据都不满足条件则返回真

```java
boolean result = list.stream().noneMatch(new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return s.length() == 3;
    }
});
```

#### distinct

过滤重复数据

```java
 // 过滤重复数据
list.stream().distinct().forEach(System.out::println);
```

#### dropWhile

从头开始删除元素，如果遇到满足条件的元素则终止删除

```java
list.stream().dropWh	ile(s -> s.startsWith("沙")).forEach(System.out::println);
```

#### findAny

获取流中的随机数据，可以在并行时提高效率

```java
list.stream().findAny().get();
```

#### findFirst

获取流中的第一条数据

#### flatMap

流对流进行转换

```java
list.stream().flatMap(new Function<String, Stream<String>>() {
    @Override
    public Stream<String> apply(String s) {
        return Stream.of("123");
    }
}).forEach(System.out::println);
```

#### flatMapToInt

转换为整数流

```java
list.stream().flatMapToInt(new Function<String, IntStream>() {
    @Override
    public IntStream apply(String s) {
        return IntStream.of(1, 2, 3);
    }
}).forEach(new IntConsumer() {
    @Override
    public void accept(int i) {
        System.out.println(i);
    }
});
```

#### limit

限制流数据数量

```java
list.stream().limit(2).forEach(System.out::println);
```

#### map

对流中数据类型进行转换

```java
list.stream().map(new Function<String, Integer>() {
    @Override
    public Integer apply(String s) {
        return s.length();
    }
}).forEach(System.out::println);
```

#### max

返回流中最大的数据

```java
String result = list.stream().max(String::compareTo).orElse("other");
```

#### peek

获取流处理过程后的数据

```java
Stream.of("one", "two", "three", "four")
    .filter(e -> e.length() > 3)
    .peek(e -> System.out.println("Filtered value: " + e))
    .map(String::toUpperCase)
    .peek(e -> System.out.println("Mapped value: " + e))
    .collect(Collectors.toList());
```

#### reduce

对流中数据进行累加操作

```java
String result = list.stream().reduce("123", new BinaryOperator<String>() {
    @Override
    public String apply(String s, String s2) {
        return s + s2;
    }
});
```

#### skip

跳过流中的第n条数据

```java
list.stream().skip(1).forEach(System.out::println);
```

#### sroted

对流中数据进行排序

```java
list.stream().sorted(new Comparator<String>() {
    @Override
    public int compare(String s, String t1) {
        return s.compareTo(t1);
    }
}).forEach(System.out::println);
```

#### takeWhile

去除满足条件的数据

```java
list.stream().takeWhile(new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return s.startsWith("沙");
    }
}).forEach(System.out::println);
```

#### parallel

并行执行

#### sequential

顺序执行

#### unordered

无序流

#### 静态方法

##### conncat

合并流

##### of

生成流

##### empty

空流

##### ofNullable

返回一个数据可能是空的流

##### 迭代流

```java
Stream.iterate(1, new Predicate<Integer>() {
    @Override
    public boolean test(Integer integer) {
        return integer < 100;
    }
}, new UnaryOperator<Integer>() {
    @Override
    public Integer apply(Integer integer) {
        return integer * 2;
    }
}).forEach(System.out::println);
```

只要test满足条件将会一直生成新的流，apply方法对数据进行一些处理

### IO流

#### FileOutStream

文件输出流(字节流)，用于写入文件

```java
try {
    // 创建文件输出流
    FileOutputStream fos = new FileOutputStream("file.txt");
    // 向流中写入内容 unicode码，97对应英文a
    fos.write(97); // a
    String hello = "hello";
    // 写入字符串的字节数组
    fos.write(hello.getBytes());
    // 从指定位置写入
    fos.write(hello.getBytes(), 0, hello.length()); // hello
    // 从指定位置开始和写入指定长度
    fos.write(hello.getBytes(), 2, 2); // ll
    // 关闭流
    fos.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

写入追加内容

```java
FileOutputStream fos = new FileOutputStream("fos.txt", true);
for (int i = 0; i < 10; i ++) {
    fos.write("hello\r\n".getBytes());
}
fos.close();
```

安全关闭输出流

```java
FileOutputStream fos = null;
try {
    fos = new FileOutputStream("fos2.txt");
    fos.write("hello".getBytes());
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fos != null) {
        try {
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

复制文件

```java
try {
    FileInputStream fis = new FileInputStream("file.txt");
    FileOutputStream fos = new FileOutputStream("file2.txt");
    // 创建缓冲字节数组
    byte[] bytes = new byte[1024];
    // 实际读取到的个数
    int len;
    // 开始循环读取 返回读取到的个数，-1表示已经读取完了
    while ((len = fis.read(bytes)) != -1) {
        // 开始写入文件
        fos.write(bytes, 0, len);
    }
    // 关闭流
    fis.close();
    fos.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### FileInputStream

文件输入流（字节流），用于读取文件

```java
try {
    FileInputStream fis = new FileInputStream("file.txt");
    // 读取一个字节的内容，返回读取到的内容 是一个整型
    int b = fis.read();
    // 输出，将字节数据转换为字符
    System.out.println((char)b); // 97 -> a
    // fis.available() // 返回流中的内容长度
    // 创建字节数组，存放内容
    byte[] bytes = new byte[fis.available()];
    // 返回读取到的长度，-1表示已经读取完了
    int len = fis.read(bytes);
    System.out.println(len);
    // 字节数组转换成字符串
    String str = new String(bytes);
    System.out.println(str);
    fis.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

简洁用法

```java
try {
    FileInputStream fis = new FileInputStream("file.txt");
    // 读取所有的字节数据
    byte[] bytes = fis.readAllBytes();
    System.out.println(new String(bytes));
    fis.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedReader

字符流，一行一行读取字符内容

```java
try {
    FileReader fr = new FileReader("file.txt");
    BufferedReader br = new BufferedReader(fr);
    String str;
    StringBuilder builder = new StringBuilder();
    // 一行一行读取
    while ((str = br.readLine()) != null) {
        builder.append(str);
        System.out.println(str);
    }
    System.out.println(builder);
    br.close();
    fr.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### FileReader

用与结合`BufferedReader`结合使用

#### InputStreamReader

用与结合`BufferedReader`+`InputStrem`结合使用

```java
try {
    InputStreamReader reader = new InputStreamReader(new FileInputStream("file.txt"));
    BufferedReader br = new BufferedReader(reader);
    ...
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedWriter

字符流，写入字符

```java
try {
    OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream("file.txt"));
    BufferedWriter bw = new BufferedWriter(writer);
    // 写入字符串
    bw.write("hello world");
    bw.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### FileWriter

字符流，写入字符串

```java
try {
    FileWriter fw = new FileWriter("file.txt");
    fw.append("hello");
    fw.write("world");
    fw.write("haha");
    fw.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### BufferedInputStream

#### BufferedOutStream

缓冲字节流，加快读取写入效率

```java
try {
    BufferedInputStream bis = new BufferedInputStream(new FileInputStream("file.txt"));
    BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("file2.txt"));
    byte[] bytes = new byte[1024];
    int len;
    while ((len = bis.read(bytes)) != -1) {
        bos.write(bytes, 0, len);
    }
    bis.close();
    bos.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### ByteArrayInputStream

对字节数组进行操作的流

```java
try {
    byte[] bytes = new byte[]{97, 98, 99};
    ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
    byte[] bytes2 = new byte[3];
    // long i = byteArrayInputStream.read(bytes2);
    // System.out.println(i);
    System.out.println(new String(bytes2));
    // 转换成输出流，将流中内容输出到输出流中
    byteArrayInputStream.transferTo(new FileOutputStream("file3.txt"));
    byteArrayInputStream.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

#### ByteArrayOutStream

对字节数组进行操作的流

```java
try {
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    byteArrayOutputStream.writeBytes(new byte[]{97, 98, 99});
    String str = byteArrayOutputStream.toString();
    System.out.println(str);
} catch (Exception e) {
    e.printStackTrace();
}
```

#### 安全关闭流

方法一

```java
FileReader fr = null;
FileWriter fw = null;
try {
    fr = new FileReader("");
    fw = new FileWriter("");
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) {
        try {
            fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    if (fw != null) {
        try {
            fw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

方法二

```java
try(FileReader fr = new FileReader("");
    FileWriter fw = new FileWriter("");) {
} catch (IOException e) {
    e.printStackTrace();
}
```

方法三

```java
FileReader fr = new FileReader("");
FileWriter fw = new FileWriter("");
try(fr; fw) {
    int len = fr.read();
} catch (IOException e) {
    e.printStackTrace();
}
```

### Reflect(反射)

#### ClassLoader

获取系统类加载

```java
// AppClassLoader
ClassLoader loader = ClassLoader.getSystemClassLoader();
System.out.println(loader);
// PlatformClassLoader
ClassLoader parent = loader.getParent();
System.out.println(parent);
// null
System.out.println(parent.getParent());
```

#### Class

java字节码文件

```java
try {
    // 获取类字节码
    Class<Student> studentClass = Student.class;
    System.out.println(studentClass);

    Student student = new Student();
    // 直接通过对象的实例获取类字节码
    Class<? extends Student> c = student.getClass();
    // 通过静态方法获取
    Class<?> s = Class.forName("Student");
    // 两个获取到的是相同的对象
    System.out.println(c == s); // true
} catch (Exception e) {
    e.printStackTrace();
}
```

#### Constructor

无参公共构造器（public）

```java
try {
    Class<?> studentClass = Class.forName("Student");
    // 获取类中的公共构造器（public）
    Constructor<?>[] constructors = studentClass.getConstructors();
    Arrays.stream(constructors).forEach(System.out::println);
    // 获取类中所有的构造器(private+public)
    Constructor<?>[] declaredConstructors = studentClass.getDeclaredConstructors();
    Arrays.stream(declaredConstructors).forEach(System.out::println);

    // 获取到默认的公共构造器(public Student() {})
    Constructor<?> constructor = studentClass.getConstructor();
    // 通过构造器创建实例对象
    Student student = (Student) constructor.newInstance();
    System.out.println(student);
} catch (Exception e) {
    e.printStackTrace();
}
```

有参公共构造器（public）

```java
try {
    Class<?> studentClass = Class.forName("Student");
    // 获取到公共的有参构造器，并指定类型（public Student(String name, int age) {}）
    Constructor<?> constructor = studentClass.getConstructor(String.class, int.class);
    // 通过获取到的构造器创建实例对象，并传入对应类型的数据
    Object student = constructor.newInstance("test", 18);
    System.out.println(student);
} catch (Exception e) {
    e.printStackTrace();
}
```

有参私有构造器（private）

```java
try {
    Class<?> studentClass = Class.forName("Student");
    // 获取私有有参构造器（private Student(String name) {}）
    Constructor<?> declaredConstructor = studentClass.getDeclaredConstructor(String.class);
    // 访问私有构造器会报错，设置这个可以关闭检查，允许访问
    declaredConstructor.setAccessible(true);
    Object object = declaredConstructor.newInstance("江西上饶");
    System.out.println(object);
} catch (Exception e) {
    e.printStackTrace();
}
```

#### Field

变量

```java
try {
    Class<?> studentClass = Class.forName("Student");
    // 获取所有公共的变量
    Field[] fields = studentClass.getFields();
    Arrays.stream(fields).forEach(System.out::println);
    // 获取所有的变量
    Field[] declaredFields = studentClass.getDeclaredFields();
    Arrays.stream(declaredFields).forEach(System.out::println);
    // 获取指定的公共的变量
    Field address = studentClass.getField("address");
    // 获取变量（包含私有的）
    Field declaredField = studentClass.getDeclaredField("address");
    System.out.println(declaredField);
    System.out.println(address);
    // 获取构造器
    Constructor<?> constructor = studentClass.getConstructor();
    // 创建实例
    Object object = constructor.newInstance();
    // 设置变量值到实例对象上
    address.set(object, "江西上饶");
    // 私有的变量设置值需要设置允许访问才行，不然会报错
    declaredField.setAccessible(true);
    declaredField.set(object, "江西南昌");
    System.out.println(object);
} catch (Exception e) {
    e.printStackTrace();
}
```

#### Method

方法

```java
try {
    Class<?> studentClass = Class.forName("Student");
    // 获取类中的公共方法
    Method[] methods = studentClass.getMethods();
    Arrays.stream(methods).forEach(System.out::println);
    // 获取所有的方法（包括私有）
    Method[] declaredMethods = studentClass.getDeclaredMethods();
    Arrays.stream(declaredMethods).forEach(System.out::println);

    // 获取指定的公共方法
    Method method = studentClass.getMethod("method01");
    System.out.println(method);
    Constructor<?> constructor = studentClass.getConstructor();
    Object object = constructor.newInstance();
    // 使用创建的实例对象调用这个方法
    method.invoke(object);

    // 获取私有的带参方法
    Method method03 = studentClass.getDeclaredMethod("method03", String.class);
    // 设置允许访问
    method03.setAccessible(true);
    // 调用方法
    method03.invoke(object, "str");
    // 获取set方法
    Method setName = studentClass.getMethod("setName", String.class);
    // 调用set方法并传入参数
    setName.invoke(object, "hello");
    System.out.println(object);
} catch (Exception e) {
    e.printStackTrace();
}
```

### 枚举

枚举解决if多的问题

#### 解决办法1

定义统一的接口

```java
interface PayEnum {
    void pay();
}
```

创建实现类，实现具体业务

```java
private static class WeChatPay implements PayEnum {
    @Override
    public void pay() {
        System.out.println("WeChat Pay");
    }
}

private static class AliPay implements PayEnum {
    @Override
    public void pay() {
        System.out.println("AliPay");
    }
}
```

创建枚举对象

```java
private enum PayTypeEnum {
    PAY_WECHAT("1", new WeChatPay()),
    PAY_ALI("2", new AliPay());

    private final String payType;

    private final PayEnum payEnum;

    PayTypeEnum(String payType, PayEnum payEnum) {
        this.payType = payType;
        this.payEnum = payEnum;
    }

    public static PayEnum getPay(String payType) {
        for (PayTypeEnum payTypeEnum: PayTypeEnum.values()) {
            if (payTypeEnum.payType.equals(payType)) {
                return payTypeEnum.payEnum;
            }
        }
        // 默认
        return new WeChatPay();
    }
}
```

实现

```java
PayEnum payEnum = PayTypeEnum.getPay("1");
PayEnum payEnum2 = PayTypeEnum.getPay("2");
payEnum.pay();
payEnum2.pay();
```

#### 解决办法2

适用于业务代码少的情况

```java
private enum PayTypeEnum implements PayEnum {
    WECHAT_PAY {
        @Override
        public void pay() {
            System.out.println("WeChat Pay");
        }
    },

    ALI_PAY {
        @Override
        public void pay() {
            System.out.println("Ali Pay");
        }
    }
}
```

实现

```java
PayTypeEnum.valueOf("WECHAT_PAY").pay();
PayTypeEnum.valueOf("ALI_PAY").pay();
```