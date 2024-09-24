'use client';

import { useState } from 'react';
import { Edit3Icon, XIcon } from 'lucide-react';
import {
  UpdateSnippetFormData,
  useUpdateSnippetForm,
} from '@/app/hooks/use-update-snippet-form';
import { InputField } from '@/components/input-field';
import { CustomButton } from '@/components/ui/custom-button';
import { Technology } from '@/interfaces/technology';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Search } from '@/components/ui/search';
import { searchTechs } from '@/actions/technology';
import Image from 'next/image';
import { SwitchField } from '@/components/switch-field';
import { Snippet } from '@/interfaces/snippet';

type UpdateSnippetFormProps = {
  initialData: Snippet;
  onSave: () => void;
};

export const UpdateSnippetForm = ({
  initialData,
  onSave,
}: UpdateSnippetFormProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(
    initialData.technology || null,
  );
  const [switchValue, setSwitchValue] = useState(
    initialData.isPublished || false,
  );

  const { register, handleSubmit, errors, onSubmit, isSubmitting, setValue } =
    useUpdateSnippetForm({
      initialData,
    });

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    onSave();
  };

  return (
    <form
      className="flex flex-col max-w-md gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InputField
        name="title"
        register={register}
        placeholder="Title"
        error={errors.title}
        type="text"
      />
      {errors.title && (
        <p className="text-danger text-sm max-w-xs">{errors.title.message}</p>
      )}

      <InputField
        name="description"
        register={register}
        placeholder="Description"
        error={errors.description}
        type="text"
      />
      {errors.description && (
        <p className="text-danger text-sm max-w-xs">
          {errors.description.message}
        </p>
      )}

      <div className="space-y-1">
        <div
          className={cn(
            'flex items-center gap-8 justify-between border-b border-border pb-2 w-full',
            isSearchOpen ? 'items-start' : 'items-center',
          )}
        >
          <Label htmlFor="language" className="text-right">
            Technology
          </Label>
          {isSearchOpen ? (
            <Search
              queryKey="search-technologies"
              placeholder="Search"
              searchFn={searchTechs}
              onSelect={(data) => {
                setSelectedTech(data);
                register('technologyId');
                setValue('technologyId', data.id);
                setIsSearchOpen(false);
              }}
            />
          ) : (
            <div className="flex w-full justify-end pr-3 items-center gap-2">
              {selectedTech ? (
                <>
                  <Image
                    src={
                      selectedTech?.image || initialData.technology?.image || ''
                    }
                    alt="technology"
                    width={26}
                    height={26}
                    className="w-8 h-8 rounded-lg"
                    priority
                  />
                  <p>{selectedTech?.name || initialData.technology?.name}</p>
                </>
              ) : (
                <p>No technology set</p>
              )}
            </div>
          )}
          <CustomButton
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            variant="outline"
          >
            {isSearchOpen ? (
              <XIcon className="w-5 h-5 text-danger" />
            ) : (
              <Edit3Icon className="w-5 h-5 text-sky" />
            )}
          </CustomButton>
        </div>
        {errors.technologyId && !isSearchOpen && (
          <p className="text-danger text-sm max-w-xs">
            {errors.technologyId.message}
          </p>
        )}
        <SwitchField
          setValue={(data) => {
            setSwitchValue(data);
            setValue('isPublished', data);
          }}
          name="isPublished"
          register={register}
          label="Publish"
          error={errors.isPublished}
          defaultValue={switchValue}
        />
        {errors.isPublished && (
          <p className="text-danger text-sm max-w-xs">
            {errors.isPublished.message}
          </p>
        )}
      </div>
      <CustomButton
        className="w-full bg-success text-background font-medium"
        variant="outline"
        type="submit"
        disabled={isSubmitting}
      >
        Save Settings
      </CustomButton>
    </form>
  );
};

export default UpdateSnippetForm;
