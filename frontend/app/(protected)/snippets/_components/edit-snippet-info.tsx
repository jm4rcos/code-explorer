'use client';

import { useState } from 'react';

import { SettingsIcon } from 'lucide-react';

import SnippetSettingsModal from '@/components/modals/snippet-settings-modal';
import { CustomButton } from '@/components/ui/custom-button';

import { Snippet } from '@/interfaces/snippet';

interface EditSnippetInfoProps {
  data: Snippet;
}

export const EditSnippetInfo = ({ data }: EditSnippetInfoProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <div className="items-center gap-3 flex">
        <CustomButton
          variant="outline"
          className="p-3 group rounded-xl"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <SettingsIcon className="w-5 h-5 text-text group-hover:text-title group-hover:scale-110 transition-all duration-200 group-hover:rotate-90" />
        </CustomButton>
        {data.title && <p className="text-base text-text">{data.title}</p>}
      </div>

      <SnippetSettingsModal
        initialData={{
          ...data,
          technology: data.technology || null,
        }}
        onSave={handleCloseModal}
        isOpen={isSettingsOpen}
      />
    </>
  );
};
