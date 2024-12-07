import {viteBundler} from "@vuepress/bundler-vite"
import {defineUserConfig} from "vuepress"
import {plumeTheme} from "vuepress-theme-plume"

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "冬日暖雨",
  description: "冬日暖雨的个人主页,记录学习到的技术。包含博客、笔记、App",

  head: [
    ["link", {rel: "icon", href: "/avatar.png"}],
    [
      "meta",
      {
        name: "keywords",
        content:
          "冬日暖雨,冬雨,冬雨影视,个人主页,个人博客,IT技术分享,学习,笔记",
      },
    ],
  ],

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: "https://www.jdynb.xyz",

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages: [
          "shell",
          "bash",
          "typescript",
          "javascript",
          "java",
          "kotlin",
          "xml",
          "json",
          "c++",
          "jsonc",
          "dart",
          "yml",
          "yaml",
          "nginx",
          "jsx",
          "tsx",
          "vue",
          "vue-html",
          "tsx",
          "sql",
          "scss",
          "less",
          "markdown",
          "dockerfile",
          "docker",
          "jsonc"
        ],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
        //   include: true,
        //   chart: true,
        //   echarts: true,
        //   mermaid: true,
        //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        pdf: true,
        caniuse: true,
        plot: true,
        bilibili: true,
        youtube: true,
        icons: true,
        codepen: true,
        replit: true,
        codeSandbox: true,
        jsfiddle: true,
        repl: {
          go: true,
          rust: true,
          kotlin: true,
        },
        npmTo: {
          tabs: ["npm", "pnpm", "yarn", "bun", "deno"], // 代码块组默认显示顺序
        },
      },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      comment: {
        provider: "Giscus",
        comment: true,
        repo: "Yu2002s/drny-index",
        repoId: "R_kgDONQgLKA",
        category: "General",
        categoryId: "DIC_kwDONQgLKM4CkVkI",
        mapping: "pathname",
        reactionsEnabled: true,
        inputPosition: "top",
      },

      watermark: false,
    },

    // 禁用博客功能
    // blog: false
    // 博客相关配置
    blog: {
      /**
       * 通过 glob string 配置包含文件，
       * 默认读取 源目录中的所有 `.md` 文件，但会排除 `notes` 配置中用于笔记的目录。
       */
      include: ["**/*.md"],
      // 如果希望只将源目录下某个目录下的文章读取为博客文章，比如 `blog` 目录，可以配置为：
      // include: ['blog/**/*.md'],

      /**
       * 通过 glob string 配置排除的文件，相对于 源目录
       */
      exclude: [".vuepress/", "**/README.md"],

      // 禁用分页
      // pagination: false,
      // 每页显示的文章数量
      pagination: 15,
    },

    // 展示博主的资料信息
    // profile: {
    //   name: "冬日暖雨",
    //   description: "永远相信美好的事情即将发生",
    // },
  }),
})
