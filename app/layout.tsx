import type { Metadata } from "next";
import { Suspense } from "react";
import { inter, jetbrainsMono, spaceGrotesk } from "@/app/fonts";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <ClerkProvider>
        <html
          lang="en"
          className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
          suppressHydrationWarning
        >
          <body className="flex min-h-full flex-col antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  );
}
