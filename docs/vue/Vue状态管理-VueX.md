---
title: Vue状态管理-VueX
createTime: 2024/06/05 10:58:58
permalink: /article/pqde3l9h/
tags: [状态管理, Vuex]
---

Pinia 的前身，主要在 Vue2 中使用

<!-- more -->

#### 安装

```bash
pnpm install vuex
```

/store/index.js

```js
import Vue from "vue"
import Vuex from "vuex"
import user from "@/store/modules/user"

import { COUNT_MUTATION } from "./mutation-types"

// 仓库
// 安装Vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 共享数据
  state: {
    count: 0,
  },
  // 修改数据
  mutations: {
    // state 共享数据，payload 传递的参数
    [COUNT_MUTATION]: (state, payload) => {
      state.count = payload
    },
  },
  // methods方法
  actions: {
    // context表示当前store仓库实例
    // 这里可以将context结构为commit，dispatch，state, 如果是子模块，还附有rootState
    // payload为传递过来的数据，可以为具体数值，也可以为对象
    increment: (context /* payload */) => {
      context.commit(COUNT_MUTATION, context.state.count + 1)
      context.commit("user/setUserName", "admin modified")
      context.dispatch("user/totalUserName", "123")
    },
  },
  // 计算属性
  getters: {
    total: (state) => {
      return state.count * 2
    },
  },
  // 子模块
  modules: {
    user,
  },
})

export default store
```

/store/modules/user.js

子模块

```js
import { COUNT_MUTATION } from "@/store/mutation-types"

export default {
  namespaced: true, // 当设置为true时，除state外，getter、action、mutation访问将额外添加模块名
  state: () => ({
    username: "admin",
  }),
  mutations: {
    setUserName(state, payload) {
      state.username = payload
    },
  },
  actions: {
    // state: 当前模块的state，commit：提交修改函数，rootState：主仓库的state, payload传递的参数
    // eslint-disable-next-line no-unused-vars
    totalUserName(
      { state, commit, rootState, dispatch, getters, rootGetters },
      payload
    ) {
      console.log(payload)
      commit("setUserName", state.username + rootState.count)
      // 调用主仓库中的mutation
      // 第一个参数为type，第二个为传递的参数，第三个指定为根仓库
      commit(COUNT_MUTATION, 10, { root: true })
      // 调用其他模块中的mutation
      // commit('test/mutation', payload, {root: true})
      // 调用主模块的increment方法
      // dispatch('increment', 10, {root: true})
      // 调用其他模块的方法同上
      // 调用当前getters
      // getters.userInfo
      // 调用主仓库的getters
      // rootGetters.total
      // 调用其他模块的getters
      // rootGetters["user/userInfo"]
    },
    // 将待命名空间的actions添加到主仓库中
    testAction: {
      root: true,
      handler(context, payload) {
        console.log(context, payload)
      },
    },
  },
  getters: {
    // state: 当前state， getter当前模块getters，rootState：主仓库state
    userInfo: (state, getters, rootState) => {
      return state.username + getters + rootState.count
    },
  },
}
```

main.js 中使用 vuex

```js
import Vue from "vue"
import App from "./App.vue"
import store from "@/store"

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store, // 注入vuex实例
}).$mount("#app")
```

#### 使用

App.vue

```html
<template>
  <div>
    {{ $store.state.count }}, {{ $store.getters.total }}

    <div>{{ $store.state.user.username }}123</div>
    <!--    <div>{{ $store.getters.userInfo }}</div>-->
    <!--  子模块中的数据使用此方法获取到dom结构中  -->
    <div>{{ $store.getters["user/userInfo"] }}</div>
    <Counter />
    <button @click="increment">+1</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from "vuex"
  import Counter from "@/components/Counter.vue"
  import { COUNT_MUTATION } from "@/store/mutation-types"

  // 统一创建子模块的命名空间
  // const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

  export default {
    name: "App",
    components: {
      Counter,
    },
    methods: {
      /* ===========mapMutations================ */
      // 通过mapMutation方法将仓库中的修改数据方法添加到methods中
      ...mapMutations([COUNT_MUTATION]),
      // 子模块user共享，同上
      ...mapMutations("user", ["setUserName"]),
      // mapActions同上
      increment() {
        // 调用仓库中increment方法
        this.$store.dispatch("increment")
        // 传递参数
        // this.$store.dispatch('increment', 1)
        // 对象方式传递
        /*this.$store.dispatch('increment', {
        count: 1
      })*/
        /*this.$store.dispatch({
        type: 'increment',
        count: 0, // 取值方式：payload.count
      })*/

        this.$store.dispatch("user/totalUserName", 0)

        // user.js中的actions添加到主仓库中的actions中
        this.$store.dispatch("testAction", 0)
      },
      reset() {
        // 对仓库中的数据进行修改操作
        this.$store.commit(COUNT_MUTATION, 0)
        // 传递的参数可以是一个对象
        // this.$store.commit({type: 'setCount', amount: 0})
      },
    },
    computed: {
      /* ==========使用State=============  */
      // 通过mapState将仓库中的数据共享到计算属性当中
      ...mapState(["count"]),
      // 通过对象方式对数据名进行重命名
      ...mapState({ countNum: "count" }),
      // 使用模块中的数据
      ...mapState("user", ["username"]),
      /* ==============使用Getters=================== */
      // 通过mapGetters方法将仓库中的Getters共享到计算属性中
      ...mapGetters(["total"]),
      ...mapGetters({ totalNum: "total" }),
      ...mapGetters("user", ["userInfo"]),
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

Counter.vue

```html
<script>
  import { mapState } from "vuex"

  export default {
    name: "Counter",
    // 使用对象方式
    computed: mapState({
      // 将仓库中的count共享到当前组件的计算属性当中
      // count: state => state.count,
      // 以上方法的简写形式
      countNum: "count",
      // 使用函数方式更加灵活
      count(state) {
        return state.count + this.localState
      },
    }),
  }
</script>

<template>
  <div>Count: {{ count }} , CountNum: {{ countNum }}</div>
</template>
```

#### 表单处理

在 vue 组件中

```html
<input :value="message" @input="updateMessage" />
```

```js
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

store 中的 mutation，用于修改数据

```js
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```
