export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CurricuLink. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4">
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}
