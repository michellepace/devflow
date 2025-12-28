/**
 * Viewport presets aligned with Tailwind CSS breakpoints.
 * Use in tests via: test.use({ viewport: VIEWPORTS.MOBILE })
 *
 * Tailwind breakpoints: sm=640, md=768, lg=1024, xl=1280, 2xl=1536
 */

// Heights reused across all breakpoint presets
const MOBILE_HEIGHT = 700;
const DESKTOP_HEIGHT = 900;

export const VIEWPORTS = {
  /** Below sm breakpoint — mobile hamburger menu visible */
  MOBILE: { width: 400, height: MOBILE_HEIGHT },

  /** sm breakpoint (640px) — sidebar appears, collapsed (rail mode) */
  SM: { width: 640, height: DESKTOP_HEIGHT },

  /** md breakpoint (768px) — sidebar still collapsed */
  MD: { width: 768, height: DESKTOP_HEIGHT },

  /** lg breakpoint (1024px) — sidebar expands to full width */
  LG: { width: 1024, height: DESKTOP_HEIGHT },

  /** xl breakpoint (1280px) — standard desktop */
  XL: { width: 1280, height: DESKTOP_HEIGHT },

  /** 2xl breakpoint (1536px) — large desktop */
  XXL: { width: 1536, height: DESKTOP_HEIGHT },
} as const;
