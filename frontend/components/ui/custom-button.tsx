'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex text-title hover:text-title items-center justify-center whitespace-nowrap rounded-lg text-base font-normal ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-danger text-title hover:bg-destructive/90',
        outline: 'border border-border bg-transparent hover:bg-[var(--secondary50)]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-link underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const router = useRouter();

    const handlePrefetch = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && href) {
        router.prefetch(href);
      }
    };

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(handlePrefetch);
      });

      if (ref && typeof ref !== 'function') {
        const element = ref.current;
        if (element) {
          observer.observe(element);
        }
      }

      return () => {
        if (ref && typeof ref !== 'function') {
          const element = ref.current;
          if (element) {
            observer.unobserve(element);
          }
        }
      };
    }, [href, ref]);

    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);

CustomButton.displayName = 'CustomButton';

export { CustomButton, buttonVariants };
