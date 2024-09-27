'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import qs from 'query-string';

import { CustomButton } from '@/components/ui/custom-button';
import { Skeleton } from '@/components/ui/skeleton';

import { Technology } from '@/interfaces/technology';

import { cn } from '@/lib/utils';

interface Props {
  technologies: Technology[] | undefined;
  isLoading?: boolean;
  onSelectTech?: (tech: Technology | undefined) => void;
}

const TechList = ({ technologies, isLoading, onSelectTech }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedTech, setSelectedTech] = useState<string | undefined>(undefined);

  const checkForOverflow = useCallback(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      setShowLeftFade(scrollLeft > 0);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkForOverflow();
    window.addEventListener('resize', checkForOverflow);
    return () => window.removeEventListener('resize', checkForOverflow);
  }, [checkForOverflow, isLoading]);

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleSelectTech = (tech: Technology | undefined) => {
    if (tech?.id === selectedTech) {
      setSelectedTech(undefined);

      const url = qs.stringifyUrl({ url: pathname, query: {} });
      router.push(url);
      return;
    }

    onSelectTech && onSelectTech(tech);
    setSelectedTech(tech?.id);

    const url = qs.stringifyUrl(
      { url: pathname, query: { technologyId: tech?.id } },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  if (!technologies || isLoading) {
    return <TechList.Skeleton />;
  }

  return (
    <div className="relative w-full mx-auto">
      <div
        ref={scrollRef}
        className="flex hiddenScrollbar overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onScroll={checkForOverflow}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="flex space-x-2 py-4 px-4">
          {technologies &&
            technologies.map((tech) => (
              <CustomButton
                onClick={() => handleSelectTech(tech)}
                key={tech.id}
                variant="outline"
                className={cn(
                  'flex px-6 py-2 items-center gap-2',
                  selectedTech === tech.id ? 'bg-secondary' : 'bg-primary',
                )}
              >
                <Image
                  priority
                  src={tech.image || 'https://www.google.com/s2/favicons?sz=64&domain_url=www.wikipedia.org/'}
                  alt={tech.name || 'tech'}
                  width={20}
                  height={20}
                />

                <span className={cn(selectedTech === tech.id && 'text-black')}>{tech.name}</span>
              </CustomButton>
            ))}
        </div>
      </div>

      {showLeftFade && (
        <>
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-foreground to-transparent pointer-events-none" />
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[var(--secondary50)] bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-title" />
          </button>
        </>
      )}

      {showRightFade && (
        <>
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-foreground to-transparent pointer-events-none" />
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--secondary50)] bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-title" />
          </button>
        </>
      )}
    </div>
  );
};

export default TechList;

TechList.Skeleton = function TechListSkeleton() {
  return (
    <div className="flex gap-2 py-4 px-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-24 rounded-lg bg-muted" />
      ))}
    </div>
  );
};
