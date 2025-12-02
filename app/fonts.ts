import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Variable font (weights 300–700) — for headings/display
export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Variable font (weights 100–900) — for body text
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Variable font (weights 100–800) — for code
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});
