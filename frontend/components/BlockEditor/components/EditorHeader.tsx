import { EditorInfo } from "./EditorInfo";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";

export type EditorHeaderProps = {
  editor: Editor;
};

export const EditorHeader = ({ editor }: EditorHeaderProps) => {
  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };
      return { characters: characters(), words: words() };
    },
  });

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <EditorInfo characters={characters} words={words} />
    </div>
  );
};
