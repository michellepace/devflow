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

// Navigation link styling constants - shared between left sidebar and mobile nav
export const NAV_LINK_ACTIVE_CLASSES =
  "bg-(image:--gradient-primary) font-bold text-primary-foreground";
export const NAV_LINK_INACTIVE_CLASSES = "font-medium";

/**
 * Get icon classes for navigation items (handles inversion for inactive state).
 */
export function getNavIconInvertClasses(isActive: boolean): string {
  return cn(!isActive && "invert-colors", "shrink-0");
}

/**
 * Get a human-readable relative time string from a date.
 * Granularity: just now → minutes → hours → yesterday → days → weeks → months → years
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Minutes
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;

  // Hours
  if (diffInHours < 24)
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;

  // Days
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  // Weeks
  const weeks = Math.floor(diffInDays / 7);
  if (diffInDays < 30) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;

  // Months
  const months = Math.floor(diffInDays / 30);
  if (diffInDays < 365)
    return `${months} ${months === 1 ? "month" : "months"} ago`;

  // Years
  const years = Math.floor(diffInDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
