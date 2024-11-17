import { defineNotesConfig } from "vuepress-theme-plume"
import interview from "./notes/interview"
import uniapp from "./notes/uniapp"
import question from "./notes/question";

/* const demoNote = defineNoteConfig({
  dir: "demo",
  link: "/demo",
  // sidebar: "auto", //['', 'foo', 'bar'],
  sidebar: [
    { text: "简介", items: ["foo", "bar"] },
    { text: "test", items: ["bar"] },
  ],
}) */

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [interview, uniapp, question],
})
