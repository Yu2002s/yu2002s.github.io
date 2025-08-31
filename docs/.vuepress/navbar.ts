import { defineNavbarConfig } from "vuepress-theme-plume"

export const navbar = defineNavbarConfig([
  { text: "首页", link: "/" },
  {
    text: "我的App",
    link: "/app/",
    // items: [{ text: "冬雨影视", link: "http://movies.jdynb.xyz" }],
  },
  { text: "博客", link: "/blog/" },
  { text: "标签", link: "/blog/tags/" },
  { text: "归档", link: "/blog/archives/" },
  {
    text: "笔记",
    items: [
      // { text: "示例", link: "/notes/demo/README.md" },
      { text: "面试", link: "/notes/interview/README.md" },
      { text: "问题记录", link: "/notes/question/README.md" },
      { text: "备忘录", link: "/notes/memo/README.md" },
      { text: "前端笔记", link: "/notes/frontend/README.md" },
      { text: "后端笔记", link: "/notes/backend/README.md" },
      { text: "Android笔记", link: "/android/compose/0ji6ncyv/" }
    ],
  },
  /* {
    text: "导航页",
    link: "",
  }, */
])
