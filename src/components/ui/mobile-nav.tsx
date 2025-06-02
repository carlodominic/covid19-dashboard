import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { ThemeToggle } from "./theme-toggle";

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const routes = [
    { href: "/", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">COVID-19 Dashboard</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {routes.map((route) => (
              <a
                key={route.href}
                href={route.href}
                className={`text-base ${currentPath === route.href ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
            <span className="ml-2 text-sm">Toggle theme</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
