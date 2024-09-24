'use client';

import { getSnippetById } from '@/actions/snippets';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';
import { initialContent } from '@/lib/data/initialContent';
import CustomBreadcrumbs from '@/components/ui/custom-breadcrumb';

import dynamic from 'next/dynamic';

const PublicBlockEditor = dynamic(
  () => import('@/components/BlockEditor/PublicBlockEditor'),
  { ssr: false },
);

const PublicSnippetPage = ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const { data: currentSnippet, isLoading } = useQuery({
    queryKey: ['current-user-snippet', id],
    queryFn: () => getSnippetById(id),
  });

  const ydoc = useMemo(() => new YDoc(), []);

  return (
    <div className="h-full w-full pt-10 pl-16">
      <CustomBreadcrumbs snippetTitle={currentSnippet?.title} />
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <PublicBlockEditor
            ydoc={ydoc}
            currentContent={
              currentSnippet?.content || JSON.stringify(initialContent)
            }
          />
        </>
      )}
    </div>
  );
};

export default PublicSnippetPage;
