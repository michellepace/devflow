"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/sidebar-provider";
import { Button } from "@/components/ui/button";

export function SidebarToggle() {
  const { isCollapsed, toggle } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return <div className="size-10" aria-hidden="true" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggle}
      className={
        isCollapsed
          ? "shrink-0 rounded-full text-sidebar-foreground"
          : "shrink-0 rounded-full bg-muted text-sidebar-foreground"
      }
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!isCollapsed}
    >
      {isCollapsed ? (
        <ChevronsRight className="size-5" />
      ) : (
        <ChevronsLeft className="size-5" />
      )}
    </Button>
  );
}
