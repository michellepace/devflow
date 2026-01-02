import deviconRegistry from "@/lib/devicon.json";

type DeviconEntry = {
  name: string;
  altnames: string[];
  versions: {
    font: string[];
  };
};

const registry = deviconRegistry as DeviconEntry[];

/** Style preference order for font icons */
const STYLE_PREFERENCE = ["plain", "original", "line"] as const;

/**
 * Build lookup maps for O(1) access.
 * - nameMap: icon name → entry
 * - aliasMap: alias → icon name
 */
const nameMap = new Map<string, DeviconEntry>();
const aliasMap = new Map<string, string>();

for (const entry of registry) {
  nameMap.set(entry.name, entry);
  for (const alias of entry.altnames) {
    aliasMap.set(alias.toLowerCase(), entry.name);
  }
}

/**
 * Get the devicon class name for a tag.
 *
 * @param name - Tag name (case-insensitive, aliases supported)
 * @param colored - Whether to use brand colours (default: true)
 * @returns Class string like "devicon-react-original colored" or null if not found
 *
 * @example
 * getDeviconClassName("react")        // "devicon-react-original colored"
 * getDeviconClassName("js")           // "devicon-javascript-plain colored"
 * getDeviconClassName("react", false) // "devicon-react-original" (monotone)
 * getDeviconClassName("unknown")      // null
 */
export function getDeviconClassName(
  name: string,
  colored = true,
): string | null {
  const normalised = name.toLowerCase().trim();

  // Try direct name lookup first, then alias lookup
  const resolvedName = nameMap.has(normalised)
    ? normalised
    : aliasMap.get(normalised);

  if (!resolvedName) return null;

  const entry = nameMap.get(resolvedName);
  if (!entry) return null;

  const fontStyles = entry.versions.font;
  if (!fontStyles || fontStyles.length === 0) return null;

  // Select style by preference order, fallback to first available
  const style =
    STYLE_PREFERENCE.find((s) => fontStyles.includes(s)) ?? fontStyles[0];

  return `devicon-${resolvedName}-${style}${colored ? " colored" : ""}`;
}
