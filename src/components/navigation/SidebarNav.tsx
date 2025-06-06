'use client';

import Link from 'next/link';
import { Home, LayoutGrid, Layers, BrainCircuit, Settings, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation'; // Import usePathname

// TODO: Replace with actual user data and active path detection
const SidebarLink = ({ href, icon: Icon, label, isActive }: { href: string; icon: React.ElementType; label: string; isActive?: boolean }) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className="w-full justify-start"
    asChild
  >
    <Link href={href}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  </Button>
);

export function SidebarNav() {
  const currentPath = usePathname(); // Use usePathname hook

  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col space-y-4">
      <div className="flex flex-col items-center space-y-2 p-4 border-b">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg font-headline">User Name</h3>
        <p className="text-sm text-muted-foreground">Learner</p>
      </div>
      
      <nav className="flex-grow space-y-1">
        <SidebarLink href="/dashboard" icon={Home} label="Dashboard" isActive={currentPath === '/dashboard'} />
        <SidebarLink href="/dashboard/modules" icon={LayoutGrid} label="Modules" isActive={currentPath.startsWith('/dashboard/modules')} />
        <SidebarLink href="/dashboard/tracks" icon={Layers} label="My Tracks" isActive={currentPath.startsWith('/dashboard/tracks')} />
        <SidebarLink href="/dashboard/ai-paths" icon={BrainCircuit} label="AI Paths" isActive={currentPath.startsWith('/dashboard/ai-paths')} />
      </nav>

      <Separator />
      
      <div className="space-y-1">
        <SidebarLink href="/dashboard/settings" icon={Settings} label="Settings" isActive={currentPath.startsWith('/dashboard/settings')} />
        {/* Replace with actual logout logic */}
        <Button variant="ghost" className="w-full justify-start" onClick={() => alert('Logout clicked')}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
