"use client";

import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemeToggleSize = "sm" | "default" | "lg";

const sizeConfig = {
  sm: { button: "icon-sm", icon: "size-5", skeleton: "size-8" },
  default: { button: "icon", icon: "size-5", skeleton: "size-9" },
  lg: { button: "icon-lg", icon: "size-6", skeleton: "size-10" },
} as const;

type ThemeToggleProps = {
  size?: ThemeToggleSize;
};

export function ThemeToggle({ size = "sm" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const config = sizeConfig[size];

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={config.skeleton} aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size={config.button}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-sidebar-foreground"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun
        className={config.icon}
        fill={theme === "light" ? "currentColor" : "none"}
      />
    </Button>
  );
}
