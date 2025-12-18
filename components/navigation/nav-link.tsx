"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as NavLinkType } from "@/components/navigation/constants";
import { cn } from "@/lib/utils";

type NavLinkProps = NavLinkType & {
  // Passed by SheetClose asChild to close the sheet on click
  onClick?: () => void;
};

export function NavLink({ imgURL, route, label, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    (pathname.startsWith(route) && route.length > 1) || pathname === route;

  return (
    <Link
      href={route as Route}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-lg px-4 py-3 text-lg transition-colors",
        isActive
          ? "bg-(image:--gradient-primary) font-bold text-primary-foreground"
          : "font-medium text-sidebar-foreground hover:bg-sidebar-accent",
      )}
    >
      <Image
        src={imgURL}
        alt={label}
        width={20}
        height={20}
        className={cn(!isActive && "invert-colors")}
      />
      <span>{label}</span>
    </Link>
  );
}
