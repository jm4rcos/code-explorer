'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { useMobileSidebar } from '@/app/hooks/use-mobile-sidebar';
import { CustomButton } from './ui/custom-button';

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, [!isMounted]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomButton
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </CustomButton>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10 max-w-[220px]">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
