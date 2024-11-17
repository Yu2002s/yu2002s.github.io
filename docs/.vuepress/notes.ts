import { defineNotesConfig } from "vuepress-theme-plume"
import interview from "./notes/interview"
import question from "./notes/question";
import frontend from "./notes/frontend";
import backend from "./notes/backend";

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
  notes: [interview, question, frontend, backend],
})
