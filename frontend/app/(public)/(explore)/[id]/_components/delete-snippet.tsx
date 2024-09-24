import { deleteSnippet } from '@/actions/snippets';
import { CustomButton } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Snippet } from '@/interfaces/snippet';
import { Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

interface DeleteSnippetProps {
  snippetTitle: string;
  snippetId: string;
  onConfirm: () => void;
}

export const DeleteSnippet = ({
  snippetId,
  snippetTitle,
  onConfirm,
}: DeleteSnippetProps) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (!session) {
    redirect('/auth/login');
  }
  const handleDeleteSnippet = async () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    if (inputValue === snippetTitle) {
      deleteSnippet(snippetId, session?.user.accessToken as string)
        .then(() => onConfirm())
        .then(() => setIsLoading(false));
    }
  };

  return (
    <div className="w-full">
      {showConfirmation ? (
        <div className="w-full text-center flex flex-col gap-2">
          <p className="text-sm">This will permanently delete the snippet.</p>
          <p className="text-sm">
            To confirm, type "<span className="text-title">{snippetTitle}</span>
            " below
          </p>
          <Input
            className="border-2 border-danger font-semibold px-5 rounded-lg font-[family-name:var(--font-geist-sans)]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <CustomButton
            disabled={isLoading || inputValue !== snippetTitle}
            variant="destructive"
            className="font-semibold"
            onClick={confirmDelete}
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            {isLoading ? 'Deleting...' : 'Confirm'}
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            onClick={() => setShowConfirmation(false)}
            variant="outline"
            type="button"
            className="text-title hover:bg-muted border-2 border-border"
          >
            Cancel
          </CustomButton>
        </div>
      ) : (
        <CustomButton
          disabled={isLoading}
          onClick={handleDeleteSnippet}
          variant="outline"
          type="button"
          className="text-danger hover:bg-danger hover:text-title border-2 border-danger font-semibold px-5 rounded-lg font-[family-name:var(--font-geist-sans)]"
        >
          Delete
        </CustomButton>
      )}
    </div>
  );
};
