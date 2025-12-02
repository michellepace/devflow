import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

export const Navbar = () => (
  <nav className="sticky top-0 z-50 grid w-full grid-cols-3 items-center bg-sidebar px-6 py-4 shadow-sm">
    {/* Left: Logo + DevFlow text */}
    <Link href="/" className="flex items-center gap-2 justify-self-start">
      <Image
        src="/images/site-logo.svg"
        alt="Devflow logo"
        width={28}
        height={28}
      />
      <h2 className="hidden font-display text-2xl font-semibold text-sidebar-foreground sm:block">
        Dev<span className="text-primary">Flow</span>
      </h2>
    </Link>

    {/* Centre: Global Search placeholder */}
    <p className="hidden justify-self-center text-sidebar-foreground sm:block">
      Global Search
    </p>

    {/* Right: Theme toggle */}
    <div className="justify-self-end">
      <ThemeToggle />
    </div>
  </nav>
);
