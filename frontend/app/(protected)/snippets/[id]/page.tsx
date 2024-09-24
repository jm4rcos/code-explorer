'use client';

import { getSnippetById } from '@/actions/snippets';
import { BlockEditor } from '@/components/BlockEditor';
import { initialContent } from '@/lib/data/initialContent';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';

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
            <p>Loading...</p>
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
