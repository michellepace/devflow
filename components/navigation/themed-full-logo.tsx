import { cn } from "@/lib/utils";

// Logo SVG dimensions - centralised to avoid magic numbers
const LOGO_WIDTH = 137;
const LOGO_HEIGHT = 23;

type ThemedFullLogoProps = {
  className?: string;
};

/**
 * Theme-aware logo that switches between light/dark variants via CSS variable.
 * Uses --logo-full-themed defined in globals.css.
 */
export function ThemedFullLogo({ className }: ThemedFullLogoProps) {
  return (
    <span
      style={{ aspectRatio: `${LOGO_WIDTH}/${LOGO_HEIGHT}` }}
      className={cn(
        "h-6 bg-(image:--logo-full-themed) bg-contain bg-no-repeat",
        className,
      )}
      role="img"
      aria-label="DevFlow logo"
    />
  );
}
