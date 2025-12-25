import Link from "next/link";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { cn, HEADER_HEIGHT } from "@/lib/utils";

export function MobileHeader() {
  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between bg-sidebar px-4 shadow-sm sm:hidden",
        HEADER_HEIGHT,
      )}
    >
      {/* Left: Logo icon */}
      <Link href="/" aria-label="DevFlow mobile logo">
        {/* biome-ignore lint/a11y/useAltText: Decorative logo, aria-label on parent link */}
        {/* biome-ignore lint/performance/noImgElement: SVG logo doesn't benefit from next/image optimisation */}
        <img src="/images/site-logo.svg" className="size-7" />
      </Link>

      {/* Right: Theme toggle + hamburger */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <MobileNav />
      </div>
    </header>
  );
}
