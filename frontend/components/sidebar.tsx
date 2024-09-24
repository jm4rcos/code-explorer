'use client';

import { Settings2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../lib/utils';
import { ExploreIcon } from './icons/explore-icon';
import { SnippetIcon } from './icons/snippet-icon';
import { HeartIcon } from './icons/heart-icon';
import { CommunityIcon } from './icons/community-icon';
import { FeedbackIcon } from './icons/feedback-icon';
import { CustomButton } from './ui/custom-button';

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: 'Explore',
      icon: ExploreIcon,
      href: `/`,
    },
    {
      label: 'My Snippets',
      icon: SnippetIcon,
      href: `/snippets`,
    },
    {
      label: 'Favorites',
      icon: HeartIcon,
      href: `/snippets/favorites`,
    },
    {
      label: 'Community',
      icon: CommunityIcon,
      href: `/community`,
    },
    {
      label: 'Settings',
      icon: Settings2,
      href: `/settings`,
    },
    {
      label: 'Feedback',
      icon: FeedbackIcon,
      href: `/feedback`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="pt-1 flex flex-col space-y-2">
      {routes.map((route) => {
        const { icon: Icon } = route;
        return (
          <CustomButton
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full space-x-4 hover:bg-[var(--secondary50)] hover:text-title justify-start ',
              pathname === route.href && 'bg-foreground border text-title',
            )}
            variant="ghost"
          >
            <Icon
              className={pathname === route.href ? 'text-title' : 'text-text'}
            />
            <p
              className={cn(
                'truncate md:max-w-[120px] max-w-[180px]',
                pathname === route.href && 'text-title',
              )}
            >
              {route.label}
            </p>
          </CustomButton>
        );
      })}
    </div>
  );
};
