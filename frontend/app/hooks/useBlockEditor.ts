'use client';

import { Content, useEditor, useEditorState } from '@tiptap/react';
import type { AnyExtension, Editor } from '@tiptap/core';
import type { Doc as YDoc } from 'yjs';

import { ExtensionKit } from '@/extensions/extension-kit';
import { initialContent } from '@/lib/data/initialContent';
import { EditorUser } from '@/components/BlockEditor/types';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  ydoc,
  currentContent,
  editable,
}: {
  ydoc: YDoc;
  currentContent: Content;
  editable: boolean;
}) => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      editable: editable,
      content: currentContent,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent);
          ctx.editor.commands.focus('start', { scrollIntoView: true });
        }
      },
      extensions: [...ExtensionKit()].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [],
  );
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return [];
      }

      return ctx.editor.storage.collaborationCursor.users.map(
        (user: EditorUser) => {
          const names = user.name?.split(' ');
          const firstName = names?.[0];
          const lastName = names?.[names.length - 1];
          const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`;

          return { ...user, initials: initials.length ? initials : '?' };
        },
      );
    },
  });

  window.editor = editor;

  return { editor, users };
};
