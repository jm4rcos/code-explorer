import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface SearchProps {
  searchFn: (term: string) => Promise<any[]>;
  queryKey: string;
  placeholder?: string;
  onSelect: (item: any) => void;
}

export function Search({
  searchFn,
  queryKey,
  placeholder = 'Search technologies...',
  onSelect,
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, searchTerm],
    queryFn: () => searchFn(searchTerm),
    enabled: searchTerm.length > 0,
  });

  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="relative w-full max-w-md">
      {/* Input de busca */}
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o searchTerm
      />

      {/* Resultados da busca */}
      <div className="absolute mt-1 w-full bg-muted border rounded-md shadow-md max-h-60 overflow-auto z-10">
        {isLoading ? (
          <div className="p-2">Loading...</div>
        ) : data?.length === 0 && searchTerm.length > 0 ? (
          <div className="p-2">No results found.</div>
        ) : (
          data?.map((item) => (
            <div
              key={item.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => onSelect(item)}
            >
              <img src={item.image} alt={item.name} className="mr-2 h-6 w-6" />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
