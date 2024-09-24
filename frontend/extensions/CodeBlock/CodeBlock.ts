import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "./CodeBlockComponent";

// const lowlight = createLowlight(all);

const lowlight = createLowlight(common);

// lowlight.register("html", html);
// lowlight.register("css", css);
// lowlight.register("js", js);
// lowlight.register("ts", python);

// export const CodeBlock = CodeBlockLowlight.configure({
//   lowlight,
//   defaultLanguage: "javascript",
// });

export const CodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({
  lowlight,
  defaultLanguage: "javascript",
});
