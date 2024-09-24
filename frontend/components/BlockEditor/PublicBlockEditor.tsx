'use client';

import { EditorContent } from '@tiptap/react';
import { useRef } from 'react';

import '@/styles/index.css';

import * as Y from 'yjs';
import { useBlockEditor } from '@/app/hooks/useBlockEditor';

export const PublicBlockEditor = ({
  ydoc,
  currentContent,
}: {
  ydoc: Y.Doc;
  currentContent: string;
}) => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({
    ydoc,
    currentContent: JSON.parse(currentContent),
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full relative" ref={menuContainerRef}>
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
    </div>
  );
};

export default PublicBlockEditor;
