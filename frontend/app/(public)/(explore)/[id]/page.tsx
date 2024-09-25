'use client';

import { getSnippetById } from '@/actions/snippets';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';
import { initialContent } from '@/lib/data/initialContent';
import CustomBreadcrumbs from '@/components/ui/custom-breadcrumb';

import dynamic from 'next/dynamic';
import { EditorSkeleton } from '@/components/editor-skeleton';

const PublicBlockEditor = dynamic(
  () => import('@/components/BlockEditor/PublicBlockEditor'),
  {
    ssr: false,
    loading: () => <p>Carregando editor...</p>,
  },
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

  const editorContent = useMemo(() => {
    if (currentSnippet?.content) {
      if (typeof currentSnippet.content === 'string') {
        try {
          return currentSnippet.content;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return currentSnippet.content;
        }
      } else if (typeof currentSnippet.content === 'object') {
        return currentSnippet.content;
      }
    }
    return initialContent;
  }, [currentSnippet?.content]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex ">
        <EditorSkeleton />
      </div>
    );
  }

  return (
    <div className="h-full w-full pt-10 pl-16">
      <CustomBreadcrumbs snippetTitle={currentSnippet?.title} />
      <PublicBlockEditor ydoc={ydoc} currentContent={editorContent} />
    </div>
  );
};

export default PublicSnippetPage;
