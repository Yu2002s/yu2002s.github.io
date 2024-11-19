import {defineNotesConfig} from "vuepress-theme-plume"
import interview from "./notes/interview"
import question from "./notes/question";
import frontend from "./notes/frontend";
import backend from "./notes/backend";
import memo from "./notes/memo";

export const notes = defineNotesConfig({
  dir: "notes",
  link: "/",
  notes: [interview, question, memo, frontend, backend],
})
