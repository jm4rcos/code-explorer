'use client';

import { useRef, useState } from 'react';

import * as Y from 'yjs';
import { EditorContent } from '@tiptap/react';
import { CheckIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { initialContent } from '@/lib/data/initialContent';
import { cn } from '@/lib/utils';

import { updateSnippetContent } from '@/actions/snippets';
import { EditSnippetInfo } from '@/app/(protected)/snippets/_components/edit-snippet-info';
import { UpdateSnippetContent } from '@/app/hooks/use-update-snippet-form';
import { useBlockEditor } from '@/app/hooks/useBlockEditor';
import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus';
import '@/styles/index.css';

import { LinkMenu, TextMenu } from '../menus';
import { CustomButton } from '../ui/custom-button';

export const BlockEditor = ({ ydoc, snippet }: { ydoc: Y.Doc; snippet: any }) => {
  const menuContainerRef = useRef(null);

  const { data: session } = useSession();

  const [dirty, setDirty] = useState<boolean>(false);

  const { editor } = useBlockEditor({
    ydoc,
    currentContent: JSON.parse(snippet?.content) || initialContent,
    editable: true,
  });

  const handleSaveContent = async () => {
    if (editor && session) {
      const jsonContent = editor.getJSON();

      await updateSnippetContent(
        snippet.id,
        session?.user.accessToken,
        JSON.stringify(jsonContent) as UpdateSnippetContent,
      )
        .then(() => {
          editor.commands.setContent(jsonContent);
          setDirty(false);
          toast.success('Snippet updated successfully');
        })
        .then(() => {
          window.location.reload();
        });
    }
  };

  editor.on('update', ({ editor }) => {
    setDirty(true);
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="max-w-2xl w-full items-center pr-10 gap-3 flex justify-between">
        <EditSnippetInfo data={snippet} />
        {dirty && (
          <CustomButton
            variant="outline"
            className={cn(
              'p-3 group rounded-xl',
              'text-text flex items-center gap-2 hover:text-title hover:scale-105 transition-all duration-200',
            )}
            onClick={handleSaveContent}
          >
            <CheckIcon className="w-5 h-5 text-text group-hover:text-title group-hover:scale-110 transition-all duration-200" />
            Save Changes
          </CustomButton>
        )}
      </div>
      <div className="flex flex-col w-full gap-4 items-center h-full relative" ref={menuContainerRef}>
        <TextMenu editor={editor} />
        <EditorContent editor={editor} className="flex-1 w-full overflow-y-auto " />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </>
  );
};

export default BlockEditor;
