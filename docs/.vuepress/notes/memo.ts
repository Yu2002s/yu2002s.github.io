import {defineNoteConfig} from "vuepress-theme-plume"

export default defineNoteConfig({
  dir: "备忘录",
  link: "/memo",
  text: "备忘录",
  sidebar: [
    {
      text: "Git", link: "/memo/git/"
    },
    {
      text: "Nginx", link: "/memo/nginx/",
    },
    {
      text: "快捷键",
      link: "/memo/keyboard/"
    }
  ],
})
