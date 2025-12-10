import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";

export const Navbar = () => (
  <nav
    aria-label="Primary navigation"
    className="sticky top-0 z-50 flex w-full items-center justify-between bg-sidebar px-6 py-4 shadow-sm"
  >
    {/* Left: Logo + DevFlow text */}
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/site-logo.svg"
        alt="DevFlow logo"
        width={25}
        height={25}
      />
      <h2 className="hidden font-display text-2xl font-semibold text-sidebar-foreground sm:block">
        Dev<span className="text-primary">Flow</span>
      </h2>
    </Link>

    {/* Centre: Global Search placeholder (md+ only) */}
    <p className="absolute left-1/2 hidden -translate-x-1/2 text-sidebar-foreground md:block">
      Global Search
    </p>

    {/* Right: Theme toggle + Auth */}
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <SignedOut>
        <SignInButton>
          <Button variant="ghost">Sign in</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);
