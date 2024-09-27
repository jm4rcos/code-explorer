import { MobileSidebar } from '@/components/mobile-sidebar';

import { Navbar } from '../../components/navbar';
import { Sidebar } from '../../components/sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen selection:bg-secondary selection:text-background">
      <main className="flex relative h-full pt-16 px-4 overflow-hidden mx-auto">
        <MobileSidebar />
        <Navbar />
        <div className="w-56 shrink-0 px-4 hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full relative overflow-auto flex justify-center h-[calc(100vh-5rem)] bg-foreground rounded-xl">
          <div className="h-full w-full max-w-full font-[family-name:var(--font-geist-sans)] items-center flex flex-col gap-2 py-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
