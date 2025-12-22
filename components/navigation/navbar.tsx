import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeLogo } from "@/components/navigation/full-logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";

export const Navbar = () => (
  <nav
    aria-label="Primary navigation"
    className="sticky top-0 z-50 flex w-full items-center justify-between bg-sidebar py-4 pl-4 pr-6 shadow-sm md:pr-8 lg:pr-12"
  >
    {/* Left: Logo (responsive) */}
    <Link href="/" className="flex items-center">
      {/* Mobile: icon only */}
      {/* biome-ignore lint/performance/noImgElement: SVG logo doesn't benefit from next/image optimisation */}
      <img
        src="/images/site-logo.svg"
        alt="DevFlow logo"
        className="size-7 sm:hidden"
      />
      {/* Desktop: full themed logo */}
      <ThemeLogo className="hidden sm:block" />
    </Link>

    {/* Centre: Global Search placeholder (md+ only) */}
    <p className="absolute left-1/2 hidden -translate-x-1/2 text-sidebar-foreground md:block">
      Global Search
    </p>

    {/* Right: Theme toggle + Auth + Mobile nav */}
    <div className="flex items-center gap-2">
      <ThemeToggle />
      {/* Desktop auth - only shown when signed out (avatar in sidebar when signed in) */}
      <SignedOut>
        <div className="hidden items-center gap-4 sm:flex">
          <SignInButton>
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      {/* Mobile hamburger - visible only on mobile */}
      <MobileNav />
    </div>
  </nav>
);
