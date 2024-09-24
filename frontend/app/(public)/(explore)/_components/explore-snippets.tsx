'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSnippets } from '@/actions/snippets';

import { Technology } from '@/interfaces/technology';
import { SnippetList } from '@/components/snippet-list';
import { Snippet } from '@/interfaces/snippet';
import { SnippetTypeFilter } from '@/components/snippet-type-filter';

interface Props {
  selectedTech: Technology | undefined;
  searchTerm: string | undefined;
}

export const ExploreSnippets = ({ selectedTech, searchTerm }: Props) => {
  const searchParams = useSearchParams();
  const technologyId = searchParams.get('technologyId');

  const observer = useRef<IntersectionObserver>();

  const {
    data: snippetsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['snippets', technologyId, searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      getSnippets(technologyId as string, pageParam, 40, searchTerm),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      return lastPage.data.length
        ? lastPage.total > lastPage.data.length
          ? lastPage.page + 1
          : undefined
        : undefined;
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const snippets = useMemo(() => {
    return (
      snippetsData &&
      snippetsData.pages.reduce((acc: Snippet[], page) => {
        return [...acc, ...page.data];
      }, [])
    );
  }, [snippetsData]);

  if (error) {
    return (
      <div className="text-4xl text-title flex items-center justify-center h-full w-full">
        <p>Something went wrong!</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full gap-y-4 flex flex-col">
      {snippets && (
        <div className="w-full flex items-center gap-4 justify-between pb-2 lg:px-8 px-8">
          <span className="w-full xl:text-left text-right text-slate-400 text-sm">
            Scroll to see more
          </span>
          <SnippetTypeFilter />
        </div>
      )}
      <SnippetList
        selectedTech={selectedTech}
        data={snippets || []}
        isLoading={isLoading}
      />

      {hasNextPage && <div ref={lastElementRef} />}
    </div>
  );
};
