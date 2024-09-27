'use client';

import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Doc as YDoc } from 'yjs';

import { BlockEditor } from '@/components/BlockEditor';
import { EditorSkeleton } from '@/components/editor-skeleton';

import { getSnippetById } from '@/actions/snippets';

interface SnippetIdPageProps {
  params: {
    id: string;
  };
}

const SnippetIdPage = ({ params: { id } }: SnippetIdPageProps) => {
  const { data: currentSnippet, isLoading } = useQuery({
    queryKey: ['current-snippet', id],
    queryFn: () => getSnippetById(id),
  });

  const ydoc = useMemo(() => new YDoc(), []);

  return (
    <>
      <div className="w-full flex flex-col overflow-hidden items-center pt-10 pl-16">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <EditorSkeleton />
          </div>
        ) : (
          <>
            <BlockEditor ydoc={ydoc} snippet={currentSnippet} />
          </>
        )}
      </div>
    </>
  );
};
export default SnippetIdPage;
