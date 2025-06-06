import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/navigation/SidebarNav';
import { Footer } from '@/components/layout/Footer';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 p-6 overflow-auto bg-muted/30">
          {children}
        </main>
      </div>
      {/* Footer can be optional in AppShell, or a simpler one */}
      {/* <Footer /> */}
    </div>
  );
}
