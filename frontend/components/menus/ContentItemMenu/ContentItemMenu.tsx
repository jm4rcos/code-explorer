import { Editor } from '@tiptap/react';

import * as Popover from '@radix-ui/react-popover';
import useContentItemActions from './hooks/useContentItemActions';
import { useData } from './hooks/useData';
import { useEffect, useState } from 'react';
import { Toolbar } from '@/components/ui/Toolbar';
import { Icon } from '@/components/ui/Icon';
import { Surface } from '@/components/ui/Surface';
import { DropdownButton } from '@/components/ui/Dropdown';

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos,
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true);
    } else {
      editor.commands.setMeta('lockDragHandle', false);
    }
  }, [editor, menuOpen]);

  return (
    <div className="flex items-center gap-0.5">
      <Toolbar.Button onClick={actions.handleAdd}>
        <Icon name="Plus" />
      </Toolbar.Button>
      <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Popover.Trigger asChild>
          <Toolbar.Button>
            <Icon name="GripVertical" />
          </Toolbar.Button>
        </Popover.Trigger>
        <Popover.Content side="bottom" align="start" sideOffset={8}>
          <Surface className="p-2 flex flex-col min-w-[16rem]">
            <Popover.Close>
              <DropdownButton onClick={actions.resetTextFormatting}>
                <Icon name="RemoveFormatting" />
                Clear formatting
              </DropdownButton>
            </Popover.Close>
            <Popover.Close>
              <DropdownButton onClick={actions.copyNodeToClipboard}>
                <Icon name="Clipboard" />
                Copy to clipboard
              </DropdownButton>
            </Popover.Close>
            <Popover.Close>
              <DropdownButton onClick={actions.duplicateNode}>
                <Icon name="Copy" />
                Duplicate
              </DropdownButton>
            </Popover.Close>
            <Toolbar.Divider horizontal />
            <Popover.Close>
              <DropdownButton
                onClick={actions.deleteNode}
                className="text-danger bg-danger dark:text-danger hover:bg-danger dark:hover:text-danger dark:hover:bg-danger bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
              >
                <Icon name="Trash2" />
                Delete
              </DropdownButton>
            </Popover.Close>
          </Surface>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};
