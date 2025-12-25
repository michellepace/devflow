import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if a route is active (exact match or nested route).
 * Used by navigation components for active state styling.
 */
export function isRouteActive(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

// Navigation styling constants - shared between desktop sidebar and mobile nav
export const NAV_LINK_ACTIVE_CLASSES =
  "bg-(image:--gradient-primary) font-bold text-primary-foreground";
export const NAV_LINK_INACTIVE_CLASSES = "font-medium";

// Layout constants - shared between headers and main content
export const CONTENT_HORIZONTAL_PADDING = "px-6 md:px-8 lg:px-12";
export const HEADER_HEIGHT = "h-14";
export const MOBILE_HEADER_TOP_OFFSET = "pt-14"; // Compensates for fixed mobile header

/**
 * Get icon classes for navigation items (handles inversion for inactive state).
 */
export function getNavIconClasses(isActive: boolean): string {
  return cn(!isActive && "invert-colors", "shrink-0");
}
