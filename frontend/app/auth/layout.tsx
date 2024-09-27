import { Navbar } from '../../components/navbar';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-background flex font-[family-name:var(--font-geist-sans)] flex-col items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
