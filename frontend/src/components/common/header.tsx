import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/articles", label: "مقالات" },
  { href: "/about", label: "درباره من" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          اقتصاد برای مردم
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2 items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-1 py-2 transition-colors hover:text-foreground/80 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
              <span className="sr-only">منو</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="mt-12 mr-4 flex flex-col gap-4 text-right">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-lg font-medium transition-colors hover:text-foreground/80"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
