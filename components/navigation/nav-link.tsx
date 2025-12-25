"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as NavLinkType } from "@/components/navigation/nav-links.constants";
import {
  cn,
  getNavIconClasses,
  isRouteActive,
  NAV_LINK_ACTIVE_CLASSES,
  NAV_LINK_INACTIVE_CLASSES,
} from "@/lib/utils";

type NavLinkProps = NavLinkType & {
  /** Passed by SheetClose asChild to close the sheet on click */
  onClick?: () => void;
};

/**
 * Mobile navigation link for Sheet menu.
 * Desktop sidebar uses SidebarMenuButton directly in AppSidebar.
 */
export function NavLink({ imgURL, route, label, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isRouteActive(pathname, route);

  return (
    <Link
      href={route}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3",
        isActive
          ? NAV_LINK_ACTIVE_CLASSES
          : `${NAV_LINK_INACTIVE_CLASSES} text-sidebar-foreground hover:bg-muted`,
      )}
    >
      <Image
        src={imgURL}
        alt=""
        width={20}
        height={20}
        className={getNavIconClasses(isActive)}
      />
      <span>{label}</span>
    </Link>
  );
}
