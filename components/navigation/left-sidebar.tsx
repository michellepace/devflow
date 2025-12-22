"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { NavLink } from "@/components/navigation/nav-link";
import { NAV_LINKS } from "@/components/navigation/nav-links.constants";

// Navbar height minus overlap to hide shadow-sm
const SIDEBAR_TOP_OFFSET = 72; // 73px navbar - 1px overlap

export function LeftSidebar() {
  return (
    <aside
      style={{
        top: SIDEBAR_TOP_OFFSET,
        height: `calc(100vh - ${SIDEBAR_TOP_OFFSET}px)`,
      }}
      className="sticky z-50 hidden w-16 flex-col justify-between overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 transition-[width] duration-500 ease-in-out sm:flex lg:w-56"
    >
      {/* Top: Navigation Links */}
      <nav className="flex flex-col gap-3" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.route}
            imgURL={link.imgURL}
            route={link.route}
            label={link.label}
            variant="rail"
          />
        ))}
      </nav>

      {/* Bottom: User Avatar (authenticated only) */}
      <SignedIn>
        <div className="flex size-10 items-center justify-center lg:size-auto lg:justify-start lg:pl-2">
          <UserButton />
        </div>
      </SignedIn>
    </aside>
  );
}
