import { InputField } from '@/components/input-field';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CustomButton } from './ui/custom-button';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm<{ search: string }>();

  const handleFormSubmit = (data: { search: string }) => {
    onSearch(data.search);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full gap-2 px-8 justify-center"
    >
      <InputField
        placeholder="Search technologies, languages, frameworks..."
        name="search"
        type="text"
        register={register}
        className="md:max-w-md p-2 placeholder-slate-600 border rounded-lg"
      />
      <CustomButton type="submit" variant="outline" className="rounded-lg">
        <SearchIcon className="w-4 h-4" />
      </CustomButton>
    </form>
  );
};

export default SearchBar;
