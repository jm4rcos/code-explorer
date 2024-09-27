'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import qs from 'query-string';

import { cn } from '@/lib/utils';

import { CustomButton } from './ui/custom-button';

const buttons = [
  { label: 'Newest', value: 'newest' },
  { label: 'Popular', value: 'popular' },
];

export const SnippetTypeFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get('orderBy');

  const handleSelectType = (orderBy: string | undefined) => {
    if (orderBy === undefined) {
      const url = qs.stringifyUrl({ url: pathname, query: {} });
      router.push(url);
      return;
    }
    const url = qs.stringifyUrl({ url: pathname, query: { orderBy } }, { skipNull: true, skipEmptyString: true });
    router.push(url);
  };

  return (
    <div className="px-1 py-1 bg-muted rounded-lg flex items-center space-x-1">
      {buttons.map((button) => (
        <CustomButton
          disabled
          key={button.value}
          type="button"
          className={cn('text-sm bg-muted hover:bg-[var(--secondary50)]', params === button.value && 'bg-foreground')}
          size="sm"
          variant="ghost"
          onClick={() => handleSelectType(button.value)}
        >
          {button.label}
        </CustomButton>
      ))}
    </div>
  );
};
