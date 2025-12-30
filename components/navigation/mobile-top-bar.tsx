import Link from "next/link";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { cn } from "@/lib/utils";

export function MobileTopBar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-(--top-bar-height) w-full items-center justify-between bg-sidebar px-4 shadow-light sm:hidden",
      )}
    >
      <Link href="/" aria-label="DevFlow mobile logo">
        {/* biome-ignore lint/a11y/useAltText: Decorative logo, aria-label on parent link */}
        {/* biome-ignore lint/performance/noImgElement: SVG logo doesn't benefit from next/image optimisation */}
        <img src="/images/site-logo.svg" className="size-7" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <MobileNav />
      </div>
    </header>
  );
}
