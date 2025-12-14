"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export function ClerkSignIn() {
  const { resolvedTheme } = useTheme();
  const logoUrl =
    resolvedTheme === "light"
      ? "/images/logo-light.svg"
      : "/images/logo-dark.svg";

  return (
    <SignIn
      appearance={{
        layout: { logoImageUrl: logoUrl },
        elements: {
          header: "items-start",
          logoBox: "justify-start",
          headerTitle: "text-left",
          headerSubtitle: "text-left",
        },
      }}
    />
  );
}
