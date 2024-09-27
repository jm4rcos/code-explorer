'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Technology } from '@/interfaces/technology';

import { getTechs } from '@/actions/technology';

import { ExploreSnippets } from './_components/explore-snippets';
import { ExploreHeader } from './_components/explorer-header';
import TechList from './_components/tech-list';

export default function Explore() {
  const [selectedTech, setSelectedTech] = useState<Technology | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['technologies'],
    queryFn: () => getTechs(),
  });

  const handleSelectTech = (tech: Technology | undefined) => {
    setSelectedTech(tech);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <ExploreHeader onSearch={handleSearch} />
      <div className="xl:max-w-4xl lg:max-w-xl max-w-full lg:px-8 px-8">
        <TechList onSelectTech={handleSelectTech} isLoading={isLoading} technologies={data} />
      </div>
      <ExploreSnippets selectedTech={selectedTech} searchTerm={searchTerm} />
    </>
  );
}
