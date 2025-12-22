"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { NavLink } from "@/components/navigation/nav-link";
import { NAV_LINKS } from "@/components/navigation/nav-links.constants";
import { SidebarToggle } from "@/components/navigation/sidebar-toggle";
import { useSidebar } from "@/components/sidebar-provider";
import { cn } from "@/lib/utils";

// Navbar height minus overlap to hide shadow-sm
const SIDEBAR_TOP_OFFSET = 72; // 73px navbar - 1px overlap

// Width constants for clarity and maintainability
const SIDEBAR_WIDTH_COLLAPSED = "w-16"; // 64px - rail mode
const SIDEBAR_WIDTH_EXPANDED = "w-56"; // 224px - full mode

export function LeftSidebar() {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      style={{
        top: SIDEBAR_TOP_OFFSET,
        height: `calc(100vh - ${SIDEBAR_TOP_OFFSET}px)`,
      }}
      className={cn(
        "sticky z-50 hidden flex-col justify-between overflow-y-auto border-r border-sidebar-border bg-sidebar p-4 transition-[width] duration-500 ease-in-out sm:flex",
        isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      )}
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

      {/* Bottom: User Avatar + Toggle */}
      <div
        className={cn(
          "flex items-center gap-2",
          // Collapsed: vertical stack (UserButton above, toggle below)
          // Expanded: horizontal row (UserButton left, toggle right)
          isCollapsed ? "flex-col" : "justify-between",
        )}
      >
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SidebarToggle />
      </div>
    </aside>
  );
}
