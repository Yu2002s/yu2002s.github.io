import {defineNavbarConfig} from "vuepress-theme-plume"

export const navbar = defineNavbarConfig([
    {text: "首页", link: "/"},
    {
        text: '我的App', items: [
            {text: '冬雨影视', link: 'http://movies.jdynb.xyz'}
        ]
    },
    {text: "博客", link: "/blog/"},
    {text: "标签", link: "/blog/tags/"},
    {text: "归档", link: "/blog/archives/"},
    {
        text: "笔记",
        items: [
            // { text: "示例", link: "/notes/demo/README.md" },
            {text: "面试", link: "/notes/interview/README.md"},
            {text: "问题记录", link: "/question/README.md"},
            {text: '前端笔记', link: "/frontend/README.md"},
            {text: '后端笔记', link: "/backend/README.md"},
        ],
    },
    {
        text: "导航页",
        link: "",
    },
])
