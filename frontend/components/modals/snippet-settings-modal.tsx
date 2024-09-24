'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UpdateSnippetForm from '@/app/(protected)/snippets/_components/update-snippet-form';
import { Snippet } from '@/interfaces/snippet';
import { DeleteSnippet } from '@/app/(public)/(explore)/[id]/_components/delete-snippet';

interface SnippetSettingsModalProps {
  isOpen: boolean;
  onSave: () => void;
  initialData: Snippet;
}

const SnippetSettingsModal: React.FC<SnippetSettingsModalProps> = ({
  isOpen,
  onSave,
  initialData,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onSave}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Snippet Settings</DialogTitle>
        </DialogHeader>
        <UpdateSnippetForm onSave={onSave} initialData={initialData} />
        <DialogFooter>
          <DeleteSnippet
            onConfirm={onSave}
            snippetTitle={initialData.title}
            snippetId={initialData.id}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SnippetSettingsModal;
