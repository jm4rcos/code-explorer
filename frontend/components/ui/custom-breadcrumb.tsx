'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface CustomBreadcrumbsProps {
  homeLabel?: string;
  snippetTitle?: string;
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({
  homeLabel = 'Início',
  snippetTitle,
}) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: homeLabel, href: '/' },
    ...pathSegments.map((segment, index) => {
      if (index === pathSegments.length - 1 && snippetTitle) {
        return {
          label: snippetTitle,
          href: `/${pathSegments.slice(0, index + 1).join('/')}`,
        };
      }
      return {
        label: segment,
        href: `/${pathSegments.slice(0, index + 1).join('/')}`,
      };
    }),
  ];

  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center space-x-1 text-sm text-gray-500"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          <Link
            href={breadcrumb.href}
            className={`flex items-center hover:text-text ${
              index === breadcrumbs.length - 1 ? 'font-semibold text-text' : ''
            }`}
          >
            {index === 0 && <Home className="mr-1 h-4 w-4" />}
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CustomBreadcrumbs;
