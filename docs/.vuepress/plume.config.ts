import { defineThemeConfig } from "vuepress-theme-plume"
import { navbar } from "./navbar"
import { notes } from "./notes"

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: "/avatar.png",
  // your git repo url
  docsRepo: "https://github.com/Yu2002s/drny-index",
  docsDir: "docs",
  docsBranch: "master",

  appearance: true,

  profile: {
    avatar: "/avatar.png",
    name: "冬日暖雨",
    description: "永远相信美好的事情即将发生",
    circle: true,
    location: "江西上饶",
    organization: "CV小组",
    layout: "left",
  },

  navbar,
  notes,
  social: [
    { icon: "github", link: "https://github.com/yu2002s" },
    {
      icon: "qq",
      link: "http://wpa.qq.com/msgrd?v=3&uin=2475058223&site=qq&menu=yes",
    },
  ],
})
