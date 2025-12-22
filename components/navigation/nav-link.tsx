"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as NavLinkType } from "@/components/navigation/nav-links.constants";
import { useSidebar } from "@/components/sidebar-provider";
import { cn } from "@/lib/utils";

type NavLinkProps = NavLinkType & {
  /** Passed by SheetClose asChild to close the sheet on click */
  onClick?: () => void;
  /**
   * - "rail": Sidebar nav — icon-only when collapsed, icon + label when expanded
   * - "mobile": Touch-optimised — always full with generous padding (px-4 py-3)
   */
  variant?: "rail" | "mobile";
};

export function NavLink({
  imgURL,
  route,
  label,
  onClick,
  variant = "mobile",
}: NavLinkProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const isActive = pathname === route || pathname.startsWith(`${route}/`);

  const isRail = variant === "rail";
  // For rail variant, show icon-only if collapsed, icon+label if expanded
  const showIconOnly = isRail && isCollapsed;

  return (
    <Link
      href={route}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg",
        isActive
          ? "bg-(image:--gradient-primary) font-bold text-primary-foreground"
          : "font-medium text-sidebar-foreground hover:bg-muted",
        // Rail: icon-only when collapsed, full when expanded
        isRail
          ? showIconOnly
            ? "size-10 justify-center p-0"
            : "w-full justify-start gap-3 p-2"
          : "px-4 py-3",
      )}
      aria-label={showIconOnly ? label : undefined}
    >
      <Image
        src={imgURL}
        alt=""
        width={20}
        height={20}
        className={cn(!isActive && "invert-colors", "shrink-0")}
      />
      <span className={cn(showIconOnly && "sr-only")}>{label}</span>
    </Link>
  );
}
