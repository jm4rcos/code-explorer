import { Content } from '@tiptap/react';

export const initialContent: Content = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { textAlign: 'left', level: 1 },
      content: [{ type: 'text', text: 'Untitled' }],
    },
  ],
};
