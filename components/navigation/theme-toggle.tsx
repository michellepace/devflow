"use client";

import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-10" aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sidebar-foreground"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun
        className="size-6"
        fill={theme === "light" ? "currentColor" : "none"}
      />
    </Button>
  );
}
