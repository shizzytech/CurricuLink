import Link from 'next/link';
import { BookOpenCheck, UserCircle, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-xl font-headline">
            CurricuLink
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          <Link href="/dashboard/modules" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Modules
          </Link>
          <Link href="/dashboard/tracks" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Tracks
          </Link>
          <Link href="/dashboard/ai-paths" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            AI Paths
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/api/auth/logout"> {/* Placeholder for logout */}
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
