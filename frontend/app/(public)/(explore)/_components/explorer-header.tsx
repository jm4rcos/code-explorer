'use client';

import SearchBar from '@/components/search-bar';

interface ExploreHeaderProps {
  onSearch: (searchTerm: string) => void;
}

export const ExploreHeader = ({ onSearch }: ExploreHeaderProps) => {
  return (
    <>
      <div className="w-full space-y-2 text-center">
        <h1 className="text-3xl font-semibold">Explore Snippets</h1>
        <p>
          or{' '}
          <a href="/snippets" className="underline text-link hover:text-sky">
            create
          </a>{' '}
          your own
        </p>
      </div>

      <SearchBar onSearch={onSearch} />
    </>
  );
};
