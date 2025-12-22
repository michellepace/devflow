"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as NavLinkType } from "@/components/navigation/nav-links.constants";
import { cn } from "@/lib/utils";

type NavLinkProps = NavLinkType & {
  /** Passed by SheetClose asChild to close the sheet on click */
  onClick?: () => void;
  /**
   * - "rail": Responsive sidebar — icon-only (sm-lg), full with tight padding (lg+)
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
  const isActive = pathname === route || pathname.startsWith(`${route}/`);

  const isRail = variant === "rail";

  return (
    <Link
      href={route}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg",
        isActive
          ? "bg-(image:--gradient-primary) font-bold text-primary-foreground"
          : "font-medium text-sidebar-foreground hover:bg-muted",
        // Rail: icon-only (sm-lg), expands to icon + label with tight padding (lg+)
        isRail
          ? "size-10 justify-center p-0 lg:size-auto lg:w-full lg:justify-start lg:gap-3 lg:p-2"
          : "px-4 py-3",
      )}
      aria-label={isRail ? label : undefined}
    >
      <Image
        src={imgURL}
        alt=""
        width={20}
        height={20}
        className={cn(!isActive && "invert-colors", "shrink-0")}
      />
      <span className={cn(isRail && "sr-only lg:not-sr-only")}>{label}</span>
    </Link>
  );
}
