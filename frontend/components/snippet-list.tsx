import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';

import { Snippet } from '@/interfaces/snippet';
import { Technology } from '@/interfaces/technology';

import { SnippetItem } from './snippet-item';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';

interface SnippetListProps {
  data: Snippet[];
  isLoading?: boolean;
  selectedTech?: Technology | null;
}

export const SnippetList = ({ data, isLoading, selectedTech }: SnippetListProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (isLoading) {
    return <SnippetList.Skeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>No snippets found</p>
      </div>
    );
  }

  const publicSnippets = !pathname.startsWith('/snippets') && searchParams.get('technologyId');

  return (
    <>
      <div className="flex flex-col w-full">
        {publicSnippets && (
          <>
            <div className="w-full flex items-center pb-2 lg:px-8 px-8">
              <div className="flex items-center space-x-2">
                {selectedTech?.image && (
                  <Image src={selectedTech?.image} alt={selectedTech?.name} width={32} height={32} />
                )}
                <h3 className="text-2xl">{selectedTech?.name}</h3>
              </div>
            </div>
            {selectedTech?.description && <p className="lg:px-8 px-8">{selectedTech?.description}</p>}
          </>
        )}
      </div>
      <div className="pb-4 w-full">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((snippet) => (
            <div key={snippet.id}>
              <SnippetItem snippet={snippet} />
              <Separator className="my-0" />
            </div>
          ))}
      </div>
    </>
  );
};

SnippetList.Skeleton = function SnippetListSkeleton() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col w-full gap-4 lg:px-8 px-8 pb-8">
        <div className="flex items-center gap-2">
          <Skeleton className="rounded-full w-6 h-6 bg-border" />
          <Skeleton className="w-40 h-6 bg-border" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full max-w-lg h-4 bg-border" />
          <Skeleton className="w-full max-w-md h-4 bg-border" />
        </div>
      </div>
      <div className="pb-4 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Fragment key={index}>
            <Skeleton className="flex h-28 lg:px-8 gap-y-4 px-8 flex-col w-full py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-4 h-4 bg-border" />
                  <Skeleton className="w-24 h-4 bg-border" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-24 h-4 bg-border" />
                  <Skeleton className="w-8 h-8 rounded-full bg-border" />
                </div>
              </div>
              <Skeleton className="w-full max-w-md h-4 bg-border" />
              <div className="flex items-center space-x-2"></div>
            </Skeleton>
            <Separator className="my-0" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
