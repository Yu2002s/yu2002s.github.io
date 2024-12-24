---
title: React-Navigation使用
createTime: 2024/12/24 21:11:19
permalink: /article/43bzwomc/
---

## React-Navigation

`React-Native` 官方推荐使用 [React-Navigation](https://react-navigation.nodejs.cn/) 来实现路由跳转。

## 1. 安装依赖包

- @react-navigation/native: 核心依赖
- @react-navigation/native-stack: 栈式导航
- @react-navigation/elements: 元素 (Text, Button)
- react-native-screens react-native-safe-area-context: 兼容依赖

::: npm-to

```sh
# 核心依赖
npm install @react-navigation/native
# 安装 expo
npm install expo
# expo 安装 react-native-screens 和 react-native-safe-area-context
npx expo install react-native-screens react-native-safe-area-context
# 安装兼容依赖
npm install react-native-screens react-native-safe-area-context
# 原生导航依赖
npm install @react-navigation/native-stack
# 元素依赖
npm install @react-navigation/elements
```

:::

### 1.1 修改 MainActivity.kt

需要进行此更改，以避免与 View 状态在 Activity 重新启动期间未一致持久相关的崩溃。

在 /android/app/src/packageName/MainActivity.java 中添加以下代码

```java
class MainActivity: ReactActivity() {
  // ...
  override fun onCreate(savedInstanceState: Bundle?) { // [!code highlight]
    super.onCreate(null) // [!code highlight]
  } // [!code highlight]
  // ...
}
```

## 2. 动态配置路由

添加 `NavigationContainer` 导航容器，这是必须的

```tsx
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native" // [!code highlight]

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer> // [!code highlight]
  )
}
```

### 2.1 添加路由

使用 `createNativeStackNavigator()` 可以创建一个导航器。

`createNativeStackNavigator` 是一个返回包含 2 个属性的对象的函数：`Screen` 和 `Navigator`。
它们都是用于配置导航器的 `React` 组件。`Navigator` 应包含 `Screen` 元素作为其子元素来定义路由的配置。

```tsx
// In App.js in a new project

import * as React from "react"
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}
```

### 2.2 添加第二个路由

通过属性 `initialRouteName` 可以设置初始路由。

```tsx
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}
```

传递额外的参数

```tsx
<Stack.Screen name="Home">
  {(props) => <HomeScreen {...props} extraData={someData} />}
</Stack.Screen>
```

### 2.3 配置路由参数

`Stack.Screen` 组件接受一个 `options` 属性，该属性是一个对象，其中包含路由配置。

```tsx
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ title: "Overview" }}
  />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
```

## 3. 路由跳转

使用 `useNavigation` 钩子来获取导航器实例。

```tsx
import * as React from "react"
import { View, Text } from "react-native"
import { createStaticNavigation, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button } from "@react-navigation/elements"

function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Details")}>
        Go to Details
      </Button>
    </View>
  )
}

// ... other code from the previous section
```

::: tip
当前由于没有设置 TypeScript 类型, 所以以上代码在 Ts 项目将会报错，不过不会影响程序正常运行。
:::

### 3.1 `push` 导航

如果使用 `navigate` 方法进行导航，如果当前页已经是该导航，则不会进行导航。
此时，应该使用 `push` 方法。

```tsx
<Button onPress={() => navigation.push("Details")}>
  Go to Details... again
</Button>
```

### 3.2 `goBack` 导航

`goBack` 方法用于返回上一个页面。

```tsx
function DetailsScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.push("Details")}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  )
}
```

### 3.3 `popTo`

`popTo` 方法用于返回到指定页面。另外 popToTop 方法用于返回到栈顶。

```tsx
function DetailsScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button onPress={() => navigation.push("Details")}>
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
      <Button onPress={() => navigation.popTo("Home")}>Go to Home</Button>
      <Button onPress={() => navigation.popToTop()}>
        Go back to first screen in stack
      </Button>
    </View>
  )
}
```

### 3.4 路由传参

1.通过将参数放入对象中作为 `navigation.navigate`
函数的第二个参数来将参数传递给路由：`navigation.navigate('RouteName', { /_ params go here _/ })`

2.读取屏幕组件中的参数：`route.params`。

```tsx
function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }}
      >
        Go to Details
      </Button>
    </View>
  )
}

function DetailsScreen({ route }) {
  const navigation = useNavigation()

  /* 2. Get the param */
  const { itemId, otherParam } = route.params

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      >
        Go to Details... again
      </Button>
      <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  )
}
```

#### 3.4.1 设置初始参数

```tsx
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

#### 3.4.2 修改参数

使用 `setParams` 动态修改参数

```tsx
navigation.setParams({
  itemId: Math.floor(Math.random() * 100),
})
```

#### 3.4.3 将参数传递到上一个屏幕

```tsx
function HomeScreen({ route }) {
  const navigation = useNavigation()

  // Use an effect to monitor the update to params
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      alert("New post: " + route.params?.post)
    }
  }, [route.params?.post])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("CreatePost")}>
        Create post
      </Button>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  )
}

function CreatePostScreen({ route }) {
  const navigation = useNavigation()
  const [postText, setPostText] = React.useState("")

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        onPress={() => {
          // Pass params back to home screen
          navigation.popTo("Home", { post: postText })
        }}
      >
        Done
      </Button>
    </>
  )
}
```

#### 3.4.4 将参数传递到嵌套屏幕

```tsx
navigation.navigate("More", {
  screen: "Settings",
  params: { user: "jane" },
})
```

## 4. 配置 `Header`

动态设置标题

```tsx
<Button onPress={() => navigation.setOptions({ title: "Updated!" })}>
  Update the title
</Button>
```

在标题中使用参数

```tsx
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My home" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  )
}
```

### 4.1 跨屏共享 `options`

使用 `screenOptions` 同时设置多个子 `screen` 的`options`。

```tsx
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "My home" }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}
```

### 4.2 自定义标题

```tsx
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("@expo/snack-static/react-native-logo.png")}
    />
  )
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}
```

## 5. 配置 TypeScript

通常将类型定义文件放在 `/type/navigation/types.tsx` 目录下，方便管理。

1. 常用的类型

- `RootStackParamList`: 导航栈配置（自定义），使用导航时，可以获取到导航名称和导航参数类型
- `NativeStackNavigationProp<RootStackParamList, 'Name'>`: 导航参数类型，用于导航跳转时提供 ts 类型
- `NativeStackScreenProps<RootStackParamList, 'Name', 'id'>`: 导航屏幕接收参数类型，用于导航目的地接收参数，包含:['navigation', 'route'] 两个对象
- `NativeStackScreenProps<RootStackParamList, 'Name'>['navigation'] = NativeStackNavigationProp<RootStackParamList, 'Name'>`
- `NativeStackScreenProps<RootStackParamList, 'Name'>['route'] = RouteProp<RootStackParamList, 'Name'>`
- `NavigatorScreenParams<ChildParamList>`: 用于定义嵌套导航的子集

### 5.1 配置 ParamList

配置了 ParamList 后，在导航跳转时，可以获取到导航名称和导航参数类型。

```tsx
export type RootStackParamList = {
  /**
   * 主路由栈配置
   */
  Main: NavigatorScreenParams<MainStackParamList>
  Login: undefined

  /**
   * 组件列表
   */
  Component: undefined
} & ComponentParamList

export type MainStackParamList = {
  Home: {
    post: string
  }
  Mine: {
    content: string
  }
}

export type ComponentParamList = {
  MyView: undefined

  MyText: undefined

  MyButton: undefined

  MySwitch: undefined
}
```

使用 `ParamList`

```tsx
/**
 * 根栈
 */
const RootStack = createNativeStackNavigator<RootStackParamList>()

/**
 * 主栈
 */
const MainStack = createBottomTabNavigator<MainStackParamList>()

<NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
  <RootStack.Navigator initialRouteName="Main">
    <RootStack.Screen name="Main" component={MainStackScreen} />
  </RootStack.Navigator>
</NavigationContainer>
```

### 5.2 配置 ScreenProps

配置通用屏幕的 `Props` 类型

```tsx
/**
 * 根导航屏幕 Props 类型
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

/**
 * 主 tab 导航屏幕 Props 类型
 */
export type MainTabScreenProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >
```

具体使用:

Home.tsx

```tsx
export default function HomeScreen({
  route,
  navigation,
}: MainTabScreenProps<"Home">) {
  const theme = useTheme()
  const [count, setCount] = useState(0)
  return (
    <View>
      <Text
        style={{ color: theme.colors.text }}
        onPress={() => navigation.jumpTo("Mine", { content: "Hello" })}
      >
        Hello World: {route.params?.post}
      </Text>
      <Text>count: {count}</Text>
      <Button onPress={() => setCount((c) => c + 1)}>+1</Button>
      <Button pressOpacity={0} screen="Login">
        Navigate to Login
      </Button>

      <Button onPress={() => navigation.navigate("Component")}>
        Component列表
      </Button>
    </View>
  )
}
```

嵌套导航

```tsx
export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Back to Home"
        onPress={() => {
          navigation.popTo("Main", {
            screen: "Home",
            params: {
              post: "Login Done!",
            },
          })
        }}
      />
    </View>
  )
}
```

### 5.3 全局配置

配置了全局参数列表类型，可以在任何地方使用。使用 `useNavigation` 获取导航对象，使用 `useRoute` 获取路由对象。

```tsx
declare global {
  namespace ReactNavigation {
    /**
     * 对根栈参数列表类型进行扩展，可以获得全局提示
     */
    interface RootParamList extends RootStackParamList {}
  }
}
```
