import Link from "next/link";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { MobileSearch } from "@/components/search/mobile-search";

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-40 flex h-(--top-bar-height) w-full items-center justify-between bg-background px-4 md:hidden">
      <Link href="/" aria-label="DevFlow mobile logo">
        {/* biome-ignore lint/a11y/useAltText: Decorative logo, aria-label on parent link */}
        {/* biome-ignore lint/performance/noImgElement: SVG logo doesn't benefit from next/image optimisation */}
        <img src="/images/site-logo.svg" className="size-8" />
      </Link>

      <div className="flex items-center">
        <MobileSearch />
        <MobileNav />
      </div>
    </header>
  );
}
